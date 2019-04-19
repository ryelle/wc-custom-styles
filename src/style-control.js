/**
 * External Dependencies
 */
import { __ } from '@wordpress/i18n';
import { TextControl } from '@wordpress/components';

/**
 * Internal dependencies
 */
import { getClassFromLabel } from './utils';

const StyleControl = ( { label } ) => {
	return (
		<fieldset>
			<legend className="screen-reader-text">{ label }</legend>
			<TextControl
				label={ __( 'Style Name', 'custom-block-style-ui' ) }
				value={ label }
			/>
			<TextControl
				label={ __( 'CSS Class', 'custom-block-style-ui' ) }
				value={ `is-style-${ getClassFromLabel( label ) }` }
				readOnly
			/>
		</fieldset>
	);
}

export default StyleControl;
