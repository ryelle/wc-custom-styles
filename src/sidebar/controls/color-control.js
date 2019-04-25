/**
 * WordPress Dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import {
	Button,
	ColorPicker,
	Dropdown,
	IconButton,
	PanelRow,
	TextControl,
} from '@wordpress/components';

const style = {
	width: '32px',
	height: '32px',
	borderRadius: '50%',
	backgroundColor: 'currentColor',
};

const ColorControl = ( { color, name } ) => (
	<PanelRow key={ color }>
		<Dropdown
			renderToggle={ ( { isOpen, onToggle } ) => (
				<IconButton
					aria-expanded={ isOpen }
					onClick={ onToggle }
					aria-label={ __(
						'Custom color picker',
						'wc-custom-block-styles'
					) }
					icon={ <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10"><circle r="5" cy="5" cx="5" /></svg> }
					style={ { ...style, color } }
				/>
			) }
			renderContent={ () => (
				<ColorPicker
					color={ color }
					onChangeComplete={ ( c ) => console.log( c.hex ) }
					disableAlpha
				/>
			) }
		/>
		<div style={ { paddingLeft: '8px' } }>
			<TextControl
				label={ __( 'Color Name', 'wc-custom-block-styles' ) }
				value={
					name ||
					// translators: %s: color hex code e.g: "#f00".
					sprintf( __( 'Color code: %s', 'wc-custom-block-styles' ), color )
				}
				onChange={ () => {} }
			/>
		</div>
		<IconButton
			icon="trash"
			isDestructive
			label={ __( 'Remove', 'wc-custom-block-styles' ) }
			onClick={ () => {} }
		/>
	</PanelRow>
);

export default ColorControl;
