export default {
	addColor() {
		return {
			type: 'ADD_COLOR',
		};
	},

	deleteColor( color ) {
		return {
			type: 'DELETE_COLOR',
			color,
		};
	},

	updateColor( hex, color ) {
		return {
			type: 'UPDATE_COLOR',
			hex,
			color,
		};
	},

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
