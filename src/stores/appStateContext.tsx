import React, {useReducer} from 'react';

export interface AppStoreState {
	route: string;
	drawerOpen: boolean;
	identities: string[];
	currentIdentity: null| string;
}

export const initialState = {
	route: 'main',
	drawerOpen: false,
	identities: [],
	currentIdentity: '',
};

export interface AppContext {
	state: AppStoreState;
	setDrawerOpen: (shouldDrawerOpen: boolean) => void;
	navigate: (nextRouter: string) => void;
	setCurrentIdentity: (identity: string) => void;
}

export const AppStateContext = React.createContext<AppContext>({} as AppContext);

export function useAppContext(): AppContext {
	const reducer = (
		state: AppStoreState,
		delta: Partial<AppStoreState>
	): AppStoreState => ({
		...state,
		...delta
	});
	const [state, setState] = useReducer(reducer, initialState);

	function setDrawerOpen (shouldDrawerOpen: boolean): void {
		setState({drawerOpen: shouldDrawerOpen})
	}

	function navigate(nextRoute: string): void {
		setState({route: nextRoute});
	}

	function setCurrentIdentity (identity: string): void {
		setState({currentIdentity: identity});
	}

	return {
		state,
		navigate,
		setDrawerOpen,
		setCurrentIdentity
	}
}

