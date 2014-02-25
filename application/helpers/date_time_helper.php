<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

function date_time_helper_current_format() {
    return convert_to_gmt_local(date('Y-m-d H:i:s'), 'M. d, Y');
}

function date_time_converter($date_time) {
    return date('M. j, Y H:i:s', strtotime($date_time));
}

function date_converter($date) {
    return date_time_helper_current_date(true, 'M. j, Y', strtotime($date));
}

///helpers date time use to overall website
function date_time_helper_current_date($custom = false, $format = '', $strintoformate = '') {
    ///if some formate to follow with input time
    
    if ($custom) {
        if (!empty($strintoformate)) {
            return date($format, $strintoformate);
        } else {
            ///if only formate need
            return date($format);
        }
    } else {
        //this date effects all over the application so be carefull doing some change with this
        return date('Y-m-d H:i:s');
    }
}

/*
 * 
 * FOR SHOWING RECORDS DATE TIME PURPOSES
 */

function convert_to_gmt_local($date = '', $formate = '') {

    return date('Y-m-d H:i:s', $timestamp);
    
}

///return the time differnece WRT current time
function date_time_difference($db_date) {

    return strtotime(date_time_helper_current_date()) - strtotime($db_date);
}

function date_converter_events($date) {
    // return $date = date('M. j, Y
    // H:i:s',strtotime(date('D-M-Y',strtotime($date))));
    $old_date = date_time_helper_current_date(true, 'm-d-Y', strtotime($date));
    return date_time_helper_current_date(true, 'M. j, Y', strtotime($old_date));
}

function date_converter_events2($date) {
    // $original_date = "06 Apr 25 13:36";
    $pieces = explode("-", $date);
    return $new_date = date_time_helper_current_date(true, 'M. j, Y', strtotime($pieces [1] . "-" . $pieces [0] . "-" . $pieces [2]));
}

function date_converter_events_update($date) {
    $pieces = explode(" ", $date);
    return $new_date = date_time_helper_current_date(true, 'Y-m-d', strtotime($pieces [1] . "-" . $pieces [2] . "-" . $pieces [3]));
}

function date_converter_events_update_1($date) {
    $pieces = explode("-", $date);
    return $new_date = date_time_helper_current_date(true, 'Y-m-d', strtotime($pieces [2] . "-" . $pieces [0] . "-" . $pieces [1]));
}

/*
 * Helper to work with copy rights
 */

function copyright() {
    return 'Copyright &copy; Mentor Developer 2014. All rights reserved.';
}

// to break long string into small
function make_string_breaks($string, $max_length = 50) {

    $lines = explode('<br />', $string);
    $new_string = '';

    foreach ($lines as $line) {
        $words = explode(' ', $line);

        foreach ($words as $word) {
            $new_string .= substr(chunk_split($word, $max_length, '<br />'), 0, - 6) . ' ';
        }

        $new_string = substr($new_string, 0, - 1) . '<br />';
    }

    return $new_string;
}

function trimmed_length($string, $length) {
    return (strlen($string) > $length) ? substr($string, 0, $length) . '...' : $string;
}

/*
 * expplode and return host if its not empty
 */

function get_and_explode_host() {
    $server = $_SERVER['REQUEST_URI'];

    $exploded = explode('/', $server);

    if (is_array($exploded)) {
        return $exploded;
    } else {
        return array();
    }
}

/*
 * match header array generral
 */

function match_arrays($array1 = array(), $array2 = array()) {

    foreach ($array1 as $perarray) {
        if (in_array($perarray, $array2)) {
            return true;
        }
    }

    return false;
}

/*
 * decoding url chartacters to symbols/string
 */

function ci_urldecode($string) {
    return urldecode($string);
}

function get_hash() {
    return md5(date('Y-m-d H:i:s') + rand(14545423, 45454545451231230));
}

function md5_conv($string) {
    return md5($string);
}

function ci_filesize($perfile) {
    if (file_exists($perfile['file_path'])) {
        return formatSizeUnits(filesize($perfile['file_path']));
    } else {
        return '<span class="error">File Corrupt! / Unknown! </span>';
    }
}

/*
 * generic subtracting and adding dates function
 */

function convert_date_for_update($date, $data) {

    $time_prevoius = strtotime(str_replace('-', '/', $date));

    $difference = $data['enday'] * 3600 * 24;

    $strtotime = $time_prevoius + $difference;

    return $strtotime;
}

function m_to_s($minutes) {
    return $minutes * 60;
}

function make_first_letter_capital($string) {
    $string = ucfirst($string);
    return $string;
}

?>
