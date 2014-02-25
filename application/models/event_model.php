<?php

class Event_model extends CI_Model {

    function __construct() {
        // Call the Model constructor
        parent::__construct();
    }

    function validate_user_sadmin($data = array()) {
        $this->db->select('*');
        $this->db->from('tbl_login');
        $this->db->where($data);
        $this->db->where("tbl_login.is_super_admin = 1");

        $query = $this->db->get();


        if ($query->num_rows() > 0) {

            $result = $query->result_array();

            $this->session->set_userdata('user_data', $result);

            return true;
        }

        return false;
    }

    function validate_user($data = array(), $view = '') {


        $this->db->select('tbl_login.*,tbl_schools_data.name');
        $this->db->from('tbl_login');
        $this->db->join('tbl_schools_data', 'tbl_login.s_id=tbl_schools_data.id', 'left');
        $this->db->where($data);
        $this->db->where("tbl_login.is_super_admin = 0");

        $query = $this->db->get();

        
        if ($query->num_rows() > 0) {
            $result = $query->result_array();

            $result[0]['access'] = $view;
            $result[0]['side'] = 'userside';
            $result = $result[0];

            
            
            ///For User Login Cache
            $not_char_array = array(" ", "/", "-",'.');
            $user_login_data_cacheID = $result['s_id'].'_'.strtolower(str_replace($not_char_array, "_", $result['lg_email'])) .'_'.$result['lg_id'] . '_user_data';
            $admin_image = $this->zf_cache->remove($user_login_data_cacheID);
            $this->zf_cache->save($result, $user_login_data_cacheID, array($user_login_data_cacheID));
            $this->session->set_userdata('user_data_cache_file', $user_login_data_cacheID);
            
            $this->session->set_userdata('user_data', $result);
            $this->session->userdata('show_header', 'userside');

            $this->db->delete('tbl_event_general_temp', array('user_id' => $result['lg_id']));

            return true;
        }

        return false;
    }

    function get_usertype($data = array()) {

        $query = $this->db->get_where('tbl_login', $data);

        if ($query->num_rows() > 0) {
            $result = $query->result_array();
            $results = $result[0]['lg_type'];
            return $results;
        }

        return false;
    }

    function get_admin_login_check($data) {

        $query = $this->db->get_where('tbl_login', $data);

        if ($query->num_rows() > 0) {
            $result = $query->result_array();

            $s_id = $result[0]['s_id'];
            $lg_id = $result[0]['lg_type'];

            $condition = array(
                'id' => $lg_id,
                's_id' => 0
            );

            $query1 = $this->db->get_where('tbl_roles', $condition);

            $result1 = $query1->result_array();

            if (count($result1) > 0) {

                return false;
            } else {
                return true;
            }
        }

        return false;
    }

    function get_school_status($data) {

        $query = $this->db->get_where('tbl_login', $data);

        if ($query->num_rows() > 0) {
            $result = $query->result_array();
            $s_id = $result[0]['s_id'];

            $condition = array(
                'id' => $s_id
            );

            $query1 = $this->db->get_where('tbl_schools_data', $condition);

            if ($query1->num_rows() > 0) {

                $result1 = $query1->result_array();

                if ($result1[0]['status'] == 'false') {
                    return false;
                } else {
                    return true;
                    ///school is offline
                }
            } else {

                return false;
                ///didnt find any schools
            }
        }

        return false;
    }

    function Get_Weeks_all_available() {

        $this->db->select('*');
        $this->db->from('p_weeks');
        $query = $this->db->get();

        return $query->result_array();
    }

    function Search_buisness_deal_by_id($buisness_id) {

        $this->db->select('*');
        $this->db->from('p_deals');
        $this->db->where("p_id =$buisness_id");
        $query = $this->db->get();

        return $query->result_array();
    }

    function Search_buisness_feature_by_id($buisness_id) {

        $this->db->select('*');
        $this->db->from('p_featured_deals');
        $this->db->where("p_id =$buisness_id");
        $query = $this->db->get();

        return $query->result_array();
    }

    function Save_user_access($arra_data, $buis_uid) {

        $date12 = date("Y-m-d H:i:s");

        foreach ($arra_data as $perdata) {

            $data['p_email'] = $perdata;
            $data['p_buisness_id'] = $buis_uid;
            $data['p_date_time'] = $date12;

            $query = $this->db->insert('p_user_deal_access', $data);
        }

        return true;
    }

    function Get_deal_by_id($bussnes_id) {

        $this->db->select('*');
        $this->db->from('p_deals');
        $this->db->where("p_id =$bussnes_id");
        $query = $this->db->get();

        return $query->result_array();
    }

    function get_pinned_user_email($buness_id) {

        $this->db->select('*');
        $this->db->from('p_survey');
        $this->db->where("p_buisness_id =" . $buness_id['p_buiss_id']);
        $query = $this->db->get();
        $array_emails = array();

        foreach ($row = $query->result_array() as $key => $petitem) {

            $this->db->select('*');
            $this->db->from('p_user_registrations');
            $this->db->where("p_id =" . $petitem['p_user_id']);
            $query = $this->db->get();
            if ($query->num_rows > 0) {

                $result = $query->result_array();
                $user_email = $result[0]['p_email'];
                $array_emails[$key] = $user_email;
            }

            if ($query->num_rows == 0) {

                $this->db->select('*');
                $this->db->from('p_user_facebook');
                $this->db->where("p_user_id =" . $petitem['p_user_id']);
                $query = $this->db->get();
                $result = $query->result_array();
                $user_email = $result[0]['p_email'];
                $array_emails[$key] = $user_email;
            }
        }

        return $array_emails;
    }

    function Search_buisness_deal($search_term, $search_by) {

        $array_reverse = array();
        $query = '';

        if ($search_by != 'ALL') {

            $arra_raneg = explode('-', $search_by);

            $start = $arra_raneg[0];
            $end = $arra_raneg[1];

            $start = date("Y-m-d", strtotime($start)) . " 00:00:00";
            $end = date("Y-m-d", strtotime($end)) . " 23:59:59";

            $this->db->select('*');
            $this->db->from('p_deals');
            $this->db->where("p_date_time <='" . $end . "'");
            $this->db->where("p_date_time >='" . $start . "'");
        } else {

            $this->db->select('*');
            $this->db->from('p_deals');
        }
        $query = $this->db->get();

        return $query->result_array();
    }

    function Search_buisness_by_dates($dates) {

        $this->db->select('*');
        $this->db->from('p_records');
        $this->db->where('p_date_time <="' . $dates[0] . '" and p_date_time>="' . $dates[0] . '"');
        $query = $this->db->get();
        return $query->result_array();
    }

    function Search_buisness($search_term, $search_by) {

        $array_reverse = array();
        $query = '';
        $arra_raneg = array();


        if ($search_by != 'ALL') {

            $arra_raneg = explode('-', $search_by);

            if ($search_term == 'DATES') {

                $arra_raneg = explode('|', $search_by);
            }

            $start = $arra_raneg[0];
            $end = $arra_raneg[1];

            $start = date("Y-m-d", strtotime($start)) . " 00:00:00";
            ;
            $end = date("Y-m-d", strtotime($end)) . " 23:59:59";
            ;


            $this->db->select('*');
            $this->db->from('p_records');
            $this->db->where('p_date_time <="' . $end . '" and p_date_time>="' . $start . '"');
        } else {
            if ($search_term != '') {
                $this->db->select('*');
                $this->db->from('p_records');
                $this->db->like('s_buisness_name', $search_term);
            } else {
                $this->db->select('*');
                $this->db->from('p_records');
            }
        }



        $query = $this->db->get();

        $array_reverse = array();

        if ($query->num_rows > 0) {
            foreach ($query->result_array() as $key => $perrow) {

                $array_reverse[$key]['s_id'] = $perrow['s_id'];
                $array_reverse[$key]['s_buisness_id'] = $perrow['s_buisness_id'];
                $array_reverse[$key]['s_buisness_name'] = $perrow['s_buisness_name'];
                $array_reverse[$key]['s_buisness_location'] = $perrow['s_buisness_location'];
                $array_reverse[$key]['s_survey_id'] = $perrow['s_survey_id'];
                $array_reverse[$key]['s_local_path'] = $perrow['s_local_path'];

                $query123_23 = $this->db->get_where('p_deals', array('p_buiss_id' => $perrow['s_id']));
                $array_reverse[$key]['duplicate_protection'] = $query123_23->num_rows;

                $query123 = $this->db->get_where('p_survey', array('p_buisness_name' => $perrow['s_buisness_id']));
                $array_reverse[$key]['buissness_surveys'] = $query123->num_rows;

                foreach ($query123->result_array() as $values => $perro123w) {

                    $query123 = $this->db->get_where('p_user_registrations', array('p_id' => $perro123w['p_user_id']));
                    $array_reverse[$key]['persons'][$values] = $query123->result_array();

                    $array_reverse[$key]['zain'][$values] = date_time_helper_current_date(true, 'm-d-Y g:h:sa', strtotime($perro123w['p_date_time']));
                    $array_reverse[$key]['week'][$values] = $perro123w['p_week_id'];


                    if ($query123->num_rows() == 0) {
                        $query12323 = $this->db->get_where('p_user_facebook', array('p_user_id' => $perro123w['p_user_id']));
                        $array_reverse[$key]['persons'][$values] = $query12323->result_array();
                    }

                    $query12312321 = $this->db->get_where('p_survey_choices', array('p_id' => $perro123w['p_answer']));
                    $array_reverse[$key]['persons'][$values]['p_answer'] = $query12312321->result_array();
                }
            }

            return $array_reverse;
        }
    }

    function Get_all_weeks() {

        $this->db->select('*');
        $this->db->from('p_weeks');
        $query12332 = $this->db->get();
        $row = $query12332->result_array();

        return $row;
    }

    function Get_buisness_detail($b_id) {

        $this->db->select('*');
        $this->db->from('p_records');
        $this->db->join('p_survey', 'p_records.s_id=p_survey.p_buisness_id');
        $this->db->where('s_id', $b_id);
        $array_reverse = array();
        $query12332 = $this->db->get();

        $row = $query12332->result_array();
        $array_reverse['s_id'] = $b_id;
        $array_reverse['B_D'] = $row;

        $query123 = $this->db->get_where('p_survey', array('p_buisness_name' => $row[0]['s_buisness_id']));

        foreach ($query123->result_array() as $values => $perro123w) {

            $array_reverse['p_date_time'][$values] = date_time_helper_current_date(true, 'm-d-Y g:h:sa', strtotime($perro123w['p_date_time']));

            $query123 = $this->db->get_where('p_user_registrations', array('p_id' => $perro123w['p_user_id']));

            $array_reverse['persons'][$values] = $query123->result_array();

            if ($query123->num_rows() == 0) {

                $query12323 = $this->db->get_where('p_user_facebook', array('p_user_id' => $perro123w['p_user_id']));

                $row_fetch = $query12323->result_array();

                $arry_standard = array();

                $arry_standard[0]['p_id'] = $row_fetch[0]['p_id'];
                $arry_standard[0]['p_first_name'] = $row_fetch[0]['p_fname'];
                $arry_standard[0]['p_last_name'] = $row_fetch[0]['p_lname'];
                $arry_standard[0]['p_date_time'] = $row_fetch[0]['p_datetime'];
                $arry_standard[0]['p_status'] = $row_fetch[0]['p_status'];


                $array_reverse['persons'][$values] = $arry_standard;
            }

            $query12312321 = $this->db->get_where('p_survey_choices', array('p_id' => $perro123w['p_answer']));
            $array_reverse['persons'][$values]['p_answer'] = $query12312321->result_array();
        }


        return $array_reverse;
    }

    function Update_deal_features_pins($data, $p_id) {


        $check = array('p_id' => $p_id);
        $query = $this->db->update('p_featured_deals', $data, $check);
        return $query;
    }

    function Update_deal_info($data, $p_id) {


        $check = array('p_id' => $p_id);
        $query = $this->db->update('p_deals', $data, $check);
        return $query;
    }

    function Get_weeks($buissnes_iod) {

        $this->db->select_max('p_week_id');
        $this->db->from('p_survey');
        $this->db->where('p_buisness_name =' . "'" . $buissnes_iod . "'");

        $query = $this->db->get();

        $row = $query->result_array();

        $weeks = $row[0]['p_week_id'];

        return $weeks;
    }

    function Get_all_buisness_deal($buissnes_id) {

        $array_reverse = array();
        $query = $this->db->get_where('p_deals', array('p_buiss_id' => $buissnes_id));
        $row123 = $query->result_array();

        foreach ($row123 as $counter => $perweek) {

            $week = $perweek['p_week'];

            $array_reverse[$counter]['p_buiss_id'] = $perweek['p_buiss_id'];
            $array_reverse[$counter]['p_id'] = $perweek['p_id'];
            $array_reverse[$counter]['p_deal_title'] = $perweek['p_deal_title'];
            $array_reverse[$counter]['p_date_time'] = $perweek['p_date_time'];
            $array_reverse[$counter]['p_version'] = $perweek['p_version'];
            $array_reverse[$counter]['p_week'] = $perweek['p_week'];

            if (isset($perweek['p_buiss_id'])) {

                $query123 = $this->db->get_where('p_survey', array('p_buisness_id' => $perweek['p_buiss_id'], 'p_week_id' => $week));

                foreach ($query123->result_array() as $values => $perro123w) {

                    $query123 = $this->db->get_where('p_user_registrations', array('p_id' => $perro123w['p_user_id']));

                    $array_reverse[$counter]['persons'][$values] = $query123->result_array();
                    $array_reverse[$counter]['week'][$values] = $perro123w['p_week_id'];

                    if ($query123->num_rows() == 0) {

                        $query12323 = $this->db->get_where('p_user_facebook', array('p_user_id' => $perro123w['p_user_id']));

                        $row_fetch = $query12323->result_array();

                        $arry_standard = array();

                        $arry_standard[0]['p_id'] = $row_fetch[0]['p_id'];
                        $arry_standard[0]['p_first_name'] = $row_fetch[0]['p_fname'];
                        $arry_standard[0]['p_last_name'] = $row_fetch[0]['p_lname'];
                        $arry_standard[0]['p_date_time'] = $row_fetch[0]['p_datetime'];
                        $arry_standard[0]['p_status'] = $row_fetch[0]['p_status'];
                        $arry_standard[0]['p_email'] = $row_fetch[0]['p_email'];

                        $array_reverse[$counter]['persons'][$values] = $arry_standard;
                    }
                }
            }
        }
        //print_r($array_reverse);
        return $array_reverse;
    }

    function Send_email_all_pins($p_id) {

        $array_reverse = array();

        $query = $this->db->get_where('p_survey', array('p_buisness_id' => $p_id));

        foreach ($query->result_array() as $values => $perrow) {

            $query123 = $this->db->get_where('p_user_registrations', array('p_id' => $perrow['p_user_id']));

            $row = $query123->result_array();

            if (isset($row[0]['p_email'])) {
                $array_reverse[$values] = $row[0]['p_email'];
            }

            if ($query123->num_rows() == 0) {

                $query12323 = $this->db->get_where('p_user_facebook', array('p_user_id' => $perrow['p_user_id']));

                $row_fetch = $query12323->result_array();
                if (isset($row_fetch[0]['p_email'])) {
                    $array_reverse[$values] = $row_fetch[0]['p_email'];
                }
            }
        }

        return $array_reverse;
    }

    function Get_all_featured_pins() {

        $query = $this->db->get_where('p_featured_deals');

        return $query->result_array();
    }

    function remove_pinner_maker($id) {

        $check = array('p_id' => $id);
        $query = $this->db->delete('p_featured_deals', $check);
        return $query;
    }

    function Insert_feature_deal($array_data) {

        $query = $this->db->insert('p_featured_deals', $array_data);
        return $query;
    }

    function Check_master_entery($buisness_id) {

        $query = $this->db->get_where('p_pins_general', array('buisness_id' => $buisness_id));

        if ($query->num_rows() > 0) {
            return 'exists';
        } else {

            return 'new';
        }
    }

    function Get_Servey_Count($data) {

        $query = $this->db->get_where('p_deals', array('p_buiss_id' => $data['buissness_id']));

        return $query->num_rows();
    }

    function Save_deal_info_master($data) {

        $query = $this->db->insert('p_pins_general', $data);
        return $query;
    }

    function Save_deal_info($data) {

        $query = $this->db->insert('p_deals', $data);
        return $query;
    }

    function Delete_deal_info($buisneess_id) {

        $check = array('p_id' => $buisneess_id);
        $query = $this->db->delete('p_deals', $check);
        return $query;
    }

    function insert_event($data) {


        $this->db->select('ad_ins_timezone');
        $this->db->from('tbl_adittional_info');
        $this->db->where('ad_ins_id  =' . "'" . $data['ev_instructor_id'] . "'");

        $query = $this->db->get();

        $row = $query->result_array();

        $timezone = $row[0]['ad_ins_timezone'];



        $evdate = str_replace("/", "-", $data[1]);

        $posam = strpos($data[3], "am");
        $pospm = strpos($data[3], "pm");
        if ($posam == true) {
            $ev_start_time = explode("am", $data[3]);
            $ev_start_time_final = $ev_start_time[0];
            $poscol = strpos($ev_start_time_final, ":");
            if ($poscol == false) {
                $start_time_final = $ev_start_time[0] . ":00";
            } else {
                $start_time_final = $ev_start_time[0];
            }
        }
        if ($pospm == true) {
            $ev_start_time = explode("pm", $data[3]);
            $ev_start_time_final = $ev_start_time[0];
            $ev_start_time_final+=12;
            $poscol = strpos($ev_start_time[0], ":");
            if ($poscol == false) {
                $start_time_final = $ev_start_time_final . ":00";
            } else {
                $starttime = explode(":", $ev_start_time[0]);

                $start_time_final = $starttime[0] + 12;
                $start_time_final = $start_time_final . ":" . $starttime[1];
            }
        }

        $posam1 = strpos($data[4], "am");
        $pospm1 = strpos($data[4], "pm");
        if ($posam1 == true) {
            $ev_end_time = explode("am", $data[4]);
            $ev_end_time_final = $ev_end_time[0];
            $poscol = strpos($ev_end_time_final, ":");
            if ($poscol == false) {
                $end_time_final = $ev_end_time_final . ":00";
            } else {
                $end_time_final = $ev_end_time_final;
            }
        }
        if ($pospm1 == true) {
            $ev_end_time = explode("pm", $data[4]);
            $ev_end_time_final = $ev_end_time[0];
            $ev_end_time_final+=12;

            $poscol = strpos($ev_end_time[0], ":");
            if ($poscol == false) {
                $end_time_final = $ev_end_time_final . ":00";
            } else {
                $endtime = explode(":", $ev_end_time[0]);

                $end_time_final = $endtime[0] + 12;
                $end_time_final = $end_time_final . ":" . $endtime[1];
            }
        }

        $datavalue = array("ev_course_id" => $data['ev_course_id'],
            "ev_instructor_id" => $data['ev_instructor_id'],
            "ev_date" => $evdate,
            "ev_location" => $data[2],
            "ev_start_time" => $start_time_final,
            "ev_end_time" => $end_time_final,
            "ev_event_type" => 'other',
            "ev_event_other" => $data[0],
            "ev_notes" => $data[5],
            "ev_date_time" => date("Y-m-d H:i:s"),
            "event_timezone" => $timezone);

        $query = $this->db->insert('tbl_event_general', $datavalue);

        return $query;
    }

    function get_indvidual_event_by_id($id) {

        $this->db->select('ev_custom_data');
        $this->db->from('tbl_event_general');
        $this->db->where('ev_id', $id);

        $query = $this->db->get();
        $result = $query->result_array();

        if ($query->num_rows() > 0) {
            return $result[0]['ev_custom_data'];
        }
    }

    function Save_event_image($data) {

        $query = $this->db->insert('tbl_event_images', $data);
        return $query;
    }

    function get_event_image_exits($data) {

        $this->db->select('*');
        $this->db->from('tbl_event_images');
        $this->db->where($data);

        $query = $this->db->get();
        $result = $query->result_array();

        if ($query->num_rows() > 0) {
            return $result[0];
        }
    }

    function Check_event_images_exits($event_id) {

        $query = $this->db->get_where('tbl_event_images', array('event_id' => $event_id));

        if ($query->num_rows() > 0) {
            return 'exists';
        } else {

            return 'new';
        }
    }

    function Update_event_images($data, $e_id) {


        $check = array('event_id' => $e_id);
        $query = $this->db->update('tbl_event_images', $data, $check);
        return $query;
    }

    //for search events 
    function get_events_search($data, $school_id) {

        $group_array = array("ev_id");
        $this->db->select('*');
        $this->db->from('tbl_event_general');
        $this->db->join('tbl_courses_list', 'tbl_courses_list.co_id=tbl_event_general.ev_course_id');
        $this->db->where('tbl_courses_list.s_id', $school_id);
        //$str = "(tbl_event_general.ev_event_type LIKE '%".$data."%' OR tbl_event_general.ev_event_other LIKE '%".$data."%' OR tbl_event_general.ev_notes LIKE '%".$data."%' OR tbl_event_general.ev_custom_data LIKE '%".$data."%' ) ";
        $str = "(tbl_event_general.ev_event_type LIKE '%" . $data . "%' OR tbl_event_general.ev_custom_data LIKE '%" . $data . "%' ) ";
        $this->db->where($str);
        $this->db->group_by($group_array);


        $query = $this->db->get();
        $result = $query->result_array();
// echo $this->db->last_query();// exit;
        if ($query->num_rows() > 0) {
            return $result;
        }
    }

    function get_indvidual_event_by_id_data($data) {

        $this->db->select('ev_custom_data');
        $this->db->from('tbl_event_general');
        $this->db->where($data);

        $query = $this->db->get();
        //echo $this->db->last_query(); exit;
        $result = $query->result_array();

        if ($query->num_rows() > 0) {
            return $result[0]['ev_custom_data'];
        }
    }

}