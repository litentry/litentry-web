import {List, ListItem} from '@material-ui/core';
import React from 'react';
import Text from './Text';

export function IdentitiesList ({identities, onClick} : {
	identities: string[];
	onClick: (item: string) => void;
}) {
	return <List>
	{identities.map((identity, index) => (
			<ListItem button key={identity+index} onClick={(e:any): void=>{
				e.preventDefault();
				onClick(identity)
			}}>
				<Text variant='h4' text={identity}/>
			</ListItem>
		))}
	</List>
}
