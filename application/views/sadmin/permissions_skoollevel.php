<div class="maincontent noright">
<div class="maincontentinner">
<ul class="maintabmenu">
  <li class="current"><a href="<?php echo base_url(); ?>sadmin/mng_schools"><?php echo $schools_data['name']; ?></a></li>
</ul>
<div class="content">
<?php
  
			  $msg = $this->input->get('msg');
			  $go = $this->input->get('go');
			  
			  if($go=='true')
			  {
				echo '<div class="notification msgsuccess">
                        <a class="close"></a><p>' ;
			  }
			  if($go=='false')
			  {
				echo '<div class="notification msgerror">
<a class="close"></a><p>' ;
			  }
			  
			  if(!empty($msg))
			  {  
				  echo $this->input->get('msg').'</p></div>';
			  }
  ?>
<form action="" class="stdform" method="post" >
  <h2>Select School :
    <select id="schoolselection">
      <option>Please Select School</option>
      <?php 
    
        foreach($schools as $perschool)
        {	
        ?>
      <option value="<?php echo base_url().'sadmin/permissions_skoollevel?id='.$perschool['id']; ?>"><?php echo $perschool['name']; ?></option>
      <?php
        }
        ?>
    </select>
  </h2>
</form>
<br/>
<div class="contenttitle radiusbottom0">
  <h2 class="table"> <span>Managment</span> </h2>
</div>
</span>
<form action="<?php echo base_url(); ?><?php echo index_page(); ?>sadmin/savepermyschool_type" method="post" class="stdform">
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
        <th class="head0"> No. </th>
        <th class="head1"> Permission Name </th>
        <th class="head0"> Selection </th>
      </tr>
    </thead>
    <?php 
	    
	    $i=0;
		$counter = 1;
		if(!empty($admin_ps_main))
		{
	     foreach ($admin_ps_main as $peritem)
		{
			
		?>
    <tr id="row_<?php echo $peritem['id']; ?>">
      <td align="center" style="padding-left:10px;"><b><?php echo $counter; ?></b></td>
      <td align="left" style="padding-left:10px;"><?php echo $peritem['permission_mask_name'] ?></td>
      <?php if(in_array($peritem['id'],$saved_data)){ ?>
      <td align="center" style="padding-left:10px;"><input type="checkbox" checked name="permis[]" value="<?php echo $peritem['id'] ?>" /></td>
      <?php }else{ ?>
      <td align="center" style="padding-left:10px;"><input type="checkbox" name="permis[]" value="<?php echo $peritem['id'] ?>" /></td>
      <?php } ?>
    </tr>
    <?php $counter++; } } ?>
    <tr>
      <td colspan="5" align="right"><button class="radius2" type="submit"> Save Permissions </button></td>
    </tr>
    <input type="hidden" name="user_school" value="<?php echo $user_school; ?>">
    <input type="hidden" name="nameuser" value="<?php echo $user_idd; ?>">
  </table>
</form>
</center>
