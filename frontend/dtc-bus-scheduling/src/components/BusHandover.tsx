import React, { useState } from 'react';
import { Button } from "././ui/button";
import { Input } from "././ui/input";
import { Label } from "././ui/label";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "././ui/alert-dialog";
import { RotateCw } from 'lucide-react';

export default function BusHandover() {
  const [handoverDetails, setHandoverDetails] = useState({
    currentCrewId: '',
    newCrewId: '',
    busNumber: '',
    handoverNotes: ''
  });

  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setHandoverDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleHandover = () => {
    // Logic to handle the bus handover process
    console.log('Handover details:', handoverDetails);
    // Reset form after handover
    setHandoverDetails({
      currentCrewId: '',
      newCrewId: '',
      busNumber: '',
      handoverNotes: ''
    });
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Bus Handover</h2>
      
      <div className="space-y-4">
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="currentCrewId">Current Crew ID</Label>
          <Input 
            id="currentCrewId"
            name="currentCrewId"
            value={handoverDetails.currentCrewId}
            onChange={handleInputChange}
          />
        </div>
        
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="newCrewId">New Crew ID</Label>
          <Input 
            id="newCrewId"
            name="newCrewId"
            value={handoverDetails.newCrewId}
            onChange={handleInputChange}
          />
        </div>
        
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="busNumber">Bus Number</Label>
          <Input 
            id="busNumber"
            name="busNumber"
            value={handoverDetails.busNumber}
            onChange={handleInputChange}
          />
        </div>
        
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="handoverNotes">Handover Notes</Label>
          <Input 
            id="handoverNotes"
            name="handoverNotes"
            value={handoverDetails.handoverNotes}
            onChange={handleInputChange}
          />
        </div>
        
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button><RotateCw className="mr-2 h-4 w-4" /> Initiate Handover</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirm Bus Handover</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to handover bus {handoverDetails.busNumber} from crew {handoverDetails.currentCrewId} to crew {handoverDetails.newCrewId}?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleHandover}>Confirm Handover</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}