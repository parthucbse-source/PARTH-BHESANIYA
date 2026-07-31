import React from 'react';
import { NavTab, TrainingSession, SeasonStats } from '../types';

interface DashboardViewProps {
  onNavigate: (tab: NavTab) => void;
  sessions: TrainingSession[];
  stats: SeasonStats;
  onOpenAddSession: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onNavigate,
  sessions,
  stats,
  onOpenAddSession
}) => {
  const goalPercent = Math.round((stats.drillsCompletedCount / stats.targetDrillsCount) * 100);
  const strokeDashoffset = 440 - (440 * goalPercent) / 100;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome Hero Section */}
      <section className="space-y-1">
        <h2 className="font-headline text-2xl md:text-3xl italic font-bold text-primary tracking-tight">
          Game Ready, Captain.
        </h2>
        <p className="text-on-surface-variant text-sm font-body">
          Your next championship performance starts here.
        </p>
      </section>

      {/* Bento Grid: Upcoming Match & Training Goal */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Upcoming Match Card */}
        <section className="md:col-span-2 relative overflow-hidden rounded-xl bg-primary text-on-primary vball-card-shadow border-l-4 border-secondary p-4 md:p-6 flex flex-col justify-between">
          <div className="absolute right-0 top-0 opacity-10 scale-150 rotate-12 pointer-events-none">
            <span className="material-symbols-outlined text-[120px]">sports_volleyball</span>
          </div>

          <div className="relative z-10 space-y-4">
            <div className="flex justify-between items-start">
              <span className="bg-secondary-container text-on-secondary-container px-2.5 py-1 rounded-full font-label text-xs font-semibold uppercase tracking-wider">
                Upcoming Match
              </span>
              <div className="text-right">
                <p className="font-label text-xs text-primary-fixed">Oct 24, 2023</p>
                <p className="font-label text-xs text-primary-fixed">19:00 PM</p>
              </div>
            </div>

            <div className="flex items-center justify-between gap-4 py-2">
              <div className="flex flex-col items-center flex-1">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-surface rounded-full flex items-center justify-center p-2 mb-2 shadow-md">
                  <img
                    className="w-full h-full object-contain"
                    alt="SpikePro Titans logo"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuC-3WtCojBSRgrlz306XfytdhDvG1T1b9-g5llgsCzwLCByz-ki50JgBfPe1bxi4w8-nx30TQGDusAoTqm5_t_ScOQYu0vLaxMzMEXBWvsVB6hy3MVdTOgPXZZ2dAnIcOkVjW5WLxG0-d6ajgBhY1ufbSDWQRng1PHXM1AK-6N1OjjmowYioJkoaY0Meq84tzw5Vzczd6nO8Gfm6LSTudkhfm6jbA6d9R4kTTqUfpg4ahrjaLcwFx3P"
                  />
                </div>
                <p className="font-headline text-lg italic font-bold text-center">SpikePro</p>
              </div>

              <div className="flex flex-col items-center">
                <span className="font-display text-2xl italic opacity-50 font-extrabold">VS</span>
              </div>

              <div className="flex flex-col items-center flex-1">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-surface rounded-full flex items-center justify-center p-2 mb-2 shadow-md">
                  <img
                    className="w-full h-full object-contain"
                    alt="Breakers logo"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDNNITK2wVsMXeSllruMo8fJareS4ggkNAYTLD9rh0Laqpk-r_4DtJHsjbPTUEtCmzllAmqQHnPo1_dwYoUSdfT03kTn6GIsefZeC8Kvg-8dmawFjttyKmqWFezvJn1FgMDdgqiNZzGwKXUu-Uzsstqg6eo3eRcOejZuYLy3KdGOp-bVrvefjPdF1hoJl3AJdpJGIw-CLvzMyUNeQ4cFlvhNZuTAduvacyJg_r2Jg4ljL0PYpy644j"
                  />
                </div>
                <p className="font-headline text-lg italic font-bold text-center">Breakers</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-primary-fixed-dim text-sm font-body">
              <span className="material-symbols-outlined text-base">location_on</span>
              <p>Olympic Arena, Center Court</p>
            </div>

            <button
              onClick={() => onNavigate('match')}
              className="w-full bg-secondary text-on-secondary font-headline italic font-bold py-3 rounded-lg active:scale-95 transition-all flex items-center justify-center gap-2 shadow-md hover:bg-secondary/90"
            >
              VIEW MATCH DETAILS
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        </section>

        {/* Training Progress Ring Card */}
        <section className="bg-surface-container-lowest rounded-xl vball-card-shadow p-4 md:p-6 flex flex-col items-center justify-between border border-outline-variant">
          <p className="font-headline text-lg italic font-bold text-primary mb-3">Training Goal</p>

          <div className="relative flex items-center justify-center my-2">
            <svg className="w-36 h-36 md:w-40 md:h-40">
              <circle
                className="text-surface-container stroke-current"
                cx="72"
                cy="72"
                fill="transparent"
                r="60"
                strokeWidth="10"
              />
              <circle
                className="text-secondary stroke-current progress-ring-circle"
                cx="72"
                cy="72"
                fill="transparent"
                r="60"
                strokeLinecap="round"
                strokeWidth="10"
                style={{
                  strokeDasharray: '377',
                  strokeDashoffset: `${377 - (377 * goalPercent) / 100}`
                }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-display text-3xl font-extrabold text-secondary">{goalPercent}%</span>
              <span className="font-label text-[10px] uppercase font-bold text-on-surface-variant">
                Drills Completed
              </span>
            </div>
          </div>

          <div className="w-full space-y-1.5 mt-2">
            <div className="flex justify-between font-label text-xs">
              <span className="text-on-surface-variant">Serve Practice</span>
              <span className="text-primary font-bold">
                {stats.drillsCompletedCount}/{stats.targetDrillsCount}
              </span>
            </div>
            <div className="w-full h-2 bg-surface-container rounded-full overflow-hidden">
              <div
                className="h-full bg-secondary rounded-full transition-all duration-500"
                style={{ width: `${goalPercent}%` }}
              />
            </div>
          </div>
        </section>
      </div>

      {/* Recent Performance & Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Performance Chart */}
        <section className="bg-surface-container-low rounded-xl vball-card-shadow p-4 md:p-6 border border-outline-variant flex flex-col justify-between">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-headline text-lg italic font-bold text-primary">Recent Performance</h3>
            <div className="flex gap-1.5">
              <span className="bg-tertiary-container text-tertiary-fixed-dim px-2 py-0.5 rounded-full font-label text-xs font-bold">
                W
              </span>
              <span className="bg-tertiary-container text-tertiary-fixed-dim px-2 py-0.5 rounded-full font-label text-xs font-bold">
                W
              </span>
              <span className="bg-error-container text-error px-2 py-0.5 rounded-full font-label text-xs font-bold">
                L
              </span>
            </div>
          </div>

          <div className="h-44 flex items-end gap-3 px-2 py-2">
            <div className="flex-1 bg-primary-container rounded-t-lg h-[60%] relative group cursor-pointer transition-all hover:opacity-80">
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-on-surface text-surface text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow">
                12 Kills
              </div>
            </div>
            <div className="flex-1 bg-secondary rounded-t-lg h-[85%] relative group cursor-pointer transition-all hover:opacity-80">
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-on-surface text-surface text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow">
                18 Kills
              </div>
            </div>
            <div className="flex-1 bg-primary-container rounded-t-lg h-[45%] relative group cursor-pointer transition-all hover:opacity-80">
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-on-surface text-surface text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow">
                9 Kills
              </div>
            </div>
            <div className="flex-1 bg-secondary rounded-t-lg h-[95%] relative group cursor-pointer transition-all hover:opacity-80">
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-on-surface text-surface text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow">
                21 Kills
              </div>
            </div>
            <div className="flex-1 bg-primary-container rounded-t-lg h-[70%] relative group cursor-pointer transition-all hover:opacity-80">
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-on-surface text-surface text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow">
                14 Kills
              </div>
            </div>
          </div>

          <div className="flex justify-between mt-2 font-label text-xs text-on-surface-variant px-1 font-semibold">
            <span>Oct 05</span>
            <span>Oct 10</span>
            <span>Oct 15</span>
            <span>Oct 20</span>
            <span>Oct 24</span>
          </div>
        </section>

        {/* Season Stat Cards Grid */}
        <section className="grid grid-cols-2 gap-4">
          <div className="bg-surface-container-highest rounded-xl p-4 flex flex-col justify-between border-l-4 border-secondary shadow-sm">
            <span className="font-label text-xs text-on-surface-variant font-bold uppercase tracking-wider">
              Aces This Season
            </span>
            <p className="font-display text-3xl font-black text-primary mt-2">
              {stats.acesThisSeason}
            </p>
            <div className="flex items-center text-tertiary-fixed-dim font-label text-xs font-bold mt-1">
              <span className="material-symbols-outlined text-sm">trending_up</span>
              <span className="ml-0.5">+12% vs last</span>
            </div>
          </div>

          <div className="bg-surface-container-highest rounded-xl p-4 flex flex-col justify-between border-l-4 border-primary shadow-sm">
            <span className="font-label text-xs text-on-surface-variant font-bold uppercase tracking-wider">
              Kill Efficiency
            </span>
            <p className="font-display text-3xl font-black text-secondary mt-2">
              .{Math.round(stats.killEfficiency * 1000)}
            </p>
            <div className="flex items-center text-error font-label text-xs font-bold mt-1">
              <span className="material-symbols-outlined text-sm">trending_down</span>
              <span className="ml-0.5">-2% vs last</span>
            </div>
          </div>

          <div className="bg-surface-container-highest rounded-xl p-4 flex flex-col justify-between border-l-4 border-primary shadow-sm">
            <span className="font-label text-xs text-on-surface-variant font-bold uppercase tracking-wider">
              Total Assists
            </span>
            <p className="font-display text-3xl font-black text-primary mt-2">
              {stats.totalAssists}
            </p>
            <span className="text-[10px] text-on-surface-variant font-label">League Leader</span>
          </div>

          <div className="bg-surface-container-highest rounded-xl p-4 flex flex-col justify-between border-l-4 border-secondary shadow-sm">
            <span className="font-label text-xs text-on-surface-variant font-bold uppercase tracking-wider">
              MVP Wins
            </span>
            <p className="font-display text-3xl font-black text-secondary mt-2">
              0{stats.mvpWins}
            </p>
            <span className="text-[10px] text-secondary font-label font-bold uppercase">Top Player Award</span>
          </div>
        </section>
      </div>

      {/* Training Sessions Activity Table */}
      <section className="bg-surface-container-lowest rounded-xl vball-card-shadow overflow-hidden border border-outline-variant">
        <div className="px-4 py-3 bg-surface-container-high border-b border-outline-variant flex justify-between items-center">
          <h3 className="font-label text-xs font-bold text-on-surface-variant uppercase tracking-widest">
            Training Sessions
          </h3>
          <button
            onClick={onOpenAddSession}
            className="text-xs font-headline italic font-bold text-secondary hover:text-primary transition-colors flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-sm">add</span>
            LOG SESSION
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-body border-collapse">
            <thead>
              <tr className="bg-surface-container font-label text-xs text-primary font-bold">
                <th className="px-4 py-2.5">Session</th>
                <th className="px-4 py-2.5">Focus</th>
                <th className="px-4 py-2.5 text-right">Intensity</th>
              </tr>
            </thead>
            <tbody>
              {sessions.map((sess, idx) => (
                <tr
                  key={sess.id}
                  className={`border-b border-surface-variant transition-colors hover:bg-surface-container-low ${
                    idx % 2 === 1 ? 'bg-surface-container-low/50' : ''
                  }`}
                >
                  <td className="px-4 py-3 font-semibold text-sm text-on-surface">
                    {sess.session}
                    <span className="block text-[10px] text-on-surface-variant font-normal">
                      {sess.date}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="bg-primary-container text-on-primary-container px-2.5 py-1 rounded-full text-[11px] font-label font-semibold">
                      {sess.focus}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right font-stats text-sm font-bold text-secondary">
                    {sess.intensity}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
