$(document).ready(function() {

    $("#txt_test_s_date").live({
        focus: function() {
            $(this).datepicker();
        },
        keypress: function() {
            return false;
        }
    });
    $("#txt_test_e_date").live({
        focus: function() {
            $(this).datepicker();
        },
        keypress: function() {
            return false;
        }
    });

    $.validator.addMethod("valid_date", function(value, element) {
        if (isDate(value))
            return true;
        else
            return false;
    }, "* Date should be in format of mm/dd/yyyy");

    $("#create_new_test form").validate({
        rules: {
            txt_test_title: "required",
            slct_test: "required",
            txt_test_s_date: {
                required: true,
                valid_date: $("#txt_test_s_date").val(),
            },
            txt_test_e_date: {
                required: true,
                valid_date: $("#txt_test_e_date").val(),
            },
            txt_test_duration: {
                required: true,
                number: true
            },
            txt_test_pp: {
                required: true,
                number: true
            },
        },
        messages: {
            txt_test_title: "Please provide Test Title",
            slct_test: "Please Select a Quiz",
            txt_test_s_date: {
                required: "Please provide test starting date",
                valid_date: "Date should be in the following format, MM/DD/YYYY"
            },
            txt_test_e_date: {
                required: "Please provide test ending date",
                valid_date: "Date should be in the following format, MM/DD/YYYY"
            },
            txt_test_duration: {
                required: "Please provide test duration to complete in.",
                number: "Please enter numbers only representing amount in minutes"
            },
            txt_test_pp: {
                required: "Please provide Passing percentage.",
                number: "Please enter numbers only"
            },
        },
        errorClass: 'error_class',
        success: function(error_label) {
            error_label.hide();
        },
        submitHandler: function(form) {
            save_create_test();
        }
    });

    // pop up the create new test box
    $("#create_new_test_link").fancybox({
        onClosed: function() {
            window.location.reload();
        }
    });

    ///adding instant search functionality on tests search
    $("#tests_admin_search").keyup(function() {
        $.ajax({
            url: $('#base_url').val() + "tests_admin/search_tests/",
            type: "GET",
            data: 'tests_sq=' + $('#tests_admin_search').val(),
            context: document.body,
            cache: false,
            success: function(data) {
                $('#new_searcher').html(data);
            }
        });
    });


    //form validation for edit test
    $("#edit_test form").validate({
        rules: {
            txt_test_title: "required",
            slct_test: "required",
            txt_test_s_date: {
                required: true,
                valid_date: $("#txt_test_s_date").val(),
            },
            txt_test_e_date: {
                required: true,
                valid_date: $("#txt_test_e_date").val(),
            },
            txt_test_duration: {
                required: true,
                number: true
            },
            txt_test_pp: {
                required: true,
                number: true
            },
        },
        messages: {
            txt_test_title: "Please provide Test Title",
            slct_test: "Please Select a Quiz",
            txt_test_s_date: {
                required: "Please provide test starting date",
                valid_date: "Date should be in the following format, MM/DD/YYYY"
            },
            txt_test_e_date: {
                required: "Please provide test ending date",
                valid_date: "Date should be in the following format, MM/DD/YYYY"
            },
            txt_test_duration: {
                required: "Please provide test duration to complete in.",
                number: "Please enter numbers only representing amount in minutes"
            },
            txt_test_pp: {
                required: "Please provide Passing percentage.",
                number: "Please enter numbers only"
            },
        },
        errorClass: 'error_class',
        success: function(error_label) {
            error_label.hide();
        },
        submitHandler: function(form) {
            update_test();
        }
    });

    //validate create quiz form
    $("#create_quiz_form").validate({
        rules: {
            q_ttl: "required",
            q_desc: "required",
            q_guide: "required",
            q_course: "required",
            question_added: "required"
        },
        messages: {
            q_ttl: "Please provide name for the quiz!",
            q_desc: "Please provide few words about quiz and instructions to follow!",
            q_guide: "Please provide Guide Lines for Quiz!",
            q_course: "Please select the course related to the Quiz!",
            question_added: "Please Add Questions..."
        },
        errorClass: 'error_class',
        success: function(error_label) {
            error_label.hide();
        },
        submitHandler: function(form) {
            var question_exits = $("#question_added").val();
            if (question_exits == 2)
            {
                var form_data = $("#create_quiz_form").serialize();
                //alert(form_data);
                var post_url = $('#base_url').val() + "tests_admin/save_new_quiz/";
                $.ajax({
                    url: post_url,
                    type: "POST",
                    data: form_data,
                    context: document.body,
                    cache: false,
                    success: function(data) {

                        if (!data.match(/Oops!/)) {
                            //alert(data);
                            $.fancybox({
                                'content': '<div style="margin-bottom:0px; !important;" class="alert alert-success"><button class="close" data-dismiss="alert"></button><strong>Success! ' + data + ' </strong> </div>'
                            });
                            setTimeout(function() {
                                $.fancybox.close();
                                window.location = $('#base_url').val() + 'tests_admin/manage_quiz';

                            }, 180000);
                            window.location = $('#base_url').val() + 'tests_admin/manage_quiz';
                        }
                        else {
                            alert(data);
                            $.fancybox({
                                'content': '<div style="margin-bottom:0px; !important;" class="alert alert-error"><button class="close" data-dismiss="alert"></button><strong>Error! ' + data + ' </strong> </div>'
                            });
                            setTimeout(function() {
                                $.fancybox.close();
                                window.location = $('#base_url').val() + 'tests_admin/manage_quiz';

                            }, 1800);
//                        $('#inline1_email_confirm').html('<div style="margin-bottom:0px; !important;" class="alert alert-error"><button class="close" data-dismiss="alert"></button><strong>Error! '+data+' </strong> </div>');
//                        $("#email_confirm_chooser").fancybox().trigger('click');
//                        setTimeout(function() {
//                            $.fancybox.close();
//                            
//                        }, 55500);

                        }
                    }
                });
            } else {
                
                 $.fancybox({
                    'width': 500,
                    'height': 200,
                    'scrolling': 'no',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'showCloseButton': false,
                    'transitionIn': 'fade',
                    'transitionOut': 'fade',
                    'href': $('#base_url').val() + "tests_admin/notification_question_required",
                });

            }
        }
    });

    //open question form in iframe
    $("#add_new_question").fancybox({
	 	'height': '437',
        'transitionIn': 'fadein',
        'transitionOut': 'fadeout',
        onClosed: function() {
            //make ajax call to get all questions of that id and list on page
            var temp_id = $('#tmp_q_id').val();
            get_all_questions(temp_id);
        }
    });

    //validate create quiz question form
    $.validator.addMethod("radioSelected", function(value, element) {
        if ($("input[name='answer']:checked").length > 0)
            return true;
        else
            return false;
    }, "* Please select the correct option!");

    $("#add_question_form").validate({
        rules: {
            question: "required",
            option_1: "required",
            option_2: "required",
			option_3: "required",
			option_4: "required",
            answer: {
                radioSelected: true
            }
        },
        messages: {
            question: "Please provide question text.",
            option_1: "This field is required.",
            option_2: "This field is required.",
			option_3: "This field is required.",
			option_4: "This field is required.",
            answer: {
                radioSelected: 'Please select the correct option.'
            }
        },
        errorClass: 'error_class',
        success: function(error_label) {
            error_label.hide();
        },
        submitHandler: function(form) {
            //send ajax call to save the question, on success close iframe
            var form_data = $("#add_question_form").serialize();
            var post_url = $('#base_url').val() + "tests_admin/save_new_question/";
            $.ajax({
                url: post_url,
                type: "POST",
                data: form_data,
                context: document.body,
                cache: false,
                success: function(data) {
var sclass = 'alert-success';
                    if (!data.match(/Oops!/)) {
                        if (data.match(/close/)) {
                            alert("Question Saved Successfully!");
                            //alert(data);
                            $("#add_question_form")[0].reset();
                            parent.$.fancybox.close();
                        }
                        else {
                            
                            alert("Question Saved Successfully!");
                            $("#add_question_form")[0].reset();
                            window.location.reload();
                        }
                    }
                    else {
                        alert(data);
                        $("#add_question_form")[0].reset();
                    }
                }
            });
        }
    });

});

//validate create question form
function validate_question_form() {
    var new_id = parseInt($('#l_op_id').val());
    var child_id = new_id + 2;
    var err = '';
    if ($("input[name=answer]:checked").length <= 0) {
        err = '<span class="error">Please select the correct option.</span>';
    }

    var opt_vals = $("#add_quuestion form input[name='ans_opts']").map(function() {
        return $(this).val();
    }).get();
    alert(opt_vals);

    $('#error_quest_tr').remove();

    if (err != '') {
        $("#add_quest_tbl tr:nth-child(" + child_id + ")").after('<tr id="error_quest_tr"><td>' + err + '</td></tr>');
    }
    else
        alert('form validation ended');
}

function open_add_question_box() {
    var temp_id = $('#tmp_q_id').val();
    var load_url = ($('#base_url').val() + 'tests_admin/create_new_question/' + temp_id);
//    var load_url = ($('#base_url').val() + 'tests_admin/create_new_question/');
    ///alert(load_url);
    //$("#btnAddQuestion").fancybox({
    $("#email_confirm_chooser").fancybox({
       'href': load_url,
        'width': '50%',
        'height': '100%',
        'autoScale': true,
        'transitionIn': 'fadein',
        'transitionOut': 'fadeout',
        'type': 'iframe',
        onClosed: function() {
            $('#save_cancel_container').show();
        }
    }).trigger('click');

}

/* add new text field of options in question */
function addoptionfield() {
	
    var new_id = parseInt($('#l_op_id').val());
    var child_id = new_id + 4;
    var child_id_remove = child_id + 1;
    $("#add_quest_tbl tr:nth-child(" + child_id + ")").after('<tr id="fieldId_'+child_id_remove+'"><td><input type="radio" name="answer" value="option_' + new_id + '"></td><td><input type="text" class="required m-wrap large" name="option_' + new_id + '" style="height: 35px;" id="option_' + new_id + '" /><a href="'+"javascript:remove_fields('"+child_id_remove+"')"+'"> Remove</a></td></tr>');
    $('#l_op_id').val(new_id + 1);
}
function remove_fields(id){
    //$("#add_quest_tbl tr:nth-child(" + id + ")").remove();
    $("#fieldId_" + id + "").remove();
    var new_id = parseInt($('#l_op_id').val());
    $('#l_op_id').val(new_id - 1);
}
function save_create_test() {

    // serializing form data to pass to the php server
    var q_s = $('#create_new_test form').serialize();
    /// submit form through ajax
    $.ajax({
        url: $('#base_url').val() + "tests_admin/save_create_test/",
        type: "POST",
        data: q_s,
        context: document.body,
        cache: false,
        success: function(data) {
            if (data.match(/::/)) {
                var id = data.split(/::/);
                $('#last_id').val(id[1]);
                //$('#create_test_msg_container').html(id[0]);

                $('#inline1_email_confirm').html('<div style="margin-bottom:0px; !important;" class="alert alert-success"><button class="close" data-dismiss="alert"></button><strong>Success! ' + id[0] + ' </strong> </div>');
                $("#email_confirm_chooser").fancybox().trigger('click');
                setTimeout(function() {
                    $.fancybox.close();
                    window.location.reload();
                }, 1800);
            }
            else{
                $('#inline1_email_confirm').html('<div style="margin-bottom:0px; !important;" class="alert alert-error"><button class="close" data-dismiss="alert"></button><strong>Error! ' + id[0] + ' </strong> </div>');
                $("#email_confirm_chooser").fancybox().trigger('click');
                setTimeout(function() {
                    $.fancybox.close();
                }, 2500);
               // $('#create_test_msg_container').html(data);
            }
                
                
        }
    });

}

function update_test() {

    // serializing form data to pass to the php server
    var q_s = $('#edit_test form').serialize();
    var test_id = $('#test_id').val();
    var base_url = $('#base_url').val();
    var cs = '';
    var cstxt = '';
    /// submit form through ajax
    $.ajax({
        url: $('#base_url').val() + "tests_admin/update_test/",
        type: "POST",
        data: 'test_id=' + test_id + "&" + q_s,
        context: document.body,
        cache: false,
        success: function(data) {
            
            if (data.match(/success/i)) {
                base_url = base_url + "tests_admin/";
                cs = 'success';
                cstxt = 'Success';
                
            }
            else{
                 base_url = base_url + "tests_admin/edit_test?id=" + test_id;
                 cs = 'error';
                 cstxt = 'Error';
            }
               
            $.fancybox({
                'content': '<div style="margin-bottom:0px; !important;" class="alert alert-'+cs+'"><button class="close" data-dismiss="alert"></button><strong>'+cstxt+'! ' + data + ' </strong> </div>',
                onClosed: function() {
                    window.location = base_url;
                }
            });
            setTimeout(function() {
                $.fancybox.close();
                window.location = base_url;
            }, 1800);
        }
    });

}

function remove_test(id) {
    $('<div></div>').appendTo('body')
            .html('<div><h6>Are you sure you want to delete!</h6></div>')
            .dialog({
        modal: true, title: 'Removing confirmation', zIndex: 10000, autoOpen: true,
        width: 'auto', resizable: false,
        buttons: {
            Yes: function() {

                delete_test(id);

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

function delete_test(id) {
    var q_s = 'id=' + id;
    $.ajax({
        url: $('#base_url').val() + "tests_admin/delete_test/",
        type: "GET",
        context: document.body,
        data: q_s,
        cache: false,
        success: function(data) {
            if (data) {
                
                var str_arr = data.split('#@2nd@#');
                var sclass = 'alert-error';
                if (str_arr[0] == '1'){
                    $('#test_row_' + id).remove();
                    sclass = 'alert-success';
                }
                //alert(data);
                $.fancybox({
                    'content': '<div style="margin-bottom:0px; !important;" class="alert '+sclass+'"><button class="close" data-dismiss="alert"></button><strong>' + str_arr[1] + ' </strong> </div>'
                });
                
                setTimeout(function() {
                    $.fancybox.close();

                }, 3000);
            }
            else {
                alert('Error while removing, please try again!');
            }
        }
    });
}

function view_test_details(id) {

    $.ajax({
        url: $('#base_url').val() + "tests_admin/view_test_details/",
        type: "POST",
        context: document.body,
        data: "id=" + id,
        cache: false,
        success: function(data) {
            $.fancybox({
                'content': data
            });
        }
    });

}
function view_quiz_details(id) {

    $.ajax({
        url: $('#base_url').val() + "tests_admin/view_quiz_details/",
        type: "POST",
        context: document.body,
        data: "id=" + id,
        cache: false,
        success: function(data) {
            $.fancybox({
                'content': data
            });
        }
    });

}

function get_all_questions(tmp_id) {
    $.ajax({
        url: $('#base_url').val() + "tests_admin/get_all_questions/",
        type: "POST",
        context: document.body,
        data: "quiz_id=" + tmp_id,
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
function get_quiz_question(quz_id, ques_id) {
    var load_url = ($('#base_url').val() + 'tests_admin/open_question/' + quz_id + '/' + ques_id);
    $("#edit_quest").fancybox({
        'href': load_url,
        'width': '50%',
        'height': '100%',
        'autoScale': true,
        'transitionIn': 'fadein',
        'transitionOut': 'fadeout',
        'type': 'iframe',
        onClosed: function() {
            $('#save_cancel_container').show();
            get_all_questions(quz_id);

        }
    }).trigger('click');
}

function cancel_save_quiz() {
    var temp_quiz_id = $('#tmp_q_id').val();
    $('<div></div>').appendTo('body')
            .html('<div><h6>Are you sure you want to cancel, All information will be lost!</h6></div>')
            .dialog({
        modal: true, title: 'Cancel Quiz Confirmation', zIndex: 10000, autoOpen: true,
        width: 'auto', resizable: false,
        buttons: {
            Yes: function() {

                delete_temp_questions(temp_quiz_id);

                $(this).dialog("close");

            },
            No: function() {
                $(this).dialog("close");
                return false;
            }
        },
        close: function(event, ui) {
            $(this).remove();
            return false;
        }
    });
}

function delete_temp_questions(quiz_id) {
    var base_url = $('#base_url').val();
    $.ajax({
        url: $('#base_url').val() + "tests_admin/delete_temp_questions/",
        type: "POST",
        context: document.body,
        data: "quiz_id=" + quiz_id,
        cache: false,
        success: function(data) {
            window.location = base_url + "tests_admin/"
        }
    });
}

/**
 * function to validate date of birth on client side
 * @param {type} dob
 * @returns {Boolean}
 */
function validate_date(date) {
    if (isDate(date))
        return true;
    else
        return false;
}

function isDate(txtDate)
{
    var currVal = txtDate;
    if (currVal == '')
        return false;

    //Declare Regex  
    var rxDatePattern = /^(\d{1,2})(\/|-)(\d{1,2})(\/|-)(\d{4})$/;
    var dtArray = currVal.match(rxDatePattern); // is format OK?

    if (dtArray == null)
        return false;

    //Checks for mm/dd/yyyy format.
    dtMonth = dtArray[1];
    dtDay = dtArray[3];
    dtYear = dtArray[5];

    if (dtMonth < 1 || dtMonth > 12)
        return false;
    else if (dtDay < 1 || dtDay > 31)
        return false;
    else if ((dtMonth == 4 || dtMonth == 6 || dtMonth == 9 || dtMonth == 11) && dtDay == 31)
        return false;
    else if (dtMonth == 2)
    {
        var isleap = (dtYear % 4 == 0 && (dtYear % 100 != 0 || dtYear % 400 == 0));
        if (dtDay > 29 || (dtDay == 29 && !isleap))
            return false;
    }
    return true;
}

function delete_quiz_question(qzid, quid) {
    $('<div></div>').appendTo('body')
            .html('<div><h6>Are you sure you want to delete!</h6></div>')
            .dialog({
        modal: true, title: 'Removing confirmation', zIndex: 10000, autoOpen: true,
        width: 'auto', resizable: false,
        buttons: {
            Yes: function() {

                delete_question(qzid, quid);

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

function delete_question(qzid, quid) {
    var q_s = 'id=' + quid;
    $.ajax({
        url: $('#base_url').val() + "tests_admin/delete_question/",
        type: "POST",
        context: document.body,
        data: {qz_id: qzid, qu_id: quid},
        cache: false,
        success: function(data) {
            if (data) {
                $('#question_row_' + quid).remove();
                //alert(data);
                
                var str_arr = data.split('#@2nd@#');
                console.log(str_arr[2]);
                if (str_arr[2] != '1')
                    $('#question_added').val('2');
                else
                    $('#question_added').val('1');
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


function remove_quiz(qzid) {
    $('<div></div>').appendTo('body')
            .html('<div><h6>Are you sure you want to delete!</h6></div>')
            .dialog({
        modal: true, title: 'Removing confirmation', zIndex: 10000, autoOpen: true,
        width: 'auto', resizable: false,
        buttons: {
            Yes: function() {

                delete_quiz(qzid);

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

function delete_quiz(qzid) {
    $.ajax({
        url: $('#base_url').val() + "tests_admin/delete_quiz/",
        type: "POST",
        context: document.body,
        data: {qz_id: qzid},
        cache: false,
        success: function(data) {
            if (data) {
                var str_arr = data.split('#@2nd@#');
                var sclass = 'alert-error';
                if (str_arr[0] == '1'){
                    $('#test_row_' + qzid).remove();
                    sclass = 'alert-success';
                }
                //alert(data);
                $.fancybox({
                    'content': '<div style="margin-bottom:0px; !important;" class="alert '+sclass+'"><button class="close" data-dismiss="alert"></button><strong>' + str_arr[1] + ' </strong> </div>'
                });
                
                setTimeout(function() {
                    $.fancybox.close();

                }, 3000);
            }
            else {
                //alert('Error while removing, please try again!');
                $.fancybox({
                    'content': '<div style="margin-bottom:0px; !important;" class="alert alert-error"><button class="close" data-dismiss="alert"></button><strong>Error! ' + data + ' </strong> </div>'
                });
                setTimeout(function() {
                    $.fancybox.close();

                }, 1800);
            }
        }
    });
}

function close_question_notification()
{
    //$.fancybox.close();
    var temp_id = $('#tmp_q_id').val();
    var load_url = ($('#base_url').val() + 'tests_admin/create_new_question/' + temp_id);
    $("#email_confirm_chooser").fancybox({
       'href': load_url,
        'height': '437',
        'transitionIn': 'fadein',
        'transitionOut': 'fadeout',
        'type': 'iframe',
        onClosed: function() {
            $('#save_cancel_container').show();
            var temp_id = $('#tmp_q_id').val();
            get_all_questions(temp_id);
        }
    }).trigger('click');
}