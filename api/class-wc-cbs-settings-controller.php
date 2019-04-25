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
				'methods'   => WP_REST_Server::READABLE,
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
		return get_option( 'wc-cbs-styles', array(
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
		) );
	}

	/**
	 * Get the settings schema, conforming to JSON Schema
	 *
	 * @return array
	 */
	public function get_item_schema() {
		$schema = array(
			'$schema' => 'http://json-schema.org/draft-04/schema#',
			'title'   => 'wc_cbs_settings',
			'type'    => 'array',
			'items'   => array(
				'type'       => 'object',
				'context'    => array( 'view' ),
				'properties' => array(
					'id' => array(
						'type'        => 'integer',
						'description' => __( 'A numeric ID unique to the style.', 'wc-custom-block-styles' ),
						'arg_options' => array(
							'required' => true,
						),
					),
					'label' => array(
						'type'        => 'string',
						'description' => __( 'The human-readable name for this style.', 'wc-custom-block-styles' ),
						'arg_options' => array(
							'required' => true,
						),
					),
					'name' => array(
						'type'        => 'string',
						'description' => __( 'The CSS class added to the block.', 'wc-custom-block-styles' ),
						'arg_options' => array(
							'required' => true,
						),
					),
					'block' => array(
						'type'        => 'string',
						'description' => __( 'The block name which should use this style.', 'wc-custom-block-styles' ),
						'arg_options' => array(
							'required' => true,
						),
					),
				),
			),
		);
		return $this->add_additional_fields_schema( $schema );
	}
}
