/**
 * External Dependencies
 */
import { max } from 'lodash';

/**
 * Internal dependencies
 */
import { getClass } from '../../utils';

/**
 * State structure is an array of "style" objects
 *   style.block - the block name which should use this style
 *   style.id    - a numeric ID unique to the style
 *   style.label - the human-readable name for this style
 *   style.name  - the CSS class added to the block, generated from the label
 */
const DEFAULT_STYLES = Array.isArray( CustomBlockStyle.styles ) ? CustomBlockStyle.styles : [];

let latestId = max( DEFAULT_STYLES.map( ( style ) => style.id ) );

export default function( state = DEFAULT_STYLES, action ) {
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
}
