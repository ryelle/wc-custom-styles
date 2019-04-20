/**
 * External Dependencies
 */
import { __ } from '@wordpress/i18n';
import { compose } from '@wordpress/compose';
import { Fragment } from '@wordpress/element';
import { getBlockTypes, getBlockType } from '@wordpress/blocks';
import { map } from 'lodash';
import { Panel, PanelBody, PanelRow, SelectControl } from '@wordpress/components';
import { withSelect } from '@wordpress/data';

/**
 * Internal Dependencies
 */
import StyleControl from './style-control';
import { getClassFromLabel } from './utils';

const Sidebar = ( { styles = [], onChange } ) => {
	const blockTypes = getBlockTypes();

	return (
		<Fragment>
			<PanelBody>
				<p>{ __( 'Create new block styles which apply custom classes.', 'custom-block-style-ui' ) }</p>
			</PanelBody>

			{ map( styles, ( values, block ) => {
				const { title } = getBlockType( block );

				return (
					<PanelBody title={ title } key={ block }>
						{ values.map( ( { id, label } ) => (
							<StyleControl
								key={ `${ block }-${ id }` }
								label={ label }
								id={ id }
							/>
						) ) }
					</PanelBody>
				);
			} ) }

			<PanelBody>
				<PanelRow>
					<SelectControl
						label={ __( 'Add a style to block', 'custom-block-style-ui' ) }
						options={ blockTypes.map( ( block ) => ( { value: block.name, label: block.title } ) ) }
					/>
				</PanelRow>
			</PanelBody>
		</Fragment>
	);
}

export default compose( [
	withSelect( ( select ) => {
		const { getStylesByBlockType } = select( 'cbsui' );

		return {
			styles: getStylesByBlockType(),
		};
	} ),
] )( Sidebar );
