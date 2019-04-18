/**
 * External Dependencies
 */
import {  BaseControl, TextControl } from '@wordpress/components';
import { Fragment } from '@wordpress/element';
import { withInstanceId } from '@wordpress/compose';

const StyleControl = ( { instanceId, label, name } ) => {
	return (
		<Fragment>
			<BaseControl.VisualLabel>
				{ label }
			</BaseControl.VisualLabel>
			<TextControl
				label="Human-readable label"
				value={ label }
			/>
			<TextControl
				label="CSS class"
				value={ name }
			/>
		</Fragment>
	);
}

export default withInstanceId( StyleControl );
