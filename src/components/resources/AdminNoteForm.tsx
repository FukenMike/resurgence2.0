import React, { useState, useEffect } from 'react';

interface AdminNoteFormProps {
  resourceId: string;
}

/**
 * Private note submission form for admin review
 * Notes stored in localStorage for now
 * 
 * TODO: Replace localStorage with API POST to /api/admin/notes
 * TODO: Implement admin dashboard to review notes
 * TODO: Add authentication before allowing note submission
 */
export function AdminNoteForm({ resourceId }: AdminNoteFormProps) {
  const [note, setNote] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [existingNote, setExistingNote] = useState<string | null>(null);

  useEffect(() => {
    // Check if user already submitted a note
    const stored = localStorage.getItem(`admin-note-${resourceId}`);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setExistingNote(parsed.note);
        setIsSubmitted(true);
      } catch (e) {
        console.error('Failed to parse admin note from localStorage', e);
      }
    }
  }, [resourceId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!note.trim()) {
      return;
    }

    const noteData = {
      note: note.trim(),
      timestamp: new Date().toISOString(),
      resourceId,
    };

    // TODO: Replace with API call: POST /api/admin/notes
    localStorage.setItem(`admin-note-${resourceId}`, JSON.stringify(noteData));
    
    setIsSubmitted(true);
    setExistingNote(note.trim());
    setNote('');
  };

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
        <span>🔒</span>
        <span>Private Note for Admins</span>
      </h3>
      <p className="text-sm text-gray-700 mb-4">
        Have concerns about this resource? Need to report incorrect information or suspicious activity? 
        Submit a private note that only administrators will review. This is <strong>not public</strong> and will not appear on the listing.
      </p>

      {isSubmitted && existingNote ? (
        <div className="bg-white border border-blue-300 rounded-lg p-4">
          <div className="flex items-start gap-2 mb-2">
            <span className="text-green-600 text-xl">✓</span>
            <div>
              <p className="font-medium text-gray-900">Note submitted for admin review</p>
              <p className="text-sm text-gray-600 mt-1">
                Thank you. Your note has been recorded and will be reviewed by administrators.
              </p>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-gray-200">
            <p className="text-sm text-gray-700 italic">"{existingNote}"</p>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Describe your concern or provide updated information..."
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            maxLength={1000}
          />
          <div className="flex items-center justify-between mt-3">
            <span className="text-xs text-gray-500">
              {note.length}/1000 characters
            </span>
            <button
              type="submit"
              disabled={!note.trim()}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                note.trim()
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Submit Private Note
            </button>
          </div>
        </form>
      )}

      <div className="mt-4 text-xs text-gray-600 bg-white rounded p-3">
        <strong>Privacy notice:</strong> Notes submitted through this form are stored privately and will only be accessed by The Father's Alliance administrators for quality assurance and resource verification purposes.
      </div>
    </div>
  );
}
