import React, { useState } from 'react';
import { Button } from "././ui/button";
import { Input } from "././ui/input";
import { Label } from "././ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "././ui/table";
import { Search, MapPin } from 'lucide-react';
import Map from './Map';


interface Route {
    name: string;
    startPoint: string;
    endPoint: string;
    intermediateStops: string;
    coordinates: [number, number][];
    color?: string;
  }
  
  export default function RouteOverlapChecker() {
    const [newRoute, setNewRoute] = useState<Route>({
      name: '',
      startPoint: '',
      endPoint: '',
      intermediateStops: '',
      coordinates: []
    });
  
    const [existingRoutes] = useState<Route[]>([
      { name: 'Route 1', startPoint: 'A', endPoint: 'D', intermediateStops: 'B, C', coordinates: [[28.61, 77.23], [28.62, 77.22], [28.63, 77.21], [28.64, 77.20]] },
      { name: 'Route 2', startPoint: 'E', endPoint: 'H', intermediateStops: 'F, G', coordinates: [[28.65, 77.25], [28.66, 77.24], [28.67, 77.23], [28.68, 77.22]] },
    ]);
  
    const [overlaps, setOverlaps] = useState<Route[]>([]);
    const [isSelectingStart, setIsSelectingStart] = useState(false);
    const [isSelectingEnd, setIsSelectingEnd] = useState(false);
  
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setNewRoute(prev => ({ ...prev, [name]: value }));
    };
  
    const handlePointSelect = (point: [number, number]) => {
      const [lat, lng] = point;
      const coordString = `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
  
      if (isSelectingStart) {
        setNewRoute(prev => ({ ...prev, startPoint: coordString }));
        setIsSelectingStart(false);
      } else if (isSelectingEnd) {
        setNewRoute(prev => ({ ...prev, endPoint: coordString }));
        setIsSelectingEnd(false);
      }
    };
  
    const checkOverlap = () => {
      const newStops = [newRoute.startPoint, ...newRoute.intermediateStops.split(',').map(stop => stop.trim()), newRoute.endPoint];
      
      const overlappingRoutes = existingRoutes.filter(route => {
        const routeStops = [route.startPoint, ...route.intermediateStops.split(',').map(stop => stop.trim()), route.endPoint];
        return newStops.some(stop => routeStops.includes(stop));
      });
  
      setOverlaps(overlappingRoutes);
    };
  
    const mapRoutes: Route[] = [
      ...existingRoutes.map(route => ({ ...route, color: 'blue' })),
      ...overlaps.map(route => ({ ...route, color: 'red' }))
    ];
  
    return (
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Route Overlap Checker</h2>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">New Route Name</Label>
              <Input 
                id="name"
                name="name"
                value={newRoute.name}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="startPoint">Start Point</Label>
              <div className="flex space-x-2">
                <Input 
                  id="startPoint"
                  name="startPoint"
                  value={newRoute.startPoint}
                  onChange={handleInputChange}
                />
                <Button onClick={() => setIsSelectingStart(true)}>Select on Map</Button>
              </div>
            </div>
            
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="endPoint">End Point</Label>
              <div className="flex space-x-2">
                <Input 
                  id="endPoint"
                  name="endPoint"
                  value={newRoute.endPoint}
                  onChange={handleInputChange}
                />
                <Button onClick={() => setIsSelectingEnd(true)}>Select on Map</Button>
              </div>
            </div>
            
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="intermediateStops">Intermediate Stops (comma-separated)</Label>
              <Input 
                id="intermediateStops"
                name="intermediateStops"
                value={newRoute.intermediateStops}
                onChange={handleInputChange}
              />
            </div>
            
            <Button onClick={checkOverlap}><Search className="mr-2 h-4 w-4" /> Check for Overlaps</Button>
  
            {overlaps.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold mb-2">Overlapping Routes</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Route Name</TableHead>
                      <TableHead>Start Point</TableHead>
                      <TableHead>End Point</TableHead>
                      <TableHead>Intermediate Stops</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {overlaps.map((route, index) => (
                      <TableRow key={index}>
                        <TableCell>{route.name}</TableCell>
                        <TableCell>{route.startPoint}</TableCell>
                        <TableCell>{route.endPoint}</TableCell>
                        <TableCell>{route.intermediateStops}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
  
          <div>
            <Map 
              routes={mapRoutes}
              center={[28.61, 77.23]}
              zoom={11}
              onPointSelect={handlePointSelect}
            />
            {(isSelectingStart || isSelectingEnd) && (
              <p className="mt-2 text-blue-600">
                Click on the map to select the {isSelectingStart ? 'start' : 'end'} point.
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }