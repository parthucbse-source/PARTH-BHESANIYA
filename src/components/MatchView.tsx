import React, { useState } from 'react';
import { MatchScore, CourtPlayer, Player } from '../types';

interface MatchViewProps {
  score: MatchScore;
  courtPlayers: CourtPlayer[];
  benchPlayers: Player[];
  onLogAction: (actionName: string) => void;
  onRotateCourt: () => void;
  onSubstitutePlayer: (courtPos: number, newPlayer: Player) => void;
}

export const MatchView: React.FC<MatchViewProps> = ({
  score,
  courtPlayers,
  benchPlayers,
  onLogAction,
  onRotateCourt,
  onSubstitutePlayer
}) => {
  const [showSubModal, setShowSubModal] = useState(false);
  const [selectedPosToSub, setSelectedPosToSub] = useState<number | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(`Logged: ${msg}`);
    setTimeout(() => setToastMessage(null), 1800);
  };

  const handleActionClick = (actionName: string) => {
    onLogAction(actionName);
    triggerToast(actionName);
  };

  const handleSubSubmit = (newPlayer: Player) => {
    if (selectedPosToSub !== null) {
      onSubstitutePlayer(selectedPosToSub, newPlayer);
      triggerToast(`Subbed in #${newPlayer.number} ${newPlayer.name}`);
      setShowSubModal(false);
      setSelectedPosToSub(null);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in relative pb-16">
      {/* Toast Notification Container */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[70] pointer-events-none">
          <div className="bg-primary text-white px-5 py-2.5 rounded-full shadow-2xl font-headline italic font-bold text-xs uppercase tracking-wider animate-bounce border border-secondary">
            {toastMessage}
          </div>
        </div>
      )}

      {/* Live Score Board Banner */}
      <section className="bg-primary text-on-primary rounded-xl p-4 md:p-6 relative overflow-hidden shadow-xl border-t-4 border-secondary">
        <div className="absolute top-3 right-3 z-10">
          <span className="flex items-center gap-1.5 text-xs font-label uppercase font-bold bg-error text-white px-2.5 py-0.5 rounded-full animate-pulse shadow">
            <span className="w-2 h-2 rounded-full bg-white"></span> LIVE
          </span>
        </div>

        <div className="flex justify-between items-center py-2">
          {/* Home Team */}
          <div className="flex flex-col items-center flex-1">
            <div className="w-16 h-16 bg-white/10 rounded-full mb-1 border-2 border-white/20 flex items-center justify-center overflow-hidden p-2">
              <img className="w-full h-full object-contain" alt="Titans" src={score.homeLogo} />
            </div>
            <span className="font-headline text-xs md:text-sm uppercase tracking-tight text-white/80 font-bold">
              {score.homeTeam}
            </span>
            <span className="font-display text-4xl md:text-5xl font-extrabold text-white mt-1">
              {score.homeScore}
            </span>
          </div>

          {/* Set Scores Tracker */}
          <div className="flex flex-col items-center px-4">
            <span className="text-[10px] font-label font-bold text-white/60 uppercase mb-1">
              Set {score.setNumber}
            </span>
            <div className="flex gap-1.5 my-1">
              <span className="w-3 h-3 rounded-full bg-secondary"></span>
              <span className="w-3 h-3 rounded-full bg-secondary"></span>
              <span className="w-3 h-3 rounded-full bg-white/20"></span>
            </div>
            <span className="text-[10px] text-primary-fixed font-label font-bold mt-1">
              Sets: 2 - 1
            </span>
          </div>

          {/* Away Team */}
          <div className="flex flex-col items-center flex-1">
            <div className="w-16 h-16 bg-white/10 rounded-full mb-1 border-2 border-white/20 flex items-center justify-center overflow-hidden p-2">
              <img className="w-full h-full object-contain" alt="Vipers" src={score.awayLogo} />
            </div>
            <span className="font-headline text-xs md:text-sm uppercase tracking-tight text-white/80 font-bold">
              {score.awayTeam}
            </span>
            <span className="font-display text-4xl md:text-5xl font-extrabold text-white mt-1">
              {score.awayScore}
            </span>
          </div>
        </div>

        <div className="mt-3 pt-2 border-t border-white/10 flex justify-between text-xs font-label italic text-white/70 font-semibold">
          <span>Last Action: {score.lastAction}</span>
          <span>Time: {score.matchTime}</span>
        </div>
      </section>

      {/* Court Diagram & Rotation */}
      <section>
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-headline text-lg italic font-bold text-on-surface flex items-center gap-1.5">
            <span className="material-symbols-outlined text-secondary">grid_view</span>
            Court Rotation
          </h2>

          <div className="flex items-center gap-2">
            <span className="text-xs font-label bg-surface-container px-3 py-1 rounded-full text-on-surface-variant font-semibold">
              Titans Serving
            </span>
            <button
              onClick={onRotateCourt}
              className="bg-primary text-on-primary px-3 py-1 rounded-full text-xs font-headline italic font-bold hover:bg-primary/90 transition-all flex items-center gap-1 active:scale-95 shadow"
              title="Rotate position clockwise"
            >
              <span className="material-symbols-outlined text-sm">sync</span>
              Rotate
            </button>
          </div>
        </div>

        {/* Volleyball Court Visualization Box */}
        <div className="bg-surface-container-lowest rounded-xl shadow-md border border-outline-variant p-3 relative max-w-md mx-auto">
          <div className="w-full h-72 bg-[#ffdbcb]/30 rounded-lg relative overflow-hidden flex flex-col border border-secondary/20">
            {/* Net (Center Line) */}
            <div className="absolute top-[32%] left-0 w-full h-2 bg-primary/30 flex items-center justify-center z-10 shadow-sm">
              <div className="w-full h-[1.5px] bg-primary"></div>
            </div>

            {/* Attack Lines */}
            <div className="absolute top-[52%] left-0 w-full h-[2px] border-b border-dashed border-outline-variant/50"></div>

            {/* Player Positions Grid */}
            <div className="flex-1 grid grid-cols-3 grid-rows-2 p-3 gap-3 relative">
              {/* Positions 4, 3, 2 (Front Row) */}
              {[4, 3, 2].map((posNum) => {
                const cp = courtPlayers.find((p) => p.positionNumber === posNum) || {
                  positionNumber: posNum,
                  playerId: 'p_def',
                  name: `POS ${posNum}`,
                  playerNumber: `${posNum}`
                };
                return (
                  <div
                    key={posNum}
                    onClick={() => {
                      setSelectedPosToSub(posNum);
                      setShowSubModal(true);
                    }}
                    className="flex flex-col items-center justify-center cursor-pointer group"
                    title="Click to Substitute"
                  >
                    <div className="w-11 h-11 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm shadow-md border-2 border-white transition-transform group-hover:scale-110 font-stats">
                      {cp.playerNumber}
                    </div>
                    <span className="text-[10px] font-bold mt-1 uppercase text-primary font-headline">
                      {cp.name}
                    </span>
                  </div>
                );
              })}

              {/* Positions 5, 6, 1 (Back Row) */}
              {[5, 6, 1].map((posNum) => {
                const cp = courtPlayers.find((p) => p.positionNumber === posNum) || {
                  positionNumber: posNum,
                  playerId: 'p_def',
                  name: `POS ${posNum}`,
                  playerNumber: `${posNum}`
                };
                const isLibero = cp.isLibero || cp.name === 'LIBERO';
                const isServer = cp.isServer || posNum === 1;

                return (
                  <div
                    key={posNum}
                    onClick={() => {
                      setSelectedPosToSub(posNum);
                      setShowSubModal(true);
                    }}
                    className="flex flex-col items-center justify-center relative cursor-pointer group"
                    title="Click to Substitute"
                  >
                    <div
                      className={`w-11 h-11 rounded-full flex items-center justify-center font-bold text-sm shadow-md border-2 border-white font-stats transition-transform group-hover:scale-110 ${
                        isLibero
                          ? 'bg-secondary-container text-on-secondary-container ring-2 ring-secondary/30'
                          : 'bg-primary text-white'
                      }`}
                    >
                      {cp.playerNumber}
                    </div>
                    <span
                      className={`text-[10px] font-bold mt-1 uppercase font-headline ${
                        isLibero ? 'text-secondary' : 'text-primary'
                      }`}
                    >
                      {cp.name}
                    </span>

                    {/* Server Icon */}
                    {isServer && (
                      <div
                        className="absolute -right-1 -bottom-1 w-6 h-6 bg-secondary text-white rounded-full flex items-center justify-center shadow-lg animate-bounce"
                        title="Server Position"
                      >
                        <span className="material-symbols-outlined text-xs">sports_volleyball</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Shortcuts Section */}
      <section className="grid grid-cols-2 gap-3">
        <div className="bg-surface-container-lowest p-3.5 rounded-xl border border-outline-variant shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-tertiary-container flex items-center justify-center text-tertiary-fixed-dim shrink-0">
            <span className="material-symbols-outlined">trending_up</span>
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-on-surface-variant font-label">Team Kill %</p>
            <p className="font-stats text-lg font-bold text-primary">42.5%</p>
          </div>
        </div>

        <div className="bg-surface-container-lowest p-3.5 rounded-xl border border-outline-variant shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-secondary-fixed flex items-center justify-center text-secondary shrink-0">
            <span className="material-symbols-outlined">bolt</span>
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-on-surface-variant font-label">Serve Efficiency</p>
            <p className="font-stats text-lg font-bold text-primary">0.89</p>
          </div>
        </div>
      </section>

      {/* Action Logging Buttons Grid */}
      <section className="space-y-3">
        <div className="grid grid-cols-4 gap-2">
          <button
            onClick={() => handleActionClick('ACE')}
            className="flex flex-col items-center justify-center bg-secondary py-3.5 rounded-xl shadow-lg btn-press text-white font-headline italic font-bold uppercase transition-all hover:bg-secondary/90 active:scale-95"
          >
            <span className="material-symbols-outlined text-2xl mb-0.5">star</span>
            <span className="text-xs">ACE</span>
          </button>

          <button
            onClick={() => handleActionClick('KILL')}
            className="flex flex-col items-center justify-center bg-primary py-3.5 rounded-xl shadow-lg btn-press text-white font-headline italic font-bold uppercase transition-all hover:bg-primary/90 active:scale-95"
          >
            <span className="material-symbols-outlined text-2xl mb-0.5">sports_volleyball</span>
            <span className="text-xs">KILL</span>
          </button>

          <button
            onClick={() => handleActionClick('BLOCK')}
            className="flex flex-col items-center justify-center bg-primary py-3.5 rounded-xl shadow-lg btn-press text-white font-headline italic font-bold uppercase transition-all hover:bg-primary/90 active:scale-95"
          >
            <span className="material-symbols-outlined text-2xl mb-0.5">shield</span>
            <span className="text-xs">BLOCK</span>
          </button>

          <button
            onClick={() => handleActionClick('ERROR')}
            className="flex flex-col items-center justify-center bg-error py-3.5 rounded-xl shadow-lg btn-press text-white font-headline italic font-bold uppercase transition-all hover:bg-error/90 active:scale-95"
          >
            <span className="material-symbols-outlined text-2xl mb-0.5">close</span>
            <span className="text-xs">ERROR</span>
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => handleActionClick('TIMEOUT')}
            className="flex items-center justify-center gap-2 bg-surface-container-highest py-3 rounded-xl border border-outline-variant btn-press text-on-surface font-headline italic font-bold text-xs uppercase hover:bg-surface-container transition-all active:scale-95"
          >
            <span className="material-symbols-outlined text-lg">timer</span>
            Timeout
          </button>

          <button
            onClick={() => setShowSubModal(true)}
            className="flex items-center justify-center gap-2 bg-surface-container-highest py-3 rounded-xl border border-outline-variant btn-press text-on-surface font-headline italic font-bold text-xs uppercase hover:bg-surface-container transition-all active:scale-95"
          >
            <span className="material-symbols-outlined text-lg">sync</span>
            Substitution
          </button>
        </div>
      </section>

      {/* Substitution Modal */}
      {showSubModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-surface-container-lowest w-full max-w-md rounded-2xl shadow-2xl border border-outline-variant p-5 space-y-4">
            <div className="flex justify-between items-center border-b border-surface-variant pb-3">
              <h3 className="font-headline text-lg italic font-bold text-primary flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary">sync</span>
                PLAYER SUBSTITUTION
              </h3>
              <button
                onClick={() => setShowSubModal(false)}
                className="text-on-surface-variant hover:text-error transition-colors p-1"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <p className="text-xs text-on-surface-variant font-body">
              Select bench athlete to swap into Court Position {selectedPosToSub || 1}:
            </p>

            <div className="space-y-2 max-h-60 overflow-y-auto">
              {benchPlayers.map((player) => (
                <div
                  key={player.id}
                  onClick={() => handleSubSubmit(player)}
                  className="p-3 bg-surface-container-low hover:bg-secondary-container/20 rounded-xl border border-outline-variant cursor-pointer flex items-center justify-between transition-all"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={player.avatarUrl}
                      alt={player.name}
                      className="w-10 h-10 rounded-full object-cover border border-secondary"
                    />
                    <div>
                      <p className="font-headline text-sm italic font-bold text-on-surface">
                        #{player.number} {player.name}
                      </p>
                      <p className="text-[10px] text-secondary font-label font-bold uppercase">
                        {player.position}
                      </p>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-secondary">swap_horiz</span>
                </div>
              ))}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowSubModal(false)}
                className="px-4 py-2 border border-outline-variant text-on-surface-variant rounded-lg text-xs font-label uppercase"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
