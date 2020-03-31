import React, {Dispatch, useReducer} from 'react';
import _ from 'lodash';

export const actions = {
	NAVIGATE: 'navigate',
	ADD_IDENTITY: 'add_identity',
	LOGIN_START: 'login_start',
};

export interface AppState {
	route: string;
	drawerOpen: boolean;
	identities: string[];
	currentIdentity: null| string;
}

export interface AppContextType {
	state: AppState,
	dispatch: Dispatch<any>
}

export const initState = {
	route: 'main',
	drawerOpen: false,
	identities: ['0x123456562564254325432'],
	currentIdentity: null,
};

export const AppContext = React.createContext<AppContextType>({state: initState, dispatch: ()=> {}});
export const StateProvider = AppContext.Provider;


export function reducer(state: AppState, action: any): AppState {
	console.log('current state is', state, 'dispatch action', action);
	switch (action.type) {
		case actions.NAVIGATE:
			return {...state, route: action.data};
		case actions.ADD_IDENTITY:
			return {...state, identities: _.concat(state.identities, action.data)};
		case actions.LOGIN_START:
			return {...state, route: 'login', currentIdentity: action.data.identity};
		default:
			return state;
	}
}

