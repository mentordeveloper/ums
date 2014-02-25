<?php
if(!isset($template))
	$template = $this->router->fetch_class() .'/'. $this->router->fetch_method();	
if(!isset($css_files))
	$css_files = array();
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<?=link_tag('themes/starlight/css/style.css');?>
<!--[if IE 9]>
<?=link_tag('themes/starlight/css/ie9.css');?>
<![endif]-->
<!--[if IE 8]>
<?=link_tag('themes/starlight/css/ie8.css');?>
<![endif]-->
<!--[if IE 7]>
<?=link_tag('themes/starlight/css/ie7.css');?>
<![endif]-->

<script type="text/javascript" src="<?php echo base_url(); ?>themes/starlight/js/plugins/jquery-1.7.min.js"></script>
<script type="text/javascript" src="<?php echo base_url(); ?>themes/starlight/js/plugins/jquery.flot.min.js"></script>
<script type="text/javascript" src="<?php echo base_url(); ?>themes/starlight/js/plugins/jquery.flot.resize.min.js"></script>
<script type="text/javascript" src="<?php echo base_url(); ?>themes/starlight/js/plugins/jquery-ui-1.8.16.custom.min.js"></script>
<script type="text/javascript" src="<?php echo base_url(); ?>themes/starlight/js/custom/general.js"></script>

<!-- this was making UI of dialog boxes odd so commented 
<link type="text/css" href="<?php echo base_url(); ?>files/date_picker/css/ui-lightness/jquery-ui-1.8.24.custom.css" rel="stylesheet" />

-->
<link rel="stylesheet" type="text/css" href="<?php echo base_url(); ?>files/fancybox/fancybox/jquery.fancybox-1.3.4.css" media="screen" />
<link rel="shortcut icon" href="<?php echo base_url(); ?>elevaterfavicon.ico" type="image/x-icon" />
<?php foreach($css_files as $file): ?>
<link type="text/css" rel="stylesheet" href="<?php echo $file; ?>" />
<?php endforeach; ?>

<!-- extra data -->

<link rel="stylesheet" type="text/css" href="<?php echo base_url(); ?>files/fancybox/fancybox/jquery.fancybox-1.3.4.css" media="screen" />
<link rel="stylesheet" type="text/css" href="<?php echo base_url(); ?>files/anytime/anytime.css" media="screen" />

</head>
<body class="loggedin">
<script src="<?php echo base_url('files/date_picker/js/jquery-1.8.2.min.js') ?>" type="text/javascript"></script>
<? $this->load->view('sadmin/header'); ?>
<? $this->load->view($template); ?>
<? $this->load->view('common/scripts') ?>
<? $this->load->view('common/for_js') ?>
<script type="text/javascript">
	$(document).ready(function(e) {
    	$("a#passwordreset").fancybox();
				
	});
</script>
</body>
</html>