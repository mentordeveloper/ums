// JavaScript Document
function bar_code_generator() {
    var f_val = $('#faculty option:selected').val();
    var y_val = $('#year option:selected').val();
    var b_val = $('#batch').val();
    var admission_id_val = $('#addmission_id').val();
    var bar_code = f_val + "_" + b_val + "_" + y_val + "_" + admission_id_val;
    $('#bar_num').val(bar_code);

}
$(document).ready(function() {

    var chk = '';
//for roll number generation
    $("#faculty").change(function() {
        bar_code_generator();
    });
    $("#year").change(function() {
        bar_code_generator();
    });
    $("#batch").keyup(function() {
        bar_code_generator();
    });
 
    $(".all_pickers").datepicker({
        dateFormat: "mm-dd-yy"
    });
 
    $('.content .msgsuccess').slideUp(5000);

    $('#select_all').change(function() {

        var checkboxes = $(this).closest('form').find('input:checkbox');
        if ($(this).is(':checked')) {
            checkboxes.attr('checked', 'checked');
        } else {
            checkboxes.removeAttr('checked');
        }
    });



    $("#searchingname").keyup(function() {
        $.ajax({
            url: $('#site_url').val() + "sadmin/users_instantsearch/",
            type: "GET",
            data: 'query=' + $('#searchingname').val(),
            context: document.body,
            cache: false,
            success: function(data) {
                $('#new_searcher_req').html(data);
                $('#searchcriteria').hide();

            }

        });
    });

    $("a#update_permission_set").fancybox();

    $("a#add_school_new").fancybox();
    $('a#open_feilds_lang').fancybox();

    $("#schooltype").validate({
        rules: {
            role: {
                required: true,
            },
        },
        messages: {
            role: {
                required: "Please enter School Type"
            },
        }
    });

    $("#perm_form").validate({
        rules: {
            permission: {
                required: true,
            },
            permission_mask: {
                required: true,
            },
        },
        messages: {
            permission: {
                required: "Please enter Permission Name",
            },
            permission_mask: {
                required: "Please enter Permission Mask Name",
            },
        }
    });

    // Initialize the jQuery File Upload widget:
    // $('#fileupload').fileupload();


    // Load existing files:
    $.getJSON($('#fileupload form').prop('action'), function(files) {
        var fu = $('#fileupload').data('fileupload');
        fu._adjustMaxNumberOfFiles(-files.length);
        fu._renderDownload(files)
                .appendTo($('#fileupload .files'))
                .fadeIn(function() {
            // Fix for IE7 and lower:
            $(this).show();
        });
    });

    // Open download dialogs via iframes,
    // to prevent aborting current uploads:
    $('#fileupload .files a:not([target^=_blank])').live('click', function(e) {
        e.preventDefault();
        $('<iframe style="display:none;"></iframe>')
                .prop('src', this.href)
                .appendTo('body');
    });

    $('#term').change(function() {
        var term_val = eval($('#term').val());
        var placeholder_text = '';
        switch (term_val) {
            case 1:
                placeholder_text = 'Please enter the number of Days for this plan';
                break;
            case 7:
                placeholder_text = 'Please enter the number of Weeks for this plan';
                break;
            case 30:
                placeholder_text = 'Please enter the number of Months for this plan';
                break;
            case 365:
                placeholder_text = 'Please enter the number of Years for this plan';
                break;
            default:
                placeholder_text = '';

        }
        $('#quan').attr('placeholder', placeholder_text);
    });



});

function validate_form() {

    var myresult = $("#add_user").validate({
        rules: {
            add_date: {required: true,},
            lg_fname: {required: true,},
            lg_lname: {required: true,},
            dob: {required: true,},
            birth_place: {required: true,},
            nationality: {required: true,},
            mother_lang: {required: true,},
            add_cate: {required: true,},
            religion: {required: true,},
            national_id: {required: true,},
            eng_name: {required: true,},
            faculty: {required: true,},
            year: {required: true,},
            batch: {required: true,},
            address1: {required: true,},
            city: {required: true,},
            state: {required: true,},
            pin_code: {required: true,},
            country: {required: true,},
            phone: {required: true,},
            m_phone: {required: true,},
            lg_email: {required: true,email: true,},
            lg_img: {required: true},
            par_fname: {required: true},
            par_lname: {required: true},
            par_relation: {required: true},
            par_dob: {required: true},
            par_education: {required: true},
            par_occupation: {required: true},
            par_email: {required: true,email: true,},
            par_address1: {required: true},
            par_city: {required: true},
            par_state: {required: true},
            par_country: {required: true},
            par_mobile: {required: true},
            ed_ins_name: {required: true},
            ed_course: {required: true},
            ed_year: {required: true},
            ed_total_marks: {required: true},
            ed_total_grade: {required: true},
        },
        messages: {
            add_date: {required: "Please enter Admission Date", },
            lg_fname: {required: "Please enter First Name", },
            lg_lname: {required: "Please enter Last Name", },
            dob: {required: "Please enter Date of Birth", },
            blood_group: {required: "Please Select Blood Group", },
            birth_place: {required: "Please enter Birth Place",},
            nationality: {required: "Please Select Nationality",},
            mother_lang: {required: "Please enter Mother Language",},
            add_cate: {required: "Please Select Course Cate",},
            religion: {required: "Please enter Religion",},
            national_id: {required: "Please enter National ID#",},
            eng_name: {required: "Please enter English Name",},
            faculty: {required: "Please Select Faculty",},
            year: {required: "Please Select Year",},
            batch: {required: "Please Enter Batch",},
            address1: {required: "Please Enter Address ",},
            city: {required: "Please Enter City Name",},
            state: {required: "Please Enter State Name",},
            pin_code: {required: "Please Enter pin Code",},
            country: {required: "Please Select Country",},
            phone: {required: "Please Enter Phone #",},
            m_phone: {required: "Please Enter Mobile Phone #",},
            lg_email: {required: "Please Enter Email address",email: "Please Enter Valid Email Address",},
            lg_img: {required: "Please chose User Image",},
            par_fname: {required: "Please Enter Parent First Name",},
            par_lname: {required: "Please Enter Parent Last Name",},
            par_relation: {required: "Please Enter Parent Relation",},
            par_dob: {required: "Please Enter Parent Date of Birth",},
            par_education: {required: "Please Enter Parent Education",},
            par_occupation: {required: "Please Enter Parent Occupation",},
            par_email: {required: true,email: true,},
            par_address1: {required: true},
            par_city: {required: true},
            par_state: {required: true},
            par_country: {required: true},
            par_mobile: {required: true},
            ed_ins_name: {required: true},
            ed_course: {required: true},
            ed_year: {required: true},
            ed_total_marks: {required: true},
            ed_total_grade: {required: true},
        highlight: function(element) { // hightlight

            $(element).closest('.control-group').addClass('error');
            $("#html_ajax").children().find('.error:first').focus();
            $("#html_ajax").children().find('.error:first').animate({scrollTop: $('.error:first').position().top}, 'fast');
//            $(".error").parent(".control-group").find('input').animate({scrollTop: $('.error:first').position().top}, 'fast');
//            $('html, body').animate({scrollTop: $('.error:first').position().top}, 'fast');
},
        success: function(label) {

            label.closest('.control-group').removeClass('error');
            label.remove();
        },
        errorPlacement: function(error, element) {
            error.addClass('help-inline').insertAfter(element.closest('.controls'));
        },

        }
    }).form();

    if (myresult) {
         add_student_call();
    }

}
function payment_refund_status(id, flag)
{
    $.ajax({
        url: $('#site_url').val() + "sadmin/payment_refund_status_update/",
        type: "GET",
        data: "id=" + id + "&flag=" + flag,
        context: document.body,
        cache: false,
        success: function(data) {

        }
    });

}
function my_status_check(id)
{
    var flag = 1;

    $('<div></div>').appendTo('body')
            .html('<div><h5>Update?<b> </b>!</h5></div>')
            .dialog({
        modal: true, title: 'Change Confirmation', zIndex: 10000, autoOpen: true,
        width: 'auto', resizable: false,
        buttons: [{
                text: 'Update',
                click: function() {
                    payment_refund_status(id, flag);
                    $(this).remove();
                }
            },
            {
                text: "Cancel",
                click: function() {
                    $(this).remove();
                }
            }
        ],
        close: function(event, ui) {
            $(this).remove();
        }
    });





}

function my_status_uncheck(id)
{
    var flag = 0;


    $('<div></div>').appendTo('body')
            .html('<div><h5>Update?<b> </b></h5></div>')
            .dialog({
        modal: true, title: 'Change Confirmation', zIndex: 10000, autoOpen: true,
        width: 'auto', resizable: false,
        buttons: [{
                text: 'Update',
                click: function() {
                    payment_refund_status(id, flag);
                    $(this).remove();
                }
            },
            {
                text: "Cancel",
                click: function() {
                    $(this).remove();
                }
            }
        ],
        close: function(event, ui) {
            $(this).remove();
        }
    });





}
function term_type_options()
{

    var value = $('#term_new :selected').val();

    if (value == 'semester') {

        $('#semester_ui').slideDown();
        $('#semester_ui_save').slideDown();

    }
    if (value == 'quarters') {
        $('#quarters_ui').slideDown();
        $('#quarters_ui_save').slideDown();
        $('#semester_ui').slideUp();
        $('#semester_ui_save').slideUp();
        $('#manual_save').slideUp();
        Reset_default();
        Enabled_everything_now();

    }

}
function save_category_new()
{
    $.ajax({
        url: $('#site_url').val() + "sadmin/add_cat_new/",
        type: "GET",
        data: "name=" + $('#cat_name').val(),
        context: document.body,
        cache: false,
        success: function(data) {
            //alert(data);
            //$(#row_+ data).append($('#cat_name').val());
            open_cat();
        }
    });


}

function open_cat()
{
    $.ajax({
        url: $('#site_url').val() + "sadmin/new_category/",
        type: "GET",
        context: document.body,
        cache: false,
        success: function(data) {

            $("#add_cat_qustion").fancybox().trigger('click');

        }
    });

}


function update_password_call()
{

    $.ajax({
        url: $('#site_url').val() + "/sadmin/check_password_old/",
        type: "GET",
        context: document.body,
        cache: false,
        data: "o_password=" + $('#o_password').val() + '&n=' + $('#n_password').val() + '&cn=' + $('#confirm_password').val(),
        success: function(data) {

            if (data == 'true')
            {

                $.ajax({
                    url: $('#site_url').val() + "/sadmin/reset_password_request/",
                    type: "GET",
                    context: document.body,
                    cache: false,
                    data: "old=" + $('#o_password').val() + '&n=' + $('#n_password').val() + '&cn=' + $('#confirm_password').val(),
                    success: function(data) {

                        if (data == 'error1')
                        {

                            $('#o_password_error').html('<label class="error" for="confirm_password" generated="true">Incorrect Old password!</label>');
                        }

                        if (data)
                        {

                            $('#school').html('<div class="notification msgsuccess"><p>Updated Successfully !  </p></div>');
                            $("#added_school").fancybox().trigger('click');

                            setTimeout(function() {
                                $.fancybox.close();
                            }, 1300);

                        }
                    }

                });

            } else
            {

                $('#o_password_error').html('<label class="error" for="confirm_password" generated="true">Incorrect Old password!</label>');

            }

        }

    });



}

function R_s(id, name) {


    $('<div></div>').appendTo('body')
            .html('<div><h5>Delete <b>' + name + ' ?</b>!</h5></div>')
            .dialog({
        modal: true, title: 'Remove Confirmation', zIndex: 10000, autoOpen: true,
        width: 'auto', resizable: false,
        buttons: [{
                text: 'Remove',
                click: function() {
                    R_s_do(id);
                    $(this).remove();
                }
            },
            {
                text: "Cancel",
                click: function() {
                    $(this).remove();
                }
            }
        ],
        close: function(event, ui) {
            $(this).remove();
        }
    });



}

function R_s_do(id)
{
    $.ajax({
        url: $('#site_url').val() + "/sadmin/remove_payment_sys/",
        type: "GET",
        context: document.body,
        cache: false,
        data: "id=" + id,
        success: function(data) {

            window.location = $('#site_url').val() + '/sadmin/payments?msg=Removed Successfully&go=true';

        }
    });



}
function remove_lanoptions(id)
{

    alert($('#lang_titlee' + id).val());
    $.ajax({
        url: $('#site_url').val() + "sadmin/remove_languageoptions/",
        type: "GET",
        data: "id=" + id + "&title=" + $('#lang_titlee' + id).val(),
        context: document.body,
        cache: false,
        success: function(data) {

            return data;
        }
    });


}

function remove_language(id, name)
{


    $('<div></div>').appendTo('body')
            .html('<div><h5>Delete <b>' + name + ' ? </b>!</h5></div>')
            .dialog({
        modal: true, title: 'Remove Confirmation', zIndex: 10000, autoOpen: true,
        width: 'auto', resizable: false,
        buttons: [{
                text: 'Delete',
                click: function() {
                    remove_confirm(id);
                    $(this).remove();
                }
            },
            {
                text: "Cancel",
                click: function() {
                    $(this).remove();
                }
            }
        ],
        close: function(event, ui) {
            $(this).remove();
        }
    });

}

function remove_confirm(id)
{

    $.ajax({
        url: $('#site_url').val() + "sadmin/remove_language_options/",
        type: "GET",
        data: "id=" + id + "&title=" + $('#lang_titlee' + id).val(),
        context: document.body,
        cache: false,
        success: function(data) {

            $('.content').prepend('<div class="notification msgsuccess"><a class="close"></a><p>Removed Successfully!</p></div><br/>');
            $('.msgsuccess').slideUp(4000);
            $('#row_' + id).remove();
        }
    });
}


function updatenotifcation()
{

    $.ajax({
        url: $('#site_url').val() + "/sadmin/update_notifications/",
        type: "GET",
        context: document.body,
        cache: false,
        success: function(data) {

            return data;
        }
    });

    refresh_calender_on_call();
}
function update_permission()
{

    $.ajax({
        url: $('#site_url').val() + "sadmin/update_cofirm_permission",
        type: "GET",
        context: document.body,
        data: "id=" + $('#mask_id_permission').val() + "&permission_mask=" + $('#mask_name_permission').val(),
        cache: false,
        success: function(data) {
            // $("#show_error").html(data);				
            $('#row_' + $('#mask_id_permission').val()).html(data);
            $('#success_get').html('<div class="notification msgsuccess"><p>update successfully</p></div>');


        }

    });

}
function open_feildslang(id)
{

    $.ajax({
        url: $('#site_url').val() + "sadmin/open_feilds_lang",
        type: "GET",
        context: document.body,
        data: "title=" + $('#lang_titlee' + id).val(),
        cache: false,
        success: function(data) {

            $('#display_list_lang').html(data);
            //$('#display_list_lang').fancybox(data);


        }

    });


}
function Update_language()
{

    if ($('#my_select_field').val() == '')
    {
        $('#updt_notf').html('<div class="notification msgerror"><p>Please enter text</p></div>');
        return false;
    }

    $.ajax({
        url: $('#site_url').val() + "sadmin/update_language_file",
        type: "GET",
        context: document.body,
        data: "title=" + $('#my_title').val() + "&field=" + $('#sel_lang').val() + "&value=" + $('#my_select_field').val(),
        cache: false,
        success: function(data) {

            $('#updt_notf').html('<span class="success">Entered successfully</span>').show().delay(1800).slideUp(2000);
            //	$("#added_school").fancybox().trigger('click');

        }

    });



}

function create_language_folder()
{

    $.ajax({
        url: $('#site_url').val() + "sadmin/create_language_folder",
        type: "GET",
        context: document.body,
        data: "title=" + $('#add_lang').val(),
        cache: false,
        success: function(data) {

            window.location = $('#site_url').val() + 'sadmin/language_settings?msg=Language Added Successfully&go=true';

        }
    });

}
function update_school(id)
{

    $.ajax({
        url: $('#site_url').val() + "sadmin/update_school",
        type: "GET",
        context: document.body,
        data: "id=" + id,
        cache: false,
        success: function(data) {

            $('#school').html(data);
            $("#added_school").fancybox().trigger('click');

        }

    });

}


function check_name_duplication()
{

    $('#school').html('');

    $.ajax({
        url: $('#site_url').val() + "sadmin/register_check_duplicate/",
        type: "POST",
        context: document.body,
        data: {
            student_email: $('#lg_email').val(),
        },
        cache: false,
        success: function(data) {


            var obj = JSON.parse(data);
            if (obj['value'] == 1)
            {

                $('.alert-error').remove();
                if (obj['reason'] == 'Name')
                    obj['reason'] = 'Student ' + obj['reason'];

                $('#error').html('<div class="notification msgerror"><p> ' + obj['reason'] + ' ' + obj['reason_value'] + ' already exists</p></div>');

                return;

            }

            if (obj['value'] == 0)
            {
                $('#school').html('<div class="notification msgsuccess"><p>Please Wait ...!</p></div>');
                $("#added_school").fancybox().trigger('click');
                var form_data = $("#add_user").serialize();
                $.ajax({
                    url: $('#site_url').val() + "sadmin/save_student",
                    type: "POST",
                    context: document.body,
                    data: form_data,
                    cache: false,
                    success: function(data) {

                        if (data == 'false')
                        {
                            $('#school').html('<span class="error" style="padding:0 20px;">Some problem saving record please try again!</span>');
                            return false;
                        }
                        else
                        {



                            $('#school').html('<div class="notification msgsuccess"><p>Record Saved!</p></div>');
                            $("#added_school").fancybox().trigger('click');

                            $('#html_ajax').html(data);

                            setTimeout(function() {
                                $.fancybox.close();
                            }, 1300);

                            jQuery('#dyntable').dataTable({"bDestroy": true, "sPaginationType": "full_numbers"});

                        }

                    }

                });

            }

        }


    });


}


function update_school_call(id)
{


    var name = $('#school_name').val();
    var status = $('#status_school').is(':checked');
    var school_username = $('#school_username').val();
    var school_password = $('#school_password').val();
    var s_type = $('#skool_typee :selected').text();
    var school_email = $('#school_email').val();
    var id = $('#id_update').val();

    $.ajax({
        url: $('#site_url').val() + "sadmin/update_school_go",
        type: "POST",
        context: document.body,
        data: {
            name: name,
            status: status,
            school_username: school_username,
            school_password: school_password,
            s_type: s_type,
            school_email: school_email,
            id: id
        },
        cache: false,
        success: function(data) {

            if (data == 'false')
            {
                $('#school').html('<span class="error" style="padding:0 20px;">Some problem saving record please try again!</span>');
                return false;
            }
            else
            {

                $('#school').html('');

                $('#school').html('<div class="notification msgsuccess"><p>Record Updated!</p></div>');
                $("#added_school").fancybox().trigger('click');

                //$('#html_ajax').html(data);

                setTimeout(function() {
                    $.fancybox.close();
                }, 1300);


            }

        }

    });


}


function remove_school(id, schoolname)
{


    $('<div></div>').appendTo('body')
            .html('<div><h5>Delete <b>' + schoolname + ' ?</b></h5></div>')
            .dialog({
        modal: true, title: 'Remove Confirmation', zIndex: 10000, autoOpen: true,
        width: 'auto', resizable: false,
        buttons: [{
                text: 'Delete',
                click: function() {
                    push_call_confirm(id);
                    $(this).remove();
                }
            },
            {
                text: "Cancel",
                click: function() {
                    $(this).remove();
                }
            }
        ],
        close: function(event, ui) {
            $(this).remove();
        }
    });


}


function push_call_confirm(id)
{

    $.ajax({
        url: $('#site_url').val() + "sadmin/remove_school",
        type: "GET",
        context: document.body,
        data: "remove_school=" + id,
        cache: false,
        success: function(data) {

            $('.content').prepend('<div class="notification msgsuccess"><a class="close"></a><p>Removed Successfully!</p></div><br/>');

            $('.msgsuccess').slideUp(4000);


            $('#row_' + id).remove();

        }

    });

}

function add_student_call()
{
    var check = check_name_duplication();
}

function save_plan_payment()
{


}



function acpt_rem(id)
{


    $('<div></div>').appendTo('body')
            .html('<div><h5>Delete </h5></div>')
            .dialog({
        modal: true, title: 'Remove Confirmation', zIndex: 10000, autoOpen: true,
        width: 'auto', resizable: false,
        buttons: [{
                text: 'Delete',
                click: function() {
                    remove_this_request_developer(id);
                    $(this).remove();
                }
            },
            {
                text: "Cancel",
                click: function() {
                    $(this).remove();
                }
            }
        ],
        close: function(event, ui) {
            $(this).remove();
        }
    });



}

function remove_this_request_developer(id)
{
    $.ajax({
        url: $('#site_url').val() + "sadmin/remove_developer_request/",
        type: "GET",
        context: document.body,
        data: "respond_req=" + id,
        cache: false,
        success: function(data) {
            $('#row_' + id).remove();
        }
    });


}

function acpt_req(id)
{
    $('<div></div>').appendTo('body')
            .html('<div><h5>Request Accepted!</h5></div>')
            .dialog({
        modal: true, title: 'Sending confirmation', zIndex: 10000, autoOpen: true,
        width: 'auto', resizable: false,
        buttons: {
            Ok: function() {
                $(this).dialog("close");
            }
        }
    });

    $.ajax({
        url: $('#site_url').val() + "sadmin/respond_to/",
        type: "GET",
        context: document.body,
        data: "respond_req=" + id,
        cache: false,
        success: function(data) {

            $('#showhtml').html(data);
            window.location = $('#site_url').val() + 'sadmin/req_access?msg=Request Accepted Successfully&go=true';


        }
    });
    ////end here
}
function deny_req(id)
{


    $('<div></div>').appendTo('body')
            .html('<div><h5>Deny request ?</b></h5></div>')
            .dialog({
        modal: true, title: 'Remove Confirmation', zIndex: 10000, autoOpen: true,
        width: 'auto', resizable: false,
        buttons: [{
                text: 'Deny',
                click: function() {
                    confirm_call(id);
                    $(this).remove();
                }
            },
            {
                text: "Cancel",
                click: function() {
                    $(this).remove();
                }
            }
        ],
        close: function(event, ui) {
            $(this).remove();
        }
    });



}
function deny_req1(id)
{


    $('<div></div>').appendTo('body')
            .html('<div><h5>Deny request ? </b>!</h5></div>')
            .dialog({
        modal: true, title: 'Remove Confirmation', zIndex: 10000, autoOpen: true,
        width: 'auto', resizable: false,
        buttons: [{
                text: 'Remove',
                click: function() {
                    push_call_confirm(id);
                    $(this).remove();
                }
            },
            {
                text: "Cancel",
                click: function() {
                    $(this).remove();
                }
            }
        ],
        close: function(event, ui) {
            $(this).remove();
        }
    });



}

function acpt_req_all()
{

    $('.content').prepend('<div class="notification msginfo"><a class="close"></a><p>Please wait loading!</p></div><br/>');

    $.ajax({
        url: $('#site_url').val() + "sadmin/respond_to/",
        type: "GET",
        context: document.body,
        cache: false,
        success: function(data) {

            window.location = $('#site_url').val() + 'sadmin/req_access?msg=All Request Accepted Successfully!&go=true';

        }
    });

}
function remove_role(id, role)
{


    $('<div></div>').appendTo('body')
            .html('<div><h5>Delete <b>' + role + ' ?</b></h5></div>')
            .dialog({
        modal: true, title: 'Remove Confirmation', zIndex: 10000, autoOpen: true,
        width: 'auto', resizable: false,
        buttons: [{
                text: 'Delete',
                click: function() {
                    confirm_id(id);
                    $(this).remove();
                }
            },
            {
                text: "Cancel",
                click: function() {
                    $(this).remove();
                }
            }
        ],
        close: function(event, ui) {
            $(this).remove();
        }
    });




}
function confirm_id(id)
{
    $.ajax({
        url: $('#site_url').val() + "sadmin/remove/",
        type: "GET",
        context: document.body,
        data: "id=" + id,
        cache: false,
        success: function(data) {

            $('#row_' + id).remove();
            $('.content').prepend('<div class="notification msgsuccess" style="margin-bottom:10px;"><a class="close"></a><p>Removed Successfully!</p></div>');
            $('.msgsuccess').slideUp(4000);



        }
    });
}

function confirm_call(id)
{
    $.ajax({
        url: $('#site_url').val() + "sadmin/revert_access/",
        type: "GET",
        context: document.body,
        data: "id=" + id,
        cache: false,
        success: function(data) {

            window.location = $('#site_url').val() + 'sadmin/req_access?msg=Request Denied Successfully&go=true';


        }
    });
}

function remove_perm(id)
{


    jConfirm('Can you confirm this?', 'Confirmation Dialog', function(r) {
        confirm_remove(id);
    });


}

function confirm_remove(id)
{
    $.ajax({
        url: $('#site_url').val() + "sadmin/removepermi/",
        type: "GET",
        context: document.body,
        data: "id=" + id,
        cache: false,
        success: function(data) {

            $('#row_' + id).remove();

        }
    });
}
function add_notifier()
{


    $.ajax({
        url: $('#site_url').val() + "sadmin/add_notifier",
        type: "POST",
        context: document.body,
        data: "text=" + $('#notif_text').val(),
        cache: false,
        success: function(data) {

            $('#school').html('<div class="notification msgsuccess"><p>Notification Sent!</p></div>');
            $("#added_school").fancybox().trigger('click');
            setTimeout(function() {
                $.fancybox.close();
            }, 1300);
        }
    });



}
function remove_schooltype(id, name)
{


    $('<div></div>').appendTo('body')
            .html('<div><h5>Delete <b>' + name + ' ?</b></h5></div>')
            .dialog({
        modal: true, title: 'Remove Confirmation', zIndex: 10000, autoOpen: true,
        width: 'auto', resizable: false,
        buttons: [{
                text: 'Delete',
                click: function() {
                    confirm_remove_type(id);
                    $(this).remove();
                }
            },
            {
                text: "Cancel",
                click: function() {
                    $(this).remove();
                }
            }
        ],
        close: function(event, ui) {
            $(this).remove();
        }
    });


}

function confirm_remove_type(id)
{
    $.ajax({
        url: $('#site_url').val() + "sadmin/remove_type/",
        type: "GET",
        context: document.body,
        data: "id=" + id,
        cache: false,
        success: function(data) {

            $('#row_' + id).remove();

            $('.content').prepend('<div class="notification msgsuccess"><a class="close"></a><p>Removed Successfully!</p></div><br/>');
            $('.msgsuccess').slideUp(4000);

        }
    });
}




function clearkeys()
{
    $.ajax({
        url: $('#site_url').val() + 'instructor/clear_keys/',
        type: "GET",
        context: document.body,
        cache: false,
        success: function(data) {

            $('#success').html('<br/><div class="notification msgsuccess"><p>Keys Cleared Successfully</div>');
        }
    });
}

function validate_email(emailAddress)
{

    var emailRegex = new RegExp(/^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$/i);
    var valid = emailRegex.test(emailAddress);
    if (!valid) {

        return false;
    } else
        return true;

}

