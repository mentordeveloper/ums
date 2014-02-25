$(function() {

    $(".overall_pickers").datepicker({
        dateFormat: "mm-dd-yy"
    });
    /* $('#myTab a[href="#'+$('#tab_pick').val()+'"]').tab('show'); */

});

$('#send_email_grade')
        .click(
        function() {

            var error = '1';
            var array = $('#to_email_grade').val().split(",");

            if (array == '') {

                $("#grade_email")
                        .html(
                        '<div class="alert alert-error">Please enter email address*</div>')
                        .slideDown('slow').delay(1800).slideUp(2000);
                error = '2';
            } else {
                for (data in array) {
                    var str = array[data].replace(/\s/g, '');
                    if (!validate_email(str)) {
                        error = 'val';
                    }

                }
                if (error == "val") {
                    $("#grade_email")
                            .html(
                            '<div class="alert alert-error">Invalid email address*</div>')
                            .slideDown('slow').delay(1800)
                            .slideUp(2000);
                }

            }
            if ($("#doc_type_grade option:selected").val() == 0) {
                $("#grade_expot")
                        .html(
                        '<div class="alert alert-error">Please select export type *</div>')
                        .slideDown('slow').delay(1800).slideUp(2000);
                error = '2';
            }

            if (error == '1') {

                $("#errors_space_grade")
                        .html(
                        '<div  class="alert alert-success">Sending please wait .....</div>');

                $.ajax({
                    url: $('#base_url').val()
                            + "grade_book/send_email/",
                    type: "GET",
                    data: 'to='
                            + $('#to_email_grade').val()
                            + "&type="
                            + $("#doc_type_grade option:selected")
                            .val() + "&course_id="
                            + $("#field_courses option:selected").val()
                            + '&text=' + $('#text_send_grade').val(),
                    context: document.body,
                    cache: false,
                    success: function(data) {

                        $("#email_confirm_chooser").fancybox().trigger(
                                'click');

                    }

                });

            } else {

            }

        });

$('#send_email_attendence')
        .click(
        function() {

            var error = '1';

            var array = $('#to_email_attendence').val().split(",");
            if (array == '') {

                $("#attend_email")
                        .html(
                        '<div class="alert alert-error">Please enter email address*</div>')
                        .slideDown('slow').delay(1800).slideUp(2000);
                error = '2';
            } else {
                for (data in array) {
                    var str = array[data].replace(/\s/g, '');
                    if (!validate_email(str)) {
                        error = 'val';
                    }

                }

                if (error == "val") {
                    $("#attend_email")
                            .html(
                            '<div class="alert alert-error">Invalid email address*</div>')
                            .slideDown('slow').delay(1800)
                            .slideUp(2000);
                }
            }

            if ($("#doc_type_attendence option:selected").val() == 0) {
                $("#attend_expot")
                        .html(
                        '<div class="alert alert-error">Please select export type *</div>')
                        .slideDown('slow').delay(1800).slideUp(2000);
                error = '2';
            }

            if (error == '1') {

                $("#errors_space_attendence")
                        .html(
                        '<div class="alert alert-success">Sending please wait .....</div>');

                $.ajax({
                    url: $('#base_url').val()
                            + "attendence/send_email/",
                    type: "GET",
                    data: 'to='
                            + $('#to_email_attendence').val()
                            + "&type="
                            + $("#doc_type_attendence option:selected")
                            .val() + "&course_id="
                            + $("#field_courses option:selected").val()
                            + '&text='
                            + $('#text_send_attendence').val(),
                    context: document.body,
                    cache: false,
                    success: function(data) {

                        $("#email_confirm_chooser").fancybox().trigger(
                                'click');

                    }

                });

            } else {

            }

        });

function reset_all_fields() {
    $('#errors_space_grade').html('');
    $('#to_email_grade').val();
    $("#field_courses").prop('selected', 0);
}

// //////working with export things like page export/pdf/doc

function option_enabled_system() {

    check_course_settings();

    var checked = $('#enabled_system').is(':checked');

    $.ajax({
        url: $('#base_url').val() + "permissions/manual_system_settings/",
        type: "GET",
        context: document.body,
        cache: false,
        data: 'checked=' + checked,
        success: function(data) {

            if (checked) {
                $('#advance_settings').hide();
                if (data > 0) {
                    go_notify_msg(data);
                }
            } else {
                $('#advance_settings').show();
            }
        }
    });

}

function go_notify_msg(data) {

    $('<div></div>').appendTo('body').html(
            '<div><h6>Founded (' + data
            + ') Courses! Copy to manual system ?</h6></div>').dialog({
        modal: true,
        title: 'Sending confirmation',
        zIndex: 10000,
        autoOpen: true,
        width: 'auto',
        resizable: false,
        buttons: {
            Yes: function() {

                confirmation_add_courses();
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

function confirmation_add_courses() {

    $.ajax({
        url: $('#base_url').val() + "permissions/course_sink_up/",
        type: "GET",
        context: document.body,
        cache: false,
        success: function(data) {

        }
    });
}

function Reset_default() {

    $('#date1').val($('#date1_default').val());
    $('#date2').val($('#date2_default').val());
    $('#date3').val($('#date3_default').val());
    $('#date4').val($('#date4_default').val());
    $('#date5').val($('#date5_default').val());
    $('#date6').val($('#date6_default').val());
    $('#date7').val($('#date7_default').val());
    $('#date8').val($('#date8_default').val());

    $('#check_input').closest('tr').find("input,textarea").each(function() {

        if ($(this).attr('type') == 'text') {
            $('#html_overlap').html('').show();
            $(this).css('border', '1px solid #CCCCCC');
        }

    });

    $('#break1').html('');
    $('#break2').html('');
    $('#break3').html('');
    $('#break4').html('');

    Enabled_everything_now();
    var customdata = new Array();
    var counter = 0;

    // /loop thorugh all the textfields and check for dates
    var selected_choice = $('#term_selection :selected').val();
    if (selected_choice == 'quarters') {
        $('#check_input').closest('tr').find("input,textarea").each(
                function() {

                    if ($(this).attr('type') == 'text') {
                        if ($(this).attr('id') != 'exculde') {
                            customdata[counter] = $(this).val();
                            counter++;
                        }
                    }

                });

        var enoded_data = JSON.stringify(customdata);

        send_ajax_call(enoded_data, 'no', 'skip');

    }
}

function Reset_default_semester() {

    $('#date11').val($('#date11_default').val());
    $('#date22').val($('#date12_default').val());
    $('#date33').val($('#date13_default').val());
    $('#date44').val($('#date14_default').val());
    $('#date55').val($('#date15_default').val());
    $('#date66').val($('#date16_default').val());

    $('#check_input_1').closest('tr').find("input,textarea").each(function() {

        if ($(this).attr('type') == 'text') {
            $('#html_overlap').html('').show();
            $(this).css('border', '1px solid #CCCCCC');
        }

    });
    $('#break5').html('');
    $('#break6').html('');
    $('#break7').html('');
    Enabled_everything_now();
    var customdata = new Array();
    var counter = 0;

    // /loop thorugh all the textfields and check for dates
    var selected_choice = $('#term_selection :selected').val();



    if (selected_choice == 'semester') {
        $('#check_input_1').closest('tr').find("input,textarea").each(
                function() {

                    if ($(this).attr('type') == 'text') {
                        if ($(this).attr('id') != 'exculde') {
                            customdata[counter] = $(this).val();
                            counter++;
                        }
                    }
                });

        var enoded_data = JSON.stringify(customdata);

        send_ajax_call(enoded_data, 'other', 'skip');

    }

}

$(document).ready(function() {

    // /if this is by default no selection
    if ($('#type_selector').val() == 'semester') {
        $('#semester_ui').show();
        $('#semester_ui_save').show();
        $("#term_selection option[value='semesters']").prop('selected', true);

    }

    if ($('#type_selector').val() == 'quarters') {
        $('#quarters_ui').show();
        $('#quarters_ui_save').show();
        $("#term_selection option[value='quarters']").prop('selected', true);

    }

});

$(document).ready(
        function() {

            var customdata = new Array();
            var counter = 0;

            // /loop thorugh all the textfields and check for dates
            var selected_choice = $('#term_selection :selected').val();

            if (selected_choice == 'quarters') {
                $('#check_input').closest('tr').find("input,textarea").each(
                        function() {

                            if ($(this).attr('type') == 'text') {
                                if ($(this).attr('id') != 'exculde') {
                                    customdata[counter] = $(this).val();
                                    counter++;
                                }
                            }

                        });

                var enoded_data = JSON.stringify(customdata);

                send_ajax_call(enoded_data, 'no', 'skip');

            }

            if (selected_choice == 'semester') {
                $('#check_input_1').closest('tr').find("input,textarea").each(
                        function() {

                            if ($(this).attr('type') == 'text') {
                                if ($(this).attr('id') != 'exculde') {
                                    customdata[counter] = $(this).val();
                                    counter++;
                                }
                            }
                        });

                var enoded_data = JSON.stringify(customdata);

                send_ajax_call(enoded_data, 'other', 'skip');

            }

        });

$('.overall_pickers').change(
        function() {

            var customdata = new Array();
            var counter = 0;
            // /loop thorugh all the textfields and check for dates

            var selected_choice = $('#term_selection :selected').val();

            if (selected_choice == 'quarters') {
                $('#check_input').closest('tr').find("input,textarea").each(
                        function() {

                            if ($(this).attr('type') == 'text') {
                                if ($(this).attr('id') != 'exculde') {
                                    customdata[counter] = $(this).val();
                                    counter++;
                                }
                            }
                        });

                var enoded_data = JSON.stringify(customdata);

                send_ajax_call(enoded_data, 'no', 'no');

            }

            if (selected_choice == 'semester') {

                $('#check_input_1').closest('tr').find("input,textarea").each(
                        function() {

                            if ($(this).attr('type') == 'text') {
                                if ($(this).attr('id') != 'exculde') {
                                    customdata[counter] = $(this).val();
                                    counter++;
                                }
                            }

                        });

                var enoded_data = JSON.stringify(customdata);
                send_ajax_call(enoded_data, 'other', 'no');

            }

        });

function Diabled_everything_now() {

    $('#update_1').prop('disabled', true);
    $('#update_2').prop('disabled', true);
    $('#save_1').prop('disabled', true);
    $('#save_2').prop('disabled', true);

}

function Enabled_everything_now() {

    $('#update_1').prop('disabled', false);
    $('#update_2').prop('disabled', false);
    $('#save_1').prop('disabled', false);
    $('#save_2').prop('disabled', false);

}

function send_ajax_call(data, what, skip) {

    var checker1 = '';

    if (what == 'other') {
        checker1 = 'settings_hours_2';
    } else {
        checker1 = 'settings_hours';
    }

    $
            .ajax({
        url: $('#base_url').val() + "permissions/" + checker1,
        type: "GET",
        data: 'data=' + data,
        context: document.body,
        cache: false,
        success: function(data) {

            var counter = 1;

            var obj = JSON.parse(data);
            var other_counter = 1;

            if (obj.length > 0) {
                // /display error overlapping
                for (var k = 0; k < obj.length; k++) {

                    if (what == 'other') {
                        $('#html_overlap_1')
                                .html(
                                '<div class="alert alert-error">Overlapping Dates</div>')
                                .show();
                    } else {
                        $('#html_overlap')
                                .html(
                                '<div class="alert alert-error">Overlapping Dates</div>')
                                .show();
                    }

                    $('#' + obj[k]).css('border', '2px solid red');
                }

                Diabled_everything_now();

            } else {
                $('#check_input')
                        .closest('tr')
                        .find("input,textarea")
                        .each(
                        function() {

                            if ($(this).attr('type') == 'text') {
                                $('#html_overlap').html('')
                                        .show();
                                $(this).css('border',
                                        '1px solid #CCCCCC');
                                $('#html_overlap_1').html('')
                                        .show();
                            }

                            Enabled_everything_now();

                        });

                $('#check_input_1')
                        .closest('tr')
                        .find("input,textarea")
                        .each(
                        function() {

                            if ($(this).attr('type') == 'text') {
                                $('#html_overlap').html('')
                                        .show();
                                $(this).css('border',
                                        '1px solid #CCCCCC');
                                $('#html_overlap_1').html('')
                                        .show();
                            }

                            Enabled_everything_now();

                        });
            }
        }
    });

    var checker = '';

    if (what == 'other') {
        checker = 'settings_hours_break_2';
    } else {
        checker = 'settings_hours_break';
    }

    $.ajax({
        url: $('#base_url').val() + "permissions/" + checker,
        type: "GET",
        data: 'data=' + data,
        context: document.body,
        cache: false,
        success: function(data) {

            var counter = 1;

            var obj = JSON.parse(data);
            var other_counter = 1;

            if (obj.length > 0) {
                if (skip == 'skip') {
                    confirm_breakes_go(obj);
                } else {
                    confirmation_breakes(obj);
                }
            }
        }
    });

}

function confirm_breakes_go(obj) {
    // /display error overlapping
    for (var k = 0; k < obj.length; k++) {
        $('#' + obj[k]['on']).html(obj[k]['html']).show();
    }
}

function confirmation_breakes(obj) {

    var checker = 0;

    for (var k = 0; k < obj.length; k++) {
        if (obj[k]['html'] == '') {
            $('#' + obj[k]['on']).html(obj[k]['html']).show();
            checker++;
        }

    }

    if (obj.length != checker) {
        confirm_breakes_go(obj);
    }
}

function check_course_settings() {

    $
            .ajax({
        url: $('#base_url').val()
                + "permissions/check_existing_settings",
        type: "GET",
        context: document.body,
        cache: false,
        success: function(data) {
            if (data) {
                $('<div></div>')
                        .appendTo('body')
                        .html(
                        '<div><h6>Are you sure you want to change settings? Settings will be automatic locked for 1 year. </h6></div>')
                        .dialog({
                    modal: true,
                    title: 'Sending confirmation',
                    zIndex: 10000,
                    autoOpen: true,
                    width: 'auto',
                    resizable: false,
                    buttons: {
                        Yes: function() {
                            $(this).dialog("close");
                        },
                        No: function() {
                            $(this).dialog("close");
                            return false;
                        }
                    },
                    close: function(event, ui) {
                        $(this).remove();
                    }
                });
            }
        }
    });

}
function gen_reports_search()
{

    var term = $("#term_selection option:selected").val();
    var type = $("#report_type option:selected").val();


    $.ajax({
        url: $('#base_url').val() + "permissions/reports_search_criteria",
        type: "GET",
        context: document.body,
        data: "term=" + $("#term_selection option:selected").val() + "&type=" + $("#report_type option:selected").val(),
        cache: false,
        success: function(data) {

            $('#new_data').html(data);

        }

    });

}
// //////working with export things like page export/pdf/doc

function export_option_grading() {

    var go_redirect = false;

    var value = $("#field_export_grading option:selected").val();
    var course = $("#field_courses option:selected").val();

    // if export type is not selected make notice
    if (value == 'none') {
        $('#notification_export_grading').html(
                '<span class="alert alert-error">Please select export!</span>')
                .show().delay(1800).slideUp(2000);
        go_redirect = true;
        return false;
    }

    // if All is selected show error
    if (course == 0) {
        $('#notification_export_grading').html(
                '<span class="alert alert-error">Please select course!</span>')
                .show().delay(1800).slideUp(2000);
        go_redirect = true;
        return false;
    }

    $('#notification_export_grading').hide();

    if (go_redirect == false) {
        if (value == 'page') {

            window
                    .open(
                    $('#base_url').val()
                    + 'grade_book/view_course_events/' + course,
                    'Popup',
                    'toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=no, width=800,height=500,left=430,top=23');

        }

        if (value == 'doc') {
            $("#secretIFrame").attr(
                    "src",
                    $('#base_url').val()
                    + 'grade_book/view_course_events_in_doc/' + course);
        }

        if (value == 'pdf') {
            $("#secretIFrame").attr(
                    "src",
                    $('#base_url').val()
                    + 'grade_book/view_course_events_in_pdf/' + course);
        }

        if (value == 'email') {

            reset_all_fields();
            $("#email_chooser_grade").fancybox().trigger('click');

        }
        if (value == 'archive') {

            $("#secretIFrame").attr(
                    "src",
                    $('#base_url').val()
                    + 'grade_book/view_gradebook_summary_in_archive/'
                    + course);

        }

    }

}
function export_option_attendence() {

    var go_redirect = false;

    var value = $("#field_export_attendence option:selected").val();
    var course = $("#field_courses option:selected").val();

    // if export type is not selected make notice
    if (value == 'none') {
        $('#notification_export_attendence').html(
                '<span class="alert alert-error">Please select export!</span>')
                .show().delay(1800).slideUp(2000);
        go_redirect = true;
        return false;
    }

    // if All is selected show error
    if (course == 0) {
        $('#notification_export_attendence').html(
                '<span class="alert alert-error">Please select course!</span>')
                .show().delay(1800).slideUp(2000);
        go_redirect = true;
        return false;
    }

    $('#notification_export_attendence').hide();

    if (go_redirect == false) {
        if (value == 'page') {

            window
                    .open(
                    $('#base_url').val()
                    + 'attendence/view_attendence_summary_in_page/'
                    + course,
                    'Popup',
                    'toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=no, width=800,height=500,left=430,top=23');

        }

        if (value == 'doc') {
            $("#secretIFrame").attr(
                    "src",
                    $('#base_url').val()
                    + 'attendence/view_course_events_in_doc/' + course);
        }

        if (value == 'pdf') {
            $("#secretIFrame").attr(
                    "src",
                    $('#base_url').val()
                    + 'attendence/view_course_events_in_pdf/' + course);
        }

        if (value == 'email') {
            reset_all_fields();
            $("#email_chooser_attendence").fancybox().trigger('click');

        }
        if (value == 'archive') {

            $("#secretIFrame").attr(
                    "src",
                    $('#base_url').val()
                    + 'attendence/view_attendence_summary_in_archive/'
                    + course);

        }

    }

}

function validate_call($obj) {

    if (confirm('Are you sure you want to change settings? Settings will be automatic locked for current term.')) {
        $obj.submit();
    } else {
        return false;
    }

    return false;

}

function Modfiy_options() {
    var value = $('#term_selection :selected').val();

    // //changing settings needs to ask the user about 1 year lock on going for
    // new settings once set
    var customdata = new Array();
    var counter = 0;

    if (value == 'manual') {
//		$('#semester_ui').slideUp('fast');
//		$('#semester_ui_save').slideUp('fast');
//		$('#quarters_ui').slideUp('fast');
//		$('#quarters_ui_save').slideUp('fast');

        $('#semester_ui').fadeOut('fast');
        $('#semester_ui_save').fadeOut('fast');
        $('#quarters_ui').fadeOut('fast');
        $('#quarters_ui_save').fadeOut('fast');


        Reset_default();
        Enabled_everything_now();
        Reset_default_semester();
        Enabled_everything_now();

        $('#manual_save').fadeIn('slow');

    }

    if (value == 'quarters') {

        $('#semester_ui').fadeOut('fast');
        $('#semester_ui_save').fadeOut('fast');
        $('#manual_save').fadeOut('fast');
        Reset_default();
        Enabled_everything_now();


        $('#check_input').closest('tr').find("input,textarea").each(
                function() {

                    if ($(this).attr('type') == 'text') {
                        if ($(this).attr('id') != 'exculde') {
                            customdata[counter] = $(this).val();
                            counter++;
                        }
                    }
                });

        var enoded_data = JSON.stringify(customdata);

        send_ajax_call(enoded_data, 'no', 'no');
        $('#quarters_ui').fadeIn('slow');
        $('#quarters_ui_save').fadeIn('slow');
    }

    if (value == 'semester') {


        $('#quarters_ui').fadeOut('fast');
        $('#quarters_ui_save').fadeOut('fast');
        $('#manual_save').fadeOut('fast');
        Reset_default_semester();
        Enabled_everything_now();



        $('#check_input_1').closest('tr').find("input,textarea").each(
                function() {

                    if ($(this).attr('type') == 'text') {
                        if ($(this).attr('id') != 'exculde') {
                            customdata[counter] = $(this).val();
                            counter++;
                        }
                    }
                });

        var enoded_data = JSON.stringify(customdata);

        send_ajax_call(enoded_data, 'other', 'skip');
        $('#semester_ui').fadeIn('slow');
        $('#semester_ui_save').fadeIn('slow');

    }
}

