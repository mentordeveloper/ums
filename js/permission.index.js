var add_releas = 0;
$(document).on("click", "#released_persons", function() {
    $.ajax({
        url: $('#base_url').val() + "search_released_students",
        type: "GET",
        context: document.body,
        cache: false,
        success: function(data) {

            $('#list_pop_types').html(data);
            $("#events_type_list").fancybox().trigger('click');
        }

    });
    $("#fancybox-close").click(function() {
        if (add_releas == 1) {
            location.reload();
        }
    });



});
$(document).on("click", "#fancybox-overlay", function() {
    if (add_releas == 1) {
        location.reload();
    }
});

$(document)
        .ready(
        function() {
    
        
   
 
    
    $("#add_new_child").fancybox({
        'height': '437',
        'transitionIn': 'fadein',
        'transitionOut': 'fadeout',
        onClosed: function() {
            //make ajax call to get all questions of that id and list on page
            var temp_id = $('#tmp_q_id').val();
            get_all_child(temp_id);
        }
    });
    

$("a#add_role_new").fancybox({'showNavArrows' :   false});
            $('#divId').toggle(function(event) {
                $(this).find('input').attr('checked', true);
            }, function(event) {
                $(this).find('input').attr('checked', false);
            });

            $('.theme').hide();

            $('.content .msgsuccess').slideUp(15000);
            $('.content .msgerror');

            jQuery.validator.addMethod("checkspaces", function(value,
                    element) {

                var str = $('value').val();
                var regex = /[^\s]/gi;

                return regex.test(str);

            }, "Should be no space in user name");


//$("#add_user").on("submit",function(){
            var myresult_user = $("#add_user")
                    .validate(
                    {
                        rules: {
                            lg_fname: "required",
                            lg_lname: "required",
                            lg_username: {
                                required: true,
                                checkspaces: true,
                            },
                            lg_password: {
                                required: true,
                                minlength: 5,
                            },
                            lg_email: {
                                required: true,
                                email: true,
                            },
                            pr_name: {
                                required: false,
                            },
//                            pr_email: {
//                                required: false,
//                                email: true,
//                            },
                            role: {
                                required: true,
                            },
                        },
                        messages: {
                            lg_fname: "Please enter first name",
                            lg_lname: "Please enter last name",
                            lg_username: {
                                required: "Please enter Username",
                            },
                            lg_password: {
                                required: "Please provide password",
                                minlength: "Should be more than 4 characters",
                            },
                            lg_email: {
                                required: "Please enter email address",
                                email: "Please enter valid email address",
                            },
                            pr_name: {
                                required: "Please enter Parent Full name",
                            },
//                            pr_email: {
//                                required: "Please enter Parent email address",
//                                email: "Please enter valid email address",
//                            },
                            role: {
                                required: "Please select role"
                            },
                        },
                        highlight: function(element) { // hightlight
                            // error
                            // inputs
                            $(element)
                                    .closest('.control-group')
                                    .addClass('error'); // set error class to the control group
                        },
                        success: function(label) {
                            label.closest('.control-group')
                                    .removeClass('error');
                            label.remove();

                        },
                        errorPlacement: function(error,
                                element) {
                            error
                                    .addClass('help-inline')
                                    .insertAfter(
                                    element
                                    .closest('.controls'));
                        },
                    });
            if (myresult_user) {
                var is_self_register = $("#self_user_registration").val();
                if (is_self_register != 10) {
                    $("#add_user").ajaxForm({
                        beforeSubmit: function() {
                        },
                        errorMessageTarget: "#error_msg_user",
                        success: function(msg) {
                            var data = msg.split("#2nd#");
                            $('html, body').animate({scrollTop: $('.page-content').position().top}, 'fast');

                            if (data[0] == 2) {
                                $("#error_msg_user").html(data[1]);
                                $("#msg_added_1").css("display", "none");
                                $("#error_msg_user_1").fadeIn("Fast").delay(41522); //.fadeOut("fast")
                            }
                            if (data[0] == 1) {
                                $("#msg_added").html(data[1]);
                                $("#error_msg_user_1").css("display", "none");
                                $("#msg_added_1").fadeIn("Fast").show(); //.fadeOut("fast")
                                $("#add_user").get(0).reset();
                            }

                        }
                    });
                }
            }
//});
            $("#resetform").validate({
                rules: {
                    uname: "required",
                    n_pwd: {
                        required: true,
                        minlength: 4,
                    },
                    c_pwd: {
                        required: true,
                        minlength: 4,
                        equalTo: '#n_pwd'
                    },
                },
                messages: {
                    uname: "Please enter your User Name",
                    n_pwd: {
                        required: "Please enter New Password",
                        minlength: "Should be more than 4 characters",
                    },
                    c_pwd: {
                        required: "Please Confirm  Password",
                        minlength: "Should be more than 4 characters",
                        equalTo: "doesnot match with New Passwords"
                    },
                }
            });
            $(".password-container")
                    .validate(
                    {
                        rules: {
                            uname: "required",
                            n_pwd: {
                                required: true,
                            },
                            c_pwd: {
                                required: true,
                                equalTo: '#n_pwd'
                            },
                        },
                        messages: {
                            uname: "Please enter your User Name",
                            n_pwd: {
                                required: "Please enter New Password",
                            },
                            c_pwd: {
                                required: "Please Confirm  Password",
                                equalTo: "doesnot match with New Passwords"
                            },
                        },
                        highlight: function(element) { // hightlight
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
                        success: function(label) {
                            label.closest('.control-group')
                                    .removeClass('error');
                            label.remove();
                        },
                        errorPlacement: function(error,
                                element) {
                            error
                                    .addClass('help-inline')
                                    .insertAfter(
                                    element
                                    .closest('.controls'));
                        },
                    });
            $("#update_user").validate({
                rules: {
                    lg_fname: "required",
                    lg_lname: "required",
                    lg_username: "required",
                    pr_name: {
                        required: false,
                    },
//                    pr_email: {
//                        required: false,
//                        email: true,
//                    },
                    role: {
                        required: true,
                    },
                },
                messages: {
                    lg_fname: "Please enter Firstname",
                    lg_lname: "Please enter Lastname",
                    lg_username: "Please enter Username",
                    pr_name: "Please enter Parent Full Name",
//                    pr_email: "Please enter Parent Email",
                    role: {
                        required: "Please select Role"
                    },
                }
            });

            $("#timezine option[value=" + $('#tm_zone').val() + "]")
                    .prop('selected', true);





            $("#lg_username").focus(
                    function() {

                        var final_username = $('#lg_fname').val() + '.'
                                + $('#lg_lname').val();
                        $("#lg_username").val(final_username);

                    });

            $('#myTab a').click(function(e) {
                $(this).tab('show');
            });

            $(
                    "#languagesetting option[value="
                    + $('#langsel').val() + "]").prop(
                    'selected', true);

            $('#o_password').focus(function() {
                $('#o_password_error').html('');
            });

            $('#update_password')
                    .click(
                    function() {

                        var myresult = $(
                                "#password_update_perm_form")
                                .validate(
                                {
                                    rules: {
                                        old_password: {
                                            required: true,
                                            remote: $(
                                                    '#base_url')
                                                    .val()
                                                    + "permissions/check_old_password"
                                        },
                                        new_password: {
                                            required: true,
                                        },
                                        con_password: {
                                            required: true,
                                            equalTo: '#new_password'
                                        },
                                    },
                                    messages: {
                                        old_password: {
                                            required: "Please enter old password",
                                            remote: "Incorrect old password",
                                        },
                                        new_password: {
                                            required: "Please enter new password",
                                        },
                                        con_password: {
                                            required: "Please confirm  password",
                                            equalTo: "Passwords do not match"
                                        },
                                    },
                                    highlight: function(
                                            element) {
                                        $(element)
                                                .closest(
                                                '.control-group')
                                                .addClass(
                                                'error');
                                        $(element)
                                                .closest(
                                                '.control-group')
                                                .addClass(
                                                'red');
                                    },
                                    success: function(
                                            label) {
                                        label
                                                .closest(
                                                '.control-group')
                                                .removeClass(
                                                'error');
                                        label.remove();
                                    },
                                    errorPlacement: function(
                                            error,
                                            element) {
                                        error
                                                .addClass(
                                                'help-inline')
                                                .insertAfter(
                                                element
                                                .closest('.controls'));
                                    },
                                }).form();

                        if (myresult) {
                            update_perm_password();
                        }

                    });

        });
function validate_self_reg() {


    var myresult_user = $("#add_user")
            .validate(
            {
                rules: {
                    lg_fname: "required",
                    lg_lname: "required",
                    lg_username: {
                        required: true,
                        checkspaces: true,
                    },
                    lg_password: {
                        required: true,
                        minlength: 5,
                    },
                    lg_email: {
                        required: true,
                        email: true,
                    },
                    pr_name: {
                        required: false,
                    },
//                    pr_email: {
//                        required: true,
//                        email: true,
//                    },
                    role: {
                        required: true,
                    },
                },
                messages: {
                    lg_fname: "Please enter first name",
                    lg_lname: "Please enter last name",
                    lg_username: {
                        required: "Please enter Username",
                    },
                    lg_password: {
                        required: "Please provide password",
                        minlength: "Should be more than 4 characters",
                    },
                    lg_email: {
                        required: "Please enter email address",
                        email: "Please enter valid email address",
                    },
//                    pr_name: {
//                        required: "Please enter Parent Full name",
//                    },
//                    pr_email: {
//                        required: "Please enter Parent email address",
//                        email: "Please enter valid email address",
//                    },
                    role: {
                        required: "Please select role"
                    },
                },
                highlight: function(element) { // hightlight
                    // error
                    // inputs
                    $(element)
                            .closest('.control-group')
                            .addClass('error'); // set error class to the control group
                },
                success: function(label) {
                    label.closest('.control-group')
                            .removeClass('error');
                    label.remove();

                },
                errorPlacement: function(error,
                        element) {

                    error
                            .addClass('help-inline')
                            .insertAfter(
                            element
                            .closest('.controls'));
                },
            }).form();


    if (myresult_user)
    {
        return true;
    }

    return false;
}
$(function() {

    // /new event type working
    $("#searching").keyup(function() {
        $.ajax({
            url: $('#base_url').val() + "permissions/users_html_search/",
            type: "GET",
            data: 'query=' + $('#searching').val(),
            context: document.body,
            cache: false,
            success: function(data) {
                $('#new_searcher').html(data);
            }

        });
    });

    $("#role_selection")
            .change(
            function() {
                $('#user_access_role').val('');
                $('#strong_pass').html('');
                $('#interface_update').html('<center><span class="error">Please Wait Loading ....</span></center>');
				$('#role_selection').attr('disabled',true);
                // check is role has permission of strong password
                $.ajax({
                    url: $('#base_url').val()
                            + "permissions/check_if_permissions/",
                    type: "GET",
                    data: 'query='
                            + $('#role_selection :selected').val(),
                    context: document.body,
                    async:false,
                    cache: false,
                    success: function(data) {
                        var arr = data.split("@#2nd#@");
                        if (arr[0] != 1) {
                            $('#strong_pass').html(arr[0]);
                        }
                        $('#user_access_role').val(arr[1]);
                    }

                });
                var str_txt = $('#user_access_role').val();
                if(str_txt==2){
                    $("#grade_tr").slideUp('fast');
                    $("#section_tr").slideUp('fast');
                }else{
                    $("#grade_tr").slideDown('fast');
                    $("#section_tr").slideDown('fast');
                }

                $.ajax({
                    url: $('#base_url').val()
                            + "permissions/realtions_html_search/",
                    type: "GET",
                    async:false,
                    data: 'query='
                            + $('#role_selection :selected').val()
                            + '&value_text='
                            + $('#role_selection :selected').text()
                            + '&grade_id='
                            + $('#grade_name :selected').val()
                            + '&section_id='
                            + $('#section_name :selected').val(),
                    context: document.body,
                    cache: false,
                    success: function(data) {
                        $('#interface_update').html(data);
						$('#role_selection').attr('disabled',false);
                    }
                });
            });
});

function update_notifcation() {

    $.ajax({
        url: $('#base_url').val() + "permissions/update_mynotifcation/",
        type: "GET",
        context: document.body,
        cache: false,
        success: function(data) {

            return data;
        }
    });
}

function save_color_settings() {

    $('#show_msg1')
            .html('');
    $.ajax({
        url: $('#base_url').val() + "permissions/save_settings_color/",
        type: "POST",
        context: document.body,
        data: {c_color_id: $('#c_color_id').val()},
        cache: false,
        success: function(data) {
            if (data == 1)
            {
                $('#show_msg1').html('<div class="alert alert-success"><button data-dismiss="alert" class="close"></button><strong>success!</strong> Successfully Updated.</div>');
                $('#show_msg1').slideDown('slow', function() {
                    $('#show_msg1').delay(1800).slideUp(2000);
                });

            }
            else
            {
                $('#show_msg1').html('<div class="portlet box green" style="margin:0px !important;"> <div class="portlet-title"><div class="caption"><i class="icon-cogs"></i>Groups list</div>				  </div> <div class="portlet-body"><div class="alert alert-error"><button data-dismiss="alert" class="close"></button><strong>Error!</strong> Not Updated.</div>');
                $('#show_msg1').slideDown('slow', function() {
                    $('#show_msg1').delay(1800).slideUp(2000);
                });


            }
        }
    });
}
function Save_timezone() {
    $('#show_msg')
            .html('');
    $
            .ajax({
        url: $('#base_url').val() + "permissions/save_time_zone/",
        type: "GET",
        data: "id=" + $('#timezine').val(),
        context: document.body,
        cache: false,
        success: function(data) {


            $('#show_msg').html('<div class="alert alert-success"><button data-dismiss="alert" class="close"></button><strong>Success!</strong> Successfully Updated.</div>');
            $('#show_msg').slideDown('slow', function() {
                $('#show_msg').delay(1800).slideUp(2000);
            });

        }
    });
}

function save_language() {

    $('#show_error')
            .html('');

    $
            .ajax({
        url: $('#base_url').val() + "permissions/save_language/",
        type: "GET",
        data: "lang=" + $('#languagesetting').val(),
        context: document.body,
        cache: false,
        success: function(data) {

            $('#show_error').html('<div class="alert alert-success"><button data-dismiss="alert" class="close"></button><strong>Success!</strong> Successfully Updated.</div>');
            $('#show_error').slideDown('slow', function() {
                $('#show_error').delay(1800).slideUp(2000);
            });

        }
    });

}

function get_all_notific() {

    $.ajax({
        url: $('#base_url').val() + "permissions/get_all_per_notif/",
        type: "GET",
        context: document.body,
        cache: false,
        success: function(data) {

            $('#viewall').hide();
            $('#firstoptions').hide();
            $('#showall').html(data);
        }
    });

}

function delet_notifcation(id) {

    $.ajax({
        url: $('#base_url').val() + "permissions/remove_selected_notif/",
        type: "GET",
        data: "id=" + id,
        context: document.body,
        cache: false,
        success: function(data) {

            $('#notif_' + id).hide();
        }
    });

}

function welcomeupdate() {

    $('#display')
            .html('');
    $
            .ajax({
        url: $('#base_url').val()
                + "permissions/update_welcomemessage",
        type: "GET",
        context: document.body,
        data: "message=" + $("#welcome").val() + "&subline="
                + $("#subline").val(),
        cache: false,
        success: function(data) {
            $('#display').html('<div class="alert alert-success"><button data-dismiss="alert" class="close"></button><strong>success!</strong> Successfully Updated.</div>');
            $(display).slideDown('slow', function() {
                $('#display').delay(1800).slideUp(2000);
            });
        }
    });

}
function remove_text() {

    if ($("#search_course").val() == 'Instant Search') {
        $("#search_course").val('');
    }

}

function get_studends_query() {

    var error = '';

    if ($('#option_search :selected').val() == 'none') {
        error += 'Please select your search type <br/>';
    }

    if ($('#option_string_search').val() == '') {
        error += 'Please enter your ID / NAME';
    }

    $('#error_string').html(error);

    if (error == '') {

        // /searching call for search student that has been released

        $.ajax({
            url: $('#base_url').val() + "permissions/search_user_released",
            type: "GET",
            context: document.body,
            data: "searchby=" + $('#option_search :selected').val()
                    + "&search_string=" + $('#option_string_search').val(),
            cache: false,
            success: function(data) {

                $('#search_data').html(data);

            }
        });

    }

}

function add_released_new_school(id) {

    $
            .ajax({
        url: $('#base_url').val() + "permissions/add_released_user",
        type: "GET",
        context: document.body,
        data: "id_user=" + id,
        cache: false,
        success: function(data) {

            if (data) {

                $('#search_data')
                        .html(
                        '<div class="alert alert-success"><button data-dismiss="alert" class="close"></button><strong>Success!</strong> User Successfully added </div>');
                add_releas = 1;
            }

        }
    });

}

function search_courses_2nd_reports(id) {

    var search_stirng = $('#search_course').val();

    var value_id = $('#id_user').val();
    $.ajax({
        url: $('#base_url').val() + "permissions/search_courseui2_reports",
        type: "GET",
        context: document.body,
        data: "search_stirng=" + search_stirng + "&id_user=" + value_id,
        cache: false,
        success: function(data) {

            $('#new_data').html(data);
        }

    });

}

function search_courses_2nd(id) {

    var search_stirng = $('#search_course').val();

    var value_id = $('#id_user').val();
    $.ajax({
        url: $('#base_url').val() + "permissions/search_courseui2",
        type: "GET",
        context: document.body,
        data: "search_stirng=" + search_stirng + "&id_user=" + value_id,
        cache: false,
        success: function(data) {

            $('#new_data').html(data);
        }

    });

}

function search_courses() {

    var search_stirng = $('#search_course').val();
    var value_id = $('#id_user').val();
    $.ajax({
        url: $('#base_url').val() + "permissions/search_course",
        type: "GET",
        context: document.body,
        data: "search_stirng=" + search_stirng + "&id_user=" + value_id,
        cache: false,
        success: function(data) {

            $('#new_data').html(data);
        }

    });

}

function add_course_student(id, user_id) {

    $("#btn_functional").attr("disabled", true);

    $.ajax({
        url: $('#base_url').val() + "permissions/add_course_session",
        type: "GET",
        context: document.body,
        data: "id=" + id + "&checker="
                + $('#' + id + user_id + "_chk").is(':checked') + "&user_id="
                + user_id,
        cache: false,
        success: function(data) {

            $("#btn_functional").attr("disabled", false);

        }

    });
}

function add_course(id) {

    $('#btn_functional').attr('disabled', true);

    var id_maker = id + '_chk';

    $.ajax({
        url: $('#base_url').val() + "permissions/add_course_session",
        type: "GET",
        context: document.body,
        data: "id=" + id + "&checker=" + $('#' + id + "_chk").is(':checked'),
        cache: false,
        success: function(data) {

            $('#btn_functional').attr('disabled', false);
        }
    });

}

function search_release_users() {

}

function remove_confirm_release(id) {

    $.ajax({
        url: $('#base_url').val() + "permissions/release_ulogin",
        type: "GET",
        context: document.body,
        data: "release=" + id,
        cache: false,
        success: function(data) {

            if (data) {
                $('#' + id).remove().slideUp();
            } else {
                alert('Error while removing!please try again');
            }

        }

    });

}

function remove_cenfrmation(id) {
    $
            .ajax({
        url: $('#base_url').val() + "permissions/remove",
        type: "GET",
        context: document.body,
        data: "id=" + id,
        cache: false,
        success: function(data) {

            $('.alert').hide();
            $(
                    '<div class="alert alert-success"><button class="close" data-dismiss="alert"></button><strong>Success!</strong> Removed Successfully!</div>')
                    .insertAfter('#error_show');

            $('#row_' + id).remove();
            window.location.reload();
        }

    });

}
function remove_role_perm(id, name) {

    $('<div></div>').appendTo('body').html(
            '<div><h6>Delete <b>' + name + '</b></h6></div>').dialog({
        modal: true,
        title: 'Remove Confirmation',
        zIndex: 10000,
        autoOpen: true,
        width: 'auto',
        resizable: false,
        buttons: [{
                text: 'Delete',
                click: function() {
                    remove_cenfrmation(id);
                    $(this).remove();
                }
            }, {
                text: "Cancel",
                click: function() {
                    $(this).remove();
                }
            }],
        close: function(event, ui) {
            $(this).remove();
        }
    });

}

function release_user_login(id, name) {

    $('<div></div>').appendTo('body').html(
            '<div><h6>Release <b>' + name + '</b></h6></div>').dialog({
        modal: true,
        title: 'Release Confirmation',
        zIndex: 10000,
        autoOpen: true,
        width: 'auto',
        resizable: false,
        buttons: [{
                text: 'Release',
                click: function() {
                    remove_confirm_release(id);
                    $(this).remove();
                }
            }, {
                text: "Cancel",
                click: function() {
                    $(this).remove();
                }
            }],
        close: function(event, ui) {
            $(this).remove();
        }
    });

}

function upadte_count(id) {

    $.ajax({
        url: $('#base_url').val() + "permissions/update_notif_status",
        type: "GET",
        context: document.body,
        data: "id=" + id,
        cache: false,
        success: function(data) {

        }

    });

}

function Save_schoolsettings()
{


    $('#show_setting').html('');

    var id = $('#value_settings_school ').is(':checked') ? 1 : 0;
    var eoa = $('#value_e_tips').is(':checked') ? 1 : 0;

    $.ajax({
        url: $('#base_url').val()
                + "permissions/update_settings_school",
        type: "GET",
        context: document.body,
        data: "id=" + id + "&eoa=" + eoa,
        cache: false,
        success: function(data) {
            $('#show_setting').html('<div class="alert alert-success"><button data-dismiss="alert" class="close"></button><strong>success!</strong> Successfully Updated.</div>');
            $(show_setting).slideDown('slow', function() {
                $('#show_setting').delay(1800).slideUp(2000);
            });

        }

    });
}
function remove_user_login(id, name) {

    $('<div></div>').appendTo('body').html(
            '<div><h6>Delete <b>' + name + '?</b></h6></div>').dialog({
        modal: true,
        title: 'Remove Confirmation',
        zIndex: 10000,
        autoOpen: true,
        width: 'auto',
        resizable: false,
        buttons: [{
                text: 'Delete',
                click: function() {
                    remove_confirm(id);
                    $(this).remove();
                }
            }, {
                text: "Cancel",
                click: function() {
                    $(this).remove();
                }
            }],
        close: function(event, ui) {
            $(this).remove();
        }
    });

}

function Go_new_password(id) {

    var pwd = $('#new_password').val();
    var check_pwd = $('#role_id').val();
    // var new_pwd;

    if (pwd == '') {
        $('#error_got').append(
                '<br/><span class="error">Please provide password!</span>');
        return;
    }

    if (check_pwd == 'true') {
        // var check = validate_strong_password(pwd);
        if (!validate_strong_password(pwd)) {
            $('#error_got')
                    .append(
                    '<br/><span class="error">Please add a strong password which should contain atleast 7 characters, one uppercase and lowercase letter and one numeric or special character!</span>');
            check_pwd = 'false';
            return;
        }
    }

    $
            .ajax({
        url: $('#base_url').val()
                + "permissions/reset_password_final/",
        type: "GET",
        context: document.body,
        data: "update=" + id + "&pass=" + pwd + "&email=" + $('#up_email').val(),
        cache: false,
        success: function(data) {


            $('#list_pop_types')
                    .html(
                    '<div style="margin-bottom:0px;" class="alert alert-success"><button data-dismiss="alert" class="close"></button><strong>Success!</strong> Password updated</div>');

            $("#events_type_list").fancybox().trigger('click');

            setTimeout(function() {
                $.fancybox.close();
            }, 1300);


        }

    });

}

function Create_new_password(uid, rid) {

    $.ajax({
        url: $('#base_url').val() + "permissions/reset_password_by_id/",
        type: "GET",
        context: document.body,
        data: "update=" + uid + "&check=" + rid,
        cache: false,
        success: function(data) {

            $('#list_pop_types').html(data);
            $("#events_type_list").fancybox().trigger('click');

        }

    });

}

function remove_confirm(id) {
    $.ajax({
        url: $('#base_url').val() + "permissions/remove_ulogin",
        type: "GET",
        context: document.body,
        data: "remove=" + id,
        cache: false,
        success: function(data) {

            if (data) {
                window.location.reload();
                $('#' + id).remove();

            } else {
                alert('Error while removing!please try again');
            }

        }

    });

}

function update_perm_password() {

    $
            .ajax({
        url: $('#base_url').val() + "permissions/check_old_password/",
        type: "GET",
        context: document.body,
        cache: false,
        data: "o_password=" + $('#old_password').val() + '&n='
                + $('#new_password').val() + '&cn='
                + $('#con_password').val(),
        success: function(data) {

            if (data == 'true') {

                $
                        .ajax({
                    url: $('#base_url').val()
                            + "permissions/reset_password_req/",
                    type: "GET",
                    context: document.body,
                    cache: false,
                    data: "old=" + $('#old_password').val()
                            + '&new='
                            + $('#new_password').val()
                            + '&cnew='
                            + $('#con_password').val(),
                    success: function(data) {

                        if (data == 'error1') {

                            $('#o_password_error')
                                    .html(
                                    '<label class="error" color="red" for="confirm_password" generated="true">Incorrect old password</label>');
                        }

                        if (data) {

                            $('#school')
                                    .html(
                                    '<div class="alert alert-success"><p>Updated Successfully !  </p></div>');
                            $("#added_school").fancybox()
                                    .trigger('click');

                            setTimeout(function() {
                                $.fancybox.close();
                            }, 1300);

                        }
                    }

                });

            } else {

                $('#o_password_error')
                        .html(
                        '<label class="error" color="red" for="confirm_password" generated="true">Incorrect old password</label>');

            }

        }

    });
    $('#o_password').val('');
    $('#n_password').val('');
    $('#confirm_password').val('');

}

function validate_strong_password(paswd) {
    var pwd = new RegExp(
            '(?=^.{7,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$');
    var valid = pwd.test(paswd);
    if (!valid) {

        return false;
    } else {
        return true;
    }

}

function upload_me_now() {

    $('#self_reg_form').submit(function(e) {

        $.ajaxFileUpload({
            url: $('#base_url').val() + 'permissions/upload_file/',
            secureuri: false,
            fileElementId: 'upload_file',
            success: function(data, status) {

                $('#files').html(data);
            }
        });
        return false;
    });

}

function courses_options_list(){
    

                $('#strong_pass').html('');
                $('#interface_update').html('<center><span class="error">Please Wait Loading ....</span></center>');
				$('#role_selection').attr('disabled',true);
                // check is role has permission of strong password
                $.ajax({
                    url: $('#base_url').val()
                            + "permissions/check_if_permissions/",
                    type: "GET",
                    data: 'query='
                            + $('#role_selection :selected').val(),
                    context: document.body,
                    cache: false,
                    success: function(data) {
                         var arr = data.split("@#2nd#@");
                        if (arr[0] != 1) {
                            $('#strong_pass').html(arr[0]);
                        }
                       // $('#user_access_role').val(arr[1]);
//                        if (data != 1) {
//                            $('#strong_pass').html(data);
//                        }

                    }

                });

                $.ajax({
                    url: $('#base_url').val()
                            + "permissions/realtions_html_search/",
                    type: "GET",
                    data: 'query='
                            + $('#role_selection :selected').val()
                            + '&value_text='
                            + $('#role_selection :selected').text()
                            + '&grade_id='
                            + $('#grade_name :selected').val()
                            + '&section_id='
                            + $('#section_name :selected').val(),
                    context: document.body,
                    cache: false,
                    success: function(data) {
                        $('#interface_update').html(data);
						$('#role_selection').attr('disabled',false);
                    }
                });
    
}

function add_child_pop(){
    $.ajax({
            url: $('#base_url').val() + "parents/add_child/",
            type: "GET",
            context: document.body,
            data: "temp_id=" + $('#tmp_p_id').val() ,
            cache: false,
            success: function(data) {
                $('#course').html(data);
                $("#added_course").fancybox().trigger('click');
            }
        });
}
//open child form in iframe

function get_all_child(tmp_id) {
    $.ajax({
        url: $('#base_url').val() + "parents/get_all_child/",
        type: "POST",
        context: document.body,
        data: "p_id=" + tmp_id,
        cache: false,
        success: function(data) {
            $str_arr = data.split('#@2nd@#');
            if ($str_arr[1] != '1')
                $('#question_added').val('2');
            else
                $('#question_added').val('1');

            $('#quiz_questions').html($str_arr[0]);
        }
    });
}

function add_parent_child(){
                //send ajax call to save the question, on success close iframe
            var form_data = $("#add_child_form").serialize();
            var post_url = $('#base_url').val() + "parents/save_child/";
            $.ajax({
                url: post_url,
                type: "POST",
                data: form_data,
                context: document.body,
                cache: false,
                success: function(data) {
//                    alert(data);
                    var temp_id = $('#tmp_p_id').val();
                    
                    get_all_child(temp_id);
                    var sclass = 'alert-success';
                    if (!data.match(/Oops!/)) {
                        
                        $('#course').html('<div style="margin-bottom:0px; !important;width:200px" class="alert alert-success"><button class="close" data-dismiss="alert"></button><strong>Success!</strong> '+data+'!</strong></div>');
//                        $('#course').html('<div style="margin-bottom:0px; !important;width:200px" class="alert alert-success"><button class="close" data-dismiss="alert"></button><strong>Success!</strong> Record Saved!</strong></div>');
                        $("#added_course").fancybox().trigger('click');
                        setTimeout(function() {
                            $.fancybox.close();
                        }, 1800);
                        
                    }
                    else {
                        $('#course').html('<div style="margin-bottom:0px; !important;width:200px" class="alert alert-error"><button class="close" data-dismiss="alert"></button><strong>Error!</strong> '+data+'</strong></div>');
//                        $('#course').html('<div style="margin-bottom:0px; !important;width:200px" class="alert alert-error"><button class="close" data-dismiss="alert"></button><strong>Error!</strong> Error Occured!</strong></div>');
                        $("#added_course").fancybox().trigger('click');
                        setTimeout(function() {
                            $.fancybox.close();
                        }, 1800);
                    }
                }
            });
}

function add_parent_child_another(){
                //send ajax call to save the question, on success close iframe
            var form_data = $("#add_child_form").serialize();
            var post_url = $('#base_url').val() + "parents/save_child/";
            $.ajax({
                url: post_url,
                type: "POST",
                data: form_data+"save=",
                context: document.body,
                cache: false,
                success: function(data) {
//                    alert(data);
                    var sclass = 'alert-success';
                    if (!data.match(/Oops!/)) {
                        $('#course').html('<div style="margin-bottom:0px; !important;width:200px" class="alert alert-success"><button class="close" data-dismiss="alert"></button><strong>Success!</strong> '+data+'!</strong></div>');
//                        $('#course').html('<div style="margin-bottom:0px; !important;width:200px" class="alert alert-success"><button class="close" data-dismiss="alert"></button><strong>Success!</strong> Record Saved!</strong></div>');
                        $("#added_course").fancybox().trigger('click');
                        setTimeout(function() {
                            $.fancybox.close();
                        }, 1800);
                    }
                    else {
                        $('#course').html('<div style="margin-bottom:0px; !important;width:200px" class="alert alert-error"><button class="close" data-dismiss="alert"></button><strong>Error!</strong> '+data+'</strong></div>');
//                        $('#course').html('<div style="margin-bottom:0px; !important;width:200px" class="alert alert-error"><button class="close" data-dismiss="alert"></button><strong>Error!</strong> Error Occured!</strong></div>');
                        $("#added_course").fancybox().trigger('click');
                        setTimeout(function() {
                            $.fancybox.close();
                        }, 2800);
                    }
                }
            });
}

function delete_parent_child(pid, cid) {
    $('<div></div>').appendTo('body')
            .html('<div><h6>Are you sure you want to delete!</h6></div>')
            .dialog({
        modal: true, title: 'Removing confirmation', zIndex: 10000, autoOpen: true,
        width: 'auto', resizable: false,
        buttons: {
            Yes: function() {

                delete_child(pid, cid);

                $(this).dialog("close");

            },
            No: function() {
                $(this).dialog("close");
            }
        },
        close: function(event, ui) {
            $(this).remove();
        }
    });
}

function delete_child(pid, cid) {
    var q_s = 'id=' + cid;
    $.ajax({
        url: $('#base_url').val() + "parents/delete_child/",
        type: "POST",
        context: document.body,
        data: {id: pid, u_id: cid},
        cache: false,
        success: function(data) {
            if (data) {
                $('#question_row_' + cid).remove();
                //alert(data);
                
                var str_arr = data.split('#@2nd@#');
                //console.log(str_arr[1]);
                if (str_arr[2] != '1')
                    $('#question_added').val('2');
                else
                    $('#question_added').val('1');
                $('#quiz_questions').html(str_arr[1]);
                $.fancybox({
                    'content': '<div style="margin-bottom:0px; !important;" class="alert alert-success"><button class="close" data-dismiss="alert"></button><strong>Success! ' + str_arr[0] + ' </strong> </div>'
                });
                setTimeout(function() {
                    $.fancybox.close();

                }, 1800);
            }
            else {
                alert('Error while removing, please try again!');
            }
        }
    });
}