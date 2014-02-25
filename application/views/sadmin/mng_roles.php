<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.0/jquery.min.js" type="text/javascript"></script>
<div class="maincontent">
<div class="maincontentinner">
  <ul class="maintabmenu">
    <li class="current"><a href="<?php echo base_url(); ?>sadmin/mng_roles">Roles Managment</a></li>
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
				  echo $this->input->get('msg').'</p></div><br/>';
			  }
  ?>
    <div class="contenttitle radiusbottom0">
      <h2 class="table"><span>Managment</span></h2>
    </div>
    <!--contenttitle-->
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
          <th class="head1">Role Name</th>
          <th class="head0">Role Permissions</th>
          <th class="head1">Actions</th>
        </tr>
      </thead>
      <tfoot>
        <tr>
          <th class="head0">No.</th>
          <th class="head1">Role Name</th>
          <th class="head0">Role Permissions</th>
          <th class="head1">Actions</th>
        </tr>
      </tfoot>
      <tbody>
        <?php $j=1; foreach ($roles as $counter=>$peritem){ ?>
        <tr class="gradeX" id="row_<?php echo $peritem['id']; ?>">
          <td><b><?php echo $j; ?></b></td>
          <td><?php echo $peritem['role_name'] ?></td>
          <td><a href="<?php echo base_url(); ?><?php echo index_page(); ?>sadmin/feature_permissions?id=<?php echo $peritem['id']; ?>">Permissions</a></td>
          <td align="right"><form class="stdform" action="#">
              <button type="button" class="radius2" onClick="remove_role(<?php echo $peritem['id']; ?>,'<?php echo $peritem['role_name'] ?>')">Remove</button>
            </form></td>
        </tr>
        <?php $j++; } ?>
      </tbody>
    </table>
  </div>
  <div class="mainright">
    <div class="mainrightinner">
      <form id="role_form" class="stdform" action="<?php echo base_url(); ?><?php echo index_page(); ?>sadmin/add" method="post" >
        <div class="widgetbox" style="width: 300px">
          <div class="title">
            <h2 class="general"><span>Add new role</span></h2>
          </div>
          <div class="widgetcontent stdform stdformwidget">
            <div class="par">
              <label>Role Name</label>
              <div class="field">
                <input type="text" name="role"  class="longinput" />
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
