<div class="maincontent noright">
  <div class="maincontentinner">
    <ul class="maintabmenu">
      <li class="current"><a href="<?php echo base_url(); ?>sadmin/mng_roles">About Managment</a></li>
    </ul>
    <div class="content">
      <form action="<?php echo base_url().'sadmin/save_about_page';  ?>" method="post" class="stdform">
        <textarea id="page_editor" name="text_about"><?php echo $about; ?></textarea>
        <?php echo form_ckeditor1('page_editor');  ?> <br/>
        <button class="radius2" type="submit">Save</button>
      </form>
    </div>
  </div>
  <? $this->load->view('sadmin/footer'); ?>
</div>
