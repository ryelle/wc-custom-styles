/*
 * WordPress dependencies
 */
import { Fragment } from '@wordpress/element';
import { PluginSidebar, PluginSidebarMoreMenuItem } from '@wordpress/edit-post';
import { registerBlockStyle, unregisterBlockStyle } from '@wordpress/blocks';
import { registerPlugin } from '@wordpress/plugins';

/*
 * Internal dependencies
 */
import store from './store';
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

let prevStyles = [];
function updateBlockStyles() {
	const styles = store.getState();
	const activeStyles = styles.filter( ( style ) => !! style.name );

	prevStyles.forEach( ( { block, ...style } ) => {
		unregisterBlockStyle( block, style.name );
	} );

	activeStyles.forEach( ( { block, ...style } ) => {
		registerBlockStyle( block, style );
	} );

	prevStyles = activeStyles;
}

updateBlockStyles();
store.subscribe( updateBlockStyles );
