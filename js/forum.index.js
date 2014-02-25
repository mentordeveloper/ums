$(document).ready(function(){
    //var get_length=$('#page_editor').val().length;
	$("#popup_form").fancybox();
	$("#gur").fancybox();
	
		CKEDITOR.replace( 'page_editor',
                {
                    filebrowserBrowseUrl :$('#base_url').val()+'files/filemanager_in_ckeditor/js/ckeditor/filemanager/browser/default/browser.html?Connector=http://kodemaster.co.cc/filemanager_in_ckeditor/js/ckeditor/filemanager/connectors/php/connector.php',
                    filebrowserImageBrowseUrl : $('#base_url').val()+'files/filemanager_in_ckeditor/js/ckeditor/filemanager/browser/default/browser.html?Type=Image&Connector=http://kodemaster.co.cc/filemanager_in_ckeditor/js/ckeditor/filemanager/connectors/php/connector.php',
                    filebrowserFlashBrowseUrl :$('#base_url').val()+'files/filemanager_in_ckeditor/js/ckeditor/filemanager/browser/default/browser.html?Type=Flash&Connector=http://kodemaster.co.cc/filemanager_in_ckeditor/js/ckeditor/filemanager/connectors/php/connector.php',
					filebrowserUploadUrl  :$('#base_url').val()+'files/filemanager_in_ckeditor/js/ckeditor/filemanager/connectors/php/upload.php?Type=File',
					filebrowserImageUploadUrl :$('#base_url').val()+'files/filemanager_in_ckeditor/js/ckeditor/filemanager/connectors/php/upload.php?Type=Image',
					filebrowserFlashUploadUrl : $('#base_url').val()+'files/filemanager_in_ckeditor/js	/ckeditor/filemanager/connectors/php/upload.php?Type=Flash',
					height : 150
				});	
			
});

function validate_length()
{


	var get_length=$('#page_editor').val().length;
	
	if(get_length>980){
		alert(get_length);
		return false;
	}else{
		alert(get_length);
		return false;
	}


}
function createform()
{
 
	if($('#formtitle').val()=='')
			{
				$('#mygur').html('<span class="alert alert-error">Please Enter Title!</span>').show().delay(1800).slideUp(2000);
				return;
				
			}else{
				
	     						var title=$('#formtitle').val();
								
								$.ajax({
											
													url: $('#base_url').val()+"forum/createnewforum",
													type: "GET",
													context: document.body,
													data : "title="+title,
													cache: false,
													success: function(data){												
														
															//window.location.href = $('#base_url').val()+"forum/";
																																
														}
											});	
											
								
	}
}

function createformadmin()
{
 
	if($('#formtitle').val()=='')
			{
				$('#mygur').html('<span class="alert alert-error">Please Enter Title!</span>').show().delay(1800).slideUp(2000);
				return;
			}else{
				
	     var title=$('#formtitle').val();
								$.ajax({
											
													url: $('#base_url').val()+"forum/createnewforum",
													type: "GET",
													context: document.body,
													data : "title="+title,
													cache: false,
													success: function(data){												
														
															window.location.href = $('#base_url').val()+"forum/";
																																
														}
														
											});	
											
								
	}
}

function createthreadd ()
{
  
	if($('#formmytitle').val()=='' )
			{
				$('#mygur1').html('<span class="alert alert-error">Please Enter Title!</span>').show().delay(1800).slideUp(2000);
				return false;
			}	
	
}

function createthreaddadmin ()
{
  
	if($('#formmytitle').val()=='' )
			{
				$('#mygur1').html('<span class="alert alert-error">Please Enter Title!</span>').show().delay(1800).slideUp(2000);
				return false;
			}	
	
}