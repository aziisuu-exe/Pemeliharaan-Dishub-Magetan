<?php

namespace App\Features\Inventory\Requests;

use App\Support\Enums\ItemCondition;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreInventoryRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'category_id' => ['required', 'integer', 'exists:categories,id'],
            'location_id' => ['required', 'integer', 'exists:locations,id'],
            'code' => ['required', 'string', 'max:100', 'unique:inventories,code'],
            'name' => ['required', 'string', 'max:255'],
            'condition' => ['required', Rule::enum(ItemCondition::class)],
            'quantity' => ['required', 'integer', 'min:1'],
            'unit' => ['required', 'string', 'max:50'],
            'procurement_year' => ['nullable', 'integer', 'digits:4', 'min:1990', 'max:' . (date('Y') + 1)],
            'specification' => ['nullable', 'string', 'max:2000'],
        ];
    }

    public function messages(): array
    {
        return [
            'category_id.required' => 'Kategori wajib dipilih.',
            'category_id.exists' => 'Kategori yang dipilih tidak valid.',
            'location_id.required' => 'Lokasi wajib dipilih.',
            'location_id.exists' => 'Lokasi yang dipilih tidak valid.',
            'code.required' => 'Kode inventaris wajib diisi.',
            'code.unique' => 'Kode inventaris sudah digunakan.',
            'name.required' => 'Nama aset sarana prasarana wajib diisi.',
            'condition.required' => 'Kondisi barang wajib dipilih.',
            'condition.enum' => 'Status kondisi barang tidak valid.',
            'quantity.required' => 'Jumlah barang wajib diisi.',
            'quantity.min' => 'Jumlah barang minimal 1.',
            'unit.required' => 'Satuan barang wajib diisi.',
            'procurement_year.digits' => 'Tahun perolehan harus berupa 4 digit tahun.',
        ];
    }
}