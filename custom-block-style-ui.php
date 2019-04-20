<?php
/**
 * Plugin Name: Custom Block Style UI
 * Description: A simple UI for creating new block styles.
 * Version: 1.0.0
 * Author: Kelly Dwan
 * Author URI: https://ryelle.codes
 * Text Domain: custom-block-style-ui
 *
 * @package CustomBlockStylesUI
 */

defined( 'ABSPATH' ) || die();
define( 'CBSUI_VERSION', '1.0.0' );

/**
 * Enqueue assets
 */
function cbsui_enqueue_assets() {
	wp_enqueue_script(
		'cbsui-script',
		plugins_url( 'build/index.js', __FILE__ ),
		array( 'wp-components', 'wp-blocks', 'wp-data', 'wp-edit-post', 'wp-element', 'wp-plugins', 'lodash' ),
		CBSUI_VERSION,
		true
	);

	$settings = array(
		array(
			'name'  => 'blue',
			'id'    => 1,
			'label' => __( 'Blue', 'custom-block-style-ui' ),
			'block' => 'core/paragraph',
		),
		array(
			'name'  => 'red',
			'id'    => 2,
			'label' => __( 'Red', 'custom-block-style-ui' ),
			'block' => 'core/paragraph',
		),
	);

	wp_localize_script( 'cbsui-script', 'CustomBlockStyle', $settings );
}
add_action( 'enqueue_block_editor_assets', 'cbsui_enqueue_assets' );
