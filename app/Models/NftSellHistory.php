<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NftSellHistory extends Model
{
    use HasFactory;

    protected $fillable = ['nft_purchase_history_id','user_id', 'product_id', 'sale_amount','status','order_id','created_at', 'updated_at', 'approve_date','counter_offer_amount', 'counter_offer_status','remark','counter_offer_verification_key'];

    protected $table = "nft_sell_histories";

    protected $dates = ['approve_date'];

    public function nftpurchasehistory(){
        return $this->belongsTo(NftPurchaseHistory::class,'nft_purchase_history_id','id');
    }
    public function user_detail(){
        return $this->belongsTo(User::class,'user_id','id');
    }

    public function nftproduct(){
        return $this->belongsTo(NftProduct::class,'product_id','id');
    }   
}
