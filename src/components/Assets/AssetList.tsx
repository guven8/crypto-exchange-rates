import Asset from './Asset';
import '../../styles/Assets.css';
import { connect } from 'react-redux';
import { AppState } from '../../reducers';
import { getAssets } from '../../actions/assets';
import { useEffect, useState } from 'react';
import { CoinMarketData } from '../../services/coingecko';

type StateProps = {
	assets: CoinMarketData[];
	activeAssets: string[];
};

type DispatchProps = {
	getAssets: (currency: string) => void;
};

type P = StateProps & DispatchProps;

function AssetList(props: P) {
	const [assetList, setAssetList] = useState<CoinMarketData[]>([]);
	const [btcCurrentPrice, setBtcCurrentPrice] = useState(0);

	useEffect(() => {
		props.getAssets('usd');
	}, []);

	useEffect(() => {
		const btcAsset = props.assets.find((asset) => asset.id === 'bitcoin');
		if (btcAsset) {
			setBtcCurrentPrice(btcAsset.current_price);
		}
		const assetList = props.assets.filter((asset) =>
			props.activeAssets.includes(asset.id)
		);
		setAssetList(assetList);
	}, [props.assets]);

	return (
		<div className="asset-list">
			{assetList.map((asset) => {
				const btcValue =
					asset.id === 'bitcoin'
						? null
						: +(asset.current_price / btcCurrentPrice).toFixed(8);
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
	(state: AppState) => ({
		assets: state.assets,
		activeAssets: state.ui.activeAssets
	}),
	{
		getAssets
	}
)(AssetList);
