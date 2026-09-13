<?php

namespace App\Features\Report\Requests;

use App\Support\Enums\ItemCondition;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class InventoryReportRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'category_id' => ['nullable', 'integer', 'exists:categories,id'],
            'location_id' => ['nullable', 'integer', 'exists:locations,id'],
            'condition' => ['nullable', Rule::enum(ItemCondition::class)],
        ];
    }
}