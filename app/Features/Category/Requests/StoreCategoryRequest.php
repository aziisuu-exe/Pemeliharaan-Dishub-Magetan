<?php

namespace App\Features\Category\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreCategoryRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255', 'unique:categories,name'],
            'description' => ['nullable', 'string', 'max:1000'],
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Nama kategori wajib diisi.',
            'name.string' => 'Nama kategori harus berupa teks.',
            'name.max' => 'Nama kategori tidak boleh lebih dari 255 karakter.',
            'name.unique' => 'Nama kategori ini sudah terdaftar.',
            'description.string' => 'Deskripsi harus berupa teks.',
            'description.max' => 'Deskripsi tidak boleh lebih dari 1000 karakter.',
        ];
    }
}