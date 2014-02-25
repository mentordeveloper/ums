// JavaScript Document

///jquery form fast validation
	
$(document).ready(function(){
	
	$("#send_email_2").fancybox();	
	
});

function send_email_me()
	{
	
	$.ajax({
             url: $('#base_url').val()+"login/send_email",
                type: "post",
                context: document.body,
                cache: true,
                success: function(data){												

                                        $('#fancybox-content').html(data);
                                       // $("#email_thanks").fancybox().trigger('click');

                                        setTimeout(function() {
                                                $.fancybox.close();
                                        }, 1300);

                        }
});
	
	}
	

		$('#send_email').click(function(){
	
								$.ajax({
									//url: $('#base_url').val()+"survey/email_thanks",
                                                                        url: $('#base_url').val()+"login/send_email",
									type: "GET",
									context: document.body,
									data : "user_name="+$('#user_name').val()+"&message_user="+$('#text_send').val(),
									cache: false,
									success: function(data){												
											
											$('#inline1_email12').html(data);
											$("#email_thanks").fancybox().trigger('click');
							
										}
								});	
});


function clear_filter()
{
	
								$.ajax({
									url: $('#base_url').val()+"/sadmin/clear_filter",
									type: "GET",
									context: document.body,
									cache: false,
									success: function(data){												
											
											window.location = $('#base_url').val()+'sadmin/mng_surveys';
							
										}
								});	
	
}

function add_filter()
{
	
	
							$.ajax({
									url: $('#base_url').val()+"/sadmin/add_filter",
									type: "GET",
									context: document.body,
									data : "question="+$("#questions_all_check option:selected").val()+"&field="+$("#valuefilter").val(),
									cache: false,
									success: function(data){												
											
											window.location = $('#base_url').val()+'sadmin/mng_surveys';
											
							
										}
								});	
	
}

$(function() {
	
	if($("#role_in_school option:selected").val()!="other")
		{
			$('#other_role').hide();
		}
		
		if($("#role_in_school option:selected").val()=="other")
		{
			$('#other_role').show();	
		}
			
$('#role_in_school').change(function(){

		if($(this).val()!="other")
		{
			$('#other_role').hide();
		}
		
		if($(this).val()=="other")
		{
			$('#other_role').show();	
		}
		
		
	});
});

$(function() {
	
	$('#yes_smartphone').hide();
	$('#no_smartphone').hide();
	$('.yes_website').hide();
	$('.yes_app').hide();
	
	
	
	$("input:radio[name=own_smartphone]").click(function() {
    	var value = $(this).val();
		
		if(value=='yes')
		{
			
			$('#yes_smartphone').show();
			$('#no_smartphone').hide();
					
		}
		if(value=='no')
		{
			
			$('#yes_smartphone').hide();
			$('#no_smartphone').show();
			
		}
		
	});
	
	
	$("input:radio[name=school_website]").click(function() {
    	var value = $(this).val();
		
		if(value=='yes')
		{
			$('.yes_website').show();	
		}
		if(value=='no')
		{	
			$('.yes_website').hide();	
		}
		
	});
	
	
	$("input:radio[name=have_mobile_app]").click(function() {
    	var value = $(this).val();
		
		if(value=='yes')
		{
			$('.yes_app').show();	
		}
		if(value=='no')
		{	
			$('.yes_app').hide();	
		}
		
	});
	
	
	
	

});

$(function(){	
				
		$("a#ajax_call_information").fancybox(
				{
					'scrolling' : 'auto',
					'centerOnScroll' : true
				}
		);
	
});

function remove_this_info(id,field_name)
{
	
							$.ajax({
									url: $('#base_url').val()+"/sadmin/remove_demanded_field",
									type: "GET",
									context: document.body,
									data : "id="+id+"&field="+field_name,
									cache: false,
									success: function(data){												
											
											$('#row_'+id).remove();
							
										}
								});	
	
		
}



$(function() {
	
	
			$('#questions_all').change(function(){
					
							$.ajax({
									url: $('#base_url').val()+"sadmin/survey_get_demanded",
									type: "GET",
									context: document.body,
									data : "searching="+$(this).val(),
									cache: false,
									success: function(data){												
											
										
											$('#clear_all').html(data);
												
							
										}
								});		
					
			});
				

});

(function($,W,D)
{
    var JQUERY4U = {};

    JQUERY4U.UTIL =
    {
        setupFormValidation: function()
        {
            //form validation rules
            $("#survey_check").validate({
                rules: {
                    role_in_school: "required",
					other_role_school: "required",
					
                    level_of_school: "required",
                    school_zip_code: "required",
                   	own_smartphone: "required",
					own_smartphone_option : "required", 
					own_smartphone_no_option : "required",
					school_website : "required",
					have_mobile_app : "required",
					
                },
                messages: {
                    role_in_school: "Please select your role in school",
					other_role_school: "Please type role in school",
                    level_of_school: "Please select your level of school",
                    school_zip_code: "Please enter your school zip code",
                    own_smartphone: "Do you own a smartphone",
					own_smartphone_option : "Please choose devices you own!", 
					own_smartphone_no_option : "Please select your option",
					school_website : "Does your school have a website?",
					have_mobile_app : "Does your school have a mobile app?",
					
                },
                submitHandler: function(form) {
                    form.submit();
                },
				highlight : function(element) { // hightlight
											// error
											// inputs
											$(element)
													.closest('.control-group')
													.addClass('error'); // set
											// error
											// class
											// to
											// the
											// control
											// group
										},
										success : function(label) {
											label.closest('.control-group')
											.removeClass('error');
											label.remove();
										},
										errorPlacement : function(error,
												element) {
											error
													.addClass('help-inline')
													.insertAfter(
															element
																	.closest('.controls'));
										},
            });
        }
    }

    //when the dom has loaded setup form validation rules
    $(D).ready(function($) {
        JQUERY4U.UTIL.setupFormValidation();
    });

})(jQuery, window, document);
		


