<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.0/jquery.min.js" type="text/javascript"></script>
<script type="text/javascript">
$(document).ready(function(){

		$('#add_language').click(function(){
			var myresult = $("#language_form").validate({
										rules: {
											add_lang: {
												required:true,
											},
										},
										messages: {
											add_lang:{
												required: "Please enter Language Title",
											}
										}
			}).form();		
			
			if(myresult){
				create_language_folder();			
			}
				
		});		
	});	
	
	
		</script>

<div class="maincontent">
<div class="maincontentinner">
  <ul class="maintabmenu">
    <li class="current"><a href="#">Manage Language system</a></li>
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
    <form id="role_form" class="stdform" action="#" method="post" >
      <table cellpadding="0" cellspacing="0" border="0" class="stdtable" id="dyntable">
        <colgroup>
        <col class="con0" />
        <col class="con1" />
     	<col class="con0" />
      	<col class="con1" />
        </colgroup>
         <thead>
        <tr>
          <th class="head0">No.</th>
          <th class="head1">Language Name</th>
          <th class="head1">Actions</th>
        </tr>
      </thead>
      <tfoot>
        <tr>
          <th class="head0">No.</th>
          <th class="head1">Language Name</th>
          <th class="head1">Actions</th>
        </tr>
      </tfoot>
        <tbody>
          <?php $u=1; for($i=0;$i<count($languages) ;$i++){ ?>
          <tr class="gradeX" id="row_<?php echo $i; ?>">
          <td><?php echo $u; ?></td>
          <td><?php echo $languages[$i]; ?></td>
            <td align="right" >
            <span class="mylink">
            <a href="<?php echo base_url().'sadmin/open_feilds_lang?title='.$languages[$i] ?>" id="open_feilds_lang"><span>Update</span></a>
            </span>
             <span class="mylink">
            <a href="#" onclick="remove_language(<?php echo $i; ?>,'<?php echo $languages[$i]; ?>')" ><span>Remove</span></a>
            </span>
              <!--<button class="radius2" type="button" onclick="open_feildslang(<?php //echo $i; ?>)"><?php //echo $languages[$i]; ?></button>-->
              <input type="hidden" name="abc" id="lang_titlee<?php echo $i; ?>" value="<?php echo $languages[$i]; ?>" /></td>
              <!--<td></td>-->
          </tr>
          <?php $u++;}  ?> 
           <input type="hidden" id="row_id"  value="<?php echo $u; ?>" />
          <tr id="add_new_lang">
            
          </tr>
      </table>
      <div id="display_list_lang">
        <table style="width:100% !important" class="table-striped border-simple" cellpadding="2" colspan="5">
        </table>
      </div>
    </form>
  </div>
  <div class="mainright">
    <div class="mainrightinner">
      <form id="language_form" name="lang_form" class="stdform"   >
        <div class="widgetbox" style="width: 300px">
          <div class="title">
            <h2 class="general"><span>Add new Language</span></h2>
          </div>
          <div class="widgetcontent stdform stdformwidget">
            <div class="par">
              <label>Name</label>
              <div class="field">
                <input type="text" id="add_lang" name="add_lang"  />
              
              </div>
            </div>
            <!--par-->
            <div class="par">
              <div class="field">
                <button class="radius2" type="button" id="add_language">Add Language</button>
                 
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
