import React, { useState } from 'react';
import { Player } from '../types';

interface AddPlayerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddPlayer: (player: Player) => void;
}

export const AddPlayerModal: React.FC<AddPlayerModalProps> = ({ isOpen, onClose, onAddPlayer }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [position, setPosition] = useState<Player['position']>('Outside Hitter');
  const [height, setHeight] = useState("6'2\"");
  const [spikeReach, setSpikeReach] = useState("11'0\"");
  const [blockReach, setBlockReach] = useState("10'8\"");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    let positionCategory: Player['positionCategory'] = 'HITTERS';
    if (position === 'Setter') positionCategory = 'SETTERS';
    if (position === 'Libero') positionCategory = 'LIBEROS';

    let statLabel = 'Blocks / Set';
    let statValue = 1.8;
    if (position === 'Setter') {
      statLabel = 'Assists / Set';
      statValue = 8.5;
    } else if (position === 'Libero') {
      statLabel = 'Digs / Set';
      statValue = 11.2;
    }

    const newPlayer: Player = {
      id: 'p_' + Date.now(),
      name: name.trim(),
      number: number ? number.padStart(2, '0') : '07',
      position,
      positionCategory,
      killPercent: 52,
      statLabel,
      statValue,
      avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBOAY6k68UuVpSC7QJmaG9Cg-3PQz3HwZ_s-PeQq57N_7uJZLHvGb5UGpca83Po05LB3L2Ta5k_kT3R34xMht_8_iAeCEnByy97KDT7GciwDnUU4MQVt9KLbl_cNGmElac5LV2fwnyRpB5Tn0v-5mmEDqBhfTNJ69zNIOFb1fo3cC9C7impe7lN_94jD6BgYfs2eDHjZoyyXyTaPUKMt8Fh4_w8MLzlpC4JKhfaV_erWu1Td3vF3xy9',
      active: true,
      height,
      spikeReach,
      blockReach,
      seasonKills: 45,
      seasonAces: 6,
      seasonDigs: 24
    };

    onAddPlayer(newPlayer);
    setName('');
    setNumber('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-surface-container-lowest w-full max-w-md rounded-2xl shadow-2xl border border-outline-variant p-6 space-y-4">
        <div className="flex justify-between items-center border-b border-surface-variant pb-3">
          <h3 className="font-headline text-xl italic font-bold text-primary flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary">person_add</span>
            ADD NEW PLAYER
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
              Player Full Name *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Alex Morgan"
              className="w-full px-3 py-2 bg-surface-container-low border border-outline-variant rounded-lg text-sm text-on-surface focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-label uppercase text-on-surface-variant mb-1 font-semibold">
                Jersey #
              </label>
              <input
                type="text"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                placeholder="10"
                maxLength={3}
                className="w-full px-3 py-2 bg-surface-container-low border border-outline-variant rounded-lg text-sm text-on-surface focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary font-stats"
              />
            </div>

            <div>
              <label className="block text-xs font-label uppercase text-on-surface-variant mb-1 font-semibold">
                Position
              </label>
              <select
                value={position}
                onChange={(e) => setPosition(e.target.value as Player['position'])}
                className="w-full px-3 py-2 bg-surface-container-low border border-outline-variant rounded-lg text-sm text-on-surface focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary"
              >
                <option value="Outside Hitter">Outside Hitter</option>
                <option value="Setter">Setter</option>
                <option value="Middle Blocker">Middle Blocker</option>
                <option value="Libero">Libero</option>
                <option value="Right Side Hitter">Right Side Hitter</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-[10px] font-label uppercase text-on-surface-variant mb-1 font-semibold">
                Height
              </label>
              <input
                type="text"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="w-full px-2 py-1.5 bg-surface-container-low border border-outline-variant rounded text-xs text-on-surface"
              />
            </div>
            <div>
              <label className="block text-[10px] font-label uppercase text-on-surface-variant mb-1 font-semibold">
                Spike Reach
              </label>
              <input
                type="text"
                value={spikeReach}
                onChange={(e) => setSpikeReach(e.target.value)}
                className="w-full px-2 py-1.5 bg-surface-container-low border border-outline-variant rounded text-xs text-on-surface"
              />
            </div>
            <div>
              <label className="block text-[10px] font-label uppercase text-on-surface-variant mb-1 font-semibold">
                Block Reach
              </label>
              <input
                type="text"
                value={blockReach}
                onChange={(e) => setBlockReach(e.target.value)}
                className="w-full px-2 py-1.5 bg-surface-container-low border border-outline-variant rounded text-xs text-on-surface"
              />
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
              Save Player
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
