<?php
/**
 * REST API Color Settings Controller
 *
 * Handles requests to /wc-cbs/v1/colors
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
class WC_CBS_Colors_Controller extends WC_CBS_Option_Controller {

	/**
	 * The base of this controller's route.
	 *
	 * @var string
	 */
	protected $rest_base = 'colors';

	/**
	 * Option name.
	 *
	 * @var string
	 */
	protected $setting = 'wc-cbs-colors';

	/**
	 * Get the settings schema, conforming to JSON Schema
	 *
	 * @param array $schema General JSON schema for the response.
	 * @return array
	 */
	public function add_additional_fields_schema( $schema ) {
		$schema['items']['properties'] = array(
			'name'  => array(
				'type'        => 'string',
				'description' => __( 'The human-readable name for this color.', 'wc-custom-block-styles' ),
				'arg_options' => array(
					'required' => true,
				),
			),
			'slug'  => array(
				'type'        => 'string',
				'description' => __( 'The slug-ified name, used in css classes.', 'wc-custom-block-styles' ),
				'arg_options' => array(
					'required' => true,
				),
			),
			'color' => array(
				'type'        => 'string',
				'description' => __( 'The hex color.', 'wc-custom-block-styles' ),
				'arg_options' => array(
					'required' => true,
				),
			),
		);

		return $schema;
	}
}
