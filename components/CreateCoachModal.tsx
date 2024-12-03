
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

type CreateCoachModalProps = {
  teamId: number;
  teamName: string;
};

export default function CreateCoachModal({ teamId, teamName }: CreateCoachModalProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    nationality: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch('/api/coaches', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          teamId,
          dateOfBirth: formData.dateOfBirth ? new Date(formData.dateOfBirth).toISOString() : null,
          stats: { wins: 0, losses: 0, draws: 0 }
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create coach');
      }

      setOpen(false);
      window.location.reload(); // Refresh to show new coach
      
    } catch (error) {
      console.error('Error creating coach:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Coach</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Coach for {teamName}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="First Name"
            onChange={(e) => setFormData({...formData, firstName: e.target.value})}
            required
          />
          <Input
            placeholder="Last Name"
            onChange={(e) => setFormData({...formData, lastName: e.target.value})}
            required
          />
          <Input
            type="date"
            placeholder="Date of Birth"
            onChange={(e) => setFormData({...formData, dateOfBirth: e.target.value})}
          />
          <Input
            placeholder="Nationality"
            onChange={(e) => setFormData({...formData, nationality: e.target.value})}
          />

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Add Coach'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}