/**
 * External Dependencies
 */
import { map } from 'lodash';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { compose } from '@wordpress/compose';
import { PanelBody } from '@wordpress/components';
import { withSelect } from '@wordpress/data';

/**
 * Internal Dependencies
 */
import { ColorControl } from './controls';

const ColorsPanel = ( { colors } ) => {
	return (
		<PanelBody title={ __( 'Custom Colors', 'wc-custom-block-styles' ) }>
			{ map( colors, ( { color, name }, i ) => {
				return <ColorControl key={ i } color={ color } name={ name } />;
			} ) }
		</PanelBody>
	);
};

export default compose( [
	withSelect( ( select ) => {
		const { getColors } = select( 'wc-custom-block-style' );

		return {
			colors: getColors(),
		};
	} ),
] )( ColorsPanel );
