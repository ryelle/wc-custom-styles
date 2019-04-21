/**
 * External Dependencies
 */
import { map } from 'lodash';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';
import { compose } from '@wordpress/compose';
import { Fragment } from '@wordpress/element';
import { getBlockType } from '@wordpress/blocks';
import { withSelect } from '@wordpress/data';

/**
 * Internal Dependencies
 */
import { AddStyleControl, StyleControl } from './controls';

const Sidebar = ( { styles = [] } ) => {
	return (
		<Fragment>
			<PanelBody>
				<p>{ __( 'Create new block styles which apply custom classes.', 'custom-block-style-ui' ) }</p>
			</PanelBody>

			{ map( styles, ( values, block ) => {
				const { title } = getBlockType( block );

				return (
					<PanelBody title={ title } key={ block }>
						{ values.map( ( style ) => (
							<StyleControl
								key={ `${ block }-${ style.id }` }
								style={ style }
							/>
						) ) }
					</PanelBody>
				);
			} ) }

			<PanelBody>
				<AddStyleControl />
			</PanelBody>
		</Fragment>
	);
};

export default compose( [
	withSelect( ( select ) => {
		const { getStylesByBlockType } = select( 'cbsui' );

		return {
			styles: getStylesByBlockType(),
		};
	} ),
] )( Sidebar );
