import { CoinMarketData } from '../services/coingecko';
import '../styles/SideBar.css';
import { numberWithCommas } from '../utils';

type P = {
	activeAsset: CoinMarketData | null;
};

const TableRow = ({
	label,
	data,
	dataClassName
}: {
	label: string;
	data: string;
	dataClassName?: string;
}) => (
	<div className="data-row">
		<strong>{label}:</strong>
		<div>
			<span className={dataClassName ?? ''}>{data}</span>
		</div>
	</div>
);

export default function SideBar(props: P) {
	if (!props.activeAsset) return null;
	const {
		ath,
		ath_date,
		atl,
		atl_date,
		circulating_supply,
		price_change_percentage_24h,
		market_cap,
		symbol,
		high_24h,
		low_24h,
		last_updated
	} = props.activeAsset;

	const allTimeHighDate = new Date(ath_date).toLocaleDateString();
	const atlDate = new Date(atl_date).toLocaleDateString();
	const lastUpdated = new Date(last_updated).toLocaleString();

	return (
		<div className="side-bar-container">
			<TableRow
				label="24h %"
				data={`${price_change_percentage_24h}%`}
				dataClassName={`figure ${
					price_change_percentage_24h < 0 ? 'negative' : 'positive'
				}`}
			/>
			<TableRow label="High 24h" data={`${high_24h} ${symbol}`} />
			<TableRow label="Low 24h" data={`${low_24h} ${symbol}`} />
			<TableRow label="Market Cap" data={`$${numberWithCommas(market_cap)}`} />
			<TableRow
				label="Circulating supply"
				data={`$${numberWithCommas(circulating_supply)} ${symbol}`}
			/>
			<TableRow
				label="All time high"
				data={`$${numberWithCommas(ath)} on ${allTimeHighDate}`}
			/>
			<TableRow label="All time low" data={`$${atl} on ${atlDate}`} />
			<TableRow label="Last updated" data={lastUpdated} />
		</div>
	);
}
