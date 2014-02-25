<div class="maincontent noright">
  <div class="maincontentinner">
      <ul class="maintabmenu multipletabmenu">
	  
			<li class="current"><a href="<?php echo base_url(); ?>sadmin/mng_notif"><?php if($action_type=='add'){echo 'Add Announcement';}else {echo 'Edit Announcement';}?></a></li>
			<li><a href="<?php echo base_url(); ?>sadmin/mng_announcements">Manage Announcements</a></li>
      </ul>
   
<div class="content">
  <div class="contenttitle radiusbottom0">
        <h2 class="table"><span>Announcement Details</span></h2>
   </div>
<form id="notif_formz" class="stdform" action="#" method="POST">
  <table cellpadding="0" cellspacing="0" border="0" class="stdtable" id="dyntable">
	  <tr>
		<td><b>Type Announcement</b></td>
	  </tr>
	   <tr>
      <td><textarea style="width:500px;height:100px" type="text" id="notif_text" name="notif_text" /><?php if(isset($edit_record[0]['start_date'])){ echo $edit_record[0]['description']; } ?></textarea>
	  <div id="error_notifier"></div>
	  </td>
    </tr>
  </table>
  </br>
  <div class="contenttitle radiusbottom0">
        <h2 class="table"><span>Display Options</span></h2>
      </div>
   <table cellpadding="0" cellspacing="0" border="0" class="stdtable" id="dyntable">
   
     <tr>
      <td><b>Active:</b></td>
	  
     <td>	
	
			<input type="radio" name="active" id="active1" value="1" <?php if(isset($edit_record[0]['status']) && $edit_record[0]['status']==1) { ?> checked <?php } ?>>Yes

			<input type="radio" name="active" id="active0" value="0" <?php if(isset($edit_record[0]['status']) && $edit_record[0]['status']==0) { ?> checked <?php } ?>>No</td>
		
    </tr>
    <tr>
      <td><b>Start Date:</b></td>
      <td>   <input type="text" id="start_date" name="start_date"  value="<?php if(isset($edit_record[0]['start_date'])){ echo $edit_record[0]['start_date']; } ?>" class="datepick" > </td>
    </tr>
     <tr>
      <td><b>End Date:</b></td>
      <td>   <input type="text" id="end_date" name="end_date"  value="<?php if(isset($edit_record[0]['start_date'])){ echo $edit_record[0]['end_date']; }?>" class="datepick" > </td>
    </tr>
   
	
    <tr>
	<?php if($action_type=='add'){ ?>
      <td colspan="2" align="right"><button class="radius2" type="button" name="test" id="btn_notif">Submit</button>
	  <?php }else { ?>
	    <td colspan="2" align="right"><button class="radius2" type="button" id="btn_update">Update</button>
		<input type="hidden" id="ann_id" value="<?php echo $edit_record[0]['id'];?>" />
	  <?php } ?>
       </td>
    </tr>
  </table>
</form>

<input type="hidden" id="base_url" value="<?php echo $base_url;?>" />
<input type="hidden" id="added_school" href="#school" />
<div style="display:none;">
  <div id="school"> </div>
</div>