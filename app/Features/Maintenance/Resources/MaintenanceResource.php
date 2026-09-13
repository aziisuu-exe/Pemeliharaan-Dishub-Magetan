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
            'inventory_name' => $this->inventory?->name,
            'inventory_code' => $this->inventory?->code,
            'officer_name' => $this->officer_name,
            'maintenance_date' => $this->maintenance_date?->format('Y-m-d'),
            'completion_date' => $this->completion_date?->format('Y-m-d'),
            'condition_before' => $this->condition_before?->value ?? $this->condition_before,
            'condition_after' => $this->condition_after?->value ?? $this->condition_after,
            'issue_description' => $this->issue_description,
            'action_taken' => $this->action_taken,
            'status' => $this->status,
            'created_at' => $this->created_at?->toISOString(),
        ];
    }
}