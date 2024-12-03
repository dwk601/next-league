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

interface PlayerData {
  id: number;
  firstName: string;
  lastName: string;
  position: string | null;
  stats?: {
    goals: number;
    assists: number;
  } | null;
}

export default function EditPlayerModal({ player }: { player: PlayerData }) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: player.firstName,
    lastName: player.lastName,
    position: player.position || '',
    stats: {
      goals: player.stats?.goals || 0,
      assists: player.stats?.assists || 0,
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/players', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: player.id, ...formData }),
      });
      if (response.ok) {
        setOpen(false);
        window.location.reload();
      }
    } catch (error) {
      console.error('Error updating player:', error);
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
          <DialogTitle>Edit Player</DialogTitle>
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
            <Label htmlFor="position">Position</Label>
            <Input
              id="position"
              value={formData.position}
              onChange={(e) => setFormData({ ...formData, position: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="goals">Goals</Label>
            <Input
              id="goals"
              type="number"
              value={formData.stats.goals}
              onChange={(e) => setFormData({
                ...formData,
                stats: { ...formData.stats, goals: parseInt(e.target.value) }
              })}
            />
          </div>
          <div>
            <Label htmlFor="assists">Assists</Label>
            <Input
              id="assists"
              type="number"
              value={formData.stats.assists}
              onChange={(e) => setFormData({
                ...formData,
                stats: { ...formData.stats, assists: parseInt(e.target.value) }
              })}
            />
          </div>
          <Button type="submit">Save Changes</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}