import { usePrevious } from '../../hooks/usePrevious';
import '../../styles/Assets.css';

type P = {
	name: string;
	image: string;
	value: number;
	currencySymbol: string;
	btcValue?: number | null;
};

export default function Asset(props: P) {
	const numberWithCommas = (num: number) =>
		num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	const prevValue = usePrevious(props.value);

	const differenceValue = !!prevValue
		? +(props.value - prevValue).toFixed(2)
		: 0;

	return (
		<div className={`asset-container ${!!differenceValue ? 'updated' : ''}`}>
			<div className="asset-image-name-container">
				<img src={props.image} className="asset-image" />
				<span className="asset-name">{props.name}</span>
			</div>
			<div className="asset-value-container">
				<span className="asset-usd-value">
					{differenceValue !== 0 && (
						<span
							className={`difference-value ${
								differenceValue < 0 ? 'minus' : 'plus'
							}`}
						>
							{props.currencySymbol}
							{Math.abs(differenceValue)}
						</span>
					)}
					{props.currencySymbol}
					{numberWithCommas(props.value)}
				</span>
				<span className="asset-btc-value">
					{!!props.btcValue && `${props.btcValue} BTC`}
				</span>
			</div>
		</div>
	);
}
