<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Collector extends Model
{
    use HasFactory;

    protected $primaryKey = 'collectorId';

    protected $fillable = [
        'userId',
        'vehicleId',
        'EmployeeId',
        'image'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'userId');
    }
}
