import React, { useState, useEffect } from 'react';
import { TrainingDrill } from '../types';

interface WorkoutRunnerModalProps {
  drill: TrainingDrill | null;
  onClose: () => void;
  onCompleteDrill: (drillId: string) => void;
}

export const WorkoutRunnerModal: React.FC<WorkoutRunnerModalProps> = ({
  drill,
  onClose,
  onCompleteDrill
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(60);
  const [isActive, setIsActive] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<boolean[]>([]);

  useEffect(() => {
    if (drill) {
      const instructions = drill.instructions || [
        'Perform 3 sets of 10 explosive jump reps.',
        'Rest 45 seconds between sets with deep diaphragmatic breathing.',
        'Log your peak height or target hits in the dashboard.'
      ];
      setCompletedSteps(new Array(instructions.length).fill(false));
      setCurrentStepIndex(0);
      setSecondsLeft(60);
      setIsActive(false);
    }
  }, [drill]);

  useEffect(() => {
    let interval: any = null;
    if (isActive && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0) {
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, secondsLeft]);

  if (!drill) return null;

  const instructions = drill.instructions || [
    'Perform 3 sets of 10 explosive jump reps.',
    'Rest 45 seconds between sets with deep diaphragmatic breathing.',
    'Log your peak height or target hits in the dashboard.'
  ];

  const toggleTimer = () => setIsActive(!isActive);

  const resetTimer = () => {
    setIsActive(false);
    setSecondsLeft(60);
  };

  const handleStepCheck = (index: number) => {
    const updated = [...completedSteps];
    updated[index] = !updated[index];
    setCompletedSteps(updated);
  };

  const isAllDone = completedSteps.length > 0 && completedSteps.every(Boolean);

  const handleFinishWorkout = () => {
    onCompleteDrill(drill.id);
    onClose();
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in">
      <div className="bg-surface-container-lowest w-full max-w-lg rounded-2xl shadow-2xl border border-outline-variant overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header Banner */}
        <div className="relative h-44 bg-primary text-on-primary p-6 flex flex-col justify-end overflow-hidden">
          <img
            src={drill.imageUrl}
            alt={drill.title}
            className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay"
          />
          <div className="absolute top-4 right-4 z-10 flex gap-2">
            <span className="bg-secondary-container text-on-secondary-container px-2.5 py-1 rounded-full text-xs font-label uppercase font-bold shadow">
              {drill.level} • {drill.category}
            </span>
            <button
              onClick={onClose}
              className="bg-black/40 hover:bg-black/60 text-white p-1 rounded-full transition-colors"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          <div className="relative z-10">
            <h2 className="font-headline text-2xl md:text-3xl italic font-black uppercase text-white leading-none">
              {drill.title}
            </h2>
            <p className="text-white/80 text-xs font-body mt-1">
              {drill.description}
            </p>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          {/* Interactive Timer Box */}
          <div className="bg-primary text-on-primary p-4 rounded-xl border border-primary-container flex items-center justify-between shadow-md">
            <div>
              <p className="text-[10px] font-label font-bold uppercase tracking-widest text-primary-fixed-dim">
                Interval Timer
              </p>
              <p className="font-stats text-3xl font-extrabold text-white mt-0.5">
                {formatTime(secondsLeft)}
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={toggleTimer}
                className={`px-4 py-2 rounded-lg font-headline italic font-bold text-xs uppercase flex items-center gap-1 transition-all active:scale-95 ${
                  isActive
                    ? 'bg-error text-on-error'
                    : 'bg-secondary text-on-secondary shadow'
                }`}
              >
                <span className="material-symbols-outlined text-sm">
                  {isActive ? 'pause' : 'play_arrow'}
                </span>
                {isActive ? 'Pause' : 'Start'}
              </button>
              <button
                onClick={resetTimer}
                className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
                title="Reset timer"
              >
                <span className="material-symbols-outlined text-sm">refresh</span>
              </button>
            </div>
          </div>

          {/* Drill Steps Checklist */}
          <div>
            <h4 className="font-headline text-sm italic font-bold text-primary uppercase mb-3 flex items-center justify-between">
              <span>Drill Sequence Steps</span>
              <span className="text-xs text-on-surface-variant font-label font-normal">
                {completedSteps.filter(Boolean).length} / {instructions.length} completed
              </span>
            </h4>

            <div className="space-y-2.5">
              {instructions.map((step, idx) => {
                const isChecked = completedSteps[idx];
                return (
                  <div
                    key={idx}
                    onClick={() => handleStepCheck(idx)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                      isChecked
                        ? 'bg-surface-container border-secondary-container text-on-surface line-through opacity-80'
                        : 'bg-surface-container-low border-outline-variant hover:border-secondary text-on-surface'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-md mt-0.5 flex items-center justify-center transition-colors border ${
                        isChecked
                          ? 'bg-secondary border-secondary text-white'
                          : 'border-outline text-transparent bg-white'
                      }`}
                    >
                      <span className="material-symbols-outlined text-sm">check</span>
                    </div>
                    <p className="text-xs font-body leading-relaxed flex-1">
                      <span className="font-bold mr-1">Step {idx + 1}:</span> {step}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="bg-surface-container p-4 border-t border-outline-variant flex justify-between items-center">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-label uppercase text-on-surface-variant hover:text-on-surface"
          >
            Cancel
          </button>

          <button
            onClick={handleFinishWorkout}
            className={`px-6 py-2.5 rounded-lg text-xs font-headline italic uppercase font-bold flex items-center gap-2 transition-all active:scale-95 shadow-md ${
              isAllDone
                ? 'bg-secondary text-on-secondary animate-pulse'
                : 'bg-primary text-on-primary hover:opacity-90'
            }`}
          >
            <span className="material-symbols-outlined text-sm">check_circle</span>
            {isAllDone ? 'Complete Drill Session!' : 'Mark Session Complete'}
          </button>
        </div>
      </div>
    </div>
  );
};
