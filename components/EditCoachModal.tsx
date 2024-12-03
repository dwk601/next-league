"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pencil } from "lucide-react";
import { useState } from "react";

interface CoachData {
  id: number;
  firstName: string;
  lastName: string;
  stats?: {
    wins: number;
    losses: number;
    draws: number;
  } | null;
}

export default function EditCoachModal({ coach }: { coach: CoachData }) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: coach.firstName,
    lastName: coach.lastName,
    stats: {
      wins: coach.stats?.wins || 0,
      losses: coach.stats?.losses || 0,
      draws: coach.stats?.draws || 0,
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/coaches', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: coach.id, ...formData }),
      });
      if (response.ok) {
        setOpen(false);
        window.location.reload();
      }
    } catch (error) {
      console.error('Error updating coach:', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="absolute top-2 right-8 opacity-0 group-hover:opacity-100">
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Coach</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="wins">Wins</Label>
            <Input
              id="wins"
              type="number"
              value={formData.stats.wins}
              onChange={(e) => setFormData({
                ...formData,
                stats: { ...formData.stats, wins: parseInt(e.target.value) }
              })}
            />
          </div>
          <div>
            <Label htmlFor="losses">Losses</Label>
            <Input
              id="losses"
              type="number"
              value={formData.stats.losses}
              onChange={(e) => setFormData({
                ...formData,
                stats: { ...formData.stats, losses: parseInt(e.target.value) }
              })}
            />
          </div>
          <div>
            <Label htmlFor="draws">Draws</Label>
            <Input
              id="draws"
              type="number"
              value={formData.stats.draws}
              onChange={(e) => setFormData({
                ...formData,
                stats: { ...formData.stats, draws: parseInt(e.target.value) }
              })}
            />
          </div>
          <Button type="submit">Save Changes</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}