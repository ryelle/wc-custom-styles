/**
 * External Dependencies
 */
import { groupBy, max } from 'lodash';
import { registerStore } from '@wordpress/data';

/**
 * State structure is an array of "style" objects
 *   style.block - the block name which should use this style
 *   style.id    - a numeric ID unique to the style
 *   style.label - the human-readable name for this style
 *   style.name  - the CSS class added to the block, generated from the label
 */
const DEFAULT_STATE = CustomBlockStyle;

let latestId = max( DEFAULT_STATE.map( ( style ) => style.id ) );

const actions = {
	addStyle( block, style ) {
		return {
			type: 'ADD_STYLE',
			block,
			style,
		};
	},

	updateStyle( id, style ) {
		return {
			type: 'UPDATE_STYLE',
			id,
			style,
		};
	},

	deleteStyle( id ) {
		return {
			type: 'DELETE_STYLE',
			id,
		};
	},
};

registerStore( 'cbsui', {
	reducer( state = DEFAULT_STATE, action ) {
		switch ( action.type ) {
			case 'UPDATE_STYLE':
				return state.map( ( style ) => {
					if ( action.id === style.id ) {
						return { ...style, ...action.style };
					}
					return style;
				} );

			case 'DELETE_STYLE':
				return state.filter( ( { id } ) => id !== action.id );

			case 'ADD_STYLE':
				latestId++;
				return [
					...state,
					{
						...action.style,
						id: latestId,
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
