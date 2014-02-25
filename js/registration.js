
$(document).ready(function() {

    $("a#contact_us").fancybox();

});

jQuery.validator.addMethod("noSpace", function(value, element) {
    return value.indexOf(" ") < 0 && value != "";
}, "No space please and don't leave it empty");

jQuery.validator.addMethod("lettersonly", function(value, element) {
    return this.optional(element) || /^[a-z0-9]+$/i.test(value);
}, "Please enter only letters or numbers");

jQuery.validator.addMethod("lettersonlys", function(value, element) {
    return this.optional(element) || /^[a-z 0-9]+$/i.test(value);
}, "Please enter letters/numbers/spaces allowed");

function validate_form() {

    var myresult = $("#school_form").validate({
        rules: {
            school_name: {
                required: true,
				lettersonlys: true,
            },
            sub_dname: {
                required: true,
                noSpace: true,
                lettersonly: true,
            },
            school_username: {
                noSpace: true,
                required: true,
            },
            school_password: {
                noSpace: true,
                required: true,
                minlength: 5,
            },
            school_email: {
                required: true,
                email: true,
            },
            role: {
                required: true,
            },
        },
        messages: {
            school_name: {required: "Please enter School Name",
            },
            sub_dname: {
                required: "Please enter Subdomain Name",
                noSpace: "There should be no space",
                lettersonly: "Please enter only letters or numbers",
            },
            school_username: "Please enter valid School User Name",
            school_password: {
                required: "Please provide valid Password",
                minlength: "Should be more than 4 characters",
            },
            school_email: {
                required: "Please enter Email Address",
                email: "Please enter valid Email Address",
            },
            role: {
                required: "Please select School type",
            },
        },
        highlight: function(element) { // hightlight

            $(element).closest('.control-group').addClass('error');

        },
        success: function(label) {

            label.closest('.control-group').removeClass('error');
            label.remove();
        },
        errorPlacement: function(error, element) {
            error.addClass('help-inline').insertAfter(element.closest('.controls'));
        },
    }).form();

    if (myresult) {
        add_school_call_registration();
    }

}

/*
 * Search School function
 * 
 * 
 */

$(document).ready(function() {
    $("#search_school_email").keydown(function(e) {
        if (e.keyCode == 13) {
            //validate_form_search();
            //alert("");
            var school_val = $("#search_school_email").val();
            school_val = school_val.trim();
            if(school_val!=''){
                $('#school_error').fadeOut("Fast");
                $(this).parents('table').find(".control-group").removeClass("error");
                 $('.alert').remove();

                var email = $('#search_school_email').val();

                $.ajax({
                    url: $('#base_url').val() + "sadmin/search_school_on_request/",
                    type: "POST",
                    context: document.body,
                    data: {
                        school_search_email: $('#search_school_email').val(),
                    },
                    cache: false,
                    success: function(data) {

                        $('#top-news1').append(data);

                    }
                });
            }
            else{
                $(this).parents('table').find(".control-group").addClass("error");
                $('#school_error').fadeIn("Fast");
                return false;
            }
        }
    });
    
    $("#search_school_email").keypress(function(e) {
       var school_val = $("#search_school_email").val();
    school_val = school_val.trim();
           if($('#school_error').css("display")=='inline-block' && school_val!=''){
                $('#school_error').fadeOut("Fast").css("display","none");
                $(this).parents('table').find(".control-group").removeClass("error");
           }
           
    });
});
function validate_form_search()
{

    var school_val = $("#search_school_email").val();
    school_val = school_val.trim();
    if(school_val!=''){
        $('#school_error').fadeOut("Fast").css("color","#595959");
        $("#search_school_email").parents('table').find(".control-group").removeClass("error");
         $('.alert').remove();

        var email = $('#search_school_email').val();

        $.ajax({
            url: $('#base_url').val() + "sadmin/search_school_on_request/",
            type: "POST",
            context: document.body,
            data: {
                school_search_email: $('#search_school_email').val(),
            },
            cache: false,
            success: function(data) {

                $('#top-news1').append(data);

            }
        });
    }
    else{
        $("#search_school_email").parents('table').find(".control-group").addClass("error");
        $('#school_error').fadeIn("Fast").css("color","#B94A48");
        return false;
    }

}
function validate_form_search_old()
{

    var myresult = $("#school_form_search").validate({
        rules: {
            search_school_email: {
                required: true,
            },
        },
        messages: {
            search_school_email: {
                required: "Please Enter School Name",
                email: "Please Enter Valid School Name"
            },
        },
        highlight: function(element) { // hightlight

            $(element)
                    .closest('.control-group')
                    .addClass('error'); // set

        },
        success: function(label) {
            label.closest('.control-group')
                    .removeClass('error');
            label.remove();
        },
        errorPlacement: function(error,
                element) {
            error.addClass('help-inline').insertAfter(element.closest('.controls'));
        },
    }).form();

    if (myresult) {
        search_school_on_request();
    }

}

/*
 * Search school on request
 */

function search_school_on_request()
{

    $('.alert').remove();

    var email = $('#search_school_email').val();

    $.ajax({
        url: $('#base_url').val() + "sadmin/search_school_on_request/",
        type: "POST",
        context: document.body,
        data: {
            school_search_email: $('#search_school_email').val(),
        },
        cache: false,
        success: function(data) {

            $('#top-news1').append(data);

        }
    });

}

function add_school_call_registration()
{
	
	
	
    $('#go-back').hide();
    $('.alert-error').remove();

    if ($('#tos').is(':checked') == false){

        $('.top-news').append('<div class="alert alert-error"><button data-dismiss="alert" class="close"></button><strong>Error!</strong> Please agree to the terms of service. </div>');
		
        return;
    }

    $.ajax({
        url: $('#base_url').val() + "sadmin/register_check_duplicate/",
        type: "POST",
        context: document.body,
        data: {
            name: $('#school_name').val(),
            username: $('#school_username').val(),
            domainname: $('#sub_dname').val(),
            school_email: $('#school_email').val(),
        },
        cache: false,
        success: function(data) {

            var obj = JSON.parse(data);

            if (obj['value'] == 1){

                $('#top-news2').append('<div class="alert alert-error"><button data-dismiss="alert" class="close"></button>									<strong>Error!</strong> ' + obj['reason_value'] + ' ' + obj['reason'] + ' Already Exists. Choose Another! </div>');
				
				
				
                return;

            }

            if (obj['value'] == 0){
				
				$('#msg_user').html('<div class="alert alert-success" style="margin-bottom:0px;width:200px;"><button data-dismiss="alert" class="close"></button>Please wait..... </div>');
	
			    $("#global_use_msg").fancybox().trigger('click');
				
                var name = $('#school_name').val();
                var status = $('#status_school').is(':checked');
                var school_username = $('#school_username').val();
                var school_domain = $('#sub_dname').val();
                var school_password = $('#school_password').val();
                var s_type = $('#role_selection :selected').val();
                var email = $('#school_email').val();

                $.ajax({
                    url: $('#base_url').val() + "sadmin/save_schoolname",
                    type: "POST",
                    context: document.body,
                    data: {
                        name: name,
                        status: status,
                        school_username: school_username,
                        school_password: school_password,
                        school_subdomain: school_domain,
                        s_type: s_type,
                        email: email,
                    },
                    cache: false,
                    success: function(data) {

                        if (data == 'false')
                        {
                            $('#school').html('<span class="error" style="padding:0 20px;">Some problem saving record please try again!</span>');
							$.fancybox.close();
                            return false;
                        }
                        else
                        {

                            /*
                             * if everything is gone fine then
                             */

                            $.ajax({
                                url: $('#base_url').val() + "sadmin/complete_display_school_info/",
                                type: "POST",
                                context: document.body,
                                data: {
                                    sub_dname: $('#sub_dname').val(),
                                },
                                cache: false,
                                success: function(data) {

                                    $('#news_block2').slideUp('slow', function() {

                                        $('#top-news2').append(data).slideDown('slow');
										$.fancybox.close();	
                                    });
                                }

                            });

                        }

                    }

                });

            }

        }


    });


}
