import { Action as ReduxAction } from 'redux';
import { isType } from 'typescript-fsa';

export type UIState = {
	activeAssets: string[];
};

const UIInitialState = {
	activeAssets: ['bitcoin', 'ethereum', 'binancecoin', 'basic-attention-token']
};

export function UIReducer(
	state: UIState = UIInitialState,
	action: ReduxAction
) {
	return state;
}
