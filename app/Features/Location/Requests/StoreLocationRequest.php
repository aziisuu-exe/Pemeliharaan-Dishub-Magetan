<?php

namespace App\Features\Location\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreLocationRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'address' => ['nullable', 'string', 'max:1000'],
            'coordinate' => ['nullable', 'string', 'max:255'],
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Nama lokasi penempatan wajib diisi.',
            'name.string' => 'Nama lokasi harus berupa teks.',
            'name.max' => 'Nama lokasi tidak boleh lebih dari 255 karakter.',
            'address.string' => 'Alamat atau deskripsi harus berupa teks.',
            'address.max' => 'Alamat tidak boleh lebih dari 1000 karakter.',
            'coordinate.string' => 'Koordinat harus berupa teks.',
            'coordinate.max' => 'Koordinat tidak boleh lebih dari 255 karakter.',
        ];
    }
}