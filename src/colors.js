/*
 * WordPress dependencies
 */
// import { __ } from '@wordpress/i18n';
import { render } from '@wordpress/element';

/*
 * Internal dependencies
 */
import ColorsPanel from './app';

render(
	<ColorsPanel colors={ CustomBlockStyle.colors } />,
	document.getElementById( 'wc-cbs-colors' )
);
