import './App.css';
import SearchBar from './components/SearchBar';
import AddAssetButton from './components/AddAssetButton';
import SideBar from './components/SideBar';
import AssetList from './components/Assets/AssetList';
import NavContainer from './components/Navigation/NavContainer';
import { useState } from 'react';
import { connect } from 'react-redux';
import { AppState } from './reducers';
import AddAssetSelect from './components/Assets/AddAssetSelect';
import { CoinMarketData } from './services/coingecko';

type StateProps = {
	activeAssets: string[];
	assetList: CoinMarketData[];
};

type P = StateProps;

function App(props: P) {
	const [searchQuery, setSearchQuery] = useState('');
	const [addAssetVisible, setAddAssetVisible] = useState(false);

	return (
		<div className="App">
			<NavContainer />
			<div className="asset-graph-container">
				<SearchBar value={searchQuery} onChange={setSearchQuery} />
				<AssetList
					activeAssets={props.activeAssets}
					assetList={props.assetList}
					searchQuery={searchQuery}
				/>
				{addAssetVisible && (
					<AddAssetSelect
						assetList={props.assetList}
						activeAssets={props.activeAssets}
						onAddAsset={() => setAddAssetVisible(false)}
					/>
				)}
				<AddAssetButton onClick={() => setAddAssetVisible(true)} />
			</div>
			<SideBar />
		</div>
	);
}

export default connect<StateProps, {}, {}, AppState>((state) => ({
	activeAssets: state.assets.activeAssets,
	assetList: state.assets.marketData
}))(App);
