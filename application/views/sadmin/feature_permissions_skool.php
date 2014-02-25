<div class="maincontent noright">
<div class="maincontentinner">
  <ul class="maintabmenu">
    <li class="current"><a href="#">Managing permission for <?php echo ucfirst($name); ?></a></li>
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
    <form action="" class="stdform" method="post">
      <h2>Select School :
        <select id="schoolselection">
          <option> Select school </option>
          <?php 
    
        foreach($system_types as $perschool)
        {	
        ?>
          <option value="<?php echo base_url().'sadmin/feature_permissions_skool?id='.$perschool['id']; ?>"><?php echo $perschool['role_name']; ?></option>
          <?php
        }
        ?>
        </select>
      </h2>
    </form>
    <br/>
    <div class="contenttitle radiusbottom0">
      <h2 class="table"><span>Managment</span></h2>
    </div>
    <form action="<?php echo base_url(); ?><?php echo index_page(); ?>sadmin/saveperuser_type" method="post" class="stdform" id="role_form">
      <input type="hidden" name="p_id" value="<?php echo $id; ?>" />
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
            <th class="head1">Permission name</th>
            <th class="head0"> <input type="checkbox" value="" id="select_all"  />
              Selection </th>
            <th class="head1">Actions</th>
          </tr>
        </thead>
        <?php $counter = 1; foreach ($permissions as $peritem)
		{
			if($peritem['show']!='hide'){
		?>
        <tr id="row_<?php echo $peritem['id']; ?>">
          <td align="left" style="padding-left:10px;"><b><?php echo $counter; ?></b></td>
          <td align="left" style="padding-left:10px;"><?php echo $peritem['permission_mask_name'] ?></td>
          <?php 
				if(!is_array($saved_data)){
					$saved_data = array();
				}
		
				if(in_array($peritem['id'],$saved_data)){ ?>
          <td align="center"><input type="checkbox" checked="checked" name="permis[]" value="<?php echo $peritem['id'] ?>" /></td>
          <?php }else{ ?>
          <td align="center"><input type="checkbox" name="permis[]" value="<?php echo $peritem['id'] ?>" /></td>
          <?php } ?>
          <td align="right"><!-- <a class="btn btn_trash"  href="<?php echo base_url(); ?>sadmin/removepermi?id=<?php echo $peritem['id']; ?>"> <span>Trash</span></a> --> 
          
            <span class="mylink">
            <a id="update_permission_set"  href="<?php echo base_url(); ?><?php echo index_page(); ?>sadmin/updatepermissionsname?id=<?php echo $peritem['id']; ?>"> <span>Update</span></a>
            </span>
            
        </tr>
        <?php $counter++; }} ?>
        <tr>
          <td colspan="5" align="right"><button class="radius2" type="submit"> Save permissions </button></td>
        </tr>
      </table>
    </form>
  </div>
</div>
<? $this->load->view('sadmin/footer'); ?>
