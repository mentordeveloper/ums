<div class="maincontent noright">
  <div class="maincontentinner">
    <ul class="maintabmenu">
      <li class="current"><a href="<?php echo base_url(); ?>sadmin/mng_roles">Super Settings</a></li>
    </ul>
    <div class="content">
      <table id="viewer" class="table-striped border-simple" cellpadding="10" style="margin-bottom:20px !important;width:100% !important;">
        <tr>
          <td><form action="<?php echo base_url(); ?><?php echo index_page(); ?>instructor/clear_keys" class="stdform">
              <button class="radius2" type="submit">Clear Keys</button>
            </form></td>
        </tr>
      </table>
    </div>
  </div>
  <? $this->load->view('sadmin/footer'); ?>
</div>
