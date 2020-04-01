import {Dialog, DialogContent, DialogContentText, DialogTitle, Slide} from '@material-ui/core';
import {TransitionProps} from '@material-ui/core/transitions';
import React from 'react';

const Transition = React.forwardRef(function Transition(
	props: TransitionProps & { children?: React.ReactElement<any, any> },
	ref: React.Ref<unknown>,
) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export default function Alert({open, setOpen, title, text} : {
	open: boolean;
	setOpen: (v: boolean) => void;
	title: string;
	text: string;
}): React.ReactElement {
	const handleClose = () => {
		setOpen(false);
	};
	return <Dialog
		open={open}
		TransitionComponent={Transition}
		keepMounted
		onClose={handleClose}
		aria-labelledby="alert-dialog-slide-title"
		aria-describedby="alert-dialog-slide-description"
	>
		<DialogTitle id="alert-dialog-slide-title">{title}</DialogTitle>
		<DialogContent>
			<DialogContentText id="alert-dialog-slide-description">
				{text}
			</DialogContentText>
		</DialogContent>
	</Dialog>
}
