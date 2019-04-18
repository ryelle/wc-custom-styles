/**
 * External Dependencies
 */
import { Fragment } from '@wordpress/element';
import { PluginSidebar, PluginSidebarMoreMenuItem } from '@wordpress/edit-post';
import { SelectControl } from '@wordpress/components';
import { registerBlockStyle } from '@wordpress/blocks';
import { registerPlugin } from '@wordpress/plugins';

/**
 * Internal Dependencies
 */
import './store';
import CustomStylesSidebar from './sidebar';

const title = 'Custom Block Styles';
const name = 'cbsui/custom-styles';
const icon = 'admin-appearance';

registerPlugin( 'cbsui-custom-styles', { render: () => (
	<Fragment>
		<PluginSidebarMoreMenuItem icon={ icon } target={ name }>
			{ title }
		</PluginSidebarMoreMenuItem>

		<PluginSidebar name={ name } title={ title } icon={ icon }>
			<CustomStylesSidebar />
		</PluginSidebar>
	</Fragment>
) } );

CustomBlockStyle.forEach( ( { block, ...style } ) => {
	registerBlockStyle( block, style );
} );
