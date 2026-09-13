<?php

namespace App\Support\Enums;

enum ItemCondition: string
{
    case GOOD = 'good';
    case LIGHT_DAMAGE = 'light_damage';
    case HEAVY_DAMAGE = 'heavy_damage';

    public function label(): string
    {
        return match ($this) {
            self::GOOD => 'Baik',
            self::LIGHT_DAMAGE => 'Rusak Ringan',
            self::HEAVY_DAMAGE => 'Rusak Berat',
        };
    }
}