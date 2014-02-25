<?php

//trying to guess template if not sent
if(!isset($template))
	$template = $this->router->fetch_class() .'/'. $this->router->fetch_method();
	
if(!isset($css_files))
	$css_files = array();

	
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<?=link_tag('bootstrap/css/bootstrap.min.css');?>
<?=link_tag('bootstrap/css/bootstrap-responsive.min.css');?>
<?=link_tag('css/base.css');?>
<?=link_tag('css/bootstrap.fluid.grid.fix.css');?>



<?php foreach($css_files as $file): ?>
<link type="text/css" rel="stylesheet" href="<?php echo $file; ?>" />
<?php endforeach; ?>

<!-- extra data -->

<link type="text/css" href="<?php echo base_url(); ?>files/date_picker/css/ui-lightness/jquery-ui-1.8.24.custom.css" rel="stylesheet" />
<link rel="stylesheet" type="text/css" href="<?php echo base_url(); ?>files/fancybox/fancybox/jquery.fancybox-1.3.4.css" media="screen" />
<link rel="stylesheet" type="text/css" href="<?php echo base_url(); ?>files/anytime/anytime.css" media="screen" />
</head>
<body>
<? $this->load->view('sadmin/header'); ?>
<div class="container-ext">
  <div class='margin-all-40'>
    <? $this->load->view($template); ?>
  </div>
</div>
<? $this->load->view('sadmin/footer'); ?>
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.0/jquery.min.js"></script> 
<script src='<?=base_url('bootstrap/js/bootstrap.js')?>' type='text/javascript'></script>
<? $this->load->view('common/scripts') ?>
<? $this->load->view('common/for_js') ?>
</body>
</html>