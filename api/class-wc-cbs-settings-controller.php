<?php
/**
 * REST API Settings Controller
 *
 * Handles requests to /wc-cbs/v1/settings
 *
 * @package WC Custom Block Styles
 */

defined( 'ABSPATH' ) || exit;

/**
 * Controller
 *
 * @package WC Custom Block Styles
 * @extends WP_REST_Controller
 */
class WC_CBS_Settings_Controller extends WP_REST_Controller {

	/**
	 * Endpoint namespace.
	 *
	 * @var string
	 */
	protected $namespace = 'wc-cbs/v1';

	/**
	 * The base of this controller's route.
	 *
	 * @var string
	 */
	protected $rest_base = '/settings';

	/**
	 * Registers the routes for the objects of the controller.
	 */
	public function register_routes() {
		register_rest_route( $this->namespace, '/' . $this->rest_base, array(
			// Here we register the readable endpoint for collections.
			array(
				'methods'   => 'GET',
				'callback'  => array( $this, 'get_items' ),
				'permission_callback' => array( $this, 'get_items_permissions_check' ),
			),
			// Register our schema callback.
			'schema' => array( $this, 'get_item_schema' ),
		) );
	}

	/**
	 * Checks if a given request has access to get the settings.
	 *
	 * @param WP_REST_Request $request Full data about the request.
	 * @return WP_Error|bool True if the request has read access, WP_Error object otherwise.
	 */
	public function get_items_permissions_check( $request ) {
		// @todo Real security 😬
		return true || current_user_can( 'edit_posts' );
	}

	/**
	 * Retrieves a collection of items.
	 *
	 * @param WP_REST_Request $request Full data about the request.
	 * @return WP_Error|WP_REST_Response Response object on success, or WP_Error object on failure.
	 */
	public function get_items( $request ) {
		return get_option( 'wc-cbs-styles', array() );
	}
}
