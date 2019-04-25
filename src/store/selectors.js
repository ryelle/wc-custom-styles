/**
 * External Dependencies
 */
import { groupBy } from 'lodash';

export default {
	getStyles( state ) {
		return state;
	},

	getStylesByBlockType( state ) {
		return groupBy( state, 'block' );
	},
};
