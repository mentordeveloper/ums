// JavaScript Document
// code compiled on 1-22-2014 by zain

$(document).ready(function(){
	$('#btn_save').hide();	
	$("#templating_checker").change(function() {         
		trigger_ajax();
	});
	trigger_ajax();
});


function trigger_ajax(){
	
		var selection_temp = $('#templating_checker option:selected').val();
		
		if(selection_temp != ""){
			$.ajax({
				url: $('#base_url').val()+"sadmin/e_templating/",
				type: "GET",
				data: 'query='+selection_temp,
				context: document.body,
				cache: false,
				success: function(data) {
					var obj = JSON.parse(data);
					$('#email_subject').val(obj['e_subject']);
					var final_string = '';
					var obj_js = JSON.parse(obj['e_tags']);
					
					for(j=0;j<=obj_js.length;j++){
						final_string += '<div style="border:2px solid #666;float:left;padding:5px;margin:5px;">'+obj_js[j]+'</div>';
					}
					
					$('#tags_email').html(final_string);
					CKEDITOR.instances['page_editor'].setData(obj['e_text']);
					$('#btn_save').show();	
				}	
			});
		
		}else{
			
			$('#email_subject').val('');	
			CKEDITOR.instances['page_editor'].setData('');
			$('#btn_save').hide();	
			
		}	
}
