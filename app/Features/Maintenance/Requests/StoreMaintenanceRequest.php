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
            'officer_name' => ['required', 'string', 'max:255'],
            'maintenance_date' => ['required', 'date'],
            'completion_date' => ['nullable', 'date', 'after_or_equal:maintenance_date'],
            'condition_before' => ['required', new Enum(ItemCondition::class)],
            'condition_after' => ['nullable', new Enum(ItemCondition::class)],
            'issue_description' => ['required', 'string'],
            'action_taken' => ['nullable', 'string'],
            'status' => ['required', 'in:pending,in_progress,completed'],
        ];
    }
}