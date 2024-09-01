type Bus = { id: number; license_plate: string };
type Route = { id: number; route_name: string };

const assignBusesToRoutes = (buses: Bus[], routes: Route[]) => {
  // Basic logic to assign buses to routes
  const assignments: { route: Route; bus: Bus }[] = [];
  routes.forEach((route, index) => {
    assignments.push({ route, bus: buses[index % buses.length] });
  });
  return assignments;
};

export default assignBusesToRoutes;
