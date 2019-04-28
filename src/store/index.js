/**
 * External Dependencies
 */
import { max } from 'lodash';

/**
 * WordPress Dependencies
 */
import { combineReducers, registerStore } from '@wordpress/data';

/**
 * Internal dependencies
 */
import actions from './actions';
import applyMiddlewares from './middleware';
import { getClass } from '../utils';
import selectors from './selectors';

/**
 * State structure is an array of "style" objects
 *   style.block - the block name which should use this style
 *   style.id    - a numeric ID unique to the style
 *   style.label - the human-readable name for this style
 *   style.name  - the CSS class added to the block, generated from the label
 */
const DEFAULT_STYLES = Array.isArray( CustomBlockStyle.styles ) ? CustomBlockStyle.styles : [];

let latestId = max( DEFAULT_STYLES.map( ( style ) => style.id ) );

const styleReducer = ( state = DEFAULT_STYLES, action ) => {
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
};

/**
 * State structure is an array of "color" objects
 *   color.name - The human-readable name for this color
 *   color.slug - Used as part of the class name, `has-{slug}-background-color`, `has-{slug}-color`.
 *   color.color - The hex value for this color.
 */
const DEFAULT_COLORS = Array.isArray( CustomBlockStyle.colors ) ? CustomBlockStyle.colors : [];

const colorReducer = ( state = DEFAULT_COLORS, action ) => {
	switch ( action.type ) {
		case 'UPDATE_COLOR':
			return state.map( ( color ) => {
				if ( action.hex === color.color ) {
					return { ...color, ...action.color };
				}
				return color;
			} );

		case 'DELETE_COLOR':
			return state.filter( ( { color } ) => color !== action.color );

		case 'ADD_COLOR':
			return [
				...state,
				{
					name: '',
					slug: '',
					color: '',
				},
			];
	}

	return state;
};

const store = registerStore( 'wc-custom-block-style', {
	reducer: combineReducers( {
		styles: styleReducer,
		colors: colorReducer,
	} ),

	actions,
	selectors,
} );
applyMiddlewares( store );

export default store;
