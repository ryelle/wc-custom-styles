/**
 * External Dependencies
 */
import { map } from 'lodash';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { compose } from '@wordpress/compose';
import { Fragment } from '@wordpress/element';
import { getBlockType } from '@wordpress/blocks';
import { PanelBody } from '@wordpress/components';
import { withSelect } from '@wordpress/data';

/**
 * Internal Dependencies
 */
import { AddStyleControl, StyleControl } from './controls';
import ColorsPanel from './colors-panel';

const Sidebar = ( { styles = [] } ) => {
	return (
		<Fragment>
			<PanelBody>
				<p>
					{ __(
						'Customize your blocks and colors using these settings. Some note about it being global across all posts/pages.',
						'wc-custom-block-styles'
					) }
				</p>
			</PanelBody>

			<ColorsPanel />

			<PanelBody title={ __( 'Add a new style', 'wc-custom-block-styles' ) }>
				<p>
					{ __(
						'Create new block styles which apply custom classes.',
						'wc-custom-block-styles'
					) }
				</p>
				<AddStyleControl />
			</PanelBody>

			{ map( styles, ( values, block ) => {
				const { title } = getBlockType( block );

				return (
					<PanelBody title={ title } key={ block } initialOpen={ false }>
						{ values.map( ( style ) => (
							<StyleControl key={ `${ block }-${ style.id }` } style={ style } />
						) ) }
					</PanelBody>
				);
			} ) }
		</Fragment>
	);
};

export default compose( [
	withSelect( ( select ) => {
		const { getStylesByBlockType } = select( 'wc-custom-block-style' );

		return {
			styles: getStylesByBlockType(),
		};
	} ),
] )( Sidebar );
