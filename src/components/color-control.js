/**
 * External Dependencies
 */
import { partial } from 'lodash';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { IconButton, PanelRow, TextControl } from '@wordpress/components';

/**
 * Internal Dependencies
 */
import ColorPickerButton from './color-picker-button';

const identity = ( e ) => e;

const ColorControl = ( {
	color,
	name,
	onChangeColor = identity,
	onChangeLabel = identity,
	onDelete = identity,
} ) => (
	<PanelRow>
		<ColorPickerButton color={ color } onChangeColor={ onChangeColor } />
		<div style={ { paddingLeft: '8px' } }>
			<TextControl
				label={ __( 'Color Name', 'wc-custom-block-styles' ) }
				value={ name }
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

export default ColorControl;
