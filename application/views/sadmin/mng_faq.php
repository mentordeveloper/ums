<?php if(isset($comefrom) && $comefrom!='ajax')	{?>

<div class="maincontent noright">
<div class="maincontentinner">
  <ul class="maintabmenu">
    <li class="current"><a href="<?php echo base_url(); ?>sadmin/mng_faq">Faq's Managment</a></li>
  </ul>
  <div class="content">
    <div class="par">
      <div class="field"> <a href="<?php echo base_url().'sadmin/new_faqs' ?>" id="add_school_qustion" class="stdbtn">Add New Question</a> <a href="<?php echo base_url().'sadmin/new_category' ?>" id="add_cat_qustion" class="stdbtn">Manage Categories</a> </div>
    </div>  
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
	  <col class="con1" />
      </colgroup>
      <thead>
        <tr>
          <th class="head0">No.</th>
          <th class="head1">Question</th>
          <th class="head0">Answer</th>
		  <th class="head1">Category</th>
          <th class="head0">Status</th>
          <th class="head1">Created Date</th>
          <th class="head0">Actions</th>
        </tr>
      </thead>
      <tfoot>
        <tr>
          <th class="head0">No.</th>
          <th class="head1">Question</th>
          <th class="head0">Answer</th>
		  <th class="head1">Category</th>
          <th class="head0">Status</th>
          <th class="head1">Created Date</th>
          <th class="head0">Actions</th>
        </tr>
      </tfoot>
      <tbody>
        <?php $counter=1; foreach($faqs as $perschool)
  		{
		
	   ?>
        <tr class="gradeX" id="row_<?php echo $perschool['id']; ?>">
          <td><?php echo $counter; ?></td>
          <td><strong><?php echo substr($perschool['question'],0,30).'...'; ?></strong></td>
          <td><strong><?php echo substr($perschool['answer'],0,30).'...'; ?></strong></td>
		  <?php if (isset($category)){ ?>
		  <td><strong><?php foreach($category as $percat) { if($percat['id']==$perschool['category']) { echo $percat['name']; } } ?></strong></td>
		  <?php }else{ ?>
		   <td><strong><?php if(isset($cat)){ echo $cat; } ?></strong></td>
		  <?php } ?>
          <td align="center"><?php if($perschool['status']=='true'){ ?>
            <img width="20" src="<?php echo base_url() ?>files/icons/1355052051_onebit_34.png" />
            <?php }else{ ?>
            <img width="20" src="<?php echo base_url() ?>files/icons/1355052074_mail-delete.png" />
            <?php } ?></td>
          <td><?php echo date('d-m-Y H:i:s',strtotime($perschool['date_time'])); ?></td>
          <td align="right"><form id="role_form" class="stdform">
              <button class="radius2" type="button" onclick="update_faq(<?php echo $perschool['id']; ?>,<?php echo $counter; ?>)">Update</button>
              <button class="radius2" type="button" onClick="remove_faq(<?php echo $perschool['id']; ?>)">Remove</button>
            </form></td>
        </tr>
        <?php $counter++; } ?>
      </tbody>
    </table>
    </span>
    <input type="hidden" id="added_faqs" href="#faqs" />
    <div style="display:none;">
      <div id="faqs"> </div>
    </div>
  </div>
</div>
<?php if(isset($comefrom) && $comefrom!='ajax')
{
 $this->load->view('sadmin/footer'); ?>
<?php } ?>
