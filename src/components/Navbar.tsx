import React from 'react';
import { NavTab } from '../types';

interface NavbarProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  return (
    <>
      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-2 pb-safe pt-2 bg-surface-container shadow-[0_-4px_12px_0_rgba(0,0,0,0.12)] rounded-t-xl md:hidden">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`flex flex-col items-center justify-center px-4 py-1.5 rounded-full transition-all duration-200 active:scale-90 ${
            activeTab === 'dashboard'
              ? 'bg-secondary-container text-on-secondary-container font-semibold'
              : 'text-on-surface-variant hover:bg-surface-variant'
          }`}
        >
          <span className="material-symbols-outlined">dashboard</span>
          <span className="font-label text-[11px] mt-0.5">Dashboard</span>
        </button>

        <button
          onClick={() => setActiveTab('roster')}
          className={`flex flex-col items-center justify-center px-4 py-1.5 rounded-full transition-all duration-200 active:scale-90 ${
            activeTab === 'roster'
              ? 'bg-secondary-container text-on-secondary-container font-semibold'
              : 'text-on-surface-variant hover:bg-surface-variant'
          }`}
        >
          <span className="material-symbols-outlined">groups</span>
          <span className="font-label text-[11px] mt-0.5">Roster</span>
        </button>

        <button
          onClick={() => setActiveTab('match')}
          className={`flex flex-col items-center justify-center px-4 py-1.5 rounded-full transition-all duration-200 active:scale-90 ${
            activeTab === 'match'
              ? 'bg-secondary-container text-on-secondary-container font-semibold'
              : 'text-on-surface-variant hover:bg-surface-variant'
          }`}
        >
          <span className="material-symbols-outlined">sports_volleyball</span>
          <span className="font-label text-[11px] mt-0.5">Match</span>
        </button>

        <button
          onClick={() => setActiveTab('training')}
          className={`flex flex-col items-center justify-center px-4 py-1.5 rounded-full transition-all duration-200 active:scale-90 ${
            activeTab === 'training'
              ? 'bg-secondary-container text-on-secondary-container font-semibold'
              : 'text-on-surface-variant hover:bg-surface-variant'
          }`}
        >
          <span className="material-symbols-outlined">fitness_center</span>
          <span className="font-label text-[11px] mt-0.5">Training</span>
        </button>
      </nav>

      {/* Desktop Left Side Navigation Bar */}
      <div className="hidden md:flex fixed left-0 top-[56px] h-[calc(100vh-56px)] w-20 bg-surface-container flex-col items-center py-6 gap-6 border-r border-outline-variant z-40">
        <button
          onClick={() => setActiveTab('dashboard')}
          title="Dashboard"
          className={`p-3 rounded-xl transition-all ${
            activeTab === 'dashboard'
              ? 'bg-secondary-container text-on-secondary-container shadow-md scale-105'
              : 'text-on-surface-variant hover:text-primary hover:bg-surface-variant'
          }`}
        >
          <span className="material-symbols-outlined text-[28px]">dashboard</span>
        </button>

        <button
          onClick={() => setActiveTab('roster')}
          title="Team Roster"
          className={`p-3 rounded-xl transition-all ${
            activeTab === 'roster'
              ? 'bg-secondary-container text-on-secondary-container shadow-md scale-105'
              : 'text-on-surface-variant hover:text-primary hover:bg-surface-variant'
          }`}
        >
          <span className="material-symbols-outlined text-[28px]">groups</span>
        </button>

        <button
          onClick={() => setActiveTab('match')}
          title="Match Center"
          className={`p-3 rounded-xl transition-all ${
            activeTab === 'match'
              ? 'bg-secondary-container text-on-secondary-container shadow-md scale-105'
              : 'text-on-surface-variant hover:text-primary hover:bg-surface-variant'
          }`}
        >
          <span className="material-symbols-outlined text-[28px]">sports_volleyball</span>
        </button>

        <button
          onClick={() => setActiveTab('training')}
          title="Training Hub"
          className={`p-3 rounded-xl transition-all ${
            activeTab === 'training'
              ? 'bg-secondary-container text-on-secondary-container shadow-md scale-105'
              : 'text-on-surface-variant hover:text-primary hover:bg-surface-variant'
          }`}
        >
          <span className="material-symbols-outlined text-[28px]">fitness_center</span>
        </button>
      </div>
    </>
  );
};
