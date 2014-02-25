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
        <!--        <li <?php //if($page=='dashboard'){ ?> class="current"  <?php //} ?>><a href="<?php //echo base_url(); ?>sadmin/home" class="dashboard"><span>Dashboard</span></a></li>-->
        <li <?php if($page=='mng_schools'){ ?> class="current"  <?php } ?>><a href="<?php echo base_url(); ?>sadmin/mng_schools" class="dashboard"><span>Manage Schools</span></a></li>
        <li <?php if($page=='mng_roles'){ ?> class="current"  <?php } ?>><a href="<?php echo base_url(); ?>sadmin/mng_roles" class="widgets"><span>Manage Roles</span></a></li>
        <!--  <ul>
            <li <?php //if($page=='feature_permissions'){ ?> class="current"  <?php //} ?>><a href="<?php //echo base_url(); ?>sadmin/mng_roles"><span>Permissions</span></a></li>
          </ul>-->
        </li>
        <li <?php if($page=='mng_courses_cate'){ ?> class="current"  <?php } ?>><a href="<?php echo base_url(); ?>sadmin/mng_courses_cate" class="tables"><span>Manage Courses Type</span></a></li>
        <li <?php if($page=='mng_survey'){ ?> class="current"  <?php } ?>><a href="<?php echo base_url(); ?>sadmin/mng_surveys" class="tables"><span>Manage Survey</span></a></li>
        <li <?php if($page=='mng_faq'){ ?> class="current"  <?php } ?>><a href="<?php echo base_url(); ?>sadmin/mng_faq" class="elements"><span>Manage FAQ</span></a></li>
        <li <?php if($page=='mng_videos'){ ?> class="current"  <?php } ?>><a href="<?php echo base_url(); ?>sadmin/mng_videos" class="calendar"><span>Manage Videos</span></a></li>
        <li <?php if($page=='mng_about'){ ?> class="current"  <?php } ?>><a href="<?php echo base_url(); ?>sadmin/mng_about" class="media"><span>Manage About</span></a></li>
        
        <li <?php if($page=='mng_email_templates'){ ?> class="current"  <?php } ?>><a href="<?php echo base_url(); ?>sadmin/email_templates" class="media"><span>Email templates</span></a></li>
        
        <li <?php if($page=='mng_settings'){ ?> class="current"  <?php } ?>><a href="<?php echo base_url(); ?>sadmin/settings" class="charts"><span>Manage Settings</span></a> </li>
      <!--  <li <?php if($page=='lesson_plans'){ ?> class="current"  <?php } ?>><a href="<?php echo base_url(); ?>sadmin/lesson_plans" class="editor"><span>Manage Lesson Plans</span></a> </li>
        <li <?php if($page=='mng_video_rep'){ ?> class="current"  <?php } ?>><a href="<?php echo base_url(); ?>sadmin/video_repo" class="calendar"><span>Video Repository</span></a></li>
        -->
		 <li <?php if($page=='mng_term_settings'){ ?> class="current"  <?php } ?>><a  href="<?php echo base_url(); ?>sadmin/mng_term_settings" class="error"><span>Manage Term Settings</span></a></li>
     
        <li <?php if($page=='mng_type'){ ?> class="current"  <?php } ?>><a href="<?php echo base_url(); ?>sadmin/mng_skoolType" class="widgets"><span>Manage School Types</span></a></li>
        <li <?php if($page=='mng_payments'){ ?> class="current"  <?php } ?>><a href="<?php echo base_url(); ?>sadmin/payments" class="buttons"><span>Payments</span></a></li>
         <li <?php if($page=='mng_payments_refund'){ ?> class="current"  <?php } ?>><a href="<?php echo base_url(); ?>sadmin/payment_refund" class="buttons"><span>Payments Refund</span></a></li>
	    <li <?php if($page=='req_access'){ ?> class="current"  <?php } ?>><a href="<?php echo base_url(); ?>sadmin/req_access" class="chat"><span>Api Request Access</span></a></li>
        <li <?php if($page=='mng_language'){ ?> class="current"  <?php } ?>><a  href="<?php echo base_url(); ?>sadmin/language_settings" class="error"><span>Manage Language settings</span></a></li>
           <li <?php if($page=='mng_notif'){ ?> class="current"  <?php } ?>><a  href="<?php echo base_url(); ?>sadmin/mng_notif" class="elements"><span>Manage Announcements</span></a></li>
     
		
	 </ul>
    </div>
    <!--leftmenu-->
    <div id="togglemenuleft"><a></a></div>
  </div>
  <!--mainleftinner--> 
</div>
<!--mainleft--> 

