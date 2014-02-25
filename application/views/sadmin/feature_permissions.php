<div class="maincontent">
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
    <form action="" class="stdform" method="post" >
      <h2>Select Role :
        <select id="schoolselection1">
          <option>Please select</option>
          <?php 
    
        foreach($rolesall as $perrole)
        {	
        ?>
          <option value="<?php echo base_url().'sadmin/feature_permissions?id='.$perrole['id'] ?>"><?php echo $perrole['role_name']; ?></option>
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
    <form action="<?php echo base_url(); ?><?php echo index_page(); ?>sadmin/saveperuser" method="post" class="stdform" >
      <input type="hidden" name="p_id" value="<?php echo $id; ?>"  />
      <table cellpadding="0" cellspacing="0" border="0" class="stdtable" id="dyntable">
        <tr>
          <td colspan="5" align="left"><b><?php echo ucfirst($name); ?> can
            <select name="core_permissions" id="selection2">
              <?php if($core_permissions==1){ ?>
              <option selected="selected" value="1"> View </option>
              <option value="2"> Manage</option>
              <?php } ?>
              <?php if($core_permissions==2){ ?>
              <option  value="1"> View </option>
              <option selected="selected" value="2"> Manage</option>
              <?php } ?>
              <?php if(empty($core_permissions)){ ?>
              <option  value="1"> View </option>
              <option  value="2"> Manage</option>
              <?php } ?>
            </select>
            </b> Rights </td>
        </tr>
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
            <th class="head0"><input type="checkbox" value="" id="select_all"  />
              Selection </th>
            <th class="head1">Actions</th>
          </tr>
        </thead>
        <tbody>
          <?php $counter = 1; foreach ($permissions as $peritem)
			{
				if($peritem['show']!='hide'){
		  ?>
          <tr id="row_<?php echo $peritem['id']; ?>" class="gradeX">
            <td><b><?php echo $counter; ?></b></td>
            <td><?php echo $peritem['permission_mask_name'] ?></td>
            <?php if( is_array($saved_data) && in_array($peritem['id'],$saved_data)) { ?>
            <td><input type="checkbox" id="checkbox" checked name="permis[]" value="<?php echo $peritem['id'] ?>" /></td>
            <?php }else{ ?>
            <td><input type="checkbox" id="checkbox" name="permis[]" value="<?php echo $peritem['id'] ?>" /></td>
            <?php } ?>
            <td align="right">
            <span class="mylink">
            <a id="update_permission_set" href="<?php echo base_url(); ?><?php echo index_page(); ?>sadmin/updatepermissionsname?id=<?php echo $peritem['id']; ?>"> <span>Update</span> </a>
            </span>
            
          </tr>
          <?php $counter++; }} ?>
          <tr>
            <td colspan="5" align="right"><div class="par">
                <div class="field">
                  <button class="radius2" type="submit">Save Permission</button>
                </div>
              </div></td>
          </tr>
        </tbody>
      </table>
    </form>
  </div>
  <div class="mainright">
    <div class="mainrightinner">
      <form id="perm_form" class="stdform" action="<?php echo base_url(); ?><?php echo index_page(); ?>sadmin/addpermission" method="post" >
        <input type="hidden" name="p_id" value="<?php echo $id; ?>"  />
        <div class="widgetbox" style="width: 300px">
          <div class="title">
            <h2 class="general"><span>Add new permission</span></h2>
          </div>
          <div class="widgetcontent stdform stdformwidget">
            <div class="par">
              <label>Permission Name</label>
              <div class="field">
                <input type="text" name="permission"  class="longinput" />
              </div>
            </div>
            <!--par-->
            <div class="par">
              <label>Mask Name</label>
              <div class="field">
                <input type="text" name="permission_mask"  class="longinput" />
              </div>
            </div>
            <!--par-->
            <div class="par">
              <div class="field">
                <button class="radius2" type="submit">Submit</button>
              </div>
            </div>
            <!--par--> 
          </div>
          <!--widgetcontent--> 
        </div>
        
        <!--widgetbox-->
      </form>
    </div>
  </div>
</div>
<? $this->load->view('sadmin/footer'); ?>
