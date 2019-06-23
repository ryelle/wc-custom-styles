<?php
/**
 * REST API Option Controller
 *
 * Abstract class which handles saving items to options.
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
abstract class WC_CBS_Option_Controller extends WP_REST_Controller {

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
	protected $rest_base = '';

	/**
	 * Option name.
	 *
	 * @var string
	 */
	protected $setting = '';

	/**
	 * Registers the routes for the objects of the controller.
	 */
	public function register_routes() {
		register_rest_route(
			$this->namespace,
			'/' . $this->rest_base,
			array(
				// Here we register the readable endpoint for collections.
				array(
					'methods'             => WP_REST_Server::READABLE,
					'callback'            => array( $this, 'get_items' ),
					'permission_callback' => array( $this, 'get_items_permissions_check' ),
				),
				array(
					'methods'             => WP_REST_Server::EDITABLE,
					'callback'            => array( $this, 'update_item' ),
					'permission_callback' => array( $this, 'update_item_permissions_check' ),
				),
				// Register our schema callback.
				'schema' => array( $this, 'get_item_schema' ),
			)
		);
	}

	/**
	 * Checks if a given request has access to get the settings.
	 *
	 * @param WP_REST_Request $request Full data about the request.
	 * @return WP_Error|bool True if the request has read access, WP_Error object otherwise.
	 */
	public function get_items_permissions_check( $request ) {
		return current_user_can( 'edit_posts' );
	}

	/**
	 * Checks if a given request has access to update the settings.
	 *
	 * @param WP_REST_Request $request Full data about the request.
	 * @return WP_Error|bool True if the request has access to update the item, WP_Error object otherwise.
	 */
	public function update_item_permissions_check( $request ) {
		return current_user_can( 'edit_posts' );
	}

	/**
	 * Retrieves a collection of items.
	 *
	 * @param WP_REST_Request $request Full data about the request.
	 * @return WP_Error|WP_REST_Response Response object on success, or WP_Error object on failure.
	 */
	public function get_items( $request ) {
		$settings = get_option( $this->setting, array() );
		$response = $this->prepare_item_for_response( $settings, $request );
		return rest_ensure_response( $response );
	}

	/**
	 * Updates the settings.
	 *
	 * @param WP_REST_Request $request Full data about the request.
	 * @return WP_Error|WP_REST_Response Response object on success, or WP_Error object on failure.
	 */
	public function update_item( $request ) {
		$current_settings = get_option( $this->setting, array() );
		$settings         = $this->prepare_item_for_database( $request );

		if ( is_wp_error( $settings ) ) {
			return rest_ensure_response( $settings );
		}

		if ( $current_settings !== $settings ) {
			$result = update_option( $this->setting, $settings, false );

			if ( ! $result ) {
				return new WP_Error(
					'rest_invalid_option',
					sprintf( __( 'Unable to save settings.', 'wc-custom-block-styles' ) ),
					array( 'status' => 500 )
				);
			}
		}

		return rest_ensure_response( $settings );
	}

	/**
	 * Prepares the settings for the REST response.
	 *
	 * @param array           $settings WordPress representation of the settings.
	 * @param WP_REST_Request $request  Request object.
	 * @return WP_Error|WP_REST_Response Response object on success, or WP_Error object on failure.
	 */
	public function prepare_item_for_response( $settings, $request ) {
		return rest_sanitize_value_from_schema( $settings, $this->get_item_schema() );
	}

	/**
	 * Prepares settings for saving into option.
	 *
	 * @param WP_REST_Request $request Request object.
	 * @return WP_Error|object The prepared item, or WP_Error object on failure.
	 */
	protected function prepare_item_for_database( $request ) {
		$body = $request->get_body();
		if ( ! $body ) {
			return new WP_Error( 'rest_no_data', __( 'No data was submitted.', 'wc-custom-block-styles' ), array( 'status' => 400 ) );
		}

		$raw_settings = json_decode( $body );
		if ( ! is_array( $raw_settings ) ) {
			return new WP_Error( 'rest_invalid_json', __( 'The data submitted was malformed.', 'wc-custom-block-styles' ), array( 'status' => 400 ) );
		}

		return rest_sanitize_value_from_schema( $raw_settings, $this->get_item_schema() );
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
				'properties' => array(),
			),
		);
		return $this->add_additional_fields_schema( $schema );
	}
}
