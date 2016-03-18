<?php
/**
 * Created by PhpStorm.
 * User: huanle0610
 * Date: 2016/3/18
 * Time: 23:07
 */

namespace Interconnection;


class DraftFactory extends Oneness
{
    const POWER_SI = 1;
    const POWER_DC = 2;
    const SIWAVE = 3;
    const HFSS = 4;
    const HSPICE = 5;

    public static function createDraft($software)
    {
        $draft = null;
        switch($software)
        {
            case self::POWER_SI:
                $draft = new SigrityPSIDraft();
                break;
            case self::POWER_DC:
                $draft = new SigrityPDCDraft();
                break;
            case self::SIWAVE:
                $draft = new SIwaveDraft();
                break;
            case self::HFSS:
                $draft = new HfssDraft();
                break;
            case self::HSPICE:
                $draft = new HspiceDraft();
                break;
            default:
               throw new \Exception(sprintf("Unsupported software [%d] to create draft", $software));
        }

        return $draft;
    }

    public function createDraftFromID($draft_id)
    {
        $this->ci->load->model('draft_model');
        $draft_row = $this->ci->draft_model->get($draft_id);
//        var_dump($draft_row);
    }
}