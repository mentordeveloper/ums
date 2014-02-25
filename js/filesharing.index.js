
$(document).ready(function(e) {
	
	$('#field_courses').change(function() {
		
		if($("#type").val() == 0 ){		
			field_course_fileshare();	
		}
		
	});
				
	if($("#type").val() == 0 ){
		field_course_fileshare();
	}
	
	if($("#type").val() == 1 ){
		
		$('#folderid').val($('#folder_name_selected :selected').val());
	    var event_ids = '';
		
		if(document.getElementById("event_ids_main")){
			event_ids = $('#event_ids_main').val();
		}
	
    $("#fileupload").uploadify({
        'formData': {
            'hash': $('#hash').val(),
            'userid': $('#userid').val(),
            'event_ids': $('#event_ids_main').val(),
            'folder1': document.getElementById("folderid").value,
        },
        height: 30,
        swf: $('#base_url').val() + 'files/uploadify/uploadify.swf',
        uploader: $('#base_url').val() + 'filesharing/fileuploading',
        width: 200,
        maxQueueSize: 10,
        messages: {
            'maxNumberUploadError': 'Exceded number of upload.',
            'nothingInTheQueueError': 'Nothing in the Queue'
        },
        'auto': false,
        'onUploadSuccess': function(file, data, response) {
            sucess_file_uploading();
        },
    });
		
	}
	
});


function add_event_class(text_value) {

    var text_value = $("#folder_name_selected :selected").text();

    if (text_value == 'Video lessons') {

        $('<div></div>')
                .appendTo('body')
                .html(
                '<div><h6>Do you want to create Class type event for this Upload?</h6></div>')
                .dialog({
            modal: true,
            title: 'Sending confirmation',
            zIndex: 10000,
            autoOpen: true,
            width: 'auto',
            resizable: false,
            buttons: {
                Yes: function() {

                    $(this).remove();
                    create_class_event_type();
                },
                No: function() {

                    $(this).remove();

                }
            },
            close: function(event, ui) {
                $(this).remove();
            }
        });
    }
}

function save_class_event() {

    var date_val = $('#date_selector_event').val();
    var course_id = $('#field_courses :selected').val();
    var hash_file = $('#hash').val();

    if (date_val == '') {
        $('#error').html('<span class="error">Please select date!</span>');
        return;
    }

    if (course_id == 0) {
        $('#error').html('<span class="error">Please select course!</span>');
        return;
    }

    $.ajax({
        url: $('#base_url').val() + "filesharing/event_add_class_final/",
        type: "GET",
        data: 'date=' + date_val + "&course_id=" + course_id + "&file_hash=" + hash_file,
        context: document.body,
        cache: false,
        success: function(data) {

            $('#list_pop_types').html(data);
            $("#events_type_list").fancybox().trigger('click');

            setTimeout(function() {
                $.fancybox.close();
            }, 1300);

        }
    });

}

function create_class_event_type() {

    $.ajax({
        url: $('#base_url').val() + "filesharing/event_add_class/",
        type: "GET",
        context: document.body,
        cache: false,
        success: function(data) {

            $('#list_pop_types').html(data);
            $("#events_type_list").fancybox().trigger('click');

        }

    });

}

function upload_file_sharing() {

    var text_value = $('#folder_name_selected :selected').text();

    if (text_value == 'Video lessons')
    {

        var course = $("#field_courses option:selected").text();

        if (course == 'All' || course == 'School Calendar' || course == 'Personal')
        {

            $('#msg_user').html('<div style="margin-bottom:0px; !important;width:300px" class="alert alert-info"><button class="close" data-dismiss="alert"></button>Please select course !</strong></div>');
            $("#global_use_msg").fancybox().trigger('click');

            setTimeout(function() {
                $.fancybox.close();
            }, 1300);

            return false;
        }

    }

    if ($('#folder_name_selected').val() == 'none') {

        $('#msg_user').html('<div style="margin-bottom:0px; !important;width:300px" class="alert alert-info"><button class="close" data-dismiss="alert"></button>Please Select folder to upload!</strong></div>');

        $("#global_use_msg").fancybox().trigger('click');

        setTimeout(function() {
            $.fancybox.close();
        }, 1300);

        return;
    }

    if ($('#file_upload_generic').val() == '') {
        $('#success_uploading').html(
                '<span class="error">Please Select your uploads!</span>')
                .show().delay(1800).slideUp(2000);
        ;
        return;
    }

    $('#fileupload').uploadify('upload', '*');

}

function sucess_file_uploading() {
    var value = document.getElementById("folderid").value;
	
	
    $
            .ajax({
        url: $('#base_url').val() + "filesharing/insert_file_sharing_now/",
        type: "GET",
        data: "folder_name=" + value,
        context: document.body,
        cache: false,
        success: function(data) {

            if (data == 'bad') {
                $('#error')
                        .html(
                        '<span class="error">Something went wrong please try again uploading!</span>')
                        .show().delay(1800).slideUp(2000);
                return false;

            } else {
                $('#html_all_fodlers').html(data);
                add_event_class();
            }

        }

    });

}

function update_name_instant(id) {

    var value = "rename_" + id;

    $.ajax({
        url: $('#base_url').val() + "filesharing/rename_field_file/",
        type: "GET",
        context: document.body,
        data: "id=" + id + "&new_name=" + $('#' + value).val(),
        cache: false,
        success: function(data) {

            refresh_ui();

        }
    });

}
function select_current_folder()
{

    $('#folderid').val($('#folder_name_selected :selected').val());
    var event_ids = '';
    if(document.getElementById("event_ids_main")){
        event_ids = $('#event_ids_main').val();
    }
    console.log(event_ids);
    $("#fileupload").uploadify({
        'formData': {
            'hash': $('#hash').val(),
            'userid': $('#userid').val(),
            'event_ids': $('#event_ids_main').val(),
            'folder1': document.getElementById("folderid").value,
        },
        height: 30,
        swf: $('#base_url').val() + 'files/uploadify/uploadify.swf',
        uploader: $('#base_url').val() + 'filesharing/fileuploading',
        width: 200,
        maxQueueSize: 10,
        messages: {
            'maxNumberUploadError': 'Exceded number of upload.',
            'nothingInTheQueueError': 'Nothing in the Queue'
        },
        'auto': false,
        'onUploadSuccess': function(file, data, response) {
            $("#folder_name_selected")[0].selectedIndex=0;
            
            $("#folder_name_selected").val("none");
            $("#folderid").val("none");
//            console.log(data);
            var data_arr = data.split('@2nd@');
//            console.log(data_arr);
            if(data_arr[1]!='')
                $('#hash').val(data_arr[1]);
            
//            console.log($('#hash').val());
            
            $('#bind_event').prop('checked', false);
            
            $("#event_ids").val('');
            $("#event_ids_main").val('');
            $("#events_txt").html('');

            if (data == 0)
            {
                alert('Some error occurs while uploading! please try in few seconds')
            }
        },
        'onQueueComplete': function(queueData) {
            sucess_file_uploading();
            $("#folderid option[value='none']").attr("selected", "selected");
        }
    });

    $.ajax({
        url: $('#base_url').val() + "filesharing/selected_folder/",
        type: "GET",
        data: "selected_folder=" + $('#folder_name_selected :selected').val(),
        context: document.body,
        cache: false,
        success: function(data) {



        }

    });

}
function refresh_ui() {


    $('#inline1_email_confirm').html('<div style="margin-bottom:0px; !important;width:200px" class="alert alert-success"><button class="close" data-dismiss="alert"></button><strong>Success!</strong> Please wait ...! </strong></div>');

    $("#email_confirm_chooser").fancybox().trigger('click');


    $.ajax({
        url: $('#base_url').val() + "filesharing/refresh_ui/",
        type: "GET",
        context: document.body,
        cache: false,
        success: function(data) {

            $('#html_all_fodlers').html(data);

            setTimeout(function() {
                $.fancybox.close();
            }, 1200);


        }
    });

}

function Rename_this_file(id) {

    $.ajax({
        url: $('#base_url').val() + "filesharing/get_request_rename/",
        type: "GET",
        context: document.body,
        data: "id=" + id,
        cache: false,
        success: function(data) {
            $('#' + id).html(data);
        }

    });

}

function drop_down_refresh() {

    $.ajax({
        url: $('#base_url').val() + "filesharing/drop_down_refresh/",
        type: "GET",
        context: document.body,
        cache: false,
        success: function(data) {
            $('#new_dropdown').html(data);
        }

    });

}

function remove_call_confirm_folder(id) {

    $.ajax({
        url: $('#base_url').val() + "filesharing/remove_folder_files/",
        type: "GET",
        data: "folder_id=" + id,
        context: document.body,
        cache: false,
        success: function(data) {
            $('#html_all_fodlers').html(data);
        }

    });

}

function remove_call_confirm(id) {

    $
            .ajax({
        url: $('#base_url').val() + "filesharing/remove_file_by_id/",
        type: "GET",
        data: "file_id=" + id,
        context: document.body,
        cache: false,
        success: function(data) {

            if (data == 'bad') {
                $('#error')
                        .html(
                        '<span class="error">Folder name already exists!</span>');
                return false;
            } else {
                $('#html_all_fodlers').html(data);
            }

        }

    });

}
function generate_html_share_file() {
    var path = '';
    path = $('#base_url').val() + "filesharing/generate_share_file_html/";
    // it generates html for the courses
    $.ajax({
        url: path,
        type: "GET",
        context: document.body,
        cache: false,
        success: function(data) {
            $('#inline1_notification').html(data);
            $("#notification_chooser").fancybox().trigger('click');
        }
    });
}

function filterFileInvitees(ob) {
    $.ajax({
        url: $('#base_url').val() + "filesharing/generate_share_file_html/",
        type: "GET",
        data: {
            query: $('#file-share-searching').val()
        },
        context: document.body,
        cache: false,
        success: function(data) {
            $('#file-share-students').html(data);
        }

    });
}

function filterFilegroup(ob) {
    $.ajax({
        url: $('#base_url').val() + "filesharing/instant_search_group/",
        type: "GET",
        data: {
            query: $('#file-group-searching').val()
        },
        context: document.body,
        cache: false,
        success: function(data) {

            $('#file-share-group').html(data);
        }

    });
}
function ui_access_trigger() {

    var master = '';
    var selectors_ids = new Array();
    var counter = 0;

    $("input[name='options[]']:checked").each(function() {

        if ($(this).val() == 'all') {
            master = 'all';
        } else {
            selectors_ids[counter] = $(this).val();
        }

        counter++;

    });

    if (master == 'all') {
        return 'all';

    } else {
        return selectors_ids;
    }

}
function ui_access2_trigger() {

    var master = '';
    var selectors_ids = new Array();
    var counter = 0;

    $("input[name='myoptions[]']:checked").each(function() {

        if ($(this).val() == 'all') {
            master = 'all';
        } else {
            selectors_ids[counter] = $(this).val();

        }

        counter++;

    });

    if (master == 'all') {
        return 'all';

    } else {
        return selectors_ids;
    }

}

function trigger_share_group(id) {

    var return_data = ui_access2_trigger();
    if (return_data == '') {
        $('#notifications_send').html('Please select group');
        $('#notification_sended').slideDown('slow', function() {
            $('#notification_sended').delay(1800).slideUp(2000);
        });

    } else {

        var res = '';
        var success = 0;

        for (var k = 0; k < return_data.length; k++) {
            res = share_events_by_group(return_data[k], id);

            if (res) {
                success++;
            }
        }

        $('#notifications_send').html(
                '<span class="success">File Shared!</span>');
        $('#File Shared').slideDown('slow', function() {
            $('#notification_sended').delay(1800).slideUp(2000);
        });
        $('#inline1_email_confirm').html('<div style="margin-bottom:0px; !important;width:200px" class="alert alert-success"><button class="close" data-dismiss="alert"></button><strong>Success!</strong> File Shared!</strong></div>');
        $("#email_confirm_chooser").fancybox().trigger('click');
        setTimeout(function() {
            $.fancybox.close();
        }, 1200);
    }

}

function trigger_share_files(id) {
    var return_data = ui_access_trigger();

    if (return_data == '') {
        $('#notifications_send')
                .html(
                '<div class="alert alert-error"><button data-dismiss="alert" class="close"></button><strong>Error! </strong>Please select user </div>');
        $('#notification_sended').slideDown('slow', function() {
            $('#notification_sended').delay(1800).slideUp(2000);
        });

    } else if (return_data == 'all') {
        // ////////////if its 0 then 1 thing is confirm it should display
        // notification

        $('<div></div>').appendTo('body').html(
                '<div><h6>Send message to students in all courses?</h6></div>')
                .dialog(
                {
                    modal: true,
                    title: 'Sending confirmation',
                    zIndex: 10000,
                    autoOpen: true,
                    width: 'auto',
                    resizable: false,
                    buttons: {
                        Yes: function() {

                            share_events_by_all_user('all');

                            $(this).dialog("close");

                            $('#inline1_email_confirm').html(
                                    'Event Shared!');
                            $("#email_confirm_chooser").fancybox()
                                    .trigger('click');

                        },
                        No: function() {
                            $(this).dialog("close");
                        }
                    },
                    close: function(event, ui) {
                        $(this).remove();
                    }
                });
        // /////////////////aler code end
    } else {
        var res = '';
        var success = 0;

        for (var k = 0; k < return_data.length; k++) {
            res = share_events_by_user(return_data[k], id);

            if (res) {
                success++;
            }
        }

        $('#notifications_send').html(
                '<span class="success">File Shared!</span>');
        $('#File Shared').slideDown('slow', function() {
            $('#notification_sended').delay(1800).slideUp(2000);
        });
        $('#inline1_email_confirm').html('<div style="margin-bottom:0px; !important;width:200px" class="alert alert-success"><button class="close" data-dismiss="alert"></button><strong>Success!</strong> File Shared!</strong></div>');
        $("#email_confirm_chooser").fancybox().trigger('click');

        setTimeout(function() {
            $.fancybox.close();
        }, 1300);

    }
}

function share_events_by_group(group, file) {

    $.ajax({
        url: $('#base_url').val() + "filesharing/share_files_by_group/",
        type: "GET",
        data: "group_id=" + group + "&main_id=" + file,
        context: document.body,
        cache: false,
        success: function(data) {

            return 1;

        }
    });

}
function share_events_by_user(id, file) {

    $.ajax({
        url: $('#base_url').val() + "filesharing/share_files_by_id/",
        type: "GET",
        data: "reciever_id=" + id + "&main_id=" + file,
        context: document.body,
        cache: false,
        success: function(data) {

            return 1;
        }
    });

}
function Open_share_user(id) {

    $.ajax({
        url: $('#base_url').val() + "filesharing/generate_share_file_html/",
        type: "GET",
        data: "file_id=" + id,
        context: document.body,
        cache: false,
        success: function(data) {

            $('#list_pop_types').html(data);
            $("#events_type_list").fancybox().trigger('click');

        }

    });

}
function Open_share_group(id) {

    $.ajax({
        url: $('#base_url').val() + "filesharing/instant_search_group/",
        type: "GET",
        data: "file_id=" + id,
        context: document.body,
        cache: false,
        success: function(data) {

            if (data == 0)
            {
                $('#list_pop_types').html('<div style="margin-bottom:0px; !important;width:200px" class="alert alert-error"><button class="close" data-dismiss="alert"></button><strong>Error! </strong> No group found!</strong></div>');
                $("#events_type_list").fancybox().trigger('click');

                setTimeout(function() {
                    $.fancybox.close();
                }, 1300);

            } else
            {
                $('#list_pop_types').html(data);
                $("#events_type_list").fancybox().trigger('click');

            }

        }

    });

}

function share_call_confirm(id) {

    $.ajax({
        url: $('#base_url').val() + "filesharing/share_file_popup/",
        type: "GET",
        data: "file_id=" + id,
        context: document.body,
        cache: false,
        success: function(data) {

            $('#list_pop_types').html(data);
            $("#events_type_list").fancybox().trigger('click');

        }

    });

}

function Remove_this_folder(id) {


    $('<div></div>').appendTo('body').html(
            '<div><h6>Delete <b>' + $('#folder_name_field' + id).val() + '?</b></h6></div>').dialog({
        modal: true,
        title: 'Remove Confirmation',
        zIndex: 10000,
        autoOpen: true,
        width: 'auto',
        resizable: false,
        buttons: [{
                text: 'Delete',
                click: function() {
                    remove_call_confirm_folder(id);
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

function Remove_this_file(id) {


    $('<div></div>').appendTo('body').html(
            '<div><h6>Delete <b>' + $('#file_name_field' + id).val() + ' ?</b></h6></div>').dialog({
        modal: true,
        title: 'Remove Confirmation',
        zIndex: 10000,
        autoOpen: true,
        width: 'auto',
        resizable: false,
        buttons: [{
                text: 'Delete',
                click: function() {
                    remove_call_confirm(id);
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

/*
 * add folder script in js
 */

function Add_btn_folder_new() {


    if ($('#folder_name').val() == '') {

        $('#msg_user').html('<div class="alert alert-error" style="margin-bottom:0px; !important;width:270px"><button data-dismiss="alert" class="close"></button><strong>Error!</strong> Please enter folder name to create</div>');
        $("#global_use_msg").fancybox().trigger('click');

        setTimeout(function() {
            $.fancybox.close();
        }, 1300);

        return false;


    }
	
	var course = $("#field_courses option:selected").val();
	
    $.ajax({
        url: $('#base_url').val() + "filesharing/add_folder_name/",
        type: "GET",
        data: "folder_name=" + $("#folder_name").val()+"&co_id="+course,
        context: document.body,
        cache: false,
        success: function(data) {
			if(data == 0){
				
					$('#msg_user')
													.html(
													'<div class="alert alert-error" style="margin-bottom:0px;width:200px;"><button data-dismiss="alert" class="close"></button><strong>Please Select course to ad folder!</strong> </div>');
											$("#global_use_msg").fancybox().trigger('click');
								
											setTimeout(function() {
												$.fancybox.close();
											}, 2000);
				
				}
            if (data == 'bad') {
                $('#error')
                        .html(
                        '<div class="alert alert-error"><button data-dismiss="alert" class="close"></button>									<strong>Error!</strong> Folder name already exists!</div>')
                        .show().delay(1800);
                return false;

            } else {
                $('#folder_name').val('');
                $('#html_all_fodlers').html(data);
                $('#error')
                        .html(
                        '<div class="alert alert-success"><button data-dismiss="alert" class="close"></button>									<strong>Success!</strong> New folder added </div>')
                        .show();
                $('#no_folder').hide();
                drop_down_refresh();


            }

        }

    });
}

function Download_instant_zip(id) {


    $.ajax({
        url: $('#base_url').val() + "filesharing/check_if_folder_empty/",
        type: "GET",
        data: "id=" + id,
        context: document.body,
        cache: false,
        success: function(data) {

            if (data == 'empty')
            {
                $('#inline1_email_confirm').html('<div style="margin-bottom:0px; !important;width:200px" class="alert alert-error"><button class="close" data-dismiss="alert"></button><strong>Error! </strong> Empty Folder!</strong></div>');

                $("#email_confirm_chooser").fancybox().trigger('click');

                setTimeout(function() {
                    $.fancybox.close();
                }, 1300);
            } else
            {
                $('#download_id').attr('src',
                        $('#base_url').val() + "filesharing/hard_download_zip?id=" + id);
            }

        }

    });


}
function Download_instant(id) {

    $('#download_id').attr('src',
            $('#base_url').val() + "filesharing/hard_download?id=" + id);

}

function field_course_fileshare() {
	
    $.ajax({
        url: $('#base_url').val() + "filesharing/get_files_shared/",
        type: "GET",
        data: "course_selected="+$("#field_courses :selected").val(),
        context: document.body,
        cache: false,
        success: function(data) {

            if (data == 'bad') {
                $('#error')
                        .html(
                        '<span class="error">Folder name already exists!</span>')
                        .show().delay(1800).slideUp(2000);
                ;
                return false;
            } else {
                $('#html_all_fodlers').html(data);

            }

        }

    });

}


$(document).on("change",'#bind_event',function() {
    
    if($('#bind_event').is(':checked')){
        var path = '';
        path = $('#base_url').val() + "filesharing/generate_event_html_list/";
        // //it geneeretes html for the courses

        $.ajax({
            url: path,
            type: "GET",
            context: document.body,
            cache: false,
            success: function(data) {

                 $('#inline1_email_confirm').html(data);
                 $("#email_confirm_chooser").fancybox().trigger('click');
            }

        }); 
    }else{
        $("#events_txt").html("");
        $('#bind_event').prop('checked', false);
    }
    
});
$(document).on("click","#close_events_html",function(){
    $.fancybox.close();
});
$(document).on("keydown",'#event_tags',function() {
        function split(val) {
            return val.split(/,\s*/);
        }
        function extractLast(term) {
            return split(term).pop();
        }
        $("#event_tags")
// don't navigate away from the field on tab when selecting an item
                .bind("keydown", function(event) {
            if (event.keyCode === $.ui.keyCode.TAB &&
                    $(this).data("ui-autocomplete").menu.active) {
                event.preventDefault();
            }
        })
                .autocomplete({
            source: function(request, response) {
                $.getJSON($("#base_url").val() + "feeds/event_search", {
                    term: extractLast(request.term)
                }, response);
            },
            search: function() {
// custom minLength
                var term = extractLast(this.value);
                if (term.length < 2) {
                    return false;
                }
            },
            focus: function() {
// prevent value inserted on focus
                return false;
            },
            select: function(event, ui) {
                var terms = split(this.value);
// remove the current input
                terms.pop();
// add the selected item
                if (ui.item.value != "No Record Found") {
                    terms.push(ui.item.value);
                    // add placeholder to get the comma-and-space at the end
                    terms.push("");
                    this.value = terms.join(", ");

                    var event_id = split($("#event_ids").val());
                    // remove the current input
                    event_id.pop();
                    // add the selected item
                    event_id.push(ui.item.id);
                    // add placeholder to get the comma-and-space at the end
                    event_id.push("");
                    $("#event_ids").val(event_id.join(", "));
                    $("#event_ids_main").val($("#event_ids").val());
                    $("#events_txt").html(this.value);

                }
                return false;
            }
        });
    });
    
    function Open_share_event_list(id) {
        var path = '';
        path = $('#base_url').val() + "filesharing/generate_event_html_list_file/";
        // //it geneeretes html for the courses

        $.ajax({
            url: path,
            type: "GET",
            context: document.body,
            data: "file_id=" + id,
            cache: false,
            success: function(data) {
                if (data == 0)
                {
                    $('#inline1_email_confirm').html('<div style="margin-bottom:0px; !important;width:200px" class="alert alert-error"><button class="close" data-dismiss="alert"></button><strong>Error! </strong> No group found!</strong></div>');
                    $("#email_confirm_chooser").fancybox().trigger('click');

                    setTimeout(function() {
                        $.fancybox.close();
                    }, 1300);

                }
                else
                {
                     $('#inline1_email_confirm').html(data);
                     $("#email_confirm_chooser").fancybox().trigger('click');

                }
            
            }

        }); 
        
}

function share_event_file_update(fid){
     var path = '';
        path = $('#base_url').val() + "filesharing/u_f_r_t_e/";
      
        $.ajax({
            url: path,
            type: "GET",
            data: "file_id=" + fid+"&event_ids="+$("#event_ids_main").val(),
            context: document.body,
            cache: false,
            success: function(data) {
                console.log(data);
                if (data == 1)
                {
                    $('#inline1_email_confirm').html('<div style="margin-bottom:0px; !important;width:200px" class="alert alert-success"><button class="close" data-dismiss="alert"></button><strong>Success! </strong> File Share Successfully!</strong></div>');
                    $("#email_confirm_chooser").fancybox().trigger('click');

                    setTimeout(function() {
                        $.fancybox.close();
                    }, 1300);

                }
                else
                {
                     $('#inline1_email_confirm').html('<div style="margin-bottom:0px; !important;width:200px" class="alert alert-error"><button class="close" data-dismiss="alert"></button><strong>Error! </strong> No File Shared!</strong></div>');
                    $("#email_confirm_chooser").fancybox().trigger('click');

                    setTimeout(function() {
                        $.fancybox.close();
                    }, 1300);

                }
            }

        }); 
}

function v_a_v1(id)
{
    
    var string = '_f_v1';
    
    var selection = $('#'+id+string).is(':checked');
    
    var make = '';
    
    if(selection){
        make = 'private';
        selection = 1;
    }else{
        make = 'public';
        selection = 0;
    }
        
    var string_maker = 'Are you sure to make this folder '+make+'?';
    
    $('<div></div>').appendTo('body').html(
            '<div><h6><b>'+string_maker+'</b></h6></div>').dialog({
        modal: true,
        title: 'Remove Confirmation',
        zIndex: 10000,
        autoOpen: true,
        width: 'auto',
        resizable: false,
        buttons: [{
                text: 'Confirm',
                click: function() {
                    v_a_c_v1(id,selection);
                    $(this).remove();
                }
            }, {
                text: "Cancel",
                click: function() {
                    $('#'+id+string).prop('checked', false);
                    $(this).remove();
                }
            }],
        close: function(event, ui) {
            $(this).remove();
        }
    });
    
   
}

function v_a_c_v1(id,selection){
    
    $.ajax({
            url:  $('#base_url').val() + 'filesharing/m_p_c_v1/',
            type: "GET",
            context: document.body,
            cache: false,
            data: "id=" + id+'&selection='+selection,
            success: function(data) {
                
                if(data == 0){
                    alert('Some problem occured! please wait few minutes. ')
                }else{
                    
                    $('#msg_user').html('<div class="alert alert-success" style="margin-bottom:0px; !important;width:270px"><button data-dismiss="alert" class="close"></button><strong>Success!</strong> Permissions updated </div>');
                    $("#global_use_msg").fancybox().trigger('click');

                    setTimeout(function() {
                        $.fancybox.close();
                    }, 1300);

                }
                
            }

        }); 
    

}