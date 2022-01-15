import Asset from './Asset';
import '../../styles/Assets.css';
import { connect } from 'react-redux';
import moment from 'moment';
import { AppState } from '../../reducers';
import { getAssets } from '../../actions/assets';
import { useEffect, useState } from 'react';
import { CoinMarketData } from '../../services/coingecko';

type StateProps = {
	assetMarketData: CoinMarketData[];
};

type DispatchProps = {
	getAssets: (currency: string) => void;
};

type OwnProps = {
	visibleAssets: string[];
};

type P = OwnProps & StateProps & DispatchProps;

function AssetList(props: P) {
	const [assetList, setAssetList] = useState<CoinMarketData[]>([]);

	const getFilteredAssets = (assetsList: CoinMarketData[]) => {
		return assetsList.filter((asset) => props.visibleAssets.includes(asset.id));
	};

	const getBtcValue = (value: number) => {
		if (!assetList.length) return 0;
		const btcAsset = assetList.find((asset) => asset.id === 'bitcoin');
		return +(value / btcAsset?.current_price!).toFixed(8);
	};

	useEffect(() => {
		if (!props.assetMarketData.length) {
			props.getAssets('usd');
			return;
		}
		const newAssetsList = getFilteredAssets(props.assetMarketData);
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
		setAssetList(props.assetMarketData);
		setTimeout(() => props.getAssets('usd'), 5000);
	}, [props.assetMarketData]);

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

export default connect<StateProps, DispatchProps, {}, AppState>(
	(state) => ({
		assetMarketData: state.assets.marketData
	}),
	{
		getAssets
	}
)(AssetList);
