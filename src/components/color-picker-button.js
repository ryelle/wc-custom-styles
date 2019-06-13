/**
 * External Dependencies
 */
import { partial } from 'lodash';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { ColorPicker, Dropdown, IconButton } from '@wordpress/components';

const style = {
	width: '32px',
	height: '32px',
	borderRadius: '50%',
	backgroundColor: 'currentColor',
};

export default function( { color, onChangeColor } ) {
	return (
		<Dropdown
			renderToggle={ ( { isOpen, onToggle } ) => (
				<IconButton
					aria-expanded={ isOpen }
					onClick={ onToggle }
					aria-label={ __( 'Custom color picker', 'wc-custom-block-styles' ) }
					icon={
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10">
							<circle r="5" cy="5" cx="5" />
						</svg>
					}
					style={ { ...style, color } }
				/>
			) }
			renderContent={ () => (
				<ColorPicker
					color={ color }
					onChangeComplete={ ( value ) =>
						onChangeColor( color, { color: value.hex } )
					}
					disableAlpha
				/>
			) }
		/>
	);
}
