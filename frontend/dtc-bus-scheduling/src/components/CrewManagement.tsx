import React, { useState } from 'react';
import { Button } from "././ui/button";
import { Input } from "././ui/input";
import { Label } from "././ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "././ui/table";
import { UserPlus, UserMinus, RefreshCcw } from 'lucide-react';

export default function CrewManagement() {
  const [crews, setCrews] = useState([
    { id: '001', name: 'John Doe', status: 'On Duty', currentBus: 'DTC-123' },
    { id: '002', name: 'Jane Smith', status: 'Off Duty', currentBus: '-' },
  ]);

  const [newCrew, setNewCrew] = useState({ id: '', name: '' });

  const addCrew = () => {
    if (newCrew.id && newCrew.name) {
      setCrews([...crews, { ...newCrew, status: 'Off Duty', currentBus: '-' }]);
      setNewCrew({ id: '', name: '' });
    }
  };

  const removeCrew = (id: string) => {
    setCrews(crews.filter(crew => crew.id !== id));
  };

  const toggleDutyStatus = (id: string) => {
    setCrews(crews.map(crew => 
      crew.id === id ? { ...crew, status: crew.status === 'On Duty' ? 'Off Duty' : 'On Duty' } : crew
    ));
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Crew Management</h2>
      
      <div className="mb-4 flex space-x-2">
        <Input 
          placeholder="Crew ID" 
          value={newCrew.id} 
          onChange={e => setNewCrew({...newCrew, id: e.target.value})}
        />
        <Input 
          placeholder="Crew Name" 
          value={newCrew.name} 
          onChange={e => setNewCrew({...newCrew, name: e.target.value})}
        />
        <Button onClick={addCrew}><UserPlus className="mr-2 h-4 w-4" /> Add Crew</Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Current Bus</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {crews.map((crew) => (
            <TableRow key={crew.id}>
              <TableCell>{crew.id}</TableCell>
              <TableCell>{crew.name}</TableCell>
              <TableCell>{crew.status}</TableCell>
              <TableCell>{crew.currentBus}</TableCell>
              <TableCell>
                <Button variant="ghost" onClick={() => toggleDutyStatus(crew.id)}>
                  <RefreshCcw className="h-4 w-4" />
                </Button>
                <Button variant="ghost" onClick={() => removeCrew(crew.id)}>
                  <UserMinus className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}