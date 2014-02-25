$(document).ready(function() {
    
    $("#released_persons").fancybox();
    
    $("#add_new_user_link").fancybox();
    
    $("#add_new_visit").fancybox();
    
    $("#lg_username").live("focus", function(){
        var final_username = $('#lg_fname').val() + '.' + $('#lg_lname').val();
        $("#lg_username").val(final_username);
    });
    
    $("#lg_dob").live({
        focus: function() {
            $(this).datepicker();
        }
    });
    
    $("#v_date").live({
        focus: function() {
            $(this).datepicker();
        },
        keypress: function(){
            return false;
        }
    });

    ///adding search functionality on search box
    $("#hs_search").keyup(function() {
         $.ajax({
            url: $('#base_url').val() + "health_system/search_users/",
            type: "GET",
            data: 'query=' + $('#hs_search').val(),
            context: document.body,
            cache: false,
            success: function(data) {
                $('#new_searcher').html(data);
            }
        });
    });
    
    ///adding search functionality on search box
    $("#hs_search_v").keyup(function() {
        $.ajax({
            url: $('#base_url').val() + "health_system/search_users/",
            type: "GET",
            data: 'visit=1&query=' + $('#hs_search_v').val(),
            context: document.body,
            cache: false,
            success: function(data) {
                $('#new_searcher').html(data);
            }
        });
    });
    
    // call add new reason function on specific option's selection
    $("#v_reason").change(function() {
        var id = $(this).find("option:selected").attr("id");
        switch (id) {
            case "op_reason":
                $.fancybox({
                    'autoScale': true,
                    'transitionIn': 'elastic',
                    'transitionOut': 'elastic',
                    'speedIn': 500,
                    'speedOut': 300,
                    'autoDimensions': true,
                    'centerOnScroll': true,
                    'href' : '#add_new_reason',
                    onClosed    :   function() {
                        window.location.reload();
                    }
                 });
                break;
        }
    });

    // call add new treatment function on specific option's selection
    $("#v_treatment").change(function() {
        var id = $(this).find("option:selected").attr("id");
        switch (id) {
            case "op_treatment":
                $.fancybox({
                    'autoScale': true,
                    'transitionIn': 'elastic',
                    'transitionOut': 'elastic',
                    'speedIn': 500,
                    'speedOut': 300,
                    'autoDimensions': true,
                    'centerOnScroll': true,
                    'href' : '#add_new_treatment',
                    onClosed    :   function() {
                        window.location.reload();
                    }
                 });
                break;
        }
    });
    
    // on change filter open search box
    $('#filters').change(function(){
        var filter = $(this).find("option:selected").val();
        
        if(filter != ''){
            
            switch(filter){
                case 'all':
                    apply_filter_direct(filter);
                    break;
                case 'f_by_status_open':
                    apply_filter_direct('status_open');
                    break;
                case 'f_by_status_close':
                    apply_filter_direct('status_close');
                    break;
                default:
                    $('#filter_qry').show();
                    $('#filter_query').focus();
                    break;
            }
        }
        // open instant search box and use filter with it
    });
    
    ///adding search functionality on visit filter box
    $("#filter_query").keyup(function() {
        $.ajax({
            url: $('#base_url').val() + "health_system/filter_visit_users/",
            type: "GET",
            data: 'query=' + $('#filter_query').val()+'&filter='+$('#filters').find("option:selected").val(),
            context: document.body,
            cache: false,
            success: function(data) {
                $('#new_searcher').html(data);
            }
        });
    });
    
    ///adding search functionality on visit filter box
    $("#reports_search").keyup(function() {
        $.ajax({
            url: $('#base_url').val() + "health_system/search_report_users/",
            type: "GET",
            data: 'query=' + $('#reports_search').val(),
            context: document.body,
            cache: false,
            success: function(data) {
                $('#new_searcher').html(data);
            }
        });
    });

});

function apply_filter_direct(val){
    var r_url = $('#base_url').val() + "health_system/visits?filter="+val;
    window.location= r_url;
}

function apply_filter_query(val){
    alert('query = '+val); return false;
    var r_url = $('#base_url').val() + "health_system/visits?filter="+val;
    window.location = r_url;
}


/**
 * function to remove user from the login table
 * @param {type} id
 * @returns {undefined}
 */
function remove_user_login(id){
    $('<div></div>').appendTo('body')
            .html('<div><h6>Are you sure you want to delete!</h6></div>')
            .dialog({
        modal: true, title: 'Removing confirmation', zIndex: 10000, autoOpen: true,
        width: 'auto', resizable: false,
        buttons: {
            Yes: function() {

                remove_confirm(id);

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

/**
 * Remove user call goes here
 * @param {type} id
 * @returns {undefined}
 */
function remove_confirm(id)
{
    $.ajax({
        url: $('#base_url').val() + "permissions/remove_ulogin",
        type: "GET",
        context: document.body,
        data: "remove=" + id,
        cache: false,
        success: function(data) {

            if (data)
            {
                $('#' + id).remove();
            } 
            else
            {
                alert('Error while removing!please try again');
            }

        }

    });

}

/**
 * function to save new user added through popup
 * @returns {undefined}
 */
function save_new_user()
{
    var lg_fname = $('#lg_fname').val();
    var lg_lname = $('#lg_lname').val();
    var lg_username = $('#lg_username').val();
    var lg_password = $('#lg_password').val();
    var lg_dob = $('#lg_dob').val();
    var lg_role = $('#user_roles').val();

    if (lg_dob == '') {
        $('#hs_error').html('<span class="error">Please provide your date of birth!</span>');
        return false;
    }
    else {
        var res = validate_date(lg_dob);
        if (!res) {
            $('#hs_error').html('<span class="error">Invalid date format, Please provide date in following format MM/DD/YYYY.</span>');
            return false;
        }
    }

    var qry_string = 'lg_fname=' + lg_fname + '&lg_lname=' + lg_lname + '&lg_username=' + lg_username + '&lg_password=' + lg_password + '&lg_dob=' + lg_dob + '&lg_role=' + lg_role;

    $.ajax({
        url: $('#base_url').val() + "health_system/hs_save_user",
        type: "POST",
        context: document.body,
        data: qry_string,
        cache: false,
        success: function(data) {

            $('#fancybox-content div').html(data);

        }

    });

}

/**
 * function to save new reason
 * @returns {undefined}
 */
function save_new_reason(){
    
    $('#error_reason').html('');
    
    var reason = $('#new_reason').val();
    
    if(reason == ''){
        $('#error_reason').html('<span class="error">Reason cannot be empty, Please provide reason text.</span>');
        return false;
    }
    
    var reason_status = $('#new_reason_status:checked').val();
    
    var qry_string = 'reason=' + reason + '&status=' + reason_status;
    
    $.ajax({
        url: $('#base_url').val() + "health_system/hs_save_new_reason",
        type: "POST",
        context: document.body,
        data: qry_string,
        cache: false,
        success: function(data) {
            if( data.indexOf('Successfully') > 0 )
                $('#fancybox-content div').html('<span class="success">'+data+'</span>');
            else
                $('#error_reason').html('<span class="error">'+data+'</span>');

        }

    });
}

/**
 * function to popup add new treatment box
 * @returns {undefined}
 */
function save_new_treatment(){
    
    $('#error_treatment').html('');
    
    var treatment = $('#new_treatment').val();
    
    if(treatment == ''){
        $('#error_treatment').html('<span class="error">Treatment cannot be empty, Please provide treatment text.</span>');
        return false;
    }
    
    var treatment_status = $('#new_treatment_status:checked').val();
    
    var qry_string = 'treatment=' + treatment + '&status=' + treatment_status;
    
    $.ajax({
        url: $('#base_url').val() + "health_system/hs_save_new_treatment",
        type: "POST",
        context: document.body,
        data: qry_string,
        cache: false,
        success: function(data) {
            if( data.indexOf('Successfully') > 0 )
                $('#fancybox-content div').html('<span class="success">'+data+'</span>');
            else
                $('#error_treatment').html('<span class="error">'+data+'</span>');

        }

    });
}

//////////////// Report page \\\\\\\\\\\\\\\

$(document).ready(function() {
    //update Emergency Contact details on click
    $('#btn_emergency_contact').click(function() {
        $.ajax({
            url: $('#base_url').val() + "health_system/save_emergency_contact",
            type: "POST",
            context: document.body,
            data: 'info='+$('#r_em_contact').val()+'&id='+$('#u_id').val(),
            cache: false,
            success: function(data) {
                alert(data);
            }
        });
    });
    
    //update health alerts on click
    $('#btn_health_alerts').click(function() {
        $.ajax({
            url: $('#base_url').val() + "health_system/save_health_alerts",
            type: "POST",
            context: document.body,
            data: 'info=' + $('#r_he_alert').val() + '&id=' + $('#u_id').val(),
            cache: false,
            success: function(data) {
                alert(data);
            }
        });
    });
    
    $('#report_files_cabinet').fancybox();
    
    $('#tuberculin_date').datepicker();
    
    //upgrade tuberculin info on click
    $('#btn_upgrade_tuberculin_info').click(function() {
        
        $('#tb_resp_msg_left').html('');
        
        var id = $('#u_id').val();
        var date = $('#tuberculin_date').val();
        var type = $('#tuberculin_type').val();
        var results = $('#tuberculin_results').val();
        
        if (!validate_date(date)) {
            $('#tb_resp_msg_left').html('<span class="error">Invalid date format, Please provide date in following format MM/DD/YYYY.</span>');
            return false;
        }
        
        var q_s = 'id='+id+'&date='+date+'&type='+type+'&results='+results;
        
        $.ajax({
            url: $('#base_url').val() + "health_system/save_tb_info",
            type: "POST",
            context: document.body,
            data: q_s,
            cache: false,
            success: function(data) {
                $('#tb_resp_msg_left').html(data);
            }
        });
    });
    
    $('#xray_date').datepicker();
    
    //upgrade tuberculin info on click
    $('#btn_upgrade_tuberculin_xray').click(function() {
        
        $('#tb_resp_msg_right').html('');
        
        var id = $('#u_id').val();
        var date = $('#xray_date').val();
        var results = $('#xray_results').val();
        
        if (!validate_date(date)) {
            $('#tb_resp_msg_right').html('<span class="error">Invalid date format, Please provide date in following format MM/DD/YYYY.</span>');
            return false;
        }
        
        var q_s = 'id='+id+'&date='+date+'&results='+results;
        
        $.ajax({
            url: $('#base_url').val() + "health_system/save_tb_xray_info",
            type: "POST",
            context: document.body,
            data: q_s,
            cache: false,
            success: function(data) {
                $('#tb_resp_msg_right').html(data);
            }
        });
    });
    
    $('#btn_add_aud').fancybox({
        onClosed    :   function() {
            window.location.reload();
        }
    });
    
    $('#aud_date').datepicker();
    $('#aud_date_ref').datepicker();
    $('#aud_date_act').datepicker();
    
    //add new audiometry Result for the student 
    $('#btn_save_aud').click(function() {
        
        $('#add_hearing_res_msg').html('');

        var id = $('#u_id').val();
        var grade = $('#aud_grade').val();
        var date_gen = $('#aud_date').val();
        var right = $('#aud_right').val();
        var left = $('#aud_left').val();
        var date_ref = $('#aud_date_ref').val();
        var date_act = $('#aud_date_act').val();

        if (!validate_date(date_gen)) {
            $('#add_hearing_res_msg').html('<span class="error">Invalid date format, Please provide date in following format MM/DD/YYYY.</span>');
            $('#aud_date').focus();
            return false;
        }
        
        if (!validate_date(date_ref)) {
            $('#add_hearing_res_msg').html('<span class="error">Invalid date format, Please provide date in following format MM/DD/YYYY.</span>');
            $('#aud_date_ref').focus();
            return false;
        }
        
        if (!validate_date(date_act)) {
            $('#add_hearing_res_msg').html('<span class="error">Invalid date format, Please provide date in following format MM/DD/YYYY.</span>');
            $('#aud_date_act').focus();
            return false;
        }

        var q_s = 'id=' + id + '&grade=' + grade + '&date_gen=' + date_gen + '&right=' + right + '&left=' + left + '&date_ref=' + date_ref + '&date_act=' + date_act;

        $.ajax({
            url: $('#base_url').val() + "health_system/save_audiometry_results",
            type: "POST",
            context: document.body,
            data: q_s,
            cache: false,
            success: function(data) {
                $('#add_hearing_res_msg').html(data);
            }
        });
    });
    
    $('#btn_add_vision').fancybox({
        onClosed    :   function() {
            window.location.reload();
        }
    });
    
    $('#vis_date').datepicker();
    $('#vis_date_ref').datepicker();
    $('#vis_date_act').datepicker();
    
    //add new Vision Screening Result for the student 
    $('#btn_save_vis').click(function() {
        
        $('#add_vision_res_msg').html('');

        
        var id = $('#u_id').val();
        var right = $('#vis_right').val();
        var left = $('#vis_left').val();
        var grade = $('#vis_grade').val();
        var date_gen = $('#vis_date').val();
        var lenses_type = $('#vis_lens_type').val();
        var stereopsis = '';
        var selected_stereo = $("input[type='radio'][name='stereo']:checked");
        if (selected_stereo.length > 0)
            stereopsis = selected_stereo.val();
        var muscle_bal = '';
        var selected_muscle = $("input[type='radio'][name='muscle']:checked");
        if (selected_muscle.length > 0)
            muscle_bal = selected_muscle.val();
        var color_boys = '';
        var selected_color = $("input[type='radio'][name='color_boys']:checked");
        if (selected_color.length > 0)
            color_boys = selected_color.val();
        var date_ref = $('#vis_date_ref').val();
        var date_act = $('#vis_date_act').val();

        if ( stereopsis == '' || muscle_bal == '' ) {
            $('#add_vision_res_msg').html('<span class="error">You must select the Stereopsis and Muscle bal.</span>');
            return false;
        }
        
        if (!validate_date(date_gen)) {
            $('#add_vision_res_msg').html('<span class="error">Invalid date format, Please provide date in following format MM/DD/YYYY.</span>');
            $('#vis_date').focus();
            return false;
        }
        
        if (!validate_date(date_ref)) {
            $('#add_vision_res_msg').html('<span class="error">Invalid date format, Please provide date in following format MM/DD/YYYY.</span>');
            $('#vis_date_ref').focus();
            return false;
        }
        
        if (!validate_date(date_act)) {
            $('#add_vision_res_msg').html('<span class="error">Invalid date format, Please provide date in following format MM/DD/YYYY.</span>');
            $('#vis_date_act').focus();
            return false;
        }

        var q_s = 'id=' + id + '&grade=' + grade + '&date_gen=' + date_gen + '&right=' + right + '&left=' + left + '&date_ref=' + date_ref + '&date_act=' + date_act;
        q_s += '&lenses_type=' + lenses_type + '&stereo=' + stereopsis + '&muscle_bal=' + muscle_bal + '&color=' + color_boys;
        $.ajax({
            url: $('#base_url').val() + "health_system/save_vision_results",
            type: "POST",
            context: document.body,
            data: q_s,
            cache: false,
            success: function(data) {
                $('#add_vision_res_msg').html(data);
            }
        });
    });
    
    
    $('#immune_date').datepicker();
    
    $('#btn_add_immune').fancybox({
        onClosed    :   function() {
            window.location.reload();
        }
    });
    
    $('#save_immunization').click(function(){
        
        $('#error_msg_immunization').html('');
        
        var id = $('#u_id').val();
        
        var immune_type = $('#immune_type').val();
        
        var immune_date = $('#immune_date').val();
        
        if ( ! validate_date(immune_date) ) {
            $('#error_msg_immunization').html('<span class="error">Invalid date format, Please provide date in following format MM/DD/YYYY.</span>');
            $('#immune_date').focus();
            return false;
        }
        
        if ( immune_type == '' ) {
            $('#error_msg_immunization').html('<span class="error">Please select Immunization Type.</span>');
            $('#immune_type').focus();
            return false;
        }
        
        var q_s = 'id=' + id + '&immune_type=' + immune_type + '&immune_date=' + immune_date;
        $.ajax({
            url: $('#base_url').val() + "health_system/save_student_immunization",
            type: "POST",
            context: document.body,
            data: q_s,
            cache: false,
            success: function(data) {
                $('#error_msg_immunization').html(data);
            }
        });
    });
    
   // adding code for uploading file
    $("#attach").uploadify({
        'formData': {
            'user_id' : $('#u_id').val(),
        },
        height: 30,
        swf: $('#base_url').val() + 'files/uploadify/uploadify.swf',
        uploader: $('#base_url').val() + 'health_system/attach_file/',
        width: 100,
        maxQueueSize: 0,
        messages: {
            'maxNumberUploadError': 'Exceded number of upload.',
            'nothingInTheQueueError': 'Nothing in the Queue'
        },
        'auto': false,
        'onUploadSuccess': function(file, data, response) {
            
            alert(data);
            
        }
    });
	
});

function upload_attached_files() {
    $('#attach').uploadify('upload', '*');
}

////////////// Report page End \\\\\\\\\\\\\\
    
/**
 * function to validate date of birth on client side
 * @param {type} dob
 * @returns {Boolean}
 */
function validate_date(date){
    if(isDate(date))
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

