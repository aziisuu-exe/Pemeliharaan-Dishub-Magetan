<?php

namespace App\Features\Maintenance\Resources;

use App\Features\Inventory\Resources\InventoryResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MaintenanceResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'inventory_id' => $this->inventory_id,
            'user_id' => $this->user_id,
            'maintenance_date' => $this->maintenance_date?->format('Y-m-d'),
            'condition_before' => $this->condition_before?->value,
            'condition_before_label' => $this->condition_before?->label(),
            'condition_after' => $this->condition_after?->value,
            'condition_after_label' => $this->condition_after?->label(),
            'action_description' => $this->action_description,
            'cost' => (float) $this->cost,
            'officer_name' => $this->officer_name,
            'inventory' => new InventoryResource($this->whenLoaded('inventory')),
            'user_name' => $this->user?->name,
            'created_at' => $this->created_at?->format('Y-m-d H:i'),
        ];
    }
}