import React, { useState } from 'react';
import { Player, PositionFilter } from '../types';

interface RosterViewProps {
  players: Player[];
  onOpenAddPlayer: () => void;
  onSelectPlayer: (player: Player) => void;
}

export const RosterView: React.FC<RosterViewProps> = ({
  players,
  onOpenAddPlayer,
  onSelectPlayer
}) => {
  const [filter, setFilter] = useState<PositionFilter>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [displayCount, setDisplayCount] = useState(6);

  const filteredPlayers = players.filter((p) => {
    const matchesFilter = filter === 'ALL' || p.positionCategory === filter;
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.number.includes(searchQuery);
    return matchesFilter && matchesSearch;
  });

  const visiblePlayers = filteredPlayers.slice(0, displayCount);

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Screen Title Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="font-headline text-2xl md:text-3xl italic font-bold text-primary uppercase">
            Team Roster
          </h2>
          <p className="text-on-surface-variant text-sm font-body">
            2024 Championship Season • {players.length} Players Active
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={onOpenAddPlayer}
            className="bg-secondary text-on-secondary px-5 py-2.5 rounded-lg font-headline italic font-bold uppercase text-xs flex items-center gap-1.5 hover:opacity-90 transition-all active:scale-95 shadow-md"
          >
            <span className="material-symbols-outlined text-base">person_add</span>
            ADD PLAYER
          </button>
        </div>
      </div>

      {/* Filters & Search Bar */}
      <div className="space-y-3">
        <div className="flex items-center bg-surface-container-low border border-outline-variant rounded-xl px-3 py-2">
          <span className="material-symbols-outlined text-outline mr-2">search</span>
          <input
            type="text"
            placeholder="Search roster by player name, position, or jersey number..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent text-sm text-on-surface focus:outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-on-surface-variant hover:text-primary text-xs"
            >
              Clear
            </button>
          )}
        </div>

        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {(['ALL', 'SETTERS', 'HITTERS', 'LIBEROS'] as PositionFilter[]).map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-label font-bold transition-all whitespace-nowrap ${
                filter === cat
                  ? 'bg-primary text-on-primary shadow'
                  : 'bg-surface-container text-on-surface-variant hover:bg-outline-variant'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Roster Cards List */}
      <div className="space-y-3">
        {visiblePlayers.length === 0 ? (
          <div className="bg-surface-container-lowest p-8 rounded-xl border border-outline-variant text-center space-y-2">
            <span className="material-symbols-outlined text-4xl text-outline">search_off</span>
            <p className="font-headline italic text-lg font-bold text-primary">No Players Found</p>
            <p className="text-xs text-on-surface-variant">Try adjusting your search query or position category filter.</p>
          </div>
        ) : (
          visiblePlayers.map((player) => (
            <div
              key={player.id}
              onClick={() => onSelectPlayer(player)}
              className={`player-card-shadow bg-surface-container-lowest rounded-xl p-4 flex items-center gap-4 cursor-pointer relative overflow-hidden group hover:scale-[1.01] transition-all border border-outline-variant/60 ${
                player.active ? 'border-l-4 border-l-secondary-container' : ''
              }`}
            >
              <div className="relative">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-secondary-container p-0.5 overflow-hidden shadow">
                  <img
                    className="w-full h-full object-cover rounded-full"
                    alt={player.name}
                    src={player.avatarUrl}
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 bg-secondary-container text-on-secondary-container w-7 h-7 rounded-full flex items-center justify-center font-stats text-xs font-bold border-2 border-surface-container-lowest shadow">
                  {player.number}
                </div>
              </div>

              <div className="flex-grow grid grid-cols-1 md:grid-cols-3 gap-2">
                <div>
                  <h3 className="font-headline text-lg italic font-bold text-on-surface uppercase leading-tight group-hover:text-secondary transition-colors">
                    {player.name}
                  </h3>
                  <p className="text-secondary font-label text-xs uppercase tracking-widest font-bold">
                    {player.position}
                  </p>
                </div>

                <div className="flex flex-col justify-center">
                  <div className="flex items-center gap-2">
                    <span className="text-on-surface-variant font-label text-xs">Kill %</span>
                    <div className="flex-grow h-2 bg-surface-variant rounded-full overflow-hidden">
                      <div
                        className="h-full bg-secondary-container rounded-full"
                        style={{ width: `${player.killPercent}%` }}
                      />
                    </div>
                    <span className="font-stats text-xs font-bold text-on-surface">
                      {player.killPercent}%
                    </span>
                  </div>
                </div>

                <div className="hidden md:flex flex-col justify-center items-end">
                  <div className="text-right">
                    <p className="text-on-surface-variant text-[10px] uppercase font-bold tracking-tight">
                      {player.statLabel}
                    </p>
                    <p className="font-stats text-xl font-bold text-primary">
                      {player.statValue}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center text-outline group-hover:text-secondary group-hover:translate-x-1 transition-all">
                <span className="material-symbols-outlined">chevron_right</span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination / Load More */}
      {displayCount < filteredPlayers.length && (
        <div className="pt-4 flex justify-center">
          <button
            onClick={() => setDisplayCount((prev) => prev + 4)}
            className="text-primary font-label text-xs uppercase font-bold border-2 border-primary px-8 py-2.5 rounded-lg hover:bg-primary hover:text-on-primary transition-all active:scale-95 shadow"
          >
            Load More Players
          </button>
        </div>
      )}

      {/* Mobile Floating Action Button (+) */}
      <button
        onClick={onOpenAddPlayer}
        className="md:hidden fixed bottom-20 right-4 bg-secondary-container text-on-secondary-container w-14 h-14 rounded-full shadow-2xl flex items-center justify-center z-40 active:scale-90 transition-all border-2 border-white"
        title="Add Player"
      >
        <span className="material-symbols-outlined text-2xl">add</span>
      </button>
    </div>
  );
};
