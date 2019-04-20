/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { compose } from '@wordpress/compose';
import { getBlockTypes } from '@wordpress/blocks';
import { PanelRow, SelectControl } from '@wordpress/components';
import { withDispatch } from '@wordpress/data';

const AddStyleControl = ( { onChange } ) => {
	const blockTypes = getBlockTypes();

	return (
		<PanelRow>
			<SelectControl
				label={ __( 'Add a style to block', 'custom-block-style-ui' ) }
				options={ blockTypes.map( ( block ) => ( { value: block.name, label: block.title } ) ) }
				onChange={ onChange }
			/>
		</PanelRow>
	);
};

export default compose( [
	withDispatch( ( dispatch ) => {
		const { addStyle } = dispatch( 'cbsui' );

		return {
			onChange( block ) {
				console.log( block );
				addStyle( block.name, {
					label: '',
					name: '',
				} );
			},
		};
	} ),
] )( AddStyleControl );
