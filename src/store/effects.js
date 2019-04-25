/**
 * External Dependencies
 */
import { debounce } from 'lodash';

/**
 * WordPress dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';
import { dispatch } from '@wordpress/data';

function saveSettings( action, { getState } ) {
	const state = getState();
	apiFetch( {
		path: '/wc-cbs/v1/settings',
		data: state,
		method: 'POST',
	} )
		/* We don't need to do anything… */
		.then()
		.catch( ( error ) => {
			/* We need to handle the error. */
			const message = sprintf(
				__( 'Error saving block styles: %s', 'wc-custom-block-styles' ),
				error.message
			);
			dispatch( 'core/notices' ).createNotice( 'warning', message, {
				isDismissible: true,
			} );
		} );
}

export default {
	ADD_STYLE: debounce( saveSettings, 250 ),
	DELETE_STYLE: debounce( saveSettings, 250 ),
	UPDATE_STYLE: debounce( saveSettings, 250 ),
};
