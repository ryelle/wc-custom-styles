<?php
/**
 * Custom Colors functionality
 *
 * @package WC Custom Block Styles
 */
namespace WordCamp\Custom_Styles\Colors;

defined( 'ABSPATH' ) || die();

/**
 * Add "Colors" page to the Appearance menu.
 */
function setup_page() {
	add_submenu_page(
		'themes.php',
		__( 'Custom Colors', 'wc-custom-block-styles' ),
		__( 'Custom Colors', 'wc-custom-block-styles' ),
		'manage_options',
		'wc-cbs-colors',
		function() {
			echo '<div id="wc-cbs-colors"></div>';
		}
	);
}
add_action( 'admin_menu', __NAMESPACE__ . '\setup_page' );

/**
 * Add scripts & styles to the Colors page.
 *
 * @param string $hook The current admin page.
 */
function enqueue_scripts( $hook ){
	if ( 'appearance_page_wc-cbs-colors' !== $hook ) {
		return;
	}

	wp_enqueue_style(
		'wc-cbs-colors',
		plugins_url( 'src/style.css', dirname( __FILE__ ) ),
		array( 'wp-components' ),
		WC_CBS_VERSION
	);
	wp_enqueue_script(
		'wc-cbs-colors',
		plugins_url( 'build/colors.js', dirname( __FILE__ ) ),
		array( 'wp-api-fetch', 'wp-components', 'wp-data', 'wp-element', 'lodash' ),
		WC_CBS_VERSION,
		true
	);

	$original_colors = current( (array) get_theme_support( 'editor-color-palette' ) );
	$colors          = get_option( 'wc-cbs-colors', $original_colors );
	wp_localize_script( 'wc-cbs-colors', 'CustomBlockStyle', array(
		'colors'         => $colors,
		'originalColors' => $original_colors,
	) );
}
add_action( 'admin_enqueue_scripts', __NAMESPACE__ . '\enqueue_scripts' );

/**
 * Replace the editor colors with the customized settings.
 *
 * @param array $editor_settings Default editor settings.
 * @return array Filtered settings
 */
function replace_editor_colors( $editor_settings ) {
	$color_palette = get_option( 'wc-cbs-colors', array() );
	if ( count( $color_palette ) ) {
		$editor_settings['colors'] = $color_palette;
	}

	return $editor_settings;
}
add_filter( 'block_editor_settings', __NAMESPACE__ . '\replace_editor_colors' );
