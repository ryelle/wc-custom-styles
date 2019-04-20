/**
 * External Dependencies
 */
import { kebabCase } from 'lodash';

export function getClass( style ) {
	const blockName = style.block.replace( 'core/', '' );
	return kebabCase( `${ blockName } ${ style.label }` );
}
