// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Map from '../components/Map';
// import CreateRouteForm from '../components/CreateRouteFrom';

// interface Route {
//   id: string;
//   name: string;
//   path: string;
// }

// const Dashboard: React.FC = () => {
//     const [routes, setRoutes] = useState<Route[]>([]);
  
//     const handleCreateRoute = async (route: { id: string; name: string; path: string }) => {
//       // Update state with new route
//       setRoutes((prevRoutes) => [...prevRoutes, route]);
  
//       // Optionally, send the new route to the backend
//       try {
//         await fetch('/api/routes', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify(route),
//         });
//       } catch (error) {
//         console.error('Error sending route to backend:', error);
//       }
//     };
  
//     return (
//       <div className="dashboard">
//         <h1>Dashboard</h1>
//         <CreateRouteForm onCreateRoute={handleCreateRoute} />
//         <Map routes={routes} />
//       </div>
//     );
//   };
  
//   export default Dashboard;
import { useState } from 'react'
import { Button } from "././ui/button"
import { Input } from "././ui/input"
import { Label } from "././ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "././ui/tabs"
import { MapPin, Calendar, Users, Route } from 'lucide-react'

export default function Component() {
  const [activeTab, setActiveTab] = useState('map')

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-gray-800">DTC Bus System</h1>
        </div>
        <nav className="mt-6">
          <Button
            variant={activeTab === 'map' ? 'default' : 'ghost'}
            className="w-full justify-start"
            onClick={() => setActiveTab('map')}
          >
            <MapPin className="mr-2 h-4 w-4" />
            Map View
          </Button>
          <Button
            variant={activeTab === 'linked' ? 'default' : 'ghost'}
            className="w-full justify-start"
            onClick={() => setActiveTab('linked')}
          >
            <Calendar className="mr-2 h-4 w-4" />
            Linked Duty Scheduling
          </Button>
          <Button
            variant={activeTab === 'unlinked' ? 'default' : 'ghost'}
            className="w-full justify-start"
            onClick={() => setActiveTab('unlinked')}
          >
            <Users className="mr-2 h-4 w-4" />
            Unlinked Duty Scheduling
          </Button>
          <Button
            variant={activeTab === 'routes' ? 'default' : 'ghost'}
            className="w-full justify-start"
            onClick={() => setActiveTab('routes')}
          >
            <Route className="mr-2 h-4 w-4" />
            Route Management
          </Button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {activeTab === 'map' && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Map View</h2>
            <div className="bg-gray-300 h-[600px] rounded-lg flex items-center justify-center">
              <p className="text-gray-600">Map view would be integrated here</p>
            </div>
          </div>
        )}

        {activeTab === 'linked' && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Linked Duty Scheduling</h2>
            <Tabs defaultValue="assign" className="w-full">
              <TabsList>
                <TabsTrigger value="assign">Assign Crew</TabsTrigger>
                <TabsTrigger value="monitor">Monitor Assignments</TabsTrigger>
              </TabsList>
              <TabsContent value="assign">
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="bus" className="text-right">
                      Bus Number
                    </Label>
                    <Input id="bus" value="" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="crew" className="text-right">
                      Crew ID
                    </Label>
                    <Input id="crew" value="" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="shift" className="text-right">
                      Shift Time
                    </Label>
                    <Input id="shift" value="" className="col-span-3" />
                  </div>
                </div>
                <Button>Assign Crew</Button>
              </TabsContent>
              <TabsContent value="monitor">
                <div className="rounded-md border">
                  <div className="px-4 py-2 bg-gray-100 font-medium">Current Assignments</div>
                  <div className="p-4">
                    <p>Assignment monitoring interface would be displayed here</p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}

        {activeTab === 'unlinked' && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Unlinked Duty Scheduling</h2>
            <Tabs defaultValue="handover" className="w-full">
              <TabsList>
                <TabsTrigger value="handover">Bus Handover</TabsTrigger>
                <TabsTrigger value="rest">Manage Rest Periods</TabsTrigger>
              </TabsList>
              <TabsContent value="handover">
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="currentCrew" className="text-right">
                      Current Crew ID
                    </Label>
                    <Input id="currentCrew" value="" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="newCrew" className="text-right">
                      New Crew ID
                    </Label>
                    <Input id="newCrew" value="" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="busNumber" className="text-right">
                      Bus Number
                    </Label>
                    <Input id="busNumber" value="" className="col-span-3" />
                  </div>
                </div>
                <Button>Handover Bus</Button>
              </TabsContent>
              <TabsContent value="rest">
                <div className="rounded-md border">
                  <div className="px-4 py-2 bg-gray-100 font-medium">Crew Rest Periods</div>
                  <div className="p-4">
                    <p>Interface for managing crew rest periods would be displayed here</p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}

        {activeTab === 'routes' && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Route Management</h2>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-2">Existing Routes</h3>
                <div className="bg-white p-4 rounded-md shadow">
                  <p>List of existing routes would be displayed here</p>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">New Route</h3>
                <div className="bg-white p-4 rounded-md shadow">
                  <div className="grid gap-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="routeName" className="text-right">
                        Route Name
                      </Label>
                      <Input id="routeName" value="" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="startPoint" className="text-right">
                        Start Point
                      </Label>
                      <Input id="startPoint" value="" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="endPoint" className="text-right">
                        End Point
                      </Label>
                      <Input id="endPoint" value="" className="col-span-3" />
                    </div>
                  </div>
                  <Button className="mt-4">Add New Route</Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}