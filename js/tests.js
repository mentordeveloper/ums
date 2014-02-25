$(document).ready(function() {
    
    ///adding instant search functionality on tests search
    $("#tests_search").keyup(function() { 
        $.ajax({
            url: $('#base_url').val() + "tests/search_student_tests/",
            type: "POST",
            data: 'search_query=' + $('#tests_search').val(),
            context: document.body,
            cache: false,
            success: function(data) {
                $('#new_searcher').html(data);
            }
        });
    });
    
    var options = {
        autostart: true,
        until: $('#remaining_time').val(),
        compact: true,
        format: 'MS',
        onExpiry: function(){window.location.reload();},
        //onExpiry: "count_down_timer",
        expiryText:"Time Out",
        //expiryUrl:$('#base_url').val()
        
    }
    if(document.getElementById("count_down_timer"))
        $('#count_down_timer').countdown(options);
    
});

function submitTest(){
    window.location.reload();
}

function get_all_questions(tmp_id){
    $.ajax({
        url: $('#base_url').val() + "tests_admin/get_all_questions/",
        type: "POST",
        context: document.body,
        data: "quiz_id="+tmp_id,
        cache: false,
        success: function(data) {
            $('#quiz_questions').html(data);
        }
    });
}
    
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

function attempt_test_submit(){
    if ($("input[name='answer']:checked").length > 0){
        $(".error_class_answer").fadeOut('fast');
        return true;
    }
    else{
        $(".error_class_answer").fadeIn('fast');
        return false;
    }
}
  