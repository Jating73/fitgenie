import type { Exercise, Split, MuscleGroup, Challenge } from '@/types'

export const MUSCLES: MuscleGroup[] = [
  { name: 'Chest', icon: '💪', count: 28, tag: 'upper', tagLabel: 'Upper Body' },
  { name: 'Back', icon: '🦾', count: 32, tag: 'upper', tagLabel: 'Upper Body' },
  { name: 'Shoulders', icon: '🔴', count: 22, tag: 'upper', tagLabel: 'Upper Body' },
  { name: 'Biceps', icon: '💙', count: 18, tag: 'upper', tagLabel: 'Upper Body' },
  { name: 'Triceps', icon: '🔵', count: 16, tag: 'upper', tagLabel: 'Upper Body' },
  { name: 'Forearms', icon: '✊', count: 12, tag: 'upper', tagLabel: 'Upper Body' },
  { name: 'Abs', icon: '⬜', count: 20, tag: 'core', tagLabel: 'Core' },
  { name: 'Obliques', icon: '🔶', count: 10, tag: 'core', tagLabel: 'Core' },
  { name: 'Legs', icon: '🦵', count: 35, tag: 'lower', tagLabel: 'Lower Body' },
  { name: 'Quads', icon: '⚡', count: 18, tag: 'lower', tagLabel: 'Lower Body' },
  { name: 'Hamstrings', icon: '🔻', count: 14, tag: 'lower', tagLabel: 'Lower Body' },
  { name: 'Glutes', icon: '🟠', count: 16, tag: 'lower', tagLabel: 'Lower Body' },
  { name: 'Calves', icon: '🟡', count: 10, tag: 'lower', tagLabel: 'Lower Body' },
  { name: 'Full Body', icon: '🌐', count: 24, tag: 'upper', tagLabel: 'Compound' },
  { name: 'Cardio', icon: '❤️', count: 20, tag: 'cardio', tagLabel: 'Cardio' },
]

export const EXERCISES: Exercise[] = [
  {
    name: 'Dumbbell Bench Press',
    muscle: 'Chest',
    secondary: ['Triceps', 'Shoulders'],
    diff: 'Beginner',
    eq: 'Dumbbell',
    emoji: '💪',
    calories: 10,
    instructions: [
      'Lie flat on a bench holding dumbbells at chest level.',
      'Press the weights upward until arms are fully extended.',
      'Lower slowly until elbows reach bench level.',
      'Repeat while keeping shoulder blades tight.',
    ],
    mistakes: [
      'Letting elbows flare excessively.',
      'Bouncing dumbbells at the bottom.',
    ],
    tips: [
      'Keep your shoulder blades retracted.',
      'Control the negative portion of the movement.',
    ],
    youtubeUrl: 'https://www.youtube.com/shorts/WbCEvFA0NJs',
  },
  {
    name: 'Chest Dips',
    muscle: 'Chest',
    secondary: ['Triceps', 'Shoulders'],
    diff: 'Intermediate',
    eq: 'Bodyweight',
    emoji: '💪',
    calories: 11,
    instructions: [
      'Hold yourself on parallel dip bars.',
      'Lean slightly forward.',
      'Lower body by bending elbows.',
      'Push yourself back up until arms are straight.',
    ],
    mistakes: [
      'Going too deep causing shoulder strain.',
      'Keeping body completely upright.',
    ],
    tips: [
      'Leaning forward targets the chest more.',
    ],
    youtubeUrl: "https://www.youtube.com/shorts/eicOUO9WaJc",
  },
  {
    name: 'Decline Bench Press',
    muscle: 'Chest',
    secondary: ['Triceps'],
    diff: 'Intermediate',
    eq: 'Barbell',
    emoji: '🏋️',
    calories: 11,
    instructions: [
      'Lie on a decline bench with feet secured.',
      'Lower the bar toward lower chest.',
      'Press the bar back to full extension.',
    ],
    mistakes: [
      'Lowering bar too high toward neck.',
    ],
    tips: [
      'Keep elbows at about 45 degrees.',
    ],
    youtubeUrl: "https://www.youtube.com/shorts/zUWQG9iWqC4"
  },
  {
    name: 'Seated Cable Row',
    muscle: 'Back',
    secondary: ['Biceps'],
    diff: 'Beginner',
    eq: 'Machine',
    emoji: '🎯',
    calories: 10,
    instructions: [
      'Sit at a cable row station with feet on platform.',
      'Pull the handle toward your waist.',
      'Squeeze shoulder blades together.',
      'Return slowly.',
    ],
    mistakes: [
      'Rounding the lower back.',
    ],
    tips: [
      'Keep chest up during the movement.',
    ],
    youtubeUrl: "https://www.youtube.com/shorts/8QuMq1GMMng"
  },
  {
    name: 'T-Bar Row',
    muscle: 'Back',
    secondary: ['Biceps', 'Traps'],
    diff: 'Intermediate',
    eq: 'Machine',
    emoji: '🏋️',
    calories: 12,
    instructions: [
      'Stand over T-bar row machine.',
      'Grip handles and pull toward chest.',
      'Lower under control.',
    ],
    mistakes: [
      'Using too much momentum.',
    ],
    tips: [
      'Focus on squeezing shoulder blades.',
    ],
    youtubeUrl: "https://www.youtube.com/shorts/ZbOUxXRS42s"
  },
  {
    name: 'Face Pull',
    muscle: 'Shoulders',
    secondary: ['Rear Delts', 'Traps'],
    diff: 'Beginner',
    eq: 'Machine',
    emoji: '🎯',
    calories: 6,
    instructions: [
      'Attach rope to cable at face height.',
      'Pull rope toward your face.',
      'Separate the rope at the end.',
    ],
    mistakes: [
      'Pulling too low toward chest.',
    ],
    tips: [
      'Focus on rear delt contraction.',
    ],
    youtubeUrl: "https://www.youtube.com/shorts/IeOqdw9WI90"
  },
  {
    name: 'Rear Delt Fly',
    muscle: 'Shoulders',
    secondary: ['Upper Back'],
    diff: 'Beginner',
    eq: 'Dumbbell',
    emoji: '💪',
    calories: 6,
    instructions: [
      'Bend slightly at the hips.',
      'Raise dumbbells out to the sides.',
      'Squeeze shoulder blades.',
    ],
    mistakes: [
      'Using momentum.',
    ],
    tips: [
      'Keep movement slow and controlled.',
    ],
    youtubeUrl: "https://www.youtube.com/shorts/7tgx6QHB0-A"
  },
  {
    name: 'Arnold Press',
    muscle: 'Shoulders',
    secondary: ['Triceps'],
    diff: 'Intermediate',
    eq: 'Dumbbell',
    emoji: '💪',
    calories: 9,
    instructions: [
      'Start with dumbbells in front of shoulders.',
      'Rotate palms outward while pressing overhead.',
      'Lower slowly reversing motion.',
    ],
    mistakes: [
      'Using excessive weight.',
    ],
    tips: [
      'Control the rotation.',
    ],
    youtubeUrl: "https://www.youtube.com/shorts/6K_N9AGhItQ"
  },
  {
    name: 'Hammer Curl',
    muscle: 'Biceps',
    secondary: ['Forearms'],
    diff: 'Beginner',
    eq: 'Dumbbell',
    emoji: '💙',
    calories: 7,
    instructions: [
      'Hold dumbbells with neutral grip.',
      'Curl weights toward shoulders.',
      'Lower slowly.',
    ],
    mistakes: [
      'Swinging body.',
    ],
    tips: [
      'Keep elbows tight to sides.',
    ],
    youtubeUrl: "https://www.youtube.com/shorts/VuEclXR7sZY"
  },
  {
    name: 'Concentration Curl',
    muscle: 'Biceps',
    secondary: [],
    diff: 'Beginner',
    eq: 'Dumbbell',
    emoji: '💙',
    calories: 6,
    instructions: [
      'Sit with elbow resting on thigh.',
      'Curl dumbbell toward shoulder.',
    ],
    mistakes: [
      'Using shoulder movement.',
    ],
    tips: [
      'Focus on peak contraction.',
    ],
    youtubeUrl: "https://www.youtube.com/shorts/I_bKCYL2nL8"
  },
  {
    name: 'Close Grip Bench Press',
    muscle: 'Triceps',
    secondary: ['Chest'],
    diff: 'Intermediate',
    eq: 'Barbell',
    emoji: '🏋️',
    calories: 10,
    instructions: [
      'Grip bar slightly narrower than shoulder width.',
      'Lower bar to chest.',
      'Press back up.',
    ],
    mistakes: [
      'Grip too narrow causing wrist strain.',
    ],
    tips: [
      'Keep elbows close to body.',
    ],
    youtubeUrl: "https://www.youtube.com/shorts/cSwXfeCc9_E"
  },
  {
    name: 'Overhead Tricep Extension',
    muscle: 'Triceps',
    secondary: [],
    diff: 'Beginner',
    eq: 'Dumbbell',
    emoji: '🔵',
    calories: 7,
    instructions: [
      'Hold dumbbell overhead.',
      'Lower behind head.',
      'Extend arms back up.',
    ],
    mistakes: [
      'Flaring elbows outward.',
    ],
    tips: [
      'Keep elbows pointing forward.',
    ],
    youtubeUrl: "https://www.youtube.com/shorts/NTk0Igxqcsk"
  },
  {
    name: 'Walking Lunges',
    muscle: 'Quads',
    secondary: ['Glutes', 'Hamstrings'],
    diff: 'Beginner',
    eq: 'Dumbbell',
    emoji: '🦵',
    calories: 12,
    instructions: [
      'Step forward into a lunge.',
      'Lower until knee nearly touches floor.',
      'Push forward into next step.',
    ],
    mistakes: [
      'Front knee moving too far forward.',
    ],
    tips: [
      'Keep torso upright.',
    ],
    youtubeUrl: "https://www.youtube.com/shorts/2ea3_b9rFdM"
  },
  {
    name: 'Bulgarian Split Squat',
    muscle: 'Quads',
    secondary: ['Glutes'],
    diff: 'Intermediate',
    eq: 'Dumbbell',
    emoji: '🦵',
    calories: 14,
    instructions: [
      'Place rear foot on bench.',
      'Lower body into squat.',
      'Push through front heel to stand.',
    ],
    mistakes: [
      'Leaning too far forward.',
    ],
    tips: [
      'Keep chest upright.',
    ],
    youtubeUrl: "https://www.youtube.com/shorts/or1frhkjBDc"
  },
  {
    name: 'Leg Curl',
    muscle: 'Hamstrings',
    secondary: [],
    diff: 'Beginner',
    eq: 'Machine',
    emoji: '🎯',
    calories: 8,
    instructions: [
      'Lie face down on leg curl machine.',
      'Curl weight toward glutes.',
      'Lower slowly.',
    ],
    mistakes: [
      'Using momentum.',
    ],
    tips: [
      'Pause at top for contraction.',
    ],
    youtubeUrl: "https://www.youtube.com/shorts/_lgE0gPvbik"
  },
  {
    name: 'Leg Extension',
    muscle: 'Quads',
    secondary: [],
    diff: 'Beginner',
    eq: 'Machine',
    emoji: '🎯',
    calories: 8,
    instructions: [
      'Sit in leg extension machine.',
      'Extend legs fully.',
      'Lower slowly.',
    ],
    mistakes: [
      'Locking knees forcefully.',
    ],
    tips: [
      'Control the descent.',
    ],
    youtubeUrl: "https://www.youtube.com/shorts/uM86QE59Tgc"
  },
  {
    name: 'Hanging Leg Raise',
    muscle: 'Abs',
    secondary: ['Hip Flexors'],
    diff: 'Intermediate',
    eq: 'Bodyweight',
    emoji: '⬜',
    calories: 7,
    instructions: [
      'Hang from pull-up bar.',
      'Raise legs toward chest.',
      'Lower slowly.',
    ],
    mistakes: [
      'Swinging body.',
    ],
    tips: [
      'Control movement using abs.',
    ],
    youtubeUrl: "https://www.youtube.com/shorts/KDbFKEScp1M"
  },
  {
    name: 'Russian Twist',
    muscle: 'Obliques',
    secondary: ['Abs'],
    diff: 'Beginner',
    eq: 'Bodyweight',
    emoji: '🔶',
    calories: 6,
    instructions: [
      'Sit with torso leaned slightly back.',
      'Rotate torso side to side.',
    ],
    mistakes: [
      'Moving arms instead of torso.',
    ],
    tips: [
      'Keep core tight.',
    ],
    youtubeUrl: "https://www.youtube.com/shorts/aRUMRbl7KS4"
  },
  {
    name: 'Jump Rope',
    muscle: 'Cardio',
    secondary: ['Calves'],
    diff: 'Beginner',
    eq: 'Bodyweight',
    emoji: '🏃',
    calories: 50,
    instructions: [
      'Hold rope handles.',
      'Jump lightly while rotating rope.',
    ],
    mistakes: [
      'Jumping too high.',
    ],
    tips: [
      'Keep jumps small and quick.',
    ],
    youtubeUrl: "https://www.youtube.com/shorts/geAiKq9PPKM"
  },
  {
    name: 'Cycling',
    muscle: 'Cardio',
    secondary: ['Quads', 'Glutes'],
    diff: 'Beginner',
    eq: 'Machine',
    emoji: '🚴',
    calories: 45,
    instructions: [
      'Adjust bike seat height.',
      'Pedal at steady pace.',
    ],
    mistakes: [
      'Seat too low causing knee stress.',
    ],
    tips: [
      'Maintain consistent cadence.',
    ],
    youtubeUrl: "https://www.youtube.com/shorts/dieOsJlsvpM"
  },
  {
    name: 'Barbell Bench Press', muscle: 'Chest', secondary: ['Triceps', 'Shoulders'],
    diff: 'Intermediate', eq: 'Barbell', emoji: '🏋️', calories: 12,
    instructions: [
      'Set up on a flat bench with feet flat on the floor.',
      'Grip bar just outside shoulder width with a firm overhand grip.',
      'Unrack and hold above mid-chest with arms fully extended.',
      'Lower bar to lower chest in a controlled 2-second descent.',
      'Drive bar up explosively, fully extending arms without locking out hard.',
    ],
    mistakes: [
      'Bouncing the bar off the chest for momentum.',
      'Flaring elbows too wide (past 90°) — stresses the shoulder joint.',
      'Losing the arch or lifting feet off the floor.',
      'Gripping too narrow or too wide for your shoulder width.',
    ],
    tips: [
      'Tuck elbows at 45° to protect the shoulders and maximize tricep involvement.',
      'Retract and depress scapulae before unracking the bar.',
      'Drive through heels for leg drive to improve stability and power.',
      'Keep wrists straight — never let them bend backward under load.',
    ],
    youtubeUrl: "https://www.youtube.com/shorts/XjrsqShr-Ic"
  },
  {
    name: 'Incline Dumbbell Press', muscle: 'Chest', secondary: ['Triceps', 'Front Delts'],
    diff: 'Beginner', eq: 'Dumbbell', emoji: '💪', calories: 10,
    instructions: [
      'Set bench to a 30–45° incline — 30° is better for upper chest isolation.',
      'Sit back with dumbbells resting on thighs, then kick them up to chest height.',
      'Press dumbbells up and slightly inward until arms are fully extended.',
      'Lower slowly in 2–3 seconds back to starting position at chest level.',
    ],
    mistakes: [
      'Using too steep an incline (shoulder becomes dominant over chest).',
      'Not touching dumbbells at the top of the movement.',
      'Rushing the eccentric (lowering) phase.',
    ],
    tips: [
      'Focus consciously on the upper chest contraction at the top.',
      'Use a slight inner rotation of the wrist at peak contraction.',
      '30° incline targets upper chest better than 45° — experiment to find your sweet spot.',
    ],
    youtubeUrl: "https://www.youtube.com/shorts/8fXfwG4ftaQ"
  },
  {
    name: 'Cable Fly', muscle: 'Chest', secondary: ['Front Delts'],
    diff: 'Beginner', eq: 'Machine', emoji: '🎯', calories: 8,
    instructions: [
      'Set both pulleys to chest height and attach handles.',
      'Stand in the center, step forward and grab handles with slight elbow bend.',
      'Extend arms wide to sides, keeping that slight elbow bend constant.',
      'Bring hands together in a wide arc in front of your chest.',
      'Squeeze the chest hard at the center for 1–2 seconds.',
    ],
    mistakes: [
      'Bending elbows too much — it becomes a press, not a fly.',
      'Using excessive weight and losing control of the arc.',
      'Not maintaining constant tension through the full range.',
    ],
    tips: [
      'Think of hugging a large barrel — the arc shape is key.',
      'Adjust pulley height to target different chest regions.',
      'Keep a slight forward lean for better leverage and chest activation.',
    ],
    youtubeUrl: "https://www.youtube.com/shorts/EOKbusjoNtM"
  },
  {
    name: 'Push-Up', muscle: 'Chest', secondary: ['Triceps', 'Shoulders', 'Core'],
    diff: 'Beginner', eq: 'Bodyweight', emoji: '💪', calories: 8,
    instructions: [
      'Start in a high plank position, hands slightly wider than shoulder-width.',
      'Lower your chest to just above the floor, keeping elbows at ~45° to torso.',
      'Keep your body in a straight line from head to heels throughout.',
      'Press up explosively to the starting position.',
    ],
    mistakes: [
      'Sagging hips or a piked-up butt — breaks the straight line.',
      'Elbows flaring out to 90° — causes shoulder impingement.',
      'Not achieving full depth (chest not approaching the floor).',
    ],
    tips: [
      'Protract scapulae at the top for full serratus anterior activation.',
      'Elevate feet for upper chest emphasis.',
      'Slow the eccentric (3 seconds down) for more difficulty and muscle damage.',
    ],
    youtubeUrl: "https://www.youtube.com/shorts/4Bc1tPaYkOo"
  },
  {
    name: 'Pull-Up', muscle: 'Back', secondary: ['Biceps', 'Rear Delts'],
    diff: 'Intermediate', eq: 'Bodyweight', emoji: '🔝', calories: 9,
    instructions: [
      'Hang from a bar with an overhand grip, shoulder-width apart.',
      'Initiate the movement by depressing and retracting your scapulae.',
      'Pull elbows down and back until your chin clears the bar.',
      'Lower with full control back to a dead hang position.',
    ],
    mistakes: [
      'Kipping or using momentum — defeats the strength-building purpose.',
      'Not achieving full range of motion (chin not above bar, or no dead hang).',
      'Shrugging at the top instead of retracting the scapulae.',
    ],
    tips: [
      'Maintain a hollow body position for better core engagement.',
      'Imagine bending the bar towards you to engage the lats more.',
      'Practice scapular pull-ups to build the foundation before full reps.',
    ],
    youtubeUrl: "https://www.youtube.com/shorts/ym1V5H35IpA"
  },
  {
    name: 'Barbell Row', muscle: 'Back', secondary: ['Biceps', 'Rear Delts', 'Traps'],
    diff: 'Intermediate', eq: 'Barbell', emoji: '🏋️', calories: 13,
    instructions: [
      'Hinge at hips with a slight knee bend, bar positioned over mid-foot.',
      'Grip the bar just outside shoulder-width with overhand or underhand grip.',
      'Pull the bar to your lower chest or upper abdomen.',
      'Lead with your elbows driving back and up — not your hands.',
      'Lower the bar under full control to starting position.',
    ],
    mistakes: [
      'Rounding the lower back under load — high injury risk.',
      'Using excessive hip momentum/swing to lift the weight.',
      'Pulling to the belly button instead of the upper abdomen.',
    ],
    tips: [
      'Keep the bar close to your legs on the way up.',
      'Squeeze the back muscles and hold for 1 second at the top.',
      'Film yourself from the side to check your torso angle.',
    ],
    youtubeUrl: "https://www.youtube.com/shorts/phVtqawIgbk"
  },
  {
    name: 'Lat Pulldown', muscle: 'Back', secondary: ['Biceps', 'Rear Delts'],
    diff: 'Beginner', eq: 'Machine', emoji: '🎯', calories: 9,
    instructions: [
      'Grip the bar wider than shoulder-width with an overhand grip.',
      'Sit down and secure your thighs under the pad.',
      'Lean back slightly with chest tall and proud.',
      'Pull the bar to your upper chest, driving elbows down and back.',
      'Control the weight on the way up to full extension.',
    ],
    mistakes: [
      'Pulling behind the neck — risky for the cervical spine.',
      'Leaning back too far (becomes a row, not a pulldown).',
      'Not allowing a full stretch at the top of each rep.',
    ],
    tips: [
      'Think "elbows to hip pockets" to maximize lat engagement.',
      'Overhand grip targets lats more; underhand targets lower lats and biceps.',
      'Keep the chest tall and proud throughout the set.',
    ],
    youtubeUrl: "http://youtube.com/shorts/2ea3_b9rFdM"
  },
  {
    name: 'Deadlift', muscle: 'Back', secondary: ['Glutes', 'Hamstrings', 'Traps', 'Forearms'],
    diff: 'Advanced', eq: 'Barbell', emoji: '🏋️', calories: 20,
    instructions: [
      'Stand with bar over mid-foot, hip-width stance.',
      'Hinge down gripping bar just outside legs with double overhand grip.',
      'Drop hips until shins touch the bar — this sets your starting position.',
      'Take a big breath, brace hard, then push the floor away.',
      'Drag the bar up the legs keeping it close the entire way.',
      'Lock out hips at the top — do not hyperextend the lower back.',
    ],
    mistakes: [
      'Bar drifting forward away from the legs (increases lever arm dramatically).',
      'Jerking the bar off the floor — take the slack out first.',
      'Squatting the deadlift by starting with hips too low.',
      'Rounding the lower back under heavy load.',
    ],
    tips: [
      'Think "leg press the floor" not "pull the bar".',
      'Use mixed grip or hook grip for heavier weights.',
      'Push your belly into an imaginary belt to create intra-abdominal pressure.',
    ],
    youtubeUrl: "https://www.youtube.com/shorts/xNwpvDuZJ3k"
  },
  {
    name: 'Overhead Press', muscle: 'Shoulders', secondary: ['Triceps', 'Upper Chest'],
    diff: 'Intermediate', eq: 'Barbell', emoji: '🏋️', calories: 11,
    instructions: [
      'Stand with bar at upper chest, grip slightly wider than shoulder-width.',
      'Brace your core and glutes, take a big breath.',
      'Press the bar directly overhead in a slight arc around your face.',
      'Shrug at the very top for full range of motion.',
      'Lower under control back to the starting position.',
    ],
    mistakes: [
      'Excessive lower back arch to compensate for poor shoulder mobility.',
      'Pressing in front instead of over the center of gravity.',
      'Not reaching full lockout at the top of each rep.',
    ],
    tips: [
      'Squeeze your glutes to prevent lumbar hyperextension.',
      'Start with elbows at 45° before the press — not flared wide.',
      'The bar should track slightly back as it clears the top of your head.',
    ],
    youtubeUrl: "https://www.youtube.com/shorts/zoN5EH50Dro"
  },
  {
    name: 'Lateral Raise', muscle: 'Shoulders', secondary: ['Traps'],
    diff: 'Beginner', eq: 'Dumbbell', emoji: '💪', calories: 6,
    instructions: [
      'Hold dumbbells at your sides with a slight forward lean from hips.',
      'Raise your arms to shoulder height with a slight elbow bend.',
      'Lead with your pinky finger slightly raised to maximize side delt activation.',
      'Lower slowly over 3 seconds back to the starting position.',
    ],
    mistakes: [
      'Using too much weight and swinging the torso for momentum.',
      'Raising above shoulder height — causes shoulder impingement.',
      'Shrugging the traps instead of raising the arms.',
    ],
    tips: [
      'Think of "pouring water from a can" at the top of the movement.',
      'Cable lateral raises provide constant tension throughout the range.',
      '2–3 second eccentric for maximum growth stimulus.',
    ],
    youtubeUrl: "https://www.youtube.com/shorts/Kl3LEzQ5Zqs"
  },
  {
    name: 'Barbell Curl', muscle: 'Biceps', secondary: ['Forearms'],
    diff: 'Beginner', eq: 'Barbell', emoji: '💙', calories: 7,
    instructions: [
      'Stand holding a barbell with underhand grip, shoulder-width apart.',
      'Keep your elbows pinned to your sides throughout the movement.',
      'Curl the bar up toward your upper chest.',
      'Squeeze the biceps hard at the top.',
      'Lower slowly over 3 seconds to full extension.',
    ],
    mistakes: [
      'Swinging the torso backward to hoist the weight up.',
      'Elbows drifting forward (turns it into a front raise).',
      'Not achieving full extension at the bottom of each rep.',
    ],
    tips: [
      'Supinate the wrists at the top for a peak contraction.',
      'The EZ-bar version is easier on the wrists for many people.',
      'Slow the negative for more muscle damage and growth stimulus.',
    ],
    youtubeUrl: "https://www.youtube.com/shorts/ez3YoWf62Eg"
  },
  {
    name: 'Incline Dumbbell Curl', muscle: 'Biceps', secondary: ['Forearms'],
    diff: 'Intermediate', eq: 'Dumbbell', emoji: '💙', calories: 7,
    instructions: [
      'Set bench to 45–60° incline and sit back against it.',
      'Let your arms hang freely from the shoulder in a stretched position.',
      'Curl the dumbbells up, supinating fully at the top.',
      'Lower to a complete full extension to maximize the stretch.',
    ],
    mistakes: [
      'Not allowing the full stretch at the bottom — defeats the purpose.',
      'Using momentum to swing the weights up.',
    ],
    tips: [
      'The stretched position provides a unique mechanical advantage for growth.',
      'Great for targeting the long head of the biceps specifically.',
    ],
    youtubeUrl: "https://www.youtube.com/shorts/fXFN8_1Bh6k"
  },
  {
    name: 'Tricep Pushdown', muscle: 'Triceps', secondary: [],
    diff: 'Beginner', eq: 'Machine', emoji: '🔵', calories: 6,
    instructions: [
      'Attach a rope or straight bar to a high cable pulley.',
      'Grip the attachment with elbows bent at 90° and pinned to sides.',
      'Push down until your arms are fully extended.',
      'Control the weight on the way back up, stopping at 90°.',
    ],
    mistakes: [
      'Elbows flaring out during the push.',
      'Using body momentum to assist the movement.',
      'Not achieving full arm extension at the bottom.',
    ],
    tips: [
      'Separate the rope at the bottom for extra contraction.',
      'Lean slightly forward for better stability.',
      'Overhand grip targets the lateral head; underhand targets the long head.',
    ],
    youtubeUrl: "https://www.youtube.com/shorts/1FjkhpZsaxc"
  },
  {
    name: 'Skull Crushers', muscle: 'Triceps', secondary: ['Chest'],
    diff: 'Intermediate', eq: 'Barbell', emoji: '🏋️', calories: 9,
    instructions: [
      'Lie on a bench holding an EZ-bar or barbell above your chest.',
      'Lower the bar toward your forehead by bending only at the elbows.',
      'Keep your elbows fixed, pointing directly at the ceiling.',
      'Press back to the starting position without flaring the elbows.',
    ],
    mistakes: [
      'Flaring elbows out — it becomes a bench press pattern.',
      'Lowering too far behind the head (can strain elbows).',
    ],
    tips: [
      'Add a slight shoulder stretch at the bottom for long head emphasis.',
      'Use an EZ-bar to reduce wrist strain significantly.',
    ],
    youtubeUrl: "https://www.youtube.com/shorts/K3mFeNz4e3w"
  },
  {
    name: 'Squat', muscle: 'Quads', secondary: ['Glutes', 'Hamstrings', 'Core'],
    diff: 'Intermediate', eq: 'Barbell', emoji: '🦵', calories: 16,
    instructions: [
      'Bar on upper traps, feet shoulder-width or slightly wider.',
      'Brace your core and take a big breath of air.',
      'Break at hips and knees simultaneously — initiate the descent.',
      'Descend until thighs are parallel to the floor or below.',
      'Drive through the mid-foot back to a standing position.',
    ],
    mistakes: [
      'Knees caving inward (valgus collapse) under load.',
      'Heels rising off the floor — indicates ankle mobility issue.',
      'Excessive butt wink at the bottom of the squat.',
      'Looking down instead of keeping a neutral neck.',
    ],
    tips: [
      'Spread the floor apart with your feet to engage glutes.',
      'Think "sit between the heels" not "sit back onto heels".',
      'Goblet squat is a great learning tool before loading a barbell.',
    ],
    youtubeUrl: "https://www.youtube.com/shorts/dW3zj79xfrc"
  },
  {
    name: 'Leg Press', muscle: 'Quads', secondary: ['Glutes', 'Hamstrings'],
    diff: 'Beginner', eq: 'Machine', emoji: '🎯', calories: 12,
    instructions: [
      'Sit in the machine with feet shoulder-width on the platform.',
      'Unrack and lower the platform until your knees are at 90°.',
      'Press through your heels to full extension — but do not hard lock out.',
      'Control the descent back to 90° for the next rep.',
    ],
    mistakes: [
      'Locking knees out forcefully under heavy load.',
      'Feet too low on the platform (excessive knee stress).',
      'Not going to full 90° depth.',
    ],
    tips: [
      'Higher foot placement shifts the emphasis to the glutes.',
      'Toes pointed slightly outward targets the inner quad (VMO).',
    ],
    youtubeUrl: "https://www.youtube.com/shorts/BnacvXdaxq8"
  },
  {
    name: 'Romanian Deadlift', muscle: 'Hamstrings', secondary: ['Glutes', 'Lower Back'],
    diff: 'Intermediate', eq: 'Barbell', emoji: '🏋️', calories: 14,
    instructions: [
      'Stand holding the bar at hip level with a slight knee bend.',
      'Hinge at the hips, pushing them backward.',
      'Lower the bar along the legs until you feel a strong hamstring stretch.',
      'Drive hips forward and squeeze the glutes to return to standing.',
    ],
    mistakes: [
      'Rounding the lower back — always maintain a neutral spine.',
      'Bending the knees too much (turns it into a squat).',
      'Not feeling the stretch — you may be going past your range of motion.',
    ],
    tips: [
      'Think of "closing a car door with your hip" on the way up.',
      'Go as deep as your hamstring flexibility allows — not deeper.',
      'Look slightly down to help maintain a neutral spine position.',
    ],
  },
  {
    name: 'Hip Thrust', muscle: 'Glutes', secondary: ['Hamstrings', 'Quads'],
    diff: 'Beginner', eq: 'Barbell', emoji: '🟠', calories: 11,
    instructions: [
      'Sit with your upper back against a bench, barbell across hip crease.',
      'Plant feet flat on the floor, shoulder-width apart.',
      'Drive hips up until your body forms a straight line from knees to shoulders.',
      'Squeeze glutes hard and hold for 1–2 seconds at the top.',
      'Lower hips with control back toward the floor.',
    ],
    mistakes: [
      'Not achieving full hip extension at the top.',
      'Hyperextending the lower back instead of squeezing glutes.',
      'Feet too close or too far from the body.',
    ],
    tips: [
      'Chin to chest to avoid lumbar hyperextension at the top.',
      'Pause 1–2 seconds at the top for maximum glute contraction.',
      'Foot position affects muscle emphasis — experiment to find your best.',
    ],
  },
  {
    name: 'Plank', muscle: 'Abs', secondary: ['Glutes', 'Shoulders', 'Back'],
    diff: 'Beginner', eq: 'Bodyweight', emoji: '⬜', calories: 4,
    instructions: [
      'Start in a push-up position but on your forearms instead.',
      'Create a perfectly straight line from your head to your heels.',
      'Hold the position while breathing normally.',
      'Squeeze your abs, glutes, and quads simultaneously throughout.',
    ],
    mistakes: [
      'Hips too high (piked) or sagging too low.',
      'Holding your breath instead of breathing normally.',
      'Looking up or down instead of keeping neutral neck position.',
    ],
    tips: [
      'Squeeze every single muscle group at once for maximum benefit.',
      'Posterior pelvic tilt increases abs engagement significantly.',
      'Dead bugs and hollow holds build a stronger core than planks alone.',
    ],
  },
  {
    name: 'Cable Crunch', muscle: 'Abs', secondary: ['Obliques'],
    diff: 'Beginner', eq: 'Machine', emoji: '⬜', calories: 6,
    instructions: [
      'Kneel facing a cable machine with a rope attachment overhead.',
      'Hold the rope at the sides of your face.',
      'Crunch down by rounding the spine, driving elbows toward your knees.',
      'Pause at the bottom, then return slowly.',
    ],
    mistakes: [
      'Using hip flexors to pull down instead of abs.',
      'Not achieving full spinal flexion at the bottom.',
      'Using too much range of motion (lumbar flexion, not just thoracic).',
    ],
    tips: [
      'Imagine smashing your ribcage to your pelvis — that is the movement.',
      'Hold the contraction for 1 second at the bottom.',
      'Breathe out hard on the way down for better core activation.',
    ],
  },
  {
    name: 'Calf Raise', muscle: 'Calves', secondary: [],
    diff: 'Beginner', eq: 'Machine', emoji: '🟡', calories: 5,
    instructions: [
      'Stand with balls of feet on an elevated surface.',
      'Lower your heels as far as possible for maximum stretch.',
      'Rise up onto your toes as high as you can go.',
      'Pause at the top for 1–2 seconds.',
      'Lower slowly over 3 seconds.',
    ],
    mistakes: [
      'Bouncing at the bottom to avoid the painful stretch.',
      'Rushing through reps without full range of motion.',
      'Locking knees — keep a slight bend throughout.',
    ],
    tips: [
      'Calves need high volume — aim for 15–20+ reps per set.',
      'Seated calf raises target the soleus (deeper calf muscle) more.',
      'The 2-second pause at the bottom stretch is the most important part.',
    ],
  },
  {
    name: 'Running', muscle: 'Cardio', secondary: ['Calves', 'Quads', 'Glutes'],
    diff: 'Beginner', eq: 'Bodyweight', emoji: '🏃', calories: 60,
    instructions: [
      'Begin with a 5-minute walk to warm up.',
      'Maintain an upright posture with a slight forward lean from the ankles.',
      'Land mid-foot directly under your center of gravity.',
      'Keep arms relaxed, bent at 90°, swinging forward and back.',
      'Cool down with a 5-minute walk and stretch.',
    ],
    mistakes: [
      'Heel striking creates a braking force on every step.',
      'Overstriding — your foot should land under your hips.',
      'Tensing your shoulders and upper body wastes energy.',
    ],
    tips: [
      'A cadence of 170–180 steps per minute is considered optimal.',
      'Run at a conversational pace for 80% of your total running volume.',
      'Build mileage slowly — no more than 10% increase per week.',
    ],
  },
]

export const SPLITS: Split[] = [
  {
    name: 'Push Pull Legs', days: '6 Day Split',
    desc: 'The gold standard for intermediate lifters. Maximum frequency per muscle group with optimal recovery.',
    schedule: [
      { day: 1, name: 'Push', muscles: 'Chest · Shoulders · Triceps' },
      { day: 2, name: 'Pull', muscles: 'Back · Biceps · Rear Delts' },
      { day: 3, name: 'Legs', muscles: 'Quads · Hamstrings · Glutes · Calves' },
      { day: 4, name: 'Push (Variation)', muscles: 'Chest · Shoulders · Triceps' },
      { day: 5, name: 'Pull (Variation)', muscles: 'Back · Biceps · Rear Delts' },
      { day: 6, name: 'Legs (Variation)', muscles: 'Quad focus or Glute focus' },
    ],
  },
  {
    name: 'Bro Split', days: '5 Day Split',
    desc: 'Classic bodybuilder split. One muscle group per day for maximum volume and single-muscle focus.',
    schedule: [
      { day: 1, name: 'Chest Day', muscles: 'All chest exercises' },
      { day: 2, name: 'Back Day', muscles: 'Lats · Traps · Lower Back' },
      { day: 3, name: 'Shoulders', muscles: 'Front · Side · Rear Delts' },
      { day: 4, name: 'Legs', muscles: 'Quads · Hamstrings · Calves' },
      { day: 5, name: 'Arms', muscles: 'Biceps · Triceps · Forearms' },
    ],
  },
  {
    name: 'Upper Lower Split', days: '4 Day Split',
    desc: 'Excellent for intermediate lifters. Balanced frequency with good recovery windows.',
    schedule: [
      { day: 1, name: 'Upper A', muscles: 'Chest · Back · Shoulders · Arms' },
      { day: 2, name: 'Lower A', muscles: 'Quads · Hamstrings · Glutes · Calves' },
      { day: 3, name: 'Upper B', muscles: 'Back heavy · Chest · Shoulders · Arms' },
      { day: 4, name: 'Lower B', muscles: 'Hip hinge focus · Glutes · Calves' },
    ],
  },
  {
    name: 'Full Body Split', days: '3 Day Split',
    desc: 'Perfect for beginners and those with limited time. Train every muscle 3x per week.',
    schedule: [
      { day: 1, name: 'Full Body A', muscles: 'Squat · Bench · Row · Curl · Press' },
      { day: 2, name: 'Full Body B', muscles: 'Deadlift · OHP · Pull-Up · Dips' },
      { day: 3, name: 'Full Body C', muscles: 'Variation of A + Accessories' },
    ],
  },
  {
    name: 'Arnold Split', days: '6 Day Split',
    desc: "Arnold Schwarzenegger's legendary program. High volume, high frequency, legendary results.",
    schedule: [
      { day: 1, name: 'Chest & Back', muscles: 'Superset chest and back exercises' },
      { day: 2, name: 'Shoulders & Arms', muscles: 'Delts · Biceps · Triceps · Forearms' },
      { day: 3, name: 'Legs', muscles: 'Quads · Hamstrings · Calves · Abs' },
      { day: 4, name: 'Chest & Back', muscles: 'Volume variation' },
      { day: 5, name: 'Shoulders & Arms', muscles: 'Strength focus variation' },
      { day: 6, name: 'Legs', muscles: 'High rep / pump focus' },
    ],
  },
  {
    name: 'Bodyweight Workout', days: '4 Day Split',
    desc: 'No equipment needed. Build real strength and impressive physique with calisthenics.',
    schedule: [
      { day: 1, name: 'Push', muscles: 'Push-Ups · Dips · Pike Press · Plank' },
      { day: 2, name: 'Pull', muscles: 'Pull-Ups · Inverted Rows · Face Pulls' },
      { day: 3, name: 'Legs', muscles: 'Squats · Lunges · Nordic Curls · Calf Raises' },
      { day: 4, name: 'Core', muscles: 'Planks · Hanging Raises · L-Sits' },
    ],
  },
  {
    name: 'Hypertrophy Training', days: '5 Day Split',
    desc: 'Science-based muscle building. 8–15 reps, controlled tempo, mechanical tension focus.',
    schedule: [
      { day: 1, name: 'Chest & Tri', muscles: '8–15 reps, 3–4 sets per exercise' },
      { day: 2, name: 'Back & Bi', muscles: 'Lat focus + Row variations' },
      { day: 3, name: 'Legs A', muscles: 'Quad dominant + Calf work' },
      { day: 4, name: 'Shoulders', muscles: 'All three deltoid heads' },
      { day: 5, name: 'Legs B', muscles: 'Hip hinge focus + Glute work' },
    ],
  },
  {
    name: 'Strength Training', days: '4 Day Split',
    desc: 'Low reps, heavy weight. Build raw strength using proven powerlifting principles.',
    schedule: [
      { day: 1, name: 'Squat Focus', muscles: 'Squat variation + Quad accessories' },
      { day: 2, name: 'Bench Focus', muscles: 'Bench Press variation + Push accessories' },
      { day: 3, name: 'Deadlift Focus', muscles: 'Deadlift variation + Pull accessories' },
      { day: 4, name: 'OHP Focus', muscles: 'Overhead Press + Shoulder accessories' },
    ],
  },
  {
    name: 'Fat Loss Program', days: '5 Day Split',
    desc: 'High intensity training combined with cardio to maximize caloric burn and preserve muscle.',
    schedule: [
      { day: 1, name: 'Upper Strength', muscles: 'Compound movements, moderate weight' },
      { day: 2, name: 'HIIT Cardio', muscles: '20–30 min high intensity intervals' },
      { day: 3, name: 'Lower Strength', muscles: 'Squats, RDLs, hip thrusts' },
      { day: 4, name: 'Circuits', muscles: 'Full body circuit training' },
      { day: 5, name: 'LISS Cardio', muscles: '45–60 min steady state cardio' },
    ],
  },
]

export const CHALLENGES: Challenge[] = [
  {
    id: 'c1', title: '100 PUSH-UP CHALLENGE', emoji: '💪',
    category: 'UPPER BODY', difficulty: 'BEGINNER',
    steps: [{ num: 25, lbl: 'Set 1' }, { num: 25, lbl: 'Set 2' }, { num: 25, lbl: 'Set 3' }, { num: 25, lbl: 'Set 4' }],
  },
  {
    id: 'c2', title: '200 SQUAT CHALLENGE', emoji: '🦵',
    category: 'LOWER BODY', difficulty: 'BEGINNER',
    steps: [{ num: 50, lbl: 'Set 1' }, { num: 50, lbl: 'Set 2' }, { num: 50, lbl: 'Set 3' }, { num: 50, lbl: 'Set 4' }],
  },
  {
    id: 'c3', title: '5 KM RUN', emoji: '🏃',
    category: 'CARDIO', difficulty: 'INTERMEDIATE',
    steps: [{ num: 1, lbl: 'km 1' }, { num: 2, lbl: 'km 2' }, { num: 3, lbl: 'km 3' }, { num: '1+', lbl: 'Finish' }],
  },
  {
    id: 'c4', title: '60 SECOND PLANK', emoji: '⬜',
    category: 'CORE', difficulty: 'BEGINNER',
    steps: [{ num: 20, lbl: 'sec 1' }, { num: 20, lbl: 'sec 2' }, { num: 20, lbl: 'sec 3' }],
  },
  {
    id: 'c5', title: '50 PULL-UPS', emoji: '🔝',
    category: 'BACK', difficulty: 'ADVANCED',
    steps: [{ num: 10, lbl: 'Set 1' }, { num: 10, lbl: 'Set 2' }, { num: 10, lbl: 'Set 3' }, { num: 10, lbl: 'Set 4' }, { num: 10, lbl: 'Set 5' }],
  },
  {
    id: 'c6',
    title: '150 CRUNCH CHALLENGE',
    emoji: '🔥',
    category: 'CORE',
    difficulty: 'BEGINNER',
    steps: [
      { num: 50, lbl: 'Set 1' },
      { num: 50, lbl: 'Set 2' },
      { num: 50, lbl: 'Set 3' },
    ],
  },
  {
    id: 'c7',
    title: '100 LUNGE CHALLENGE',
    emoji: '🦵',
    category: 'LOWER BODY',
    difficulty: 'BEGINNER',
    steps: [
      { num: 25, lbl: 'Set 1' },
      { num: 25, lbl: 'Set 2' },
      { num: 25, lbl: 'Set 3' },
      { num: 25, lbl: 'Set 4' },
    ],
  },
  {
    id: 'c8',
    title: '3 MINUTE PLANK',
    emoji: '⬜',
    category: 'CORE',
    difficulty: 'INTERMEDIATE',
    steps: [
      { num: 60, lbl: 'sec 1' },
      { num: 60, lbl: 'sec 2' },
      { num: 60, lbl: 'sec 3' },
    ],
  },
  {
    id: 'c9',
    title: '100 BURPEE CHALLENGE',
    emoji: '🔥',
    category: 'FULL BODY',
    difficulty: 'ADVANCED',
    steps: [
      { num: 25, lbl: 'Set 1' },
      { num: 25, lbl: 'Set 2' },
      { num: 25, lbl: 'Set 3' },
      { num: 25, lbl: 'Set 4' },
    ],
  },
  {
    id: 'c10',
    title: '10 KM RUN',
    emoji: '🏃',
    category: 'CARDIO',
    difficulty: 'ADVANCED',
    steps: [
      { num: 2, lbl: 'km 2' },
      { num: 4, lbl: 'km 4' },
      { num: 6, lbl: 'km 6' },
      { num: 8, lbl: 'km 8' },
      { num: 2, lbl: 'Finish' },
    ],
  },
  {
    id: 'c11',
    title: '200 JUMP ROPE CHALLENGE',
    emoji: '🏃',
    category: 'CARDIO',
    difficulty: 'BEGINNER',
    steps: [
      { num: 50, lbl: 'Set 1' },
      { num: 50, lbl: 'Set 2' },
      { num: 50, lbl: 'Set 3' },
      { num: 50, lbl: 'Set 4' },
    ],
  },
  {
    id: 'c12',
    title: '75 PULL-UP CHALLENGE',
    emoji: '🔝',
    category: 'BACK',
    difficulty: 'ADVANCED',
    steps: [
      { num: 15, lbl: 'Set 1' },
      { num: 15, lbl: 'Set 2' },
      { num: 15, lbl: 'Set 3' },
      { num: 15, lbl: 'Set 4' },
      { num: 15, lbl: 'Set 5' },
    ],
  },
  {
    id: 'c13',
    title: '150 GLUTE BRIDGE CHALLENGE',
    emoji: '🟠',
    category: 'LOWER BODY',
    difficulty: 'BEGINNER',
    steps: [
      { num: 50, lbl: 'Set 1' },
      { num: 50, lbl: 'Set 2' },
      { num: 50, lbl: 'Set 3' },
    ],
  },
  {
    id: 'c14',
    title: '5 MINUTE WALL SIT',
    emoji: '🦵',
    category: 'LOWER BODY',
    difficulty: 'INTERMEDIATE',
    steps: [
      { num: 60, lbl: 'sec 1' },
      { num: 60, lbl: 'sec 2' },
      { num: 60, lbl: 'sec 3' },
      { num: 60, lbl: 'sec 4' },
      { num: 60, lbl: 'sec 5' },
    ],
  },
  {
    id: 'c15',
    title: '300 MOUNTAIN CLIMBERS',
    emoji: '🔥',
    category: 'FULL BODY',
    difficulty: 'INTERMEDIATE',
    steps: [
      { num: 75, lbl: 'Set 1' },
      { num: 75, lbl: 'Set 2' },
      { num: 75, lbl: 'Set 3' },
      { num: 75, lbl: 'Set 4' },
    ],
  },
  {
    id: 'c16',
    title: '500 CALORIE CARDIO',
    emoji: '❤️',
    category: 'CARDIO',
    difficulty: 'ADVANCED',
    steps: [
      { num: 100, lbl: 'Calories 1' },
      { num: 100, lbl: 'Calories 2' },
      { num: 100, lbl: 'Calories 3' },
      { num: 100, lbl: 'Calories 4' },
      { num: 100, lbl: 'Finish' },
    ],
  },
  {
    id: 'c17',
    title: '100 SIT-UP CHALLENGE',
    emoji: '🔥',
    category: 'CORE',
    difficulty: 'BEGINNER',
    steps: [
      { num: 25, lbl: 'Set 1' },
      { num: 25, lbl: 'Set 2' },
      { num: 25, lbl: 'Set 3' },
      { num: 25, lbl: 'Set 4' },
    ],
  },
  {
    id: 'c18',
    title: '50 DIPS CHALLENGE',
    emoji: '💪',
    category: 'UPPER BODY',
    difficulty: 'INTERMEDIATE',
    steps: [
      { num: 10, lbl: 'Set 1' },
      { num: 10, lbl: 'Set 2' },
      { num: 10, lbl: 'Set 3' },
      { num: 10, lbl: 'Set 4' },
      { num: 10, lbl: 'Set 5' },
    ],
  },
  {
    id: 'c19',
    title: '100 BOX JUMP CHALLENGE',
    emoji: '⚡',
    category: 'LOWER BODY',
    difficulty: 'ADVANCED',
    steps: [
      { num: 25, lbl: 'Set 1' },
      { num: 25, lbl: 'Set 2' },
      { num: 25, lbl: 'Set 3' },
      { num: 25, lbl: 'Set 4' },
    ],
  },
  {
    id: 'c20',
    title: '10 MINUTE HIIT',
    emoji: '🔥',
    category: 'CARDIO',
    difficulty: 'INTERMEDIATE',
    steps: [
      { num: 2, lbl: 'min 1' },
      { num: 2, lbl: 'min 2' },
      { num: 2, lbl: 'min 3' },
      { num: 2, lbl: 'min 4' },
      { num: 2, lbl: 'Finish' },
    ],
  }
]

export const AI_PLAN_TEMPLATES: Record<string, Record<string, Record<string, string[]>>> = {
  muscle: {
    full: {
      '3': ['Push — Chest, Shoulders, Triceps', 'Pull — Back, Biceps', 'Legs — Quads, Hamstrings, Glutes, Calves'],
      '4': ['Chest & Triceps', 'Back & Biceps', 'Legs', 'Shoulders & Abs'],
      '5': ['Chest', 'Back', 'Legs', 'Shoulders', 'Arms'],
      '6': ['Push A', 'Pull A', 'Legs A', 'Push B', 'Pull B', 'Legs B'],
    },
    bodyweight: {
      '3': ['Push', 'Pull', 'Legs & Core'],
      '4': ['Push', 'Pull', 'Legs', 'Core'],
      '5': ['Push A', 'Pull A', 'Legs', 'Push B', 'Pull B'],
      '6': ['Push A', 'Pull A', 'Legs A', 'Push B', 'Pull B', 'Core'],
    },
  },

  fat: {
    full: {
      '3': ['Upper Body', 'HIIT Cardio', 'Lower Body'],
      '4': ['Upper Strength', 'HIIT Cardio', 'Lower Strength', 'Circuits'],
      '5': ['Upper', 'HIIT', 'Lower', 'Circuits', 'LISS Cardio'],
      '6': ['Upper A', 'HIIT', 'Lower A', 'Upper B', 'HIIT', 'Lower B'],
    },
    bodyweight: {
      '3': ['Cardio Circuit A', 'Strength Circuits', 'Cardio Circuit B'],
      '4': ['Run + Core', 'Circuits', 'Bike + Abs', 'HIIT'],
      '5': ['Run', 'Circuits A', 'HIIT', 'Circuits B', 'Long Run'],
      '6': ['Run', 'Circuits A', 'HIIT A', 'Run', 'Circuits B', 'HIIT B'],
    },
  },

  strength: {
    full: {
      '3': ['Squat Focus', 'Bench Focus', 'Deadlift Focus'],
      '4': ['Squat', 'Bench', 'Deadlift', 'OHP'],
      '5': ['Squat', 'Bench', 'Deadlift', 'OHP', 'Accessories'],
      '6': ['Squat A', 'Bench A', 'Deadlift A', 'Squat B', 'Bench B', 'Deadlift B'],
    },
    bodyweight: {
      '3': ['Max Push', 'Max Pull', 'Max Legs'],
      '4': ['Push Strength', 'Pull Strength', 'Legs', 'Full Body'],
      '5': ['Push A', 'Pull A', 'Legs A', 'Push B', 'Pull B'],
      '6': ['Push A', 'Pull A', 'Legs A', 'Push B', 'Pull B', 'Full Body'],
    },
  },

  endurance: {
    full: {
      '3': ['Long Run', 'Circuit Training', 'Tempo Run'],
      '4': ['Run', 'Circuits', 'Bike', 'HIIT'],
      '5': ['Run A', 'Swim', 'Bike', 'Run B', 'Circuits'],
      '6': ['Run A', 'Bike', 'Swim', 'Run B', 'HIIT', 'Long Run'],
    },
    bodyweight: {
      '3': ['Cardio + Calisthenics A', 'Active Recovery', 'Cardio + Calisthenics B'],
      '4': ['Run', 'Circuits', 'HIIT', 'Long Run'],
      '5': ['Run', 'Circuits A', 'HIIT', 'Circuits B', 'Long Run'],
      '6': ['Run A', 'Circuits A', 'HIIT A', 'Run B', 'Circuits B', 'HIIT B'],
    },
  },
}

export const AI_EXERCISE_POOLS: Record<string, Record<string, { ex: string; sets: string; reps: string }[]>> = {

  push: {
    full: [
      { ex: 'Barbell Bench Press', sets: '4', reps: '8–10' },
      { ex: 'Incline Dumbbell Press', sets: '3', reps: '10–12' },
      { ex: 'Decline Bench Press', sets: '3', reps: '8–10' },
      { ex: 'Cable Fly', sets: '3', reps: '12–15' },
      { ex: 'Overhead Press', sets: '4', reps: '8–10' },
      { ex: 'Arnold Press', sets: '3', reps: '10–12' },
      { ex: 'Lateral Raise', sets: '4', reps: '12–15' },
      { ex: 'Skull Crushers', sets: '3', reps: '10–12' },
      { ex: 'Tricep Pushdown', sets: '3', reps: '12–15' },
      { ex: 'Dips', sets: '3', reps: '10–12' },
    ],
    bodyweight: [
      { ex: 'Push-Up', sets: '4', reps: '15–20' },
      { ex: 'Decline Push-Up', sets: '3', reps: '12–15' },
      { ex: 'Diamond Push-Up', sets: '3', reps: '12–15' },
      { ex: 'Pike Push-Up', sets: '3', reps: '10–12' },
      { ex: 'Bench Dips', sets: '3', reps: '12–15' },
      { ex: 'Plank', sets: '3', reps: '60s' },
    ],
  },

  pull: {
    full: [
      { ex: 'Pull-Up', sets: '4', reps: '6–10' },
      { ex: 'Chin-Up', sets: '3', reps: '8–10' },
      { ex: 'Barbell Row', sets: '4', reps: '8–10' },
      { ex: 'Lat Pulldown', sets: '3', reps: '10–12' },
      { ex: 'Seated Cable Row', sets: '3', reps: '10–12' },
      { ex: 'Face Pull', sets: '3', reps: '12–15' },
      { ex: 'Barbell Curl', sets: '4', reps: '10–12' },
      { ex: 'Incline Dumbbell Curl', sets: '3', reps: '12–15' },
      { ex: 'Hammer Curl', sets: '3', reps: '12–15' },
    ],
    bodyweight: [
      { ex: 'Pull-Up', sets: '4', reps: '6–10' },
      { ex: 'Chin-Up', sets: '3', reps: '8–10' },
      { ex: 'Inverted Row', sets: '3', reps: '10–12' },
      { ex: 'Resistance Band Curl', sets: '3', reps: '12–15' },
    ],
  },

  legs: {
    full: [
      { ex: 'Back Squat', sets: '4', reps: '8–10' },
      { ex: 'Leg Press', sets: '3', reps: '12–15' },
      { ex: 'Romanian Deadlift', sets: '3', reps: '10–12' },
      { ex: 'Walking Lunges', sets: '3', reps: '12–15' },
      { ex: 'Hip Thrust', sets: '3', reps: '12–15' },
      { ex: 'Leg Curl', sets: '3', reps: '12–15' },
      { ex: 'Leg Extension', sets: '3', reps: '12–15' },
      { ex: 'Standing Calf Raise', sets: '4', reps: '15–20' },
      { ex: 'Seated Calf Raise', sets: '3', reps: '15–20' },
    ],
    bodyweight: [
      { ex: 'Bodyweight Squat', sets: '4', reps: '20' },
      { ex: 'Jump Squat', sets: '3', reps: '15' },
      { ex: 'Walking Lunges', sets: '3', reps: '15' },
      { ex: 'Glute Bridge', sets: '3', reps: '20' },
      { ex: 'Step-Ups', sets: '3', reps: '12' },
      { ex: 'Single Leg Calf Raise', sets: '3', reps: '20' },
    ],
  },

  core: {
    full: [
      { ex: 'Plank', sets: '4', reps: '60s' },
      { ex: 'Cable Crunch', sets: '3', reps: '15–20' },
      { ex: 'Hanging Leg Raise', sets: '3', reps: '12–15' },
      { ex: 'Russian Twist', sets: '3', reps: '20' },
      { ex: 'Ab Wheel Rollout', sets: '3', reps: '12' },
    ],
    bodyweight: [
      { ex: 'Plank', sets: '4', reps: '60s' },
      { ex: 'Sit-Up', sets: '3', reps: '20' },
      { ex: 'Leg Raise', sets: '3', reps: '15' },
      { ex: 'Mountain Climbers', sets: '3', reps: '30s' },
    ],
  },

  cardio: {
    full: [
      { ex: 'Treadmill Run', sets: '1', reps: '20 min' },
      { ex: 'Rowing Machine', sets: '1', reps: '15 min' },
      { ex: 'Stair Climber', sets: '1', reps: '15 min' },
    ],
    bodyweight: [
      { ex: 'Jump Rope', sets: '5', reps: '1 min' },
      { ex: 'Burpees', sets: '4', reps: '15' },
      { ex: 'High Knees', sets: '4', reps: '30s' },
      { ex: 'Jumping Jacks', sets: '4', reps: '40' },
    ],
  },
}