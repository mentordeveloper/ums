$(document).ready(function() {


    $("#chat_fancybox").fancybox();

    $('.basic').jRating();

    $('.rating').jRating({
      step:true,
				length : 20
    });

    $("a#passwordreset").fancybox();

});


(function($) {
	$.fn.jRating = function(op) {
		var defaults = {
			/** String vars **/
		   bigStarsPath: $('#base_url').val() + 'files/jRating-master/jquery/icons/stars.png', // path of the icon stars.png
            smallStarsPath: 'localhost/fbombmedia_udirect/files/jRating-master/jquery/icons/small.png', // path of the icon small.png
            phpPath: $('#base_url').val() + 'files/jRating-master/php/jRating.php', // path of the php file jRating.php
				type : 'big', // can be set to 'small' or 'big'
			
			/** Boolean vars **/
			step:false, // if true,  mouseover binded star by star,
			isDisabled:false,
			
			/** Integer vars **/
			length:5, // number of star to display
			decimalLength : 0, // number of decimals.. Max 3, but you can complete the function 'getNote'
			rateMax : 20, // maximal rate - integer from 0 to 9999 (or more)
			rateInfosX : -45, // relative position in X axis of the info box when mouseover
			rateInfosY : 5, // relative position in Y axis of the info box when mouseover
			
			/** Functions **/
			onSuccess : null,
			onError : null
		}; 
		
		if(this.length>0)
		return this.each(function() {
			var opts = $.extend(defaults, op),    
			newWidth = 0,
			starWidth = 0,
			starHeight = 0,
			bgPath = '';

			if($(this).hasClass('jDisabled') || opts.isDisabled)
				var jDisabled = true;
			else
				var jDisabled = false;

			getStarWidth();
			$(this).height(starHeight);

			var average = parseFloat($(this).attr('data').split('_')[0]),
			idBox = parseInt($(this).attr('data').split('_')[1]), // get the id of the box
			widthRatingContainer = starWidth*opts.length, // Width of the Container
			widthColor = average/opts.rateMax*widthRatingContainer, // Width of the color Container
			
			quotient = 
			$('<div>', 
			{
				'class' : 'jRatingColor',
				css:{
					width:widthColor
				}
			}).appendTo($(this)),
			
			average = 
			$('<div>', 
			{
				'class' : 'jRatingAverage',
				css:{
					width:0,
					top:- starHeight
				}
			}).appendTo($(this)),

			 jstar =
			$('<div>', 
			{
				'class' : 'jStar',
				css:{
					width:widthRatingContainer,
					height:starHeight,
					top:- (starHeight*2),
					background: 'url('+bgPath+') repeat-x'
				}
			}).appendTo($(this));

			$(this).css({width: widthRatingContainer,overflow:'hidden',zIndex:1,position:'relative'});

			if(!jDisabled)
			$(this).bind({
				mouseenter : function(e){
					var realOffsetLeft = findRealLeft(this);
					var relativeX = e.pageX - realOffsetLeft;
					var tooltip = 
					$('<p>',{
						'class' : 'jRatingInfos',
						html : getNote(relativeX)+' <span class="maxRate">/ '+opts.rateMax+'</span>',
						css : {
							top: (e.pageY + opts.rateInfosY),
							left: (e.pageX + opts.rateInfosX)
						}
					}).appendTo('body').show();
				},
				mouseover : function(e){
					$(this).css('cursor','pointer');	
				},
				mouseout : function(){
					$(this).css('cursor','default');
					average.width(0);
				},
				mousemove : function(e){
					var realOffsetLeft = findRealLeft(this);
					var relativeX = e.pageX - realOffsetLeft;
					if(opts.step) newWidth = Math.floor(relativeX/starWidth)*starWidth + starWidth;
					else newWidth = relativeX;
					average.width(newWidth);					
					$("p.jRatingInfos")
					.css({
						left: (e.pageX + opts.rateInfosX)
					})
					.html(getNote(newWidth) +' <span class="maxRate">/ '+opts.rateMax+'</span>');
				},
				mouseleave : function(){
					$("p.jRatingInfos").remove();
				},
				click : function(e){
					$(this).unbind().css('cursor','default').addClass('jDisabled');
					$("p.jRatingInfos").fadeOut('fast',function(){$(this).remove();});
					e.preventDefault();
					var rate = getNote(newWidth);
					average.width(newWidth);
					
					/** ONLY FOR THE DEMO, YOU CAN REMOVE THIS CODE **/
						$('.datasSent p').html('<strong>idBox : </strong>'+idBox+'<br /><strong>rate : </strong>'+rate+'<br /><strong>action :</strong> rating');
						$('.serverResponse p').html('<strong>Loading...</strong>');
					/** END ONLY FOR THE DEMO **/
						
					$.post(opts.phpPath,{
							idBox : idBox,
							rate : rate,
							action : 'rating'
						},
						function(data) {
							if(!data.error)
							{
								/** ONLY FOR THE DEMO, YOU CAN REMOVE THIS CODE **/
									$('.serverResponse p').html(data.server);
								/** END ONLY FOR THE DEMO **/
								
								
								/** Here you can display an alert box, 
									or use the jNotify Plugin :) http://www.myqjqueryplugins.com/jNotify
									exemple :	*/
								if(opts.onSuccess) opts.onSuccess();
							}
							else
							{
								
								/** ONLY FOR THE DEMO, YOU CAN REMOVE THIS CODE **/
									$('.serverResponse p').html(data.server);
								/** END ONLY FOR THE DEMO **/
								
								/** Here you can display an alert box, 
									or use the jNotify Plugin :) http://www.myqjqueryplugins.com/jNotify
									exemple :	*/
								if(opts.onError) opts.onError();
							}
						},
						'json'
					);
				}
			});

			function getNote(relativeX) {
				var noteBrut = parseFloat((relativeX*100/widthRatingContainer)*opts.rateMax/100);
				switch(opts.decimalLength) {
					case 1 :
						var note = Math.round(noteBrut*10)/10;
						break;
					case 2 :
						var note = Math.round(noteBrut*100)/100;
						break;
					case 3 :
						var note = Math.round(noteBrut*1000)/1000;
						break;
					default :
						var note = Math.round(noteBrut*1)/1;
				}
				return note;
			};

			function getStarWidth(){
				switch(opts.type) {
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
			};
			
			function findRealLeft(obj) {
			  if( !obj ) return 0;
			  return obj.offsetLeft + findRealLeft( obj.offsetParent );
			};
		});

	}
})(jQuery);


$("#Filedatanew").uploadify({
    'formData': {
        'des': $('#des').val(),
        'title': $('#title').val(),
        'page': 'video_repo',
        'hash': 'hash_video_repo',
        'userid': $('#userid').val()
    },
    height: 30,
    swf: $('#base_url').val() + 'files/uploadify/uploadify.swf',
    uploader: $('#base_url').val() + 'filesharing/fileuploading/',
    width: 200,
    maxQueueSize: 0,
    'onSelect': function(file) {
        $('#masterupload').val('yes');
    },
    messages: {
        'maxNumberUploadError': 'Exceded number of upload.',
        'nothingInTheQueueError': 'Nothing in the Queue'
    },
    'auto': false,
    'onQueueComplete': function(file, data, response) {

        if (data == 'bad')
        {

            $('#title').val('');
            $('#des').val('');
            $('#invalidtype').html('<span class="error">Please Select .Mp4,.Flv formats!</span>');

        } else {
            window.location = $('#base_url').val() + 'video_repo';
            //$.ajax({
//											
//													url: $('#base_url').val()+"sadmin/ajax_allvideos_div",
//													type: "GET",
//													context: document.body,
//													cache: false,
//													success: function(data){		
//																						
//															$('#entery_refresh').html(data);										
//															document.getElementById("btn_upload_sharing").disabled = false; 															
//														}
//														
//											});	

        }

    },
});

function my_func_video()
{

    $("#Filedatanew").uploadify({
        'formData': {
            'des': $('#des').val(),
            'title': $('#title').val(),
            'page': 'video_repo',
            'hash': 'hash_video_repo',
            'userid': $('#userid').val()
        },
        height: 30,
        swf: $('#base_url').val() + 'files/uploadify/uploadify.swf',
        uploader: $('#base_url').val() + 'filesharing/fileuploading/',
        width: 200,
        maxQueueSize: 0,
        messages: {
            'maxNumberUploadError': 'Exceded number of upload.',
            'nothingInTheQueueError': 'Nothing in the Queue'
        },
        'auto': false,
        'onSelect': function(file) {
            $('#masterupload').val('yes');
        },
        'onQueueComplete': function(file, data, response) {

            if (data == 'bad')
            {

                $('#title').val('');
                $('#des').val('');

                $('#invalidtype').html('<span class="error">Please Select .Mp4,.Flv formats!</span>');

            } else {

                window.location = $('#base_url').val() + 'video_repo';

                //$.ajax({
//											
//													url: $('#base_url').val()+"sadmin/ajax_allvideos_div",
//													type: "GET",
//													context: document.body,
//													data : "title=",
//													cache: false,
//													success: function(data){												
//															$('#entery_refresh').html(data);																													
//															document.getElementById("btn_upload_sharing").disabled = false; 
//														}
//														
//											});	
            }
        },
    });

}


function save_coment_schooladmin()
{

    if ($('#valtext').val() != '')
    {


        $.ajax({
            url: $('#base_url').val() + "permissions/save_coments_API",
            type: "GET",
            context: document.body,
            data: "title=" + $('#videotitle').val() + "&id=" + $('#videoid').val() + "&url=" + $('#videoname').val() + "&rank=" + $('#testrate').val() + "&coment=" + $('#valtext').val(),
            cache: false,
            success: function(data) {

                $('#cm_tbl').append(data);
                $('#cmnt_msg').html('<div class="alert alert-success">Added Successfully</div>');

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
function upload_file_sharing()
{
    if ($('#des').val() != '' && $('#title').val() != '')
    {

        if ($('#masterupload').val() == 'no')
        {
            $('#success_uploading').html('<span class="error">Please Select your uploads!</span>').show().delay(1800).slideUp(2000);
            ;
            document.getElementById("btn_upload_sharing").disabled = false;
            return false;
        }

        document.getElementById("btn_upload_sharing").disabled = true;

        $('#Filedatanew').uploadify('upload', '*');

    }
    else
    {
        if ($('#des').val() == '')
        {
            $('#success_uploading').html('<span class="alert alert-error">Please Enter Description!</span>').show().delay(1800).slideUp(2000);
            return;
        } else
        {
            $('#success_uploading').html('<span class="alert alert-error">Please Enter Title!</span>').show().delay(1800).slideUp(2000);
            return;
        }
    }

}


function click_video(id)
{


    $.ajax({
        url: $('#base_url').val() + "sadmin/videos_from_title",
        type: "GET",
        context: document.body,
        data: "title=" + $('#title_video_get' + id).val(),
        cache: false,
        success: function(data) {

            $('#listed' + id).html('<span style="color:red">Videos are listed below!</span>').show().delay(1800).slideUp(2000);
            $('#show_videos').html(data);
        }

    });



}

function click_video_school(id)
{


    $.ajax({
        url: $('#base_url').val() + "permissions/videos_from_title",
        type: "GET",
        context: document.body,
        data: "title=" + $('#title_video_get' + id).val(),
        cache: false,
        success: function(data) {

            $('#listed' + id).html('<span style="color:red">Videos are listed below!</span>').show().delay(1800).slideUp(2000);
            $('#show_videos').html(data);
        }

    });



}

function click_video_users(id)
{
    $.ajax({
        url: $('#base_url').val() + "instructor/videos_from_title",
        type: "GET",
        context: document.body,
        data: "title=" + $('#title_video_get' + id).val(),
        cache: false,
        success: function(data) {

            $('#listedd' + id).html('<span style="color:red">Videos are listed below!</span>').show().delay(1800).slideUp(2000);

            $("#show_videos").fancybox().trigger('click');
            $('#html_ajax').html(data);
        }

    });



}
function search_videos()
{

    if ($('#value_sreach').val() == '')
    {
        $('#s_uploading').html('<div class="alert alert-error">Please Enter Title!</div>').show().delay(1800).slideUp(2000);
        return;
    }
    
    $('#sr_uploading').html('<div class="alert alert-info"><button data-dismiss="alert" class="close"></button><strong>Info!</strong> Searching Videos !Please wait... </div>').show();
    
    $.ajax({
        url: $('#base_url').val() + "sadmin/search_video",
        type: "GET",
        context: document.body,
        data: "value=" + $('#value_sreach').val(),
        cache: false,
        success: function(data) {


            $('#show_links').html(data);
            $('#sr_uploading').hide();


        }

    });


}

function search_videos_school()
{

    $('#sr_uploading').html('<div class="alert alert-info"><button data-dismiss="alert" class="close"></button><strong>Info!</strong> Searching Videos !Please wait... </div>').show();
    $.ajax({
        url: $('#base_url').val() + "permissions/search_video",
        type: "GET",
        context: document.body,
        data: "value=" + $('#value_sreach').val(),
        cache: false,
        success: function(data) {


            $('#show_links').html(data);
            $('#sr_uploading').hide();


        }

    });


}
function search_videos_users()
{

    if ($('#value_sreach').val() == '')
    {
        $('#s_uploading').html('<span class="alert alert-error">Please Enter Title!</span>').show().delay(1800).slideUp(2000);
        return;
    }
    $('#sr_uploading').html('<div class="alert alert-info"><button data-dismiss="alert" class="close"></button><strong>Info!</strong> Searching Videos !Please wait... </div>').show();
    $.ajax({
        url: $('#base_url').val() + "instructor/search_video",
        type: "GET",
        context: document.body,
        data: "value=" + $('#value_sreach').val(),
        cache: false,
        success: function(data) {



            $('#show_links').html(data);
            $('#sr_uploading').hide();


        }

    });


}

function removee_video_repo(id)
{
    $.ajax({
        url: $('#base_url').val() + "filesharing/remove_vide_by_id",
        type: "GET",
        context: document.body,
        data: "id=" + id,
        cache: false,
        success: function(data) {

            $('#_row' + id).hide();

        }

    });

}

function remove_video(id)
{

    $('<div></div>').appendTo('body')
            .html('<div><h6>Delete <b>Video?</b></h6></div>')
            .dialog({
        modal: true, title: 'Remove Confirmation', zIndex: 10000, autoOpen: true,
        width: 'auto', resizable: false,
        buttons: [{
                text: 'Delete',
                click: function() {
                    removee_video_repo(id);
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

