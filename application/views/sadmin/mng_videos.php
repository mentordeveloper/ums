<style type="text/css">
iframe {
	width: 400px !important;
	height: 300px !important;
}
</style>
<?php if(isset($comefrom) && $comefrom!='ajax')	{?>
<div class="maincontent noright">
<div class="maincontentinner">
  <ul class="maintabmenu">
    <li class="current"><a href="<?php echo base_url(); ?>sadmin/mng_roles">Youtube Videos Administration</a></li>
  </ul>
  <div class="content">
    <?php } ?>
    <?php if(isset($comefrom) && $comefrom!='ajax'){ ?>
    <div class="field"> <a href="<?php echo base_url().'sadmin/new_videos' ?>" id="add_video" class="stdbtn">Add New Video</a> </div>
    <br/>
    <div class="contenttitle radiusbottom0">
      <h2 class="table"><span>Managment</span></h2>
    </div>
    <?php	} 	?>
    <span id="html_ajax">
    <table cellpadding="0" cellspacing="0" border="0" class="stdtable" id="dyntable">
      <colgroup>
      <col class="con0" />
      <col class="con1" />
      <col class="con0" />
      <col class="con1" />
      <col class="con0" />
      </colgroup>
      <thead>
        <tr>
          <th class="head0">No.</th>
          <th class="head1">Text</th>
          <th class="head0">Video</th>
          <th class="head1">Status</th>
          <th class="head0">Created Date</th>
          <th class="head1">Actions</th>
        </tr>
      </thead>
      <tfoot>
        <tr>
          <th class="head0">No.</th>
          <th class="head1">Text</th>
          <th class="head0">Video</th>
          <th class="head1">Status</th>
          <th class="head0">Created Date</th>
          <th class="head1">Actions</th>
        </tr>
      </tfoot>
      <tbody>
        <?php  $i=1; foreach($videos as $counter=>$perschool){  ?>
        <tr class="gradeX" id="row_<?php echo $perschool['id']; ?>">
          <td><strong><?php echo $i; ?></strong></td>
          <td><strong><?php echo substr($perschool['text'],0,140).'...'; ?></strong></td>
          <td><strong> <?php echo $perschool['video']; ?> </strong></td>
          <td align="center"><?php if($perschool['status']=='true'){ ?>
            <img width="20" src="<?php echo base_url() ?>files/icons/1355052051_onebit_34.png" />
            <?php }else{ ?>
            <img width="20" src="<?php echo base_url() ?>files/icons/1355052074_mail-delete.png" />
            <?php } ?></td>
          <td><?php echo date('d-m-Y H:i:s',strtotime($perschool['date_time'])); ?></td>
          <td align="right"><form class="stdform">
              <span class="mylink"> <a  href="javascript:;" onclick="update_video(<?php echo $perschool['id']; ?>,'<?php echo $i; ?>')"> <span>Update</span> </a> </span> <span class="mylink"> <a href="javascript:;" onClick="remove_video(<?php echo $perschool['id']; ?>)"> <span>Remove</span> </a> </span>
            </form></td>
        </tr>
        <?php $i++; } ?>
      </tbody>
    </table>
    </span> </div>
</div>
<?php if(isset($comefrom) && $comefrom!='ajax')
{ $this->load->view('sadmin/footer');  } ?>
<input type="hidden" id="added_video" href="#video_man" />
<div style="display:none;">
  <div id="video_man"> </div>
</div>
