'use client';

import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function DeleteCoach({ coachId }: { coachId: number }) {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/coaches?id=${coachId}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Failed to delete coach');
      router.refresh();
    } catch (error) {
      console.error('Error deleting coach:', error);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsConfirmOpen(true)}
        className="absolute top-2 right-2 p-2 text-gray-500 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <Trash2 className="h-5 w-5" />
      </button>

      {isConfirmOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl">
            <h3 className="text-lg font-semibold mb-4">Confirm Deletion</h3>
            <p className="mb-4">Are you sure you want to delete this coach?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsConfirmOpen(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  handleDelete();
                  setIsConfirmOpen(false);
                }}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}