<div class="maincontent noright">
  <div class="maincontentinner">
    <ul class="maintabmenu">
      <li class="current"><a href="#">View Payments Refund</a></li>
    </ul>
    <div class="content">
     
      <form action="#" method="post" class="stdform">
        <!--        <a href="<?php echo base_url(); ?>sadmin/payments" class="radius2">Add New Package</a> -->
      </form>
      <br/>
      <div class="contenttitle radiusbottom0">
        <h2 class="table"><span>Payments Refund</span></h2>
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
              <th class="head0">User </th>
			  <th class="head1">From Package</th>
			  <th class="head1">To Package</th>			  
              <th class="head1">Days used</th>
              <th class="head1">Amount To Refund</th>             
			  <th class="head1">Package Purchase Date</th>  
			  <th class="head1">Package Change Date</th>	
			  <th class="head1">Refunded</th>				  
            </tr>
          </thead>
          <?php 				
				$i=1;				
				foreach($information as $counter=>$peritem)
				{
		  		  ?>
          <tr>
            <td align="center"><?php echo $i; ?></td>            
            <td align="center"><?php echo $peritem['lg_fname'];    ?></td>			
			<td align="center"><?php echo $peritem['from_package'];    ?></td>			
			<td align="center"><?php echo $peritem['to_package'];    ?></td>
			<td align="center"><?php echo $peritem['r_days_used']; ?></td>                          
            <td align="center"><?php echo $peritem['r_amount'].'$'; ?></td>			
			<td align="center"><?php echo $peritem['from_date_time']; ?></td>
			<td align="center"><?php echo $peritem['to_date_time']; ?></td>			
			<?php if($peritem['status']==1){ ?>
			 	<td align="center"><input type="checkbox" checked id="checkAddress" onclick="my_status_uncheck(<?php echo $peritem['r_id'] ?>)"  /></td>
			 
			 <?php }else { ?>
			<td align="center"><input type="checkbox" id="checkAddress" onclick="my_status_check(<?php echo $peritem['r_id'] ?>)" /></td>
			 <?php } ?>
			</tr>
          <?php	$i++; } 	?>
        </table>
        <br/>
      
    </td>
    </tr>
    </table>
  </div>
</div>
<? $this->load->view('sadmin/footer'); ?>