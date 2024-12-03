'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface CreateTeamModalProps {
  leagues: Array<{ id: number; name: string; }>;
}

export default function CreateTeamModal({ leagues }: CreateTeamModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const teamData = {
      name: formData.get('name'),
      leagueId: parseInt(formData.get('leagueId') as string),
      teamType: formData.get('teamType'),
    };

    try {
      const response = await fetch('/api/teams', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(teamData),
      });

      if (response.ok) {
        setIsOpen(false);
        router.refresh();
      } else {
        throw new Error('Failed to create team');
      }
    } catch (error) {
      console.error('Error creating team:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg"
      >
        Create Team
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Create New Team</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block mb-2">Team Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full p-2 border rounded"
                />
              </div>

              <div className="mb-4">
                <label className="block mb-2">League</label>
                <select
                  name="leagueId"
                  required
                  className="w-full p-2 border rounded"
                >
                  <option value="">Select League</option>
                  {leagues.map((league) => (
                    <option key={league.id} value={league.id}>
                      {league.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="block mb-2">Team Type</label>
                <select
                  name="teamType"
                  required
                  className="w-full p-2 border rounded"
                >
                  <option value="COLLEGE">College</option>
                  <option value="PROFESSIONAL">Professional</option>
                </select>
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 border rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded disabled:opacity-50"
                >
                  {isLoading ? 'Creating...' : 'Create Team'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
