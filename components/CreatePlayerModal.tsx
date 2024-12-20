'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const POSITIONS = ['Goalkeeper', 'Defender', 'Midfielder', 'Forward'];

type Team = {
  id: number;
  name: string;
};

type CreatePlayerModalProps = {
  teams: Team[];
  buttonType: 'create' | 'delete';
};

export default function CreatePlayerModal({ teams, buttonType }: CreatePlayerModalProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    teamId: '',
    position: '',
    dateOfBirth: '',
    nationality: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch('/api/players', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          teamId: parseInt(formData.teamId),
          dateOfBirth: formData.dateOfBirth ? new Date(formData.dateOfBirth).toISOString() : null,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create player');
      }

      setOpen(false);
      window.location.reload(); // Add this line to refresh the page
      
    } catch (error) {
      console.error('Error creating player:', error);
      // You might want to add an error notification here
      
    } finally {
      setLoading(false);
    }
  };

  const buttonVariant = buttonType === 'create' ? 'default' : 'destructive';

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={buttonVariant}>
          {buttonType === 'create' ? 'Add Player' : 'Delete Player'}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {buttonType === 'create' ? 'Add New Player' : 'Delete Player'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {buttonType === 'create' ? (
            <>
              <Input
                placeholder="First Name"
                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
              />
              <Input
                placeholder="Last Name"
                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
              />
              <Select onValueChange={(value) => setFormData({...formData, teamId: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Team" />
                </SelectTrigger>
                <SelectContent>
                  {teams.map((team) => (
                    <SelectItem key={team.id} value={team.id.toString()}>
                      {team.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select onValueChange={(value) => setFormData({...formData, position: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Position" />
                </SelectTrigger>
                <SelectContent>
                  {POSITIONS.map((position) => (
                    <SelectItem key={position} value={position}>
                      {position}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                type="date"
                placeholder="Date of Birth"
                onChange={(e) => setFormData({...formData, dateOfBirth: e.target.value})}
              />
              <Input
                placeholder="Nationality"
                onChange={(e) => setFormData({...formData, nationality: e.target.value})}
              />
            </>
          ) : (
            <Select onValueChange={(value) => setFormData({...formData, teamId: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Select Player to Delete" />
              </SelectTrigger>
              <SelectContent>
                {/* Add player list here */}
              </SelectContent>
            </Select>
          )}

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              variant={buttonVariant}
              disabled={loading}
            >
              {loading ? 'Creating...' : buttonType === 'create' ? 'Add Player' : 'Delete Player'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
