<?php

namespace App\Features\Inventory\Resources;

use App\Features\Category\Resources\CategoryResource;
use App\Features\Location\Resources\LocationResource;
use App\Features\Maintenance\Resources\MaintenanceResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class InventoryResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'category_id' => $this->category_id,
            'location_id' => $this->location_id,
            'code' => $this->code,
            'name' => $this->name,
            'condition' => $this->condition?->value,
            'condition_label' => $this->condition?->label(),
            'quantity' => $this->quantity,
            'unit' => $this->unit,
            'procurement_year' => $this->procurement_year,
            'specification' => $this->specification,
            'category' => new CategoryResource($this->whenLoaded('category')),
            'location' => new LocationResource($this->whenLoaded('location')),
            'maintenances' => MaintenanceResource::collection($this->whenLoaded('maintenances')),
            'created_at' => $this->created_at?->format('Y-m-d H:i'),
            'updated_at' => $this->updated_at?->format('Y-m-d H:i'),
        ];
    }
}