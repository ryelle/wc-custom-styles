/**
 * External Dependencies
 */
import { map } from 'lodash';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { Button } from '@wordpress/components';
import { Component } from '@wordpress/element';
import { withState } from '@wordpress/compose';

/**
 * Internal Dependencies
 */
import { ColorControl } from '../components';

class ColorsPanel extends Component {
	constructor( props ) {
		super( props );
		this.setState = this.setState.bind( this );
		this.state = {
			colors: props.colors,
		};
	}

	render() {
		const { colors, onAddClick } = this.props;

		return (
			<div>
				<h3>{ __( 'Custom Colors', 'wc-custom-block-styles' ) }</h3>
				{ map( colors, ( { color, name }, i ) => {
					return <ColorControl key={ i } color={ color } name={ name } />;
				} ) }
				<div>
					<Button onClick={ onAddClick } isDefault>
						{ __( 'Add Color', 'wc-custom-block-styles' ) }
					</Button>
				</div>
			</div>
		);
	}
}

export default withState( {
	count: 0,
} )( ColorsPanel );
