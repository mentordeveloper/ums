<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Welcome Admin</title>
<?php echo link_tag('bootstrap/css/bootstrap.min.css');?><?php echo link_tag('bootstrap/css/bootstrap-responsive.min.css');?><?php echo link_tag('css/bootstrap.fluid.grid.fix.css');?><?php echo link_tag('css/login.css');?><?php echo link_tag('css/files/date_picker/css/ui-lightness/jquery-ui-1.8.24.custom.css');?><?php echo link_tag('files/fancybox/fancybox/jquery.fancybox-1.3.4.css');?><?php echo link_tag('files/files/anytime/anytime.css');?>
<?php $this->load->view('common/scripts') ?>
<?php $this->load->view('common/for_js') ?>
</head>
<body>
<div class="login-head">
  <div id="head" >
    <h4 class="left"> <a href="<?php echo base_url(); ?><?php echo index_page(); ?>">S - Administration</a></h4>
  </div>
  <div class="form-horizontal">
 
    <?php $err_check = $this->session->flashdata('error'); 
		if(validation_errors() || $error_msg != "" || isset($error_login)) 
			  { 
		?>
    <div class="error">
      <?php  if(validation_errors()) echo validation_errors(); ?>
      <?php  if($error_msg != "") echo $error_msg; ?>
      <?php  if(isset($error_login)) echo $error_login; ?>
    </div>
    <?php } ?>
    <?php ///checking code repostried on other system for solution....
		$success = $this->session->flashdata('success');
		  if(isset($success) && $success != '') 
			  {
		?>
    <div class="success"> <?php echo $success ?> </div>
    <?php } ?>
    <?php echo form_open_multipart('sadmin/validate/','id="loginform"'); ?>
    <br/>
      <label class="control-label" >User</label>
    <div class="controls"> <?php echo form_input($admin_name);?></div>
    <br/>
      <label for="admin_password" class="control-label" >Password</label>
    <div class="controls"> <?php echo form_password($admin_password); ?></div>
    <div class="bottom-buttons">
      <div class="btn " style="color:white"><?php echo form_submit('submit', 'Login'); ?> </div>
      <div class="btn"><?php echo form_reset('reset', 'Reset'); ?></div>
    </div>
    <?php echo form_close(); ?> 
  </div>
</div>
<input type="hidden" value="<?php echo base_url(); ?>" id="base_url" />
</body>
</html>