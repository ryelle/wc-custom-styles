/**
 * WordPress Dependencies
 */
import { registerStore } from '@wordpress/data';

/**
 * Internal dependencies
 */
import actions from './actions';
import applyMiddlewares from './middleware';
import reducer from './reducers';
import selectors from './selectors';

const store = registerStore( 'wc-custom-block-style', {
	reducer,
	actions,
	selectors,
} );
applyMiddlewares( store );

export default store;
