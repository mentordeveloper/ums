// JavaScript Document
 var initTable1 = function() {
        /* Formating function for row details */

        function save_dt_view(oSettings, oData) {
            localStorage.setItem('DataTables_' + window.location.pathname, JSON.stringify(oData));
        }
        function load_dt_view(oSettings) {
            return JSON.parse(localStorage.getItem('DataTables_' + window.location.pathname));
        }
        function reset_dt_view() {
            localStorage.removeItem('DataTables_' + window.location.pathname);
        }

        function fnFormatDetails(oTable, nTr)
        {
            var aData = oTable.fnGetData(nTr);
            var sOut = '<table>';
            sOut += '<tr><td>Platform(s):</td><td>' + aData[2] + '</td></tr>';
            sOut += '<tr><td>Engine version:</td><td>' + aData[3] + '</td></tr>';
            sOut += '<tr><td>CSS grade:</td><td>' + aData[4] + '</td></tr>';
            sOut += '<tr><td>Others:</td><td>Could provide a link here</td></tr>';
            sOut += '</table>';

            return sOut;
        }

        /*
         * Insert a 'details' column to the table
         */
        var nCloneTh = document.createElement('th');
        var nCloneTd = document.createElement('td');
        nCloneTd.innerHTML = '<span class="row-details row-details-close"></span>';

        $('#sample_1 thead tr').each(function() {
            this.insertBefore(nCloneTh, this.childNodes[0]);
        });

        $('#sample_1 tbody tr').each(function() {
            this.insertBefore(nCloneTd.cloneNode(true), this.childNodes[0]);
        });

        /*
         * Initialse DataTables, with no sorting on the 'details' column
         */
        var oTable = $('#sample_1').dataTable({
            "bStateSave": true,
            "fnStateSave": function(oSettings, oData) {
                save_dt_view(oSettings, oData);
            },
            "fnStateLoad": function(oSettings) {
                return load_dt_view(oSettings);
            },
            "aoColumnDefs": [
                {"bSortable": false, "aTargets": [0]}
            ],
            "aaSorting": [[1, 'asc']],
            "aLengthMenu": [
                [5, 15, 20, -1],
                [5, 15, 20, "All"] // change per page values here
            ],
            // set the initial value
            "iDisplayLength": 5,
        });

        jQuery('#sample_1_wrapper .dataTables_filter input').addClass("m-wrap small"); // modify table search input
        jQuery('#sample_1_wrapper .dataTables_length select').addClass("m-wrap small"); // modify table per page dropdown
        jQuery('#sample_1_wrapper .dataTables_length select').select2(); // initialzie select2 dropdown

        /* Add event listener for opening and closing details
         * Note that the indicator for showing which row is open is not controlled by DataTables,
         * rather it is done here
         */
        $('#global_adder').on('click', ' tbody td .row-details', function() {
            var nTr = $(this).parents('tr')[0];
            if (oTable.fnIsOpen(nTr))
            {
                /* This row is already open - close it */
                $(this).addClass("row-details-close").removeClass("row-details-open");
                oTable.fnClose(nTr);
            }
            else
            {
                /* Open this row */
                $(this).addClass("row-details-open").removeClass("row-details-close");
                oTable.fnOpen(nTr, fnFormatDetails(oTable, nTr), 'details');
            }
        });
    }
$(document).ready(function() {

    $("a#add_course_new").fancybox();
    $("a.update_course").fancybox();

    $("#add_cal_form").validate({
        rules: {
            name: {
                required: true,
                maxlength: 25,
            },
            keywords: {
                required: true,
                maxlength: 25,
            },
            descriptions: {
                required: true,
                maxlength: 250,
            },
        },
        messages: {
            name: {
                required: "Please enter calendar name",
                maxlength: "Should not be more than 25 characters",
            },
            keywords: {
                required: "Please enter calendar keywords",
                maxlength: "Should not be more than 25 characters",
            },
            descriptions: {
                required: "Please enter description",
                maxlength: "Should not be more than 250 characters",
            },
        },
        highlight: function(element) {
            $(element)
                    .closest('.control-group')
                    .addClass('error');
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


});

function update_course(id)
{
    $('#course').html('');
}

function check_name_duplication(name)
{

    $('.alert').remove();

    $('#course').html('');

    $.ajax({
        url: $('#base_url').val() + "permissions/check_course_type_name",
        type: "POST",
        context: document.body,
        data: {
            'name': encodeURIComponent($('#course_name').val()),
            'c_id_parent': encodeURIComponent($("#c_id_parent").val())
        },
        cache: false,
        success: function(data) {

            if (data == '0')
            {
                $('#msg_added').html('<div class="alert alert-error">Course Type name already exists</div>').slideDown('slow', function() {
                    $('#msg_added').delay(1800).slideUp(2000);
                });
                return false;

            } else
            {

                $.ajax({
                    url: $('#base_url').val() + "permissions/save_course_type",
                    type: "POST",
                    context: document.body,
                    data: {
                        'name': encodeURIComponent($('#course_name').val()),
                        'status': encodeURIComponent($('#status_course').is(':checked')),
                        'course_id': encodeURIComponent($('#course_id').val()),
                        'c_id_parent': encodeURIComponent($("#c_id_parent").val()),
                        'is_parent': encodeURIComponent($("#is_parent").val()),
                        'is_course': encodeURIComponent($("#is_course").val()),
                    },
                    cache: false,
                    success: function(data) {

                        if (data == 'settings')
                        {
                            $('#course').html('<div class="alert alert-error"><button class="close" data-dismiss="alert"></button><strong>Error!</strong>Please Choose your term system, or check settings </span><a href="' + $('#base_url').val() + '/permissions/settings_red">Settings</a> <span class="error">to add courses! </span></div>');
                            $("#added_course").fancybox().trigger('click');
                            return false;
                        }
                        else
                        {
                            $('#course').html('<div style="margin-bottom:0px; !important;width:200px" class="alert alert-success"><button class="close" data-dismiss="alert"></button><strong>Success!</strong> Record Saved!</strong></div>');


                            $("#added_course").fancybox().trigger('click');
                            $('#html_ajax').html(data);


                            setTimeout(function() {
                                $.fancybox.close();
                            }, 1300);
                            $('#sample_1').dataTable( {"bDestroy": true,"sPaginationType": "full_numbers"} );
                        }

                    }
                });

            }
        }

    });


}

function update_course_call(id)
{

    $.ajax({
        url: $('#base_url').val() + "permissions/update_course_type_go",
        type: "POST",
        context: document.body,
        data: "status=" + $('#status_course').is(':checked') + "&id=" + $('#id_update').val() + "&course_id=" + $('#course_id').val()+"&c_id_parent="+$("#c_id_parent").val()+"&is_parent="+$("#is_parent").val()+"&is_course="+$("#is_course").val(),
        cache: false,
        success: function(data) {

            if (data == 'false')
            {
                $('#course').html('<span class="alert alert-error">Some problem saving record please try again!</span>');
                return false;
            }
            else
            {

                $('#course').html('');

                $('#course').html('<div style="margin-bottom:0px; !important;width:200px" class="alert alert-success"><button class="close" data-dismiss="alert"></button><strong>Record Updated!</strong></div>');

                $("#added_course").fancybox().trigger('click');

                $('#html_ajax').html(data);

                setTimeout(function() {
                    $.fancybox.close();
                }, 1300);
                initTable1();
            }

        }

    });


}



function display_course_notif()
{
    $('#course').html('<div class="alert alert-error">Please goto </span><a href="' + $('#base_url').val() + 'permissions/settings_red">Settings</a> <span class="error"> and choose your term system before adding courses. </span></span></div>');

    $("#added_course").fancybox().trigger('click');
}

function add_course_call_another()
{

    $('#course').html('');
    if ($('#course_name').val() == '')
    {

        $('#error').html('<div class="alert alert-error">Please enter course name</div>').slideDown('slow', function() {
            $('#error_type').delay(1800).slideUp(2000);
        });
        return false;

    }
    if ($('#course_name').val().length < 2)
    {

        $('#error').html('<div class="alert alert-error">Course name should be atleast 2 characters</div>').slideDown('slow', function() {
            $('#error_type').delay(1800).slideUp(2000);
        });
        return false;

    }

    if ($('#course_id').val() == '')
    {

        $('#error').html('<div class="alert alert-error">Please enter course id</div>').slideDown('slow', function() {
            $('#error_type').delay(1800).slideUp(2000);
        });
        return false;

    }

    $.ajax({
        url: $('#base_url').val() + "permissions/check_course_type_name",
        type: "POST",
        context: document.body,
        data: {
            'name': encodeURIComponent($('#course_name').val()),
            'c_id_parent': encodeURIComponent($("#c_id_parent").val())
        },
        cache: false,
        success: function(data) {

            if (data == 0)
            {

                $('#msg_added').html('<div class="alert alert-error">Course name already exists</div>').slideDown('slow', function() {
                    $('#msg_added').delay(1800).slideUp(2000);
                });
                return false;
            } else
            {

                $.ajax({
                    url: $('#base_url').val() + "permissions/save_course_type",
                    type: "POST",
                    context: document.body,
//                    data: "name=" + $('#course_name').val() + "&status=" + $('#status_course').is(':checked') + "&course_id=" + $('#course_id').val(),
                    data: {
                        'name': encodeURIComponent($('#course_name').val()),
                        'status': $('#status_course').is(':checked'),
                        'course_id': encodeURIComponent($('#course_id').val()),
                        'c_id_parent': encodeURIComponent($("#c_id_parent").val()),
                        'is_parent': encodeURIComponent($("#is_parent").val()),
                        'is_course': encodeURIComponent($("#is_course").val()),
                    },
                    cache: false,
                    success: function(data) {


                        if (data == 'settings')
                        {
                            $('#course').html('<div class="alert alert-error">Please Choose your term system, or check settings</span><a href="' + $('#base_url').val() + '/permissions/settings_red">Settings</a> <span class="error">to add courses! </span></span>');
                            $("#added_course").fancybox().trigger('click');

                            return false;
                        }
                        else
                        {


                            $('#msg_added').html('<div class="alert alert-success">Successfully Added</div>').slideDown('slow', function() {
                                $('#msg_added').delay(1800).slideUp(2000);
                            });

                            $('#html_ajax').html(data);
                            $('#course_id').val('');
                            $('#course_name').val('');
                            // $("a#add_course_new").click();
                            initTable1();

                        }

                    }

                });


            }
        }

    });





}


function remove_course_type(id)
{


    $('<div></div>').appendTo('body')
            .html('<div><h6>Delete <b>' + $('#course_id_new' + id).val() + '?</b></h6></div>')
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
        url: $('#base_url').val() + "permissions/remove_course_type",
        type: "POST",
        context: document.body,
        data: "remove_course=" + id+"&c_id_parent="+$("#c_id_parent").val()+"&is_parent="+$("#is_parent").val()+"&is_course="+$("#is_course").val(),
        cache: false,
        success: function(data) {
            if(data=='1'){
                $('#course').html('<div class="alert alert-error" style="margin-bottom:2px;">Error! This course is linked with Users</div>');
                $("#added_course").fancybox().trigger('click');
                setTimeout(function() {
                    $.fancybox.close();
                }, 1700);
            }else{
                $('#course').html('<div class="alert alert-success" style="margin-bottom:2px;"><button class="close" data-dismiss="alert"></button><strong>Success!</strong> Removed Successfully!</div>');
                $("#added_course").fancybox().trigger('click');
                setTimeout(function() {
                    $.fancybox.close();
                }, 1700);
            }
                $('#html_ajax').html(data);
                
            

        }

    });


}


function add_course_call()
{

    check_name_duplication($('#course_name').val());


}// JavaScript Document

/////////////////////////////////////

function update_course_add(id)
{
    $('#course').html('');
}

function check_name_duplication_add(name)
{

    $('.alert').remove();

    $('#course').html('');

    $.ajax({
        url: $('#base_url').val() + "permissions/check_course_name",
        type: "POST",
        context: document.body,
        data: {
            'name': encodeURIComponent($('#course_name :selected').val()),
            'grade_id': encodeURIComponent($('#grade_name').val()),
            'grade_name': encodeURIComponent($('#grade_name_hidden').val()),
            'section_id': encodeURIComponent($('#section_name').val()),
        },
        cache: false,
        success: function(data) {

            if (data == '0')
            {
                $('#msg_added').html('<div class="alert alert-error">Course name already exists</div>').slideDown('slow', function() {
                    $('#msg_added').delay(1800).slideUp(2000);
                });
                return false;

            } else
            {

                $.ajax({
                    url: $('#base_url').val() + "permissions/save_coursename",
                    type: "POST",
                    context: document.body,
                    data: {
                        'name': encodeURIComponent($('#course_name :selected').text()),
                        'status': encodeURIComponent($('#status_course').is(':checked')),
                        'course_id': encodeURIComponent($('#course_id').val()),
                        'grade_id': encodeURIComponent($('#grade_name').val()),
                        'grade_name': encodeURIComponent($('#grade_name_hidden').val()),
                        'section_id': encodeURIComponent($('#section_name :selected').val()),
                        'section_name': encodeURIComponent($('#section_name :selected').text()),
                        'course_option': encodeURIComponent($('#course_option').val()),
                        'is_course': encodeURIComponent($("#is_course").val()),
                    },
                    cache: false,
                    success: function(data) {

                        if (data == 'settings')
                        {
                            $('#course').html('<div class="alert alert-error"><button class="close" data-dismiss="alert"></button><strong>Error!</strong>Please Choose your term system, or check settings </span><a href="' + $('#base_url').val() + '/permissions/settings_red">Settings</a> <span class="error">to add courses! </span></div>');
                            $("#added_course").fancybox().trigger('click');
                            return false;
                        }
                        else
                        {
                            $('#course').html('<div style="margin-bottom:0px; !important;width:200px" class="alert alert-success"><button class="close" data-dismiss="alert"></button><strong>Success!</strong> Record Saved!</strong></div>');


                            $("#added_course").fancybox().trigger('click');
                            $('#html_ajax').html(data);


                            setTimeout(function() {
                                $.fancybox.close();
                            }, 1300);
                        }

                    }
                });

            }
        }

    });


}

function update_course_call_add(id)
{

    $.ajax({
        url: $('#base_url').val() + "permissions/update_course_go",
        type: "POST",
        context: document.body,
        data: {
                        'id': encodeURIComponent($('#id_update').val()),
                        'status': encodeURIComponent($('#status_course').is(':checked')),
                        'course_id': encodeURIComponent($('#course_id').val()),
                        'grade_id': encodeURIComponent($('#grade_name').val()),
                        'grade_name': encodeURIComponent($('#grade_name_hidden').val()),
                        'section_id': encodeURIComponent($('#section_name').val()),
                        'section_name': encodeURIComponent($('#section_name :selected').text()),
                        'course_option': encodeURIComponent($('#course_option').val()),
        },
        //data: "status=" + $('#status_course').is(':checked') + "&id=" + $('#id_update').val() + "&course_id=" + $('#course_id').val(),
        cache: false,
        success: function(data) {

            if (data == 'false')
            {
                $('#course').html('<span class="alert alert-error">Some problem saving record please try again!</span>');
                return false;
            }
            else
            {

                $('#course').html('');

                $('#course').html('<div style="margin-bottom:0px; !important;width:200px" class="alert alert-success"><button class="close" data-dismiss="alert"></button><strong>Record Updated!</strong></div>');

                $("#added_course").fancybox().trigger('click');

                $('#html_ajax').html(data);

                setTimeout(function() {
                    $.fancybox.close();
                }, 1300);
            }

        }

    });


}



function display_course_notif_add()
{
    $('#course').html('<div class="alert alert-error">Please goto </span><a href="' + $('#base_url').val() + 'permissions/settings_red">Settings</a> <span class="error"> and choose your term system before adding courses. </span></span></div>');

    $("#added_course").fancybox().trigger('click');
}

function add_course_call_another_add()
{

    $('#course').html('');
    if ($('#course_name').val() == '')
    {

        $('#error').html('<div class="alert alert-error">Please enter course name</div>').slideDown('slow', function() {
            $('#error_type').delay(1800).slideUp(2000);
        });
        return false;

    }
    if ($('#course_name').val().length < 2)
    {

        $('#error').html('<div class="alert alert-error">Course name should be atleast 2 characters</div>').slideDown('slow', function() {
            $('#error_type').delay(1800).slideUp(2000);
        });
        return false;

    }

    if ($('#course_id').val() == '')
    {

        $('#error').html('<div class="alert alert-error">Please enter course id</div>').slideDown('slow', function() {
            $('#error_type').delay(1800).slideUp(2000);
        });
        return false;

    }

    $.ajax({
        url: $('#base_url').val() + "permissions/check_course_name",
        type: "POST",
        context: document.body,
        data: {
            'name': encodeURIComponent($('#course_name :selected').text()),
            'grade_id': encodeURIComponent($('#grade_name').val()),
            'grade_name': encodeURIComponent($('#grade_name_hidden').val()),
            'section_id': encodeURIComponent($('#section_name').val()),
        },
        cache: false,
        success: function(data) {

            if (data == 0)
            {

                $('#msg_added').html('<div class="alert alert-error">Course name already exists</div>').slideDown('slow', function() {
                    $('#msg_added').delay(1800).slideUp(2000);
                });
                return false;
            } else
            {

                $.ajax({
                    url: $('#base_url').val() + "permissions/save_coursename",
                    type: "POST",
                    context: document.body,
//                    data: "name=" + $('#course_name').val() + "&status=" + $('#status_course').is(':checked') + "&course_id=" + $('#course_id').val(),
                    data: {
                        'name': encodeURIComponent($('#course_name :selected').text()),
                        'status': $('#status_course').is(':checked'),
                        'course_id': encodeURIComponent($('#course_id').val()),
                        'grade_id': encodeURIComponent($('#grade_name').val()),
                        'grade_name': encodeURIComponent($('#grade_name_hidden').val()),
                        'section_id': encodeURIComponent($('#section_name').val()),
                        'section_name': encodeURIComponent($('#section_name :selected').text()),
                        'course_option': encodeURIComponent($('#course_option').val()),
                        'is_course': encodeURIComponent($("#is_course").val()),
                    },
                    cache: false,
                    success: function(data) {


                        if (data == 'settings')
                        {
                            $('#course').html('<div class="alert alert-error">Please Choose your term system, or check settings</span><a href="' + $('#base_url').val() + '/permissions/settings_red">Settings</a> <span class="error">to add courses! </span></span>');
                            $("#added_course").fancybox().trigger('click');
                            setTimeout(function() {
                                $.fancybox.close();
                            }, 1300);
                            return false;
                        }
                        else
                        {


                            $('#msg_added').html('<div class="alert alert-success">Successfully Added</div>').slideDown('slow', function() {
                                $('#msg_added').delay(1800).slideUp(2000);
                            });

                            $('#html_ajax').html(data);
                            
                            
                            $('#course_name').removeAttr("disabled");
                            
                            $('#course_id').val('');
//                            $('#course_name').val('');
                            // $("a#add_course_new").click();

                        }

                    }

                });


            }
        }

    });





}


function remove_course(id)
{


    $('<div></div>').appendTo('body')
            .html('<div><h6>Delete <b>' + $('#course_id_new' + id).val() + '?</b></h6></div>')
            .dialog({
        modal: true, title: 'Remove Confirmation', zIndex: 10000, autoOpen: true,
        width: 'auto', resizable: false,
        buttons: [{
                text: 'Delete',
                click: function() {
                    push_call_confirm_add(id);
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

function remove_course_calendar_add(id, name)
{
    $('<div></div>').appendTo('body')
            .html('<div><h6>Delete <b>' + name + '?</b></h6></div>')
            .dialog({
        modal: true, title: 'Remove Confirmation', zIndex: 10000, autoOpen: true,
        width: 'auto', resizable: false,
        buttons: [{
                text: 'Delete',
                click: function() {
                    push_call_confirm_calendar_add(id);
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



function push_call_confirm_add(id)
{

    $.ajax({
        url: $('#base_url').val() + "permissions/remove_course",
        type: "POST",
        context: document.body,
        data: "remove_course=" + id,
        cache: false,
        success: function(data) {

            $('.alert').hide();
            $('<div class="alert alert-success"><button class="close" data-dismiss="alert"></button><strong>Success!</strong> Removed Successfully!</div>').insertAfter('#error_show');
            $('#html_ajax').html(data);

        }

    });


}

function push_call_confirm_calendar_add(id)
{
    $.ajax({
        url: $('#base_url').val() + "permissions/remove_course",
        type: "POST",
        context: document.body,
        data: "remove_course=" + id,
        cache: false,
        success: function(data) {

            $('#row_' + id).html('<span class="alert alert-success">Record Removed!</error>');
            $('#row_' + id).hide();

        }

    });
}

function add_course_call_add()
{

    check_name_duplication_add($('#course_name').val());


}// JavaScript Document





