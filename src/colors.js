/*
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { render } from '@wordpress/element';

/*
 * Internal dependencies
 */
import ColorsPanel from './app';

render(
	<div className="wrap">
		<h1>{ __( 'Custom Colors', 'wc-custom-block-styles' ) }</h1>
		<p>
			{ __(
				'Use this section to customize your colors for your WordCamp.',
				'wc-custom-block-styles'
			) }
		</p>
		<ColorsPanel colors={ CustomBlockStyle.colors } />
	</div>,
	document.getElementById( 'wc-cbs-colors' )
);
