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
	require_once dirname( __FILE__ ) . '/api/class-wc-cbs-settings-controller.php';

	$controller = new WC_CBS_Settings_Controller();
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

	$settings = array(
		array(
			'name'  => 'blue',
			'id'    => 1,
			'label' => __( 'Blue', 'wc-custom-block-styles' ),
			'block' => 'core/paragraph',
		),
		array(
			'name'  => 'red',
			'id'    => 2,
			'label' => __( 'Red', 'wc-custom-block-styles' ),
			'block' => 'core/paragraph',
		),
	);

	wp_localize_script( 'wc-cbs-script', 'CustomBlockStyle', $settings );
}
add_action( 'enqueue_block_editor_assets', 'wc_cbs_enqueue_assets' );