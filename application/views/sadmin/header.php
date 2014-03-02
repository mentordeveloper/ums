<!-- START OF HEADER -->
<div class="header radius3">
    <div class="headerinner"> <a style="color: #ffffff;font-size: 18px;font-weight: bold;" class="brand" href="#"> Libiya University Management System 
			</a>
    <div class="headright">
      <div class="headercolumn">&nbsp;</div>
      <!--headercolumn--> 
      
      <!--headercolumn-->
      <div id="userPanel" class="headercolumn"> <a href="" class="userinfo radius2"> <img src="<?php echo  base_url() ?>themes/starlight/images/avatar.png" alt="" class="radius2" /> <span><strong><?php echo $session['lg_lname'];?></strong></span> </a>
        <div class="userdrop">
          <ul>
		
            <li><a href="<?php echo site_url(); ?>/sadmin/mng_account" id="passwordreset">Account Settings</a></li>
            <li><a href="<?php echo site_url(); ?>/sadmin/logout">Logout</a></li>
          </ul>
        </div>
        <!--userdrop--> 
      </div>
      <!--headercolumn--> 
    </div>
    <!--headright--> 
  </div>
  <!--headerinner--> 
</div>
<!--header--> 
<!-- END OF HEADER --> 
<!-- START OF MAIN CONTENT -->
<div class="mainwrapper">
<div class="mainwrapperinner">
<div class="mainleft">
  <div class="mainleftinner">
    <div class="leftmenu">
      <ul>
                <li <?php if($page=='dashboard'){ ?> class="current"  <?php } ?>><a href="<?php echo site_url(); ?>/sadmin/home" class="dashboard"><span>Dashboard</span></a></li>
        <li <?php if($page=='mng_students'){ ?> class="current"  <?php } ?>><a href="<?php echo site_url(); ?>/sadmin/mng_students" class="dashboard"><span>Manage Students</span></a></li>
        <!--<li <?php if($page=='mng_roles'){ ?> class="current"  <?php } ?>><a href="<?php echo site_url(); ?>/sadmin/mng_roles" class="widgets"><span>Manage Roles</span></a></li>-->
        
	
       
		
	 </ul>
    </div>
    <!--leftmenu-->
    <div id="togglemenuleft"><a></a></div>
  </div>
  <!--mainleftinner--> 
</div>
<!--mainleft--> 

