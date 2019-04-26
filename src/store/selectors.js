/**
 * External Dependencies
 */
import { groupBy } from 'lodash';

export default {
	getColors( state = {} ) {
		return state.colors;
	},

	getStyles( state = {} ) {
		return state.styles;
	},

	getStylesByBlockType( state = {} ) {
		return groupBy( state.styles, 'block' );
	},
};
