/**
 * External Dependencies
 */
import { groupBy, max } from 'lodash';

/**
 * WordPress Dependencies
 */
import { registerStore } from '@wordpress/data';

/**
 * Internal dependencies
 */
import applyMiddlewares from './middleware';
import { getClass } from '../utils';

/**
 * State structure is an array of "style" objects
 *   style.block - the block name which should use this style
 *   style.id    - a numeric ID unique to the style
 *   style.label - the human-readable name for this style
 *   style.name  - the CSS class added to the block, generated from the label
 */
const DEFAULT_STATE = CustomBlockStyle;

let latestId = max( DEFAULT_STATE.map( ( style ) => style.id ) );

const store = registerStore( 'wc-custom-block-style', {
	reducer( state = DEFAULT_STATE, action ) {
		switch ( action.type ) {
			case 'UPDATE_STYLE':
				return state.map( ( style ) => {
					if ( action.id === style.id ) {
						return { ...style, ...action.style, name: getClass( action.style ) };
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

	actions: {
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
	},

	selectors: {
		getStyles( state ) {
			return state;
		},

		getStylesByBlockType( state ) {
			return groupBy( state, 'block' );
		},
	},
} );
applyMiddlewares( store );

export default store;
