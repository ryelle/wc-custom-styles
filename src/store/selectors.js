/**
 * External Dependencies
 */
import { groupBy } from 'lodash';

export default {
	getStyles( state = {} ) {
		return state.styles;
	},

	getStylesByBlockType( state = {} ) {
		return groupBy( state.styles, 'block' );
	},
};
