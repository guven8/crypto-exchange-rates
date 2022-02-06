import { Action as ReduxAction } from 'redux';
import { isType } from 'typescript-fsa';
import { AppState } from '.';
import { addActiveAssetAction, getAssetsAsync } from '../actions/assets';
import { CoinMarketData } from '../services/coingecko';

export type AssetsState = {
	requestTime: number;
	assetList: CoinMarketData[];
	activeAssetIds: string[];
};

const assetsInitialState = {
	requestTime: 0,
	assetList: [],
	activeAssetIds: [
		'bitcoin',
		'ethereum',
		'binancecoin',
		'basic-attention-token'
	]
};

export function assetsReducer(
	state: AssetsState = assetsInitialState,
	action: ReduxAction
) {
	if (isType(action, getAssetsAsync.done)) {
		state = {
			requestTime: Date.now(),
			activeAssetIds: state.activeAssetIds,
			assetList: action.payload.result
		};
	}

	if (isType(action, addActiveAssetAction)) {
		state = {
			requestTime: state.requestTime,
			activeAssetIds: [...state.activeAssetIds, action.payload.asset],
			assetList: state.assetList
		};
	}

	return state;
}

export const getActiveAssets = (state: AppState) =>
	state.assets.assetList.filter((asset) =>
		state.assets.activeAssetIds.includes(asset.id)
	);

export const getNonActiveAssets = (state: AppState) =>
	state.assets.assetList.filter(
		(asset) => !state.assets.activeAssetIds.includes(asset.id)
	);
