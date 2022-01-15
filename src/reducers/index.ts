import { combineReducers } from 'redux';
import { assetsReducer, AssetsState } from './assets';

export interface AppState {
	assets: AssetsState;
}

export const rootReducer = combineReducers<AppState>({
	assets: assetsReducer
});
