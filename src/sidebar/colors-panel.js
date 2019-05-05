/**
 * External Dependencies
 */
import { map } from 'lodash';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { Button, PanelBody, PanelRow } from '@wordpress/components';
import { compose } from '@wordpress/compose';
import { withDispatch, withSelect } from '@wordpress/data';

/**
 * Internal Dependencies
 */
import { ColorControl } from './controls';

const ColorsPanel = ( { colors, onAddClick } ) => {
	return (
		<PanelBody title={ __( 'Custom Colors', 'wc-custom-block-styles' ) }>
			{ map( colors, ( { color, name }, i ) => {
				return <ColorControl key={ i } color={ color } name={ name } />;
			} ) }
			<PanelRow>
				<Button onClick={ onAddClick } isDefault>{ __( 'Add Color', 'wc-custom-block-styles' ) }</Button>
			</PanelRow>
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
	withDispatch( ( dispatch ) => {
		const { addColor } = dispatch( 'wc-custom-block-style' );

		return {
			onAddClick: addColor,
		};
	} ),
] )( ColorsPanel );
