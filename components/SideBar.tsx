import { CoinMarketData } from '../services/coingecko';
import '../styles/SideBar.css';
import { numberWithCommas } from '../utils';

type P = {
	activeAsset: CoinMarketData | null;
};

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
		low_24h
	} = props.activeAsset;

	const allTimeHighDate = new Date(ath_date).toLocaleDateString();
	const atlDate = new Date(atl_date).toLocaleDateString();

	return (
		<div className="side-bar-container">
			<table>
				<tbody>
					<tr>
						<td>
							<strong>24h %</strong>
						</td>
						<td
							className={`figure ${
								price_change_percentage_24h < 0 ? 'negative' : 'positive'
							}`}
						>
							{price_change_percentage_24h}%
						</td>
					</tr>
					<tr>
						<td>
							<strong>High 24h</strong>
						</td>
						<td>
							{high_24h} {symbol}
						</td>
					</tr>
					<tr>
						<td>
							<strong>Low 24h</strong>
						</td>
						<td>
							{low_24h} {symbol}
						</td>
					</tr>
					<tr>
						<td>
							<strong>Market Cap</strong>
						</td>
						<td>${numberWithCommas(market_cap)}</td>
					</tr>
					<tr>
						<td>
							<strong>Circulating supply</strong>
						</td>
						<td>
							{numberWithCommas(circulating_supply)} {symbol}
						</td>
					</tr>
					<tr>
						<td>
							<strong>All time high:</strong>
						</td>
						<td>
							${numberWithCommas(ath)} ({allTimeHighDate})
						</td>
					</tr>
					<tr>
						<td>
							<strong>All time low:</strong>
						</td>
						<td>
							${atl} ({atlDate})
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
}
