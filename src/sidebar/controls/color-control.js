/**
 * External Dependencies
 */
import { partial } from 'lodash';

/**
 * WordPress Dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import {
	IconButton,
	PanelRow,
	TextControl,
} from '@wordpress/components';
import { compose } from '@wordpress/compose';
import { withDispatch } from '@wordpress/data';

/**
 * Internal Dependencies
 */
import ColorPickerButton from './color-picker-button';

const ColorControl = ( { color, name, onChangeColor, onChangeLabel, onDelete } ) => (
	<PanelRow>
		<ColorPickerButton color={ color } onChangeColor={ onChangeColor } />
		<div style={ { paddingLeft: '8px' } }>
			<TextControl
				label={ __( 'Color Name', 'wc-custom-block-styles' ) }
				value={
					name ||
					// translators: %s: color hex code e.g: "#f00".
					sprintf( __( 'Color code: %s', 'wc-custom-block-styles' ), color )
				}
				onChange={ partial( onChangeLabel, color ) }
			/>
		</div>
		<IconButton
			icon="trash"
			isDestructive
			label={ __( 'Remove', 'wc-custom-block-styles' ) }
			onClick={ partial( onDelete, color ) }
		/>
	</PanelRow>
);

export default compose( [
	withDispatch( ( dispatch ) => {
		const { deleteColor, updateColor } = dispatch( 'wc-custom-block-style' );

		return {
			onChangeLabel( hex, name ) {
				updateColor( hex, { name } );
			},
			onChangeColor( hex, { hex: color } ) {
				updateColor( hex, { color } );
			},
			onDelete: deleteColor,
		};
	} ),
] )( ColorControl );
