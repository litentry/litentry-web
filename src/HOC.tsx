import React, {useContext} from 'react';
import {PlaceHolder} from './components/PlaceHolder';
import {AppStateContext} from './stores/appStateContext';

export type PropsWithCurrentIdentity = {currentIdentity: string};

export function withCurrentIdentity<
	T extends { currentIdentity: string}
	>(WrappedComponent: React.ComponentType<any>): React.ComponentType<Omit<T, 'currentIdentity'>> {
	return (props): React.ReactElement => {
		const {state} = useContext(AppStateContext);
		const { currentIdentity } = state;
		if (!currentIdentity || currentIdentity === '') return <PlaceHolder text="Please Login first" variant="h4"/>;
		return <WrappedComponent {...props} currentIdentity={currentIdentity} />;
	};
}
