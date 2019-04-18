/**
 * External Dependencies
 */
import { groupBy } from 'lodash';
import { registerStore } from '@wordpress/data';

const DEFAULT_STATE = CustomBlockStyle;

const actions = {
	addStyle( block, style ) {
		return {
			type: 'ADD_STYLE',
			block,
			style,
		};
	},

	updateStyle( block, style ) {
		return {
			type: 'UPDATE_STYLE',
			block,
			style,
		};
	},

	// deleteStyle( block, style ){},
};

registerStore( 'cbsui', {
	reducer( state = DEFAULT_STATE, action ) {
		switch ( action.type ) {
			// case 'UPDATE_STYLE':
			// case 'DELETE_STYLE':
			case 'ADD_STYLE':
				return [
					...state,
					{
						...action.style,
						block: action.block,
					},
				];
		}

		return state;
	},

	actions,

	selectors: {
		getStyles( state ) {
			return state;
		},

		getStylesByBlockType( state ) {
			return groupBy( state, 'block' );
		},
	},
} );