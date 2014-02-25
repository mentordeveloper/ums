<center>
  <table id="viewer" class="table-striped border-simple" cellpadding="10" style="margin-bottom:20px !important;width:100% !important;">
    <tr>
      <td colspan="5" style="padding-left:10px;"><h2>Roles Managment</h2></td>
    </tr>
    <tr>
      <td colspan="5"><?php
  
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
        </span></td>
    </tr>
    <tr>
      <td colspan="5" valign="top"><form action="<?php echo base_url(); ?><?php echo index_page(); ?>sadmin/add" method="post" >
          <b>Add new role </b>
          <input type="text" value="" name="role" />
          <input type="submit" value="Add" class="btn">
        </form></td>
    </tr>
    <tr>
      <th align="left">No. </th>
      <th align="left"> Role </th>
      <th align="left"> view Permission </th>
      <th align="left"> Actions</th>
    </tr>
    <?php foreach ($roles as $counter=>$peritem)
		{
		?>
    <tr>
      <td align="left" style="padding-left:10px;"><b><?php echo $peritem['id']; ?></b></td>
      <td align="left" style="padding-left:10px;"><?php echo $peritem['role_name'] ?></td>
      <td><a href="<?php echo base_url(); ?><?php echo index_page(); ?>sadmin/feature_permissions?id=<?php echo $peritem['id']; ?>">Permissions</a></td>
      <td align="left" style="padding-left:10px;"><a href="<?php echo base_url(); ?><?php echo index_page(); ?>sadmin/remove?id=<?php echo $peritem['id']; ?>">remove</a></td>
    </tr>
    <?php } ?>
  </table>
</center>
