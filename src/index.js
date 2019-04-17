/**
 * External Dependencies
 */
import { map } from 'lodash';
import { registerBlockStyle } from '@wordpress/blocks';
import { registerPlugin } from '@wordpress/plugins';

/**
 * Internal Dependencies
 */
import CustomStylesSidebar from './sidebar';

registerPlugin( 'cbsui-custom-styles', { render: CustomStylesSidebar } );

map( CustomBlockStyle, ( ( values, block ) => {
	values.forEach( style => {
		registerBlockStyle( block, style );
	} )
} ) );

