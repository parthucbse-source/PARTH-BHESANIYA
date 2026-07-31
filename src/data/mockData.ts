import { Player, MatchScore, CourtPlayer, TrainingDrill, TrainingSession, SeasonStats } from '../types';

export const INITIAL_PLAYERS: Player[] = [
  {
    id: 'p1',
    name: 'Marcus Vane',
    number: '12',
    position: 'Outside Hitter',
    positionCategory: 'HITTERS',
    killPercent: 68,
    statLabel: 'Blocks / Set',
    statValue: 2.4,
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBOAY6k68UuVpSC7QJmaG9Cg-3PQz3HwZ_s-PeQq57N_7uJZLHvGb5UGpca83Po05LB3L2Ta5k_kT3R34xMht_8_iAeCEnByy97KDT7GciwDnUU4MQVt9KLbl_cNGmElac5LV2fwnyRpB5Tn0v-5mmEDqBhfTNJ69zNIOFb1fo3cC9C7impe7lN_94jD6BgYfs2eDHjZoyyXyTaPUKMt8Fh4_w8MLzlpC4JKhfaV_erWu1Td3vF3xy9',
    active: true,
    height: "6'5\"",
    spikeReach: '11\'8"',
    blockReach: '11\'2"',
    seasonKills: 142,
    seasonAces: 18,
    seasonDigs: 45
  },
  {
    id: 'p2',
    name: 'Sarah Chen',
    number: '05',
    position: 'Setter',
    positionCategory: 'SETTERS',
    killPercent: 42,
    statLabel: 'Assists / Set',
    statValue: 11.8,
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAJ1fZWiP72DUwt144blR62DunLhANSst-88xlVhy2bmQWCyRHhknLs0NpiYzilnPw00135323e_baOD9rUz_nfMrE7pv3T03JCsgJ0YsBw-AbnPfzDgBgUjzp5tO4kfHzJBxlo8uXk7MzzJ0AYzRatomdEA7J8BexkDadSukLdWizGcZx9nFnseR5P8PbADXR9q3vtwtuc4gbA4oGxEMByv5P2ILI5rLNcxDeN3KarZdaatx2QCsXn',
    active: false,
    height: "5'11\"",
    spikeReach: '10\'2"',
    blockReach: '9\'10"',
    seasonKills: 38,
    seasonAces: 12,
    seasonDigs: 88
  },
  {
    id: 'p3',
    name: 'Jaxson Rivera',
    number: '21',
    position: 'Middle Blocker',
    positionCategory: 'HITTERS',
    killPercent: 55,
    statLabel: 'Blocks / Set',
    statValue: 3.1,
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCoKqdQyY6kyd-6gdxYC8IBFN24xM2HzrpY7aXci-e5CSmQ-E_BkeIbulCcgnnpc80dXIONyg5CccZMakYTiTSaqoHOpF1FF7FwqX3e5oo_vsIVlsgQHawErwXSgpV5ZoIrPhSW4Tcp4a4VWzzWHIF8yi7ubAz_Ph5iOOrW6dNyr6znEhdqCJzSnJJo59XlMf4psYSvFTB0dLkeR-sui9WF7-qCB_ScqkMV4Vn4d_MN1-O-eaYNVSNO',
    active: false,
    height: "6'8\"",
    spikeReach: '11\'10"',
    blockReach: '11\'6"',
    seasonKills: 95,
    seasonAces: 8,
    seasonDigs: 22
  },
  {
    id: 'p4',
    name: 'Elena Sokolov',
    number: '08',
    position: 'Libero',
    positionCategory: 'LIBEROS',
    killPercent: 12,
    statLabel: 'Digs / Set',
    statValue: 14.2,
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAIq4evwit3fK-2JEk6-uxJc0xcce904ef70JWKwxiFhji1WXy6QQ7W35VuuRIblratcexM_HJzFyuftEhNeAqqZyB4beKyFUsyaqtRe8d7F4-MzMUDY7MW2kzYRENtB4xmcMFKs75Wrs3QQKb4sbs_OVTJErZ2JQPUj8yXsI8wspCUJwjeJkhkS_Aoy7Jaqt5D8WtdB_CQYCf9Plg9XNYHienr2mGRVlaBEhdoVlmqSh5k_fIPgPg4',
    active: false,
    height: "5'7\"",
    spikeReach: '9\'6"',
    blockReach: '9\'2"',
    seasonKills: 4,
    seasonAces: 0,
    seasonDigs: 210
  },
  {
    id: 'p5',
    name: 'Carlos Ruiz',
    number: '04',
    position: 'Outside Hitter',
    positionCategory: 'HITTERS',
    killPercent: 62,
    statLabel: 'Blocks / Set',
    statValue: 1.8,
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBOAY6k68UuVpSC7QJmaG9Cg-3PQz3HwZ_s-PeQq57N_7uJZLHvGb5UGpca83Po05LB3L2Ta5k_kT3R34xMht_8_iAeCEnByy97KDT7GciwDnUU4MQVt9KLbl_cNGmElac5LV2fwnyRpB5Tn0v-5mmEDqBhfTNJ69zNIOFb1fo3cC9C7impe7lN_94jD6BgYfs2eDHjZoyyXyTaPUKMt8Fh4_w8MLzlpC4JKhfaV_erWu1Td3vF3xy9',
    active: false,
    height: "6'4\"",
    spikeReach: '11\'5"',
    blockReach: '11\'0"',
    seasonKills: 110,
    seasonAces: 14,
    seasonDigs: 52
  },
  {
    id: 'p6',
    name: 'David Kim',
    number: '03',
    position: 'Setter',
    positionCategory: 'SETTERS',
    killPercent: 39,
    statLabel: 'Assists / Set',
    statValue: 9.4,
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCoKqdQyY6kyd-6gdxYC8IBFN24xM2HzrpY7aXci-e5CSmQ-E_BkeIbulCcgnnpc80dXIONyg5CccZMakYTiTSaqoHOpF1FF7FwqX3e5oo_vsIVlsgQHawErwXSgpV5ZoIrPhSW4Tcp4a4VWzzWHIF8yi7ubAz_Ph5iOOrW6dNyr6znEhdqCJzSnJJo59XlMf4psYSvFTB0dLkeR-sui9WF7-qCB_ScqkMV4Vn4d_MN1-O-eaYNVSNO',
    active: false,
    height: "6'1\"",
    spikeReach: '10\'6"',
    blockReach: '10\'2"',
    seasonKills: 22,
    seasonAces: 9,
    seasonDigs: 64
  }
];

export const INITIAL_MATCH_SCORE: MatchScore = {
  homeTeam: 'Titans (Home)',
  awayTeam: 'Vipers (Away)',
  homeLogo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDvUrdtD1i4OdeXwr4NzcuRB7hHwimZUrE4TSulyi7lmSWJkvaOBYotEbjHu1ZCJPQvmll2EXYa_nbPoJGv2d39yMdL_Y0vC7yg9rMwjnLK_4ZsPP7TtksRJeJ2qAAcErhrNxYtjaWa7AYJeMP0GifNLzhFpwYt-gDEuhQBezcw1NhCCXvlYPgggn2Mgil-2yX5jy6qeipkBSmI_3YXpvvaBqhYzNBml-5aJdtYZjTTFVRzkBPDqP-8',
  awayLogo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDAr-qHGgWcn7vGoP-xoD5RfTY1mPH3MgFmo-UfT5vdI17XCGGQ8AjIJ3q4yYw4G9HloOOAetaa9G0UpakKJf9xUKYU5iaotosKZ0kOYoNGqGYJ1xvs3d7kSMY7Rmx9uw1Hzqq0N2dpiICrzhhK2oLtrIXQGqH_4RGGhnTFGik40UJ6M9uR1ui01lq2RR7UMkypwjnqqBWSyU_JDRmX4mMotlyZKQ865QqXtp9vnEjWzlKnB6yECeg_',
  homeScore: 21,
  awayScore: 19,
  setNumber: 3,
  setScores: ['25-22', '23-25'],
  lastAction: 'Kill by #12 Garcia',
  matchTime: '14:32',
  isLive: true
};

export const INITIAL_COURT_PLAYERS: CourtPlayer[] = [
  { positionNumber: 4, playerId: 'p5', name: 'MILLER', playerNumber: '4' },
  { positionNumber: 3, playerId: 'p6', name: 'CHEN', playerNumber: '3' },
  { positionNumber: 2, playerId: 'p2', name: 'SMITH', playerNumber: '2' },
  { positionNumber: 5, playerId: 'p1', name: 'DAVIS', playerNumber: '5' },
  { positionNumber: 6, playerId: 'p4', name: 'LIBERO', playerNumber: '6', isLibero: true },
  { positionNumber: 1, playerId: 'p3', name: 'GARCIA', playerNumber: '1', isServer: true }
];

export const INITIAL_DRILLS: TrainingDrill[] = [
  {
    id: 'd1',
    title: 'Serving Precision',
    description: 'Targeted zones to master your deep-corner float and jump serves.',
    durationMinutes: 15,
    level: 'Advanced',
    category: 'Technique',
    typeCategory: 'Drills',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAVLTpsV7_ImqgsrRklfqBMYGO0UgiHnxO944PdsebjUHdRhcGhEJuQoy1xFBQEE-3CRDbJ37K3QlI0EJGO_-XFN6D2U_FCwYPLyAPkZ9XqIaOZKtovgTZwCnWMy84rWO7H9j8_K70bbZKEu2X8qQS5yr77TTGlsgUsMJ1hI2o1r5puMZYEh4i_imbd5DZpm6gJq8ZT7UknABel4nC73_WZq84D1wXSRYvdSMD6YGlnC4st92YwpghN',
    isStarred: true,
    instructions: [
      'Set up target cones in Deep Zone 1 and Deep Zone 5.',
      'Execute 10 topspin jump serves focusing on toss height consistency.',
      'Execute 10 float serves aiming for dead spaces between line defenders.',
      'Log accuracy rate and target hits in the session completion tracker.'
    ]
  },
  {
    id: 'd2',
    title: 'Transition Defense',
    description: 'Fast-paced lateral movement and block-to-dig transitions.',
    durationMinutes: 25,
    level: 'Intermediate',
    category: 'Agility',
    typeCategory: 'Drills',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD1lFjUnUmMTaT0a3hhIyaMiq30dFSwIwkTL8uxUd2Atwr0sDwSAkdbICYvWhl_ORlcwVI0mumljlbhz32kWkBj_6HLyvuxnovU-5ca1z9qJML9wX5P5UI8G8Ocf0DQTz-JztSvricWbrYlIINPCD8y8AEHqRtrFm4h67C4kOTjjUhTP_vJKHRDByvzYDtcepXTHnUQ25jSAIqGRZvob4brN1wV8PCX-2zmIcdrzUpjgqkX4ObKkYIB',
    isStarred: false,
    instructions: [
      'Start at front left blocking position.',
      'Perform a two-step block jump at the net.',
      'Immediately transition back 10 feet into base defense posture.',
      'React to rapid ball coach toss and dig to target setter position.'
    ]
  },
  {
    id: 'd3',
    title: 'Soft Touch Setting',
    description: 'Finger strength and wrist flick exercises for pin-point accuracy.',
    durationMinutes: 10,
    level: 'Beginner',
    category: 'Basics',
    typeCategory: 'Drills',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCCN2GDfRRsWZ8uDPHHunyd2QzxutwSkGdfsYivx-GQdTnngSDb5AFUfzH0HwIrkqUAVRfuXvAJDY5vHZprpwXQ8DzgysRyVBoHG-i_Klw2tebAbodBixhwyYpeNHYjfpJTPRbJZnzpQ7iidrSXA7QBk1wkYMbeqH8skZzuKoagUv508z0EEhFhNNQjt0Nv6BUaM4MBRSws0vlMCAvKs6ZqDM2UWSd2-LeZJKVWKZMye6JkugIVDzqT',
    isStarred: true,
    instructions: [
      'Wall setting rapid contact drill for 2 minutes continuous.',
      'High-arc setting to target hoop at Position 4.',
      'Back-setting precision drills focusing on neutral hip positioning.'
    ]
  },
  {
    id: 'd4',
    title: 'Explosive Power',
    description: 'Weight-room integration for maximum vertical and core stability.',
    durationMinutes: 40,
    level: 'Pro',
    category: 'Strength',
    typeCategory: 'Workout Plans',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAxBUjKqQD-IbzYwAZKMBLgnSPDXhtToNSnLmUDgqAEejDE-CZmpxBZ3V17qRAkG2gtPnAlKB-H3B098PULA-2_GMZhu31pAouHhlLsI5KYPK81lbKAIau7tZm5uCecNBvc5RjwdiBxx5QVNdyXjZdxToaLQLjbxPr1YnuJV4H6S7n1ICavPluavv4Fm8m5n_dxkeXCRX8BllyUkyyLsjI2j4ZIwk1KyIpgCzrbZWECGAa-IeT-AXWz',
    isStarred: false,
    instructions: [
      '4 sets x 8 reps Depth Jumps into max vertical spike jump.',
      '3 sets x 10 reps Barbell Front Squats @ 75% 1RM.',
      '3 sets x 12 reps Medicine Ball Overhead Slam.'
    ]
  },
  {
    id: 'd5',
    title: 'Game IQ Session',
    description: 'Mental rehearsal and rotational awareness drills for setters and captains.',
    durationMinutes: 20,
    level: 'All Levels',
    category: 'Mental',
    typeCategory: 'Drills',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBvBcjDWO-DvOg20HvDJgYMwyosuYaGnxAvThJFa2cnLqy4Cuc9Koq6oXwE_eJnCw4y7wqTNeayQlSSJPZAoXG91bvlS77fGraZV4gqVM_F06BP2UZYb-F6BDZ7q39yq_8w891uDGm4bpNLpKDBGo6DDFMWHRc_ivPTAjKVr1KUaOA3aLUbTl5QrQCmzhD25fTft3v3QltQxHjsFABOWYTPoZBkmj63RivO2mhmL14W1ZgWmrYLjqlj',
    isStarred: false,
    instructions: [
      'Analyze 3 rotation setups against opposing double block.',
      'Call out ideal hitter distribution based on court coverage gaps.',
      'Review transition defense calls for free-ball vs down-ball scenarios.'
    ]
  }
];

export const INITIAL_SESSIONS: TrainingSession[] = [
  { id: 's1', session: 'Morning Drill', focus: 'Blocking', intensity: 'High', date: 'Today, 08:30 AM' },
  { id: 's2', session: 'Cardio Blast', focus: 'Stamina', intensity: 'Extreme', date: 'Yesterday, 05:00 PM' },
  { id: 's3', session: 'Serving Lab', focus: 'Precision', intensity: 'Medium', date: 'Oct 28, 04:00 PM' }
];

export const INITIAL_STATS: SeasonStats = {
  acesThisSeason: 34,
  killEfficiency: 0.482,
  totalAssists: 118,
  mvpWins: 4,
  serveAccuracy: 78,
  blockEfficiency: 62,
  drillsCompletedCount: 15,
  targetDrillsCount: 20,
  drillsDoneThisWeek: 12,
  trainingHours: 8.5,
  streakDays: 5
};
