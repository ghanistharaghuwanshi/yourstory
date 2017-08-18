<?php
/*
Plugin Name: Yourstory
Plugin URI: http://www.deltabee.com/Yourstory
Description: Include PHP files using a shortcode
Version: 1.0
Author: Priyanshi Agrawal | Roshni Kinge
Author URI: http://deltabee.com/Wordpress-Team/Priyanshi
License: Use this how you like!
*/
error_reporting(E_ALL);
ini_set("display_errors", 1);
defined( 'ABSPATH' ) OR exit;
register_activation_hook(   __FILE__, array( 'Yourstory', 'on_activation' ) );
register_deactivation_hook( __FILE__, array( 'Yourstory', 'on_deactivation' ) );
register_uninstall_hook(    __FILE__, array( 'Yourstory', 'on_uninstall' ) );	

class Yourstory {
    public function __construct()
    {
	  add_shortcode('yourstory', array($this, 'yourstory'));	
	  add_action( 'wp_footer', array($this,'yourstory_scripts'));
	  add_action( 'wp_enqueue_scripts', array($this, 'yourstory_styles'));
    }
	function yourstory($params = array()) {
		extract(shortcode_atts(array(
	    'file' => 'default'
		), $params));
		return $this->generate_form();
	}
	function on_activation(){
			return ;
	}
	function on_deactivation(){
		return;
	}
	function on_uninstall(){
		if ( ! current_user_can( 'activate_plugins' ) )
	    return;
		if ( __FILE__ != WP_UNINSTALL_PLUGIN )
	    return;		
	}
	function yourstory_styles(){
		wp_register_style( 'yourstory', plugins_url( '/assets/style.css', __FILE__ ) );
		wp_enqueue_style( 'yourstory' );
	}
	function generate_form()
	{   ob_start(); 
		include_once('assets/form.html');
		return ob_get_clean();
	}
	function yourstory_scripts(){
		$str = '<script type="text/javascript" src="http://www.google.com/jsapi"></script>';
		$str.='<script>';
		ob_start();
		include_once('assets/converter.js');
		$str .= ob_get_clean();
		$str.='</script>';
		echo $str;
	}
}
$Yourstory = new Yourstory();

?>