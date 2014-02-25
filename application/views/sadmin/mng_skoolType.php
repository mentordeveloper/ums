<div class="maincontent">
    <div class="maincontentinner">
        <ul class="maintabmenu">
            <li class="current"><a href="<?php echo base_url(); ?>sadmin/mng_skoolType">School Type Managment</a></li>
        </ul>
        <div class="content">

            <?php
            $msg = $this->input->get('msg');
            $go = $this->input->get('go');

            if ($go == 'true') {
                echo '<div class="notification msgsuccess">
                        <a class="close"></a><p>';
            }
            if ($go == 'false') {
                echo '<div class="notification msgerror">
<a class="close"></a><p>';
            }

            if (!empty($msg)) {
                echo $this->input->get('msg') . '</p></div><br/>';
            }
            ?>

            <div class="contenttitle radiusbottom0">
                <h2 class="table"><span>Managment</span></h2>
            </div>
            <table cellpadding="0" cellspacing="0" border="0" class="stdtable" id="dyntable">

                <colgroup>
                    <col class="con0" />
                    <col class="con1" />
                    <col class="con0" />
                    <col class="con1" />
                    <col class="con0" />
                </colgroup>
                <thead>
                    <tr>
                        <th class="head0">No.</th>
                        <th class="head1">Type</th>
                        <th class="head0">View Permission</th>
                        <th class="head1">Actions</th>
                    </tr>
                </thead>
                <?php
                
                $i = 1;
                foreach ($roles as $counter => $peritem) {
                    ?>
                    <tr id="row_<?php echo $peritem['id']; ?>" class="gradeX">
                        <td align="left" style="padding-left:10px;"><b><?php echo $i; ?></b></td>
                        <td align="left" style="padding-left:10px;"><?php echo $peritem['role_name'] ?></td>
                        <td>

                            <a href="<?php echo base_url(); ?><?php echo index_page(); ?>sadmin/feature_permissions_skool?id=<?php echo $peritem['id']; ?>">Permissions</a></td>
                        <td align="right">
                            <span class="mylink">
                                <a   href="#" onclick="remove_schooltype(<?php echo $peritem['id']; ?>, '<?php echo $peritem['role_name'] ?>');"> <span>Remove</span></a>
                            </span>

                        </td>
                    </tr>
                    <?php
                    $i++;
                }
                ?>
            </table>
            </center>
        </div>
        <div class="mainright">
            <div class="mainrightinner">
                <form id="schooltype" class="stdform" action="<?php echo base_url(); ?><?php echo index_page(); ?>sadmin/add_skool_type" method="post" >
                    <div class="widgetbox" style="width: 300px">
                        <div class="title">
                            <h2 class="general"><span>Add New School Type</span></h2>
                        </div>
                        <div class="widgetcontent stdform stdformwidget">
                            <div class="par">
                                <label><b>Type Name</b></label>
                                <div class="field">
                                    <input type="text" name="role" class="longinput" />
                                </div>
                            </div>
                            <!--par-->
                            <div class="par">
                                <div class="field">
                                    <button class="radius2" type="submit">Submit</button>
                                </div>
                            </div>
                            <!--par--> 
                        </div>
                        <!--widgetcontent--> 
                    </div>
                    <!--widgetbox-->
                </form>
            </div>
        </div>
    </div>
    <? $this->load->view('sadmin/footer'); ?>
