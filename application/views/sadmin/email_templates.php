<div class="maincontent noright">
  <div class="maincontentinner">
    <ul class="maintabmenu">
      <li class="current"><a href="<?php echo base_url(); ?>sadmin/email_templates">Emails Templating</a></li>
    </ul>
    <div class="content">
      <?php if($update){?>
      <div class="notification msgsuccess"> <a class="close"></a>
        <p>Successfully Updated</p>
      </div>
      <br/>
      <?php } ?>
      <form action="<?php echo base_url().'sadmin/save_email_templates';  ?>" method="post" class="stdform">
        <table width="100%" border="1">
          <tr>
            <td style="padding-bottom:10px;"><select name="template" id="templating_checker">
                <option value="">Please select email template</option>
                <?php  	foreach($data as $index=>$persections){ 	?>
                <option value="<?php echo $persections['e_id']; ?>" <?php if($selected == $index){ ?> selected="selected" <?php } ?> >
                <?php  echo ucfirst($persections['e_name']); ?>
                </option>
                <?php  } ?>
              </select></td>
          </tr>
          <tr>
            <td style="padding-bottom:10px;"><input type="text" style="width:99%;" placeholder="Email Subject" id="email_subject" name="email_subject" /></td>
          </tr>
          <tr>
            <td id="tags_email"></td>
          </tr>
          <tr>
            <td><textarea id="page_editor" name="text_about" placeholder="Email Body"></textarea>
              <?php echo form_ckeditor1('page_editor');  ?></td>
          </tr>
          <tr>
            <td><button class="radius2" id="btn_save" type="submit">Save</button></td>
          </tr>
        </table>
      </form>
    </div>
  </div>
  <?php $this->load->view('sadmin/footer'); ?>
</div>
