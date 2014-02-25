<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html lang="en">
<head>
<meta charset="utf-8">
<title>Welcome Admin</title>
<meta name="description" content="">
<meta name="author" content="">

<!-- Le styles -->
<?php echo link_tag('bootstrap/css/bootstrap.min.css');?><?php echo link_tag('bootstrap/css/bootstrap-responsive.min.css');?><?php echo link_tag('css/bootstrap.fluid.grid.fix.css');?><?php echo link_tag('css/login.css');?><?php echo link_tag('files/fancybox/fancybox/jquery.fancybox-1.3.4.css');?>
<?php $this->load->view('common/scripts') ?>
<?php $this->load->view('common/for_js') ?>
</head>
<body>
<div class="container">
  <div class="content">
    <div class="row"> <?php echo form_open_multipart('sadmin/validate/','id="loginform"'); ?>
      <div class="login-form">
        <h2>Administration</h2>
        <form action="">
          <fieldset>
            <div class="clearfix"> <?php echo form_input($admin_name);?> </div>
            <div class="clearfix"> <?php echo form_password($admin_password); ?> </div>
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
            <input type="checkbox" placeholder="Remember me" name="rememberme" title="Remember me" alt="Remember me" />
            <strong style="font-size:11px;">Remember me </strong> <br/>
            <br/>
            <?php echo form_submit('submit', 'Login','class="btn"'); ?>
          </fieldset>
        </form>
      </div>
      <?php echo form_close(); ?> </div>
  </div>
</div>
<!-- /container -->
<input type="hidden" value="<?php echo base_url(); ?>" id="base_url" />
</body>
</html>