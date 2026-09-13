<?php

namespace App\Features\Maintenance\Resources;

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
            'condition_before' => $this->condition_before?->value ?? $this->condition_before,
            'condition_after' => $this->condition_after?->value ?? $this->condition_after,
            'action_description' => $this->action_description,
            'officer_name' => $this->officer_display_name,
            'inventory' => $this->whenLoaded('inventory', fn () => [
                'id' => $this->inventory->id,
                'name' => $this->inventory->name,
                'code' => $this->inventory->code,
            ]),
            'user' => $this->whenLoaded('user', fn () => [
                'id' => $this->user->id,
                'name' => $this->user->name,
            ]),
        ];
    }
}