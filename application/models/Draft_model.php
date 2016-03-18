<?php

/**
 * Created by PhpStorm.
 * User: huanle0610
 * Date: 2016/3/18
 * Time: 23:34
 */
class Draft_model extends MY_Model
{
    public $table = 'draft';
    public $primary_key = 'draft_id';
    public function __construct()
    {
        parent::__construct();
    }
}