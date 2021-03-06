/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { compose } from '@wordpress/compose';
import { getBlockTypes } from '@wordpress/blocks';
import { PanelRow, SelectControl } from '@wordpress/components';
import { withDispatch } from '@wordpress/data';

const UNSUPPORTED_BLOCKS = [
	'core/media-text',
	'core/cover',
	'core/columns',
	'core/column',
	'core/group',
];

const AddStyleControl = ( { onChange } ) => {
	const blockTypes = getBlockTypes().filter( ( { name, supports = {} } ) => {
		return (
			// If supported, customClassName is omitted, so we need to explicitly check.
			supports.customClassName !== false &&
			UNSUPPORTED_BLOCKS.indexOf( name ) < 0
		);
	} );
	blockTypes.unshift( {
		name: 'none',
		title: __( 'Select Block Type', 'wc-custom-block-styles' ),
	} );

	return (
		<PanelRow>
			<SelectControl
				label={ __( 'Select block to style', 'wc-custom-block-styles' ) }
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
		const { addStyle } = dispatch( 'wc-custom-block-style' );

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
