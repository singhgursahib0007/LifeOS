/* ── Image helper ── */
const IMG = n => `https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/${n}/0.jpg`;

/* ── Exercise data ── */
const EX = {
  push: [
    { name: "Push-ups", dose: "4 x 8-15", img: IMG("Pushups"),
      breath: "Inhale down, <b>exhale as you press up</b>.",
      wrong: "Hips sagging means your core quit. One straight line, ears to ankles. Too easy? Elevate your feet." },
    { name: "Pike Push-ups", dose: "3 x 6-12", img: IMG("Handstand_Push-Ups"),
      breath: "Inhale lowering, exhale driving up.",
      wrong: "Head should travel <b>between your hands</b>, not in front. Hips stay high the whole rep — this is your shoulder builder." },
    { name: "DB Lateral Raises", dose: "3 x 15-20 · 3s down", img: IMG("Side_Lateral_Raise"),
      breath: "Exhale up, slow inhale on the 3-second lowering.",
      wrong: "Traps burning means you are shrugging. Lead with the <b>elbows</b>, slight bend, stop at shoulder height." },
    { name: "Diamond Push-ups / Dips", dose: "3 x 8-12", img: IMG("Dips_-_Triceps_Version"),
      breath: "Exhale on the press.",
      wrong: "On dips, shoulders creeping toward your ears strains the joint. Pull them down and back first." }
  ],
  pull: [
    { name: "Table / Towel Rows", dose: "4 x 8-12", img: IMG("Inverted_Row"),
      breath: "<b>Exhale as you pull</b>, inhale lowering.",
      wrong: "Arms tiring before your back means biceps are stealing the rep. Think <b>elbows to ribs</b>, squeeze blades at top." },
    { name: "DB Rear Delt Flys", dose: "3 x 15-20", img: IMG("Seated_Bent-Over_Rear_Delt_Raise"),
      breath: "Exhale opening the arms.",
      wrong: "Feeling it in your neck means you are looking up. Neutral neck, hinge at the hips, pinkies lead. These fix desk posture." },
    { name: "DB Curls", dose: "3 x 12-15 · 3s down", img: IMG("Dumbbell_Bicep_Curl"),
      breath: "Exhale up, slow inhale down.",
      wrong: "Elbows drifting forward turns it into a shoulder raise. Pin them to your sides, full stretch at the bottom." },
    { name: "Superman Holds", dose: "3 x 30 sec", img: IMG("Superman"),
      breath: "Slow steady breathing; never hold your breath.",
      wrong: "Cranking the neck up too far. Eyes on the floor just ahead. This is your low back insurance." }
  ],
  legs: [
    { name: "Bulgarian Split Squats", dose: "4 x 8-12 / leg", img: IMG("One_Leg_Barbell_Squat"),
      breath: "Inhale down, <b>exhale driving up</b>.",
      wrong: "Front knee caving inward. It should track over your toes. Wobbling is normal at first; slow down, don't shorten range." },
    { name: "Glute Bridges", dose: "3 x 15 · 2s squeeze", img: IMG("Butt_Lift_Bridge"),
      breath: "Exhale up, hold the squeeze, inhale down.",
      wrong: "Feeling it in your low back means you are overarching. Tuck the ribs, squeeze glutes hard at the top." },
    { name: "Calf Raises", dose: "3 x 20 · pause top", img: IMG("Standing_Calf_Raises"),
      breath: "Steady rhythm, exhale on the rise.",
      wrong: "Bouncing kills the rep. Pause one full second at the top, lower slow. Range beats speed." },
    { name: "Hollow Body Hold", dose: "3 x 20-30 sec", img: IMG("Crunches"),
      breath: "Short controlled breaths; the brace stays on.",
      wrong: "<b>Low back lifting off the mat</b> is the failure signal. Bend knees to regress before form breaks." }
  ],
  rest: [
    { name: "Dead Hangs + Monkey Bars", dose: "3 rounds", img: IMG("Pullups"),
      breath: "Relax and breathe through the nose.",
      wrong: "Death-gripping. Let the shoulders decompress; grip strength comes free." },
    { name: "Jump Squats + Broad Jumps", dose: "3 x 8 each", img: IMG("Freehand_Jump_Squat"),
      breath: "Exhale sharply on every jump.",
      wrong: "Loud landings. Land soft and quiet like a cat; that is the athletic part." },
    { name: "Shadow Badminton Footwork", dose: "5-10 min", img: null,
      breath: "Match breath to movement rhythm.",
      wrong: "Going through the motions. Push off the outside leg with intent, like a real rally. For old times' sake." }
  ]
};

/* ── Week structure ── */
const WEEK = [
  { d: "Mon", key: "push", t: "Push",         s: "Chest, shoulders, triceps",     c: "var(--sky)",    sprint: false },
  { d: "Tue", key: "pull", t: "Pull",          s: "Back, biceps, rear delts",      c: "var(--lime)",   sprint: true  },
  { d: "Wed", key: "legs", t: "Legs + Core",   s: "Split squats, bridges, hollow", c: "var(--amber)",  sprint: false },
  { d: "Thu", key: "push", t: "Push",          s: "Beat Monday's logbook",         c: "var(--sky)",    sprint: true  },
  { d: "Fri", key: "pull", t: "Pull",          s: "Beat Tuesday's logbook",        c: "var(--lime)",   sprint: false },
  { d: "Sat", key: "legs", t: "Legs + Core",   s: "Beat Wednesday's logbook",      c: "var(--amber)",  sprint: true  },
  { d: "Sun", key: "rest", t: "Athlete Day",   s: "Park: hangs, jumps, footwork",  c: "var(--violet)", sprint: false }
];

/* ── Morning flow ── */
const MORNING = [
  { t: "Cat-Cow x 10",
    d: "<b>Breathe:</b> inhale as you arch, exhale as you round. <b>Wrong if</b> low back pinches; shrink the range." },
  { t: "Thread the Needle x 6/side",
    d: "Reach far, let the upper back twist. <b>Wrong if</b> the stretch lands in the shoulder joint instead of between the blades." },
  { t: "World's Greatest Stretch x 5/side",
    d: "Long lunge, hand inside the front foot, rotate and reach up. <b>Breathe:</b> exhale into the rotation." },
  { t: "Downward Dog to Cobra x 8",
    d: "<b>Breathe:</b> exhale into Dog, inhale through to Cobra. Heels reach down; hips stay relaxed in Cobra." },
  { t: "Neck circles + chin tucks x 10",
    d: "Make a double chin, feel the back of the neck lengthen. <b>Wrong if</b> you feel strain at the front of the throat." },
  { t: "Hip flexor stretch · 45 sec/side",
    d: "Squeeze the glute of the back leg to deepen it. Sitting shortens these — this is the daily antidote." },
  { t: "Dead hang or chest stretch · 30-45 sec",
    d: "Hang relaxed, slow nose breathing. Decompresses the spine and opens the chest after the flow." }
];

/* ── Rules ── */
const RULES = [
  { t: "Protein at every meal",
    d: "1.6 to 2 g per kg bodyweight daily. Vegetarian arsenal: paneer, dal, soy chunks, milk, Greek yogurt, peanuts, tofu. The surplus only builds muscle if protein shows up." },
  { t: "Sleep 7.5 to 9 hours",
    d: "Muscle is built in bed. Treat bedtime like a training session — same consistency, same discipline." },
  { t: "Never miss twice",
    d: "One missed session is life. Two in a row is a broken habit forming. The day after a miss is non-negotiable." },
  { t: "Log every set",
    d: "Hit the top of a rep range on all sets and the next session gets harder: slower tempo, pause reps, or a tougher variation. The logbook is the entire progression system." },
  { t: "Desk rule",
    d: "Stand every 45 to 60 min: 10 chin tucks and one doorway stretch. Does more for your neck than any evening routine." }
];

/* ── Diet plan ── */
const DIET = {
  targets: { kcal: 2750, protein: 130, carbs: 305, fat: 88 },
  meals: [
    {
      time: "8:00 AM", name: "Breakfast",
      kcal: 720, protein: 35, carbs: 92, fat: 22,
      items: [
        { name: "Oats (dry)",    amount: "80g",    protein: "10g" },
        { name: "Whole milk",    amount: "300ml",  protein: "10g" },
        { name: "Paneer",        amount: "75g",    protein: "14g" },
        { name: "Banana",        amount: "1 medium", protein: "1g" }
      ],
      note: "Cook oats in the milk — thick, creamy, no compromise. Paneer bhurji on the side. This meal sets the protein baseline for the whole day."
    },
    {
      time: "11:00 AM", name: "Mid-morning",
      kcal: 335, protein: 27, carbs: 13, fat: 18,
      items: [
        { name: "Greek yogurt",    amount: "200g",  protein: "20g" },
        { name: "Peanuts (unsalted)", amount: "35g", protein: "9g" }
      ],
      note: "No-cook, no-think snack. Keep a container of greek yogurt in the fridge. Pair with any fruit if you need the carbs."
    },
    {
      time: "1:30 PM", name: "Lunch",
      kcal: 700, protein: 29, carbs: 103, fat: 10,
      items: [
        { name: "Dal / Rajma / Chana", amount: "200g cooked", protein: "12g" },
        { name: "Whole wheat roti",    amount: "3 medium",    protein: "12g" },
        { name: "Mixed sabzi",         amount: "1 bowl",      protein: "4g"  },
        { name: "Curd",                amount: "100g",        protein: "3g"  }
      ],
      note: "Rotate the legume daily — dal, rajma, chana, chole. Variety across the week means a complete amino acid profile. Don't eat the same thing every day."
    },
    {
      time: "5:00 PM", name: "Pre-Workout",
      kcal: 305, protein: 9, carbs: 40, fat: 14,
      items: [
        { name: "Banana",        amount: "1 large", protein: "1g" },
        { name: "Peanut butter", amount: "2 tbsp",  protein: "8g" },
        { name: "Water",         amount: "500ml",   protein: "—"  }
      ],
      note: "Eat 45-60 min before training. Fast carbs from the banana fuel the session. Fat from peanut butter slows digestion enough for sustained energy."
    },
    {
      time: "7:30 PM", name: "Post-Workout Dinner",
      kcal: 655, protein: 38, carbs: 87, fat: 8,
      items: [
        { name: "Soy chunks (dry)", amount: "60g",       protein: "31g" },
        { name: "Whole wheat roti", amount: "2 medium",  protein: "8g"  },
        { name: "Tomato sabzi",     amount: "1 bowl",    protein: "3g"  }
      ],
      note: "Soy chunks are your MVP — 52g protein per 100g dry weight. Soak 30 min, squeeze out water, cook in any masala. This is your biggest post-workout protein hit."
    },
    {
      time: "10:00 PM", name: "Before Bed",
      kcal: 195, protein: 10, carbs: 14, fat: 10,
      items: [
        { name: "Warm whole milk", amount: "250ml",    protein: "9g" },
        { name: "Soaked almonds",  amount: "6-8 pieces", protein: "2g" }
      ],
      note: "Casein in milk digests slowly overnight — keeps muscle protein synthesis elevated during sleep. Growth hormone peaks in deep sleep; protein must be present."
    }
  ],
  proteinSources: [
    { name: "Soy chunks (dry)",  per100: "52g",       rating: 5 },
    { name: "Peanuts",           per100: "26g",       rating: 4 },
    { name: "Paneer",            per100: "18g",       rating: 4 },
    { name: "Greek yogurt",      per100: "10g",       rating: 4 },
    { name: "Tofu",              per100: "8g",        rating: 3 },
    { name: "Dal (cooked)",      per100: "9g",        rating: 3 },
    { name: "Rajma (cooked)",    per100: "9g",        rating: 3 },
    { name: "Whole milk",        per100: "3.4g/100ml",rating: 2 }
  ],
  rules: [
    "Never skip breakfast. Morning sessions are daily — every day needs fuel.",
    "Spread protein across all 5-6 meals. Your body can only synthesize so much at once.",
    "3 litres of water daily minimum. Muscle is 75% water; cramps mean you're behind.",
    "Surplus calories must carry protein. No junk bulk — every extra calorie should build something.",
    "Every 4th week: eat at maintenance to match the deload. Don't keep surplusing while cutting volume."
  ]
};
