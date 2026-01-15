import React, { useState, useEffect } from 'react';

type OutcomeType =
  | 'helped'
  | 'partial'
  | 'waitlisted'
  | 'no-response'
  | 'not-eligible'
  | 'denied'
  | 'scam'
  | 'other';

interface OutcomeCounts {
  helped: number;
  partial: number;
  waitlisted: number;
  'no-response': number;
  'not-eligible': number;
  denied: number;
  scam: number;
  other: number;
}

interface OutcomeButtonsProps {
  resourceId: string;
}

/**
 * Outcome feedback buttons for resource listings
 * Stores counts in localStorage and displays aggregate feedback
 * 
 * TODO: Replace localStorage with API calls to store outcomes in database
 * TODO: Implement admin moderation queue for reviewing outcomes
 */
export function OutcomeButtons({ resourceId }: OutcomeButtonsProps) {
  const [outcomes, setOutcomes] = useState<OutcomeCounts>({
    helped: 0,
    partial: 0,
    waitlisted: 0,
    'no-response': 0,
    'not-eligible': 0,
    denied: 0,
    scam: 0,
    other: 0,
  });
  const [userSelection, setUserSelection] = useState<OutcomeType | null>(null);
  const [showThankYou, setShowThankYou] = useState(false);

  // Load outcomes from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(`resource-outcomes-${resourceId}`);
    if (stored) {
      try {
        setOutcomes(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse outcomes from localStorage', e);
      }
    }

    const userOutcome = localStorage.getItem(`user-outcome-${resourceId}`);
    if (userOutcome) {
      setUserSelection(userOutcome as OutcomeType);
    }
  }, [resourceId]);

  const handleOutcomeClick = (outcome: OutcomeType) => {
    // Prevent multiple submissions from same user
    if (userSelection) {
      return;
    }

    const newOutcomes = { ...outcomes, [outcome]: outcomes[outcome] + 1 };
    setOutcomes(newOutcomes);
    setUserSelection(outcome);

    // Store in localStorage
    // TODO: Replace with API POST to /api/resources/{id}/outcomes
    localStorage.setItem(`resource-outcomes-${resourceId}`, JSON.stringify(newOutcomes));
    localStorage.setItem(`user-outcome-${resourceId}`, outcome);

    // Show thank you message
    setShowThankYou(true);
    setTimeout(() => setShowThankYou(false), 3000);
  };

  const totalOutcomes = Object.values(outcomes).reduce((sum, count) => sum + count, 0);

  const getConfidenceLevel = () => {
    if (totalOutcomes < 5) return 'Low';
    if (totalOutcomes < 15) return 'Medium';
    return 'High';
  };

  const outcomeOptions: { type: OutcomeType; label: string; emoji: string }[] = [
    { type: 'helped', label: 'Helped Me', emoji: '✅' },
    { type: 'partial', label: 'Partial Help', emoji: '↗️' },
    { type: 'waitlisted', label: 'Waitlisted', emoji: '⏳' },
    { type: 'no-response', label: 'No Response', emoji: '📭' },
    { type: 'not-eligible', label: 'Not Eligible', emoji: '🚫' },
    { type: 'denied', label: 'Denied', emoji: '❌' },
    { type: 'scam', label: 'Scam/Suspicious', emoji: '⚠️' },
    { type: 'other', label: 'Other', emoji: '💬' },
  ];

  return (
    <div className="bg-surface-muted border border-border-soft rounded-lg p-6">
      <h3 className="text-lg font-semibold text-ink mb-2">Community Feedback</h3>
      <p className="text-sm text-muted mb-4">
        Help others by sharing your experience with this resource. Your feedback is anonymous.
      </p>

      {showThankYou && (
        <div className="mb-4 p-3 bg-sand border border-forest rounded-lg text-forest text-sm">
          Thank you for your feedback! It helps the community.
        </div>
      )}

      {userSelection && (
        <div className="mb-4 p-3 bg-sand border border-ocean rounded-lg text-ocean text-sm">
          You previously reported: <strong>{outcomeOptions.find(o => o.type === userSelection)?.label}</strong>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
        {outcomeOptions.map((option) => (
          <button
            key={option.type}
            onClick={() => handleOutcomeClick(option.type)}
            disabled={!!userSelection}
            className={`flex flex-col items-center justify-center p-3 rounded-lg border transition-colors ${
              userSelection === option.type
                ? 'bg-sand border-ocean text-ocean'
                : userSelection
                ? 'bg-surface-muted border-border-soft text-muted cursor-not-allowed'
                : 'bg-surface border-border-soft hover:bg-sand hover:border-ocean text-ink cursor-pointer'
            }`}
          >
            <span className="text-2xl mb-1">{option.emoji}</span>
            <span className="text-xs font-medium text-center">{option.label}</span>
            {outcomes[option.type] > 0 && (
              <span className="text-xs text-muted mt-1">({outcomes[option.type]})</span>
            )}
          </button>
        ))}
      </div>

      {totalOutcomes > 0 && (
        <div className="text-sm text-muted border-t border-border-soft pt-3">
          <div className="flex items-center justify-between">
            <span>
              Total feedback: <strong>{totalOutcomes}</strong>
            </span>
            <span className={`font-medium ${
              getConfidenceLevel() === 'High' ? 'text-forest' :
              getConfidenceLevel() === 'Medium' ? 'text-muted' :
              'text-muted'
            }`}>
              Confidence: {getConfidenceLevel()}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
