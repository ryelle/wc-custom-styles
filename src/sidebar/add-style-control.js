/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { compose } from '@wordpress/compose';
import { getBlockTypes } from '@wordpress/blocks';
import { PanelRow, SelectControl } from '@wordpress/components';
import { withDispatch } from '@wordpress/data';

const AddStyleControl = ( { onChange } ) => {
	const blockTypes = getBlockTypes().filter(
		// If supported, customClassName is omitted, so we need to check for false explicitly.
		( { supports = {} } ) => supports.customClassName !== false
	);
	blockTypes.unshift( {
		name: 'none',
		title: __( 'Select Block Type', 'custom-block-style-ui' ),
	} );

	return (
		<PanelRow>
			<SelectControl
				label={ __( 'Add a style to block', 'custom-block-style-ui' ) }
				value="none"
				options={ blockTypes.map( ( block ) => ( {
					value: block.name,
					label: block.title,
				} ) ) }
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
				addStyle( block, {
					label: '',
					name: '',
				} );
			},
		};
	} ),
] )( AddStyleControl );
