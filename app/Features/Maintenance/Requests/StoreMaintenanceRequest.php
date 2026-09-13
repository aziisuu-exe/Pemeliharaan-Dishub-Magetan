<?php

namespace App\Features\Maintenance\Requests;

use App\Support\Enums\ItemCondition;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreMaintenanceRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'inventory_id' => ['required', 'integer', 'exists:inventories,id'],
            'maintenance_date' => ['required', 'date'],
            'condition_before' => ['required', Rule::enum(ItemCondition::class)],
            'condition_after' => ['required', Rule::enum(ItemCondition::class)],
            'action_description' => ['required', 'string', 'max:2000'],
            'cost' => ['nullable', 'numeric', 'min:0'],
            'officer_name' => ['required', 'string', 'max:255'],
        ];
    }

    public function messages(): array
    {
        return [
            'inventory_id.required' => 'Aset inventaris wajib dipilih.',
            'inventory_id.exists' => 'Inventaris tidak ditemukan.',
            'maintenance_date.required' => 'Tanggal pemeliharaan wajib diisi.',
            'maintenance_date.date' => 'Format tanggal pemeliharaan tidak valid.',
            'condition_before.required' => 'Kondisi sebelum tindakan wajib dipilih.',
            'condition_after.required' => 'Kondisi sesudah tindakan wajib dipilih.',
            'action_description.required' => 'Deskripsi tindakan perbaikan wajib diisi.',
            'cost.numeric' => 'Estimasi biaya harus berupa angka.',
            'officer_name.required' => 'Nama teknisi atau petugas pelaksana wajib diisi.',
        ];
    }
}