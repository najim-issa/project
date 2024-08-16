<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CollectionRequest extends Model
{
    use HasFactory;

    protected $table = 'collectionrequest';

    protected $primaryKey = 'RequestId';

    protected $fillable = [
        'userId',
        'collectorId',
        'status',
    ];

    public function user()
{
    return $this->belongsTo(User::class, 'userId');
}


public function collector()
{
    return $this->belongsTo(Collector::class, 'collectorId');
}

}
