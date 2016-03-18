<?php
/**
 * Created by PhpStorm.
 * User: huanle0610
 * Date: 2016/3/18
 * Time: 23:19
 */

namespace Interconnection;


class Oneness
{
    protected $ci;
    protected $db;

    public function __construct()
    {
        $this->ci =& get_instance();
        $this->ci->load->database();
        $this->db = $this->ci->db;
    }

}