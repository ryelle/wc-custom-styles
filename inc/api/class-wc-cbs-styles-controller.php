<?php
/**
 * REST API Style Settings Controller
 *
 * Handles requests to /wc-cbs/v1/styles
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
class WC_CBS_Styles_Controller extends WC_CBS_Option_Controller {

	/**
	 * The base of this controller's route.
	 *
	 * @var string
	 */
	protected $rest_base = 'styles';

	/**
	 * Option name.
	 *
	 * @var string
	 */
	protected $setting = 'wc-cbs-styles';

	/**
	 * Get the settings schema, conforming to JSON Schema
	 *
	 * @return array
	 */
	 public function add_additional_fields_schema( $schema ) {
 		$schema['items']['properties'] = array(
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
		);

		return $schema;
	}
}
