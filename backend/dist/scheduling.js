"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assignBusesToRoutes = (buses, routes) => {
    // Basic logic to assign buses to routes
    const assignments = [];
    routes.forEach((route, index) => {
        assignments.push({ route, bus: buses[index % buses.length] });
    });
    return assignments;
};
exports.default = assignBusesToRoutes;
