<?php
/**
 * Custom block styles functionality
 *
 * @package WC Custom Block Styles
 */
namespace WordCamp\Custom_Styles\Styles;

defined( 'ABSPATH' ) || die();

/**
 * Enqueue assets.
 */
function enqueue_assets( $screen ) {
	wp_enqueue_script(
		'wc-cbs-script',
		plugins_url( 'build/index.js', dirname( __FILE__ ) ),
		array( 'wp-components', 'wp-blocks', 'wp-data', 'wp-edit-post', 'wp-element', 'wp-plugins', 'lodash' ),
		WC_CBS_VERSION,
		true
	);

	$styles = get_option( 'wc-cbs-styles', array() );
	$colors = get_option( 'wc-cbs-colors', array() );

	wp_localize_script( 'wc-cbs-script', 'CustomBlockStyle', array(
		'styles' => $styles,
		'colors' => $colors,
	) );
}
add_action( 'enqueue_block_editor_assets', __NAMESPACE__ . '\enqueue_assets' );
