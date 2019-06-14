/**
 * External Dependencies
 */
import { map, sample } from 'lodash';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';
import { Button, Panel, PanelBody, PanelRow } from '@wordpress/components';
import { Component } from '@wordpress/element';

/**
 * Internal Dependencies
 */
import { ColorControl } from '../components';
import allColors from '../data/colors';

class ColorsPanel extends Component {
	constructor( props ) {
		super( props );
		this.state = {
			colors: props.colors,
		};

		this.onAddClick = this.onAddClick.bind( this );
		this.onChange = this.onChange.bind( this );
		this.onDelete = this.onDelete.bind( this );
		this.onSave = this.onSave.bind( this );
	}

	onAddClick() {
		this.setState( ( prevState ) => ( {
			colors: [ ...prevState.colors, sample( allColors ) ],
		} ) );
	}

	onChange( current, newColor ) {
		this.setState( ( { colors } ) => {
			return {
				colors: colors.map( ( color ) => {
					if ( current === color.color ) {
						return { ...color, ...newColor };
					}
					return color;
				} ),
			};
		} );
	}

	onDelete( color ) {
		this.setState( ( prevState ) => ( {
			colors: prevState.colors.filter( ( c ) => c.color !== color ),
		} ) );
	}

	onSave() {
		apiFetch( {
			path: '/wc-cbs/v1/colors',
			data: this.state.colors,
			method: 'POST',
		} );
	}

	render() {
		const { colors } = this.state;

		return (
			<Panel header={ __( 'Custom Colors', 'wc-custom-block-styles' ) }>
				<PanelBody initialOpen={ true }>
					{ map( colors, ( { color, name }, i ) => {
						return (
							<ColorControl
								key={ i }
								color={ color }
								name={ name }
								onChange={ this.onChange }
								onDelete={ this.onDelete }
							/>
						);
					} ) }
					<PanelRow>
						<Button onClick={ this.onAddClick } isDefault>
							{ __( 'Add Color', 'wc-custom-block-styles' ) }
						</Button>
					</PanelRow>
				</PanelBody>
				<PanelBody initialOpen={ true }>
					<Button onClick={ this.onSave } isDefault>
						{ __( 'Save Colors', 'wc-custom-block-styles' ) }
					</Button>
				</PanelBody>
			</Panel>
		);
	}
}

export default ColorsPanel;
