<div class="maincontent noright">
  <div class="maincontentinner">
    <ul class="maintabmenu">
      <li class="current"><a href="#">Manage Payments system</a></li>
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
      <div class="notification msginfo"> <a class="close"></a>
        <p> * Payment plans are made available to the school admin for purchase</p>
      </div>
      <form action="#" method="post" class="stdform">
        <!--        <a href="<?php echo base_url(); ?>sadmin/payments" class="radius2">Add New Package</a> -->
      </form>
      <br/>
      <div class="contenttitle radiusbottom0">
        <h2 class="table"><span>Managment</span></h2>
      </div>
      <div class="tab-content">
        <table cellpadding="0" cellspacing="0" border="0" class="stdtable" id="dyntable">
          <colgroup>
          <col class="con0" />
          <col class="con1" />
          <col class="con0" />
          <col class="con1" />
          <col class="con0" />
          <col class="con0" />
          <col class="con0" />
          <col class="con0" />
          </colgroup>
          <thead>
            <tr>
              <th class="head0">No.</th>
              <th class="head1">Name</th>
              <th class="head0">Term </th>
              <th class="head1">Term Quantity</th>
              <th class="head1">Package Users</th>
              <th class="head1">Package Price</th>
              <th class="head1">Recursive</th>
              <th class="head1">Status</th>
              <th class="head1">Actions</th>
            </tr>
          </thead>
          <?php 
				
				$i=1;
				
				foreach($packages as $counter=>$peritem)
				{
		  		  ?>
          <tr>
            <td align="center"><?php echo $i; ?></td>
            <td align="left"><?php echo $peritem['p_name'];    ?></td>
            <td align="center"><?php if($peritem['p_term']==1){  echo 'Days'; }
                                if($peritem['p_term']==7){  echo 'Week'; }
                                if($peritem['p_term']==15){ echo 'Quaterly'; }
                                if($peritem['p_term']==30){ echo 'Monthly'; }
								if($peritem['p_term']==365){ echo 'Yearly'; }
                          ?></td>
            <td align="center"><?php echo $peritem['p_quan'];    ?></td>
            <td align="center"><?php if($peritem['p_package']=='unlimited'){
					  
					  	echo 'Unlimited *';
					  
					  }else{
					    ?>
              ( <?php echo $peritem['p_users'];   ?> ) Users
              <?php
					  } ?></td>
            <td align="center"><?php if($peritem['p_price']==0){ echo 'Free'; }else{  echo $peritem['p_price'].'$'; }   ?></td>
            <td align="center"><?php if($peritem['p_recursive']=='on'){  
				  ?>
              <img width="20" src="<?php echo base_url(); ?>/files/icons/1355052051_onebit_34.png" />
              <?php
				  }else
				  {
					  ?>
              <img width="20" src="<?php echo base_url(); ?>/files/icons/1355052074_mail-delete.png" />
              <?php
				  } ?></td>
            <td align="center"><?php if($peritem['p_live']=='on'){  
				  ?>
              <img width="20" src="<?php echo base_url(); ?>/files/icons/1355052051_onebit_34.png" />
              <?php
				  }else
				  {
					 ?>
              <img width="20" src="<?php echo base_url(); ?>/files/icons/1355052074_mail-delete.png" />
              <?php 
				  } ?></td>
            <td align="center"><form action="<?php echo base_url() ?>sadmin/payments" method="post" class="stdform">
                <input type="hidden" value="<?php echo $peritem['p_id'] ?>" name="p_update" />
                <button class="radius2" type="submit">Update</button>
                <button class="radius2" type="button" onClick="R_s(<?php echo $peritem['p_id'] ?>,'<?php echo $peritem['p_name'];   ?>')">Remove</button>
              </form></td>
          </tr>
          <?php	$i++; } 	?>
        </table>
        <br/>
        <?php if(isset($information)){ 	 ?>
        <form  id="pay_sys_form" action="<?php echo base_url() ?>sadmin/update_payment_package/" method="post" onsubmit="return save_plan_payment()" class="stdform">
        <input type="hidden" value="<?php echo $update_id ?>" name="id" />
        <?php 
				}else{ 
		     ?>
        <form id="pay_sys_form" action="<?php echo base_url() ?>sadmin/save_payment_package/" method="post" onsubmit="return save_plan_payment()" class="stdform">
          <?php 
		     }
		    ?>
          <div class="contenttitle radiusbottom0">
            <h2 class="table"><span>Add New Payment Package</span></h2>
          </div>
          <table cellpadding="0" cellspacing="0" border="0" class="stdtable" id="dyntable">
            <tr>
              <td><strong>Package Name</strong></td>
              <td><input type="text" value="<?php if(isset($information)){ echo $information[0]['p_name']; } ?>" id="test" name="pname" size="50" /></td>
            </tr>
            <tr>
              <td><strong>Payment Term</strong></td>
              <td><select id="term" name="term" >
                  <option value="1" <?php if(isset($information)){ if($information[0]['p_term']=='1'){ echo 'selected'; } } ?>>Days</option>
                  <option value="7" <?php if(isset($information)){ if($information[0]['p_term']=='7'){ echo 'selected'; } } ?>>Weekly</option>
                  <option value="30" <?php if(isset($information)){ if($information[0]['p_term']=='30'){ echo 'selected'; } } ?>>Monthly</option>
                  <option value="365" <?php if(isset($information)){ if($information[0]['p_term']=='365'){ echo 'selected'; } } ?>>Yearly</option>
                </select>
                <input type="text" id="quan" name="quan"  value="<?php if(isset($information)){ echo $information[0]['p_quan']; } ?>" placeholder="Please enter the number of Days for this plan" /></td>
            </tr>
            <tr>
              <td><strong>Number Of Users</strong></td>
              <td><select id="package" name="package" >
                  <option id="def" name="def" value="defined" <?php if(isset($information)){ if($information[0]['p_package']=='defined'){ echo 'selected'; } } ?>>As defined</option>
                  <option  id="unlim" name="unlim" value="unlimited" <?php if(isset($information)){ if($information[0]['p_package']=='unlimited'){ echo 'selected'; } } ?>>Unlimited</option>
                </select>
                <input type="text" id="users" name="users" value="<?php if(isset($information)){ echo $information[0]['p_users']; } ?>" /></td>
            </tr>
            <tr>
              <td><strong>Package Price</strong></td>
              <td><select name="price" id="price">
                  <option value="">Please select</option>
                  <option value="free" <?php if(isset($information) && $information[0]['p_price']==0){ echo 'selected="selected"'; }?> >Free</option>
                  <option value="defined" <?php if(isset($information) && $information[0]['p_price']!=0){ echo 'selected="selected"'; }?>>Defined</option>
                </select>
                
                <input type="text" id="price1" name="price1" value="<?php if(isset($information) && $information[0]['p_price']==0){ echo 'Free'; }elseif(isset($information)){ echo $information[0]['p_price'];  } ?>" /><strong>$</strong></td>
            </tr>
            <tr>
              <td><strong>Reoccurring</strong></td>
              <td><input type="checkbox" id="recursive" name="recursive" <?php if(isset($information)){ if($information[0]['p_recursive']=='on'){ echo 'checked'; } } ?> />
                <span class="error" style="font-size:10px;">* Select if you want this subscription to renew automatically </span></td>
            </tr>
            <tr>
              <td><strong>Status</strong></td>
              <td><input type="checkbox" name="live" id="live" <?php if(isset($information)){ if($information[0]['p_live']=='on'){ echo 'checked'; } } ?> />
                <span class="error" style="font-size:10px;">* Select if you want this plan to be visible to the school admin </span></td>
            </tr>
            <tr>
              <td><strong>Activate by default</strong></td>
              <td><input type="checkbox" name="default" id="default" <?php if(isset($information)){ if($information[0]['p_default']=='on'){ echo 'checked'; } } ?> />
                <span class="error" style="font-size:10px;">* Select if you want this plan to be activated when school created </span></td>
            </tr>
            <tr>
              <td><strong>Description</strong></td>
              <td><textarea style="width:430px;height:70px" name="description"><?php if(isset($information)){ echo $information[0]['p_description']; } ?>
</textarea></td>
            </tr>
            <tr>
              <td colspan="2" align="right"><?php if(isset($information)){ 	 ?>
                <button class="radius2" type="reset">Reset</button>
                <button class="radius2" type="submit">Update Payment Plan</button>
                <?php }else{ ?>
                <button class="radius2" type="reset">Reset</button>
                <button class="radius2" type="submit">Save Payment Plan</button>
                <?php } ?></td>
            </tr>
          </table>
        </form>
      </div>
    </div>
    </td>
    </tr>
    </table>
  </div>
</div>
<? $this->load->view('sadmin/footer'); ?>
<input type="hidden" id="tab_open" value="<?php echo $tab_open; ?>"  />
