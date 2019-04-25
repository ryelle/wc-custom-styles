/**
 * External Dependencies
 */
import { debounce } from 'lodash';

/**
 * WordPress dependencies
 */
import apiFetch from '@wordpress/api-fetch';

function saveSettings( action, { getState } ) {
	const state = getState();
	apiFetch( {
		path: '/wc-cbs/v1/settings',
		data: state,
		method: 'POST',
	} ).then(
		/* We don't need to do anything… */
	).catch( () => {
		/* We need to handle the error. */
	} );
}

export default {
	ADD_STYLE: debounce( saveSettings, 250 ),
	UPDATE_STYLE: debounce( saveSettings, 250 ),
};
