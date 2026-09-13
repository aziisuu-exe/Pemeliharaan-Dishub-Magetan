<?php

namespace App\Features\Category\Models;

use App\Features\Inventory\Models\Inventory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Category extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
    ];

    public function inventories(): HasMany
    {
        return $this->hasMany(Inventory::class);
    }
}