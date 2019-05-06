/*
 * External dependencies
 */
import { isEqual } from 'lodash';

/*
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { dispatch } from '@wordpress/data';
import { Fragment } from '@wordpress/element';
import { PluginSidebar, PluginSidebarMoreMenuItem } from '@wordpress/edit-post';
import { registerBlockStyle, unregisterBlockStyle } from '@wordpress/blocks';
import { registerPlugin } from '@wordpress/plugins';

/*
 * Internal dependencies
 */
import store from './store';
import CustomStylesSidebar from './sidebar';

const title = __( 'Custom Block Styles', 'wc-custom-block-styles' );
const name = 'wc-cbs/custom-styles';
const icon = 'admin-appearance';

registerPlugin( 'wc-custom-block-styles', { render: () => (
	<Fragment>
		<PluginSidebarMoreMenuItem icon={ icon } target={ name }>
			{ title }
		</PluginSidebarMoreMenuItem>

		<PluginSidebar name={ name } title={ title } icon={ icon }>
			<CustomStylesSidebar />
		</PluginSidebar>
	</Fragment>
) } );

let prevColors = [];
let prevStyles = [];
function updateBlockStyles() {
	const { colors, styles } = store.getState();
	const activeColors = colors.filter( ( color ) => !! color.slug );
	const activeStyles = styles.filter( ( style ) => !! style.name );

	if ( ! isEqual( prevColors, activeColors ) ) {
		dispatch( 'core/block-editor' ).updateSettings( { colors: activeColors } );
		prevColors = activeColors;
	}

	if ( ! isEqual( prevStyles, activeStyles ) ) {
		prevStyles.forEach( ( { block, ...style } ) => {
			unregisterBlockStyle( block, style.name );
		} );

		activeStyles.forEach( ( { block, ...style } ) => {
			registerBlockStyle( block, style );
		} );

		prevStyles = activeStyles;
	}
}

updateBlockStyles();
store.subscribe( updateBlockStyles );
