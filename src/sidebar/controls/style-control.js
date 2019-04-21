/**
 * External Dependencies
 */
import { __ } from '@wordpress/i18n';
import { compose } from '@wordpress/compose';
import { IconButton, PanelRow, TextControl } from '@wordpress/components';
import { partial } from 'lodash';
import { withDispatch } from '@wordpress/data';

/**
 * Internal dependencies
 */
import { getClass } from '../../utils';

const StyleControl = ( { onChange, onRemove, style } ) => {
	const { id, label } = style;
	return (
		<fieldset>
			<legend className="screen-reader-text">{ label }</legend>
			<PanelRow>
				<div>
					<TextControl
						label={ __( 'Style Name', 'custom-block-style-ui' ) }
						value={ label }
						onChange={ partial( onChange, id ) }
					/>
					<TextControl
						label={ __( 'CSS Class', 'custom-block-style-ui' ) }
						value={ `is-style-${ getClass( style ) }` }
						readOnly
					/>
				</div>
				<IconButton
					icon="trash"
					isDestructive
					label={ __( 'Remove', 'custom-block-style-ui' ) }
					onClick={ partial( onRemove, id ) }
				/>
			</PanelRow>
		</fieldset>
	);
};

export default compose( [
	withDispatch( ( dispatch ) => {
		const { deleteStyle, updateStyle } = dispatch( 'cbsui' );

		return {
			onChange( id, value ) {
				updateStyle( id, {
					label: value,
				} );
			},
			onRemove( id ) {
				deleteStyle( id );
			},
		};
	} ),
] )( StyleControl );
