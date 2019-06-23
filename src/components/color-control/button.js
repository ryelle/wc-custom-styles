/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { ColorPicker, Dropdown, IconButton } from '@wordpress/components';

export default function( { color, onChangeColor } ) {
	return (
		<Dropdown
			className="wc-cbs-color-control"
			renderToggle={ ( { isOpen, onToggle } ) => (
				<IconButton
					className="wc-cbs-color-control__button"
					aria-expanded={ isOpen }
					onClick={ onToggle }
					aria-label={ __( 'Custom color picker', 'wc-custom-block-styles' ) }
					style={ { color } }
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
