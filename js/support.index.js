// JavaScript Document

$(document).ready(
		function() {

			$("#contact_id_box").fancybox();

			$("#email_support_send").validate(
					{
						rules : {
							user_name : "required",
							message_user : "required",
							email_user : {
								required : true,
								email : true
							},

						},
						messages : {
							user_name : "Please enter your name",
							message_user : "Please enter your message",
							email_user : {
								required : "Please enter your email",

							},

						},
						highlight : function(element) { // hightlight

							$(element).closest('.control-group').addClass(
									'error');

						},
						success : function(label) {
							label.closest('.control-group')
									.removeClass('error');
							label.remove();
						},
						errorPlacement : function(error, element) {
							error.addClass('help-inline').insertAfter(
									element.closest('.controls'));
						},

						submitHandler : function(form) {

							email_support();

						}

					});

		});

function email_support() {

	$.ajax({

		url : $('#base_url').val() + "contactus/email_thanks",
		type : "GET",
		context : document.body,
		data : "username=" + $('#user_name').val() + "&email="
				+ $('#email_user').val() + "&message="
				+ $('#message_user').val(),
		cache : false,
		success : function(data) {

			$('#user_name').val('');
			$('#email_user').val('');
			$('#message_user').val('');

			$('#msg_user').html(data);
			$("#global_use_msg").fancybox().trigger('click');

			setTimeout(function() {
				$.fancybox.close();
			}, 1300);

		}

	});

}

/*
 * Popup code for sending help email
 */

function email_support_popup(form) {

	$.ajax({

		url : $('#base_url').val() + "contactus/email_thanks",
		type : "GET",
		context : document.body,
		data : "username=" + $('#user_name1').val() + "&email="
				+ $('#email_user1').val() + "&message="
				+ $('#message_user1').val(),
		cache : false,
		success : function(data) {

			$('#msg_user').html(data);
			$("#global_use_msg").fancybox().trigger('click');

			setTimeout(function() {
				$.fancybox.close();
			}, 1300);

		}

	});

}

function update_all_notifcatin() {
	$.ajax({

		url : $('#base_url').val() + "permissions/update_mail_status1",
		type : "GET",
		context : document.body,
		data : "id_user",
		cache : false,
		success : function(data) {

			$('#hide_notifcations').hide();
		}
	});

}
function update_mynotifcation() {

	$.ajax({

		url : $('#base_url').val() + "permissions/update_notifications",
		type : "GET",
		context : document.body,
		cache : false,
		success : function(data) {

		}

	});
}

function update_messages() {
	$.ajax({

		url : $('#base_url').val() + "permissions/update_mail_status",
		type : "GET",
		context : document.body,
		data : "id_user",
		cache : false,
		success : function(data) {

			$('#hide_count').hide();
		}
	});

}
function update_messages_student() {
	$.ajax({

		url : $('#base_url').val() + "instructor/update_mail_statuss",
		type : "GET",
		context : document.body,
		data : "id_user",
		cache : false,
		success : function(data) {

			$('#hide_count').hide();
		}
	});

}
function remove_notifcation(id) {

	$.ajax({
		url : $('#base_url').val() + "permissions/update_notifications/",
		type : "GET",
		context : document.body,
		cache : false,
		success : function(data) {

			$('#notif').hide();
		}
	});
};
