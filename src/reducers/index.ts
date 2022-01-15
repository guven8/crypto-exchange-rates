import { combineReducers } from 'redux';
import { assetsReducer, AssetsState } from './assets';
import { UIReducer, UIState } from './ui';

export interface AppState {
	ui: UIState;
	assets: AssetsState;
}

export const rootReducer = combineReducers<AppState>({
	ui: UIReducer,
	assets: assetsReducer
});
