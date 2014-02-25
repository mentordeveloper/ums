<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

/*
|--------------------------------------------------------------------------
| File and Directory Modes
|--------------------------------------------------------------------------
|
| These prefs are used when checking and setting modes when working
| with the file system.  The defaults are fine on servers with proper
| security, but you may wish (or even need) to change the values in
| certain environments (Apache running a separate process for each
| user, PHP under CGI with Apache suEXEC, etc.).  Octal values should
| always be used to set the mode correctly.
|
*/
define('FILE_READ_MODE', 0644);
define('FILE_WRITE_MODE', 0666);
define('DIR_READ_MODE', 0755);
define('DIR_WRITE_MODE', 0777);

/*
|--------------------------------------------------------------------------
| File Stream Modes
|--------------------------------------------------------------------------
|
| These modes are used when working with fopen()/popen()
|
*/

define('FOPEN_READ',							'rb');
define('FOPEN_READ_WRITE',						'r+b');
define('FOPEN_WRITE_CREATE_DESTRUCTIVE',		'wb'); // truncates existing file data, use with care
define('FOPEN_READ_WRITE_CREATE_DESTRUCTIVE',	'w+b'); // truncates existing file data, use with care
define('FOPEN_WRITE_CREATE',					'ab');
define('FOPEN_READ_WRITE_CREATE',				'a+b');
define('FOPEN_WRITE_CREATE_STRICT',				'xb');
define('FOPEN_READ_WRITE_CREATE_STRICT',		'x+b');



define('SUPPORTEMAIL', 'mentordeveloper@gmail.com');
define('FILE_UPLOAD_PATH',$_SERVER['DOCUMENT_ROOT'].'');


/*
 * Constant for Database Setting
 */
define('SUBDOMAIN_NAME_TXT','ums');
define('SUBDOMAIN_NAME_WITH_HTTP','http://localhost/ums');
define('DATABASE_NAME_PREFIX', "");
define('DATABASE_STRUCTURE', "");
define("SELECT_DB_NAME","");
define("HOST_DB","localhost");
define("USERNAME_DB","root");
define("PASSWORD_DB","");


/////my defined constants
//define('SITE_ROOT',$_SERVER['DOCUMENT_ROOT'].'/fbombmedia_udirect/');
define('SITE_ROOT',$_SERVER['DOCUMENT_ROOT'].'/');
define('SUBDOMAIN_NAME','ums');
///////////constants for school admin side start

define('INVALID_MESSAGE','Invalid login details');
define('CUSTOM_CALENDER_DECLINE_MESSAGE','Request for Custom calendar (%s) Denied!');
define('CUSTOM_CALENDER_APPROVE_MESSAGE','Request for Custom calendar (%s) Approved!');
define('USER_INSTANT_SEARCH_NOT_FOUND','User Not Found !');
define('ROLE_REMOVE_NOTIFICATION','Role Removed successfully!');
define('ROLE_INVALID_REMOVE_NOTIFICATION','Invalid role id to remove');
define('PERMISSION_REMOVE_NOTIFICATION','Permission Removed successfully');
define('PERMISSION_INVALID_REMOVE_NOTIFICATION','Invalid Permission id to remove');
define('ROLE_ADD_NOTIFICATION','Role added successfully');
define('ROLE_EMPTY_NOTIFICATION','Please enter role name');
define('PERMISSION_ADD_NOTIFICATION','Please enter role name');
define('PERMISSION_EMPTY_NOTIFICATION','Please enter permission name');
define('USER_ADD_NOTIFICATION','User added successfully');
define('USER_ADD_ERROR_FIRST_NAME','Please enter first name');
define('USER_ADD_ERROR_LAST_NAME','Please enter last name');
define('USER_ADD_ERROR_USERNAME','Please enter user name');
define('USER_ADD_ERROR_PASSWORD','Please enter password');
define('USER_ADD_ERROR_ROLE','Please select role');
define('USER_ADD_ALREADY_EXISITS','User login already exist! please choose another');
define('USER_ADDED_SUCCESS','User added successfully');

////ATTENDECE REPORT CONSTANTS

define('HEAIDNG_ATTENDENCE_REPORT','Attendence Report for School');
define('TOTAL_STATUS','Status');
define('TOTAL_CLASSES_TAKEN','Total Classes Taken');
define('CLASSED_STATUS','Classes Status');
define('TOTAL_MARKED','Total Attendence Marked ');
define('TOTAL_MISSED_CLASSES','Total Classes Missed');
define('TOTAL_AVERAGE','Average');


///////////constants for school admin side end

///////userside constants start 

define('SEARCH_CUSTOM_CALENDER_NOT_FOUND','No Calendar found');

///CUSTOM CALENDER SEARCH HEADING

define('SEARCH_CUSTOM_CALENDER_NAME','Name');
define('SEARCH_CUSTOM_CALENDER_KEYWORD','Keyword');
define('SEARCH_CUSTOM_CALENDER_DESCRIPTION','Description');
define('SEARCH_CUSTOM_CALENDER_ADD_TO_CAELNDER','Add to calendar');
define('SEARCH_CUSTOM_CALENDER_SUBMIT_APPROVAL','Your calendar has been submitted for approval');
define('SEARCH_CUSTOM_CALENDER_ALREADY_EXISITS','Course already exist! please choose another');
define('SEARCH_CUSTOM_CALENDER_FIRST_NAME_MISSING','Please enter first name');
define('SEARCH_CUSTOM_CALENDER_KEYWORD_MISSING','Please enter keywords');
define('SEARCH_CUSTOM_CALENDER_DESCRIPTION_MISSING','Please enter descriptions');
define('SEARCH_CUSTOM_CALENDER_UPDATE_MESSAGE','Calendar updated successfully');


define('CUSTOM_CALENDER_INVITED_STATUS_HEAIDNG','Status of invited students');

define('CUSTOM_CALENDER_ACCPET_MSG','Accepted');
define('CUSTOM_CALENDER_DENIED_MSG','Denied');
define('CUSTOM_CALENDER_PENDING_MSG','Pending');

////end custom calender 

///EVENT SHARE CONSTANTS

define('CUSTOM_CALENDER_NOTIFICATION_MSG','Invite for  events');
define('CUSTOM_CALENDER_NOTIFICATION_DETAILED',' has invited to join his events');
define('HEADING_SHARE_EVENTS','Share Events!');
define('HEADING_SHARE_SUB','Select user to share event!');

////courses constants

define('COURSE_DROP_DOWN_MSG','Please select your course');



////SEND NOTIFICATIONS CONSTANTS

define('HEADING_SEND_TO_ALL','Send to All Students!');
define('HEADING_SEND','Send Notification!');
define('HEADING_SEND_SELECT_STUDENTS','Select Students to send Notifcaton!');
define('HEADING_SELECT_ROLE','Select Role to send Notifcaton!');
define('HEADING_SELECT_ALL_ROLE','Send to All Roles!');

///////////


////////////////SYALLABUS POST NOTIFICATIONS


define('SYALLABUS_SAVED','Syllabus Saved!');
define('SYALLABUS_SAVED_NOTHING','Nothing to save!');


////////////////UPLOAD FILE DIRECTORY


define('PATH_UPLOAD_CHECK','./files/images/original/');


/* End of file constants.php */
/* Location: ./application/config/constants.php */