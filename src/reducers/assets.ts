import { Action as ReduxAction } from 'redux';
import { isType } from 'typescript-fsa';
import { getAssetsAsync } from '../actions/assets';
import { CoinMarketData } from '../services/coingecko';

export type AssetsState = {
	marketData: CoinMarketData[];
	activeAssets: string[];
};

const assetsInitialState = {
	marketData: [],
	activeAssets: ['bitcoin', 'ethereum', 'binancecoin', 'basic-attention-token']
};

export function assetsReducer(
	state: AssetsState = assetsInitialState,
	action: ReduxAction
) {
	if (isType(action, getAssetsAsync.done)) {
		state = {
			activeAssets: state.activeAssets,
			marketData: action.payload.result
		};
	}

	return state;
}
