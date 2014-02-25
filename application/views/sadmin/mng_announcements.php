 <div class="maincontent noright">
<div class="maincontentinner">
	
	<ul class="maintabmenu multipletabmenu">
		<li ><a href="<?php echo base_url(); ?>sadmin/mng_notif">Add Announcement</a></li>
		<li class="current"><a href="<?php echo base_url(); ?>sadmin/mng_announcements">Manage Announcements</a></li>
	</ul>
                
<div class="content">                
	<div class="contenttitle radiusbottom0">
        <h2 class="table"><span>Announcements Management</span></h2>
    </div>
<form id="notif_formz" class="stdform" action="#" method="POST">

   
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
                       
              <th class="head0">Description </th>
			  <th class="head1">Start Date</th>
			  <th class="head1">End Date</th>            
			  <th class="head1">Status</th>		
			  <th class="head1">Action</th>				  
            </tr>
          </thead>
          <?php 				
				$i=1;				
				foreach($all_announcements as $counter=>$peritem)
				{
		  		  ?>
          <tr id="row_<?php  echo $peritem['id']; ?>">
                      
            <td align="center" width="270px"><?php echo make_string_breaks($peritem['description'],50);    ?></td>			
			<td align="center"><?php echo $peritem['start_date'];    ?></td>			
			<td align="center"><?php echo $peritem['end_date'];    ?></td>			                      
       	
		
			<?php if($peritem['status']==1){ ?>
			 	<td align="center">Active</td>
			 
			 <?php }else { ?>
			<td align="center">Not Active</td>
			 <?php } ?>
			 
			 <td align="center">
			    <a href="<?php echo base_url(); ?>sadmin/mng_notif/<?php echo $peritem['id']; ?>" class="button" >Edit</a>&nbsp;&nbsp
                <button class="radius2" type="button" onclick="delete_announcement(<?php echo $peritem['id'];?>)" >Delete</button>
			 </td>
			</tr>
          <?php	$i++; } 	?>
        </table>
</form>
   
<input type="hidden" id="base_url" value="<?php echo $base_url;?>" />
<input type="hidden" id="added_school" href="#school" />
<div style="display:none;">
  <div id="school"> </div>
    
                      
                     
                     