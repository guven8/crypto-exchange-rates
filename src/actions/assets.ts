import actionCreatorFactory from 'typescript-fsa';
import { CoinGeckoClient, CoinMarketData } from '../services/coingecko';

const actionCreator = actionCreatorFactory();

export const getAssetsAsync = actionCreator.async<
	{ currency: string },
	CoinMarketData[]
>('GET_ASSETS');
export function getAssets(currency: string) {
	return async (dispatch: any) => {
		const params = { currency };
		dispatch(getAssetsAsync.started(params));
		const coinGeckoClient = new CoinGeckoClient();

		try {
			var result = await coinGeckoClient.getCoinMarkets(currency);
		} catch (error: any) {
			dispatch(getAssetsAsync.failed({ params, error }));
			throw error;
		}
		if (result.status === 200) {
			return dispatch(getAssetsAsync.done({ params, result: result.data }));
		} else {
			return dispatch(getAssetsAsync.failed({ params, error: result }));
		}
	};
}
