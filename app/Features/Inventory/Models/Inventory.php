<?php

namespace App\Features\Inventory\Models;

use App\Features\Category\Models\Category;
use App\Features\Location\Models\Location;
use App\Features\Maintenance\Models\Maintenance;
use App\Support\Enums\ItemCondition;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Inventory extends Model
{
    use HasFactory;

    protected $fillable = [
        'category_id',
        'location_id',
        'code',
        'name',
        'condition',
        'quantity',
        'unit',
        'procurement_year',
        'specification',
    ];

    protected function casts(): array
    {
        return [
            'condition' => ItemCondition::class,
            'procurement_year' => 'integer',
            'quantity' => 'integer',
        ];
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function location(): BelongsTo
    {
        return $this->belongsTo(Location::class);
    }

    public function maintenances(): HasMany
    {
        return $this->hasMany(Maintenance::class);
    }
}