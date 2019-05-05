/**
 * WordPress Dependencies
 */
import { combineReducers } from '@wordpress/data';

/**
 * Internal dependencies
 */
import colors from './colors';
import styles from './styles';

export default combineReducers( {
	colors,
	styles,
} );
