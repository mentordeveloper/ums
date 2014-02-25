$.noConflict();
$(document).ready(function() {

    $('#notification msgsuccess ').slideUp(1500);



    $('.rating').jRating({
        step: true,
        length: 20,
        canRateAgain: true,
        nbRates: 10
    });

});


(function($) {
    $.fn.jRating = function(op) {
        var defaults = {
            /** String vars **/
            bigStarsPath: $('#base_url').val() + 'files/jRating-master/jquery/icons/stars.png', // path of the icon stars.png
            smallStarsPath: $('#base_url').val() + 'files/jRating-master/jquery/icons/small.png', // path of the icon small.png
            phpPath: $('#base_url').val() + 'files/jRating-master/php/jRating.php', // path of the php file jRating.php
            type: 'big', // can be set to 'small' or 'big'

            /** Boolean vars **/
            step: false, // if true,  mouseover binded star by star,
            isDisabled: false,
            showRateInfo: true,
            canRateAgain: false,
            /** Integer vars **/
            length: 10, // number of star to display
            decimalLength: 0, // number of decimals.. Max 3, but you can complete the function 'getNote'
            rateMax: 20, // maximal rate - integer from 0 to 9999 (or more)
            rateInfosX: -45, // relative position in X axis of the info box when mouseover
            rateInfosY: 5, // relative position in Y axis of the info box when mouseover
            nbRates: 1,
            /** Functions **/
            onSuccess: null,
            onError: null
        };

        if (this.length > 0)
            return this.each(function() {
                /*vars*/
                var opts = $.extend(defaults, op),
                        newWidth = 0,
                        starWidth = 0,
                        starHeight = 0,
                        bgPath = '',
                        hasRated = false,
                        globalWidth = 0,
                        nbOfRates = opts.nbRates;

                if ($(this).hasClass('jDisabled') || opts.isDisabled)
                    var jDisabled = true;
                else
                    var jDisabled = false;

                getStarWidth();
                $(this).height(starHeight);

                var average = parseFloat($(this).attr('data-average')), // get the average of all rates
                        idBox = parseInt($(this).attr('data-id')), // get the id of the box
                        widthRatingContainer = starWidth * opts.length, // Width of the Container
                        widthColor = average / opts.rateMax * widthRatingContainer, // Width of the color Container

                        quotient =
                        $('<div>',
                        {
                            'class': 'jRatingColor',
                            css: {
                                width: widthColor
                            }
                        }).appendTo($(this)),
                        average =
                        $('<div>',
                        {
                            'class': 'jRatingAverage',
                            css: {
                                width: 0,
                                top: -starHeight
                            }
                        }).appendTo($(this)),
                        jstar =
                        $('<div>',
                        {
                            'class': 'jStar',
                            css: {
                                width: widthRatingContainer,
                                height: starHeight,
                                top: -(starHeight * 2),
                                background: 'url(' + bgPath + ') repeat-x'
                            }
                        }).appendTo($(this));


                $(this).css({width: widthRatingContainer, overflow: 'hidden', zIndex: 1, position: 'relative'});

                if (!jDisabled)
                    $(this).unbind().bind({
                        mouseenter: function(e) {
                            var realOffsetLeft = findRealLeft(this);
                            var relativeX = e.pageX - realOffsetLeft;
                            if (opts.showRateInfo)
                                var tooltip =
                                        $('<p>', {
                                    'class': 'jRatingInfos',
                                    html: getNote(relativeX) + ' <span class="maxRate">/ ' + opts.rateMax + '</span>',
                                    css: {
                                        top: (e.pageY + opts.rateInfosY),
                                        left: (e.pageX + opts.rateInfosX)
                                    }
                                }).appendTo('body').show();
                        },
                        mouseover: function(e) {
                            $(this).css('cursor', 'pointer');
                        },
                        mouseout: function() {
                            $(this).css('cursor', 'default');
                            if (hasRated)
                                average.width(globalWidth);
                            else
                                average.width(0);
                        },
                        mousemove: function(e) {
                            var realOffsetLeft = findRealLeft(this);
                            var relativeX = e.pageX - realOffsetLeft;
                            if (opts.step)
                                newWidth = Math.floor(relativeX / starWidth) * starWidth + starWidth;
                            else
                                newWidth = relativeX;
                            average.width(newWidth);
                            if (opts.showRateInfo)
                                $("p.jRatingInfos")
                                        .css({
                                    left: (e.pageX + opts.rateInfosX)
                                })
                                        .html(getNote(newWidth) + ' <span class="maxRate">/ ' + opts.rateMax + '</span>');
                        },
                        mouseleave: function() {
                            $("p.jRatingInfos").remove();
                        },
                        click: function(e) {
                            var element = this;

                            /*set vars*/
                            hasRated = true;
                            globalWidth = newWidth;
                            nbOfRates--;

                            if (!opts.canRateAgain || parseInt(nbOfRates) <= 0)
                                $(this).unbind().css('cursor', 'default').addClass('jDisabled');

                            if (opts.showRateInfo)
                                $("p.jRatingInfos").fadeOut('fast', function() {
                                    $(this).remove();
                                });
                            e.preventDefault();
                            var rate = getNote(newWidth);
                            average.width(newWidth);


                            /** ONLY FOR THE DEMO, YOU CAN REMOVE THIS CODE **/
                            $('#testrate').val(rate);
                            $('.datasSent p').html('<strong>idBox : </strong>' + idBox + '<br /><strong>rate : </strong>' + rate + '<br /><strong>action :</strong> rating');
                            $('.serverResponse p').html('<strong>Loading...</strong>');
                            /** END ONLY FOR THE DEMO **/

                            $.post(opts.phpPath, {
                                idBox: idBox,
                                rate: rate,
                                action: 'rating'
                            },
                            function(data) {
                                if (!data.error)
                                {
                                    /** ONLY FOR THE DEMO, YOU CAN REMOVE THIS CODE **/
                                    $('.serverResponse p').html(data.server);
                                    /** END ONLY FOR THE DEMO **/


                                    /** Here you can display an alert box, 
                                     or use the jNotify Plugin :) http://www.myqjqueryplugins.com/jNotify
                                     exemple :	*/
                                    if (opts.onSuccess)
                                        opts.onSuccess(element, rate);
                                }
                                else
                                {

                                    /** ONLY FOR THE DEMO, YOU CAN REMOVE THIS CODE **/
                                    $('.serverResponse p').html(data.server);
                                    /** END ONLY FOR THE DEMO **/

                                    /** Here you can display an alert box, 
                                     or use the jNotify Plugin :) http://www.myqjqueryplugins.com/jNotify
                                     exemple :	*/
                                    if (opts.onError)
                                        opts.onError(element, rate);
                                }
                            },
                                    'json'
                                    );
                        }
                    });

                function getNote(relativeX) {
                    var noteBrut = parseFloat((relativeX * 100 / widthRatingContainer) * opts.rateMax / 100);
                    switch (opts.decimalLength) {
                        case 1 :
                            var note = Math.round(noteBrut * 10) / 10;
                            break;
                        case 2 :
                            var note = Math.round(noteBrut * 100) / 100;
                            break;
                        case 3 :
                            var note = Math.round(noteBrut * 1000) / 1000;
                            break;
                        default :
                            var note = Math.round(noteBrut * 1) / 1;
                    }
                    return note;
                }
                ;

                function getStarWidth() {
                    switch (opts.type) {
                        case 'small' :
                            starWidth = 12; // width of the picture small.png
                            starHeight = 10; // height of the picture small.png
                            bgPath = opts.smallStarsPath;
                            break;
                        default :
                            starWidth = 23; // width of the picture stars.png
                            starHeight = 20; // height of the picture stars.png
                            bgPath = opts.bigStarsPath;
                    }
                }
                ;

                function findRealLeft(obj) {
                    if (!obj)
                        return 0;
                    return obj.offsetLeft + findRealLeft(obj.offsetParent);
                }
                ;
            });

    }
})(jQuery);

function searchbysubject()
{
    $('html, body').animate({ scrollTop: $('#wait').offset().top }, 'slow');
    $('#wait').html('<span class="alert alert-info">Please Wait! Searching...</span>');
    $.ajax({
//        url: $('#base_url').val() + 'instructor/get_results_from_query/',
        url: $('#base_url').val() + 'lesson_plans/get_results_from_query/',
        type: "GET",
        context: document.body,
        cache: false,
        data: "qry=" + $('#opt3 :selected').val(),
        success: function(data) {
            $('#wait').html('');
            $('#viewresult').html(data);
        }
    });

}

function searchbyScenario()
{
    $('html, body').animate({ scrollTop: $('#wait').offset().top }, 'slow');
    $('#wait').html('<span class="alert alert-info">Please Wait! Searching...</span>');
    $.ajax({
//        url: $('#base_url').val() + 'instructor/get_results_from_query/',
        url: $('#base_url').val() + 'lesson_plans/get_results_from_query/',
        type: "GET",
        context: document.body,
        cache: false,
        data: "qry=" + $('#opt4 :selected').val(),
        success: function(data) {
            $('#wait').html('');
            $('#viewresult').html(data);
        }
    });

}

function updatebysubject1()
{
    $('html, body').animate({ scrollTop: $('#wait').offset().top }, 'slow');
    $('#wait').html('<br/><div class="alert alert-info"><p>Please Wait! while Fetching and Updating ...</p></div>');
    $.ajax({
        url: 'querytosearch/',
        type: "GET",
        context: document.body,
        cache: false,
        data: "qry=" + $('#opt3 :selected').val(),
        success: function(data) {

            $('#wait').html('<br/><div class="alert alert-success"><p>Updated Successfully.</p></div>');

            $('.msgsuccess').slideUp(4000);

        }
    });

}
function updatebyScenario1()
{
    $('html, body').animate({ scrollTop: $('#wait').offset().top }, 'slow');
    $('#wait').html('<br/><div class="alert alert-info"><p>Please Wait! while Fetching and Updating ...</p></div>');
    $.ajax({
        url: 'querytosearch/',
        type: "GET",
        context: document.body,
        cache: false,
        data: "qry=" + $('#opt4 :selected').val(),
        success: function(data) {

            $('#wait').html('<br/><div class="alert alert-success"><p>Updated Successfully.</p></div>');

            $('.msgsuccess').slideUp(4000);

        }
    });

}
function updatebydata1()
{
    $('html, body').animate({ scrollTop: $('#wait').offset().top }, 'slow');
    $('#wait').html('<br/><div class="alert alert-info"><p>Please Wait! while Fetching and Updating ...</p></div>');
    $.ajax({
        url: 'querytosearch/',
        type: "GET",
        context: document.body,
        cache: false,
        data: "qry=" + $('#opt1 :selected').val(),
        success: function(data) {

            $('#wait').html('<br/><div class="alert alert-success"><p>Updated Successfully.</p></div>');
            $('.msgsuccess').slideUp(4000);


        }
    });

}

function searchbydata()
{
    $('html, body').animate({ scrollTop: $('#viewresult').offset().top }, 'slow');
    $('#wait').html('<br/><div class="alert alert-info"><p>Please Wait! while Searching ...</p></div>');
    $.ajax({
//        url: $('#base_url').val() + 'instructor/get_results_from_query/',
        url: $('#base_url').val() + 'lesson_plans/get_results_from_query/',
        type: "GET",
        context: document.body,
        cache: false,
        data: "qry=" + $('#opt1 :selected').val(),
        success: function(data) {
            $('#wait').html('');
            $('#viewresult').html(data);
        }
    });
}
function searchbymultiple()
{
    $('html, body').animate({ scrollTop: $('#wait').offset().top }, 'slow');
    $('#wait').html('<br/><div class="alert alert-info"><p>Please Wait! while Searching ...</p></div>');
    $.ajax({
//        url: $('#base_url').val() + 'instructor/get_results_from_query/',
        url: $('#base_url').val() + 'lesson_plans/get_results_from_query/',
        type: "GET",
        context: document.body,
        cache: false,
        data: "qry=" + $('#opt5 :selected').val() + "&qry2=" + $('#opt6 :selected').val(),
        success: function(data) {
            $('#wait').html('');
            $('#viewresult').html(data);
        }
    });



}

function get_single_link(id)
{

    $('html, body').animate({ scrollTop: $('#wait').offset().top }, 'slow');
    $('#wait').html('<br/><div class="alert alert-info"><p>Please Wait! while Searching ...</p></div>');
    $.ajax({
//        url: $('#base_url').val() + 'instructor/scrapping_data/',
        url: $('#base_url').val() + 'lesson_plans/scrapping_data/',
        type: "GET",
        context: document.body,
        cache: false,
        data: "link=" + $('#single_link' + id).val() + "&string=" + $('#').val(),
        success: function(data) {
            $('#wait').html('');
            $('#viewsingledetials').html(data);

        }
    });


}
function searchbyperiod()
{   
    $('html, body').animate({ scrollTop: $('#wait').offset().top }, 'slow');
    $('#wait').html('<br/><div class="alert alert-info"><p>Please Wait! while Searching ...</p></div>');
    $.ajax({
//        url: $('#base_url').val() + 'instructor/get_results_from_query/',
        url: $('#base_url').val() + 'lesson_plans/get_results_from_query/',
        type: "GET",
        context: document.body,
        cache: false,
        data: "qry=" + $('#opt2 :selected').val(),
        success: function(data) {
            $('#wait').html('');
            $('#viewresult').html(data);
        }
    });
}
function showwait()
{
    $('html, body').animate({ scrollTop: $('#show_wait').offset().top }, 'slow');
    $('#show_wait').html('<span class="alert alert-info">Please wait while Loading...</span>');
}


function searchbyname()
{
    $('html, body').animate({ scrollTop: $('#wait').offset().top }, 'slow');
    $('#wait').html('<br/><div class="alert alert-info"><p>Please Wait! while Searching ...</p></div>');

    $.ajax({
//        url: $('#base_url').val() + 'instructor/search_scrappinglinks_byname/',
        url: $('#base_url').val() + 'lesson_plans/search_scrappinglinks_byname/',
        type: "GET",
        context: document.body,
        cache: false,
        data: "name=" + $('#search_name').val(),
        success: function(data) {
            $('#wait').html('');
            $('#viewresult').html(data);
        }
    });
}

function save_coment_lesson()
{


    if ($('#valtext').val() != '')
    {


        $.ajax({
            url: $('#base_url').val() + "instructor/lesson_comments",
            type: "GET",
            context: document.body,
            data: "rank=" + $('#testrate').val() + "&comment=" + $('#valtext').val() + "&my_url=" + $('#my_url').val(),
            cache: false,
            success: function(data) {
                $('#commentadded').html('<span class="success">Your comment added!</span>').show().delay(1800).slideUp(2000);
                ;
                $('#hide_commnts').css("display", "none");
                $('#cm_tbl').append(data);

            }

        });

        $('#valtext').val('');
        $('#rank').val('');

    }
    else
    {

        $('#add_comment').html('<span class="error">Please Enter Comment!</span>').show().delay(1800).slideUp(2000);
    }
}

function searchbycurikie(type, field)
{
    $('html, body').animate({ scrollTop: $('#wait').offset().top }, 'slow');
    $('#wait').html('<br/><div class="alert alert-info"><p>Please Wait! while Searching ...</p></div>');
    var field_val = '';
    var field_val_1 = '';
    var field_val_txt = '';
    if(type=="name_search"){
        field_val = $("#"+field).val();
        field_val_txt = field_val;
    }
    else if(type=="multiple"){
        field_val = $('#' + field + ' :selected').val();
        field_val_1 = $("#level_opt5 :selected").val();
        field_val_txt = $("#level_opt5 :selected").text()+' '+$('#' + field + ' :selected').text();
        
    }
    else{
        field_val = $('#' + field + ' :selected').val();
        field_val_txt = $('#' + field + ' :selected').text();
    }
    field_val_txt = encodeURIComponent(field_val_txt);
    console.log(field_val);
    console.log(field_val_1);
    console.log(field_val_txt);
    $.ajax({
        url: $('#base_url').val() + 'lesson_plans/get_results_from_query_curriki/',
        type: "GET",
        context: document.body,
        cache: false,
        data: "type=" + type + "&txt=" + field_val_txt + "&qry1=" + field_val_1 + "&qry=" + field_val,
        success: function(data) {
            $('#wait').html('');
            $('#viewresult').html(data);
        }
    });
}
function searchbycurikie_test(type, field)
{
    
    //$('#wait').html('<br/><div class="alert alert-info"><p>Please Wait! while Searching ...</p></div>');
    var url = "http://www.curriki.org/currikiExtjs?start=0&limit=25&xpage=plain&userId=XWiki.XWikiGuest&module=resource&terms=pakistan&other=&subjectparent=FW_masterFramework.Education%26Teaching&subject=FW_masterFramework.Education%26Teaching&category=&level=gr-3-5&language=&review=&ictprfx=&ict=&special=&rows=25&sort=score&dir=DESC";
//    data_store = {};
//    var Data_Result = new Ext.data.Store({
//		storeId: 'search-store-resource'
//		,proxy: new Ext.data.HttpProxy({
//			url: url
//			,method:'GET'
//		})
//		,baseParams: {	xpage: "plain"
//                     	//"json.wrf": "Curriki.module.search.data.resource.store.results.loadData" // parameter for Solr to wrap the json result into a function call
//                     	//, '_dc':(new Date().getTime())
//                      }
//		,reader: new Ext.data.JsonReader({
//			root: 'rows'
//			,totalProperty: 'resultCount'
//			,id: 'page'
//		}, data_store)
//
//		// turn on remote sorting
//		,remoteSort: true
//	});
//    
//console.log(Data_Result);    
//console.log(data_store);    
    
    
    $.getJSON(url, function(json) {
        alert(json.result);
        console.log(json.result);
        $.each(json.list, function(i, fb) {
            //alert(fb.result);
            console.log(fb.result);
        });
    });

    $.ajax({
        url: $('#base_url').val() + 'lesson_plans/get_results_from_query_1/',
        type: "GET",
        context: document.body,
        dataType:"json",
        cache: false,
        data: "type=" + type + "&qry=" + $('#' + field + ' :selected').val(),
        success: function(data) {
    
    
            myData = json_parse(data, function (key, value) {
                var a;
                console.log(value);
            });
            console.log(myData);
            console.log(data.rows[0].page);
            var parsedJSON = eval('(' + data + ')');

            var result = parsedJSON.result;
            var count = parsedJSON.count;

            alert('result:' + result + ' count:' + count);
            var json = data;
            obj = JSON.parse(json);

            console.log(obj.count);
            $('#wait').html('');
            $('#viewresult').html(data);
        }
    });
}
