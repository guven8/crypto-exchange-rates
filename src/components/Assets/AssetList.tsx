import Asset from './Asset';
import '../../styles/Assets.css';
import { connect } from 'react-redux';
import moment from 'moment';
import { AppState } from '../../reducers';
import { getAssets } from '../../actions/assets';
import { useEffect, useState } from 'react';
import { CoinMarketData } from '../../services/coingecko';

type DispatchProps = {
	getAssets: (currency: string) => void;
};

type OwnProps = {
	assetList: CoinMarketData[];
	activeAssets: string[];
	searchQuery: string;
};

type P = OwnProps & DispatchProps;

function AssetList(props: P) {
	const [assetList, setAssetList] = useState<CoinMarketData[]>([]);

	const getFilteredAssets = (assetsList: CoinMarketData[]) => {
		return assetsList.filter(
			(asset) =>
				props.activeAssets.includes(asset.id) &&
				asset.name.toLowerCase().includes(props.searchQuery.toLowerCase())
		);
	};

	const getBtcValue = (value: number) => {
		if (!assetList.length) return 0;
		const btcAsset = assetList.find((asset) => asset.id === 'bitcoin');
		return +(value / btcAsset?.current_price!).toFixed(8);
	};

	useEffect(() => {
		if (!props.assetList.length) {
			props.getAssets('usd');
			return;
		}
		const newAssetsList = getFilteredAssets(props.assetList);
		if (newAssetsList.length) {
			filteredAssetsList.forEach((asset) => {
				console.log(
					`${moment().format('DD/MM/YYYY hh:mm:ss')} ${asset.symbol} ${
						asset.current_price
					}`
				);
			});
			console.log('\n');
		}
		setAssetList(props.assetList);
		setTimeout(() => props.getAssets('usd'), 5000);
	}, [props.assetList]);

	const filteredAssetsList = getFilteredAssets(assetList);

	return (
		<div className="asset-list">
			{!assetList.length && <span>Loading data...</span>}
			{filteredAssetsList.map((asset) => {
				const btcValue =
					asset.id === 'bitcoin' ? null : getBtcValue(asset.current_price); //+(asset.current_price / btcCurrentPrice).toFixed(8);
				return (
					<Asset
						key={asset.id}
						name={asset.name}
						image={asset.image}
						value={asset.current_price}
						currencySymbol="$"
						btcValue={btcValue}
					/>
				);
			})}
		</div>
	);
}

export default connect<{}, DispatchProps, {}, AppState>(null, {
	getAssets
})(AssetList);
