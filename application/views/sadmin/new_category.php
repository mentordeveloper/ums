 <script type="text/javascript">

//alert('sdsd');	
	$('#add_cat').click(function(){
			
			var myresult = $("#category_form").validate({
										rules: {
											cat_name: "required",

										},
										messages: {
											cat_name:"Please Enter Name",
											
										}
			}).form();		
			
			if(myresult){
				save_category_new();
			}
				
		});					
			
</script>
 
 <form id="category_form" class="stdform">
 <div class="content_cat">
 <div><h3>Add New Category</h3></div>
 <table cellpadding="0" cellspacing="0" border="0" class="stdtable" id="dyntable">


	<tr>
      <td colspan="2"><strong>Name</strong></td>
	  <td colspan="2"><input name="cat_name" id="cat_name" class="m-wrap" width="70"/></td>
    </tr>
	<tr>
		<td colspan="2"></td>
		<td colspan="2" align="right"><button class="radius2" type="button" id="add_cat">Add</button></td>
    </tr>
	</table>
	</form>
	<form class="stdform">
	 <table cellpadding="0" cellspacing="0" border="0" class="stdtable" id="dyntable">
      <colgroup>
      <col class="con0" />
      <col class="con1" />
      </colgroup>
      <thead>
        <tr>
          <th class="head0">Name</th>
          <th class="head1">Actions</th>
        </tr>
      </thead>
      <tfoot>
        <tr>
          <th class="head0">Name</th>
          <th class="head1">Actions</th>
        </tr>
      </tfoot>
      <tbody>
        <?php  foreach($categories as $counter=>$percat)  
  		{
	   ?>
        <tr class="gradeX" id="row_<?php echo $percat['id']; ?>">
          <input type="hidden" id="cat_name_show" value="<?php echo $percat['id']; ?>"/>
          <td ><strong><?php echo $percat['name']; ?></strong></td>
 
          <td align="right">
             
              <button class="radius2" type="button" onClick="remove_cat(<?php echo $percat['id']; ?>,'<?php echo $percat['name']; ?>')">Remove</button>
            </td>
        </tr>
        <?php } ?>
      </tbody>
    </table>
	</form>