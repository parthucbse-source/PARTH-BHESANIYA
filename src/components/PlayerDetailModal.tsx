import React from 'react';
import { Player } from '../types';

interface PlayerDetailModalProps {
  player: Player | null;
  onClose: () => void;
  onToggleActiveStatus?: (playerId: string) => void;
}

export const PlayerDetailModal: React.FC<PlayerDetailModalProps> = ({
  player,
  onClose,
  onToggleActiveStatus
}) => {
  if (!player) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-surface-container-lowest w-full max-w-lg rounded-2xl shadow-2xl border border-outline-variant overflow-hidden">
        {/* Header Banner */}
        <div className="bg-primary text-on-primary p-6 relative overflow-hidden">
          <div className="absolute right-0 top-0 opacity-10 scale-150 rotate-12">
            <span className="material-symbols-outlined text-[140px]">sports_volleyball</span>
          </div>

          <div className="flex justify-between items-start relative z-10">
            <span className="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full text-xs font-label uppercase tracking-widest font-semibold">
              #{player.number} • {player.position}
            </span>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          <div className="flex items-center gap-4 mt-4 relative z-10">
            <div className="w-20 h-20 rounded-full border-4 border-secondary overflow-hidden shadow-lg bg-surface">
              <img
                src={player.avatarUrl}
                alt={player.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="font-headline text-2xl italic font-extrabold uppercase text-white leading-tight">
                {player.name}
              </h2>
              <p className="text-secondary-fixed-dim text-xs font-label uppercase tracking-wider mt-0.5">
                SpikePro Championship Roster
              </p>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-surface-container-low p-3 rounded-xl border border-outline-variant text-center">
              <p className="text-[10px] uppercase font-label font-bold text-on-surface-variant">Height</p>
              <p className="font-stats text-lg text-primary mt-1">{player.height || "6'2\""}</p>
            </div>
            <div className="bg-surface-container-low p-3 rounded-xl border border-outline-variant text-center">
              <p className="text-[10px] uppercase font-label font-bold text-on-surface-variant">Spike Reach</p>
              <p className="font-stats text-lg text-secondary mt-1">{player.spikeReach || "11'2\""}</p>
            </div>
            <div className="bg-surface-container-low p-3 rounded-xl border border-outline-variant text-center">
              <p className="text-[10px] uppercase font-label font-bold text-on-surface-variant">Block Reach</p>
              <p className="font-stats text-lg text-primary mt-1">{player.blockReach || "10'10\""}</p>
            </div>
          </div>

          {/* Performance Progress */}
          <div className="bg-surface-container-low p-4 rounded-xl border border-outline-variant space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs font-label font-bold text-on-surface-variant uppercase">Kill Efficiency</span>
              <span className="font-stats text-xl text-secondary">{player.killPercent}%</span>
            </div>
            <div className="w-full h-2.5 bg-surface-variant rounded-full overflow-hidden">
              <div
                className="h-full bg-secondary-container rounded-full transition-all duration-500"
                style={{ width: `${player.killPercent}%` }}
              />
            </div>
          </div>

          {/* Season Totals */}
          <div>
            <h4 className="font-headline text-sm italic font-bold text-primary uppercase mb-2">
              2024 Season Totals
            </h4>
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-surface-container-highest p-3 rounded-xl border-l-4 border-secondary">
                <span className="text-[10px] font-label font-bold uppercase text-on-surface-variant">Kills</span>
                <p className="font-display text-2xl text-primary mt-1">{player.seasonKills ?? 112}</p>
              </div>
              <div className="bg-surface-container-highest p-3 rounded-xl border-l-4 border-primary">
                <span className="text-[10px] font-label font-bold uppercase text-on-surface-variant">Aces</span>
                <p className="font-display text-2xl text-secondary mt-1">{player.seasonAces ?? 14}</p>
              </div>
              <div className="bg-surface-container-highest p-3 rounded-xl border-l-4 border-secondary">
                <span className="text-[10px] font-label font-bold uppercase text-on-surface-variant">Digs</span>
                <p className="font-display text-2xl text-primary mt-1">{player.seasonDigs ?? 42}</p>
              </div>
            </div>
          </div>

          {/* Active Lineup Toggle */}
          {onToggleActiveStatus && (
            <div className="flex justify-between items-center bg-surface-container p-3.5 rounded-xl border border-outline-variant">
              <div>
                <p className="text-xs font-bold text-on-surface uppercase">Starting Rotation Status</p>
                <p className="text-[11px] text-on-surface-variant">Mark as active starting player</p>
              </div>
              <button
                onClick={() => onToggleActiveStatus(player.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-label uppercase font-bold transition-all ${
                  player.active
                    ? 'bg-secondary text-on-secondary shadow-sm'
                    : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-variant'
                }`}
              >
                {player.active ? 'Active Lineup' : 'Bench'}
              </button>
            </div>
          )}
        </div>

        <div className="bg-surface-container p-4 flex justify-end border-t border-outline-variant">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-primary text-on-primary rounded-lg text-xs font-headline italic uppercase font-bold hover:opacity-90 transition-all"
          >
            Close Profile
          </button>
        </div>
      </div>
    </div>
  );
};
