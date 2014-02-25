<?php

class Users_model extends MY_model {

    /**
    * Validate the login's data with the database
    * @param string $user_name
    * @param string $password
    * @return void
    */
	function validate($user_name, $password)
	{
		$this->db->where('user_name', $user_name);
		$this->db->where('pass_word', $password);
		$query = $this->db->get('membership');
		
		if($query->num_rows == 1)
		{
			return true;
		}		
	}

    /**
    * Serialize the session data stored in the database, 
    * store it in a new array and return it to the controller 
    * @return array
    */
	function get_db_session_data()
	{
		$query = $this->db->select('user_data')->get('ci_sessions');
		$user = array(); /* array to store the user data we fetch */
		foreach ($query->result() as $row)
		{
		    $udata = unserialize($row->user_data);
		    /* put data in array using username as key */
		    $user['user_name'] = $udata['user_name']; 
		    $user['is_logged_in'] = $udata['is_logged_in']; 
		}
		return $user;
	}
	
    /**
    * Store the new user's data into the database
    * @return boolean - check the insert
    */	
	function create_member()
	{

		$this->db->where('user_name', $this->input->post('username'));
		$query = $this->db->get('membership');

        if($query->num_rows > 0){
        	echo '<div class="alert alert-error"><a class="close" data-dismiss="alert">×</a><strong>';
			  echo "Username already taken";	
			echo '</strong></div>';
		}else{

			$new_member_insert_data = array(
				'first_name' => $this->input->post('first_name'),
				'last_name' => $this->input->post('last_name'),
				'email_addres' => $this->input->post('email_address'),			
				'user_name' => $this->input->post('username'),
				'pass_word' => md5($this->input->post('password'))						
			);
			$insert = $this->db->insert('membership', $new_member_insert_data);
		    return $insert;
		}
	      
	}//create_member


    function reset_pass($data) {

        $this_update = array('lg_password' => md5($data['password']));

        $condition = array('lg_id' => $data['id']);

        return $this->db->update('tbl_login', $this_update, $condition);
    }

    function get_all_users($limit = '', $start = '', $sid, $count = false) {

        $this->db->from('tbl_login');
        $this->db->join('tbl_roles', 'tbl_login.lg_type=tbl_roles.id', 'left');
        $this->db->where('tbl_login.s_id', $sid);
        $this->db->where('tbl_roles.role_name <>', 'admin school');
        $this->db->where('tbl_login.is_c_parent <>', '1');
        $this->db->order_by('tbl_login.lg_lname');

        if (!empty($limit)) {
            $this->db->limit($limit, $start);
        }

        $query = $this->db->get();

        ///if just need count to return 

        if ($count) {
            return $query->num_rows();
        }

        if ($query->num_rows() > 0) {

            return $query->result_array();
        } else {
            return array();
        }
    }

    function static_count_users($id) {

        $this->db->select('*');
        $this->db->from('tbl_login');
        $this->db->where('s_id', $id);

        $query = $this->db->get();

        return $query->num_rows();
    }

    function get_search_data($string) {
        $data = $this->session->userdata('session_user_data');

        $this->db->select('*');
        $this->db->from('tbl_login');
        $this->db->where('tbl_login.s_id', $data['data'][0]['id']);
        $this->db->join('tbl_roles', 'tbl_login.lg_type=tbl_roles.id', 'left');
        $this->db->like('tbl_login.lg_email', $string);

        $query = $this->db->get();

        $result = $query->result_array();

        return $result;
    }

    function add_role($role, $id) {

        $data = array(
            'role_name' => $role,
            'date_time' => date_time_helper_current_date(),
            's_id' => $id,
            's_type' => 'role',
        );

        $this->db->insert('tbl_roles', $data);
        return $this->db->insert_id();
    }

    function add_schooltype($role, $id) {

        $data = array(
            'role_name' => $role,
            'date_time' => date_time_helper_current_date(),
            's_id' => $id,
            's_type' => 'school',
        );

        $this->db->insert('tbl_roles', $data);
        return $this->db->insert_id();
    }

    function add_final_permissions($perms, $id) {

        $data = array(
            'permission_array' => $perms,
            'admin_permissions' => $perms,
            'user_id' => $id,
        );

        $this->db->insert('tbl_permissions', $data);

        return $this->db->insert_id();
    }

    function add_role_with_return_id($role, $id) {

        $data = array(
            'role_name' => $role,
            'date_time' => date_time_helper_current_date(),
            's_id' => $id
        );

        $this->db->insert('tbl_roles', $data);

        return $this->db->insert_id();
    }

    function add_role_withid($data) {
        $this->db->insert('tbl_roles', $data);
        return $this->db->insert_id();
    }

    function select_data_tocopy($id) {

        $data = $this->session->userdata('session_user_data');

        $this->db->select('*');
        $this->db->from('tbl_permissions');
        $this->db->where('user_id', $id);
        $query = $this->db->get();

        $result = $query->result_array();

        return $result;
    }

    function view_permissions_of_school($id) {


        $this->db->select('permission_array');
        $this->db->from('tbl_permissions');

        $this->db->where('user_id', $id);
        ;
        $query = $this->db->get();
        //	echo $this->db->last_query();
        $result = $query->result_array();

        if (isset($result[0])) {
            $check = $result[0]['permission_array'];
            return $check;
        } else {
            return false;
        }
    }

    function view_mainrole($sid) {

        $data = $this->session->userdata('session_user_data');

        $this->db->select('tbl_roles.id');
        $this->db->from('tbl_roles');
        $this->db->join('tbl_schools_data', 'tbl_schools_data.id=tbl_roles.s_id', 'left');
        $this->db->where('tbl_schools_data.school_username', $sid);

        $this->db->where('s_type', 'school');
        $query = $this->db->get();
        //	echo $this->db->last_query();
        $result = $query->result_array();

        if (isset($result[0])) {
            $check = $result[0]['id'];
            return $check;
        } else {
            return false;
        }
    }

    function add_permissions_for_role($array_data, $user_id) {

        $data = array(
            'user_id' => $user_id,
            'permission_array' => $array_data['permission_array'],
            'admin_permissions' => $array_data['permission_array'],
            'permission_core' => $array_data['permission_core'],
            'status' => 1
        );

        return $this->db->insert('tbl_permissions', $data);
        //echo $this->db->last_query();
    }

    function fetch_permissions_global() {

        $this->db->select('*');
        $this->db->from('tbl_permissions');
        $this->db->where('user_id', 0);
        $query = $this->db->get();

        $result = $query->result_array();

        if (isset($result[0])) {
            $check = json_decode($result[0]['permission_array']);

            if (!is_array($check)) {
                return array();
            } else {
                return $check;
            }
        } else {
            return array();
        }
    }

    function remove_permission_by_id($id) {
        $data = array(
            'id' => $id
        );

        return $this->db->delete('tbl_permissions_lists', $data);
    }

    function update_permissions_of_oneschool($id, $array_data, $corepermission) {

        $condition = array(
            'user_id' => $id,
        );
        if (json_encode($array_data) != 'false') {
            $data = array(
                'permission_array' => json_encode($array_data),
                'admin_permissions' => json_encode($array_data),
                'permission_core' => $corepermission,
                'status' => 1
            );

            $ope = $this->db->update('tbl_permissions', $data, $condition);

            return 'update successfully&go=true';
        }
    }

    function update_school_permisions($data, $id) {
        $condition = array(
            'user_id' => $id,
        );
        $ope = $this->db->update('tbl_permissions', $data, $condition);
        return "updated ";
    }

    function insert_permissionsadmin($id, $core_data, $array_data) {

        if ($core_data !== 'false' && $array_data != 'false') {
            $data = array(
                'user_id' => $id,
                'permission_array' => $array_data,
                'permission_core' => $core_data,
                'admin_permissions' => $array_data,
                'status' => 1
            );

            $ins = $this->db->insert('tbl_permissions', $data);
            return "Updated";
        }
    }

    function save_permissionsadmin($array_data, $id, $core_data = '') {
        if (json_encode($array_data) != 'false') {
            $condition = array(
                'user_id' => $id,
            );

            $data = array(
                'permission_array' => json_encode($array_data),
                'permission_core' => $core_data,
            );

            $ope = $this->db->update('tbl_permissions', $data, $condition);
            return "updated ";
        }
    }

    function save_permissions($array_data, $corepermission, $id) {

        $data = array(
            'user_id' => $id,
        );

        $query = $this->db->get_where('tbl_permissions', $data);

        if ($query->num_rows() > 0) {

            $condition = array(
                'user_id' => $id,
            );

            $data = array(
                'permission_array' => json_encode($array_data),
                'permission_core' => $corepermission,
                'status' => 1
            );
            if (json_encode($array_data) != 'false') {
                $ope = $this->db->update('tbl_permissions', $data, $condition);
            }
            if ($ope) {

                $this->db->select('*');
                $this->db->from('tbl_roles');
                $this->db->where('id', $id);
                $query = $this->db->get();
                $result = $query->result_array();
                foreach ($result as $getrol) {
                    $def_rol = $getrol['role_name'];
                }
                //$this->db->last_query();
                //return $result;
                if (!empty($def_rol)) {
                    $this->db->select('*');
                    $this->db->from('tbl_roles');
                    $this->db->where('role_name', $def_rol);
                    $this->db->where('s_id !=', 0);
                    $query = $this->db->get();
                    $result1 = $query->result_array();

                    foreach ($result1 as $up_rol) {
                        //echo $up_rol['id'];
                        $condition = array(
                            'user_id' => $up_rol['id'],
                        );

                        $data = array(
                            'permission_array' => json_encode($array_data),
                            'permission_core' => $corepermission,
                            'status' => 1
                        );
                        if (json_encode($array_data) != 'false') {
                            $gg = $this->db->update('tbl_permissions', $data, $condition);
                        }
                    }
                }
                return 'update successfully&go=true';
            }
        } else {
            $data = array(
                'user_id' => $id,
                'permission_array' => json_encode($array_data),
                'permission_core' => $corepermission,
                'status' => 1
            );
            if (json_encode($array_data) != 'false') {
                $ins = $this->db->insert('tbl_permissions', $data);

                if ($ins) {

                    return 'inserted successfully&go=true';
                }
            }
        }
    }

    function get_user_by_id($id, $s_id) {

        $data = array(
            'lg_id' => $id,
            's_id' => $s_id,
        );

        $query = $this->db->get_where('tbl_login', $data);

        if ($query->num_rows() > 0) {

            $result = $query->result_array();
            return $result[0];
        } else {

            return array();
        }
    }

    function get_user_info_id($id) {

        $data = array(
            'lg_id' => $id
        );

        $query = $this->db->get_where('tbl_login', $data);

        if ($query->num_rows() > 0) {

            $result = $query->result_array();
            return $result[0];
        } else {

            return array();
        }
    }

    function get_this_user_permission($id) {

        $data = array(
            'user_id' => $id,
        );

        $query = $this->db->get_where('tbl_permissions', $data);

        if ($query->num_rows() > 0) {

            $result = $query->result_array();
            return $result[0];
        } else {

            return array();
        }
    }

    function check_type_user() {

        $id = $this->session->userdata('type');

        $data = array(
            'id' => $id,
        );

        $query = $this->db->get_where('tbl_roles', $data);

        $result = $query->result_array();

        if (isset($result[0]['role_name'])) {
            return $result[0]['role_name'];
        } else {
            redirect('login');
        }
    }

    function check_type_user_by_id($id) {

        $data = array(
            'id' => $id,
        );

        $query = $this->db->get_where('tbl_roles', $data);

        $result = $query->result_array();

        if (isset($result[0]['role_name'])) {
            return $result[0]['role_name'];
        } else {
            redirect('login');
        }
    }

    function retrive_record($id) {
        $this->db->select('*');
        $this->db->from('tbl_permissions');
        $this->db->where('user_id', $id);

        $query = $this->db->get();

        $result = $query->result_array();
        //$this->db->last_query();
        return $result;
    }

    function get_role_by_skooll($id, $not = '') {

        $this->db->select('*');
        $this->db->from('tbl_roles');
        $this->db->where('s_id', $id);
        if ($not == 'yes') {
            $this->db->where('s_type <>', 'school');
        } else {
            $this->db->where('s_type', 'school');
        }

        $query = $this->db->get();

        $result = $query->result_array();
        //$this->db->last_query();
        return $result;
    }

    function get_role_name_by_id($id) {

        $data = array(
            'id' => $id,
        );

        $query = $this->db->get_where('tbl_roles', $data);

        $result = $query->result_array();

        if (isset($result[0])) {
            return $result[0];
        } else {
            return array();
        }
    }

    function add_permission($name, $mask_name) {

        $data = array(
            'permission_name' => $name,
            'permission_mask_name' => $mask_name,
            'active' => 1,
            'date_time' => date_time_helper_current_date()
        );

        return $this->db->insert('tbl_permissions_lists', $data);
    }

    function get_permission_all() {

        $this->db->select('*');
        $this->db->from('tbl_permissions_lists');

        $query = $this->db->get();

        $result = $query->result_array();

        return $result;
    }

    function get_byid_perms($id) {

        $this->db->select('*');
        $this->db->from('tbl_permissions');
        $this->db->where('user_id', $id);
        $query = $this->db->get();
        //echo $this->db->last_query();	
        $result = $query->result_array();

        return $result;
    }

    function get_this_main_permission($role) {

        $this->db->select('*');
        $this->db->from('tbl_roles');
        $this->db->where('role_name', $role);
        $this->db->where('s_id', 0);


        $query = $this->db->get();

        $result = $query->result_array();

        return $result;
    }

    function get_selected_permission($data) {

        $this->db->select('*');
        $this->db->from('tbl_permissions_lists');
        $this->db->where_in('id', $data);

        $query = $this->db->get();

        $result = $query->result_array();

        return $result;
    }

    function get_permission_ofskool($id) {
        $this->db->select('*');
        $this->db->from('tbl_permissions');
        $this->db->where('user_id', $id);

        $query = $this->db->get();

        $result = $query->result_array();

        return $result;
    }

    function get_permission_by_id($id) {

        $this->db->select('*');
        $this->db->from('tbl_permissions_lists');
        $this->db->where('id', $id);

        $query = $this->db->get();

        $result = $query->result_array();

        if ($query->num_rows() > 0) {
            return $result[0];
        } else {
            return array();
        }
    }

    function get_permission_by_name($name) {

        $this->db->select('*');
        $this->db->from('tbl_permissions_lists');
        $this->db->where('permission_name', $name);

        $query = $this->db->get();

        $result = $query->result_array();

        return $query->num_rows();
    }

    function update_existing_record($arr, $id) {

        $conidtion = array(
            'id' => $id
        );

        $data = array(
            'role_name' => $arr
        );

        return $this->db->update('tbl_roles', $data, $conidtion);
    }

    function update_retrive_record($id, $val) {
        $conidtion = array(
            'user_id' => $id
        );

        $data = array(
            'permission_array' => $val
        );

        return $this->db->update('tbl_permissions', $data, $conidtion);
    }

    function update_permission($id, $mask) {

        $conidtion = array(
            'id' => $id
        );

        $data = array(
            'permission_mask_name' => $mask
        );

        return $this->db->update('tbl_permissions_lists', $data, $conidtion);
    }

    function remove_role_by_id($id) {

        $data = array(
            'id' => $id
        );

        return $this->db->delete('tbl_roles', $data);
    }

    function remove_login_by_id($id) {

        $data = array(
            'lg_id' => $id
        );

        return $this->db->delete('tbl_login', $data);
    }

    function check_username($username, $s_id = '') {

        $data = array(
            'lg_email' => $username,
            's_id' => $s_id,
        );

        $query = $this->db->get_where('tbl_login', $data);

        return $query->num_rows();
    }

    function save_user_login($data) {

        $this->db->insert('tbl_login', $data);
        return $this->db->insert_id();
    }

    function get_creator_user_id_calender($role_id, $s_id) {

        $data = array(
            's_id' => $s_id,
            'lg_type' => $role_id,
        );

        $query = $this->db->get_where('tbl_login', $data);

        $result = $query->result_array();

        //echo $this->db->last_query();;

        return $result[0]['lg_id'];
    }

    function get_per_by_skool($id) {

        $this->db->select('*');
        $this->db->from('tbl_roles');
        $this->db->where('s_id', $id);
        $this->db->where('s_type', 'school');

        $query = $this->db->get();

        $result = $query->result_array();

        return $result;
    }

    function update_user_login($data, $id) {


        $response = $this->db->update('tbl_login', $data, array('lg_id' => $id));

        return $response;
    }

    ////checking core permissions and making ui better to view
    function check_core_permission($type) {

        $data = array(
            //////////user id is actually permission thing
            'user_id' => $type
        );
        ////For User selected permission type cache

        $not_char_array = array(" ", "/", "-");
        $user_core_permission_type_cacheID = "user_" . $type . '_' . 'core_permission_type_data';
        $core_permission_type_data = $this->zf_cache->load($user_core_permission_type_cacheID);
        if (!$core_permission_type_data) {
            $query = $this->db->get_where('tbl_permissions', $data);

            if ($query->num_rows() > 0) {
                $result = $query->result_array();

                if ($result[0]['permission_core'] == 1) {
                    $core_permission_type_data = 'view';
                    //return 'view';
                }
                if ($result[0]['permission_core'] == 2) {
                    $core_permission_type_data = 'modify';
                    //return 'modify';
                }
            } else {
                $core_permission_type_data = 'view';
                //return 'view';
            }
            $this->zf_cache->save($core_permission_type_data, $user_core_permission_type_cacheID, array($user_core_permission_type_cacheID));
        }

        return $core_permission_type_data;
    }

    function check_permission_old($name, $type) {

        if (empty($type)) {
            redirect('/login');
        }

        $data = array(
            //////////user id is actually permission thing
            'user_id' => $type
        );

        $query = $this->db->get_where('tbl_permissions', $data);

        if ($query->num_rows() > 0) {

            $result = $query->result_array();

            $id = $this->get_permission_id($name);

            $data_permission = json_decode($result[0]['permission_array']);

            if (!is_array($data_permission)) {
                $data_permission = array();
            }

            if (in_array($id, $data_permission)) {
                return true;
            } else {

                return false;
            }
        } else {

            ////////if user type is not found
            return false;
        }
    }

    function check_permission($name, $type) {

        $data = array(
            //////////user id is actually permission thing
            'user_id' => $type
        );

        ////For User selected permission type cache

        $not_char_array = array(" ", "/", "-");
        $user_permission_type_cacheID = $type . '_' . strtolower(str_replace($not_char_array, "_", $name)) . '_permission_type_data';
        $permission_type_data = $this->zf_cache->load($user_permission_type_cacheID);
        if (!$permission_type_data) {
            $query = $this->db->get_where('tbl_permissions', $data);

            if ($query->num_rows() > 0) {

                $result = $query->result_array();

                $id = $this->get_permission_id($name);

                $data_permission = json_decode($result[0]['permission_array']);

                if (!is_array($data_permission)) {
                    $data_permission = array();
                }

                if (in_array($id, $data_permission)) {
                    $permission_type_data = true;
                    //return true;
                } else {
                    $permission_type_data = false;
                    //return false;
                }
            } else {

                ////////if user type is not found
                $permission_type_data = false;
                //return false;
            }
            $this->zf_cache->save($permission_type_data, $user_permission_type_cacheID, array($user_permission_type_cacheID));
        }

        return $permission_type_data;

        ////For User selected permission type cache
    }

    function check_permission_pwd($name, $role) {

        if (empty($role)) {
            redirect('/login');
        }

        $data = array(
            //////////user id is actually permission thing
            'user_id' => $role
        );

        $query = $this->db->get_where('tbl_permissions', $data);


        if ($query->num_rows() > 0) {

            $result = $query->result_array();

            $id = $this->get_permission_id($name);
            //echo $id;
            $data_permission = json_decode($result[0]['permission_array']);

            if (!is_array($data_permission)) {
                $data_permission = array();
            }
            //print_r($data_permission);
            //die;
            if (in_array($id, $data_permission)) {
                $res = 'permision found';
                return $res;
            } else {
                $res = 'permision not found';
                return $res;
            }
        } else {

            ////////if user type is not found
            return false;
        }
    }

    function get_permission_id($name) {

        $data = array(
            //////////user id is actually permission thing
            'permission_name' => $name
        );

        $query = $this->db->get_where('tbl_permissions_lists', $data);

        $result = $query->result_array();

        if (isset($result[0]['id'])) {
            return $result[0]['id'];
        } else {
            return '';
        }
    }

    function get_roleusers_byid($id) {
        $data = array(
            'lg_type' => $id
        );

        $this->db->select('*');
        $this->db->from('tbl_login');
        $this->db->where($data);

        $query = $this->db->get();

        $result = $query->result_array();

        return $result;
    }

    function retrieve_usersofschool($sid) {
        $this->db->select('id');
        $this->db->from('tbl_roles');
        $this->db->where('s_id', $sid);

        $query = $this->db->get();

        $result = $query->result_array();

        return $result;
    }

    function get_school_record($id) {


        $this->db->select('*');
        $this->db->from('tbl_roles');
        $this->db->where('s_id', $id);
        $this->db->where('s_type ', 'school');
        $query = $this->db->get();

        $result = $query->result_array();

        return $result;
    }

    function get_record_main($role) {
        $this->db->select('*');
        $this->db->from('tbl_roles');
        $this->db->where('s_id', 0);
        $this->db->where('role_name', $role);
        $query = $this->db->get();

        $result = $query->result_array();

        return $result;
    }

    function get_all_roles($limit = '', $page = '') {

        $data = $this->session->userdata('session_user_data');

        $this->db->select('*');
        $this->db->from('tbl_roles');
        $this->db->where('s_id', $data['data'][0]['id']);
        $this->db->where('s_type !=', 'school');
        //$this->db->order_by('id','desc');


        if (!empty($limit)) {
            $this->db->limit($limit, $page);
        }

        $query = $this->db->get();
        /* 	echo $this->db->last_query();
          die; */
        $result = $query->result_array();

        return $result;
    }
    
    function get_all_roles_parent($sid) {

        

        $this->db->select('*');
        $this->db->from('tbl_roles');
        $this->db->where('s_id', $sid);
        $this->db->where('s_type !=', 'school');
        //$this->db->order_by('id','desc');

        $query = $this->db->get();
        /* 	echo $this->db->last_query();
          die; */
        $result = $query->result_array();

        return $result;
    }

    function dropdown_skooltype() {

        $data = $this->session->userdata('session_user_data');

        $this->db->select('*');
        $this->db->from('tbl_roles');
        $this->db->join('tbl_permissions', 'tbl_permissions.user_id=tbl_roles.id');
        $this->db->where('tbl_roles.s_id', 0);
        $this->db->where('tbl_roles.s_type', 'school');

        $query = $this->db->get();

        $result = $query->result_array();

        return $result;
    }

    // if roles have permissions added 



    function get_skool_type($limit = '', $page = '') {

        $this->db->select('*');
        $this->db->from('tbl_roles');
        $this->db->where('s_id', '0');
        $this->db->where('s_type', 'school');

        if (!empty($limit)) {
            $this->db->limit($limit, $page);
        }

        $query = $this->db->get();
        $result = $query->result_array();

        return $result;
    }

    function get_skool_defaulttype($type) {

        $data = $this->session->userdata('session_user_data');

        $this->db->select('*');
        $this->db->from('tbl_roles');
        $this->db->where('s_id', 0);
        $this->db->where('s_type ', 'school');
        $this->db->where('role_name', $type);

        $query = $this->db->get();

        $result = $query->result_array();

        return $result;
    }

    function check_type_instructor($id) {

        $this->db->select('*');
        $this->db->from('tbl_roles');
        $this->db->join('tbl_permissions', 'tbl_roles.id=tbl_permissions.user_id');
        $this->db->where('tbl_roles.id', $id);

        $query = $this->db->get();

        $result = $query->result_array();

        ////this only checks
        if ($query->num_rows() > 0) {

            ////if its is going to manage then display the manage courses so we can assign them to students
            if ($result[0]['permission_core'] == 2) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }


    function get_all_instructors() {

        $this->db->select('*');

        $this->db->from('tbl_roles');

        $query = $this->db->get();

        $result = $query->result_array();

        return $result;
    }





    function add_hashcode_id($id, $hash, $name) {
        $array_data = array(
            'reset_user_id' => $id,
            'reset_hash' => $hash,
            'reset_username' => $name
        );
        return $this->db->insert('tbl_reset_pwd', $array_data);
    }

    function check_hcode($hash, $id) {
        $this->db->select('reset_hash');
        $this->db->from('tbl_reset_pwd');
        $this->db->where('reset_user_id', $id);
        $query = $this->db->get();
        /* echo $this->db->last_query();
          die; */
        $result = $query->result_array();

        if ($query->num_rows > 0) {
            return 'true';
        } else {
            return 'false';
        }
    }

    function get_role_id_byname($uname, $sid) {
        $this->db->select('lg_type');
        $this->db->from('tbl_login');
        $this->db->where('lg_email', $uname);
        $this->db->where('s_id', $sid);

        $query = $this->db->get();
        $result = $query->result_array();
        //return $result;

        if ($query->num_rows > 0) {
            return $result[0]['lg_type'];
        } else {
            return 'false';
        }
    }

    function save_pwd($sid, $newpwd) {
        $condition = array(
            'id' => $sid,
                //'school_username' => $uname
        );
        $condition2 = array(
            'reset_user_id' => $sid,
                //'school_username' => $uname
        );

        $data = array(
            'school_password' => $newpwd
        );

        $this->db->update('tbl_schools_data', $data, $condition);
        return $this->db->delete('tbl_reset_pwd', $condition2);
    }

    function get_user_id_by_name($uname, $sid) {
        $this->db->select('lg_id');
        $this->db->from('tbl_login');
        $this->db->where('lg_email', $uname);
        $this->db->where('s_id', $sid);

        $query = $this->db->get();
        $result = $query->result_array();
        //return $result;

        if ($query->num_rows > 0) {
            return $result[0]['lg_id'];
        } else {
            return 'false';
        }
    }

    function save_user_pwd($uid, $sid, $newpwd, $uname = '') {
        $condition = array(
            's_id' => $sid,
            'lg_id' => $uid,
        );

        $data = array(
            'lg_password' => $newpwd
        );

        return $this->db->update('tbl_login', $data, $condition);
    }


    function get_admin_id($admin, $sid) {
        $this->db->select('lg_id');
        $this->db->from('tbl_login');
        $this->db->where('s_id', $sid);
        $this->db->where('lg_email', $admin);
        $query = $this->db->get();
        $result = $query->result_array();
        //return $result;

        if ($query->num_rows > 0) {
            return $result[0]['lg_id'];
        } else {
            return 'false';
        }
    }

    function get_user_firstname($uname, $sid) {
        $this->db->select('lg_fname');
        $this->db->from('tbl_login');
        $this->db->where('s_id', $sid);
        $this->db->where('lg_email', $uname);
        $query = $this->db->get();
        $result = $query->result_array();
        //return $result;

        if ($query->num_rows > 0) {
            return $result[0]['lg_fname'];
        } else {
            return 'false';
        }
    }

    function get_user_lastname($uname, $sid) {
        $this->db->select('lg_lname');
        $this->db->from('tbl_login');
        $this->db->where('s_id', $sid);
        $this->db->where('lg_email', $uname);
        $query = $this->db->get();
        $result = $query->result_array();
        //return $result;

        if ($query->num_rows > 0) {
            return $result[0]['lg_lname'];
        } else {
            return 'false';
        }
    }

    function check_sadmin_login($data) {

        $this->db->select('*');
        $this->db->from('tbl_login');
        $this->db->where($data);

        $query = $this->db->get();

        $result = $query->result_array();

        return $query->num_rows;
    }

    function update_sadmin_login($data) {

        $condition = array(
            's_id' => 0,
            'lg_type' => 0
        );

        $data = array(
            'lg_password' => $data['lg_password']
        );

        $this->db->update('tbl_login', $data, $condition);

        echo $this->db->last_query();
    }

    function check_school_pwd($id, $old_pwd) {
        $this->db->select('*');
        $this->db->from('tbl_schools_data');
        $this->db->where('id', $id);
        $this->db->where('school_password', $old_pwd);
        $query = $this->db->get();

        $result = $query->result_array();

        return $query->num_rows;
    }

    function update_school_pwd($id, $new_pwd) {

        $condition = array(
            'id' => $id
        );

        $data = array(
            'school_password' => $new_pwd
        );

        $this->db->update('tbl_schools_data', $data, $condition);

        echo $this->db->last_query();
    }

    function static_count_types() {
        $this->db->select('*');
        $this->db->from('tbl_roles');
        $this->db->where('s_id', '0');
        $this->db->where('s_type', 'school');

        $query = $this->db->get();

        return $query->num_rows();
    }

    function static_count_roles() {
        $data = $this->session->userdata('session_user_data');

        $this->db->select('*');
        $this->db->from('tbl_roles');
        $this->db->where('s_id', $data['data'][0]['id']);
        $this->db->where('s_type !=', 'school');

        $query = $this->db->get();

        return $query->num_rows();
    }

    function get_school_name($sid, $field_name = '') {
        $this->db->select('name,school_subdomain');
        $this->db->from('tbl_schools_data');
        $this->db->where('id', $sid);

        $query = $this->db->get();
        $result = $query->result_array();

        if (!empty($field_name)) {
            if ($query->num_rows > 0) {
                return $result[0][$field_name];
            } else {
                return '';
            }
        }

        if ($query->num_rows > 0) {
            return $result[0]['name'];
        } else {
            return '';
        }
    }

    function get_admin_login($sid) {

        $this->db->select('tbl_login.lg_id');
        $this->db->from('tbl_schools_data');
        $this->db->join('tbl_login', 'tbl_schools_data.school_username=tbl_login.lg_email');
        $this->db->where('tbl_login.s_id', $sid);

        $query = $this->db->get();
        $result = $query->result_array();

        if ($query->num_rows > 0) {

            return $result[0]['lg_id'];
        } else {
            return '';
        }
    }

    function get_school_id_by_lg_id($lg_id) {
        $this->db->select('s_id');
        $this->db->from('tbl_login');
        $this->db->where('lg_id', $lg_id);

        $query = $this->db->get();
        $result = $query->result_array();

        if ($query->num_rows > 0) {
            return $result[0]['s_id'];
        } else {
            return '';
        }
    }

    function get_school_email($id, $sid) {
        $this->db->select('school_email');
        $this->db->from('tbl_schools_data');
        $this->db->where('school_email', $id);
        $this->db->where('id', $sid);
        $query = $this->db->get();
        $result = $query->result_array();

        if ($query->num_rows > 0) {
            return 'true';
        } else {
            return 'false';
        }
    }

    function get_user_email($uid) {
        $this->db->select('lg_email_id');
        $this->db->from('tbl_login');
        //$this->db->where('email',$id);
        $this->db->where('lg_id', $uid);
        $query = $this->db->get();

        $result = $query->result_array();

        if (!empty($result[0]['lg_email_id'])) {
            return $result[0]['lg_email_id'];
        } else {
            return 'false';
        }
    }

    function update_user_pwd($id, $new_pwd) {

        $condition = array(
            'lg_id' => $id
        );

        $data = array(
            'lg_password' => $new_pwd
        );

        if ($this->db->update('tbl_login', $data, $condition)) {
            echo true;
        } else {
            echo false;
        }

        //echo $this->db->last_query();
    }

    function check_user_pwd($id, $old_pwd) {
        $this->db->select('*');
        $this->db->from('tbl_login');
        $this->db->where('lg_id', $id);
        $this->db->where('lg_password', $old_pwd);
        $query = $this->db->get();

        $result = $query->result_array();

        return $query->num_rows;
    }

    //For giving menu access...
    function add_permission_record($data) {

        return $this->db->insert('tbl_permissions_lists', $data);
    }

    function get_selected_permission_role($data) {

        $this->db->select('*');
        $this->db->from('tbl_permissions_lists');
        $this->db->where($data);

        $query = $this->db->get();
        if ($query->num_rows() > 0) {
            $result = $query->result_array();
            return $result;
        }
        return 1;
    }

    //for search events 
    function get_users_search($data, $school_id, $login_id) {

        $this->db->select('*');
        $this->db->from('tbl_login');
        $this->db->where('tbl_login.s_id', $school_id);
        $this->db->where_not_in('tbl_login.lg_id', $login_id);
        $str = "(tbl_login.lg_fname LIKE '%" . $data . "%' OR tbl_login.lg_lname LIKE '%" . $data . "%' ) ";
        $this->db->where($str);
        $query = $this->db->get();
        $result = $query->result_array();
// echo $this->db->last_query();// exit;
        if ($query->num_rows() > 0) {
            return $result;
        }
    }


    function get_selected_permission_role_search($data, $in_data) {
        $this->db->select('*');
        $this->db->from('tbl_permissions_lists');
        $this->db->where($data);
        if (is_array($in_data))
            $this->db->where_in("id", $in_data);

        $query = $this->db->get();
//echo $this->db->last_query(); //exit;
        if ($query->num_rows() > 0) {
            $result = $query->result_array();
            return $result;
        } else {
            return 1;
        }
    }

    function get_all_users_by_data($data){
        $this->db->from('tbl_login');
        $this->db->where($data);
        $this->db->order_by('lg_id', 'DESC');
        
        $query = $this->db->get();
//echo $this->db->last_query();exit;
        if ($query->num_rows() > 0) {
            return $query->result_array();
        } else {
            return array();
        }
    }
    
}

//end of model
?>
