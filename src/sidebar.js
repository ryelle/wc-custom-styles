/**
 * External Dependencies
 */
import { Fragment } from '@wordpress/element';
import { getBlockTypes } from '@wordpress/blocks';
import { map } from 'lodash';
import {  Panel, PanelBody, PanelRow, SelectControl } from '@wordpress/components';
import { withSelect } from '@wordpress/data';

/**
 * Internal Dependencies
 */
import StyleControl from './style-control';

const Sidebar = ( { styles = [] } ) => {
	const blockTypes = getBlockTypes();
	console.log( styles );

	return (
		<Fragment>
			<PanelBody>
				<p>Create new block styles which apply custom classes.</p>
			</PanelBody>
			{ map( styles, ( values, block ) => (
				<PanelBody title={ block }>
					{ values.map( ( { label, name } ) => (
						<PanelRow>
							<StyleControl label={ label } name={ name } />
						</PanelRow>
					) ) }
				</PanelBody>
			) ) }
			<PanelBody>
				<PanelRow>
					<SelectControl
						label="Block"
						options={ blockTypes.map( ( block ) => ( { value: block.name, label: block.title } ) ) }
					/>
				</PanelRow>
			</PanelBody>
		</Fragment>
	);
}

export default withSelect( ( select ) => {
	const { getStylesByBlockType } = select( 'cbsui' );

	return {
		styles: getStylesByBlockType(),
	};
} )( Sidebar );
