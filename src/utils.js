/**
 * External Dependencies
 */
import { kebabCase } from 'lodash';

export function getClassFromLabel( label ) {
	return kebabCase( label )
}
