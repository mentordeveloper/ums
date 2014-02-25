
<?php

class Sadmin_model extends MY_model {

    function __construct() {
        // Call the Model constructor
        parent::__construct();
    }

    function save_school_record($data) {
        $this->db->insert('tbl_schools_data', $data);
        return $this->db->insert_id();
    }

    function add_category_new($name) {

        $data = array(
            'name' => $name
        );

        $this->db->insert('tbl_faq_category', $data);
        return $this->db->insert_id();
    }

    function get_school_id($name) {

        $this->db->select('*');
        $this->db->from('tbl_schools_data');
        $this->db->where('tbl_schools_data.school_subdomain', $name);

        $query = $this->db->get();

        if ($query->num_rows() > 0) {
            $array = $query->result_array();

            return $array [0] ['id'];
        } else {
            return '';
        }
    }

    function get_all_category() {
        $this->db->select('*');
        $this->db->from('tbl_faq_category');

        $query = $this->db->get();
        $result = $query->result_array();
        return $result;
    }

    function check_school_duplicate($data) {

        $keys = array();

        if (is_array($data)) {

            //get keys to check indexes to db
            $keys = get_keys_array($data);
            $counter = 0;
            foreach ($data as $percondition) {

                if (isset($keys[$counter])) {

                    $this->db->select('*');
                    $this->db->from('tbl_schools_data');
                    $this->db->where($keys[$counter], $percondition);

                    $query = $this->db->get();

                    if ($query->num_rows() > 0) {

                        return array(
                            'value' => 1,
                            'reason' => ucwords(str_replace('_', ' ', $keys[$counter])),
                            'reason_value' => ucwords($percondition)
                        );
                    }
                }

                $counter++;
            }
        }

        return array(
            'value' => 0,
        );
    }

    function search_school_by_email($condition) {
        $this->db->select('*');
        $this->db->from('tbl_schools_data');
        $this->db->like($condition);

        $query = $this->db->get();

        if ($query->num_rows() > 0) {
            $result = $query->result_array();
            return $result;
        } else {
            return false;
        }
    }

    function get_school($condition, $data = false) {
        $this->db->select('*');
        $this->db->from('tbl_schools_data');
        $this->db->where($condition);

        $query = $this->db->get();

        if ($query->num_rows() > 0) {
            if ($data) {
                return $query->result_array();
            }
            return true;
        } else {
            return false;
        }
    }

    function save_video_file($data) {
        $this->db->insert('tbl_video_repo', $data);

        return $this->db->insert_id();
    }

    function update_school_roles($data, $id) {
        $condition = array(
            'user_id' => $id
        );

        return $this->db->update('tbl_permissions', $data, $condition);
    }

    function update_notify_already_exists($subj) {
        $condition = array(
            'user_id' => -2,
            'notif_from' => -2,
        );
        $data = array(
            'short_description' => $subj,
            'long_description' => $subj,
        );
        return $this->db->update('tbl_notification', $data, $condition);
    }

    function if_notify_already_exists() {
        $this->db->select('*');

        $this->db->from('tbl_notification');
        $this->db->where('user_id', -2);
        $this->db->where('notif_from', -2);
        $query = $this->db->get();
        $result = $query->result_array();

        return $result;
    }

    function save_video_coment($data) {
        $this->db->insert('tbl_video_comments', $data);
        return $this->db->insert_id();
    }

    function delete_video($id) {
        $condition = array(
            'v_id' => $id
        );

        $this->db->delete('tbl_video_comments', $condition);

        return $this->db->delete('tbl_video_repo', $condition);
    }

    function remove_roles($id) {
        $condition = array(
            's_id' => $id
        );

        return $this->db->delete('tbl_roles', $condition);
    }

    function get_role_id_by_name($name) {
        $data = array(
            'role_name' => $name
        );

        $query = $this->db->get_where('tbl_roles', $data);

        $result = $query->result_array();

        if (isset($result [0])) {
            return $result [0] ['id'];
        } else {
            return array();
        }
    }

    function get_allranks_byid($id) {
        $this->db->select_avg('v_rank');

        $this->db->from('tbl_video_comments');
        $this->db->where('v_id', $id);
        $query = $this->db->get();
        $result = $query->result_array();
        if (isset($result [0])) {
            return $result [0] ['v_rank'];
        } else {
            return array();
        }
        // print_r($result); die;
        return $result;
    }

    function record_exits_video($title) {
        $this->db->select('v_id');
        $this->db->from('tbl_video_repo');
        $this->db->where('v_title', $title);
        $query = $this->db->get();
        $result = $query->result_array();
        if (isset($result [0])) {
            return $result [0] ['v_id'];
        } else {
            return array();
        }
        // print_r($result); die;
        return $result;
    }

    function get_comments_count($id) {
        $this->db->select('v_comment');
        $this->db->from('tbl_video_comments');
        $this->db->where('v_id', $id);
        $query = $this->db->get();
        $result = $query->result_array();
        return $query->num_rows();
    }

    function get_videos_sortedtitle($title) {
        $this->db->distinct();
        $this->db->select('*');

        $this->db->from('tbl_video_repo');
        $this->db->like('tbl_video_repo.v_title', $title);
        $this->db->or_like('tbl_video_repo.main_title', $title);

        $this->db->join('tbl_video_comments', 'tbl_video_comments.v_id=tbl_video_repo.v_id', 'left');
        $this->db->order_by('tbl_video_comments.v_rank', 'desc');
        $query = $this->db->get();

        $result = $query->result_array();

        // print_r($result); die;
        return $result;
    }

    function search_pathexists($url) {
        $data = array(
            'v_path' => $url
        );

        $query = $this->db->get_where('tbl_video_repo', $data);

        $result = $query->result_array();

        if (isset($result [0])) {
            return $result [0] ['v_id'];
        } else {
            return array();
        }
    }

    function retrieve_school_roles($id) {
        $this->db->select('id');
        $this->db->from('tbl_roles');
        $this->db->where('s_id', $id);
        $this->db->where('s_type', '');
        $query = $this->db->get();

        $result = $query->result_array();
        return $result;
    }

    function fecth_master_permissions() {
        $this->db->select('*');
        $this->db->from('tbl_permissions');
        $this->db->where('user_id', 0);
        $query = $this->db->get();

        $result = $query->result_array();

        if (isset($result [0])) {
            return json_decode($result [0] ['permission_array']);
        } else {
            return array();
        }
    }

    function single_videorepo($id) {
        $this->db->select('*');
        $this->db->from('tbl_video_repo');
        $this->db->where('v_id', $id);
        $query = $this->db->get();

        $result = $query->result_array();

        return $result;
    }

    function display_comments($id) {
        $this->db->select('*');
        $this->db->from('tbl_video_comments');
        $this->db->where('v_id', $id);
        $query = $this->db->get();

        $result = $query->result_array();

        return $result;
    }

    function get_videos_fromtitle($title) {
        $this->db->select('*');

        $this->db->from('tbl_video_repo');
        $this->db->like('tbl_video_repo.v_title', $title);

        $this->db->join('tbl_video_comments', 'tbl_video_comments.v_id=tbl_video_repo.v_id', 'left');
        $this->db->order_by('tbl_video_comments.v_rank', 'desc');
        $query = $this->db->get();

        $result = $query->result_array();
        // print_r($result); die;
        return $result;
    }

    function get_videos_title($title) {
        $this->db->select('*');
        $this->db->from('tbl_video_repo');
        $this->db->where('v_title', $title);
        $query = $this->db->get();

        $result = $query->result_array();

        return $result;
    }

    function view_videorepo($limit = '', $start = '', $s_id) {

        $this->db->select('*');
        $this->db->from('tbl_video_repo');
        $this->db->where('file_name !=', '');
        $this->db->order_by('date_time', 'desc');

        if (!empty($limit)) {
            $this->db->limit($limit, $start);
        }

        $query = $this->db->get();

        $result = $query->result_array();

        return $result;
    }

    function save_and_update_super_permission($keys) {
        $data = array(
            'user_id' => 0,
            'permission_array' => json_encode($keys ['clear_keys']),
            'status' => 1
        );

        $this->db->select('*');
        $this->db->from('tbl_permissions');
        $this->db->where('user_id', 0);
        $query = $this->db->get();

        if ($query->num_rows() > 0) {

            $data_saver = array(
                'user_id' => 0
            );

            $data = array(
                'permission_array' => json_encode($keys ['clear_keys'])
            );

            $this->db->update('tbl_permissions', $data, $data_saver);
        } else {
            $this->db->insert('tbl_permissions', $data);
        }

        $result = $query->result_array();

        if (isset($result [0])) {
            return $result [0] ['permission_array'];
        } else {
            return array();
        }
    }

    function save_data($text) {
        $this->db->select('*');
        $this->db->from('tbl_about');
        $this->db->where('id', 1);
        $query = $this->db->get();

        if ($query->num_rows() > 0) {
            $condition = array(
                'id' => 1
            );

            $data_saver = array(
                'text' => $text,
                'date_time' => date_time_helper_current_date()
            );

            return $this->db->update('tbl_about', $data_saver, $condition);
        } else {

            $data_saver = array(
                'id' => 1,
                'text' => $text,
                'date_time' => date_time_helper_current_date()
            );

            return $this->db->insert('tbl_about', $data_saver);
        }
    }

    function save_video_record($data) {
        $this->db->insert('tbl_videos', $data);
        return $this->db->insert_id();
    }

    function save_faq_record($ques, $ans, $stat, $cat) {
        $data = array(
            'question' => $ques,
            'answer' => $ans,
            'status' => $stat,
            'category' => $cat
        );

        $this->db->insert('tbl_faqs', $data);
        return $this->db->insert_id();
    }

    function update_video_record($data, $id) {
        $condition = array(
            'id' => $id
        );

        return $this->db->update('tbl_videos', $data, $condition);
    }

    function update_school_record($data, $id) {
        $condition = array(
            'id' => $id
        );

        return $this->db->update('tbl_schools_data', $data, $condition);
    }

    function update_school_verification($data, $condition) {

        return $this->db->update('tbl_schools_data', $data, $condition);
    }

    function update_faq_record($data, $id) {
        $condition = array(
            'id' => $id
        );

        return $this->db->update('tbl_faqs', $data, $condition);
    }

    function additional_general($id) {
        $answer = $this->db->query("DELETE tbl_additional_general From tbl_additional_general
				JOIN tbl_login 
				On  tbl_additional_general.user_id  = tbl_login.lg_id
				where tbl_login.s_id =" . $id);
        return $answer;
    }

    function adittional_info($id) {
        $answer = $this->db->query("DELETE tbl_adittional_info From tbl_adittional_info
				JOIN tbl_login 
				On  tbl_adittional_info.ad_ins_id  = tbl_login.lg_id
				where tbl_login.s_id =" . $id);
        return $answer;
    }

    function attendence_notes($id) {
        $answer = $this->db->query("DELETE tbl_attendence_notes From tbl_attendence_notes
				JOIN tbl_login 
				On  tbl_attendence_notes.user_id  = tbl_login.lg_id
				where tbl_login.s_id =" . $id);
        return $answer;
    }

    function assignments_uploads($id) {
        $answer = $this->db->query("DELETE tbl_assignments_uploads From tbl_assignments_uploads
				JOIN tbl_login 
				On  tbl_assignments_uploads.user_id  = tbl_login.lg_id
				where tbl_login.s_id =" . $id);
        return $answer;
    }

    function remove_attendences($id) {
        $answer = $this->db->query("DELETE tbl_attendences From tbl_attendences
				JOIN tbl_login 
				On  tbl_attendences.ins_id  = tbl_login.lg_id
				where tbl_login.s_id =" . $id);
        return $answer;
    }

    function remove_event_general($id) {
        $answer = $this->db->query("DELETE tbl_event_general From tbl_event_general
				JOIN tbl_login 
				On  tbl_event_general.ev_instructor_id   = tbl_login.lg_id
				where tbl_login.s_id =" . $id);
        return $answer;
    }

    function remove_file_sharing($id) {
        $answer = $this->db->query("DELETE tbl_file_sharing From tbl_file_sharing
				JOIN tbl_login 
				On  tbl_file_sharing.user_id   = tbl_login.lg_id
				where tbl_login.s_id =" . $id);
        return $answer;
    }

    function remove_forum($id) {
        $answer = $this->db->query("DELETE tbl_forum From tbl_forum
				JOIN tbl_login 
				On  tbl_forum.user_id   = tbl_login.lg_id
				where tbl_login.s_id =" . $id);
        return $answer;
    }

    function remove_folder_structure($id) {
        $answer = $this->db->query("DELETE tbl_folder_structure From tbl_folder_structure
				JOIN tbl_login 
				On  tbl_folder_structure.user_id   = tbl_login.lg_id
				where tbl_login.s_id =" . $id);
        return $answer;
    }

    function remove_custom_event_types($id) {
        $answer = $this->db->query("DELETE tbl_custom_event_types From tbl_custom_event_types
				JOIN tbl_login 
				On  tbl_custom_event_types.user_id  = tbl_login.lg_id
				where tbl_login.s_id =" . $id);
        return $answer;
    }

    function remove_instructor_hours($id) {
        $answer = $this->db->query("DELETE tbl_instructor_hours From tbl_instructor_hours
				JOIN tbl_login 
				On  tbl_instructor_hours.ins_id  = tbl_login.lg_id
				where tbl_login.s_id =" . $id);
        return $answer;
    }

    function remove_permissions($id) {
        $answer = $this->db->query("DELETE tbl_permissions From tbl_permissions
				JOIN tbl_login 
				On  tbl_permissions.user_id  = tbl_login.lg_id
				where tbl_login.s_id =" . $id);
        return $answer;
    }

    function remove_notification($id) {
        $answer = $this->db->query("DELETE tbl_notification From tbl_notification
				JOIN tbl_login 
				On  tbl_notification.user_id  = tbl_login.lg_id
				where tbl_login.s_id =" . $id);
        return $answer;
    }

    function remove_groupchat($id) {
        $answer = $this->db->query("DELETE tbl_groupchat From tbl_groupchat
				JOIN tbl_login 
				On  tbl_groupchat.user_id  = tbl_login.lg_id
				where tbl_login.s_id =" . $id);
        return $answer;
    }

    function remove_groupchatdata($id) {
        $answer = $this->db->query("DELETE tbl_groupchatdata From tbl_groupchatdata
				JOIN tbl_login 
				On  tbl_groupchatdata.user_id  = tbl_login.lg_id
				where tbl_login.s_id =" . $id);
        return $answer;
    }

    function courses_relationship($id) {
        $answer = $this->db->query("DELETE tbl_courses_relationship From tbl_courses_relationship
				JOIN tbl_login 
				On  tbl_courses_relationship.user_id  = tbl_login.lg_id
				where tbl_login.s_id =" . $id);
        return $answer;
    }

    function remove_user_colors($id) {
        $answer = $this->db->query("DELETE tbl_user_colors From tbl_user_colors
				JOIN tbl_login 
				On  tbl_user_colors.user_id  = tbl_login.lg_id
				where tbl_login.s_id =" . $id);
        return $answer;
    }

    function remove_threadposts($id) {
        $answer = $this->db->query("DELETE tbl_threadposts From tbl_threadposts
				JOIN tbl_login 
				On  tbl_threadposts.user_id  = tbl_login.lg_id
				where tbl_login.s_id =" . $id);
        return $answer;
    }

    function remove_messages($id) {
        $condition = array(
            's_id' => $id
        );

        return $this->db->delete('tbl_messaging', $condition);
    }

    function remove_school_users_all($id) {
        $condition = array(
            's_id' => $id
        );

        return $this->db->delete('tbl_login', $condition);
    }

    function remove_school_users_custom_calender($id) {
        $condition = array(
            's_id' => $id
        );

        return $this->db->delete('tbl_custom_calendar', $condition);
    }

    function remove_faq_record($id) {
        $condition = array(
            'id' => $id
        );

        return $this->db->delete('tbl_faqs', $condition);
    }

    function remove_cat_record($id) {
        $condition = array(
            'id' => $id
        );

        return $this->db->delete('tbl_faq_category', $condition);
    }

    function remove_video_record($id) {
        $condition = array(
            'id' => $id
        );

        return $this->db->delete('tbl_videos', $condition);
        
    }

    function remove_settings_school($id) {
        $condition = array(
            's_id' => $id
        );

        return $this->db->delete('tbl_settings_school', $condition);
    }

    function deny_req($id) {
        $condition = array(
            'id' => $id
        );

        $data_to_update = array(
            'status' => "0",
            'key' => ""
        );

        $this->db->update('tbl_save_req', $data_to_update, $condition);
    }

    function deny_req1($id) {
        $condition = array(
            'id' => $id
        );

        return $this->db->delete('tbl_save_req', $condition);
    }

    function get_users_all($id) {
        $this->db->select('lg_id');
        $this->db->from('tbl_login');
        $this->db->where('s_id', $id);
        $query = $this->db->get();
        $result = $query->result_array();
        return $result;
    }

    function remove_school_record($id, $role) {
        $condition = array(
            'id' => $id
        );

        $removed_login = $this->remove_login_data($id, $role);

        if ($removed_login) {
            return $this->db->delete('tbl_schools_data', $condition);
        } else {
            return false;
        }
    }

    function remove_login_data($id, $role) {

        // ////this login is to remove the user login of the school admin if the
        // school is entirely removed which manages school/university calender
        $this->db->select('*');
        $this->db->from('tbl_schools_data');
        $this->db->where('id', $id);

        $query = $this->db->get();

        $result = $query->result_array();

        $data = $result [0];

        $condition_1 = array(
            'co_name' => $this->s_string_defined,
            's_id' => $data ['id']
        );

        $this->db->delete('tbl_courses_list', $condition_1);

        $condition = array(
            'lg_fname' => $data ['name'],
            'lg_lname' => $data ['name'],
            'lg_email' => $data ['school_username'],
            'lg_password' => $data ['school_password'],
            'lg_type' => $role,
            's_id' => $data ['id']
        );

        return $this->db->delete('tbl_login', $condition);
    }

    function remove_assignments_uploads($id) {
        $condition = array(
            'sc_id' => $id
        );

        return $this->db->delete('tbl_assignments_uploads', $condition);
    }

    function get_school_id_by_name($name, $getonly) {
        if (!empty($getonly)) {
            $this->db->select($getonly);
        } else {
            $this->db->select($getonly);
        }
        $this->db->from('tbl_schools_data');
        $this->db->join('tbl_about', 'tbl_about.id=tbl_schools_data.id', 'left');
        $this->db->join('tbl_login', 'tbl_login.lg_email=tbl_schools_data.school_username', 'left');
        $this->db->join('tbl_settings_school', 'tbl_schools_data.id=tbl_settings_school.s_id', 'left');
        $this->db->where('tbl_schools_data.school_subdomain', $name);

        $query = $this->db->get();

        if ($query->num_rows() > 0) {
            $array = $query->result_array();

            /* Get latest events from db and return with page load */
            $array [0] ['events'] = $this->load_latest_events($array [0] ['lg_id']);
            /* End get latest events */

            return $array [0];
        } else {
            return '';
        }
    }

    function load_latest_events($id) {

        $query = $this->db->query("Select * from tbl_event_general where ev_instructor_id=" . $id . " and ev_event_type='School event' and STR_TO_DATE(`ev_assigned_date`, '%m-%d-%Y 00:00:00') > DATE( NOW()) ORDER BY STR_TO_DATE(`ev_assigned_date`, '%m-%d-%Y 00:00:00') limit 5  ");


        if ($query->num_rows() > 0) {
            return $query->result_array();
        } else {
            return array();
        }
    }

    function check_school_username($data) {
        $this->db->select('*');
        $this->db->from('tbl_schools_data');
        $this->db->where('school_username', $data ['username']);

        $query = $this->db->get();

        if ($query->num_rows() > 0) {
            return true;
        } else {
            return false;
        }
    }

    function check_school_record($data) {

        $this->db->select('*');
        $this->db->from('tbl_schools_data');
        $this->db->where('school_subdomain', $data ['name']);

        $query = $this->db->get();

        if ($query->num_rows() > 0) {
            return true;
        } else {
            return false;
        }
    }

    /*
     * Get school domain check
     */

    function check_school_domainname($data, $record = false) {
        $this->db->select('*');
        $this->db->from('tbl_schools_data');
        $this->db->where('school_subdomain', $data ['domainname']);
        $query = $this->db->get();

        if ($query->num_rows() > 0) {
            if ($record) {
                $fetch = $query->result_array();
                return $fetch[0]['id'];
            }
            return true;
        } else {
            return false;
        }
    }

    function get_video_byid($id) {
        $this->db->select('*');
        $this->db->from('tbl_videos');
        $this->db->where('id', $id);

        $query = $this->db->get();
        $result = $query->result_array();
        return $result [0];
    }

    function get_faq_byid($id) {
        $this->db->select('*');
        $this->db->from('tbl_faqs');
        $this->db->where('id', $id);

        $query = $this->db->get();
        $result = $query->result_array();
        return $result [0];
    }

    function get_all_cats() {
        $this->db->select('*');
        $this->db->from('tbl_faq_category');
        $query = $this->db->get();
        //echo $this->db->last_query();
        //die;
        $result = $query->result_array();
        return $result;
    }

    function get_cat_by_id($id) {
        $this->db->select('*');
        $this->db->from('tbl_faq_category');
        $this->db->where('id', $id);
        $query = $this->db->get();
        $result = $query->result_array();
        if (!empty($result)) {
            return $result[0]['name'];
        } else {
            return $result;
        }
    }

    function get_school_byid($id) {
        $this->db->select('*');
        $this->db->from('tbl_schools_data');
        $this->db->where('id', $id);

        $query = $this->db->get();
        $result = $query->result_array();
        if (isset($result [0])) {
            return $result [0];
        } else {
            return array();
        }
    }

    function get_all_about() {
        $this->db->select('*');
        $this->db->from('tbl_about');
        $this->db->where('id', 1);

        $query = $this->db->get();
        $result = $query->result_array();

        if ($query->num_rows() > 0) {

            return $result [0] ['text'];
        } else {
            return '';
        }
    }

    function get_all_videos($limit = '', $start = '') {
        $this->db->select('*');
        $this->db->from('tbl_videos');
        $this->db->order_by('id', 'desc');

        if (!empty($limit)) {
            $this->db->limit($limit, $start);
        }

        $query = $this->db->get();
        $result = $query->result_array();
        return $result;
    }

    function static_count_allskools() {
        $this->db->select('*');
        $this->db->from('tbl_schools_data');
        $query = $this->db->get();

        return $query->num_rows();
    }

    function get_all_schools($limit = '', $start = '') {
        $this->db->select('*');
        $this->db->from('tbl_schools_data');
        $this->db->order_by('id', 'desc');

        if (!empty($limit)) {
            $this->db->limit($limit, $start);
        }

        $query = $this->db->get();
        $result = $query->result_array();
        return $result;
    }

    function get_all_faqs($limit = '', $start = '') {
        $this->db->select('*');
        $this->db->from('tbl_faqs');
        $this->db->order_by('id', 'desc');

        if (!empty($limit)) {
            $this->db->limit($limit, $start);
        }

        $query = $this->db->get();
        $result = $query->result_array();
        return $result;
    }

    function get_faq_by_id() {
        $this->db->select('*');
        $this->db->from('tbl_faq_category');
        //$this->db->where ( 'name', $name );

        $query = $this->db->get();
        $result = $query->result_array();
        return $result;
    }

    function get_all_faqs_by_cat($name) {

        $this->db->select('*');
        $this->db->from('tbl_faqs');
        $this->db->where('category', $name);
        $this->db->order_by('id', 'desc');

        $query = $this->db->get();
        $result = $query->result_array();
        return $result;
    }

    function get_question_survey($name, $other = '') {
        $this->db->select($name . ',' . $other);
        $this->db->from('tbl_survey_info');

        $master_array = $this->session->userdata('filter');

        if (is_array($master_array)) {
            foreach ($master_array as $counter => $peritem) {
                $keys = array_keys($peritem);
                if (!empty($keys [0]) && !empty($peritem [$keys [0]])) {
                    $this->db->like($keys [0], $peritem [$keys [0]]);
                }
            }
        }

        $query = $this->db->get();
        $result = $query->result_array();

        return $result;
    }

    function remove_on_demand($id, $field) {
        $condition = array(
            'id' => $id
        );

        $data_to_update = array(
            $field => ""
        );

        $this->db->update('tbl_survey_info', $data_to_update, $condition);
    }

    function get_all_surveys() {
        $this->db->select('*');
        $this->db->from('tbl_survey_info');

        $master_array = $this->session->userdata('filter');

        if (is_array($master_array)) {
            foreach ($master_array as $counter => $peritem) {
                $keys = array_keys($peritem);
                if (!empty($keys [0]) && !empty($peritem [$keys [0]])) {
                    $this->db->like($keys [0], $peritem [$keys [0]]);
                }
            }
        }

        $query = $this->db->get();
        $result = $query->result_array();

        return $result;
    }

    function save_req($email, $fname, $lname) {
        $data = array(
            'email_id' => $email,
            'fname' => $fname,
            'lname' => $lname,
            'status' => 1
        );

        $this->db->insert('tbl_save_req', $data);
        return $this->db->insert_id();
    }
    function save_req_data($data) {
        
        $this->db->insert('tbl_save_req', $data);
        return $this->db->insert_id();
    }

    function static_count_users() {
        $this->db->select('*');
        $this->db->from('tbl_save_req');
        // $this->db->where('s_id',$id);

        $query = $this->db->get();

        return $query->num_rows();
    }

    function get_requests($limit = '', $page = '') {
        $this->db->select('*');
        $this->db->from('tbl_save_req');
        $this->db->order_by('status', 'asc');
        if (!empty($limit)) {
            $this->db->limit($limit, $page);
        }
        $query = $this->db->get();
        // echo $this->db->last_query();
        // die;
        $result = $query->result_array();
        return $result;
    }

    function get_requests_search($string) {
        $this->db->select('*');
        $this->db->from('tbl_save_req');
        $this->db->like('email_id', $string);
        $this->db->or_like('fname', $string);

        $query = $this->db->get();

        $result = $query->result_array();
        return $result;
    }

    function get_single_id_to_respond($id) {
        $this->db->select('*');
        $this->db->from('tbl_save_req');
        $this->db->where('id', $id);

        $query = $this->db->get();

        $result = $query->result_array();

        return $result;
    }

    function get_email_id_to_respond() {
        $this->db->select('*');
        $this->db->from('tbl_save_req');

        $query = $this->db->get();

        $result = $query->result_array();

        return $result;
    }
    
    function get_developer_info_by_data($data = '') {
        $this->db->select('*');
        $this->db->from('tbl_save_req');
        if(!empty($data))
            $this->db->where($data);
        $query = $this->db->get();
//         echo $this->db->last_query();
        $result = $query->result_array();
        return $result;
    }

    function update_req_status($id, $key) {
        $condition = array(
            'id' => $id
        );

        $data = array(
            'status' => '1',
            'key' => $key
        );

        return $this->db->update('tbl_save_req', $data, $condition);
//        $this->db->update('tbl_save_req', $data, $condition);
//        echo $this->db->last_query();exit;
    }

    function remove_developerapi() {

        $id = $this->input->get('respond_req');

        $condition = array(
            'id' => $id
        );


        return $this->db->delete('tbl_save_req', $condition);
    }

    function check_excisting_user($email_id) {
        $this->db->select('*');
        $this->db->from('tbl_save_req');
        $this->db->where('email_id', $email_id);

        $query = $this->db->get();

        $result = $query->result_array();

        return $result;
    }

    function validate_username($data) {
        $data_check = array(
            'email_id' => $data ['email_id']
        );

        $this->db->select('*');
        $this->db->from('tbl_save_req');
        $this->db->where($data_check);

        $query = $this->db->get();
        $result = $query->result_array();

        if ($query->num_rows() > 0) {

            return 'Key message&key=' . $result[0]['id'];
        } /*
         * else { $data_lgn = array( 'lg_email' => $data['uname'], 'lg_password'
         * => md5($data['pwd']), ); $this->db->select('*');
         * $this->db->from('tbl_login'); $this->db->where($data_lgn); $query =
         * $this->db->get(); $result = $query->result_array();
         * if($query->num_rows()>0) return ''; else return 'Invalid School login
         * Details'; }
         */
    }

    function static_count_schools() {
        $this->db->select('*');
        $this->db->from('tbl_schools_data');

        $query = $this->db->get();

        return $query->num_rows();
    }

    function static_count_faq() {
        $this->db->select('*');
        $this->db->from('tbl_faqs');

        $query = $this->db->get();

        return $query->num_rows();
    }

    function static_count_videos() {
        $this->db->select('*');
        $this->db->from('tbl_videos');

        $query = $this->db->get();

        return $query->num_rows();
    }

    function static_count_vid() {
        $this->db->select('*');
        $this->db->from('tbl_video_repo');

        $query = $this->db->get();

        return $query->num_rows();
    }

    function add_notify($subj) {
        $data = array("user_id" => '-2', "long_description" => $subj, "short_description" => $subj, "status" => "false", "notif_from" => '-2');
        $this->db->insert('tbl_notification', $data);
        return $this->db->insert_id();
    }

}

?>