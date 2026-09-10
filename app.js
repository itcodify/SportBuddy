/* ==========================================
   SportBuddy AI - Core Logic
========================================== */

// --- DATA STRUCTURES ---

const SPORTS_DATABASE = {
  soccer: {
    name: "Soccer",
    icon: "⚽",
    difficulty: "Easy",
    spotlightTerm: "Offside",
    faqs: [
      { q: "What is the offside rule?", key: "offside" },
      { q: "Why is there a yellow card?", key: "yellow_card" },
      { q: "What is a penalty kick?", key: "penalty" },
      { q: "How long is a soccer match?", key: "match_time" },
      { q: "What is a clean sheet?", key: "clean_sheet" },
      { q: "What is VAR?", key: "var" },
      { q: "What is a corner kick?", key: "corner_kick" },
      { q: "What is a throw-in?", key: "throw_in" }
    ],
    terms: [
      {
        term: "Offside",
        def: "An attacker cannot hang out behind all defenders waiting for a pass. You must have at least two opponent players (usually the goalie and one defender) between you and their goal when the ball is passed to you.",
        analogy: "It's like standing at the classroom door waiting for the teacher to throw you a cheat sheet; you must step inside the room with everyone else first."
      },
      {
        term: "Yellow Card",
        def: "A formal warning given by the referee for a bad tackle or unsporting behavior. If a player gets two yellow cards in one game, they get a red card and are kicked out.",
        analogy: "Like a 'first strike' warning from a teacher. One more warning and you are sent to the principal's office."
      },
      {
        term: "Clean Sheet",
        def: "When a team, particularly the goalkeeper, prevents the opposing team from scoring any goals during an entire match.",
        analogy: "Like getting a 100% on a test without making a single mistake. The scoreboard sheet stays 'clean' of opponent points."
      },
      {
        term: "Hat-trick",
        def: "When a single player scores three goals in a single game.",
        analogy: "Hitting three bullseyes in a row. It is a rare and celebrated achievement."
      },
      {
        term: "Stoppage Time",
        def: "Extra minutes added to the end of each 45-minute half to make up for time lost due to injuries, substitutions, or goal celebrations.",
        analogy: "Like pausing a game timer when you need to tie your shoe, then adding that paused time back at the very end."
      },
      {
        term: "VAR",
        def: "Video Assistant Referee. A technology system where a video referee in a control room watches replays and alerts the on-field referee about clear mistakes in goals, red cards, and penalty decisions.",
        analogy: "Like having a friend rewatch a game clip in slow-motion to check if the referee made a mistake."
      },
      {
        term: "Corner Kick",
        def: "When the defending team kicks the ball out over their own goal line, the attacking team gets to kick the ball from the corner of the pitch.",
        analogy: "A free kick from the corner. Like a penalty for accidentally scoring an own-goal out of bounds."
      },
      {
        term: "Throw-in",
        def: "When the ball goes out of play across a sideline, the opposing team's player throws the ball back in using both hands overhead.",
        analogy: "Like an inbound pass in basketball — someone has to bring the ball back into play from the boundary."
      },
      {
        term: "Nutmeg",
        def: "When a player kicks or passes the ball through an opponent's legs and retrieves it on the other side. A skilful and humiliating move on the defender.",
        analogy: "Like threading a needle. You pass the ball right through their legs — a crowd-pleasing trick that makes even rival fans cheer."
      },
      {
        term: "Red Card",
        def: "Shown by the referee for serious fouls, violent conduct, or a second yellow card. The player is immediately ejected and their team plays with one fewer person for the rest of the game.",
        analogy: "The 'you're fired' card. Unlike a yellow card warning, there is no second chance — you are immediately removed and your whole team pays the price."
      },
      {
        term: "Own Goal",
        def: "When a player accidentally kicks the ball into their own team's goal. The point counts for the opposing team.",
        analogy: "The most embarrassing moment in soccer — like accidentally scoring in your own basketball hoop. The other team celebrates the point you accidentally gifted them."
      },
      {
        term: "Bicycle Kick",
        def: "An acrobatic overhead kick where the player kicks the ball backward over their own head while in mid-air. One of the most spectacular moves in soccer.",
        analogy: "Like doing a backflip while kicking the ball over your head. Nearly impossible to execute, breathtaking when it works."
      }
    ],
    explanations: {
      offside: {
        eli5: "Imagine you're playing tag, but you're not allowed to sneak behind the other team's defenders and stand right next to their base waiting for someone to throw you the ball. You have to stay with the pack until the ball is kicked!",
        summary: "You cannot be closer to the opponent's goal than both the ball and the second-to-last defender at the moment the ball is passed to you.",
        story: "In the 1800s, English schoolboys would stand right in front of the opponent's goal waiting for long passes. This was called 'goal-hanging' and was considered lazy. The offside rule was invented to force players to dribble and pass collaboratively."
      },
      yellow_card: {
        eli5: "It's the referee saying: 'Hey, that tackle was too dangerous! I'm watching you.' If you do it again, you have to leave the field.",
        summary: "A warning for misconduct. Two yellow cards in a match result in an automatic red card and ejection.",
        story: "Before 1970, referees had to verbally warn players, which caused confusion due to language barriers at the World Cup. Referee Ken Aston saw traffic lights turn yellow then red, and realized cards would solve the language gap instantly!"
      },
      penalty: {
        eli5: "If a defender trips an attacker inside the big box near the goal, the attacker gets a free shot at the goalie from close range, with no other players allowed to block.",
        summary: "A direct free kick taken from the penalty spot (12 yards) after a major foul occurs within the defending team's penalty area.",
        story: "Invented in 1890 by an Irish goalkeeper named William McCrum. He hated when defenders deliberately tripped attackers right before they scored, so he proposed the 'death penalty kick' to keep the game fair."
      },
      match_time: {
        eli5: "A game is 90 minutes long, split into two 45-minute halves, plus a few extra minutes added at the end for any breaks or injuries.",
        summary: "A standard professional match is 90 minutes, divided into two equal halves of 45 minutes, plus stoppage time.",
        story: "In the early days of football, teams just agreed on how long to play. In 1866, London and Sheffield played a match and agreed on 90 minutes. It worked so well it became the official global standard."
      },
      clean_sheet: {
        eli5: "It means the other team scored zero goals! The goalie kept their goal completely locked up.",
        summary: "A match in which a team concedes zero goals.",
        story: "In the old days, sports reporters wrote scores on paper sheets. If a team scored nothing, their line was left blank—a completely 'clean sheet' of paper."
      }
    },
    quiz: [
      {
        q: "What happens if a player gets two yellow cards in a single soccer match?",
        options: [
          "They get a warning and keep playing",
          "They get a red card and are ejected from the match",
          "The opposing team is awarded a penalty kick",
          "They are suspended for the next three games"
        ],
        answer: 1,
        hint: "Think of it as a two-strikes-and-you're-out rule. Yellow is warning, red is exit."
      },
      {
        q: "To be in an 'offside' position, who must be between the attacker and the goal when the ball is passed?",
        options: [
          "Only the goalkeeper",
          "Fewer than two opponent players (usually goalie + one defender)",
          "The entire opposing team",
          "No one at all"
        ],
        answer: 1,
        hint: "The rule is designed to prevent 'goal-hanging'. You need a defender and the goalie in front of you."
      },
      {
        q: "Where must a foul occur for a penalty kick to be awarded?",
        options: [
          "Anywhere on the field",
          "Only in the center circle",
          "Inside the defending team's penalty box",
          "Directly in front of the goalposts only"
        ],
        answer: 2,
        hint: "It's the large box (18 yards) where the goalkeeper can use their hands."
      },
      {
        q: "Why is extra time ('stoppage time') added to the end of a soccer half?",
        options: [
          "To allow players to drink water",
          "To make up for time lost to injuries, substitutions, and celebrations",
          "Because the referee got bored",
          "To let coaches draw new plays"
        ],
        answer: 1,
        hint: "Unlike basketball, the soccer clock doesn't stop running, so lost time is added at the end."
      },
      {
        q: "What is a 'clean sheet'?",
        options: [
          "A brand new soccer ball",
          "A game where a team concedes zero goals",
          "Washing the jerseys after the match",
          "The white lines painted on the grass"
        ],
        answer: 1,
        hint: "Think about the paper sheet showing the opponent's score being clean (zero)."
      }
    ]
  },

  basketball: {
    name: "Basketball",
    icon: "🏀",
    difficulty: "Easy",
    spotlightTerm: "Traveling",
    faqs: [
      { q: "What is traveling?", key: "traveling" },
      { q: "What is a double dribble?", key: "double_dribble" },
      { q: "How does the shot clock work?", key: "shot_clock" },
      { q: "What is 'the paint' or 'the key'?", key: "paint" },
      { q: "Why are some shots worth 3 points and others 2?", key: "three_pointer" }
    ],
    terms: [
      {
        term: "Traveling",
        def: "Taking more than one and a half steps without dribbling (bouncing) the basketball. You cannot run while holding the ball.",
        analogy: "Like playing a board game where you try to move your piece without rolling the dice. You must bounce the ball to walk!"
      },
      {
        term: "Double Dribble",
        def: "A violation where a player dribbles the ball, stops and holds it with both hands, and then starts dribbling again; or dribbles with both hands at the same time.",
        analogy: "Once you lock the ball in your hands, you've chosen your spot. You can only pass or shoot from there!"
      },
      {
        term: "The Paint / Key",
        def: "The rectangular area underneath the hoop. Offensive players cannot stand inside this area for more than 3 seconds at a time.",
        analogy: "It's the 'hot lava' zone. You can go in to score, but you can't camp out there!"
      },
      {
        term: "Shot Clock",
        def: "A timer (usually 24 seconds) that limits how long a team can hold the ball before shooting. If the timer hits zero before a shot hits the rim, the other team gets the ball.",
        analogy: "Like a hot potato game. You must shoot before the buzzer sounds!"
      },
      {
        term: "Free Throw",
        def: "An unguarded shot worth 1 point, awarded to a player after they are fouled while shooting. Taken from the free-throw line.",
        analogy: "A penalty shot where everyone has to stand back and let you shoot in peace."
      },
      {
        term: "Foul",
        def: "Illegal physical contact with an opposing player — pushing, holding, or hitting. Too many personal fouls (usually 6) result in 'fouling out', meaning the player must leave the game.",
        analogy: "Like a yellow card in soccer, but tracked by count. Hit your limit and you're benched for the rest of the game."
      },
      {
        term: "Pick & Roll",
        def: "A two-player offensive play where one player sets a 'pick' (blocks a defender) to free up a teammate, then 'rolls' toward the basket to receive a pass.",
        analogy: "Like a blocker in American football freeing up a running back — one player clears the path, the other runs through it."
      },
      {
        term: "Buzzer Beater",
        def: "A shot made just as (or before) the game clock or shot clock buzzer sounds, typically to win or tie a game at the last second.",
        analogy: "The most dramatic moment in basketball — like a last-second goal in soccer injury time. The buzzer sounds as the ball is in the air."
      },
      {
        term: "Flagrant Foul",
        def: "An especially hard or intentional foul that endangers a player. More severe than a personal foul — may result in free throws plus possession for the opposing team.",
        analogy: "Like a straight red card in soccer. Not just a bump — it's a dangerous or intentional hit that the refs take very seriously."
      }
    ],
    explanations: {
      traveling: {
        eli5: "In basketball, you can't run holding the ball like a football. You must bounce it. If you take more than two steps without bouncing it, the referee blows the whistle!",
        summary: "Taking unauthorized steps while holding the ball. You must dribble to move, or keep one foot anchored (pivot foot).",
        story: "Dr. James Naismith invented basketball in 1891 using peach baskets. In the original rules, players couldn't run with the ball at all! They had to throw it from where they caught it. Dribbling was actually invented later as a loophole so players could 'pass to themselves'."
      },
      double_dribble: {
        eli5: "Once you stop bouncing the ball and catch it with both hands, your bounce-passes are used up! You must either pass the ball to a teammate or shoot it.",
        summary: "A violation that occurs when a player dribbles, stops, holds the ball, and dribbles again, or dribbles with two hands simultaneously.",
        story: "Introduced to keep the game fast and fluid. Without this rule, players could just bounce, hold, protect the ball, and bounce again, making defense impossible."
      },
      shot_clock: {
        eli5: "When your team gets the ball, you have exactly 24 seconds to shoot it and hit the hoop. If you take too long, the buzzer sounds and the other team gets the ball.",
        summary: "A 24-second timer (14 seconds after an offensive rebound) that forces teams to attempt a shot that hits the rim.",
        story: "In the 1950s, teams would get a lead and then just pass the ball around forever without shooting to run out the time. Fans hated it. The 24-second clock was introduced in 1954 and immediately saved the NBA by making games high-scoring."
      },
      paint: {
        eli5: "It's the colored rectangle right under the basket. You can go in there to score, but you can't stand inside it for more than 3 seconds, or the referee calls a violation.",
        summary: "The key or lane area. Offensive players are restricted to a maximum of 3 seconds inside this zone.",
        story: "It's called the 'key' because it originally looked like a keyhole (narrow near the free throw line, wide near the basket). It was widened in the 1950s to prevent giant players (like George Mikan and Wilt Chamberlain) from standing right under the basket and scoring easily."
      },
      three_pointer: {
        eli5: "There is a big curved line on the court. If you shoot from outside that line, it's worth 3 points because it's hard! Shots from inside the line are worth 2 points.",
        summary: "Shots made from beyond the designated three-point arc are worth 3 points. Standard shots are worth 2; free throws are worth 1.",
        story: "The 3-point line was seen as a gimmick when first introduced. The NBA adopted it in 1979 to give shorter players a chance against tall players and to make comebacks exciting."
      }
    },
    quiz: [
      {
        q: "What is traveling in basketball?",
        options: [
          "Riding a bus to an away game",
          "Taking more than two steps without dribbling the ball",
          "Passing the ball to a player who is running",
          "Bouncing the ball higher than your head"
        ],
        answer: 1,
        hint: "You cannot carry the ball like a rugby or football player; you must bounce it to move."
      },
      {
        q: "Once a player stops dribbling and holds the ball, what can they do?",
        options: [
          "Start dribbling again",
          "Run to the basket",
          "Only pass the ball or shoot it",
          "Put the ball in their pocket"
        ],
        answer: 2,
        hint: "Starting to dribble again is called a 'Double Dribble' violation."
      },
      {
        q: "How many seconds does an NBA team have on the shot clock to attempt a shot?",
        options: [
          "10 seconds",
          "24 seconds",
          "35 seconds",
          "Unlimited time"
        ],
        answer: 1,
        hint: "It was calculated by dividing the average number of shots in an exciting game by the match length."
      },
      {
        q: "What is the 'paint' or 'key' in basketball?",
        options: [
          "The colors painted on the ball",
          "The rectangular restricted area under the basket",
          "The coach's whiteboard",
          "The seats where fans sit"
        ],
        answer: 1,
        hint: "Offensive players can't stand inside this zone for more than 3 seconds."
      },
      {
        q: "How many points is a shot worth if taken from outside the curved arc?",
        options: [
          "1 point",
          "2 points",
          "3 points",
          "4 points"
        ],
        answer: 2,
        hint: "It's called a 'three-pointer' for a reason!"
      }
    ]
  },

  tennis: {
    name: "Tennis",
    icon: "🎾",
    difficulty: "Medium",
    spotlightTerm: "Deuce",
    faqs: [
      { q: "Why is the score 15, 30, 40?", key: "scoring" },
      { q: "What does 'Love' mean in tennis?", key: "love" },
      { q: "What is a 'Deuce'?", key: "deuce" },
      { q: "What are the double lines (alleys) on the side?", key: "alleys" },
      { q: "What is a 'Let'?", key: "let" }
    ],
    terms: [
      {
        term: "Love",
        def: "A score of zero. For example, '15-Love' means one player has 15 points and the other has zero.",
        analogy: "Starting from scratch. You have no points yet, but you play for the 'love' of the game!"
      },
      {
        term: "Deuce",
        def: "A score of 40-40. To win the game from deuce, a player must win two consecutive points: the first point is 'Advantage', and the second wins the game.",
        analogy: "Like a sudden-death overtime where you have to win by two clear points, not just one."
      },
      {
        term: "Let",
        def: "A serve that clips the net but still lands in the correct service box. The server gets to redo the serve without penalty.",
        analogy: "A 'do-over'. The net interfered, so we reset and try the serve again."
      },
      {
        term: "Double Fault",
        def: "Failing both serve attempts in a single point. The opponent is automatically awarded the point.",
        analogy: "Missing two opportunities. You get one warning, but the second miss costs you."
      },
      {
        term: "Tiebreaker",
        def: "A special game played when the set score is tied at 6-6. First to 7 points (leading by 2) wins the set.",
        analogy: "A rapid-fire round to settle a deadlock quickly instead of playing forever."
      },
      {
        term: "Ace",
        def: "A serve that is so fast or well-placed that the receiver cannot touch it at all. The server wins the point outright.",
        analogy: "Like a pitch in baseball the batter doesn't even swing at. The server hits it so perfectly that the opponent can only watch it go by."
      },
      {
        term: "Advantage",
        def: "The score after Deuce where one player wins a point. If that player wins the next point they win the game; if they lose it, the score returns to Deuce.",
        analogy: "One foot from the finish line. You are one more point away from winning the game — but if you slip, it resets."
      },
      {
        term: "Bagel",
        def: "Winning a set 6-0, giving your opponent zero games. The '0' looks like a bagel, hence the nickname.",
        analogy: "A complete shutout — like winning a soccer match 5-0. You gave the opponent absolutely nothing."
      },
      {
        term: "Break (of Serve)",
        def: "Winning a game when your opponent is serving. Since servers have an advantage, breaking their serve is a big tactical achievement.",
        analogy: "Like scoring against the run of play in soccer. The server has the advantage, so taking the point from them is a major shift in momentum."
      }
    ],
    explanations: {
      scoring: {
        eli5: "Instead of 1, 2, 3, tennis points go: 15, 30, and then 40! Winning the next point wins the game. It's weird, but it's just their way of counting.",
        summary: "Points progress from Love (0) to 15, 30, and 40. The next won point wins the game, unless there is a 40-40 tie (Deuce).",
        story: "In medieval France, players used clock faces to keep score! Each point moved the clock hand by 15 minutes: 15, 30, 45. They changed 45 to 40 because it was quicker to say in French ('quarante' instead of 'quarante-cinq')."
      },
      love: {
        eli5: "In tennis, 'Love' means zero points. So '30-Love' means 30 points to zero.",
        summary: "The term used for a score of zero in tennis.",
        story: "Derived from the French word 'l'oeuf', which means 'the egg', because an egg looks like a zero. English players mispronounced it as 'love'!"
      },
      deuce: {
        eli5: "When both players are tied at 40-40, it's called Deuce. To win, a player has to win two points in a row. The first point is called 'Advantage', and the next point wins.",
        summary: "A tie score of 40-40. A player must win two consecutive points from deuce to win the game.",
        story: "From the French word 'deux', meaning 'two', indicating that players need two consecutive points to win."
      },
      alleys: {
        eli5: "The extra strips on the sides of the court. In singles (1v1), these strips are 'out'. In doubles (2v2), they are 'in' to give the four players more room to hit.",
        summary: "The side lanes (alleys). They are out-of-bounds in singles matches but in-bounds for doubles matches.",
        story: "Added to make the game playable for doubles. A singles court is 27 feet wide, but the alleys expand it to 36 feet wide for doubles."
      },
      let: {
        eli5: "If a serve hits the top of the net but still lands in the right box, the referee says 'let'. The player gets to try the serve again without losing any points.",
        summary: "A serve that hits the net chord and lands in the service box. It is replayed with no penalty.",
        story: "From the old English word 'let', which meant 'hindrance' or 'obstacle'. The net hindered the ball, so it's a minor obstacle restart."
      }
    },
    quiz: [
      {
        q: "What does the word 'Love' stand for in tennis scoring?",
        options: [
          "How much you like your opponent",
          "A score of zero",
          "Winning the entire match",
          "A warning for hitting the ball too hard"
        ],
        answer: 1,
        hint: "It sounds like the French word for egg ('l'oeuf'), which looks like a zero."
      },
      {
        q: "If the score is 40-40, what is this state called?",
        options: [
          "Double Match",
          "Deuce",
          "Tiebreak",
          "Let"
        ],
        answer: 1,
        hint: "It means you need 'deux' (two) consecutive points to win."
      },
      {
        q: "What is an 'alley' in tennis?",
        options: [
          "The lane behind the baseline",
          "The space between the net and the service line",
          "The side strips that are in-bounds only for doubles",
          "The locker room path"
        ],
        answer: 2,
        hint: "These strips widen the court to accommodate four players instead of two."
      },
      {
        q: "What happens if a serve hits the net strap and lands in the correct service box?",
        options: [
          "The receiver gets the point",
          "It is called a 'Let' and the serve is replayed",
          "The server loses the point",
          "The game pauses for a commercial break"
        ],
        answer: 1,
        hint: "It is a minor hindrance. The player gets a 'do-over'."
      },
      {
        q: "Which score comes after 30 in a standard tennis game?",
        options: [
          "35",
          "40",
          "45",
          "Game"
        ],
        answer: 1,
        hint: "Tennis clock-face scoring historically went 15, 30, and then shortened to this number."
      }
    ]
  },

  football: {
    name: "American Football",
    icon: "🏈",
    difficulty: "Hard",
    spotlightTerm: "Downs",
    faqs: [
      { q: "What are 'Downs'?", key: "downs" },
      { q: "What is the line of scrimmage?", key: "scrimmage" },
      { q: "How do points work (Touchdowns vs Field Goals)?", key: "points" },
      { q: "What is a safety?", key: "safety" },
      { q: "What does 'first down' mean?", key: "first_down" }
    ],
    terms: [
      {
        term: "Downs",
        def: "A team gets 4 attempts (called 'downs') to move the ball forward by at least 10 yards. If they succeed, they get a fresh set of 4 downs.",
        analogy: "Like attempts in a video game level. You have 4 lives to reach the checkpoint (10 yards). If you reach it, your lives reset to 4!"
      },
      {
        term: "Line of Scrimmage",
        def: "An imaginary line across the field where the ball is placed before a play starts. Neither team can cross this line until the play begins.",
        analogy: "The starting line. Both teams must stand on their own side of this line before the whistle blows."
      },
      {
        term: "Interception",
        def: "When a defensive player catches a pass thrown by the offensive team's quarterback, instantly switching who is attacking.",
        analogy: "Like stealing a pass in recess. The ball is caught by the wrong team, and now they run the other way."
      },
      {
        term: "Field Goal",
        def: "Kicking the ball through the opponent's yellow goalposts, worth 3 points. Usually attempted on the 4th down if they can't get a touchdown.",
        analogy: "A backup scoring plan. If you can't carry it all the way in, you can kick it through the posts for half the value."
      },
      {
        term: "Punt",
        def: "Kicking the ball far down the field to the other team on the 4th down, rather than risking giving them the ball close to your goal.",
        analogy: "Clearing the ball. Since you're out of lives, you throw the hot potato as far away as possible so the other team starts far back."
      },
      {
        term: "Blitz",
        def: "When the defense sends extra players (beyond the normal four) charging at the quarterback all at once, trying to tackle him before he can throw.",
        analogy: "Like everyone on defense suddenly rushing the target at once instead of holding position. Risky, but can force a big mistake."
      },
      {
        term: "Sack",
        def: "When a defensive player tackles the quarterback behind the line of scrimmage before he can throw the ball. A big defensive achievement.",
        analogy: "Like catching the tennis server before they can even toss the ball. You shut down the play before it even starts."
      },
      {
        term: "Snap",
        def: "The act of the center player hiking (passing backward between their legs) the ball to the quarterback to start each play.",
        analogy: "The 'start' signal. Nothing in football happens until the snap — it's the trigger that launches every single play."
      },
      {
        term: "Two-Point Conversion",
        def: "After a touchdown, instead of kicking for 1 extra point, a team can attempt to run or pass the ball into the endzone again from the 2-yard line for 2 bonus points.",
        analogy: "A risky 'double-or-nothing' option. Instead of the safe guaranteed 1 point kick, you gamble on making the play again for 2 points."
      }
    ],
    explanations: {
      downs: {
        eli5: "Think of downs like attempts. The offense has 4 tries to carry the ball forward 10 yards. If they make it 10 yards, they get 4 more tries to make another 10 yards, all the way to the endzone!",
        summary: "A play starting with a snap and ending when the ball is dead. The offense must gain 10 yards within 4 downs to earn a new 'First Down'.",
        story: "In early rugby-football, players would just scrum and fight for the ball indefinitely. Walter Camp created the 'down' system in 1882 to ensure structured possession and strategic play, giving rise to American Football."
      },
      scrimmage: {
        eli5: "Before the play begins, the ball is placed on the grass. An imaginary line goes across the field through that ball. The blue team stands on one side, red on the other. No one can cross it until the ball is snapped (passed backwards).",
        summary: "The imaginary line separating the offense and defense before a play begins, running parallel to the goal lines through the ball.",
        story: "Named after 'scrimmage' (a variation of 'skirmish'). It was created to replace the chaotic rugby scrum, allowing teams to stand face-to-face and plan tactical routes."
      },
      points: {
        eli5: "Running the ball into the endzone is a Touchdown (6 points), and you get a free kick after for 1 extra point. Kicking the ball through the giant yellow posts during play is a Field Goal (3 points).",
        summary: "Touchdown = 6 points (plus 1 point Extra Point kick or 2 point conversion). Field Goal = 3 points. Safety = 2 points.",
        story: "Originally, football scoring focused on kicks (like rugby). A touchdown was worth only 2 points and just granted the right to attempt a goal kick! Over the years, carrying the ball (touchdown) became the main attraction, so its value was increased to 6."
      },
      safety: {
        eli5: "If the attacking team is tackled in their own endzone (the place they are trying to protect), the defending team gets 2 points and the ball! It's like an own-goal.",
        summary: "A scoring play worth 2 points awarded to the defense when an offensive player is tackled or commits a foul inside their own endzone.",
        story: "Historically, players would run back into their own endzone to hide or waste time when in trouble. The safety rule was introduced to penalize teams for retreating into their own goal space."
      },
      first_down: {
        eli5: "It's a celebration! It means the team successfully went 10 yards, and their 4 attempts are reset. They get a fresh start.",
        summary: "The first down of a new series of plays, achieved by gaining 10 yards. Resetting the play count back to 1.",
        story: "The yellow line you see on TV isn't on the actual field! It was invented by Sportvision in 1998 using computer tracking so TV viewers could easily see the 'first down line'."
      }
    },
    quiz: [
      {
        q: "How many attempts ('downs') does an offense get to gain 10 yards?",
        options: [
          "2 attempts",
          "4 attempts",
          "6 attempts",
          "Unlimited attempts"
        ],
        answer: 1,
        hint: "Think of it like 4 lives to reach a checkpoint in a video game."
      },
      {
        q: "What is the 'line of scrimmage'?",
        options: [
          "The white boundary line around the field",
          "The imaginary line where the ball is placed before a play starts",
          "The line players stand on during a kickoff",
          "The goal line at the endzone"
        ],
        answer: 1,
        hint: "Neither team can cross this line until the quarterback snaps the ball."
      },
      {
        q: "How many points is a Touchdown worth (before the extra point try)?",
        options: [
          "2 points",
          "3 points",
          "6 points",
          "7 points"
        ],
        answer: 2,
        hint: "It is the primary score, worth double a field goal's points."
      },
      {
        q: "What is a 'punt' in American football?",
        options: [
          "A type of pass thrown by the quarterback",
          "Kicking the ball far downfield to the opponent on the 4th down",
          "Tackling a player by their feet",
          "A celebration dance"
        ],
        answer: 1,
        hint: "When you run out of attempts, you kick the ball far away so the opponent starts far from your goal."
      },
      {
        q: "How does a team earn a 'First Down'?",
        options: [
          "By scoring a touchdown",
          "By gaining 10 yards or more from their starting point",
          "By intercepting a pass",
          "By kicking the ball through the goalposts"
        ],
        answer: 1,
        hint: "A first down is a reset button, achieved by moving the ball forward 10 yards."
      }
    ]
  },

  hockey: {
    name: "Ice Hockey",
    icon: "🏒",
    difficulty: "Medium",
    spotlightTerm: "Icing",
    faqs: [
      { q: "What is icing in hockey?", key: "icing" },
      { q: "What is a power play?", key: "power_play" },
      { q: "What is offsides in hockey?", key: "offsides" },
      { q: "What is a hat trick in hockey?", key: "hat_trick" },
      { q: "What does 'five-hole' mean?", key: "five_hole" },
      { q: "What are periods in hockey?", key: "periods" }
    ],
    terms: [
      {
        term: "Icing",
        def: "When a player shoots the puck from their own half all the way to the opposite end of the ice (past the red goal line) without it being touched. Play stops and resets back in the shooter's zone.",
        analogy: "It's like kicking a ball from one end of a gym to the other without passing — it's considered stalling, so the ref makes you reset near your own goal."
      },
      {
        term: "Power Play",
        def: "When the opposing team has a player in the penalty box, giving your team a 1-player advantage (e.g., 5 vs 4). You have more room and a better chance to score.",
        analogy: "Like playing basketball 5 against 4. With one more player, your team has way more open space to attack."
      },
      {
        term: "Offsides",
        def: "A player cannot enter the attacking zone (cross the blue line) before the puck does. If they enter early, play stops.",
        analogy: "You can't go through the door before the key. The puck is the key — it must enter the zone first before any attacker."
      },
      {
        term: "Hat Trick",
        def: "When one player scores three goals in a single game. Fans traditionally throw hats onto the ice to celebrate.",
        analogy: "Three goals by one player — like hitting three home runs in a baseball game. Extremely rare and impressive."
      },
      {
        term: "Five-Hole",
        def: "The gap between a goalie's legs. It's the fifth 'hole' or opening — after the four corners of the net that the goalie covers with arms and legs.",
        analogy: "Imagine the goalie standing in the net covering the four corners. The space between their legs is the sneaky fifth option that shooters aim for."
      },
      {
        term: "Penalty Kill",
        def: "When your team has a player in the penalty box, you're short-handed and must defend without a full team. Surviving without allowing a goal is called 'killing the penalty'.",
        analogy: "Your team is down a player — like defending in soccer with only 10 men. You hold on until the penalty time expires."
      },
      {
        term: "Slap Shot",
        def: "A powerful shot where the player winds up and slaps the puck with full force — typically the hardest type of shot in hockey, often exceeding 100 mph.",
        analogy: "Like swinging a golf club at full force. It is the hockey equivalent of a baseball pitcher's fastball."
      },
      {
        term: "Zamboni",
        def: "The large machine that drives across the ice surface between periods to resurface and smooth the ice for better play.",
        analogy: "Think of it as a giant eraser for the ice. All the scratches and gouges from skates get smoothed over so players can glide cleanly again."
      }
    ],
    explanations: {
      icing: {
        eli5: "Imagine you're on your side of the hockey rink, and you just hit the puck all the way to the other end without any reason. That's too easy! The ref makes you come back and restart the play near your own goal as a punishment for lazy play.",
        summary: "Shooting the puck from the defensive half past the opponent's goal line without another player touching it. Results in a stoppage and faceoff in the offending team's zone.",
        story: "Icing was introduced in 1937 because teams with a lead would simply fire the puck down the ice repeatedly to kill time and protect their lead. The rule forced teams to actually play the game out and prevented defensive stalling."
      },
      power_play: {
        eli5: "One player from the other team did something naughty and got sent to the penalty box for 2 minutes. Now your team has 5 players while they only have 4. More space means more chances to score!",
        summary: "A man-advantage situation (5v4 or 5v3) when an opponent is penalized and serves time in the penalty box. The penalized team plays short-handed.",
        story: "Hockey penalties date back to the 1800s. Early on, teams could substitute for penalized players! The rules were changed in the 1940s to force teams to play short-handed, dramatically increasing the reward for drawing penalties."
      },
      offsides: {
        eli5: "In hockey, you can't sneak into the other team's zone before the puck gets there. If you cross the blue line before the puck, the referee blows the whistle and play restarts.",
        summary: "A player is offside if they precede the puck into the attacking zone — both skates must cross the blue line after the puck.",
        story: "Hockey borrowed the offsides concept from soccer. Before the rule, players would simply camp in front of the opponent's goal waiting for passes — creating goal-hanging just like early soccer had."
      },
      hat_trick: {
        eli5: "If one player scores 3 goals in the same game, fans celebrate by throwing their hats onto the ice! It's rare and super exciting to watch the ice get covered in hats.",
        summary: "Scoring three goals in a single game by one player. Fans traditionally toss hats onto the ice in celebration.",
        story: "The tradition of throwing hats dates back to the 1950s when a Toronto hat shop owner promised a free hat to any Maple Leafs player who scored three goals in a game. The fan tradition spread globally and became hockey's most beloved celebration."
      },
      five_hole: {
        eli5: "Goalies block the four corners of the net with their arms and legs. But the gap between their legs? That's the 'five-hole'! Sneaky shooters love to aim for it when the goalie is moving around.",
        summary: "The space between the goaltender's legs. One of five traditional target zones for shooters (four corners + between the legs = zone 5).",
        story: "Hockey coaches started numbering the five target zones on a goalie to help players practice precision shooting. The four corners were 1 through 4, and the gap between the legs became the memorable 'five-hole'."
      },
      periods: {
        eli5: "Hockey has 3 rounds of 20 minutes each, called periods. After each period, the teams switch sides and the ice gets cleaned by the Zamboni machine. If tied after 3 periods, overtime follows!",
        summary: "Hockey is divided into three 20-minute periods. If scores are tied after regulation, overtime and possibly a shootout follows.",
        story: "Originally hockey was played in two halves like soccer. Three periods were adopted to allow the ice to be resurfaced more frequently, keeping the playing surface smooth and fast for better play."
      }
    },
    quiz: [
      {
        q: "What is 'icing' in ice hockey?",
        options: [
          "Celebrating a goal by sliding on the ice",
          "Shooting the puck from your own half all the way to the opponent's end without it being touched",
          "Putting ice packs on injured players",
          "When the puck flies off the rink"
        ],
        answer: 1,
        hint: "It's considered lazy, stalling play — think of it as lobbing the ball all the way down the court to kill time."
      },
      {
        q: "What is a 'power play'?",
        options: [
          "A really powerful slap shot",
          "When a coach calls a timeout",
          "When a team has more players on ice because an opponent is serving a penalty",
          "Winning a game in overtime"
        ],
        answer: 2,
        hint: "One team has fewer players on the ice because someone got sent to the penalty box."
      },
      {
        q: "What does 'offsides' mean in hockey?",
        options: [
          "A player skating on the wrong side of the rink",
          "A player entering the attacking zone before the puck crosses the blue line",
          "Hitting the goalie with the puck",
          "Skates crossing the center red line"
        ],
        answer: 1,
        hint: "The puck must enter the attacking zone before any attacking player."
      },
      {
        q: "What is the 'five-hole' in hockey?",
        options: [
          "The fifth period of overtime",
          "Five penalty shots in a row",
          "The gap between the goaltender's legs",
          "Scoring five goals in one game"
        ],
        answer: 2,
        hint: "Goalies cover four corners with their arms and legs — the fifth spot is the space between their legs."
      },
      {
        q: "How many periods are in a standard hockey game?",
        options: [
          "2 periods",
          "4 quarters",
          "3 periods",
          "2 halves"
        ],
        answer: 2,
        hint: "Each period is 20 minutes long. Three periods total."
      }
    ]
  },

  baseball: {
    name: "Baseball",
    icon: "⚾",
    difficulty: "Medium",
    spotlightTerm: "Innings",
    faqs: [
      { q: "What is an inning in baseball?", key: "inning" },
      { q: "What is a strikeout?", key: "strikeout" },
      { q: "What is a walk (base on balls)?", key: "walk" },
      { q: "What is a home run?", key: "home_run" },
      { q: "What does ERA mean for a pitcher?", key: "era" },
      { q: "What is a force out?", key: "force_out" }
    ],
    terms: [
      {
        term: "Inning",
        def: "A round of play divided into two halves. In the top half the visiting team bats; in the bottom half the home team bats. A standard game has 9 innings.",
        analogy: "Like chapters in a book. Each inning has two parts — both teams get their turn to attack and defend before the chapter closes."
      },
      {
        term: "Strikeout",
        def: "When a batter fails to hit the ball after three strikes — pitches either swung at and missed, or good pitches in the strike zone that weren't swung at.",
        analogy: "Three strikes, you're out! Just like the everyday phrase — miss three times and your turn is over."
      },
      {
        term: "Walk",
        def: "When a pitcher throws four pitches outside the strike zone (called 'balls') in a single at-bat. The batter is awarded first base for free.",
        analogy: "Like a free pass. The pitcher was so inaccurate that you get rewarded with a free base without even swinging."
      },
      {
        term: "Home Run",
        def: "Hitting the ball over the outfield fence in fair territory. The batter and all base runners automatically score and jog all four bases.",
        analogy: "The ultimate move. Like hitting a ball so far out of the stadium that everyone on base scores automatically — maximum points in one swing."
      },
      {
        term: "ERA",
        def: "Earned Run Average. A pitcher's statistic measuring how many runs they give up per 9 innings. Lower ERA = harder to score against.",
        analogy: "Like a goalkeeper's goals-allowed average. A lower number means you're an elite pitcher who barely lets anyone score."
      },
      {
        term: "Steal",
        def: "When a base runner advances to the next base on their own initiative while the pitcher is delivering the ball, without the batter hitting it.",
        analogy: "Like sneaking past a defender in soccer when they're not paying attention. Pure athleticism and reading the moment."
      },
      {
        term: "Double Play",
        def: "When the defending team gets two outs in a single continuous play — usually catching a hit, throwing to second base (out #1), then to first base (out #2) in rapid succession.",
        analogy: "A two-for-one deal for the defense. One sharp sequence of throws eliminates two attackers at once."
      },
      {
        term: "RBI",
        def: "Run Batted In. A credit given to a batter when their hit or action causes a teammate to score a run.",
        analogy: "Like getting an 'assist' credit in soccer when your pass leads to a teammate scoring — except in baseball it is called an RBI."
      }
    ],
    explanations: {
      inning: {
        eli5: "Baseball has 9 rounds called innings. In each inning, both teams get a turn to bat and try to score runs. Once a team makes 3 outs, their turn is over and the other team bats.",
        summary: "The basic unit of play in baseball. Each inning has a 'top' (visiting team bats) and 'bottom' (home team bats). Three outs end each half-inning.",
        story: "The 9-inning structure was formalized in 1857. Before that, games were played until one team scored 21 runs — which could take all day! The fixed-inning format made games predictable and set modern baseball's rhythm."
      },
      strikeout: {
        eli5: "When a pitcher throws the ball into the strike zone and you miss it (or don't swing at a good pitch) three times, you are out! Three strikes and your turn is done.",
        summary: "A batter is struck out after accumulating three strikes — either swinging and missing, or not swinging at pitches in the strike zone.",
        story: "The three-strike rule was officially adopted in 1858. Before this, batters could simply wait indefinitely for the perfect pitch! The rule was added to speed up games and create pressure on the batter."
      },
      walk: {
        eli5: "If the pitcher keeps missing the strike zone with 4 pitches, you get to walk to first base for free! It rewards batters with a good eye and punishes wild or inaccurate pitching.",
        summary: "Four balls (pitches outside the strike zone the batter doesn't swing at) earns a free advance to first base — also called 'base on balls'.",
        story: "The walk rule was introduced in 1863 to punish pitchers for deliberate stalling. Early on, it took 9 balls to earn a walk! The number was reduced over the decades, settling at 4 in 1889."
      },
      home_run: {
        eli5: "Hit the ball over the outfield fence and you get to run all four bases and score a run! Any teammates already on bases also automatically score. It's the biggest single play in baseball.",
        summary: "A hit that clears the outfield fence in fair territory. The batter and all base runners score automatically. Also affectionately called a 'homer' or 'dinger'.",
        story: "Babe Ruth transformed baseball in the 1920s by popularizing the home run as a spectacle. Before Ruth, baseball was a game of bunts and base hits called 'small ball'. His power hitting completely changed the sport's identity and popularity."
      },
      era: {
        eli5: "ERA tells you how stingy a pitcher is. If their ERA is 2.00, they give up about 2 runs every 9 innings — that is excellent! Higher ERA means they are easier to score against.",
        summary: "Earned Run Average: average earned runs a pitcher allows per 9 innings pitched. Under 3.00 is elite; 3.00-4.00 is good; over 5.00 is poor.",
        story: "ERA was developed in the late 1800s to better evaluate pitcher quality. Before ERA, pitchers were only judged by wins and losses — which unfairly credited or blamed a pitcher for their entire team's offensive performance."
      },
      force_out: {
        eli5: "If the batter hits the ball and a runner must move to the next base, a defender just needs to touch that base while holding the ball to get the runner out — no need to chase and tag them!",
        summary: "An out recorded by a fielder holding the ball and touching the base to which a runner is forced to advance. No physical tag of the runner required.",
        story: "Force outs were part of baseball from its very early days. The rule elegantly speeds up play — rather than needing to physically tag every runner, defenders just need to get the ball to the right base before the runner arrives."
      }
    },
    quiz: [
      {
        q: "How many innings are in a standard baseball game?",
        options: [
          "7 innings",
          "9 innings",
          "12 innings",
          "4 quarters"
        ],
        answer: 1,
        hint: "Each inning has two halves — the visiting team bats first (top), then the home team (bottom)."
      },
      {
        q: "How many strikes does it take to strike out?",
        options: [
          "2 strikes",
          "4 strikes",
          "3 strikes",
          "1 strike"
        ],
        answer: 2,
        hint: "Think of the everyday phrase everyone knows: 'three strikes, you're out!'"
      },
      {
        q: "What is a 'walk' in baseball?",
        options: [
          "A batter strolling slowly to first base",
          "The pitcher walking off the mound mid-game",
          "Advancing to first base for free after the pitcher throws 4 balls",
          "A slow home run trot"
        ],
        answer: 2,
        hint: "It is a free base reward when the pitcher misses the strike zone 4 times in one at-bat."
      },
      {
        q: "What does a low ERA (Earned Run Average) indicate about a pitcher?",
        options: [
          "They have a high number of strikeouts",
          "They allow very few runs per 9 innings — excellent performance",
          "They have walked many batters",
          "They pitch very slowly"
        ],
        answer: 1,
        hint: "Think of it like a goalkeeper's goals-against average. Lower is always better!"
      },
      {
        q: "What is a 'double play'?",
        options: [
          "Hitting the ball twice in one swing",
          "Two home runs in one game by one player",
          "The defense getting two outs in a single continuous play",
          "A play where two runners score on one hit"
        ],
        answer: 2,
        hint: "The defense eliminates two base runners in one quick sequence of catches and throws."
      }
    ]
  },

  cricket: {
    name: "Cricket",
    icon: "🏏",
    difficulty: "Hard",
    spotlightTerm: "LBW",
    faqs: [
      { q: "What is a Wicket?", key: "wicket" },
      { q: "What is an Over?", key: "over" },
      { q: "What is LBW (Leg Before Wicket)?", key: "lbw" },
      { q: "How do runs work (boundaries, sixes)?", key: "runs" },
      { q: "What is a Duck?", key: "duck" }
    ],
    terms: [
      {
        term: "Wicket",
        def: "Can mean the three wooden stumps behind the batter, or the batter getting knocked out (e.g., 'taking a wicket').",
        analogy: "Like a 'strikeout' in baseball. If the bowler hits the wooden stumps, the batter is out."
      },
      {
        term: "Over",
        def: "A block of 6 consecutive throws (bowls) by a single bowler. After 6 balls, a new bowler takes over from the opposite end.",
        analogy: "Like a pitcher's inning shift. Each bowler gets 6 throws, then the next player takes a turn."
      },
      {
        term: "LBW",
        def: "Leg Before Wicket. A rule where a batter is declared out if the ball hits their leg/body instead of the bat, when it would have otherwise hit the wooden stumps.",
        analogy: "Preventing blocking. You cannot use your body as a shield to block the target (the stumps); you must use your bat!"
      },
      {
        term: "Boundary (4 or 6)",
        def: "Hitting the ball to the edge of the field. If it bounces before crossing, it's 4 runs. If it flies over without bouncing, it's 6 runs.",
        analogy: "Like a home run. A 4 is a ground-rule double, and a 6 is a clear home run over the fence."
      },
      {
        term: "Duck",
        def: "When a batter is dismissed (knocked out) without scoring a single run (getting 0 runs).",
        analogy: "Getting a zero. Like striking out on your first pitch without touching a base."
      },
      {
        term: "No-Ball",
        def: "An illegal delivery by the bowler — e.g., overstepping the crease or bowling too high. The batting team gets a free extra run, and the ball must be bowled again.",
        analogy: "Like a pitcher throwing to the wrong zone. The batter gets a penalty run for the mistake and the bowler must deliver again."
      },
      {
        term: "Wide",
        def: "A delivery bowled too far from the batter to be reachable. It counts as a run for the batting team and must be re-bowled.",
        analogy: "Like a penalty in soccer for a bad tackle — the offender gives the opposition a free run and has to redo the action."
      },
      {
        term: "Golden Duck",
        def: "Getting out on the very first ball faced — the most humiliating form of a duck in cricket.",
        analogy: "Striking out looking on the first pitch without even swinging. You came to the plate and left immediately."
      },
      {
        term: "Century",
        def: "When a batter scores 100 or more runs in a single innings. An incredible individual milestone celebrated by removing the helmet and raising the bat to the crowd.",
        analogy: "Like scoring a hat-trick of hat-tricks. A century is the gold standard for a batter's performance in a single innings."
      }
    ],
    explanations: {
      wicket: {
        eli5: "A wicket is the set of three wooden sticks behind the batter. The bowler tries to hit them with the ball to get the batter out. If the sticks fall, the batter has to leave!",
        summary: "The set of three stumps and two bails. It also refers to the dismissal of a batter.",
        story: "In 1700s England, shepherds used the gates of sheep pens ('wickets') as targets to throw balls at. The name stuck!"
      },
      over: {
        eli5: "An over is just a set of 6 throws. One bowler throws 6 times, and then the team swaps bowlers so someone else throws 6 times from the other side.",
        summary: "A series of six legal deliveries bowled from one end of the pitch.",
        story: "In early cricket, an over was only 4 balls! It was changed to 6 (and briefly 8 in some countries) to balance the physical toll on the bowler with the speed of the match."
      },
      lbw: {
        eli5: "The batter's job is to block the sticks with their bat. If the ball hits their leg, but the referee thinks the ball *would* have hit the sticks if their leg wasn't in the way, the batter is out. You can't use your legs as a shield!",
        summary: "Leg Before Wicket. A dismissal method when the ball hits the batter's leg in line with the stumps, preventing a hit on the wicket.",
        story: "Introduced in 1774 because batters started wearing thick leg pads and would intentionally stand right in front of the stumps, blocking the ball with their legs so they could never be bowled out. Everyone agreed this was unsporting."
      },
      runs: {
        eli5: "If you hit the ball, you and your partner run back and forth between the two sets of sticks. Each trip is 1 run. If you hit it all the way to the boundary rope, you get 4 runs (if it bounced) or 6 runs (if it flew over) instantly without running!",
        summary: "Runs are scored by running between wickets or hitting boundaries (4 runs for a bouncing ball crossing the rope, 6 runs for an aerial hit).",
        story: "In old England, players had to run physical miles! Scoring a boundary was introduced to give players a break from running when they hit a massive shot, and to reward power hitting."
      },
      duck: {
        eli5: "Getting out on 0 points. It's called a 'duck' because the number 0 looks like a round duck's egg.",
        summary: "A batter's dismissal for a score of zero.",
        story: "In 1866, the Prince of Wales got out for zero. A local newspaper wrote that he 'retired to the pavilion on a duck's egg' (0). The term caught on and was shortened to 'duck'."
      }
    },
    quiz: [
      {
        q: "What is an 'over' in cricket?",
        options: [
          "When the game is finished",
          "A set of 6 consecutive throws (bowls) by one bowler",
          "Hitting the ball over the fence",
          "When the batter drops their bat"
        ],
        answer: 1,
        hint: "After these 6 throws, a new bowler takes a turn from the other side."
      },
      {
        q: "What does the LBW rule stand for?",
        options: [
          "Long Ball Warning",
          "Leg Before Wicket",
          "Left-Handed Batter Walk",
          "Line Boundary Width"
        ],
        answer: 1,
        hint: "It prevents a batter from using their leg pads to shield the stumps."
      },
      {
        q: "How many runs do you score if the ball flies over the boundary rope without bouncing?",
        options: [
          "1 run",
          "4 runs",
          "6 runs",
          "10 runs"
        ],
        answer: 2,
        hint: "This is the maximum points you can get from a single strike."
      },
      {
        q: "What does getting a 'duck' mean in cricket?",
        options: [
          "Getting hit by a flying bird",
          "Ducking under a fast ball",
          "Getting knocked out with zero runs scored",
          "Winning the game easily"
        ],
        answer: 2,
        hint: "It refers to the shape of 'l'oeuf' (an egg), which looks like a zero."
      },
      {
        q: "What is the primary target that a bowler tries to hit with the ball?",
        options: [
          "The batter's helmet",
          "The wooden stumps (wicket) behind the batter",
          "The boundary rope",
          "The referee's hand"
        ],
        answer: 1,
        hint: "If the ball hits this and knocks the bails off, the batter is out."
      }
    ]
  }
};

// SVG templates for interactive courts
const SVGTemplates = {
  soccer: `
    <svg class="court-svg" viewBox="0 0 600 360" xmlns="http://www.w3.org/2000/svg">
      <!-- Background Pitch -->
      <rect width="600" height="360" fill="#1b4332" rx="10" />
      <rect x="15" y="15" width="570" height="330" fill="none" stroke="#ffffff" stroke-width="2" />
      
      <!-- Halfway Line -->
      <line x1="300" y1="15" x2="300" y2="345" stroke="#ffffff" stroke-width="2" />
      <circle cx="300" cy="180" r="50" fill="none" stroke="#ffffff" stroke-width="2" class="hotspot-zone" id="zone-soccer-center" data-title="Center Circle" data-desc="Where the match starts. At kickoff, only two players stand inside, and the opposing team must stay outside this circle until the ball is kicked." />
      <circle cx="300" cy="180" r="3" fill="#ffffff" />
      
      <!-- Penalty Area Left -->
      <rect x="15" y="75" width="90" height="210" fill="none" stroke="#ffffff" stroke-width="2" class="hotspot-zone" id="zone-soccer-penalty-box" data-title="Penalty Box" data-desc="This is the goalie's kingdom! Here, the goalie can touch the ball with their hands. If a defender fouls an attacker inside this box, the attacking team is awarded a penalty kick." />
      <rect x="15" y="125" width="30" height="110" fill="none" stroke="#ffffff" stroke-width="2" class="hotspot-zone" id="zone-soccer-goal-box" data-title="Goal Area / Six-Yard Box" data-desc="Goal kicks are taken from within this smaller box. It serves as a safety boundary for goalkeeper protection during corner kicks." />
      <circle cx="105" cy="180" r="1.5" fill="#ffffff" />
      <path d="M 105 145 A 50 50 0 0 1 105 215" fill="none" stroke="#ffffff" stroke-width="2" />
      
      <!-- Penalty Area Right -->
      <rect x="495" y="75" width="90" height="210" fill="none" stroke="#ffffff" stroke-width="2" class="hotspot-zone" id="zone-soccer-penalty-box-right" data-title="Penalty Box" data-desc="This is the goalie's kingdom! Here, the goalie can touch the ball with their hands. If a defender fouls an attacker inside this box, the attacking team is awarded a penalty kick." />
      <rect x="555" y="125" width="30" height="110" fill="none" stroke="#ffffff" stroke-width="2" />
      <circle cx="495" cy="180" r="1.5" fill="#ffffff" />
      <path d="M 495 145 A 50 50 0 0 0 495 215" fill="none" stroke="#ffffff" stroke-width="2" />
      
      <!-- Touchline / Sidelines -->
      <line x1="15" y1="15" x2="585" y2="15" stroke="#ffffff" stroke-width="6" stroke-linecap="round" class="hotspot-line" id="line-soccer-touchline" data-title="Touchline / Sideline" data-desc="The outer boundaries of play. If the entire ball crosses this line, it goes out of play, and the opposing team restarts with a throw-in." />
      <line x1="15" y1="345" x2="585" y2="345" stroke="#ffffff" stroke-width="6" stroke-linecap="round" class="hotspot-line" id="line-soccer-touchline-bottom" data-title="Touchline / Sideline" data-desc="The outer boundaries of play. If the entire ball crosses this line, it goes out of play, and the opposing team restarts with a throw-in." />
      
      <!-- Offside Line (Dashed, hidden by default, toggled in animation) -->
      <line x1="420" y1="15" x2="420" y2="345" stroke="#ff4444" stroke-width="2" stroke-dasharray="6" id="soccer-offside-line" style="opacity: 0; transition: opacity 0.5s;" />
      
      <!-- Offside Players for Animation -->
      <!-- Defenders (Red) -->
      <circle cx="420" cy="100" r="8" fill="#ef4444" class="court-player" id="soccer-def-1" />
      <circle cx="420" cy="180" r="8" fill="#ef4444" class="court-player" id="soccer-def-2" />
      <circle cx="420" cy="260" r="8" fill="#ef4444" class="court-player" id="soccer-def-3" />
      <!-- Goalie (Orange) -->
      <circle cx="565" cy="180" r="8" fill="#f59e0b" />
      
      <!-- Attackers (Blue) -->
      <circle cx="330" cy="180" r="8" fill="#00e5ff" class="court-player" id="soccer-passer" />
      <circle cx="400" cy="110" r="8" fill="#00e5ff" class="court-player" id="soccer-runner" />
      
      <!-- Ball -->
      <circle cx="330" cy="180" r="5" fill="#ffffff" stroke="#000000" stroke-width="1" class="court-ball" id="soccer-ball" />
      
      <!-- Passing Trajectory -->
      <path d="M 330 180 Q 400 145 440 115" fill="none" stroke="#00e5ff" stroke-width="2" class="court-traj" id="soccer-ball-traj" />

      <!-- Offside Text Badge -->
      <g id="soccer-badge-group" style="opacity: 0; transition: opacity 0.5s;">
        <rect x="425" y="55" width="130" height="30" fill="#ef4444" rx="4" />
        <text x="490" y="74" fill="#ffffff" font-family="Outfit" font-weight="700" font-size="12" text-anchor="middle">OFFSIDE PLAYER</text>
      </g>
    </svg>
  `,
  basketball: `
    <svg class="court-svg" viewBox="0 0 600 360" xmlns="http://www.w3.org/2000/svg">
      <!-- Wood Court Background -->
      <rect width="600" height="360" fill="#c25910" rx="10" />
      <!-- Court boundaries -->
      <rect x="15" y="15" width="570" height="330" fill="none" stroke="#ffffff" stroke-width="2" />
      
      <!-- Key / Paint Left -->
      <rect x="15" y="110" width="115" height="140" fill="none" stroke="#ffffff" stroke-width="2" class="hotspot-zone" id="zone-bb-paint" data-title="The Paint / Key" data-desc="The colored lane area. Attacking players can only stand inside this area for up to 3 consecutive seconds. It's the primary battleground for scoring close-up rebounds." />
      <!-- Free throw circle Left -->
      <path d="M 130 150 A 30 30 0 0 1 130 210" fill="none" stroke="#ffffff" stroke-width="2" />
      <path d="M 130 150 A 30 30 0 0 0 130 210" fill="none" stroke="#ffffff" stroke-dasharray="4" stroke-width="2" />
      
      <!-- Midcourt line -->
      <line x1="300" y1="15" x2="300" y2="345" stroke="#ffffff" stroke-width="2" />
      <circle cx="300" cy="180" r="40" fill="none" stroke="#ffffff" stroke-width="2" class="hotspot-zone" id="zone-bb-midcourt" data-title="Midcourt Line" data-desc="Divides the court in half. Once an attacking team crosses this line, they cannot pass the ball back over it (called a Backcourt Violation)." />
      
      <!-- Basket and Backboard Left -->
      <line x1="35" y1="165" x2="35" y2="195" stroke="#ffffff" stroke-width="2" />
      <circle cx="45" cy="180" r="8" fill="none" stroke="#ff5500" stroke-width="2" />
      
      <!-- 3-point line Left -->
      <path d="M 15 50 Q 155 180 15 310" fill="none" stroke="#ffffff" stroke-width="2" class="hotspot-line" id="line-bb-3point" data-title="Three-Point Arc" data-desc="Any basket shot from beyond this curved line is worth 3 points. Shots inside it are worth 2 points." />
      
      <!-- Free throw line Left -->
      <line x1="130" y1="140" x2="130" y2="220" stroke="#ffffff" stroke-width="4" class="hotspot-line" id="line-bb-freethrow" data-title="Free Throw Line" data-desc="Where players stand to shoot unguarded penalty shots (worth 1 point) after being fouled." />
      
      <!-- Animation elements -->
      <!-- Player Dot -->
      <circle cx="200" cy="180" r="10" fill="#00e5ff" class="court-player" id="bb-player" />
      <!-- Basketball -->
      <circle cx="200" cy="180" r="6" fill="#f97316" stroke="#ffffff" stroke-width="1" class="court-ball" id="bb-ball" />
      
      <!-- Shooting Trajectory -->
      <path d="M 200 180 Q 120 100 45 180" fill="none" stroke="#ffffff" stroke-dasharray="4" stroke-width="2" class="court-traj" id="bb-ball-traj" />
      
      <!-- Points Text Splash -->
      <text x="75" y="160" fill="#00e5ff" font-family="Outfit" font-weight="800" font-size="24" text-anchor="middle" id="bb-points-splash" style="opacity: 0; transition: opacity 0.3s;">+3 PTS!</text>
    </svg>
  `,
  tennis: `
    <svg class="court-svg" viewBox="0 0 600 360" xmlns="http://www.w3.org/2000/svg">
      <!-- Tennis Blue/Green Court Background -->
      <rect width="600" height="360" fill="#1e3a8a" rx="10" />
      <!-- Outer Green border -->
      <rect x="30" y="30" width="540" height="300" fill="#15803d" />
      
      <!-- Singles Court Outline -->
      <rect x="60" y="60" width="480" height="240" fill="none" stroke="#ffffff" stroke-width="2" />
      
      <!-- Doubles Alleys (Side corridors) -->
      <rect x="60" y="30" width="480" height="30" fill="rgba(255,255,255,0.05)" stroke="#ffffff" stroke-width="2" class="hotspot-zone" id="zone-tennis-alley-top" data-title="Doubles Alley" data-desc="The side lanes of the court. In singles (1v1), these lines are 'out-of-bounds'. In doubles (2v2), they are 'in-bounds' to accommodate more players." />
      <rect x="60" y="300" width="480" height="30" fill="rgba(255,255,255,0.05)" stroke="#ffffff" stroke-width="2" class="hotspot-zone" id="zone-tennis-alley-bottom" data-title="Doubles Alley" data-desc="The side lanes of the court. In singles (1v1), these lines are 'out-of-bounds'. In doubles (2v2), they are 'in-bounds' to accommodate more players." />
      
      <!-- Center Line / Net -->
      <line x1="300" y1="30" x2="300" y2="330" stroke="#ffffff" stroke-width="4" stroke-dasharray="2 2" class="hotspot-line" id="line-tennis-net" data-title="The Net" data-desc="Dividing line. It is 3 feet tall at the center. If a ball hits the net and fails to cross, the point is lost. If a serve hits the net strap and lands in, it is a 'Let' (redo)." />
      
      <!-- Service Lines -->
      <line x1="180" y1="60" x2="180" y2="300" stroke="#ffffff" stroke-width="2" />
      <line x1="420" y1="60" x2="420" y2="300" stroke="#ffffff" stroke-width="2" />
      
      <!-- Service Box Dividers -->
      <line x1="60" y1="180" x2="180" y2="180" stroke="#ffffff" stroke-width="2" />
      <line x1="420" y1="180" x2="540" y2="180" stroke="#ffffff" stroke-width="2" />
      <line x1="180" y1="180" x2="420" y2="180" stroke="#ffffff" stroke-width="2" />
      
      <!-- Service Boxes Highlight Zones -->
      <rect x="180" y="60" width="120" height="120" fill="rgba(255,255,255,0.02)" class="hotspot-zone" id="zone-tennis-service-left" data-title="Deuce Service Box" data-desc="The box where the serve must land. When serving from the right side of the baseline, the ball must cross diagonally and land inside this box." />
      <rect x="180" y="180" width="120" height="120" fill="rgba(255,255,255,0.02)" class="hotspot-zone" id="zone-tennis-service-right" data-title="Ad Service Box" data-desc="When serving from the left side of the baseline, the serve must land diagonally in this box." />
      
      <!-- Baselines -->
      <line x1="60" y1="30" x2="60" y2="330" stroke="#ffffff" stroke-width="4" class="hotspot-line" id="line-tennis-baseline-left" data-title="Baseline" data-desc="The back boundary line. Players stand behind this line to serve. If a hit goes past this line, it is 'out'." />
      <line x1="540" y1="30" x2="540" y2="330" stroke="#ffffff" stroke-width="4" class="hotspot-line" id="line-tennis-baseline-right" data-title="Baseline" data-desc="The back boundary line. Players stand behind this line to serve. If a hit goes past this line, it is 'out'." />
      
      <!-- Animation Ball -->
      <circle cx="50" cy="180" r="5" fill="#ccff00" class="court-ball" id="tennis-ball" />
      
      <!-- Highlight boundaries overlay -->
      <rect x="60" y="60" width="480" height="240" fill="rgba(255, 229, 0, 0.15)" stroke="#ffe500" stroke-width="2" id="tennis-singles-highlight" style="opacity: 0; transition: opacity 0.5s;" />
      <rect x="60" y="30" width="480" height="300" fill="rgba(0, 229, 255, 0.15)" stroke="#00e5ff" stroke-width="2" id="tennis-doubles-highlight" style="opacity: 0; transition: opacity 0.5s;" />
    </svg>
  `,

  football: `
    <svg class="court-svg" viewBox="0 0 600 360" xmlns="http://www.w3.org/2000/svg">
      <!-- Field background -->
      <rect width="600" height="360" fill="#166534" rx="10"/>
      <!-- Outer boundary -->
      <rect x="15" y="20" width="570" height="320" fill="none" stroke="#ffffff" stroke-width="2"/>
      
      <!-- Endzones (Left and Right) -->
      <rect x="15" y="20" width="65" height="320" fill="rgba(239,68,68,0.2)" stroke="#ef4444" stroke-width="2"
        class="hotspot-zone" id="zone-fb-endzone-left" data-title="End Zone"
        data-desc="The scoring territory. The attacking team must carry or catch the ball in this zone to score a touchdown (6 points). Defenders guard this area at all costs."/>
      <rect x="520" y="20" width="65" height="320" fill="rgba(239,68,68,0.2)" stroke="#ef4444" stroke-width="2"
        class="hotspot-zone" id="zone-fb-endzone-right" data-title="End Zone"
        data-desc="The scoring territory. The attacking team must carry or catch the ball in this zone to score a touchdown (6 points). Defenders guard this area at all costs."/>
      
      <!-- Yard Lines (every ~57px = 10 yards) -->
      <line x1="137" y1="20" x2="137" y2="340" stroke="#ffffff" stroke-width="1" opacity="0.6"
        class="hotspot-line" id="line-fb-10yd" data-title="10-Yard Marker"
        data-desc="Each stripe marks 10 yards. The offense must advance 10 yards on 4 downs (attempts) to earn a 'first down' and reset their count."/>
      <line x1="194" y1="20" x2="194" y2="340" stroke="#ffffff" stroke-width="1" opacity="0.6"/>
      <line x1="251" y1="20" x2="251" y2="340" stroke="#ffffff" stroke-width="1" opacity="0.6"/>
      <line x1="300" y1="20" x2="300" y2="340" stroke="#ffffff" stroke-width="3"
        class="hotspot-line" id="line-fb-50yd" data-title="50-Yard Line (Midfield)"
        data-desc="The exact center of the field. When the game begins, the kickoff takes place near here. Crossing the 50-yard line means you're in the opponent's territory."/>
      <line x1="349" y1="20" x2="349" y2="340" stroke="#ffffff" stroke-width="1" opacity="0.6"/>
      <line x1="406" y1="20" x2="406" y2="340" stroke="#ffffff" stroke-width="1" opacity="0.6"/>
      <line x1="463" y1="20" x2="463" y2="340" stroke="#ffffff" stroke-width="1" opacity="0.6"/>
      
      <!-- Goalposts Left -->
      <line x1="15" y1="180" x2="25" y2="180" stroke="#f59e0b" stroke-width="3"/>
      <line x1="20" y1="140" x2="20" y2="220" stroke="#f59e0b" stroke-width="3"/>
      <line x1="10" y1="140" x2="30" y2="140" stroke="#f59e0b" stroke-width="3"
        class="hotspot-zone" id="zone-fb-goalpost-left" data-title="Goalposts (Field Goal)"
        data-desc="The yellow Y-shaped posts. Kicking the ball through the uprights during a play scores a Field Goal (3 points). Teams usually attempt this on 4th down if they're close enough."/>
      <line x1="10" y1="220" x2="30" y2="220" stroke="#f59e0b" stroke-width="3"/>
      
      <!-- Goalposts Right -->
      <line x1="585" y1="180" x2="575" y2="180" stroke="#f59e0b" stroke-width="3"/>
      <line x1="580" y1="140" x2="580" y2="220" stroke="#f59e0b" stroke-width="3"/>
      <line x1="570" y1="140" x2="590" y2="140" stroke="#f59e0b" stroke-width="3"
        class="hotspot-zone" id="zone-fb-goalpost-right" data-title="Goalposts (Field Goal)"
        data-desc="The yellow Y-shaped posts. Kicking the ball through the uprights during a play scores a Field Goal (3 points). Teams usually attempt this on 4th down if they're close enough."/>
      <line x1="570" y1="220" x2="590" y2="220" stroke="#f59e0b" stroke-width="3"/>
      
      <!-- Line of Scrimmage (animated) -->
      <line x1="251" y1="20" x2="251" y2="340" stroke="#00e5ff" stroke-width="3" stroke-dasharray="6" id="fb-scrimmage-line" style="opacity:0; transition: opacity 0.5s;"/>
      
      <!-- Players -->
      <!-- Offense team (blue) -->
      <circle cx="260" cy="180" r="8" fill="#3b82f6" class="court-player" id="fb-qb"/>
      <circle cx="255" cy="155" r="7" fill="#3b82f6" class="court-player" id="fb-wr1"/>
      <circle cx="255" cy="205" r="7" fill="#3b82f6" class="court-player" id="fb-wr2"/>
      <!-- Defense (red) -->
      <circle cx="290" cy="180" r="8" fill="#ef4444" class="court-player" id="fb-def1"/>
      <circle cx="290" cy="155" r="7" fill="#ef4444" class="court-player" id="fb-def2"/>
      <circle cx="290" cy="205" r="7" fill="#ef4444" class="court-player" id="fb-def3"/>
      
      <!-- Football ball -->
      <ellipse cx="260" cy="180" rx="6" ry="4" fill="#b45309" stroke="#fff" stroke-width="1" class="court-ball" id="fb-ball"/>
      
      <!-- Ball trajectory -->
      <path d="M 260 180 Q 320 140 380 160" fill="none" stroke="#f59e0b" stroke-dasharray="5" stroke-width="2" class="court-traj" id="fb-ball-traj"/>
      
      <!-- Down markers -->
      <text x="300" y="15" fill="#ffffff" font-family="Outfit" font-weight="700" font-size="11" text-anchor="middle" id="fb-down-label" style="opacity:0;">1st &amp; 10</text>
    </svg>
  `,

  cricket: `
    <svg class="court-svg" viewBox="0 0 600 360" xmlns="http://www.w3.org/2000/svg">
      <!-- Outfield (green) -->
      <ellipse cx="300" cy="180" rx="270" ry="165" fill="#166534" stroke="#ffffff" stroke-width="2"
        class="hotspot-zone" id="zone-cr-outfield" data-title="Outfield"
        data-desc="The large grassy area beyond the infield. If a batted ball rolls to the boundary rope, it scores 4 runs. If it flies over the rope without bouncing, it's 6 runs — the maximum from a single hit!"/>
      
      <!-- Infield (pitch area, lighter green) -->
      <ellipse cx="300" cy="180" rx="130" ry="85" fill="#15803d" stroke="#ffffff" stroke-width="1.5"/>
      
      <!-- Boundary rope indicator -->
      <ellipse cx="300" cy="180" rx="260" ry="158" fill="none" stroke="#f97316" stroke-width="3" stroke-dasharray="8 4"
        class="hotspot-line" id="line-cr-boundary" data-title="Boundary Rope"
        data-desc="The orange dashed line marks the boundary. Ground the ball here = 4 runs. Clear it in the air = 6 runs. This is the equivalent of a home run fence in baseball."/>
      
      <!-- The Pitch (central strip) -->
      <rect x="250" y="128" width="100" height="104" fill="#d4a853" rx="4" stroke="#ffffff" stroke-width="1.5"
        class="hotspot-zone" id="zone-cr-pitch" data-title="The Pitch"
        data-desc="The 22-yard central strip where all the action happens. The bowler runs in and delivers the ball from one end; the batter defends from the other end."/>
      
      <!-- Wickets (Left - Batting end) -->
      <line x1="277" y1="195" x2="277" y2="215" stroke="#ffffff" stroke-width="3"/>
      <line x1="284" y1="195" x2="284" y2="215" stroke="#ffffff" stroke-width="3"/>
      <line x1="291" y1="195" x2="291" y2="215" stroke="#ffffff" stroke-width="3"/>
      <line x1="274" y1="197" x2="294" y2="197" stroke="#d4a853" stroke-width="2.5"/>
      <rect x="270" y="193" width="26" height="22" fill="transparent" stroke="#f97316" stroke-width="2"
        class="hotspot-zone" id="zone-cr-wicket-bat" data-title="Wickets (Batting End)"
        data-desc="The three wooden stumps with bails on top. The batter defends these. If the bowler hits them and the bails fall off, the batter is OUT (bowled)! The batter must also protect against LBW — using their legs to block counts as out."/>
      
      <!-- Wickets (Right - Bowling end) -->
      <line x1="309" y1="143" x2="309" y2="163" stroke="#ffffff" stroke-width="3"/>
      <line x1="316" y1="143" x2="316" y2="163" stroke="#ffffff" stroke-width="3"/>
      <line x1="323" y1="143" x2="323" y2="163" stroke="#ffffff" stroke-width="3"/>
      <line x1="306" y1="145" x2="326" y2="145" stroke="#d4a853" stroke-width="2.5"/>
      <rect x="302" y="141" width="26" height="22" fill="transparent" stroke="#f97316" stroke-width="2"
        class="hotspot-zone" id="zone-cr-wicket-bowl" data-title="Wickets (Bowling End)"
        data-desc="The wickets at the bowler's end. A batter running between the wickets must ground their bat behind this crease (the white line) to complete a run safely."/>
      
      <!-- Crease lines -->
      <line x1="260" y1="217" x2="310" y2="217" stroke="#ffffff" stroke-width="2"
        class="hotspot-line" id="line-cr-popping-crease" data-title="Popping Crease"
        data-desc="The white line in front of the wickets. A batter must ground their bat behind this line to be safely in their crease (safe zone). If a fielder breaks the wickets while they are outside this line, they are run out!"/>
      <line x1="290" y1="141" x2="340" y2="141" stroke="#ffffff" stroke-width="2"/>
      
      <!-- Batter player -->
      <circle cx="284" cy="184" r="8" fill="#f59e0b" class="court-player" id="cr-batter"/>
      
      <!-- Bowler player (at bowling end) -->
      <circle cx="320" cy="175" r="8" fill="#ef4444" class="court-player" id="cr-bowler"/>
      
      <!-- Ball -->
      <circle cx="318" cy="175" r="5" fill="#cc2222" stroke="#ffffff" stroke-width="1" class="court-ball" id="cr-ball"/>
      
      <!-- Ball trajectory -->
      <path d="M 318 175 Q 300 190 285 190" fill="none" stroke="#cc2222" stroke-dasharray="5" stroke-width="2" class="court-traj" id="cr-ball-traj"/>
    </svg>
  `,

  hockey: `
    <svg class="court-svg" viewBox="0 0 600 360" xmlns="http://www.w3.org/2000/svg">
      <!-- Ice surface -->
      <rect width="600" height="360" fill="#e0f2fe" rx="20"/>
      <!-- Rink border -->
      <rect x="10" y="10" width="580" height="340" rx="40" fill="none" stroke="#94a3b8" stroke-width="4"/>
      
      <!-- Center red line -->
      <line x1="300" y1="10" x2="300" y2="350" stroke="#ef4444" stroke-width="4"
        class="hotspot-line" id="line-hk-center" data-title="Center Red Line"
        data-desc="The middle line of the rink. Icing violations are judged from here — if a player shoots the puck over this line and it travels all the way to the opponent's goal line untouched, it's icing."/>
      
      <!-- Center faceoff circle -->
      <circle cx="300" cy="180" r="40" fill="none" stroke="#1e40af" stroke-width="2"
        class="hotspot-zone" id="zone-hk-center-faceoff" data-title="Center Faceoff Circle"
        data-desc="Where the game begins and where play restarts after goals. Two players face off — the referee drops the puck between them and they fight for possession."/>
      <circle cx="300" cy="180" r="3" fill="#1e40af"/>
      
      <!-- Blue lines (offside zones) -->
      <line x1="180" y1="10" x2="180" y2="350" stroke="#1e40af" stroke-width="5"
        class="hotspot-line" id="line-hk-blue-left" data-title="Blue Line (Offside Line)"
        data-desc="The blue line marks the entry to the attacking zone. If a player enters the attacking zone BEFORE the puck crosses this line, it's called offsides and play stops. Think of it as a border you can't cross without the puck going first."/>
      <line x1="420" y1="10" x2="420" y2="350" stroke="#1e40af" stroke-width="5"
        class="hotspot-line" id="line-hk-blue-right" data-title="Blue Line (Offside Line)"
        data-desc="The blue line marks the entry to the attacking zone. Players must wait for the puck to enter first before following it in."/>
      
      <!-- Goal creases (left and right) -->
      <path d="M 40 155 A 30 30 0 0 1 40 205" fill="rgba(30,64,175,0.15)" stroke="#1e40af" stroke-width="2"
        class="hotspot-zone" id="zone-hk-crease-left" data-title="Goalie Crease"
        data-desc="The painted semicircle in front of each goal. Attacking players are not allowed to stand inside this crease unless the puck is already there. If they score while in the crease, the goal is disallowed."/>
      <line x1="40" y1="155" x2="40" y2="205" stroke="#1e40af" stroke-width="2"/>
      <path d="M 560 155 A 30 30 0 0 0 560 205" fill="rgba(30,64,175,0.15)" stroke="#1e40af" stroke-width="2"/>
      <line x1="560" y1="155" x2="560" y2="205" stroke="#1e40af" stroke-width="2"/>
      
      <!-- Goals -->
      <rect x="10" y="163" width="30" height="34" fill="none" stroke="#ef4444" stroke-width="3"
        class="hotspot-zone" id="zone-hk-goal-left" data-title="Goal Net"
        data-desc="The net attached to the back boards. Scoring a goal = shooting the puck fully past the red goal line and into the net. Goals are reviewed by officials using video replay for borderline situations."/>
      <rect x="560" y="163" width="30" height="34" fill="none" stroke="#ef4444" stroke-width="3"
        class="hotspot-zone" id="zone-hk-goal-right" data-title="Goal Net"
        data-desc="The net attached to the back boards. Shooting the puck fully across the red goal line counts as a goal. The referee signals a goal by pointing to the score clock."/>
      
      <!-- Goal lines (red) -->
      <line x1="40" y1="10" x2="40" y2="350" stroke="#ef4444" stroke-width="2" stroke-dasharray="4"
        class="hotspot-line" id="line-hk-goal-left" data-title="Goal Line"
        data-desc="The red line across each end. For icing, the puck must cross this line untouched from past the center red line. For goals, the puck must fully cross this line into the net."/>
      <line x1="560" y1="10" x2="560" y2="350" stroke="#ef4444" stroke-width="2" stroke-dasharray="4"/>
      
      <!-- Zone labels -->
      <text x="110" y="30" fill="#1e40af" font-family="Outfit" font-weight="600" font-size="11" text-anchor="middle" opacity="0.7">DEFENSIVE ZONE</text>
      <text x="300" y="30" fill="#64748b" font-family="Outfit" font-weight="600" font-size="11" text-anchor="middle" opacity="0.7">NEUTRAL ZONE</text>
      <text x="490" y="30" fill="#1e40af" font-family="Outfit" font-weight="600" font-size="11" text-anchor="middle" opacity="0.7">ATTACKING ZONE</text>
      
      <!-- Players -->
      <circle cx="380" cy="180" r="9" fill="#3b82f6" class="court-player" id="hk-attacker1"/>
      <circle cx="400" cy="155" r="8" fill="#3b82f6" class="court-player" id="hk-attacker2"/>
      <circle cx="440" cy="180" r="9" fill="#ef4444" class="court-player" id="hk-defender"/>
      <circle cx="555" cy="180" r="10" fill="#f59e0b" class="court-player" id="hk-goalie"/>
      
      <!-- Puck -->
      <ellipse cx="380" cy="180" rx="5" ry="3" fill="#1e293b" class="court-ball" id="hk-puck"/>
      
      <!-- Puck trajectory -->
      <path d="M 380 180 Q 480 160 555 180" fill="none" stroke="#1e293b" stroke-dasharray="5" stroke-width="2" class="court-traj" id="hk-puck-traj"/>
      
      <!-- Icing line visualization -->
      <line x1="300" y1="10" x2="300" y2="350" stroke="#ef4444" stroke-width="3" stroke-dasharray="8" id="hk-icing-line" style="opacity:0; transition: opacity 0.5s;"/>
      <text x="300" y="370" id="hk-icing-label" fill="#ef4444" font-family="Outfit" font-weight="700" font-size="12" text-anchor="middle" style="opacity:0;">ICING — shot from here goes all the way past their goal line!</text>
    </svg>
  `,

  baseball: `
    <svg class="court-svg" viewBox="0 0 600 360" xmlns="http://www.w3.org/2000/svg">
      <!-- Outfield grass -->
      <path d="M 300 320 L 60 80 A 260 260 0 0 1 540 80 Z" fill="#166534"/>
      <!-- Infield dirt (brown diamond area) -->
      <polygon points="300,300 175,175 300,50 425,175" fill="#c2a06e"/>
      <!-- Infield grass overlay inside basepath -->
      <polygon points="300,270 195,170 300,70 405,170" fill="#15803d"/>
      
      <!-- Foul lines -->
      <line x1="300" y1="310" x2="60" y2="80" stroke="#ffffff" stroke-width="2"
        class="hotspot-line" id="line-bb-foul-left" data-title="Foul Line (Left Field)"
        data-desc="The boundary between fair and foul territory. A ball must land or be in play 'inside' this line (toward center field) to be considered fair. A ball outside is 'foul' — not in play."/>
      <line x1="300" y1="310" x2="540" y2="80" stroke="#ffffff" stroke-width="2"
        class="hotspot-line" id="line-bb-foul-right" data-title="Foul Line (Right Field)"
        data-desc="The right boundary. Balls landing outside the foul lines are 'foul' and don't count as hits. If a batter hits two foul balls they still only have 2 strikes (fouls can't strike them out, unless it's a bunt)."/>
      
      <!-- Home Plate -->
      <polygon points="300,310 288,298 288,288 312,288 312,298" fill="#ffffff"
        class="hotspot-zone" id="zone-bb-home" data-title="Home Plate"
        data-desc="Where the batter stands and where runners must touch to score a run. The strike zone is defined by the area above home plate, roughly between the batter's knees and their mid-torso. Pitches through this zone that aren't swung at are called 'strikes'."/>
      
      <!-- First Base -->
      <rect x="413" y="163" width="22" height="22" fill="#ffffff"
        class="hotspot-zone" id="zone-bb-first" data-title="First Base"
        data-desc="The first base a batter must reach after hitting the ball. They must get here before the ball does (fielded and thrown to the baseman) to be safe. On a walk or hit-by-pitch, the batter walks directly to here."/>
      
      <!-- Second Base -->
      <rect x="289" y="48" width="22" height="22" fill="#ffffff"
        class="hotspot-zone" id="zone-bb-second" data-title="Second Base"
        data-desc="The base in center field. Reaching 2nd base after a single hit is called a 'double'. Baserunners love reaching 2nd because they can often score on a single from a teammate."/>
      
      <!-- Third Base -->
      <rect x="167" y="163" width="22" height="22" fill="#ffffff"
        class="hotspot-zone" id="zone-bb-third" data-title="Third Base"
        data-desc="The last base before home plate. A runner on third base is in 'scoring position' — any decent hit will likely bring them home to score. Stealing third base is one of the most daring plays in baseball."/>
      
      <!-- Pitcher's mound -->
      <circle cx="300" cy="180" r="18" fill="#c2a06e" stroke="#ffffff" stroke-width="1.5"
        class="hotspot-zone" id="zone-bb-mound" data-title="Pitcher's Mound"
        data-desc="The raised dirt circle from which the pitcher throws. It is elevated slightly so pitchers can throw downward with more power and movement. The rubber plate on top is where the pitcher must have their foot while delivering."/>
      <circle cx="300" cy="178" r="3" fill="#ffffff"/>
      
      <!-- Outfield fence arc -->
      <path d="M 65 82 A 255 255 0 0 1 535 82" fill="none" stroke="#f97316" stroke-width="3" stroke-dasharray="8 4"
        class="hotspot-line" id="line-bb-fence" data-title="Outfield Fence (Home Run Wall)"
        data-desc="The boundary fence at the back of the outfield. Hit the ball over this fence in fair territory and it's a HOME RUN — the batter and all runners on base score automatically!"/>
      
      <!-- Base paths -->
      <line x1="300" y1="305" x2="419" y2="175" stroke="#c2a06e" stroke-width="3" opacity="0.5"/>
      <line x1="419" y1="175" x2="300" y2="59" stroke="#c2a06e" stroke-width="3" opacity="0.5"/>
      <line x1="300" y1="59" x2="181" y2="175" stroke="#c2a06e" stroke-width="3" opacity="0.5"/>
      <line x1="181" y1="175" x2="300" y2="305" stroke="#c2a06e" stroke-width="3" opacity="0.5"/>
      
      <!-- Players -->
      <circle cx="300" cy="300" r="8" fill="#f59e0b" class="court-player" id="bb-batter"/>
      <circle cx="300" cy="180" r="8" fill="#ef4444" class="court-player" id="bb-pitcher"/>
      
      <!-- Ball -->
      <circle cx="300" cy="190" r="5" fill="#f8fafc" stroke="#555" stroke-width="1" class="court-ball" id="bb-ball"/>
      <!-- Trajectory -->
      <path d="M 300 185 Q 300 245 300 298" fill="none" stroke="#ef4444" stroke-dasharray="5" stroke-width="2" class="court-traj" id="bb-pitch-traj"/>
      
      <!-- Strike zone highlight -->
      <rect x="288" y="270" width="24" height="35" fill="rgba(0,229,255,0.2)" stroke="#00e5ff" stroke-width="1" stroke-dasharray="3" id="bb-strike-zone" style="opacity:0; transition:opacity 0.5s;"/>
      <text x="320" y="290" fill="#00e5ff" font-family="Outfit" font-weight="600" font-size="10" id="bb-sz-label" style="opacity:0;">Strike Zone</text>
    </svg>
  `
};

// State Variables
let currentView = "dashboard-view";
let chatTone = "eli5";
let chatSport = "general";
let currentFlashcardSport = "soccer";
let currentFlashcardIndex = 0;
let quizSport = "soccer";
let quizCurrentQuestionIndex = 0;
let quizScore = 0;
let quizStreak = 0;
let userPoints = 240;
let unlockedBadges = [];

// --- INITIALIZATION ---

document.addEventListener("DOMContentLoaded", () => {
  // Setup theme
  initTheme();

  // View Switchers
  const navItems = document.querySelectorAll(".nav-item");
  navItems.forEach(item => {
    item.addEventListener("click", () => {
      const target = item.getAttribute("data-target");
      switchView(target);
    });
  });

  // Theme Switcher Button
  const themeToggle = document.getElementById("theme-toggle");
  themeToggle.addEventListener("click", toggleTheme);

  // Mobile menu sidebar toggle
  const menuToggle = document.getElementById("menu-toggle");
  const sidebar = document.getElementById("sidebar");
  menuToggle.addEventListener("click", () => {
    sidebar.classList.toggle("mobile-open");
  });

  // Global Search bar
  const globalSearch = document.getElementById("global-search");
  globalSearch.addEventListener("keypress", (e) => {
    if (e.key === "Enter" && globalSearch.value.trim() !== "") {
      const query = globalSearch.value.trim();
      globalSearch.value = "";
      triggerGlobalSearch(query);
    }
  });

  // Chat Configuration controls
  setupChatConfig();

  // Chat Submission
  const chatForm = document.getElementById("chat-input-form");
  chatForm.addEventListener("submit", handleChatSubmit);

  // Clear Chat Button
  document.getElementById("clear-chat-btn").addEventListener("click", clearChat);

  // Flashcards Controls
  setupFlashcards();

  // Interactive Court Controls
  setupExplainerTabs();

  // Quiz Controls
  setupQuiz();

  // Load Initial SVG & Chat FAQ questions
  updateChatFAQs();
  loadExplainerSport("soccer");

  // Dashboard card link
  document.getElementById("learn-deuce-btn").addEventListener("click", () => {
    switchView("explainer-view");
    loadExplainerSport("tennis");
  });

  // Dashboard selector cards
  const sportSelectCards = document.querySelectorAll(".sport-select-card");
  sportSelectCards.forEach(card => {
    card.addEventListener("click", () => {
      const sport = card.getAttribute("data-sport");
      // Redirect to explainer or chat
      switchView("explainer-view");
      loadExplainerSport(sport);
    });
  });
});

// --- THEME & VIEWS MANAGER ---

function initTheme() {
  const savedTheme = localStorage.getItem("theme") || "dark";
  document.body.setAttribute("data-theme", savedTheme);
  updateThemeIcon(savedTheme);
}

function toggleTheme() {
  const current = document.body.getAttribute("data-theme");
  const next = current === "dark" ? "light" : "dark";
  document.body.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
  updateThemeIcon(next);
}

function updateThemeIcon(theme) {
  const toggleBtn = document.getElementById("theme-toggle");
  if (theme === "light") {
    toggleBtn.innerHTML = `
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="5"></circle>
        <line x1="12" y1="1" x2="12" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="23"></line>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
        <line x1="1" y1="12" x2="3" y2="12"></line>
        <line x1="21" y1="12" x2="23" y2="12"></line>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
      </svg>
    `;
  } else {
    toggleBtn.innerHTML = `
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
      </svg>
    `;
  }
}

function switchView(viewId) {
  currentView = viewId;

  // Hide all panels
  const panels = document.querySelectorAll(".view-panel");
  panels.forEach(p => p.classList.remove("active"));

  // Show target panel
  const targetPanel = document.getElementById(viewId);
  if (targetPanel) {
    targetPanel.classList.add("active");
  }

  // Update active state in sidebar
  const navItems = document.querySelectorAll(".nav-item");
  navItems.forEach(item => {
    if (item.getAttribute("data-target") === viewId) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });

  // Close mobile sidebar
  const sidebar = document.getElementById("sidebar");
  sidebar.classList.remove("mobile-open");

  // Custom view loading actions
  if (viewId === "flashcards-view") {
    loadFlashcardSport(currentFlashcardSport);
  } else if (viewId === "explainer-view") {
    // Refresh SVG hotspots
    setupHotspots();
  }
}

// --- GLOBAL SEARCH ROUTER ---

function triggerGlobalSearch(query) {
  // Swithes to Chat view
  switchView("chat-view");
  // Set Focus to general sport focus
  setChatSportFocus("general");

  // Post user message
  appendMessage("user", query);

  // Get AI response
  simulateAIResponse(query);
}

// --- CHAT SYSTEM LOGIC ---

function setupChatConfig() {
  // Sport Focus selections
  const sportPills = document.querySelectorAll(".sport-pill");
  sportPills.forEach(pill => {
    pill.addEventListener("click", () => {
      sportPills.forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      chatSport = pill.getAttribute("data-sport");
      updateChatFAQs();

      // Update bot name based on sport
      const botName = document.getElementById("chat-buddy-name");
      const sportName = pill.textContent.split(" ").slice(1).join(" ");
      botName.textContent = chatSport === "general" ? "SportBuddy AI" : `${sportName} Coach`;
    });
  });

  // Tone selections
  const toneBtns = document.querySelectorAll(".tone-btn");
  toneBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      toneBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      chatTone = btn.getAttribute("data-tone");
    });
  });
}

function setChatSportFocus(sport) {
  chatSport = sport;
  const sportPills = document.querySelectorAll(".sport-pill");
  sportPills.forEach(p => {
    if (p.getAttribute("data-sport") === sport) {
      p.classList.add("active");
    } else {
      p.classList.remove("active");
    }
  });
  updateChatFAQs();
}

function updateChatFAQs() {
  const container = document.getElementById("quick-questions-list");
  container.innerHTML = "";

  // Combine FAQ lists or load sport-specific FAQs
  let faqs = [];
  if (chatSport === "general") {
    // Mix general ones from sports
    Object.keys(SPORTS_DATABASE).forEach(key => {
      faqs.push(SPORTS_DATABASE[key].faqs[0]);
      faqs.push(SPORTS_DATABASE[key].faqs[1]);
    });
    // Shuffle slightly
    faqs = faqs.sort(() => 0.5 - Math.random()).slice(0, 5);
  } else {
    faqs = SPORTS_DATABASE[chatSport].faqs;
  }

  faqs.forEach(faq => {
    const btn = document.createElement("button");
    btn.className = "quick-question-btn";
    btn.textContent = faq.q;
    btn.addEventListener("click", () => {
      appendMessage("user", faq.q);
      simulateAIResponse(faq.q, faq.key);
    });
    container.appendChild(btn);
  });
}

function handleChatSubmit(e) {
  e.preventDefault();
  const input = document.getElementById("chat-message-input");
  const text = input.value.trim();
  if (text === "") return;

  input.value = "";
  appendMessage("user", text);
  simulateAIResponse(text);
}

function appendMessage(sender, text) {
  const container = document.getElementById("chat-messages-container");
  const msg = document.createElement("div");
  msg.className = `message ${sender}-message`;

  const avatarText = sender === "buddy" ? "🤖" : "U";

  msg.innerHTML = `
    <div class="message-avatar">${avatarText}</div>
    <div class="message-content-wrapper">
      <div class="message-content">${text}</div>
      <span class="message-time">Just now</span>
    </div>
  `;

  container.appendChild(msg);
  container.scrollTop = container.scrollHeight;
  return msg;
}

function showTypingIndicator() {
  const container = document.getElementById("chat-messages-container");
  const indicator = document.createElement("div");
  indicator.className = "message buddy-message typing-loader";
  indicator.innerHTML = `
    <div class="message-avatar">🤖</div>
    <div class="message-content-wrapper">
      <div class="message-content typing-indicator">
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
      </div>
    </div>
  `;
  container.appendChild(indicator);
  container.scrollTop = container.scrollHeight;
  return indicator;
}

function clearChat() {
  const container = document.getElementById("chat-messages-container");
  container.innerHTML = `
    <div class="message buddy-message">
      <div class="message-avatar">🤖</div>
      <div class="message-content-wrapper">
        <div class="message-content">
          Chat cleared! No history saved, no judgment recorded. What sport concept are we tackling next?
        </div>
        <span class="message-time">Just now</span>
      </div>
    </div>
  `;
}

// Simulated Intelligent Response generator based on the custom Database
function simulateAIResponse(userText, faqKey = null) {
  const indicator = showTypingIndicator();

  setTimeout(() => {
    // Remove typing indicator
    indicator.remove();

    let answer = "";

    // 1. Process via exact FAQ key if clicked
    if (faqKey) {
      answer = getKnowledgeResponse(chatSport, faqKey, chatTone);
    } else {
      // 2. Process query keywords to match terms
      const processedQuery = userText.toLowerCase();
      let matchedSport = chatSport === "general" ? null : chatSport;
      let matchedKey = null;

      // Identify sport from query if focus is general
      if (!matchedSport) {
        for (const sport of Object.keys(SPORTS_DATABASE)) {
          if (processedQuery.includes(sport) ||
            (sport === "soccer" && processedQuery.includes("football")) ||
            SPORTS_DATABASE[sport].terms.some(t => processedQuery.includes(t.term.toLowerCase()))) {
            matchedSport = sport;
            break;
          }
        }
      }

      // Default to soccer if absolutely no sport matched
      matchedSport = matchedSport || "soccer";

      // Match term keywords
      const sportData = SPORTS_DATABASE[matchedSport];
      const faqsList = sportData.faqs;

      // Look for a matching FAQ key in the text
      for (const faq of faqsList) {
        const keywords = faq.q.toLowerCase().replace(/[?.,]/g, '').split(" ");
        // If query has strong overlap with FAQ
        let hits = 0;
        keywords.forEach(word => {
          if (word.length > 3 && processedQuery.includes(word)) hits++;
        });

        if (hits >= 2 || processedQuery.includes(faq.key.replace("_", " "))) {
          matchedKey = faq.key;
          break;
        }
      }

      // If no exact FAQ key matched, check specific terms
      if (!matchedKey) {
        for (const termObj of sportData.terms) {
          if (processedQuery.includes(termObj.term.toLowerCase())) {
            matchedKey = termObj.term.toLowerCase().replace(/[\s-]/g, "_");
            break;
          }
        }
      }

      // Compile response
      if (matchedKey && sportData.explanations[matchedKey]) {
        answer = getKnowledgeResponse(matchedSport, matchedKey, chatTone);
      } else {
        // Fallback friendly reply if we couldn't match a rule
        answer = getFallbackReply(userText, matchedSport);
      }
    }

    appendMessage("buddy", answer);

    // Award 5 points for learning
    awardPoints(5, "Asked a learning question!");
  }, 1000 + Math.random() * 800);
}

function getKnowledgeResponse(sport, key, tone) {
  const sportNameStr = SPORTS_DATABASE[sport].name;
  const explanationSet = SPORTS_DATABASE[sport].explanations[key];
  if (!explanationSet) return "I know that term, but let's chat about it on a high level. Let me know what specific part is confusing!";

  let formattedExplanation = explanationSet[tone];

  if (tone === "eli5") {
    return `💡 <strong>Coach Analogy (${sportNameStr}):</strong><br>${formattedExplanation}`;
  } else if (tone === "summary") {
    return `⏱️ <strong>Quick Rules (${sportNameStr}):</strong><br>${formattedExplanation}`;
  } else {
    return `📖 <strong>The Origin Story (${sportNameStr}):</strong><br>${formattedExplanation}`;
  }
}

function getFallbackReply(text, sport) {
  const s = SPORTS_DATABASE[sport];
  return `That's a really interesting question about ${s.name}! I don't have a pre-recorded simple analogy for that exact term yet, but here's a general tip:
  <br><br>
  In ${s.name}, the most important thing to watch is the <strong>${s.spotlightTerm}</strong>. Feel free to try asking about:
  <ul>
    ${s.faqs.slice(0, 3).map(f => `<li>"${f.q}"</li>`).join("")}
  </ul>
  Don't hesitate to ask! We all start from zero.`;
}

// --- FLASHCARDS SYSTEM ---

function setupFlashcards() {
  const select = document.getElementById("flashcard-sport-select");
  select.addEventListener("change", () => {
    currentFlashcardSport = select.value;
    currentFlashcardIndex = 0;
    loadFlashcardSport(currentFlashcardSport);
  });

  const card = document.getElementById("main-flashcard");
  card.addEventListener("click", () => {
    card.classList.toggle("flipped");
    if (card.classList.contains("flipped")) {
      awardPoints(2, "Flipped a jargon card!");
    }
  });

  document.getElementById("prev-card-btn").addEventListener("click", (e) => {
    e.stopPropagation(); // Avoid flipping the card when clicking navigation arrows
    card.classList.remove("flipped");
    setTimeout(() => {
      currentFlashcardIndex = (currentFlashcardIndex - 1 + SPORTS_DATABASE[currentFlashcardSport].terms.length) % SPORTS_DATABASE[currentFlashcardSport].terms.length;
      renderFlashcard();
    }, 150);
  });

  document.getElementById("next-card-btn").addEventListener("click", (e) => {
    e.stopPropagation();
    card.classList.remove("flipped");
    setTimeout(() => {
      currentFlashcardIndex = (currentFlashcardIndex + 1) % SPORTS_DATABASE[currentFlashcardSport].terms.length;
      renderFlashcard();
    }, 150);
  });

  document.getElementById("toggle-quiz-shortcut").addEventListener("click", () => {
    switchView("quiz-view");
    const qSelect = document.getElementById("quiz-sport-select");
    qSelect.value = currentFlashcardSport;
    startQuiz();
  });
}

function loadFlashcardSport(sport) {
  currentFlashcardSport = sport;
  const select = document.getElementById("flashcard-sport-select");
  select.value = sport;
  renderFlashcard();
}

function renderFlashcard() {
  const sportData = SPORTS_DATABASE[currentFlashcardSport];
  const termObj = sportData.terms[currentFlashcardIndex];

  // Set Front
  document.getElementById("card-sport-tag").textContent = `${sportData.icon} ${sportData.name}`;
  document.getElementById("card-term").textContent = termObj.term;

  // Set Back
  document.getElementById("card-sport-tag-back").textContent = `${sportData.icon} ${sportData.name}`;
  document.getElementById("card-definition").textContent = termObj.def;

  const analogyBox = document.querySelector(".card-analogy");
  if (termObj.analogy) {
    analogyBox.style.display = "block";
    analogyBox.innerHTML = `<strong>💡 Simple Analogy:</strong> ${termObj.analogy}`;
  } else {
    analogyBox.style.display = "none";
  }

  // Counter
  document.getElementById("card-counter").textContent = `${currentFlashcardIndex + 1} / ${sportData.terms.length}`;
}

// --- INTERACTIVE FIELDS SYSTEM ---

function setupExplainerTabs() {
  const tabs = document.querySelectorAll(".explainer-tab-btn");
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      const sport = tab.getAttribute("data-sport");
      loadExplainerSport(sport);
    });
  });
}

function loadExplainerSport(sport) {
  const container = document.getElementById("svg-board-container");
  container.innerHTML = SVGTemplates[sport];

  // Update Title
  const title = document.getElementById("explainer-canvas-title");
  title.textContent = `${SPORTS_DATABASE[sport].name} Interactive Field`;

  // Update Animation controls depending on sport
  const controls = document.getElementById("canvas-anim-controls");
  controls.innerHTML = "";

  if (sport === "soccer") {
    controls.innerHTML = `
      <button class="btn btn-secondary btn-small" id="btn-anim-offside">Play Offside Demo</button>
      <button class="btn btn-secondary btn-small" id="btn-anim-reset" style="display:none;">Reset</button>
    `;
    document.getElementById("btn-anim-offside").addEventListener("click", runSoccerOffsideAnim);
  } else if (sport === "basketball") {
    controls.innerHTML = `
      <button class="btn btn-secondary btn-small" id="btn-anim-shot">Play 3-Point Shot Demo</button>
    `;
    document.getElementById("btn-anim-shot").addEventListener("click", runBasketballShotAnim);
  } else if (sport === "tennis") {
    controls.innerHTML = `
      <button class="btn btn-secondary btn-small" id="btn-tennis-singles">Singles In-Bounds</button>
      <button class="btn btn-secondary btn-small" id="btn-tennis-doubles">Doubles In-Bounds</button>
    `;
    document.getElementById("btn-tennis-singles").addEventListener("click", () => runTennisBoundsAnim("singles"));
    document.getElementById("btn-tennis-doubles").addEventListener("click", () => runTennisBoundsAnim("doubles"));
  } else if (sport === "football") {
    controls.innerHTML = `
      <button class="btn btn-secondary btn-small" id="btn-anim-fb-pass">Play Passing Demo</button>
      <button class="btn btn-secondary btn-small" id="btn-anim-fb-down">Show Down System</button>
    `;
    document.getElementById("btn-anim-fb-pass").addEventListener("click", runFootballPassAnim);
    document.getElementById("btn-anim-fb-down").addEventListener("click", runFootballDownAnim);
  } else if (sport === "cricket") {
    controls.innerHTML = `
      <button class="btn btn-secondary btn-small" id="btn-anim-cr-bowl">Play Bowling Demo</button>
      <button class="btn btn-secondary btn-small" id="btn-anim-cr-six">Show Six (Boundary)</button>
    `;
    document.getElementById("btn-anim-cr-bowl").addEventListener("click", runCricketBowlAnim);
    document.getElementById("btn-anim-cr-six").addEventListener("click", runCricketSixAnim);
  } else if (sport === "hockey") {
    controls.innerHTML = `
      <button class="btn btn-secondary btn-small" id="btn-anim-hk-icing">Show Icing Demo</button>
      <button class="btn btn-secondary btn-small" id="btn-anim-hk-shot">Play Shot on Goal</button>
    `;
    document.getElementById("btn-anim-hk-icing").addEventListener("click", runHockeyIcingAnim);
    document.getElementById("btn-anim-hk-shot").addEventListener("click", runHockeyShotAnim);
  } else if (sport === "baseball") {
    controls.innerHTML = `
      <button class="btn btn-secondary btn-small" id="btn-anim-bb-strike">Show Strike Zone</button>
      <button class="btn btn-secondary btn-small" id="btn-anim-bb-hr">Show Home Run</button>
    `;
    document.getElementById("btn-anim-bb-strike").addEventListener("click", runBaseballStrikeAnim);
    document.getElementById("btn-anim-bb-hr").addEventListener("click", runBaseballHRAnim);
  }

  // Reset details card on sport change
  resetExplainerDetails();

  // Attach Hotspot listeners
  setupHotspots();
}

function resetExplainerDetails() {
  document.getElementById("explainer-info-placeholder").classList.remove("hidden");
  document.getElementById("explainer-details-content").classList.add("hidden");
}

function setupHotspots() {
  const hotspots = document.querySelectorAll(".hotspot-zone, .hotspot-line");
  hotspots.forEach(el => {
    el.addEventListener("click", () => {
      // Clear previous active states
      hotspots.forEach(h => h.classList.remove("active-zone"));

      // Mark current active
      el.classList.add("active-zone");

      // Update details card
      const title = el.getAttribute("data-title");
      const desc = el.getAttribute("data-desc");

      const detailTitle = document.getElementById("detail-title");
      const detailDesc = document.getElementById("detail-explanation");
      const placeholder = document.getElementById("explainer-info-placeholder");
      const details = document.getElementById("explainer-details-content");

      placeholder.classList.add("hidden");
      details.classList.remove("hidden");

      detailTitle.textContent = title;
      detailDesc.textContent = desc;

      // Sport badge
      const activeTab = document.querySelector(".explainer-tab-btn.active");
      document.getElementById("detail-sport-type").textContent = activeTab.textContent;

      // Set simple analogy box
      const analogyBox = document.querySelector(".detail-body .detail-analogy-box");
      const matchedSport = activeTab.getAttribute("data-sport");

      // Try to find matching term in database to extract analogy
      const termMatch = SPORTS_DATABASE[matchedSport].terms.find(t => t.term.toLowerCase() === title.toLowerCase());
      if (termMatch && termMatch.analogy) {
        analogyBox.classList.remove("hidden");
        analogyBox.innerHTML = `<strong>💡 Analogy:</strong> ${termMatch.analogy}`;
      } else {
        // Fallback generic analogy
        analogyBox.classList.add("hidden");
      }

      awardPoints(2, "Explored a field boundary!");
    });
  });
}

// --- FIELD ANIMATION SCRIPTS ---

function runSoccerOffsideAnim() {
  const ball = document.getElementById("soccer-ball");
  const passer = document.getElementById("soccer-passer");
  const runner = document.getElementById("soccer-runner");
  const offsideLine = document.getElementById("soccer-offside-line");
  const badge = document.getElementById("soccer-badge-group");
  const traj = document.getElementById("soccer-ball-traj");
  const btn = document.getElementById("btn-anim-offside");

  btn.disabled = true;

  // 1. Show the offside line
  offsideLine.style.opacity = "1";

  // 2. Play passing action
  setTimeout(() => {
    traj.classList.add("visible");

    // Move ball to pass spot (past the offside line)
    ball.setAttribute("cx", "440");
    ball.setAttribute("cy", "115");

    // Attacker runs forward
    runner.setAttribute("cx", "440");
  }, 500);

  // 3. Show badge and explain why it is offside
  setTimeout(() => {
    badge.style.opacity = "1";

    // Show details card with friendly explanation
    const placeholder = document.getElementById("explainer-info-placeholder");
    const details = document.getElementById("explainer-details-content");
    placeholder.classList.add("hidden");
    details.classList.remove("hidden");

    document.getElementById("detail-title").textContent = "Offside Violation";
    document.getElementById("detail-explanation").innerHTML = `
      This animation shows the attacker (blue dot) receiving a pass behind the defenders (red line) before the ball was kicked.
      <br><br>
      Notice how they were past the defensive line <strong>before</strong> the teammate passed the ball. That makes them offside!
    `;
    document.getElementById("detail-sport-type").textContent = "⚽ Soccer Rule Demo";

    const analogyBox = document.querySelector(".detail-body .detail-analogy-box");
    analogyBox.classList.remove("hidden");
    analogyBox.innerHTML = `<strong>💡 Analogy:</strong> It is like running past the starting line of a race before the starting pistol sounds!`;
  }, 1700);

  // 4. Offer reset
  setTimeout(() => {
    btn.textContent = "Reset Animation";
    btn.disabled = false;
    btn.removeEventListener("click", runSoccerOffsideAnim);
    btn.addEventListener("click", () => {
      // Reset variables
      ball.setAttribute("cx", "330");
      ball.setAttribute("cy", "180");
      runner.setAttribute("cx", "400");
      offsideLine.style.opacity = "0";
      badge.style.opacity = "0";
      traj.classList.remove("visible");

      btn.textContent = "Play Offside Demo";
      btn.removeEventListener("click", this);
      btn.addEventListener("click", runSoccerOffsideAnim);
      resetExplainerDetails();
    }, { once: true });
  }, 3000);
}

function runBasketballShotAnim() {
  const ball = document.getElementById("bb-ball");
  const player = document.getElementById("bb-player");
  const traj = document.getElementById("bb-ball-traj");
  const splash = document.getElementById("bb-points-splash");
  const btn = document.getElementById("btn-anim-shot");

  btn.disabled = true;

  // Shot outside 3-pt line
  player.setAttribute("cx", "200");
  player.setAttribute("cy", "180");
  ball.setAttribute("cx", "200");
  ball.setAttribute("cy", "180");

  setTimeout(() => {
    traj.classList.add("visible");
    // Ball flies to hoop at (45, 180)
    ball.setAttribute("cx", "45");
    ball.setAttribute("cy", "180");
  }, 500);

  setTimeout(() => {
    splash.style.opacity = "1";
    splash.textContent = "+3 POINTS!";
    splash.setAttribute("fill", "#00e5ff");

    // Details write up
    const placeholder = document.getElementById("explainer-info-placeholder");
    const details = document.getElementById("explainer-details-content");
    placeholder.classList.add("hidden");
    details.classList.remove("hidden");

    document.getElementById("detail-title").textContent = "3-Point Field Goal";
    document.getElementById("detail-explanation").innerHTML = `
      The blue dot shot the ball from outside the white arc. Because it is further away and harder to make, the team is rewarded with 3 points instead of 2.
    `;
    document.getElementById("detail-sport-type").textContent = "🏀 Basketball Scoring Demo";
  }, 1700);

  // Phase 2: Show 2-point shot
  setTimeout(() => {
    // Reset positions inside arc
    traj.classList.remove("visible");
    splash.style.opacity = "0";
    player.setAttribute("cx", "100");
    player.setAttribute("cy", "160");
    ball.setAttribute("cx", "100");
    ball.setAttribute("cy", "160");

    // Alter arc trajectory
    traj.setAttribute("d", "M 100 160 Q 70 120 45 180");
  }, 3500);

  setTimeout(() => {
    traj.classList.add("visible");
    ball.setAttribute("cx", "45");
    ball.setAttribute("cy", "180");
  }, 4200);

  setTimeout(() => {
    splash.style.opacity = "1";
    splash.textContent = "+2 POINTS!";
    splash.setAttribute("fill", "#f59e0b");

    document.getElementById("detail-title").textContent = "2-Point Field Goal";
    document.getElementById("detail-explanation").innerHTML = `
      The player shot the ball from <strong>inside</strong> the arc. Any shot taken inside this line (even a lay-up or a dunk right under the net) is worth 2 points.
    `;
  }, 5400);

  // Enable repeat
  setTimeout(() => {
    btn.disabled = false;
    btn.textContent = "Play Shot Demo Again";
    // Reset back to original trajectory path in DOM
    traj.setAttribute("d", "M 200 180 Q 120 100 45 180");
    traj.classList.remove("visible");
    splash.style.opacity = "0";
  }, 8000);
}

function runTennisBoundsAnim(mode) {
  const singlesOverlay = document.getElementById("tennis-singles-highlight");
  const doublesOverlay = document.getElementById("tennis-doubles-highlight");

  const placeholder = document.getElementById("explainer-info-placeholder");
  const details = document.getElementById("explainer-details-content");

  placeholder.classList.add("hidden");
  details.classList.remove("hidden");

  if (mode === "singles") {
    singlesOverlay.style.opacity = "1";
    doublesOverlay.style.opacity = "0";

    document.getElementById("detail-title").textContent = "Singles Boundaries";
    document.getElementById("detail-explanation").innerHTML = `
      For singles matches (1 vs 1), the court is narrower. The yellow highlighted section is the valid play area. 
      <br><br>
      If the ball lands in the side corridors (alleys), it is ruled <strong>out</strong>, giving a point to the opponent.
    `;
    document.getElementById("detail-sport-type").textContent = "🎾 Tennis Boundaries";
  } else {
    singlesOverlay.style.opacity = "0";
    doublesOverlay.style.opacity = "1";

    document.getElementById("detail-title").textContent = "Doubles Boundaries";
    document.getElementById("detail-explanation").innerHTML = `
      For doubles matches (2 vs 2), the court boundaries expand to include the side alleys (highlighted in blue).
      <br><br>
      This extra room (9 feet wider in total) helps accommodate 4 players on the court at once.
    `;
    document.getElementById("detail-sport-type").textContent = "🎾 Tennis Boundaries";
  }
}

// --- FOOTBALL ANIMATIONS ---

function runFootballPassAnim() {
  const ball = document.getElementById("fb-ball");
  const traj = document.getElementById("fb-ball-traj");
  const btn = document.getElementById("btn-anim-fb-pass");
  if (!ball) return;

  btn.disabled = true;

  // Show scrimmage line
  const scrimmage = document.getElementById("fb-scrimmage-line");
  if (scrimmage) scrimmage.style.opacity = "1";

  setTimeout(() => {
    if (traj) traj.classList.add("visible");
    if (ball) { ball.setAttribute("cx", "380"); ball.setAttribute("cy", "160"); }

    const placeholder = document.getElementById("explainer-info-placeholder");
    const details = document.getElementById("explainer-details-content");
    placeholder.classList.add("hidden");
    details.classList.remove("hidden");
    document.getElementById("detail-title").textContent = "The Forward Pass";
    document.getElementById("detail-explanation").innerHTML = `
      The quarterback (blue dot) throws the ball forward to a wide receiver who has run downfield past the defenders.
      <br><br>
      The yellow arc shows the ball's path. The receiver must catch it in-bounds (within the white boundary lines) for a legal catch.
    `;
    document.getElementById("detail-sport-type").textContent = "🏈 Football Pass Demo";
    const analogyBox = document.querySelector(".detail-body .detail-analogy-box");
    analogyBox.classList.remove("hidden");
    analogyBox.innerHTML = `<strong>💡 Analogy:</strong> Like a basketball outlet pass — but the receiver has to run deep and catch it while a defender tries to knock it away!`;
  }, 600);

  setTimeout(() => {
    btn.disabled = false;
    btn.textContent = "Play Again";
    if (traj) traj.classList.remove("visible");
    if (ball) { ball.setAttribute("cx", "260"); ball.setAttribute("cy", "180"); }
    if (scrimmage) scrimmage.style.opacity = "0";
    btn.onclick = runFootballPassAnim;
  }, 4000);
}

function runFootballDownAnim() {
  const label = document.getElementById("fb-down-label");
  if (!label) return;
  label.style.opacity = "1";

  const placeholder = document.getElementById("explainer-info-placeholder");
  const details = document.getElementById("explainer-details-content");
  placeholder.classList.add("hidden");
  details.classList.remove("hidden");
  document.getElementById("detail-title").textContent = "The Down System";
  document.getElementById("detail-explanation").innerHTML = `
    The offense gets <strong>4 downs (attempts)</strong> to move the ball at least 10 yards. The field is marked in 10-yard stripes.
    <br><br>
    If they gain 10+ yards on their first 4 tries, they earn a <em>first down</em> — their 4 attempts reset. They keep doing this all the way to the endzone to score a touchdown!
  `;
  document.getElementById("detail-sport-type").textContent = "🏈 The Down System";
  const analogyBox = document.querySelector(".detail-body .detail-analogy-box");
  analogyBox.classList.remove("hidden");
  analogyBox.innerHTML = `<strong>💡 Analogy:</strong> Like 4 lives in a video game to reach a checkpoint 10 yards away. Reach it and your lives reset to 4. Fail all 4 and the other team gets the ball!`;
}

// --- CRICKET ANIMATIONS ---

function runCricketBowlAnim() {
  const ball = document.getElementById("cr-ball");
  const traj = document.getElementById("cr-ball-traj");
  const btn = document.getElementById("btn-anim-cr-bowl");
  if (!ball) return;

  btn.disabled = true;

  setTimeout(() => {
    if (traj) traj.classList.add("visible");
    if (ball) { ball.setAttribute("cx", "284"); ball.setAttribute("cy", "210"); }

    const placeholder = document.getElementById("explainer-info-placeholder");
    const details = document.getElementById("explainer-details-content");
    placeholder.classList.add("hidden");
    details.classList.remove("hidden");
    document.getElementById("detail-title").textContent = "Bowling at the Wicket";
    document.getElementById("detail-explanation").innerHTML = `
      The bowler (red dot) delivers the ball toward the wickets (orange rectangle). The batter must defend the stumps using their bat.
      <br><br>
      If the ball hits the stumps and the bails fall off, the batter is OUT — <strong>bowled</strong>!
    `;
    document.getElementById("detail-sport-type").textContent = "🏏 Cricket Bowling Demo";
    const analogyBox = document.querySelector(".detail-body .detail-analogy-box");
    analogyBox.classList.remove("hidden");
    analogyBox.innerHTML = `<strong>💡 Analogy:</strong> Like a pitcher throwing at a very specific target. The batter must protect the target (stumps) with their bat — if the ball gets through, they're out!`;
  }, 500);

  setTimeout(() => {
    btn.disabled = false;
    if (ball) { ball.setAttribute("cx", "318"); ball.setAttribute("cy", "175"); }
    if (traj) traj.classList.remove("visible");
    btn.textContent = "Play Again";
    btn.onclick = runCricketBowlAnim;
  }, 3500);
}

function runCricketSixAnim() {
  const placeholder = document.getElementById("explainer-info-placeholder");
  const details = document.getElementById("explainer-details-content");
  placeholder.classList.add("hidden");
  details.classList.remove("hidden");
  document.getElementById("detail-title").textContent = "The Six — Maximum Boundary";
  document.getElementById("detail-explanation").innerHTML = `
    The dashed orange circle is the <strong>boundary rope</strong>. When the batter hits the ball and it clears this rope in the air without bouncing, the team scores <strong>6 runs</strong> instantly — the maximum single score in cricket.
    <br><br>
    If the ball bounces and then crosses the rope, it is <strong>4 runs</strong>. If it is caught just inside the rope, it may be 0 runs and the batter could be out!
  `;
  document.getElementById("detail-sport-type").textContent = "🏏 Cricket Boundaries";
  const analogyBox = document.querySelector(".detail-body .detail-analogy-box");
  analogyBox.classList.remove("hidden");
  analogyBox.innerHTML = `<strong>💡 Analogy:</strong> A 6 is cricket's home run. A 4 is like a ground-rule double. Missing the rope means a regular hit counted by running between the wickets.`;
}

// --- HOCKEY ANIMATIONS ---

function runHockeyIcingAnim() {
  const icingLine = document.getElementById("hk-icing-line");
  const label = document.getElementById("hk-icing-label");
  const puck = document.getElementById("hk-puck");
  const traj = document.getElementById("hk-puck-traj");
  const btn = document.getElementById("btn-anim-hk-icing");
  if (!btn) return;

  btn.disabled = true;
  if (icingLine) icingLine.style.opacity = "0.8";
  if (puck) { puck.setAttribute("cx", "180"); puck.setAttribute("cy", "180"); }

  setTimeout(() => {
    if (traj) { traj.setAttribute("d", "M 180 180 Q 370 160 555 180"); traj.classList.add("visible"); }
    if (puck) { puck.setAttribute("cx", "555"); puck.setAttribute("cy", "180"); }
    if (label) label.style.opacity = "1";

    const placeholder = document.getElementById("explainer-info-placeholder");
    const details = document.getElementById("explainer-details-content");
    placeholder.classList.add("hidden");
    details.classList.remove("hidden");
    document.getElementById("detail-title").textContent = "Icing Violation";
    document.getElementById("detail-explanation").innerHTML = `
      The puck was shot from the defensive zone (past the red center line) all the way to the opponent's goal line without being touched — this is <strong>icing</strong>!
      <br><br>
      Play stops and a faceoff happens back in the offending team's defensive zone as punishment.
    `;
    document.getElementById("detail-sport-type").textContent = "🏒 Icing Demo";
    const analogyBox = document.querySelector(".detail-body .detail-analogy-box");
    analogyBox.classList.remove("hidden");
    analogyBox.innerHTML = `<strong>💡 Analogy:</strong> Like lobbing a ball from one end of the basketball court to the other without any skill or intent. The ref makes you go back and try again properly.`;
  }, 700);

  setTimeout(() => {
    btn.disabled = false;
    btn.textContent = "Play Again";
    if (icingLine) icingLine.style.opacity = "0";
    if (label) label.style.opacity = "0";
    if (puck) { puck.setAttribute("cx", "380"); puck.setAttribute("cy", "180"); }
    if (traj) { traj.setAttribute("d", "M 380 180 Q 480 160 555 180"); traj.classList.remove("visible"); }
    btn.onclick = runHockeyIcingAnim;
  }, 5000);
}

function runHockeyShotAnim() {
  const puck = document.getElementById("hk-puck");
  const traj = document.getElementById("hk-puck-traj");
  const btn = document.getElementById("btn-anim-hk-shot");
  if (!btn) return;

  btn.disabled = true;
  if (puck) { puck.setAttribute("cx", "400"); puck.setAttribute("cy", "155"); }

  setTimeout(() => {
    if (traj) { traj.setAttribute("d", "M 400 155 Q 480 168 558 180"); traj.classList.add("visible"); }
    if (puck) { puck.setAttribute("cx", "558"); puck.setAttribute("cy", "178"); }

    const placeholder = document.getElementById("explainer-info-placeholder");
    const details = document.getElementById("explainer-details-content");
    placeholder.classList.add("hidden");
    details.classList.remove("hidden");
    document.getElementById("detail-title").textContent = "Shot on Goal!";
    document.getElementById("detail-explanation").innerHTML = `
      An attacker from the attacking zone fires the puck (black dot) at the goal. The goalie (yellow dot) tries to stop it.
      <br><br>
      If the puck crosses the red goal line and enters the net, it's a <strong>GOAL</strong> (1 point). A goal that beats the goalie through their legs hits the famous <em>five-hole</em>!
    `;
    document.getElementById("detail-sport-type").textContent = "🏒 Shot on Goal Demo";
    const analogyBox = document.querySelector(".detail-body .detail-analogy-box");
    analogyBox.classList.remove("hidden");
    analogyBox.innerHTML = `<strong>💡 Analogy:</strong> Like shooting on a goalkeeper in soccer. The puck must completely cross the line. Referees use video replay to confirm borderline goals.`;
  }, 600);

  setTimeout(() => {
    btn.disabled = false;
    btn.textContent = "Play Again";
    if (puck) { puck.setAttribute("cx", "380"); puck.setAttribute("cy", "180"); }
    if (traj) { traj.setAttribute("d", "M 380 180 Q 480 160 555 180"); traj.classList.remove("visible"); }
    btn.onclick = runHockeyShotAnim;
  }, 4500);
}

// --- BASEBALL ANIMATIONS ---

function runBaseballStrikeAnim() {
  const sz = document.getElementById("bb-strike-zone");
  const szLabel = document.getElementById("bb-sz-label");

  if (sz) sz.style.opacity = "1";
  if (szLabel) szLabel.style.opacity = "1";

  const placeholder = document.getElementById("explainer-info-placeholder");
  const details = document.getElementById("explainer-details-content");
  placeholder.classList.add("hidden");
  details.classList.remove("hidden");
  document.getElementById("detail-title").textContent = "The Strike Zone";
  document.getElementById("detail-explanation").innerHTML = `
    The blue highlighted box above home plate is the <strong>strike zone</strong>. Any pitch that passes through this zone (between the batter's knees and mid-torso, over the plate) that the batter doesn't swing at is called a <strong>strike</strong>.
    <br><br>
    Three strikes = strikeout. Four pitches outside this zone (balls) that aren't swung at = a <strong>walk</strong> (free base).
  `;
  document.getElementById("detail-sport-type").textContent = "⚾ Strike Zone";
  const analogyBox = document.querySelector(".detail-body .detail-analogy-box");
  analogyBox.classList.remove("hidden");
  analogyBox.innerHTML = `<strong>💡 Analogy:</strong> Like a target the pitcher aims for. Hitting the zone without the batter swinging is a point for the pitcher. Missing the zone repeatedly is a point for the batter.`;
}

function runBaseballHRAnim() {
  const placeholder = document.getElementById("explainer-info-placeholder");
  const details = document.getElementById("explainer-details-content");
  placeholder.classList.add("hidden");
  details.classList.remove("hidden");
  document.getElementById("detail-title").textContent = "HOME RUN!";
  document.getElementById("detail-explanation").innerHTML = `
    The orange dashed arc at the back is the <strong>outfield fence</strong>. Hit the ball over it in fair territory (between the two white foul lines) and it is a HOME RUN — automatic points for the batter and all base runners!
    <br><br>
    The batter jogs all four bases and every teammate on base scores a run. With bases loaded (all 3 bases occupied), a home run scores 4 runs — called a <em>grand slam</em>!
  `;
  document.getElementById("detail-sport-type").textContent = "⚾ Home Run";
  const analogyBox = document.querySelector(".detail-body .detail-analogy-box");
  analogyBox.classList.remove("hidden");
  analogyBox.innerHTML = `<strong>💡 Analogy:</strong> Like hitting a soccer ball completely out of the stadium — automatic maximum score in one swing. A Grand Slam (home run with bases loaded) is as special as a hat-trick.`;
}

// --- QUIZ SYSTEM LOGIC ---

function setupQuiz() {
  const sportSelect = document.getElementById("quiz-sport-select");
  sportSelect.addEventListener("change", () => {
    quizSport = sportSelect.value;
  });

  document.getElementById("start-quiz-btn").addEventListener("click", () => {
    startQuiz();
  });

  document.getElementById("quiz-hint-btn").addEventListener("click", () => {
    const hintBox = document.getElementById("quiz-hint-box");
    const activeQuestion = SPORTS_DATABASE[quizSport].quiz[quizCurrentQuestionIndex];
    document.getElementById("quiz-hint-text").textContent = activeQuestion.hint;
    hintBox.classList.toggle("hidden");
  });

  document.getElementById("quiz-next-btn").addEventListener("click", () => {
    quizCurrentQuestionIndex++;
    if (quizCurrentQuestionIndex < SPORTS_DATABASE[quizSport].quiz.length) {
      loadQuizQuestion();
    } else {
      showQuizResults();
    }
  });

  document.getElementById("quiz-restart-btn").addEventListener("click", () => {
    document.getElementById("quiz-results-screen").classList.add("hidden");
    document.getElementById("quiz-start-screen").classList.remove("hidden");
  });
}

function startQuiz() {
  quizCurrentQuestionIndex = 0;
  quizScore = 0;

  document.getElementById("quiz-start-screen").classList.add("hidden");
  document.getElementById("quiz-results-screen").classList.add("hidden");
  document.getElementById("quiz-play-screen").classList.remove("hidden");

  loadQuizQuestion();
}

function loadQuizQuestion() {
  const activeQuestion = SPORTS_DATABASE[quizSport].quiz[quizCurrentQuestionIndex];

  // Update progress header
  const totalQ = SPORTS_DATABASE[quizSport].quiz.length;
  document.getElementById("quiz-q-counter").textContent = `Question ${quizCurrentQuestionIndex + 1} of ${totalQ}`;

  const percentage = ((quizCurrentQuestionIndex) / totalQ) * 100;
  document.getElementById("quiz-progress-indicator").style.width = `${percentage}%`;

  // Set text
  document.getElementById("quiz-question-text").textContent = activeQuestion.q;

  // Options
  const container = document.getElementById("quiz-options-container");
  container.innerHTML = "";

  activeQuestion.options.forEach((opt, idx) => {
    const btn = document.createElement("button");
    btn.className = "quiz-option-btn";
    btn.innerHTML = `<span>${opt}</span>`;

    btn.addEventListener("click", () => {
      handleOptionSelect(btn, idx, activeQuestion.answer);
    });
    container.appendChild(btn);
  });

  // Reset hint box
  document.getElementById("quiz-hint-box").classList.add("hidden");
  document.getElementById("quiz-next-btn").classList.add("hidden");
  document.getElementById("quiz-hint-btn").classList.remove("hidden");
}

function handleOptionSelect(selectedBtn, selectedIdx, correctIdx) {
  const options = document.querySelectorAll(".quiz-option-btn");

  // Disable all buttons to prevent double click
  options.forEach(opt => opt.disabled = true);
  document.getElementById("quiz-hint-btn").classList.add("hidden");

  if (selectedIdx === correctIdx) {
    selectedBtn.classList.add("correct");
    selectedBtn.innerHTML += "<span>✅</span>";
    quizScore++;
    quizStreak++;
    document.getElementById("quiz-current-streak").textContent = quizStreak;

    // Small success sound / vibration / point count
    awardPoints(10, "Correct Quiz Answer!");
  } else {
    selectedBtn.classList.add("wrong");
    selectedBtn.innerHTML += "<span>❌</span>";
    quizStreak = 0;
    document.getElementById("quiz-current-streak").textContent = quizStreak;

    // Highlight correct one
    options[correctIdx].classList.add("correct");
    options[correctIdx].innerHTML += "<span>✅</span>";
  }

  // Show Next Button
  document.getElementById("quiz-next-btn").classList.remove("hidden");
}

function showQuizResults() {
  document.getElementById("quiz-play-screen").classList.add("hidden");

  const resultsScreen = document.getElementById("quiz-results-screen");
  resultsScreen.classList.remove("hidden");

  const total = SPORTS_DATABASE[quizSport].quiz.length;
  const scorePercent = (quizScore / total) * 100;

  // Update texts
  document.getElementById("results-summary").textContent = `You scored ${quizScore} out of ${total}!`;

  const badgeIcon = document.getElementById("quiz-badge-unlocked");
  const headline = document.getElementById("results-headline");
  const ptsAwardText = document.getElementById("points-awarded-text");

  let pointsGained = 0;

  if (scorePercent === 100) {
    headline.textContent = "🏆 Perfect Score!";
    badgeIcon.textContent = "🥇";
    pointsGained = 50;
    ptsAwardText.textContent = "+50 Points Added";
    showNotification("🥇 Gold Badge Unlocked! Perfect Score!");
  } else if (scorePercent >= 80) {
    headline.textContent = "🎖️ Great Learning!";
    badgeIcon.textContent = "🥈";
    pointsGained = 30;
    ptsAwardText.textContent = "+30 Points Added";
    showNotification("🥈 Silver Badge Unlocked! Great score.");
  } else {
    headline.textContent = "💪 Keep Practicing!";
    badgeIcon.textContent = "🥉";
    pointsGained = 15;
    ptsAwardText.textContent = "+15 Points Added";
    showNotification("🥉 Apprentice Badge Unlocked! Good effort.");
  }

  awardPoints(pointsGained, "Completed sport quiz!");
}

// --- REWARD & POINTS SYSTEM ---

function awardPoints(pts, reason) {
  userPoints += pts;
  document.getElementById("user-points").textContent = userPoints;
}

function showNotification(text, type = "badge-unlock") {
  const container = document.getElementById("toast-container");
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <span>✨</span>
    <div>${text}</div>
  `;
  container.appendChild(toast);

  // Auto remove in CSS after 3.8s
  setTimeout(() => {
    toast.remove();
  }, 4000);
}
