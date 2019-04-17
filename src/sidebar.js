/**
 * External Dependencies
 */
import { Fragment } from '@wordpress/element';
import { getBlockTypes } from '@wordpress/blocks';
import { PluginSidebar, PluginSidebarMoreMenuItem } from '@wordpress/edit-post';
import { registerPlugin } from '@wordpress/plugins';
import { SelectControl } from '@wordpress/components';

export default function() {
	const title = 'Custom Block Styles';
	const name = 'cbsui/custom-styles';
	const icon = 'admin-appearance';

	const blockTypes = getBlockTypes();

	return (
		<Fragment>
			<PluginSidebarMoreMenuItem icon={ icon } target={ name }>
				{ title }
			</PluginSidebarMoreMenuItem>

			<PluginSidebar name={ name } title={ title } icon={ icon }>
				<p>Plugin Sidebar</p>
				
				<SelectControl
					label="Block"
					options={ blockTypes.map( ( block ) => ( { value: block.name, label: block.title } ) ) }
				/>
			</PluginSidebar>
		</Fragment>
	);
}