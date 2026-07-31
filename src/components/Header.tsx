import React from 'react';
import { NavTab } from '../types';

interface HeaderProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  onNotificationClick: () => void;
  unreadCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onNotificationClick,
  unreadCount = 2
}) => {
  return (
    <header className="bg-surface sticky top-0 z-50 w-full shadow-sm flex justify-between items-center px-4 md:px-8 py-2">
      <div 
        className="flex items-center gap-2 cursor-pointer group"
        onClick={() => setActiveTab('dashboard')}
      >
        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-secondary shadow-sm transition-transform group-hover:scale-105">
          <img 
            className="w-full h-full object-cover" 
            alt="SpikePro logo"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuB33niJNILCQdW6f4xilZzv8T4UGB3puolv2kub9V9adkUJzu3Y1SNTOzdCEYKARpjcyyNEEqn8Ln2qSfPC_U_WfpLpOSXxu04Ul-5VKWT-bG59TTC98ov12TurmQfN408NwMQwBY4os6g3hFt0t62ru6dNlrJ8G19o_q66tsL6IuHioF6e17Y5Gj1DU7_LvupYPF3yjvRRcSU44CoYk5Op52cQ7qN3EWthDq9HqQIwHaOVHyZUs7KJ"
          />
        </div>
        <h1 className="font-headline text-2xl italic font-black text-secondary tracking-tight">
          SpikePro
        </h1>
      </div>

      <div className="flex items-center gap-4">
        {/* Desktop top nav quick tabs */}
        <nav className="hidden md:flex items-center gap-6">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`font-label text-xs uppercase tracking-wider transition-colors py-1 ${
              activeTab === 'dashboard' ? 'text-secondary font-bold border-b-2 border-secondary' : 'text-on-surface-variant hover:text-primary'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('roster')}
            className={`font-label text-xs uppercase tracking-wider transition-colors py-1 ${
              activeTab === 'roster' ? 'text-secondary font-bold border-b-2 border-secondary' : 'text-on-surface-variant hover:text-primary'
            }`}
          >
            Roster
          </button>
          <button
            onClick={() => setActiveTab('match')}
            className={`font-label text-xs uppercase tracking-wider transition-colors py-1 ${
              activeTab === 'match' ? 'text-secondary font-bold border-b-2 border-secondary' : 'text-on-surface-variant hover:text-primary'
            }`}
          >
            Match
          </button>
          <button
            onClick={() => setActiveTab('training')}
            className={`font-label text-xs uppercase tracking-wider transition-colors py-1 ${
              activeTab === 'training' ? 'text-secondary font-bold border-b-2 border-secondary' : 'text-on-surface-variant hover:text-primary'
            }`}
          >
            Training
          </button>
        </nav>

        <button 
          onClick={onNotificationClick}
          className="relative w-10 h-10 flex items-center justify-center text-primary hover:bg-surface-container rounded-full transition-all active:scale-95"
          title="Notifications"
        >
          <span className="material-symbols-outlined">notifications</span>
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-secondary rounded-full ring-2 ring-surface animate-pulse" />
          )}
        </button>
      </div>
    </header>
  );
};
