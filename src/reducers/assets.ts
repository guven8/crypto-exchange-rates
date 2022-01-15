import { Action as ReduxAction } from 'redux';
import { isType } from 'typescript-fsa';
import { getAssetsAsync } from '../actions/assets';
import { CoinMarketData } from '../services/coingecko';

export type AssetsState = CoinMarketData[];

export function assetsReducer(state: AssetsState = [], action: ReduxAction) {
	if (isType(action, getAssetsAsync.done)) {
		state = action.payload.result;
	}

	return state;
}
