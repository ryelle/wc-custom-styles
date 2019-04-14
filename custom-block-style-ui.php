<?php
/**
 * Plugin Name: Custom Block Style UI
 * Description: A simple UI for creating new block styles.
 * Version: 1.0.0
 * Author: Kelly Dwan
 * Author URI: https://ryelle.codes
 * Text Domain: custom-block-style-ui
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
		array( 'wp-blocks', 'lodash' ),
		CBSUI_VERSION
	);
	
	$settings = array(
		'core/paragraph' => array(
			array( "name" => "blue", "label" => __( "Blue Paragraph" ) ),
			array( "name" => "red", "label" => __( "Red Paragraph" ) ),
		),
	);

	wp_localize_script( 'cbsui-script', 'CustomBlockStyle', $settings );
}
add_action( 'enqueue_block_editor_assets', 'cbsui_enqueue_assets' );
