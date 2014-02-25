<!-- START OF HEADER -->
<div class="header radius3">
  <div class="headerinner"> <a class="brand" href="#"> <img
				src="<?php echo base_url(); ?>files/icons/elevater.png" alt="logo"
				width="100" height="25" />
			</a>
    <div class="headright">
      <div class="headercolumn">&nbsp;</div>
      <!--headercolumn--> 
      
      <!--headercolumn-->
      <div id="userPanel" class="headercolumn"> <a href="" class="userinfo radius2"> <img src="<?php echo  base_url() ?>themes/starlight/images/avatar.png" alt="" class="radius2" /> <span><strong><?php echo $session['lg_lname'];?></strong></span> </a>
        <div class="userdrop">
          <ul>
		
            <li><a href="<?php echo base_url(); ?>sadmin/mng_account" id="passwordreset">Account Settings</a></li>
            <li><a href="<?php echo base_url(); ?>sadmin/logout">Logout</a></li>
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
        <li <?php if($page=='mng_apps'){ ?> class="current"  <?php } ?>><a href="<?php echo base_url(); ?>apps/" class="dashboard"><span>Manage Apps</span></a></li>
        <li <?php if($page=='apps'){ ?> class="current"  <?php } ?>><a href="<?php echo base_url(); ?>apps/query_builder" class="dashboard"><span>Query Builder</span></a></li>
       </ul>
    </div>
    <!--leftmenu-->
    <div id="togglemenuleft"><a></a></div>
  </div>
  <!--mainleftinner--> 
</div>
<!--mainleft--> 

