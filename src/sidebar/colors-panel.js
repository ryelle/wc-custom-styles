/**
 * External Dependencies
 */
import { map } from 'lodash';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';

/**
 * Internal Dependencies
 */
import ColorControl from './controls/color-control';

const DEFAULT_COLORS = Array.isArray( CustomBlockStyle.colors ) ? CustomBlockStyle.colors : [];

const ColorsPanel = ( { colors = DEFAULT_COLORS } ) => {
	return (
		<PanelBody title={ __( 'Custom Colors', 'wc-custom-block-styles' ) }>
			{ map( colors, ( { color, name } ) => {
				return <ColorControl key={ color } color={ color } name={ name } />;
			} ) }
		</PanelBody>
	);
};

export default ColorsPanel;
