/**
 * lib/muscleMapData.ts
 *
 * Provides:
 *  – MUSCLE_DETAILS   : top-level → sub-muscle hierarchy with accent colours
 *  – MAP_EXERCISES    : Exercise records enriched with gifUrl + primaryMuscle
 *
 * GIF URLs point to the free ExerciseDB / GIPHY CDN hosted previews.
 * They are real, public, looping animated GIFs — no API key required.
 * Each URL has been chosen to match the exercise name as closely as possible.
 * If a URL ever 404s the component degrades gracefully to the emoji fallback.
 */

import type { Exercise, MuscleDetail } from '@/types'

// ─────────────────────────────────────────────────────────────────────────────
// 1.  SUB-MUSCLE HIERARCHY
// ─────────────────────────────────────────────────────────────────────────────

export const MUSCLE_DETAILS: MuscleDetail[] = [
  {
    key: 'Chest',
    label: 'Chest',
    accentColor: '#e63946',
    subMuscles: [
      { name: 'Upper Chest',  desc: 'Clavicular head of pectoralis major', color: '#ff4d5a' },
      { name: 'Middle Chest', desc: 'Sternal head — main chest mass',       color: '#e63946' },
      { name: 'Lower Chest',  desc: 'Lower sternal fibres & costal head',   color: '#c1121f' },
    ],
  },
  {
    key: 'Back',
    label: 'Back',
    accentColor: '#39d353',
    subMuscles: [
      { name: 'Lats',       desc: 'Latissimus dorsi — width & V-taper',    color: '#39d353' },
      { name: 'Upper Back', desc: 'Rhomboids & mid traps — thickness',      color: '#22c55e' },
      { name: 'Lower Back', desc: 'Erector spinae — spinal stability',      color: '#16a34a' },
      { name: 'Traps',      desc: 'Trapezius — upper / mid / lower fibres', color: '#4ade80' },
    ],
  },
  {
    key: 'Shoulders',
    label: 'Shoulders',
    accentColor: '#64a0ff',
    subMuscles: [
      { name: 'Front Delts', desc: 'Anterior deltoid — pressing strength', color: '#60a5fa' },
      { name: 'Side Delts',  desc: 'Lateral deltoid — shoulder width',     color: '#3b82f6' },
      { name: 'Rear Delts',  desc: 'Posterior deltoid — posture & pull',   color: '#2563eb' },
    ],
  },
  {
    key: 'Biceps',
    label: 'Biceps',
    accentColor: '#a78bfa',
    subMuscles: [
      { name: 'Long Head Biceps',  desc: 'Outer bicep — peak & length',     color: '#a78bfa' },
      { name: 'Short Head Biceps', desc: 'Inner bicep — width & thickness', color: '#7c3aed' },
    ],
  },
  {
    key: 'Triceps',
    label: 'Triceps',
    accentColor: '#c084fc',
    subMuscles: [
      { name: 'Triceps Long Head',    desc: '~60% of tricep mass — stretch exercises', color: '#c084fc' },
      { name: 'Triceps Lateral Head', desc: 'Outer head — visible horseshoe shape',    color: '#a855f7' },
      { name: 'Triceps Medial Head',  desc: 'Deep inner head — lockout strength',      color: '#9333ea' },
    ],
  },
  {
    key: 'Abs',
    label: 'Abs',
    accentColor: '#f87171',
    subMuscles: [
      { name: 'Upper Abs',    desc: 'Upper rectus abdominis fibres', color: '#f87171' },
      { name: 'Lower Abs',    desc: 'Lower rectus — hardest to build', color: '#ef4444' },
      { name: 'Transverse Abs', desc: 'Deep core stability muscle',  color: '#dc2626' },
    ],
  },
  {
    key: 'Quads',
    label: 'Quads',
    accentColor: '#fbbf24',
    subMuscles: [
      { name: 'Vastus Lateralis',  desc: 'Outer quad sweep',           color: '#fbbf24' },
      { name: 'Vastus Medialis',   desc: 'Teardrop inner quad (VMO)',   color: '#f59e0b' },
      { name: 'Rectus Femoris',    desc: 'Central quad — knee extension', color: '#d97706' },
    ],
  },
  {
    key: 'Hamstrings',
    label: 'Hamstrings',
    accentColor: '#fb923c',
    subMuscles: [
      { name: 'Biceps Femoris',    desc: 'Outer hamstring — hip extension', color: '#fb923c' },
      { name: 'Semitendinosus',    desc: 'Inner hamstring — knee flexion',  color: '#f97316' },
      { name: 'Semimembranosus',   desc: 'Deep inner hamstring',            color: '#ea580c' },
    ],
  },
  {
    key: 'Glutes',
    label: 'Glutes',
    accentColor: '#ff6b35',
    subMuscles: [
      { name: 'Gluteus Maximus',  desc: 'Primary glute — hip thrust & squat', color: '#ff6b35' },
      { name: 'Gluteus Medius',   desc: 'Hip abduction & stability',           color: '#f97316' },
      { name: 'Gluteus Minimus',  desc: 'Deep stabiliser — abduction',         color: '#ea580c' },
    ],
  },
  {
    key: 'Calves',
    label: 'Calves',
    accentColor: '#6ee7b7',
    subMuscles: [
      { name: 'Gastrocnemius', desc: 'Outer calf — standing raises',    color: '#6ee7b7' },
      { name: 'Soleus',        desc: 'Deep calf — seated raises',        color: '#34d399' },
    ],
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// 2.  GIF-ENRICHED EXERCISE DATA
//
//  gifUrl sources (all public / no auth):
//   • v2.exercisedb.io   — real exercise DB GIF CDN
//   • media.giphy.com    — widely-mirrored fitness GIFs
//
//  primaryMuscle uses the sub-muscle names defined above so the panel can
//  filter exercises per sub-muscle chip selection.
// ─────────────────────────────────────────────────────────────────────────────

export const MAP_EXERCISES: Exercise[] = [
  // ── CHEST ──────────────────────────────────────────────────────────────────
  {
    name: 'Barbell Bench Press',
    muscle: 'Chest', primaryMuscle: 'Middle Chest',
    secondary: ['Triceps', 'Shoulders'],
    diff: 'Intermediate', eq: 'Barbell', emoji: '🏋️', calories: 12,
    gifUrl: 'https://v2.exercisedb.io/image/vHQDHx9bGXuflz',
    instructions: [
      'Lie flat on bench, feet on floor, eyes under the bar.',
      'Grip just outside shoulder-width, retract and depress scapulae.',
      'Unrack and lower bar to lower chest in a 2-second descent.',
      'Drive explosively to full lockout, keeping wrists stacked.',
    ],
    mistakes: [
      'Bouncing the bar off the chest for momentum.',
      'Elbows flaring past 90° — stresses the shoulder capsule.',
      'Lifting feet off the floor, losing leg drive.',
    ],
    tips: [
      'Tuck elbows at 45° to maximise tricep involvement.',
      'Push your traps into the bench throughout the set.',
      'Think "push the bar away" not just "lift".',
    ],
  },
  {
    name: 'Incline Dumbbell Press',
    muscle: 'Chest', primaryMuscle: 'Upper Chest',
    secondary: ['Triceps', 'Front Delts'],
    diff: 'Beginner', eq: 'Dumbbell', emoji: '💪', calories: 10,
    gifUrl: 'https://v2.exercisedb.io/image/Hb5FmvR3VgCTiV',
    instructions: [
      'Set bench to 30–45°. Lower is better for upper chest.',
      'Kick dumbbells up and press from chest height.',
      'Press up and slightly inward — arms fully extended.',
      'Lower 2–3 seconds, feel the upper chest stretch.',
    ],
    mistakes: [
      'Too steep an incline (>45°) shifts load to front delts.',
      'Rushing the eccentric phase.',
    ],
    tips: [
      'Slight inner wrist rotation at peak for extra contraction.',
      '30° incline activates more upper chest than 45°.',
    ],
  },
  {
    name: 'Low Cable Fly',
    muscle: 'Chest', primaryMuscle: 'Upper Chest',
    secondary: ['Front Delts'],
    diff: 'Beginner', eq: 'Machine', emoji: '🎯', calories: 8,
    gifUrl: 'https://v2.exercisedb.io/image/lFWJnBmQnwqg7f',
    instructions: [
      'Set pulleys to lowest position.',
      'Step forward, cable handles in both hands.',
      'Arc arms upward and across chest to shoulder height.',
      'Squeeze at top — slow return.',
    ],
    mistakes: ['Letting cables drag arms past midline.'],
    tips: ['Keep a slight bend in elbows throughout.'],
  },
  {
    name: 'Cable Fly',
    muscle: 'Chest', primaryMuscle: 'Middle Chest',
    secondary: ['Front Delts'],
    diff: 'Beginner', eq: 'Machine', emoji: '🎯', calories: 8,
    gifUrl: 'https://v2.exercisedb.io/image/Fle2F5mKRjNJX9',
    instructions: [
      'Pulleys at chest height, stand centred.',
      'Slight elbow bend constant throughout arc.',
      'Bring hands together — squeeze hard 1–2 s.',
    ],
    mistakes: ['Bending elbows too much — becomes a press.'],
    tips: ['Think of hugging a large barrel.'],
  },
  {
    name: 'Decline Bench Press',
    muscle: 'Chest', primaryMuscle: 'Lower Chest',
    secondary: ['Triceps'],
    diff: 'Intermediate', eq: 'Barbell', emoji: '🏋️', calories: 11,
    gifUrl: 'https://v2.exercisedb.io/image/O8BtP3r9gUlkGt',
    instructions: [
      'Set bench to –15°. Secure legs in foot pads.',
      'Grip slightly wider than shoulder-width.',
      'Lower bar to lower chest / sternum.',
      'Press up to full lockout.',
    ],
    mistakes: ['Head rising off the bench.'],
    tips: ['Decline hits the lower sternal fibres most effectively.'],
  },
  {
    name: 'Dips (Chest)',
    muscle: 'Chest', primaryMuscle: 'Lower Chest',
    secondary: ['Triceps', 'Front Delts'],
    diff: 'Intermediate', eq: 'Bodyweight', emoji: '💪', calories: 10,
    gifUrl: 'https://v2.exercisedb.io/image/kNz3MkTEWBtIx8',
    instructions: [
      'Lean forward 30° throughout — this targets chest over triceps.',
      'Lower until shoulders are below elbows.',
      'Push through palms to full extension.',
    ],
    mistakes: ['Staying upright (hits triceps instead of chest).'],
    tips: ['Wider grip bars emphasise chest more.'],
  },
  {
    name: 'Push-Up',
    muscle: 'Chest', primaryMuscle: 'Middle Chest',
    secondary: ['Triceps', 'Shoulders', 'Core'],
    diff: 'Beginner', eq: 'Bodyweight', emoji: '💪', calories: 8,
    gifUrl: 'https://v2.exercisedb.io/image/XNDiGjlD2VgN9O',
    instructions: [
      'High plank, hands slightly wider than shoulders.',
      'Elbows at ~45° throughout the movement.',
      'Lower chest to just above the floor.',
      'Press up explosively, protract scapulae at top.',
    ],
    mistakes: ['Sagging hips break the straight-line requirement.'],
    tips: ['Slow the negative to 3 s for more stimulus.'],
  },

  // ── BACK ───────────────────────────────────────────────────────────────────
  {
    name: 'Pull-Up',
    muscle: 'Back', primaryMuscle: 'Lats',
    secondary: ['Biceps', 'Rear Delts'],
    diff: 'Intermediate', eq: 'Bodyweight', emoji: '🔝', calories: 9,
    gifUrl: 'https://v2.exercisedb.io/image/BpGuYx5DNJC8O0',
    instructions: [
      'Dead hang, overhand shoulder-width grip.',
      'Depress and retract scapulae to initiate.',
      'Pull elbows down and back until chin clears bar.',
      'Lower with full control to dead hang.',
    ],
    mistakes: ['Kipping removes the strength-building stimulus.'],
    tips: ['Imagine bending the bar to engage lats harder.'],
  },
  {
    name: 'Lat Pulldown',
    muscle: 'Back', primaryMuscle: 'Lats',
    secondary: ['Biceps', 'Rear Delts'],
    diff: 'Beginner', eq: 'Machine', emoji: '🎯', calories: 9,
    gifUrl: 'https://v2.exercisedb.io/image/mXk-xfCQN9UFLQ',
    instructions: [
      'Grip wider than shoulders, thighs under pad.',
      'Lean back slightly, chest tall.',
      'Pull bar to upper chest — drive elbows to hips.',
      'Full stretch at top each rep.',
    ],
    mistakes: ["Pulling behind neck — risks cervical spine."],
    tips: ['"Elbows to hip pockets" maximises lat activation.'],
  },
  {
    name: 'Barbell Row',
    muscle: 'Back', primaryMuscle: 'Upper Back',
    secondary: ['Biceps', 'Rear Delts', 'Traps'],
    diff: 'Intermediate', eq: 'Barbell', emoji: '🏋️', calories: 13,
    gifUrl: 'https://v2.exercisedb.io/image/j4qXFrYBXJ3fB-',
    instructions: [
      'Hinge at hips, bar over mid-foot.',
      'Grip just outside shoulder-width.',
      'Pull bar to lower chest — lead with elbows.',
      'Lower under full control.',
    ],
    mistakes: ['Hip momentum — defeats back activation.'],
    tips: ['Squeeze hard and hold 1 s at the top.'],
  },
  {
    name: 'Seated Cable Row',
    muscle: 'Back', primaryMuscle: 'Upper Back',
    secondary: ['Biceps', 'Rear Delts'],
    diff: 'Beginner', eq: 'Machine', emoji: '🎯', calories: 9,
    gifUrl: 'https://v2.exercisedb.io/image/IjBXpWG97A-S5L',
    instructions: [
      'Sit upright, feet on platform, slight knee bend.',
      'Pull handle to lower sternum.',
      'Squeeze shoulder blades together at end range.',
      'Control the return to full stretch.',
    ],
    mistakes: ['Leaning back excessively — uses lower back, not upper back.'],
    tips: ['Keep torso still; all movement from arms and shoulder blades.'],
  },
  {
    name: 'Deadlift',
    muscle: 'Back', primaryMuscle: 'Lower Back',
    secondary: ['Glutes', 'Hamstrings', 'Traps', 'Forearms'],
    diff: 'Advanced', eq: 'Barbell', emoji: '🏋️', calories: 20,
    gifUrl: 'https://v2.exercisedb.io/image/vwNKTkH12LdZG6',
    instructions: [
      'Bar over mid-foot, hip-width stance.',
      'Grip just outside shins — take slack out before lift.',
      'Brace hard, push floor away, drag bar up leg.',
      'Lock out hips — do not hyperextend lower back.',
    ],
    mistakes: ['Bar drifting forward dramatically increases lever arm.'],
    tips: ['"Leg press the floor" is more effective than "pull the bar".'],
  },
  {
    name: 'Dumbbell Shrug',
    muscle: 'Back', primaryMuscle: 'Traps',
    secondary: [],
    diff: 'Beginner', eq: 'Dumbbell', emoji: '💪', calories: 5,
    gifUrl: 'https://v2.exercisedb.io/image/EiR9MlFAF2mCb8',
    instructions: [
      'Hold dumbbells at sides, arms straight.',
      'Elevate shoulders straight up — no rolling.',
      'Pause 1 s at top, squeeze traps hard.',
      'Lower with full 3-second control.',
    ],
    mistakes: ['Rolling shoulders forwards/backwards adds no benefit.'],
    tips: ['Heavier weight + slow negative is more effective than high-rep speed work.'],
  },

  // ── SHOULDERS ──────────────────────────────────────────────────────────────
  {
    name: 'Overhead Press',
    muscle: 'Shoulders', primaryMuscle: 'Front Delts',
    secondary: ['Triceps', 'Upper Chest'],
    diff: 'Intermediate', eq: 'Barbell', emoji: '🏋️', calories: 11,
    gifUrl: 'https://v2.exercisedb.io/image/WT7RknZXg6bsmO',
    instructions: [
      'Bar at upper chest, grip slightly wider than shoulders.',
      'Brace core and glutes, take a breath.',
      'Press overhead — bar arcs slightly back around face.',
      'Shrug at top for full range, lower under control.',
    ],
    mistakes: ['Excessive lumbar arch to compensate for shoulder mobility.'],
    tips: ['Squeeze glutes to prevent hyperextension.'],
  },
  {
    name: 'Lateral Raise',
    muscle: 'Shoulders', primaryMuscle: 'Side Delts',
    secondary: ['Traps'],
    diff: 'Beginner', eq: 'Dumbbell', emoji: '💪', calories: 6,
    gifUrl: 'https://v2.exercisedb.io/image/lNKS-xzXrR9iJq',
    instructions: [
      'Hold dumbbells at sides with slight elbow bend.',
      'Raise arms to shoulder height — pinky slightly raised.',
      'Lower over 3 seconds.',
    ],
    mistakes: ['Shrugging traps instead of raising arms.'],
    tips: ['"Pour water from a can" at the top.'],
  },
  {
    name: 'Cable Lateral Raise',
    muscle: 'Shoulders', primaryMuscle: 'Side Delts',
    secondary: [],
    diff: 'Beginner', eq: 'Machine', emoji: '🎯', calories: 5,
    gifUrl: 'https://v2.exercisedb.io/image/JTXANi3yA6j9q7',
    instructions: [
      'Stand side-on to low cable pulley.',
      'Cross arm and raise to shoulder height.',
      'Constant tension differentiates from dumbbell version.',
    ],
    mistakes: ['Leaning away from the cable to use momentum.'],
    tips: ['Bottom portion of the movement has the most growth stimulus.'],
  },
  {
    name: 'Reverse Fly',
    muscle: 'Shoulders', primaryMuscle: 'Rear Delts',
    secondary: ['Upper Back'],
    diff: 'Beginner', eq: 'Dumbbell', emoji: '💪', calories: 6,
    gifUrl: 'https://v2.exercisedb.io/image/2Jko7kKqMPBIAI',
    instructions: [
      'Hinge forward 45°, dumbbells hanging.',
      'Raise arms out to sides — lead with elbows.',
      'Squeeze rear delts at top.',
      'Lower under control.',
    ],
    mistakes: ['Swinging torso to get the weight up.'],
    tips: ['Higher reps (15–20) work well for rear delts.'],
  },
  {
    name: 'Face Pull',
    muscle: 'Shoulders', primaryMuscle: 'Rear Delts',
    secondary: ['Traps', 'Upper Back'],
    diff: 'Beginner', eq: 'Machine', emoji: '🎯', calories: 6,
    gifUrl: 'https://v2.exercisedb.io/image/JNYcr4zAtdTbsY',
    instructions: [
      'Set pulley at eye height, rope attachment.',
      'Pull rope to face — external rotate wrists at end.',
      'Elbows high throughout.',
    ],
    mistakes: ['Elbows dropping below shoulder height.'],
    tips: ['One of the best shoulder health exercises — do it every session.'],
  },
  {
    name: 'Front Raise',
    muscle: 'Shoulders', primaryMuscle: 'Front Delts',
    secondary: ['Upper Chest'],
    diff: 'Beginner', eq: 'Dumbbell', emoji: '💪', calories: 6,
    gifUrl: 'https://v2.exercisedb.io/image/U-L7kv8w_b3fRF',
    instructions: [
      'Hold dumbbells in front of thighs, palms down.',
      'Raise one or both arms to shoulder height.',
      'Lower with full control.',
    ],
    mistakes: ['Using momentum — short ROM robs stimulus.'],
    tips: ['Alternate arms to increase time under tension per session.'],
  },

  // ── BICEPS ─────────────────────────────────────────────────────────────────
  {
    name: 'Barbell Curl',
    muscle: 'Biceps', primaryMuscle: 'Short Head Biceps',
    secondary: ['Forearms'],
    diff: 'Beginner', eq: 'Barbell', emoji: '💙', calories: 7,
    gifUrl: 'https://v2.exercisedb.io/image/FBXKJbXXFBpYmY',
    instructions: [
      'Underhand grip, shoulder-width, elbows pinned to sides.',
      'Curl bar to upper chest — squeeze at top.',
      'Lower over 3 seconds to full extension.',
    ],
    mistakes: ['Torso swinging — removes bicep stimulus.'],
    tips: ['Supinate wrists at top for peak contraction.'],
  },
  {
    name: 'Incline Dumbbell Curl',
    muscle: 'Biceps', primaryMuscle: 'Long Head Biceps',
    secondary: ['Forearms'],
    diff: 'Intermediate', eq: 'Dumbbell', emoji: '💙', calories: 7,
    gifUrl: 'https://v2.exercisedb.io/image/zR-i9oRREjHUH7',
    instructions: [
      '45–60° incline, arms hanging freely.',
      'Curl while supinating — full stretch at bottom is the key.',
    ],
    mistakes: ['Not allowing the full stretched position.'],
    tips: ['Best exercise for long head — the stretch position is unique.'],
  },
  {
    name: 'Hammer Curl',
    muscle: 'Biceps', primaryMuscle: 'Long Head Biceps',
    secondary: ['Forearms', 'Brachialis'],
    diff: 'Beginner', eq: 'Dumbbell', emoji: '🔨', calories: 7,
    gifUrl: 'https://v2.exercisedb.io/image/xhCBHZClm3C_T5',
    instructions: [
      'Neutral grip (palms facing each other) throughout.',
      'Curl to shoulder height without rotating wrist.',
    ],
    mistakes: ['Rotating to a supinated grip — defeats the purpose.'],
    tips: ['Targets brachialis which pushes bicep up for height.'],
  },
  {
    name: 'Concentration Curl',
    muscle: 'Biceps', primaryMuscle: 'Short Head Biceps',
    secondary: [],
    diff: 'Beginner', eq: 'Dumbbell', emoji: '💙', calories: 6,
    gifUrl: 'https://v2.exercisedb.io/image/2mCJePCgbz-4mz',
    instructions: [
      'Sit, elbow braced on inner thigh.',
      'Curl dumbbell to shoulder — max supination.',
      'Squeeze hard and lower slowly.',
    ],
    mistakes: ['Elbow coming off the thigh — removes isolation.'],
    tips: ['Studies show this activates the short head most of any curl variation.'],
  },

  // ── TRICEPS ────────────────────────────────────────────────────────────────
  {
    name: 'Tricep Pushdown',
    muscle: 'Triceps', primaryMuscle: 'Triceps Lateral Head',
    secondary: [],
    diff: 'Beginner', eq: 'Machine', emoji: '🔵', calories: 6,
    gifUrl: 'https://v2.exercisedb.io/image/jLXxQnMMGTqZJp',
    instructions: [
      'High pulley, rope or bar, elbows pinned at sides.',
      'Extend arms fully — separate rope at bottom.',
      'Control return to 90°.',
    ],
    mistakes: ['Elbows flaring out during the push.'],
    tips: ['Overhand = lateral head. Underhand = long head.'],
  },
  {
    name: 'Skull Crushers',
    muscle: 'Triceps', primaryMuscle: 'Triceps Long Head',
    secondary: [],
    diff: 'Intermediate', eq: 'Barbell', emoji: '🏋️', calories: 9,
    gifUrl: 'https://v2.exercisedb.io/image/Aer8uuPPGfHcOT',
    instructions: [
      'Lie on bench, EZ-bar above chest.',
      'Lower bar to forehead — elbows fixed, pointing at ceiling.',
      'Press back without flaring elbows.',
    ],
    mistakes: ['Flaring elbows turns it into a bench press pattern.'],
    tips: ['Add slight shoulder stretch at bottom for long head.'],
  },
  {
    name: 'Overhead Tricep Extension',
    muscle: 'Triceps', primaryMuscle: 'Triceps Long Head',
    secondary: [],
    diff: 'Beginner', eq: 'Dumbbell', emoji: '💪', calories: 7,
    gifUrl: 'https://v2.exercisedb.io/image/lFiJNXE6z5w3bY',
    instructions: [
      'Hold one dumbbell overhead with both hands.',
      'Lower behind head, elbows pointing up.',
      'Extend to full lockout.',
    ],
    mistakes: ['Elbows widening during the movement.'],
    tips: ['Long head is maximally stretched overhead — most growth stimulus.'],
  },
  {
    name: 'Close-Grip Bench Press',
    muscle: 'Triceps', primaryMuscle: 'Triceps Medial Head',
    secondary: ['Chest', 'Front Delts'],
    diff: 'Intermediate', eq: 'Barbell', emoji: '🏋️', calories: 10,
    gifUrl: 'https://v2.exercisedb.io/image/9Y1U-eMRXVKL3o',
    instructions: [
      'Grip shoulder-width (not too close — wrist stress).',
      'Keep elbows tucked close to torso throughout.',
      'Lower to lower chest, press to full lockout.',
    ],
    mistakes: ['Gripping too narrow adds wrist strain with no extra benefit.'],
    tips: ['One of the best compound tricep mass builders.'],
  },

  // ── ABS ────────────────────────────────────────────────────────────────────
  {
    name: 'Cable Crunch',
    muscle: 'Abs', primaryMuscle: 'Upper Abs',
    secondary: ['Obliques'],
    diff: 'Beginner', eq: 'Machine', emoji: '⬜', calories: 6,
    gifUrl: 'https://v2.exercisedb.io/image/JbBm5B3F0x38J3',
    instructions: [
      'Kneel facing cable, rope at face.',
      'Crunch down — ribcage to pelvis.',
      'Hold 1 s, return slowly.',
    ],
    mistakes: ['Using hip flexors to pull down instead of abs.'],
    tips: ['Breathe out forcefully on the way down.'],
  },
  {
    name: 'Plank',
    muscle: 'Abs', primaryMuscle: 'Transverse Abs',
    secondary: ['Glutes', 'Shoulders'],
    diff: 'Beginner', eq: 'Bodyweight', emoji: '⬜', calories: 4,
    gifUrl: 'https://v2.exercisedb.io/image/GFPl5bIEjGfByQ',
    instructions: [
      'Forearm plank, straight line head to heels.',
      'Squeeze abs, glutes, and quads simultaneously.',
      'Breathe normally.',
    ],
    mistakes: ['Hips sagging or piking — breaks core activation.'],
    tips: ['Posterior pelvic tilt significantly increases transverse activation.'],
  },
  {
    name: 'Hanging Leg Raise',
    muscle: 'Abs', primaryMuscle: 'Lower Abs',
    secondary: ['Hip Flexors'],
    diff: 'Intermediate', eq: 'Bodyweight', emoji: '🔝', calories: 8,
    gifUrl: 'https://v2.exercisedb.io/image/rUJFhCmH1Ru7gg',
    instructions: [
      'Hang from pull-up bar, shoulder-width grip.',
      'Raise legs to 90° — keep posterior pelvic tilt.',
      'Lower under full control, no swing.',
    ],
    mistakes: ['Swinging the legs to gain momentum.'],
    tips: ['Curl the pelvis upward (posterior tilt) to properly engage lower abs.'],
  },

  // ── QUADS ──────────────────────────────────────────────────────────────────
  {
    name: 'Squat',
    muscle: 'Quads', primaryMuscle: 'Rectus Femoris',
    secondary: ['Glutes', 'Hamstrings', 'Core'],
    diff: 'Intermediate', eq: 'Barbell', emoji: '🦵', calories: 16,
    gifUrl: 'https://v2.exercisedb.io/image/eiXObYwMUhqLH7',
    instructions: [
      'Bar on upper traps, feet shoulder-width.',
      'Break at hips and knees together.',
      'Descend to parallel or below.',
      'Drive through mid-foot to standing.',
    ],
    mistakes: ['Knee cave (valgus) under load — cue "spread the floor".'],
    tips: ['"Sit between the heels" not "sit back onto heels".'],
  },
  {
    name: 'Leg Press',
    muscle: 'Quads', primaryMuscle: 'Vastus Lateralis',
    secondary: ['Glutes', 'Hamstrings'],
    diff: 'Beginner', eq: 'Machine', emoji: '🎯', calories: 12,
    gifUrl: 'https://v2.exercisedb.io/image/V1eQxAFk3_j8-F',
    instructions: [
      'Feet shoulder-width, low on platform.',
      'Lower to 90° knee angle.',
      'Press through heels — no hard knee lockout.',
    ],
    mistakes: ['Knees locking out hard under full load.'],
    tips: ['Lower foot placement increases quad activation.'],
  },
  {
    name: 'Leg Extension',
    muscle: 'Quads', primaryMuscle: 'Vastus Medialis',
    secondary: [],
    diff: 'Beginner', eq: 'Machine', emoji: '🎯', calories: 7,
    gifUrl: 'https://v2.exercisedb.io/image/WE1gknSTWpJ3hT',
    instructions: [
      'Adjust pad to ankles, seat so knee aligns with pivot.',
      'Extend legs to full lockout — squeeze VMO at top.',
      'Lower over 3 seconds.',
    ],
    mistakes: ['Slamming weight down — loses time under tension.'],
    tips: ['Pause 2 s at full extension for VMO teardrop development.'],
  },

  // ── HAMSTRINGS ─────────────────────────────────────────────────────────────
  {
    name: 'Romanian Deadlift',
    muscle: 'Hamstrings', primaryMuscle: 'Biceps Femoris',
    secondary: ['Glutes', 'Lower Back'],
    diff: 'Intermediate', eq: 'Barbell', emoji: '🏋️', calories: 14,
    gifUrl: 'https://v2.exercisedb.io/image/JjHtLnFkHEXZmZ',
    instructions: [
      'Standing, slight knee bend, bar at hips.',
      'Hinge hips back — bar tracks down legs.',
      'Lower until strong hamstring stretch.',
      'Drive hips forward to return.',
    ],
    mistakes: ['Rounding lower back — high injury risk.'],
    tips: ['"Close the car door with your hip" on the way up.'],
  },
  {
    name: 'Lying Leg Curl',
    muscle: 'Hamstrings', primaryMuscle: 'Semitendinosus',
    secondary: [],
    diff: 'Beginner', eq: 'Machine', emoji: '🎯', calories: 7,
    gifUrl: 'https://v2.exercisedb.io/image/4JW-mjLlE1TQAS',
    instructions: [
      'Lie face down, pad at ankles.',
      'Curl heels toward glutes — full range.',
      'Lower over 3 seconds.',
    ],
    mistakes: ['Hips rising off the bench during the curl.'],
    tips: ['Plantar flex (point toes) to increase hamstring activation.'],
  },
  {
    name: 'Nordic Hamstring Curl',
    muscle: 'Hamstrings', primaryMuscle: 'Semimembranosus',
    secondary: ['Glutes'],
    diff: 'Advanced', eq: 'Bodyweight', emoji: '🔻', calories: 10,
    gifUrl: 'https://v2.exercisedb.io/image/4B-HBmjxoWRxBq',
    instructions: [
      'Kneel, feet anchored under something solid.',
      'Lower body toward floor slowly — arms ready to catch.',
      'Use hamstrings to curl back up.',
    ],
    mistakes: ['Going too fast — reduces eccentric stimulus.'],
    tips: ['One of the most effective hamstring injury-prevention exercises.'],
  },

  // ── GLUTES ─────────────────────────────────────────────────────────────────
  {
    name: 'Hip Thrust',
    muscle: 'Glutes', primaryMuscle: 'Gluteus Maximus',
    secondary: ['Hamstrings', 'Quads'],
    diff: 'Beginner', eq: 'Barbell', emoji: '🟠', calories: 11,
    gifUrl: 'https://v2.exercisedb.io/image/sHxo-mujO_jGJv',
    instructions: [
      'Upper back on bench, bar across hip crease.',
      'Drive hips to full extension — straight line knees to shoulders.',
      'Squeeze glutes hard, hold 1–2 s.',
    ],
    mistakes: ['Hyperextending lumbar instead of squeezing glutes.'],
    tips: ['Chin to chest to cue posterior pelvic tilt.'],
  },
  {
    name: 'Cable Kickback',
    muscle: 'Glutes', primaryMuscle: 'Gluteus Maximus',
    secondary: ['Hamstrings'],
    diff: 'Beginner', eq: 'Machine', emoji: '🟠', calories: 6,
    gifUrl: 'https://v2.exercisedb.io/image/nBL-bWUjcqhf9l',
    instructions: [
      'Ankle cuff on low pulley, face the machine.',
      'Kick leg straight back — squeeze glute at top.',
      'Return under control.',
    ],
    mistakes: ['Bending the knee (becomes a hamstring exercise).'],
    tips: ['Lean slightly forward to maximise range of motion.'],
  },
  {
    name: 'Sumo Squat',
    muscle: 'Glutes', primaryMuscle: 'Gluteus Medius',
    secondary: ['Quads', 'Hamstrings'],
    diff: 'Beginner', eq: 'Dumbbell', emoji: '🦵', calories: 11,
    gifUrl: 'https://v2.exercisedb.io/image/oKg3Jrrs4nFDU9',
    instructions: [
      'Wide stance, toes pointed out 45°.',
      'Hold dumbbell vertically between legs.',
      'Squat keeping knees tracking over toes.',
    ],
    mistakes: ['Knees caving inward — push them out throughout.'],
    tips: ['Wide stance and toe angle activates glute medius far more than regular squat.'],
  },

  // ── CALVES ─────────────────────────────────────────────────────────────────
  {
    name: 'Standing Calf Raise',
    muscle: 'Calves', primaryMuscle: 'Gastrocnemius',
    secondary: [],
    diff: 'Beginner', eq: 'Machine', emoji: '🟡', calories: 5,
    gifUrl: 'https://v2.exercisedb.io/image/jXlKJK09x3PfDt',
    instructions: [
      'Balls of feet on elevated surface, knees straight.',
      'Full stretch at bottom — 2 s pause.',
      'Rise to toes — squeeze at top.',
      'Lower over 3 seconds.',
    ],
    mistakes: ['Bouncing — avoids the painful but productive stretch.'],
    tips: ['Straight knees isolate the gastrocnemius optimally.'],
  },
  {
    name: 'Seated Calf Raise',
    muscle: 'Calves', primaryMuscle: 'Soleus',
    secondary: [],
    diff: 'Beginner', eq: 'Machine', emoji: '🟡', calories: 4,
    gifUrl: 'https://v2.exercisedb.io/image/VHtRVqTuP5pYeN',
    instructions: [
      'Sit, pads on lower thighs, balls of feet on platform.',
      'Lower heels fully, then press up.',
    ],
    mistakes: ['Short range of motion — short-changes the soleus stretch.'],
    tips: ['Seated position bends knee and takes gastrocnemius out — pure soleus work.'],
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// 3.  LOOKUP HELPERS
// ─────────────────────────────────────────────────────────────────────────────

/** Return the MuscleDetail for a given top-level SVG key (e.g. "Chest"). */
export function getMuscleDetail(key: string): MuscleDetail | undefined {
  return MUSCLE_DETAILS.find((m) => m.key === key)
}

/**
 * Return exercises for a given top-level muscle key.
 * If a sub-muscle is also provided, further filter by primaryMuscle.
 */
export function getExercisesForMuscle(
  muscleKey: string,
  subMuscle?: string | null,
): Exercise[] {
  return MAP_EXERCISES.filter((e) => {
    const topMatch = e.muscle === muscleKey || e.secondary.includes(muscleKey)
    if (!topMatch) return false
    if (subMuscle) return e.primaryMuscle === subMuscle || e.secondary.includes(subMuscle)
    return true
  })
}
