import './App.css';
import SearchBar from './components/SearchBar';
import AddAssetButton from './components/AddAssetButton';
import SideBar from './components/SideBar';
import AssetList from './components/Assets/AssetList';
import NavContainer from './components/Navigation/NavContainer';
import { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { AppState } from './reducers';
import { CoinMarketData } from './services/coingecko';
import { usePrevious } from './hooks/usePrevious';
import { getAssets } from './actions/assets';
import { getActiveAssets } from './reducers/assets';

type StateProps = {
	requestTime: number;
	assetList: CoinMarketData[];
};

type DispatchProps = {
	getAssets: (currency: string) => void;
};

type P = StateProps & DispatchProps;

function App(props: P) {
	const [searchQuery, setSearchQuery] = useState('');
	const prevRequestTime = usePrevious(props.requestTime);
	const lastUpdated = new Date(props.requestTime).toLocaleTimeString();
	const updateFrequency = 5000;
	const timeoutRef = useRef<NodeJS.Timeout>();
	const filterBySearchQuery = (asset: CoinMarketData) =>
		asset.name.toLowerCase().includes(searchQuery.toLowerCase());
	const [selectedAsset, setSelectedAsset] = useState<string>('bitcoin');

	const logAssets = () => {
		console.log(`\n--- ${lastUpdated} ---`);
		props.assetList.forEach((asset) => {
			console.log(`${asset.symbol} ${asset.current_price}`);
		});
	};

	useEffect(() => {
		if (props.requestTime !== prevRequestTime) {
			timeoutRef.current = setTimeout(
				() => props.getAssets('usd'),
				updateFrequency
			);
			logAssets();
		}
		return () => {
			clearTimeout(timeoutRef.current!);
		};
	}, [props.requestTime]);

	const filteredAssetsList = props.assetList.filter(filterBySearchQuery);

	const activeAsset =
		(props.assetList.length &&
			props.assetList.find((asset) => asset.id === selectedAsset)) ||
		null;

	return (
		<div className="App">
			<span className="last-request">
				{props.requestTime > 0 && `Last Updated: ${lastUpdated}`}
			</span>
			<NavContainer />
			<div className="asset-graph-container">
				<SearchBar value={searchQuery} onChange={setSearchQuery} />
				<AssetList
					assetList={filteredAssetsList}
					onAssetSelect={setSelectedAsset}
					selectedAsset={selectedAsset}
				/>
				<AddAssetButton />
			</div>
			<SideBar activeAsset={activeAsset} />
		</div>
	);
}

export default connect<StateProps, DispatchProps, {}, AppState>(
	(state) => ({
		requestTime: state.assets.requestTime,
		assetList: getActiveAssets(state)
	}),
	{ getAssets }
)(App);
