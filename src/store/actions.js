export default {
	addStyle( block, style ) {
		return {
			type: 'ADD_STYLE',
			block,
			style,
		};
	},

	deleteStyle( id ) {
		return {
			type: 'DELETE_STYLE',
			id,
		};
	},

	updateStyle( id, style ) {
		return {
			type: 'UPDATE_STYLE',
			id,
			style,
		};
	},
};
