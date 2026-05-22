<?php
/**
 * Plugin Name: NimbleS2P Mega Menu Resources
 * Description: Mega menu featured resources and gated PDF download fields (REST API + post editor).
 * Version: 1.1.0
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

  register_post_meta('post', 'nimbles_gated_resource', [
    'type'         => 'boolean',
    'single'       => true,
    'show_in_rest' => true,
    'default'      => false,
    'auth_callback' => function () {
      return current_user_can('edit_posts');
    },
  ]);

  register_post_meta('post', 'nimbles_download_url', [
    'type'              => 'string',
    'single'            => true,
    'show_in_rest'      => true,
    'default'           => '',
    'sanitize_callback' => 'esc_url_raw',
    'auth_callback' => function () {
      return current_user_can('edit_posts');
    },
  ]);

  register_post_meta('post', 'nimbles_download_filename', [
    'type'              => 'string',
    'single'            => true,
    'show_in_rest'      => true,
    'default'           => '',
    'sanitize_callback' => 'sanitize_file_name',
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
  add_meta_box(
    'nimbles_gated_resource',
    'Gated Guide Download',
    'nimbles_gated_resource_render_metabox',
    'post',
    'side',
    'default'
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

function nimbles_gated_resource_render_metabox($post) {
  wp_nonce_field('nimbles_gated_resource_save', 'nimbles_gated_resource_nonce');
  $gated    = (bool) get_post_meta($post->ID, 'nimbles_gated_resource', true);
  $url      = (string) get_post_meta($post->ID, 'nimbles_download_url', true);
  $filename = (string) get_post_meta($post->ID, 'nimbles_download_filename', true);
  ?>
  <p>
    <label>
      <input type="checkbox" name="nimbles_gated_resource" value="1" <?php checked($gated); ?> />
      Gated resource (email required to download)
    </label>
  </p>
  <p>
    <label for="nimbles_download_url"><strong>PDF download URL</strong></label><br />
    <input type="url" name="nimbles_download_url" id="nimbles_download_url" value="<?php echo esc_attr($url); ?>" style="width:100%;margin-top:6px;" placeholder="https://nimbles2p.com/wp-content/uploads/..." />
  </p>
  <p>
    <label for="nimbles_download_filename"><strong>Download filename</strong> (optional)</label><br />
    <input type="text" name="nimbles_download_filename" id="nimbles_download_filename" value="<?php echo esc_attr($filename); ?>" style="width:100%;margin-top:6px;" placeholder="nimble-guide.pdf" />
  </p>
  <p class="description">Upload the PDF in Media Library, copy its file URL, and paste above. The full article body is hidden on the site; only title, excerpt, and cover show until the visitor downloads.</p>
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

add_action('save_post_post', function ($post_id) {
  if (!isset($_POST['nimbles_gated_resource_nonce']) || !wp_verify_nonce($_POST['nimbles_gated_resource_nonce'], 'nimbles_gated_resource_save')) {
    return;
  }
  if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
    return;
  }
  if (!current_user_can('edit_post', $post_id)) {
    return;
  }

  $gated = !empty($_POST['nimbles_gated_resource']);
  update_post_meta($post_id, 'nimbles_gated_resource', $gated);

  $url = isset($_POST['nimbles_download_url']) ? esc_url_raw(wp_unslash($_POST['nimbles_download_url'])) : '';
  update_post_meta($post_id, 'nimbles_download_url', $url);

  $filename = isset($_POST['nimbles_download_filename']) ? sanitize_file_name(wp_unslash($_POST['nimbles_download_filename'])) : '';
  update_post_meta($post_id, 'nimbles_download_filename', $filename);

  if (!$gated) {
    update_post_meta($post_id, 'nimbles_download_url', '');
    update_post_meta($post_id, 'nimbles_download_filename', '');
  }
});
