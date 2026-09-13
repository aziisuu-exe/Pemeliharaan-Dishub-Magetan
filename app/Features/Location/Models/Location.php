<?php

namespace App\Features\Location\Models;

use App\Features\Inventory\Models\Inventory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Location extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'address',
        'coordinate',
    ];

    public function inventories(): HasMany
    {
        return $this->hasMany(Inventory::class);
    }
}