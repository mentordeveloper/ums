<script src="<?php echo base_url('files/date_picker/js/jquery-1.8.2.min.js') ?>" type="text/javascript"></script><script type="text/javascript">
$(document).ready(function(){
$('#btn_upload_sharing').click(function(){
	
			var myresult = $("#test_form").validate({
										rules: {
											video_title: "required",
											video_desc: {
												required:true,
											},
										},
										messages: {
											video_title:"Please enter Video Title",
											video_desc:{
												required: "Please enter Video Description",
											}
										}
			}).form();		
			
			if(myresult){
				upload_file_sharing();			
			}
				
		});		


		$('#search_vid').click(function(){
			var myresult = $("#search_form").validate({
										rules: {
											title: {
												required:true,
											},
										},
										messages: {
											title:{
												required: "Please enter Video Title",
											}
										}
			}).form();		
			
			if(myresult){
				search_videos();			
			}
				
		});		
	});	
		</script>

<div class="maincontent">
  <div class="maincontentinner">
    <ul class="maintabmenu">
      <li class="current"><a href="<?php echo base_url(); ?>sadmin/mng_roles">Learning Video Managment</a></li>
    </ul>
    <div class="content"> <br>
      <div id="entry">
        <div class="contenttitle">
          <h2 class="table"> <span>Uploaded videos</span> </h2>
        </div>
        <table cellpadding="0" cellspacing="0" border="0" class="stdtable" id="dyntable">
          <?php if(!empty($all_video)) {?>
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
              <th class="head1">Title</th>
              <th class="head0">Video</th>
              <th class="head1">Date Uploaded</th>
              <th class="head0">Actions</th>
            </tr>
          </thead>
          <tfoot>
            <tr>
              <th class="head0">No.</th>
              <th class="head0">Title</th>
              <th class="head1">Video</th>
              <th class="head0">Date Uploaded</th>
              <th class="head1">Actions</th>
            </tr>
          </tfoot>
          <tbody>
            <?php 
    $count =1;
 
	foreach($all_video as $counter=>$get_all){ ?>
            <tr class="gradeX" id="_row<?php echo $get_all['v_id'] ?>">
              <td><?php echo $count;?></td>
              <td><?php echo $get_all['v_title'];?></td>
              <td><a href="<?php echo base_url().'sadmin/view_individual_video/'.$get_all['v_id'];?>"/><?php echo $get_all['file_name'];?></a></td>
              <td><?php echo $get_all['date_time'];?></td>
              <td>
              <span class="mylink">
              <a href="#" onclick="remove_video(<?php echo $get_all['v_id']; ?>)"> <span>Remove</span> </a>
              </span>
              </td>
            </tr>
            <?php $count++; }   ?>
            <?php }else{ ?>
            <tr>
              <td>No videos found</td>
            </tr>
            <?php } ?>
        </table>
      </div>
      <br>
      <form id="search_form" class="stdform">
        <div class="contenttitle">
          <h2 class="table"> <span>Search Video API</span> </h2>
        </div>
        <table cellpadding="0" cellspacing="0" border="0" class="stdtable">
          <tr>
            <td><strong>Title</strong></td>
            <td><input type="text" value="" name="title" id="value_sreach"  /></td>
          </tr>
          <tr>
            <td align="right" colspan="2"><button class="radius2" id="search_vid" type="button">Search</button></td>
          </tr>
        </table>
        <br>
        <div id="sr_uploading"> </div>
        <table cellpadding="0" cellspacing="0" border="0" class="stdtable">
          <div id="show_links"> </div>
        </table>
        <br>
        <table cellpadding="0" cellspacing="0" border="0" class="stdtable">
          <div id="show_videos"> </div>
        </table>
      </form>
    </div>
    <div class="mainright">
      <div class="mainrightinner">
        <form id="test_form" name="test_form" class="stdform">
          <div class="widgetbox" style="width: 300px">
            <div class="title">
              <h2 class="general"><span>Upload new video</span></h2>
            </div>
            <div class="widgetcontent stdform stdformwidget">
              <div class="par">
                <label><strong>Title</strong></label>
                <div class="field">
                  <input type="text" name="video_title" class="longinput" id="title" onblur="my_func_video()" />
                </div>
              </div>
              <div class="par">
                <label><strong>Description</strong></label>
                <div class="field">
                  <input type="text" name="video_desc" class="longinput" id="des"   onblur="my_func_video()" />
                </div>
              </div>
              <div class="par">
                <label><strong>Select Video</strong></label>
                <div class="field">
                  <input id="Filedatanew" name="Filedatanew" type="file" multiple="true">
                </div>
              </div>
              <div id="invalidtype" align="center" style="color:red; align:center;"> </div>
              <div  class="par">
                <div class="field">
                  <button class="radius2" id="btn_upload_sharing" name="test" type="button">Upload Video</button>
                </div>
              </div>
              <span id="success_uploading"></span>
              </td>
            </div>
          </div>
        </form>
      </div>
    </div>
    <? $this->load->view('sadmin/footer'); ?>
  </div>
  <input type="hidden" id="video_show_inner" href="#video_show" />
  <div style="display:none;">
    <div id="video_show"> </div>
  </div>
</div>
</div>
