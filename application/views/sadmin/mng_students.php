<?php if(isset($comefrom) && $comefrom!='ajax'){  ?>

<div class="maincontent noright">
<div class="maincontentinner">
  <ul class="maintabmenu">
    <li class="current"><a href="<?php echo base_url(); ?>sadmin/mng_schools">Students Managment</a></li>
  </ul>
  <div class="content"> <a class="stdbtn" href="<?php echo base_url().'sadmin/new_student' ?>" id="add_school_new">Add Student</a> <br/>
    <br/>
    <div class="contenttitle radiusbottom0">
      <h2 class="table"><span>Managment</span></h2>
    </div>
    <?php } ?>
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
          <th class="head1">Name</th>
          <th class="head0">Status</th>
          <th class="head1">Created Date</th>
          <th class="head1">Actions</th>
        </tr>
      </thead>
      <tfoot>
        <tr>
          <th class="head0">No.</th>
          <th class="head1">Name</th>
          <th class="head0">Status</th>
          <th class="head1">Created Date</th>
          <th class="head1">Actions</th>
        </tr>
      </tfoot>
      <tbody>
        <?php $i=1;  foreach($students as $counter=>$perstudent)
  		{
			
	  ?>
        <tr class="gradeA" id="row_<?php echo $perstudent['id']; ?>">
          <td align="center"><?php echo $i; ?></td>
          <td align="center"><strong><?php echo $perstudent['name']; ?></strong></td>
          <td align="center"><?php if($perstudent['status']=='true'){ ?>
            <img width="20" src="<?php echo base_url() ?>files/icons/1355052051_onebit_34.png" />
            <?php }else{ ?>
            <img width="20" src="<?php echo base_url() ?>files/icons/1355052074_mail-delete.png" />
            <?php } ?></td>
          <td align="center"><?php $perstudent['date_time']; $result = explode(" ",$perstudent['date_time']); echo $result[0];?></td>
          <td align="right"><form class="stdform" action="#">
              <button type="button" class="radius2" onClick="update_school(<?php echo $perstudent['id']; ?>)">Update</button>
              <button type="button" class="radius2" onClick="remove_school(<?php echo $perstudent['id']; ?>,'<?php echo $perstudent['name']; ?>')">Remove</button>
              <button type="button" class="radius2" onClick="location='<?php echo base_url(); ?>sadmin/permissions_skoollevel?id=<?php echo $perstudent['id']; ?>'	">Permissions</button>
            </form></td>
        </tr>
        <?php $i++; } ?>
    </table>
    </tbody>
    </span>
    <input type="hidden" id="added_school" href="#school" />
    <div style="display:none;">
      <div id="school"> </div>
    </div>
  </div>
</div>
<?php if(isset($comefrom) && $comefrom!='ajax')
{
   $this->load->view('sadmin/footer');
} ?>
<input type="hidden" id="new_school" href="#schoolnew" />