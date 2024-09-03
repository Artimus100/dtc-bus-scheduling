import { Bus } from "@prisma/client";

// src/models/Route.ts
export interface Route {
    id: number;
    name: string;
    coordinates: string; // A WKT (Well-Known Text) string representing the route's geospatial data
    buses: Bus[];
}
export interface RouteOverlap {
    route1: string;
    route2: string;
}
