<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Honey_workerbee extends CI_Driver
{

    function busybee()
    {
        return $this->_pot_honey();
    }

    function _pot_honey()
    {
        return 'Here is a pot of honey';
    }

    function can_we_sell($money)
    {
        if ($money > 5) {
            return TRUE;
        }
    }

    public function get_metadata($id)
    {
        return __CLASS__ . ' xixi' . $id;
    }
}