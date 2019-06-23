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

namespace WordCamp\Custom_Styles;

defined( 'ABSPATH' ) || die();
define( 'WC_CBS_VERSION', '1.0.0' );

require_once dirname( __FILE__ ) . '/inc/colors.php';
require_once dirname( __FILE__ ) . '/inc/styles.php';

/**
 * Intialize REST API endpoint.
 */
function rest_api_init() {
	require_once dirname( __FILE__ ) . '/inc/api/abstract/class-wc-cbs-option-controller.php';
	require_once dirname( __FILE__ ) . '/inc/api/class-wc-cbs-styles-controller.php';
	require_once dirname( __FILE__ ) . '/inc/api/class-wc-cbs-colors-controller.php';

	$controllers = array(
		new \WC_CBS_Styles_Controller(),
		new \WC_CBS_Colors_Controller(),
	);

	foreach ( $controllers as $controller ) {
		$controller->register_routes();
	}
}
add_action( 'rest_api_init', __NAMESPACE__ . '\rest_api_init' );
