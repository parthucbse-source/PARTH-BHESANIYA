import React, { useState } from 'react';
import { TrainingSession } from '../types';

interface AddSessionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddSession: (session: TrainingSession) => void;
}

export const AddSessionModal: React.FC<AddSessionModalProps> = ({
  isOpen,
  onClose,
  onAddSession
}) => {
  const [sessionName, setSessionName] = useState('');
  const [focus, setFocus] = useState('Blocking');
  const [intensity, setIntensity] = useState<TrainingSession['intensity']>('High');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sessionName.trim()) return;

    const newSession: TrainingSession = {
      id: 's_' + Date.now(),
      session: sessionName.trim(),
      focus,
      intensity,
      date: 'Just Now'
    };

    onAddSession(newSession);
    setSessionName('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-surface-container-lowest w-full max-w-md rounded-2xl shadow-2xl border border-outline-variant p-6 space-y-4">
        <div className="flex justify-between items-center border-b border-surface-variant pb-3">
          <h3 className="font-headline text-xl italic font-bold text-primary flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary">fitness_center</span>
            LOG TRAINING SESSION
          </h3>
          <button
            onClick={onClose}
            className="text-on-surface-variant hover:text-error transition-colors p-1 rounded-full"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-label uppercase text-on-surface-variant mb-1 font-semibold">
              Session Title *
            </label>
            <input
              type="text"
              required
              value={sessionName}
              onChange={(e) => setSessionName(e.target.value)}
              placeholder="e.g. Afternoon Jump Serve Lab"
              className="w-full px-3 py-2 bg-surface-container-low border border-outline-variant rounded-lg text-sm text-on-surface focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-label uppercase text-on-surface-variant mb-1 font-semibold">
                Primary Focus
              </label>
              <select
                value={focus}
                onChange={(e) => setFocus(e.target.value)}
                className="w-full px-3 py-2 bg-surface-container-low border border-outline-variant rounded-lg text-sm text-on-surface focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary"
              >
                <option value="Blocking">Blocking</option>
                <option value="Precision">Precision</option>
                <option value="Stamina">Stamina</option>
                <option value="Agility">Agility</option>
                <option value="Setting">Setting</option>
                <option value="Spiking">Spiking</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-label uppercase text-on-surface-variant mb-1 font-semibold">
                Intensity Level
              </label>
              <select
                value={intensity}
                onChange={(e) => setIntensity(e.target.value as TrainingSession['intensity'])}
                className="w-full px-3 py-2 bg-surface-container-low border border-outline-variant rounded-lg text-sm text-on-surface focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary font-stats"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Extreme">Extreme</option>
              </select>
            </div>
          </div>

          <div className="pt-3 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-outline-variant text-on-surface-variant rounded-lg text-xs uppercase font-label hover:bg-surface-container transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-secondary text-on-secondary rounded-lg text-xs italic font-headline font-bold uppercase hover:opacity-90 transition-all active:scale-95 shadow-md"
            >
              Save Session
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
