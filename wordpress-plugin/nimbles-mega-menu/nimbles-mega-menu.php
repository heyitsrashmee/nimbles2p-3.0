<?php
/**
 * Plugin Name: NimbleS2P Mega Menu Resources
 * Description: Featured resource fields for the Products mega menu (REST API + post editor).
 * Version: 1.0.0
 * Author: NimbleS2P
 */

if (!defined('ABSPATH')) {
  exit;
}

const NIMBLES_MEGA_MODULES = [
  'vdd'       => 'Supplier Due Diligence',
  'supplier'  => 'Supplier Portal',
  'invoice'   => 'Invoice Processing',
  'rfq'       => 'RFx Management',
  'finance'   => 'Early Financing',
  'analytics' => 'Supplier Analytics',
];

add_action('init', function () {
  register_post_meta('post', 'nimbles_mega_menu_featured', [
    'type'         => 'boolean',
    'single'       => true,
    'show_in_rest' => true,
    'default'      => false,
    'auth_callback' => function () {
      return current_user_can('edit_posts');
    },
  ]);

  register_post_meta('post', 'nimbles_mega_menu_module', [
    'type'              => 'string',
    'single'            => true,
    'show_in_rest'      => true,
    'default'           => '',
    'sanitize_callback' => function ($value) {
      $value = sanitize_key((string) $value);
      return array_key_exists($value, NIMBLES_MEGA_MODULES) ? $value : '';
    },
    'auth_callback' => function () {
      return current_user_can('edit_posts');
    },
  ]);
});

add_action('add_meta_boxes', function () {
  add_meta_box(
    'nimbles_mega_menu',
    'Mega Menu — Featured Resource',
    'nimbles_mega_menu_render_metabox',
    'post',
    'side',
    'high'
  );
});

function nimbles_mega_menu_render_metabox($post) {
  wp_nonce_field('nimbles_mega_menu_save', 'nimbles_mega_menu_nonce');
  $featured = (bool) get_post_meta($post->ID, 'nimbles_mega_menu_featured', true);
  $module   = (string) get_post_meta($post->ID, 'nimbles_mega_menu_module', true);
  ?>
  <p>
    <label>
      <input type="checkbox" name="nimbles_mega_menu_featured" value="1" <?php checked($featured); ?> />
      Show as featured resource in Products mega menu
    </label>
  </p>
  <p>
    <label for="nimbles_mega_menu_module"><strong>Product module</strong></label><br />
    <select name="nimbles_mega_menu_module" id="nimbles_mega_menu_module" style="width:100%;margin-top:6px;">
      <option value="">— Select module —</option>
      <?php foreach (NIMBLES_MEGA_MODULES as $id => $label) : ?>
        <option value="<?php echo esc_attr($id); ?>" <?php selected($module, $id); ?>>
          <?php echo esc_html($label); ?>
        </option>
      <?php endforeach; ?>
    </select>
  </p>
  <p class="description">Only one post should be featured per module. If several are marked, the site uses the newest.</p>
  <?php
}

add_action('save_post_post', function ($post_id) {
  if (!isset($_POST['nimbles_mega_menu_nonce']) || !wp_verify_nonce($_POST['nimbles_mega_menu_nonce'], 'nimbles_mega_menu_save')) {
    return;
  }
  if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
    return;
  }
  if (!current_user_can('edit_post', $post_id)) {
    return;
  }

  $featured = !empty($_POST['nimbles_mega_menu_featured']);
  update_post_meta($post_id, 'nimbles_mega_menu_featured', $featured);

  $module = isset($_POST['nimbles_mega_menu_module']) ? sanitize_key($_POST['nimbles_mega_menu_module']) : '';
  if ($module && !array_key_exists($module, NIMBLES_MEGA_MODULES)) {
    $module = '';
  }
  update_post_meta($post_id, 'nimbles_mega_menu_module', $module);

  if (!$featured) {
    update_post_meta($post_id, 'nimbles_mega_menu_module', '');
  }
});
