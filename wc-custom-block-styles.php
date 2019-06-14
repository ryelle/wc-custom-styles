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
	require_once dirname( __FILE__ ) . '/api/abstract/class-wc-cbs-option-controller.php';
	require_once dirname( __FILE__ ) . '/api/class-wc-cbs-styles-controller.php';
	require_once dirname( __FILE__ ) . '/api/class-wc-cbs-colors-controller.php';

	$controllers = array(
		new WC_CBS_Styles_Controller(),
		new WC_CBS_Colors_Controller(),
	);

	foreach ( $controllers as $controller ) {
		$controller->register_routes();
	}
}
add_action( 'rest_api_init', 'wc_cbs_rest_api_init' );

function wc_cbs_setup_page() {
	add_submenu_page(
		'themes.php',
		__( 'Custom Colors', 'wc-custom-block-styles' ),
		__( 'Custom Colors', 'wc-custom-block-styles' ),
		'manage_options',
		'wc-cbs-colors',
		'wc_cbs_render_page'
	);
}
add_action( 'admin_menu', 'wc_cbs_setup_page' );

function wc_cbs_enqueue_scripts( $hook ){
	if ( 'appearance_page_wc-cbs-colors' !== $hook ) {
		return;
	}

	wp_enqueue_style( 'wp-components' );
	wp_enqueue_script(
		'wc-cbs-colors',
		plugins_url( 'build/colors.js', __FILE__ ),
		array( 'wp-api-fetch', 'wp-components', 'wp-data', 'wp-element', 'lodash' ),
		WC_CBS_VERSION,
		true
	);
	$colors = get_option( 'wc-cbs-colors', array() );

	wp_localize_script( 'wc-cbs-colors', 'CustomBlockStyle', array(
		'colors' => $colors,
	) );
}
add_action( 'admin_enqueue_scripts', 'wc_cbs_enqueue_scripts' );


function wc_cbs_render_page() {
?>
<div class="wrap">
	<h1>Menus</h1>
	<style>
	#wc-cbs-colors {
		margin-top: 30px;
		max-width: 300px;
	}
	</style>
	<div id="wc-cbs-colors"></div>
</div>
<?php
}

/**
 * Enqueue assets.
 */
function wc_cbs_enqueue_assets( $screen ) {
	wp_enqueue_script(
		'wc-cbs-script',
		plugins_url( 'build/index.js', __FILE__ ),
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
