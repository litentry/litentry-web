import colors from './colors';

const fontStyles = {
	a_button: {
		color: colors.background.app,
		fontWeight: 'normal',
		fontSize: 20
	},
	a_text: {
		color: colors.text.main,
		fontWeight: 'normal',
		fontSize: 12,
		letterSpacing: 0.4
	},
	h1: {
		color: colors.text.main,
		fontWeight: 'bold',
		fontSize: 22
	},
	h2: {
		color: colors.text.main,
		fontWeight: 'normal',
		fontSize: 18
	},
	h_subheading: {
		color: colors.text.main,
		fontWeight: 'normal',
		fontSize: 14,
		textTransform: 'uppercase'
	},
	i_large: {
		fontSize: 22
	},
	i_medium: {
		fontSize: 18
	},
	i_small: {
		fontSize: 10
	},
	quote: {
		color: colors.text.main,
		fontWeight: 'lighter',
		fontSize: 28
	},
	t_big: {
		color: colors.text.main,
		fontWeight: 'normal',
		fontSize: 16
	},
	t_code: {
		color: colors.text.main,
		fontWeight: 'normal',
		fontFamily: 'Georgia, serif',
		fontSize: 15
	},
	t_codeS: {
		color: colors.text.main,
		fontWeight: 'normal',
		fontFamily: 'Georgia, serif',
		fontSize: 11,
		letterSpacing: 0.2
	},
	t_important: {
		color: colors.text.main,
		fontWeight: 'bold',
		fontSize: 13
	},
	t_label: {
		backgroundColor: colors.signal.main,
		fontFamily: 'Georgia, serif',
		color: colors.text.main,
		fontWeight: 'normal',
		fontSize: 13
	},
	t_prefix: {
		color: colors.text.main,
		fontWeight: 'normal',
		fontFamily: 'Georgia, serif',
		fontSize: 14,
		textTransform: 'uppercase'
	},
	t_regular: {
		color: colors.text.main,
		fontWeight: 'normal',
		fontSize: 12
	},
	t_seed: {
		borderColor: colors.background.card,
		borderWidth: 0.8,
		color: colors.signal.main,
		fontWeight: 'lighter',
		fontSize: 18,
		letterSpacing: 0.7,
		lineHeight: 23,
		minHeight: 100,
		paddingHorizontal: 16,
		paddingVertical: 10
	}
};
export default fontStyles;
