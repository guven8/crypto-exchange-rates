import Asset from './Asset';
import '../../styles/Assets.css';
import { CoinMarketData } from '../../services/coingecko';

type P = {
	assetList: CoinMarketData[];
};

export default function AssetList(props: P) {
	const getBtcValue = (value: number) => {
		if (!props.assetList.length) return 0;
		const btcAsset = props.assetList.find((asset) => asset.id === 'bitcoin');
		return +(value / btcAsset?.current_price!).toFixed(8);
	};

	return (
		<div className="asset-list">
			{!props.assetList.length && (
				<span className="loading-text">Loading data...</span>
			)}
			{props.assetList.sort().map((asset) => {
				const btcValue =
					asset.id === 'bitcoin' ? null : getBtcValue(asset.current_price);
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
