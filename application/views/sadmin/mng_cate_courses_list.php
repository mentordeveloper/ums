<input type="hidden" name="is_course" id="is_course" value="1" />
 <input type="hidden" name="c_id_parent" id="c_id_parent" value="<?php echo $ct_id;?>" />
      <input type="hidden" name="is_parent" id="is_parent" value="<?php echo $is_parent;?>" />
<?php if(isset($comefrom) && $comefrom!='ajax'){  ?>

<input type="hidden" id="added_course1" />
        <div style="display: none;">
            <div id="course1"></div>
        </div>
<div class="maincontent noright">
<div class="maincontentinner">
  <ul class="maintabmenu">
    <li class="current"><a href="<?php echo base_url(); ?>sadmin/mng_cate_courses_list">Manage <?php echo ucwords(ci_urldecode($ct_name));?> Courses </a></li>
  </ul>
  <div class="content"> 
      
      <a class="stdbtn" href="<?php echo base_url().'sadmin/new_course_type/'.$ct_id.'/1'; ?>" id="add_school_new">Add Courses</a> 
           <?php if(!empty($ct_id)){?>
          &nbsp;&nbsp;&nbsp;  
          <!--<a class="stdbtn radius2" onClick="history.back(-1);" href="#" id="manage_course">Back </a>--> 
          <span class="stdbtn radius2" onClick="history.back(-1);"  id="manage_course">Back </span> 
          <br/>
          <?php }?>
      
     
    <br/>
    <div class="contenttitle radiusbottom0">
      <h2 class="table"><span>Courses</span></h2>
    </div>
    <?php } ?>
    <span id="html_ajax">
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
          <th class="head1">Name</th>
          <th class="head0">Status</th>
          <th class="head1">Created Date</th>
          <th class="head1">Actions</th>
        </tr>
      </thead>
      <tfoot>
        <tr>
          <th class="head0">No.</th>
          <th class="head1">Name</th>
          <th class="head0">Status</th>
          <th class="head1">Created Date</th>
          <th class="head1">Actions</th>
        </tr>
      </tfoot>
      <tbody>
          
                                     <?php
            $i = 1;
            foreach ($courses as $counter => $percourse) {
            ?>
            <tr class="gradeA" id="row_<?php echo $percourse['ct_id']; ?>">
                <td align="center"><?php echo $i; ?></td>
                <td><strong><?php echo ucwords(ci_urldecode($percourse['ct_name'])); ?></strong></td>
                <td align="center"><?php if ($percourse['ct_status'] == 'true') { ?>
                        <img width="20"
                             src="<?php echo base_url() ?>files/icons/1355052051_onebit_34.png" />
                         <?php } else { ?>
                        <img width="20"
                             src="<?php echo base_url() ?>files/icons/1355052074_mail-delete.png" />
                    <?php } ?></td>
                <td align="center"><?php echo $percourse['ct_date']; ?></td>
                <td align="right">
                    <form class="stdform" action="#">

                    <input type="hidden" id="course_id_new<?php echo $percourse['ct_id']; ?>" value="<?php echo ucwords(ci_urldecode($percourse['ct_name'])); ?>">
                    <button class="radius2"
                            onClick="update_course_type(<?php echo $percourse['ct_id']; ?>)">Update</button>
                    <button class="radius2"
                            onClick="remove_course(<?php echo $percourse['ct_id']; ?>)">Remove</button>
                    </form>
                </td>
            </tr>
            <?php
            $i++;
        }
        ?>
      
    </table>
    </tbody>
    </span>
    <input type="hidden" id="added_course" href="#course" />
    <div style="display: none;">
        <div id="course"></div>
    </div>
  </div>
</div>
<?php if(isset($comefrom) && $comefrom!='ajax')
{
   $this->load->view('sadmin/footer');
} ?>
<input type="hidden" id="new_school" href="#schoolnew" />

