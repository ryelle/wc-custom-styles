<?php
/**
 * Plugin Name: Custom Block Styles
 * Description: A simple UI for creating new block styles.
 * Version: 1.0.0
 * Author: Kelly Dwan
 * Author URI: https://ryelle.codes
 * Text Domain: wc-custom-block-styles
 *
 * @package WCCustomBlockStyles
 */

defined( 'ABSPATH' ) || die();
define( 'WC_CBS_VERSION', '1.0.0' );

/**
 * Enqueue assets
 */
function wc_cbsenqueue_assets() {
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
add_action( 'enqueue_block_editor_assets', 'wc_cbsenqueue_assets' );
