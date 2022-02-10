const axios = require('axios').default;

interface ResponseObject<D> {
	data: D;
	status: number;
	statusText: string;
	headers: {
		'content-type': 'application/json';
	};
	request: {};
}

export type CoinMarketData = {
	id: string;
	symbol: string;
	name: string;
	image: string;
	current_price: number;
	market_cap: number;
	market_cap_rank: number;
	fully_diluted_valuation: number;
	total_volume: number;
	high_24h: number;
	low_24h: number;
	price_change_24h: number;
	price_change_percentage_24h: number;
	market_cap_change_24h: number;
	market_cap_change_percentage_24h: number;
	circulating_supply: number;
	total_supply: number;
	max_supply: number;
	ath: number;
	ath_change_percentage: number;
	ath_date: string;
	atl: number;
	atl_change_percentage: number;
	atl_date: string;
	roi: null | {
		times: number;
		currency: string;
		percentage: number;
	};
	last_updated: string;
};

export class CoinGeckoClient {
	private baseUrl: string;

	constructor() {
		this.baseUrl = 'https://api.coingecko.com/api/v3';
	}

	async getCoinMarkets(currency: string) {
		try {
			const response: ResponseObject<CoinMarketData[]> = await axios.get(
				`${this.baseUrl}/coins/markets?vs_currency=${currency}`
			);
			return response;
		} catch (error) {
			throw error;
		}
	}
}
