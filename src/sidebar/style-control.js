/**
 * External Dependencies
 */
import { __ } from '@wordpress/i18n';
import { compose } from '@wordpress/compose';
import { TextControl } from '@wordpress/components';
import { partial } from 'lodash';
import { withDispatch } from '@wordpress/data';

/**
 * Internal dependencies
 */
import { getClassFromLabel } from './utils';

const StyleControl = ( { id, label, onChange } ) => {
	return (
		<fieldset>
			<legend className="screen-reader-text">{ label }</legend>
			<TextControl
				label={ __( 'Style Name', 'custom-block-style-ui' ) }
				value={ label }
				onChange={ partial( onChange, id ) }
			/>
			<TextControl
				label={ __( 'CSS Class', 'custom-block-style-ui' ) }
				value={ `is-style-${ getClassFromLabel( label ) }` }
				readOnly
			/>
		</fieldset>
	);
};

export default compose( [
	withDispatch( ( dispatch ) => {
		const { updateStyle } = dispatch( 'cbsui' );

		return {
			onChange( id, value ) {
				updateStyle( id, {
					label: value,
					name: getClassFromLabel( value ),
				} );
			},
		};
	} ),
] )( StyleControl );
