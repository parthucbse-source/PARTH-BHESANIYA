import React, { useState } from 'react';
import { NavTab, Player, MatchScore, CourtPlayer, TrainingDrill, TrainingSession, SeasonStats } from './types';
import {
  INITIAL_PLAYERS,
  INITIAL_MATCH_SCORE,
  INITIAL_COURT_PLAYERS,
  INITIAL_DRILLS,
  INITIAL_SESSIONS,
  INITIAL_STATS
} from './data/mockData';
import { Header } from './components/Header';
import { Navbar } from './components/Navbar';
import { DashboardView } from './components/DashboardView';
import { RosterView } from './components/RosterView';
import { MatchView } from './components/MatchView';
import { TrainingView } from './components/TrainingView';
import { AddPlayerModal } from './components/AddPlayerModal';
import { PlayerDetailModal } from './components/PlayerDetailModal';
import { AddSessionModal } from './components/AddSessionModal';
import { WorkoutRunnerModal } from './components/WorkoutRunnerModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('dashboard');
  const [players, setPlayers] = useState<Player[]>(INITIAL_PLAYERS);
  const [matchScore, setMatchScore] = useState<MatchScore>(INITIAL_MATCH_SCORE);
  const [courtPlayers, setCourtPlayers] = useState<CourtPlayer[]>(INITIAL_COURT_PLAYERS);
  const [drills, setDrills] = useState<TrainingDrill[]>(INITIAL_DRILLS);
  const [sessions, setSessions] = useState<TrainingSession[]>(INITIAL_SESSIONS);
  const [stats, setStats] = useState<SeasonStats>(INITIAL_STATS);

  // Modals
  const [isAddPlayerOpen, setIsAddPlayerOpen] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [isAddSessionOpen, setIsAddSessionOpen] = useState(false);
  const [selectedDrill, setSelectedDrill] = useState<TrainingDrill | null>(null);
  const [showNotifications, setShowNotifications] = useState(false);

  // Add new player
  const handleAddPlayer = (newPlayer: Player) => {
    setPlayers((prev) => [newPlayer, ...prev]);
  };

  // Toggle active player status
  const handleToggleActiveStatus = (playerId: string) => {
    setPlayers((prev) =>
      prev.map((p) => (p.id === playerId ? { ...p, active: !p.active } : p))
    );
    if (selectedPlayer && selectedPlayer.id === playerId) {
      setSelectedPlayer((prev) => (prev ? { ...prev, active: !prev.active } : null));
    }
  };

  // Add new session
  const handleAddSession = (newSession: TrainingSession) => {
    setSessions((prev) => [newSession, ...prev]);
    setStats((prev) => ({
      ...prev,
      drillsCompletedCount: prev.drillsCompletedCount + 1,
      drillsDoneThisWeek: prev.drillsDoneThisWeek + 1,
      trainingHours: +(prev.trainingHours + 0.5).toFixed(1)
    }));
  };

  // Log Match Action
  const handleLogMatchAction = (actionName: string) => {
    setMatchScore((prev) => {
      let hScore = prev.homeScore;
      let aScore = prev.awayScore;
      if (actionName === 'ACE' || actionName === 'KILL' || actionName === 'BLOCK') {
        hScore += 1;
      } else if (actionName === 'ERROR') {
        aScore += 1;
      }

      return {
        ...prev,
        homeScore: hScore,
        awayScore: aScore,
        lastAction: `${actionName} recorded (${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })})`
      };
    });

    if (actionName === 'ACE') {
      setStats((prev) => ({ ...prev, acesThisSeason: prev.acesThisSeason + 1 }));
    }
  };

  // Rotate Court Positions
  const handleRotateCourt = () => {
    setCourtPlayers((prev) => {
      // Rotation: 1 -> 6 -> 5 -> 4 -> 3 -> 2 -> 1
      return prev.map((cp) => {
        let nextPos = cp.positionNumber - 1;
        if (nextPos < 1) nextPos = 6;
        return {
          ...cp,
          positionNumber: nextPos,
          isServer: nextPos === 1
        };
      });
    });
  };

  // Substitute Player on Court
  const handleSubstitutePlayer = (courtPosNumber: number, newPlayer: Player) => {
    setCourtPlayers((prev) =>
      prev.map((cp) =>
        cp.positionNumber === courtPosNumber
          ? {
              ...cp,
              playerId: newPlayer.id,
              name: newPlayer.name.split(' ').pop()?.toUpperCase() || newPlayer.name.toUpperCase(),
              playerNumber: newPlayer.number,
              isLibero: newPlayer.position === 'Libero'
            }
          : cp
      )
    );
  };

  // Toggle drill starred
  const handleToggleStarDrill = (drillId: string) => {
    setDrills((prev) =>
      prev.map((d) => (d.id === drillId ? { ...d, isStarred: !d.isStarred } : d))
    );
  };

  // Complete Drill
  const handleCompleteDrill = (drillId: string) => {
    const drill = drills.find((d) => d.id === drillId) || drills[0];
    const newSession: TrainingSession = {
      id: 's_' + Date.now(),
      session: drill.title,
      focus: drill.category,
      intensity: drill.level === 'Pro' ? 'Extreme' : drill.level === 'Advanced' ? 'High' : 'Medium',
      date: 'Just Now'
    };
    handleAddSession(newSession);
  };

  const benchPlayers = players.filter(
    (p) => !courtPlayers.some((cp) => cp.playerId === p.id)
  );

  return (
    <div className="min-h-screen bg-[#f9f9f9] text-[#1a1c1c] font-body flex flex-col">
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onNotificationClick={() => setShowNotifications(true)}
        unreadCount={2}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-[1280px] w-full mx-auto px-4 md:px-8 py-6 md:pl-28">
        {activeTab === 'dashboard' && (
          <DashboardView
            onNavigate={setActiveTab}
            sessions={sessions}
            stats={stats}
            onOpenAddSession={() => setIsAddSessionOpen(true)}
          />
        )}

        {activeTab === 'roster' && (
          <RosterView
            players={players}
            onOpenAddPlayer={() => setIsAddPlayerOpen(true)}
            onSelectPlayer={(p) => setSelectedPlayer(p)}
          />
        )}

        {activeTab === 'match' && (
          <MatchView
            score={matchScore}
            courtPlayers={courtPlayers}
            benchPlayers={benchPlayers.length > 0 ? benchPlayers : players}
            onLogAction={handleLogMatchAction}
            onRotateCourt={handleRotateCourt}
            onSubstitutePlayer={handleSubstitutePlayer}
          />
        )}

        {activeTab === 'training' && (
          <TrainingView
            drills={drills}
            stats={stats}
            onSelectDrill={(d) => setSelectedDrill(d)}
            onToggleStarDrill={handleToggleStarDrill}
          />
        )}
      </main>

      {/* Bottom / Side Navigation */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Modals */}
      <AddPlayerModal
        isOpen={isAddPlayerOpen}
        onClose={() => setIsAddPlayerOpen(false)}
        onAddPlayer={handleAddPlayer}
      />

      <PlayerDetailModal
        player={selectedPlayer}
        onClose={() => setSelectedPlayer(null)}
        onToggleActiveStatus={handleToggleActiveStatus}
      />

      <AddSessionModal
        isOpen={isAddSessionOpen}
        onClose={() => setIsAddSessionOpen(false)}
        onAddSession={handleAddSession}
      />

      <WorkoutRunnerModal
        drill={selectedDrill}
        onClose={() => setSelectedDrill(null)}
        onCompleteDrill={handleCompleteDrill}
      />

      {/* Quick Notifications Drawer Modal */}
      {showNotifications && (
        <div className="fixed inset-0 z-50 flex items-start justify-end p-4 bg-black/40 backdrop-blur-xs animate-fade-in">
          <div className="bg-surface-container-lowest w-full max-w-sm rounded-2xl shadow-2xl border border-outline-variant p-4 space-y-3 mt-12">
            <div className="flex justify-between items-center border-b border-surface-variant pb-2">
              <h3 className="font-headline text-base italic font-bold text-primary flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary">notifications</span>
                SpikePro Alerts
              </h3>
              <button
                onClick={() => setShowNotifications(false)}
                className="text-on-surface-variant hover:text-error transition-colors p-1"
              >
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-3 bg-surface-container-low rounded-xl border border-outline-variant">
                <p className="font-bold text-primary uppercase font-headline">Championship Match Alert</p>
                <p className="text-on-surface-variant mt-0.5">
                  Titans vs Breakers set for Oct 24, 19:00 PM at Olympic Arena.
                </p>
              </div>
              <div className="p-3 bg-surface-container-low rounded-xl border border-outline-variant">
                <p className="font-bold text-secondary uppercase font-headline">Training Goal Milestone</p>
                <p className="text-on-surface-variant mt-0.5">
                  75% of drill goals completed this week! 5 more to reach 100%.
                </p>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowNotifications(false)}
                className="px-4 py-1.5 bg-primary text-on-primary rounded-lg text-xs font-headline italic uppercase font-bold"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
