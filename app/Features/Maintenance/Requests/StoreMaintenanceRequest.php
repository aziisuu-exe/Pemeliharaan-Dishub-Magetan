<?php

namespace App\Features\Maintenance\Requests;

use App\Support\Enums\ItemCondition;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;

class StoreMaintenanceRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'inventory_id' => ['required', 'exists:inventories,id'],
            'user_id' => ['required', 'exists:users,id'],
            'maintenance_date' => ['required', 'date'],
            'condition_before' => ['required', new Enum(ItemCondition::class)],
            'condition_after' => ['required', new Enum(ItemCondition::class)],
            'action_description' => ['required', 'string', 'max:1000'],
        ];
    }
}