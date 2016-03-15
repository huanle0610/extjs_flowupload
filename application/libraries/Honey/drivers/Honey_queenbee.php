<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Honey_queenbee extends CI_Driver
{

    function pardon()
    {
        return 'You are forgiven';
    }

    function can_we_sell($money)
    {
        if($money > $this->config->item('honey_pot_value', 'honey'))
        {
            return TRUE;
        }
    }

    public function get_metadata($id)
    {
        return __CLASS__ . ' xixi' . $id;
    }
}