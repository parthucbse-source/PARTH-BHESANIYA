import React, { useState } from 'react';
import { TrainingDrill, SeasonStats } from '../types';

interface TrainingViewProps {
  drills: TrainingDrill[];
  stats: SeasonStats;
  onSelectDrill: (drill: TrainingDrill) => void;
  onToggleStarDrill: (drillId: string) => void;
}

export const TrainingView: React.FC<TrainingViewProps> = ({
  drills,
  stats,
  onSelectDrill,
  onToggleStarDrill
}) => {
  const [activeCategory, setActiveCategory] = useState<'Drills' | 'Workout Plans' | 'Progress' | 'Favorites'>('Drills');
  const [searchQuery, setSearchQuery] = useState('');

  const featuredDrill: TrainingDrill = {
    id: 'f_vertical',
    title: 'VERTICAL EXPLOSION',
    description: 'Increase your jump height by 4 inches with this intensive 6-week plyometric program.',
    durationMinutes: 45,
    level: 'Pro',
    category: 'Strength',
    typeCategory: 'Workout Plans',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAo8c0FpcsU-rwWt247xzIHetbSA54qDK492UraiVnEUiiiKOkqrPiyBVAjnsCCiskZ7kN0OgEXOWiXfCkzcxqgaawuRlTVpYmPhUNPbpPj62tq6PpSZ1JqsNVrbFrNS5HD08hMItpmoJpH0AIXYWNAFyaEgfAHKEY7T5n_3aOEOCQX5bSuKuTOlMbMmr89xZIwZt8dxZa9XhwVUher66itYgbq8aDWp66LV5XVPd7BHUEeeElr8wAV',
    instructions: [
      'Warmup: 5 minutes dynamic mobility & ankle priming.',
      'Depth Jumps: 4 sets x 6 reps off 18-inch box into max spike jump.',
      'Single-Leg Broad Jumps: 3 sets x 8 reps per leg.',
      'Core Explosive Medicine Ball Slams: 3 sets x 10 reps.'
    ]
  };

  const filteredDrills = drills.filter((d) => {
    if (activeCategory === 'Favorites') return d.isStarred;
    if (activeCategory === 'Workout Plans') return d.typeCategory === 'Workout Plans';
    if (activeCategory === 'Drills') return d.typeCategory === 'Drills' || true;
    return true;
  }).filter((d) =>
    d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-fade-in court-grid-pattern pb-16">
      {/* Featured Workout Hero Banner */}
      <section>
        <div className="relative w-full h-60 md:h-80 rounded-2xl overflow-hidden shadow-xl group border border-outline-variant">
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/70 to-transparent z-10" />
          <img
            src={featuredDrill.imageUrl}
            alt={featuredDrill.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 md:p-8">
            <span className="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full font-label text-xs font-bold uppercase tracking-wider w-fit mb-2 shadow">
              FEATURED WORKOUT
            </span>
            <h2 className="font-display text-2xl md:text-4xl text-white italic font-black mb-1 leading-tight">
              VERTICAL EXPLOSION
            </h2>
            <p className="text-white/90 text-xs md:text-sm font-body mb-4 max-w-md">
              Increase your jump height by 4 inches with this intensive 6-week plyometric program.
            </p>

            <button
              onClick={() => onSelectDrill(featuredDrill)}
              className="bg-secondary-container text-white font-headline italic font-bold px-6 py-2.5 rounded-lg hover:opacity-90 transition-all flex items-center gap-2 w-fit active:scale-95 shadow-lg"
            >
              START PROGRAM
              <span className="material-symbols-outlined text-lg">play_arrow</span>
            </button>
          </div>
        </div>
      </section>

      {/* Category Pills & Search Bar */}
      <section className="space-y-3">
        <div className="flex items-center bg-surface-container-low border border-outline-variant rounded-xl px-3 py-2">
          <span className="material-symbols-outlined text-outline mr-2">search</span>
          <input
            type="text"
            placeholder="Search drills by keyword, target skill, or level..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent text-sm text-on-surface focus:outline-none"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {(['Drills', 'Workout Plans', 'Progress', 'Favorites'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full font-label text-xs font-bold transition-all whitespace-nowrap ${
                activeCategory === cat
                  ? 'bg-primary text-on-primary shadow'
                  : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-variant'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Recommended Drills Grid */}
      <section>
        <div className="flex justify-between items-end mb-4">
          <h3 className="font-headline text-xl md:text-2xl italic font-bold text-primary">
            Recommended Drills
          </h3>
          <span className="text-xs text-on-surface-variant font-label">
            Showing {filteredDrills.length} drills
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredDrills.map((drill) => (
            <div
              key={drill.id}
              className="bg-surface-container-lowest rounded-xl shadow-md overflow-hidden border border-outline-variant group hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between"
              onClick={() => onSelectDrill(drill)}
            >
              <div className="relative h-44">
                <img
                  src={drill.imageUrl}
                  alt={drill.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 right-3 bg-black/60 text-white px-2.5 py-1 rounded text-xs font-label font-bold flex items-center gap-1 backdrop-blur-md">
                  <span className="material-symbols-outlined text-sm">schedule</span>
                  {drill.durationMinutes}m
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-headline text-lg italic font-bold text-primary leading-tight group-hover:text-secondary transition-colors">
                      {drill.title}
                    </h4>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleStarDrill(drill.id);
                      }}
                      className="text-secondary hover:scale-110 transition-transform p-0.5"
                    >
                      <span className="material-symbols-outlined">
                        {drill.isStarred ? 'star' : 'star_border'}
                      </span>
                    </button>
                  </div>

                  <p className="text-on-surface-variant text-xs font-body mb-4 line-clamp-2">
                    {drill.description}
                  </p>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-surface-variant">
                  <span className="text-[10px] font-label font-bold text-primary bg-primary-fixed px-2.5 py-1 rounded">
                    {drill.level}
                  </span>
                  <span className="text-[10px] font-label font-bold text-tertiary-container bg-tertiary-fixed-dim px-2.5 py-1 rounded">
                    {drill.category}
                  </span>
                </div>
              </div>
            </div>
          ))}

          {/* Unlock Pro Drills Bento Card */}
          <div className="bg-primary-container text-on-primary-container rounded-xl shadow-md p-6 flex flex-col justify-between group hover:shadow-xl transition-all border border-primary">
            <div>
              <span className="material-symbols-outlined text-secondary-container text-4xl mb-2">bolt</span>
              <h4 className="font-headline text-xl italic font-bold mb-2 text-white">
                Unlock Pro Drills
              </h4>
              <p className="text-on-primary-container/90 text-xs font-body leading-relaxed">
                Get access to 100+ drills designed by Olympic coaches for setter distribution and kill efficiency.
              </p>
            </div>
            <button
              onClick={() => alert("SpikePro Pro Membership activated! Enjoy unlocked coaching programs.")}
              className="bg-white text-primary font-headline italic font-bold text-xs uppercase px-4 py-2.5 rounded-lg mt-6 w-full hover:bg-surface-container active:scale-95 transition-all shadow"
            >
              GO PREMIUM
            </button>
          </div>
        </div>
      </section>

      {/* Progress Overview Section */}
      <section className="pt-4">
        <h3 className="font-headline text-xl md:text-2xl italic font-bold text-primary mb-4">
          This Week's Progress
        </h3>

        <div className="bg-surface-container-lowest rounded-xl shadow-md p-6 border border-outline-variant space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="flex justify-between items-end mb-1">
                <span className="font-label text-xs font-bold text-on-surface-variant uppercase">
                  SERVE ACCURACY
                </span>
                <span className="font-stats text-xl font-bold text-secondary">
                  {stats.serveAccuracy}%
                </span>
              </div>
              <div className="h-3 w-full bg-surface-container rounded-full overflow-hidden">
                <div
                  className="h-full bg-secondary-container rounded-full transition-all duration-1000"
                  style={{ width: `${stats.serveAccuracy}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-end mb-1">
                <span className="font-label text-xs font-bold text-on-surface-variant uppercase">
                  BLOCK EFFICIENCY
                </span>
                <span className="font-stats text-xl font-bold text-primary">
                  {stats.blockEfficiency}%
                </span>
              </div>
              <div className="h-3 w-full bg-surface-container rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-1000"
                  style={{ width: `${stats.blockEfficiency}%` }}
                />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-surface-variant grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-[10px] font-label font-bold text-on-surface-variant uppercase">
                DRILLS DONE
              </p>
              <p className="font-display text-2xl md:text-3xl italic font-black text-on-surface mt-1">
                {stats.drillsDoneThisWeek}
              </p>
            </div>
            <div>
              <p className="text-[10px] font-label font-bold text-on-surface-variant uppercase">
                TRAINING HOURS
              </p>
              <p className="font-display text-2xl md:text-3xl italic font-black text-on-surface mt-1">
                {stats.trainingHours}
              </p>
            </div>
            <div>
              <p className="text-[10px] font-label font-bold text-on-surface-variant uppercase">
                STREAK
              </p>
              <p className="font-display text-2xl md:text-3xl italic font-black text-secondary mt-1">
                {stats.streakDays}D
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
