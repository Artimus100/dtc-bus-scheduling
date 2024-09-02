type bus = { id: number; license_plate: string };
type route = { id: number; route_name: string };

const assignBusesToRoutes = (buses: bus[], routes: route[]) => {
  // Basic logic to assign buses to routes
  const assignments: { route: route; bus: bus }[] = [];
  routes.forEach((route, index) => {
    assignments.push({ route, bus: buses[index % buses.length] });
  });
  return assignments;
};

export default assignBusesToRoutes;
