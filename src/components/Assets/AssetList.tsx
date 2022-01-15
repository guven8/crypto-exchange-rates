import Asset from './Asset';
import '../../styles/Assets.css';

export default function AssetList() {
	return (
		<div className="asset-list">
			<Asset
				name="Bitcoin"
				image="https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579"
				usdValue={57432.12}
			/>
			<Asset
				name="Ethereum"
				image="https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880"
				usdValue={3455.21}
				btcValue={0.1231}
			/>
			<Asset
				name="Binance Coin"
				image="https://assets.coingecko.com/coins/images/825/large/binance-coin-logo.png?1547034615"
				usdValue={651.56}
				btcValue={0.04736}
			/>
			<Asset
				name="Basic Attention Token"
				image="https://assets.coingecko.com/coins/images/677/large/basic-attention-token.png?1547034427"
				usdValue={0.75}
				btcValue={0.000012}
			/>
		</div>
	);
}
