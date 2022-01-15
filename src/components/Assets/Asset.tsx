import '../../styles/Assets.css';

type P = {
	name: string;
	image: string;
	usdValue: number;
	btcValue?: number;
};

export default function Asset(props: P) {
	const numberWithCommas = (num: number) =>
		num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

	return (
		<div className="asset-container">
			<div className="asset-image-name-container">
				<img src={props.image} className="asset-image" />
				<span className="asset-name">{props.name}</span>
			</div>
			<div className="asset-value-container">
				<span className="asset-usd-value">
					${numberWithCommas(props.usdValue)}
				</span>
				<span className="asset-btc-value">
					{props.btcValue} {!!props.btcValue && 'BTC'}
				</span>
			</div>
		</div>
	);
}
