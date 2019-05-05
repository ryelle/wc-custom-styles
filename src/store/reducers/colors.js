/**
 * State structure is an array of "color" objects
 *   color.name - The human-readable name for this color
 *   color.slug - Used as part of the class name, `has-{slug}-background-color`, `has-{slug}-color`.
 *   color.color - The hex value for this color.
 */
const DEFAULT_COLORS = Array.isArray( CustomBlockStyle.colors ) ? CustomBlockStyle.colors : [];

export default function( state = DEFAULT_COLORS, action ) {
	switch ( action.type ) {
		case 'UPDATE_COLOR':
			return state.map( ( color ) => {
				if ( action.hex === color.color ) {
					return { ...color, ...action.color };
				}
				return color;
			} );

		case 'DELETE_COLOR':
			return state.filter( ( { color } ) => color !== action.color );

		case 'ADD_COLOR':
			return [
				...state,
				{
					name: '',
					slug: '',
					color: '', // @todo Random hex?
				},
			];
	}

	return state;
}
