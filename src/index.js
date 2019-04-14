/**
 * External Dependencies
 */
import { map } from 'lodash';
import { registerBlockStyle } from '@wordpress/blocks';

map( CustomBlockStyle, ( ( values, block ) => {
	values.forEach( style => {
		registerBlockStyle( block, style );
	} )
} ) );

