// src/models/Bus.ts
export interface Bus {
    id: number;
    busNumber: string;
    capacity: number;
    routeId?: number; // Nullable for buses not assigned to a route
    currentLocation: string; // Could be a geospatial point, represented as a string
}
