<?php
/**
 * Plugin Name: Custom Block Styles
 * Description: A simple UI for creating new block styles.
 * Version: 1.0.0
 * Author: Kelly Dwan
 * Author URI: https://ryelle.codes
 * Text Domain: wc-custom-block-styles
 *
 * @package WC Custom Block Styles
 */

defined( 'ABSPATH' ) || die();
define( 'WC_CBS_VERSION', '1.0.0' );

/**
 * Intialize REST API endpoint.
 */
function wc_cbs_rest_api_init() {
	require_once dirname( __FILE__ ) . '/api/class-wc-cbs-styles-controller.php';

	$controller = new WC_CBS_Styles_Controller();
	$controller->register_routes();
}
add_action( 'rest_api_init', 'wc_cbs_rest_api_init' );

/**
 * Enqueue assets.
 */
function wc_cbs_enqueue_assets() {
	wp_enqueue_script(
		'wc-cbs-script',
		plugins_url( 'build/index.js', __FILE__ ),
		array( 'wp-components', 'wp-blocks', 'wp-data', 'wp-edit-post', 'wp-element', 'wp-plugins', 'lodash' ),
		WC_CBS_VERSION,
		true
	);

	$styles = get_option( 'wc-cbs-styles', array() );
	$colors = get_option( 'wc-cbs-colors', array(
		array(
			'name' => __( 'strong magenta', 'wc-custom-block-styles' ),
			'slug' => 'strong-magenta',
			'color' => '#a156b4',
		),
		array(
			'name' => __( 'light grayish magenta', 'wc-custom-block-styles' ),
			'slug' => 'light-grayish-magenta',
			'color' => '#d0a5db',
		),
		array(
			'name' => __( 'very light gray', 'wc-custom-block-styles' ),
			'slug' => 'very-light-gray',
			'color' => '#eee',
		),
		array(
			'name' => __( 'very dark gray', 'wc-custom-block-styles' ),
			'slug' => 'very-dark-gray',
			'color' => '#444',
		),
	) );

	wp_localize_script( 'wc-cbs-script', 'CustomBlockStyle', array(
		'styles' => $styles,
		'colors' => $colors,
	) );
}
add_action( 'enqueue_block_editor_assets', 'wc_cbs_enqueue_assets' );

/**
 * Replace the editor colors with the customized settings.
 *
 * @param array $editor_settings Default editor settings.
 * @return array Filtered settings
 */
function wc_cbs_replace_editor_colors( $editor_settings ) {
	$color_palette = get_option( 'wc-cbs-colors', array() );
	if ( count( $color_palette ) ) {
		$editor_settings['colors'] = $color_palette;
	}

	return $editor_settings;
}
add_filter( 'block_editor_settings', 'wc_cbs_replace_editor_colors' );
