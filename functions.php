<?php

function custom_js() {
    $version = "1.0.3." . strtotime("now");
    wp_enqueue_script( 'woocommerce-flexsliderjs', get_stylesheet_directory_uri() . '/js/woocommerce-flexslider.js', array('jquery'), $version , true);
    wp_enqueue_script( 'webninjahq', get_stylesheet_directory_uri() . '/js/custom.js', array('jquery'), $version , true);


    wp_enqueue_style( 'unforgettableimpact-style', get_stylesheet_directory_uri() . '/assets/css/app-style.css', false, $version, 'all');
    wp_enqueue_style( 'woocommerce-flexslider-style', get_stylesheet_directory_uri() . '/assets/css/woocommerce-flexslider.css', false, $version, 'all');
}
add_action( 'wp_enqueue_scripts', 'custom_js' );


function custom_login_stylesheet() {
    wp_enqueue_style( 'custom-login', get_stylesheet_directory_uri() . '/assets/css/login-styles.css', false, '1.0.3', 'all');
}
add_action( 'login_enqueue_scripts', 'custom_login_stylesheet' );

function my_login_logo_url() {
    return "https://unforgettableimpact.com";
}
add_filter( 'login_headerurl', 'my_login_logo_url' );

function my_login_logo_url_title() {
    return 'UnforgettableImpact.com';
}
add_filter( 'login_headertitle', 'my_login_logo_url_title' );



function other_case_container( $content ) {
	global $post;
	$custom_content = $content;
	
	$custom_content .= '<div class="day-nav">';
	if ( 285 == $post->post_parent ) {
		$pagelist = get_pages("child_of=".$post->post_parent."&parent=".$post->post_parent."&sort_column=menu_order&sort_order=asc");

		$pages = array();
		foreach ($pagelist as $page) {
		   $pages[] += $page->ID;
		}
		
		$current = array_search($post->ID, $pages);
		$prevID = $pages[$current-1];
		$nextID = $pages[$current+1];

		if (!empty($prevID)) {
			$image = wp_get_attachment_image_src( get_post_thumbnail_id( $prevID ), 'large' );
			$image = $image ? $image[0] : 'http://via.placeholder.com/350x350?text=No%20Image';
			$custom_content .= '<a class="other_case prev_case" href="'.get_page_link($prevID).'">'.get_the_title($prevID).'<div class="web_screen"><div class="web_site-link">'.get_the_title($prevID).'</div><img src="'.$image.'"></div></a>';
		}

		if (!empty($nextID)) {
			$image = wp_get_attachment_image_src( get_post_thumbnail_id( $nextID ), 'large' );
			$image = $image ? $image[0] : 'http://via.placeholder.com/350x350?text=No%20Image';
			$custom_content .= '<a class="other_case next_case" href="'.get_page_link($nextID).'">'.get_the_title($nextID).'<div class="web_screen"><div class="web_site-link">'.get_the_title($nextID).'</div><img src="'.$image.'"></div></a>';
		}

	}
	$custom_content .= '</div>';

    
    return $custom_content;
}
add_filter( 'the_content', 'other_case_container', 99 );


function my_et_builder_post_types( $post_types ) {
    $post_types[] = 'popup';     
    return $post_types;
}
add_filter( 'et_builder_post_types', 'my_et_builder_post_types' );



/* first remove the parent function */
function child_remove_parent_function() {
 remove_action( 'et_header_top', 'et_add_mobile_navigation' );
}
add_action( 'wp_loaded', 'child_remove_parent_function' );

/* now load new one with new custom name, to not conflict with parent function name */

function et_add_child_mobile_navigation(){
 if ( is_customize_preview() || ( 'slide' !== et_get_option( 'header_style', 'left' ) && 'fullscreen' !== et_get_option( 'header_style', 'left' ) ) ) {
 printf(
 '<div id="et_mobile_nav_menu">
 <div class="mobile_nav closed">
 <span class="select_page">%1$s</span>
 <span class="mobile_menu_bar mobile_menu_bar_toggle"></span>
 </div>
 </div>',
 esc_html__( 'Menu', 'Divi' )
 );
 }
}
add_action( 'et_header_top', 'et_add_child_mobile_navigation' );



//[checkmark]
function checkmark_shortcode( $atts ){
	$a = shortcode_atts( array(
        'data' => 'class',
        'value' => 'checkmark',
        'text' => 'Here\'s a sample text that you can replace.',
    ), $atts );

    $datas = "";
    $atts = explode(",", $a["data"]);
    $vals = explode(",", $a["value"]);

    for ($i=0; $i < count($atts); $i++) { 
    	$data .= ' data-' . $atts[$i] . '=' . $vals[$i] . ' ';
    }

    $ret = "<div class='switch-desc'>";
    $ret .= $a["text"];
    $ret .= "</div>";



	$ret .= '<div class="switch-input"><label class="switch"> <input class="switch-1" type="checkbox" data-class="passion-hidden"> <span class="slider round">&nbsp;</span></label>';

    $ret .= "</div><div class='clear' style='clear:both'></div>";

    return $ret;
}
add_shortcode( 'checkmark', 'checkmark_shortcode' );


/** 
 * Since form code gets broken each time we open divi, I decided to use shortcode. 
 @ USAGE [kerrianne-form xid='2ca1086b1575be3daeca416cfd8e3fc7']
 * **/
function kerrianne_shortcode( $atts) {
    
    $a = shortcode_atts( array(
        'xid' => '2ca1086b1575be3daeca416cfd8e3fc7',
        'class' => '',
        'button_text' => 'SUBMIT',
    ), $atts );




    $ret = '<div class="kerrianne-form">';
    $ret .= '<form accept-charset="UTF-8" action="https://wd212.infusionsoft.com/app/form/process/'.$a["xid"].'" class="infusion-form" id="inf_form_'.$a["xid"].'" method="POST">';

    $ret .= '<input name="inf_form_xid" type="hidden" value="'.$a["xid"].'" />';
    $ret .= '<input name="inf_form_name" type="hidden" value="Unforgettable 3 Reasons&#a;Report Form - 7 Learn&#a;More Page" />';
    $ret .= '<input name="infusionsoft_version" type="hidden" value="1.69.0.754" />';

    $ret .= '<div class="infusion-field">';
    $ret .= '<input class="infusion-field-input" id="inf_field_FirstName" name="inf_field_FirstName" placeholder="Name" type="text" />';
    $ret .= '</div>';

    $ret .= '<div class="infusion-field">';
    $ret .= '<input class="infusion-field-input" id="inf_field_Email" name="inf_field_Email" placeholder="Email" type="text" />';
    $ret .= '</div>';


    $ret .= '<div class="infusion-submit">';
    $ret .= '<button class="infusion-recaptcha" id="recaptcha_'.$a["xid"].'" type="submit">'.$a["button_text"].'</button_text>';
    $ret .= '</div>';

    $ret .= '<div class="legal">';
    $ret .= 'YOUR INFORMATION IS 100% SECURE';
    $ret .= '</div>';
    $ret .= '</form>';

    $ret .= '<script type="text/javascript" src="https://wd212.infusionsoft.com/app/webTracking/getTrackingCode"></script>';
    $ret .= '<script type="text/javascript" src="https://wd212.infusionsoft.com/resources/external/recaptcha/production/recaptcha.js?b=1.69.0.754"></script>';
    $ret .= '<script src="https://www.google.com/recaptcha/api.js?onload=onloadInfusionRecaptchaCallback&render=explicit" async="async" defer="defer"></script>';
    $ret .= '<script type="text/javascript" src="https://wd212.infusionsoft.com/app/timezone/timezoneInputJs?xid='.$a["xid"].'"></script>';  

    $ret .= "</div>";    
    return $ret;
}

add_shortcode( 'kerrianne-form', 'kerrianne_shortcode' );