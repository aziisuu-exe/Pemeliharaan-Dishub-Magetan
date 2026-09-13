<?php

namespace App\Features\Report\Requests;

use Illuminate\Foundation\Http\FormRequest;

class MaintenanceReportRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'start_date' => ['nullable', 'date'],
            'end_date' => ['nullable', 'date', 'after_or_equal:start_date'],
            'inventory_id' => ['nullable', 'integer', 'exists:inventories,id'],
        ];
    }

    public function messages(): array
    {
        return [
            'end_date.after_or_equal' => 'Tanggal akhir harus sama dengan atau setelah tanggal awal.',
        ];
    }
}