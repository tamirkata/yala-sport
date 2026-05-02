// ══ CONSTANTS ═══════════════════════════════════════════════════════════
const WORKOUT_TYPES = [
  { key: 'gym',        emoji: '🏋️', label: 'חדר כושר' },
  { key: 'run',        emoji: '🏃', label: 'ריצה'      },
  { key: 'swim',       emoji: '🏊', label: 'שחייה'     },
  { key: 'basketball', emoji: '🏀', label: 'כדורסל'    },
  { key: 'tennis',     emoji: '🎾', label: 'טניס'      },
  { key: 'padel',      emoji: '🏓', label: 'פאדל'      },
  { key: 'treadmill',  emoji: '🔁', label: 'הליכון'    },
  { key: 'yoga',       emoji: '🧘', label: 'יוגה'      },
  { key: 'pilates',    emoji: '🤸', label: 'פילאטיס'   },
  { key: 'walk',       emoji: '🚶', label: 'הליכה'     },
  { key: 'boxing',     emoji: '🥊', label: 'אגרוף'     },
  { key: 'other',      emoji: '💪', label: 'אחר'       },
];
const FEED_PAGE = 10;

const ACHIEVEMENTS = [
  // ── צעדים ראשונים (tier 1) ──
  { key:'app_day_1',        emoji:'📱', label:'ברוך הבא!',         desc:'הצטרפת ל-go and move',                    rarity:'common',    cat:'special', tier:1 },
  { key:'first_workout',    emoji:'🥇', label:'הצעד הראשון',      desc:'סיימת את האימון הראשון שלך!',             rarity:'common',    cat:'first',   tier:1 },
  { key:'first_gym',        emoji:'🏋️', label:'מרים ברזל',        desc:'נכנסת לחדר כושר לראשונה',                 rarity:'common',    cat:'first',   tier:1 },
  { key:'first_run',        emoji:'🏃', label:'הריצה הראשונה',    desc:'יצאת לרוץ לראשונה',                       rarity:'common',    cat:'first',   tier:1 },
  { key:'first_swim',       emoji:'🏊', label:'לשחות!',           desc:'שחית לראשונה',                            rarity:'common',    cat:'first',   tier:1 },
  { key:'first_basketball', emoji:'🏀', label:'כדורסל!',          desc:'שיחקת כדורסל לראשונה',                    rarity:'common',    cat:'first',   tier:1 },
  { key:'first_tennis',     emoji:'🎾', label:'אייס!',            desc:'שיחקת טניס לראשונה',                      rarity:'common',    cat:'first',   tier:1 },
  { key:'first_padel',      emoji:'🏓', label:'פאדל מאסטר',       desc:'שיחקת פאדל לראשונה',                      rarity:'common',    cat:'first',   tier:1 },
  { key:'first_treadmill',  emoji:'🔁', label:'על הליכון',         desc:'רצת על הליכון לראשונה',                  rarity:'common',    cat:'first',   tier:1 },
  { key:'first_photo',      emoji:'📷', label:'ספורטוגרף',        desc:'העלית תמונה ראשונה עם אימון',             rarity:'common',    cat:'first',   tier:1 },
  { key:'first_friend',     emoji:'👥', label:'חבר ראשון',        desc:'חבר ראשון באפליקציה',                     rarity:'common',    cat:'first',   tier:1 },
  { key:'first_like_recv',  emoji:'💪', label:'קיבלת לייק!',      desc:'קיבלת לייק ראשון על אימון',               rarity:'common',    cat:'first',   tier:1 },
  { key:'first_comment',    emoji:'💬', label:'תגובה ראשונה',     desc:'כתבת תגובה ראשונה',                       rarity:'common',    cat:'first',   tier:1 },
  // ── אבני דרך ראשונות (tier 2) ──
  { key:'workouts_5',       emoji:'🌱', label:'מתחיל',            desc:'5 אימונים סה"כ',                          rarity:'common',    cat:'volume',  tier:2 },
  { key:'workouts_10',      emoji:'💪', label:'מתרגל',            desc:'10 אימונים סה"כ',                         rarity:'common',    cat:'volume',  tier:2 },
  // ── מגוון (tier 3) ──
  { key:'variety_3',        emoji:'🎨', label:'מגוון',            desc:'ניסית 3 סוגי אימון שונים',                rarity:'common',    cat:'variety', tier:3 },
  { key:'variety_5',        emoji:'🌈', label:'ספורטאי מגוון',    desc:'ניסית 5 סוגי אימון שונים',                rarity:'rare',      cat:'variety', tier:3 },
  { key:'same_type_10',     emoji:'🎯', label:'מתמחה',            desc:'10 אימונים מאותו סוג',                    rarity:'common',    cat:'variety', tier:3 },
  // ── רצפים ראשוניים (tier 4) ──
  { key:'streak_3',         emoji:'🔥', label:'3 ימים רצוף',      desc:'התאמנת 3 ימים ברצף',                      rarity:'common',    cat:'streak',  tier:4 },
  { key:'streak_7',         emoji:'🔥', label:'שבוע בוער',        desc:'התאמנת 7 ימים ברצף',                      rarity:'rare',      cat:'streak',  tier:4 },
  { key:'comeback',         emoji:'🔄', label:'חזרה לעניינים',     desc:'חזרת לאמן אחרי הפסקה של שבוע',           rarity:'common',    cat:'special', tier:4 },
  { key:'good_mood',        emoji:'😊', label:'אנרגיה טובה',      desc:'הוספת הרגשה חיובית ל-5 אימונים',          rarity:'common',    cat:'special', tier:4 },
  { key:'quick_fire',       emoji:'⚡', label:'מהיר כברק',        desc:'אימון קצר של עד 20 דקות',                rarity:'common',    cat:'time',    tier:4 },
  { key:'weekend_warrior',  emoji:'🗓️', label:'לוחם סופ"ש',       desc:'התאמנת בשבת ובראשון',                    rarity:'common',    cat:'time',    tier:4 },
  // ── נפח בינוני + ספציפי לסוג (tier 5) ──
  { key:'workouts_25',      emoji:'🏅', label:'שגרה בריאה',       desc:'25 אימונים סה"כ',                         rarity:'common',    cat:'volume',  tier:5 },
  { key:'streak_14',        emoji:'🔥', label:'שבועיים אש',       desc:'התאמנת 14 ימים ברצף',                     rarity:'rare',      cat:'streak',  tier:5 },
  { key:'total_10h',        emoji:'⏱️', label:'10 שעות',           desc:'10 שעות מצטברות של אימונים',              rarity:'common',    cat:'duration',tier:5 },
  { key:'photos_5',         emoji:'📸', label:'אלבום כושר',       desc:'העלית 5 תמונות אימון',                    rarity:'common',    cat:'media',   tier:5 },
  { key:'stories_5',        emoji:'🎬', label:'סטוריז קבוע',      desc:'פרסמת 5 סטוריז',                          rarity:'common',    cat:'media',   tier:5 },
  { key:'mood_writer',      emoji:'✍️', label:'יומן כושר',        desc:'הוספת תיאור ל-10 אימונים',                rarity:'common',    cat:'media',   tier:5 },
  { key:'friday_sport',     emoji:'🌅', label:'שישי ספורט',       desc:'התאמנת 5 פעמים ביום שישי',                rarity:'common',    cat:'special', tier:5 },
  { key:'gym_20',           emoji:'🏋️', label:'חדר כושר קבוע',   desc:'20 אימוני חדר כושר',                      rarity:'common',    cat:'type',    tier:5 },
  { key:'run_20',           emoji:'🏃', label:'רץ',               desc:'20 אימוני ריצה',                          rarity:'common',    cat:'type',    tier:5 },
  { key:'swim_10',          emoji:'🏊', label:'שחיין',            desc:'10 שיחיות',                               rarity:'common',    cat:'type',    tier:5 },
  { key:'bball_10',         emoji:'🏀', label:'שחקן כדורסל',      desc:'10 משחקי כדורסל',                         rarity:'common',    cat:'type',    tier:5 },
  { key:'tennis_10',        emoji:'🎾', label:'טניסאי',           desc:'10 אימוני טניס',                          rarity:'common',    cat:'type',    tier:5 },
  { key:'padel_10',         emoji:'🏓', label:'פאדל פרו',         desc:'10 אימוני פאדל',                          rarity:'common',    cat:'type',    tier:5 },
  { key:'treadmill_20',     emoji:'🔁', label:'הליכון מקצועי',    desc:'20 אימוני הליכון',                        rarity:'common',    cat:'type',    tier:5 },
  // ── חברתי + אתגרים (tier 6) ──
  { key:'friends_5',        emoji:'🤝', label:'חמישה חברים',      desc:'5 חברים באפליקציה',                       rarity:'common',    cat:'social',  tier:6 },
  { key:'liked_others_10',  emoji:'🙌', label:'מעריך',            desc:'נתת לייק ל-10 אימונים של חברים',          rarity:'common',    cat:'social',  tier:6 },
  { key:'likes_10',         emoji:'❤️', label:'אהוב',             desc:'קיבלת 10 לייקים על אימונים',              rarity:'rare',      cat:'social',  tier:6 },
  { key:'comments_10',      emoji:'🗣️', label:'מגיב פעיל',        desc:'כתבת 10 תגובות',                          rarity:'common',    cat:'social',  tier:6 },
  { key:'group_workout',    emoji:'👫', label:'אימון יחד',        desc:'חבר שלך התאמן באותו יום',                 rarity:'common',    cat:'social',  tier:6 },
  { key:'weekly_goal_1',    emoji:'✅', label:'יעד ראשון',        desc:'השגת את היעד השבועי לראשונה',             rarity:'common',    cat:'goals',   tier:6 },
  { key:'weekly_goal_4',    emoji:'📆', label:'4 שבועות',         desc:'השגת את היעד השבועי 4 פעמים',             rarity:'common',    cat:'goals',   tier:6 },
  { key:'monthly_goal',     emoji:'📅', label:'יעד חודשי',        desc:'השגת את היעד החודשי',                     rarity:'rare',      cat:'monthly', tier:6 },
  { key:'5_in_week',        emoji:'5️⃣', label:'שבוע אש',          desc:'5 אימונים בשבוע אחד',                     rarity:'rare',      cat:'chall',   tier:6 },
  { key:'double_day',       emoji:'✌️', label:'יום כפול',          desc:'שני אימונים ביום אחד',                    rarity:'rare',      cat:'chall',   tier:6 },
  { key:'diverse_week',     emoji:'🎨', label:'שבוע צבעוני',      desc:'3 סוגי אימון שונים באותו שבוע',           rarity:'rare',      cat:'chall',   tier:6 },
  { key:'early_bird',       emoji:'🌅', label:'עוף מוקדם',        desc:'התאמנת לפני 7 בבוקר',                     rarity:'rare',      cat:'time',    tier:6 },
  { key:'night_owl',        emoji:'🦉', label:'ינשוף הלילה',      desc:'התאמנת אחרי 22:00',                       rarity:'rare',      cat:'time',    tier:6 },
  { key:'long_session',     emoji:'⏱️', label:'מרתון',            desc:'אימון של שעה ויותר',                      rarity:'rare',      cat:'time',    tier:6 },
  // ── נפח מתקדם + עקביות (tier 7) ──
  { key:'workouts_50',      emoji:'🥈', label:'ספורטאי מנוסה',    desc:'50 אימונים סה"כ',                         rarity:'rare',      cat:'volume',  tier:7 },
  { key:'streak_30',        emoji:'💥', label:'חודש בוער',        desc:'התאמנת 30 ימים ברצף',                     rarity:'epic',      cat:'streak',  tier:7 },
  { key:'total_50h',        emoji:'🕐', label:'50 שעות',           desc:'50 שעות מצטברות',                         rarity:'rare',      cat:'duration',tier:7 },
  { key:'friends_10',       emoji:'🎉', label:'פופולרי',          desc:'10 חברים באפליקציה',                      rarity:'rare',      cat:'social',  tier:7 },
  { key:'liked_others_50',  emoji:'💞', label:'תומך',             desc:'נתת לייק ל-50 אימונים',                   rarity:'rare',      cat:'social',  tier:7 },
  { key:'likes_50',         emoji:'🌟', label:'כוכב',             desc:'קיבלת 50 לייקים',                         rarity:'epic',      cat:'social',  tier:7 },
  { key:'comments_50',      emoji:'💬', label:'דיון פעיל',        desc:'כתבת 50 תגובות',                          rarity:'rare',      cat:'social',  tier:7 },
  { key:'overachieve',      emoji:'🚀', label:'מעבר ליעד',        desc:'השלמת פי 2 מהיעד השבועי שלך',            rarity:'rare',      cat:'goals',   tier:7 },
  { key:'rain_or_shine',    emoji:'🌦️', label:'בכל מזג אוויר',    desc:'4 שבועות ברצף עם לפחות אימון אחד',       rarity:'rare',      cat:'consist', tier:7 },
  { key:'mon_to_fri',       emoji:'5️⃣', label:'5 ימי עבודה',      desc:'5 אימונים מיום א׳ עד ה׳',                rarity:'rare',      cat:'consist', tier:7 },
  { key:'weekly_goal_10',   emoji:'🔟', label:'10 שבועות',        desc:'השגת את היעד השבועי 10 פעמים',            rarity:'rare',      cat:'goals',   tier:7 },
  { key:'morning_20',       emoji:'🌞', label:'20 בקרים',          desc:'התאמנת 20 פעמים בבוקר',                  rarity:'rare',      cat:'time',    tier:7 },
  { key:'super_long',       emoji:'🕐', label:'אולטרה',           desc:'אימון של שעתיים ויותר',                   rarity:'epic',      cat:'time',    tier:7 },
  { key:'dawn_patrol',      emoji:'🌄', label:'פטרול שחר',        desc:'התאמנת לפני 6 בבוקר',                     rarity:'epic',      cat:'time',    tier:7 },
  { key:'morning_5',        emoji:'☀️', label:'5 בקרים',           desc:'התאמנת 5 פעמים בבוקר (לפני 9)',          rarity:'common',    cat:'time',    tier:7 },
  { key:'night_5',          emoji:'🌙', label:'5 לילות',           desc:'התאמנת 5 פעמים בלילה (אחרי 21)',          rarity:'common',    cat:'time',    tier:7 },
  { key:'run_50',           emoji:'🥇', label:'מרתוניסט',         desc:'50 אימוני ריצה',                          rarity:'rare',      cat:'type',    tier:7 },
  { key:'swim_30',          emoji:'🐬', label:'דולפין',           desc:'30 שיחיות',                               rarity:'rare',      cat:'type',    tier:7 },
  { key:'gym_rat',          emoji:'🐀', label:'חולדת הכושר',      desc:'50 אימוני חדר כושר',                      rarity:'rare',      cat:'special', tier:7 },
  { key:'photos_20',        emoji:'🎞️', label:'צלם כושר',         desc:'העלית 20 תמונות אימון',                   rarity:'rare',      cat:'media',   tier:7 },
  { key:'stories_20',       emoji:'🎥', label:'יוטיובר כושר',     desc:'פרסמת 20 סטוריז',                         rarity:'rare',      cat:'media',   tier:7 },
  { key:'best_week',        emoji:'📈', label:'שבוע השיא',         desc:'שבוע עם יותר אימונים מתמיד',              rarity:'rare',      cat:'chall',   tier:7 },
  { key:'jan_1',            emoji:'🥂', label:'שנה חדשה חדשה',    desc:'התאמנת ב-1 בינואר',                       rarity:'rare',      cat:'special', tier:7 },
  { key:'variety_all',      emoji:'🎭', label:'ספורטאי שלם',      desc:'ניסית את כל 8 סוגי האימון',               rarity:'epic',      cat:'variety', tier:7 },
  { key:'same_type_50',     emoji:'🔬', label:'מומחה',            desc:'50 אימונים מאותו סוג',                    rarity:'rare',      cat:'variety', tier:7 },
  // ── יעדים + רמה גבוהה (tier 8) ──
  { key:'workouts_100',     emoji:'💯', label:'100 אימונים',      desc:'מאה אימונים — מאה אחוז!',                 rarity:'rare',      cat:'volume',  tier:8 },
  { key:'weekly_goal_20',   emoji:'🌟', label:'20 שבועות',        desc:'השגת את היעד השבועי 20 פעמים',            rarity:'epic',      cat:'goals',   tier:8 },
  { key:'monthly_double',   emoji:'💥', label:'חודש כפול',        desc:'הכפלת את היעד החודשי',                    rarity:'epic',      cat:'monthly', tier:8 },
  { key:'perfect_week_4',   emoji:'🏆', label:'חודש מושלם',       desc:'4 שבועות ברצף עם יעד שבועי מלא',         rarity:'epic',      cat:'goals',   tier:8 },
  { key:'no_skip_month',    emoji:'📆', label:'ללא דילוג',         desc:'לא פספסת שבוע במשך חודש',                rarity:'epic',      cat:'consist', tier:8 },
  { key:'top_leaderboard',  emoji:'🥇', label:'ראשון בליגה',       desc:'הגעת למקום ראשון בלוח השיאים',            rarity:'epic',      cat:'chall',   tier:8 },
  { key:'7_in_week',        emoji:'7️⃣', label:'שבוע מדהים',       desc:'7 אימונים בשבוע אחד',                     rarity:'epic',      cat:'chall',   tier:8 },
  { key:'gym_100',          emoji:'🦍', label:'בודיבילדר',        desc:'100 אימוני חדר כושר',                     rarity:'epic',      cat:'type',    tier:8 },
  { key:'total_100h',       emoji:'💯', label:'100 שעות',          desc:'100 שעות מצטברות',                        rarity:'epic',      cat:'duration',tier:8 },
  { key:'every_month_6',    emoji:'📊', label:'חצי שנה',          desc:'יעד חודשי 6 חודשים ברצף',                rarity:'epic',      cat:'monthly', tier:8 },
  // ── עלית (tier 9) ──
  { key:'workouts_200',     emoji:'🥇', label:'ספורטאי רציני',    desc:'200 אימונים סה"כ',                        rarity:'epic',      cat:'volume',  tier:9 },
  { key:'workouts_365',     emoji:'📅', label:'שנה שלמה',         desc:'365 אימונים — שנה של כושר!',              rarity:'epic',      cat:'volume',  tier:9 },
  { key:'streak_60',        emoji:'🌋', label:'60 ימים',          desc:'התאמנת 60 ימים ברצף',                     rarity:'epic',      cat:'streak',  tier:9 },
  { key:'streak_100',       emoji:'⚡', label:'100 ימים!',        desc:'מאה ימי אימון ברצף — מדהים!',             rarity:'legendary', cat:'streak',  tier:9 },
  { key:'every_month_12',   emoji:'🎊', label:'שנה של יעדים',     desc:'יעד חודשי 12 חודשים ברצף',               rarity:'legendary', cat:'monthly', tier:9 },
  { key:'weekly_goal_52',   emoji:'🎊', label:'שנה של יעדים',     desc:'השגת את היעד השבועי 52 פעמים',            rarity:'legendary', cat:'goals',   tier:9 },
  { key:'likes_100',        emoji:'💫', label:'סופרסטאר',         desc:'קיבלת 100 לייקים',                        rarity:'legendary', cat:'social',  tier:9 },
  { key:'ach_25',           emoji:'⭐', label:'25 הישגים',         desc:'השגת 25 הישגים',                          rarity:'rare',      cat:'meta',    tier:9 },
  // ── אגדות (tier 10) ──
  { key:'workouts_500',     emoji:'👑', label:'לגנד',             desc:'500 אימונים — אלוף!',                     rarity:'legendary', cat:'volume',  tier:10 },
  { key:'workouts_1000',    emoji:'🏆', label:'אל הכושר',         desc:'1000 אימונים — יש כאלה!',                 rarity:'legendary', cat:'volume',  tier:10 },
  { key:'total_500h',       emoji:'🏆', label:'500 שעות',          desc:'500 שעות — מקצועי לגמרי!',               rarity:'legendary', cat:'duration',tier:10 },
  { key:'ach_50',           emoji:'🌟', label:'50 הישגים',         desc:'השגת 50 הישגים',                          rarity:'epic',      cat:'meta',    tier:10 },
  { key:'legend',           emoji:'⚡', label:'אגדה',              desc:'השגת 100 הישגים',                         rarity:'legendary', cat:'meta',    tier:10 },
  { key:'completionist',    emoji:'💎', label:'קומפלטיוניסט',      desc:'השגת 150 הישגים',                         rarity:'legendary', cat:'meta',    tier:10 },
];

const ACH_RARITY_COLOR = {
  common:    { bg:'rgba(255,255,255,.07)', border:'rgba(255,255,255,.15)', text:'var(--text-3)', glow:'' },
  rare:      { bg:'rgba(59,130,246,.1)',   border:'rgba(59,130,246,.35)',  text:'#60A5FA',       glow:'0 0 16px rgba(59,130,246,.3)' },
  epic:      { bg:'rgba(139,92,246,.12)',  border:'rgba(139,92,246,.4)',   text:'#A78BFA',       glow:'0 0 16px rgba(139,92,246,.35)' },
  legendary: { bg:'rgba(255,208,60,.12)',  border:'rgba(255,208,60,.45)',  text:'#FFD060',       glow:'0 0 20px rgba(255,208,60,.45)' },
};

function getAchievementProgress(key) {
  const docs = cachedUserDocs || [];
  const total = docs.length;
  const tc = {};
  docs.forEach(d => { const t = d.data().type; tc[t] = (tc[t] || 0) + 1; });
  const maxType = Math.max(...Object.values(tc), 0);
  const uniqueTypes = new Set(docs.map(d => d.data().type)).size;
  const totalMins = docs.reduce((s, d) => s + (d.data().duration || 0), 0);
  const totalHours = Math.round(totalMins / 60 * 10) / 10;
  const streak = calcStreak(docs);
  const withPhotos = docs.filter(d => d.data().photoUrl).length;
  const withDesc = docs.filter(d => d.data().mood || d.data().notes).length;
  const withMood = docs.filter(d => d.data().mood).length;
  const friendCount = (userProfile?.friendIds || []).length;
  const badgeCount = (userProfile?.badges || []).length;
  const goal = userProfile?.goal || 3;

  function weeklyGoalHits() {
    const weekCounts = {};
    docs.forEach(d => {
      const date = new Date(d.data().date + 'T12:00:00');
      const day = date.getDay();
      const monday = new Date(date.getTime() - ((day + 6) % 7) * 86400000);
      const wk = monday.toISOString().split('T')[0];
      weekCounts[wk] = (weekCounts[wk] || 0) + 1;
    });
    return Object.values(weekCounts).filter(c => c >= goal).length;
  }

  const thisWeek = (() => {
    const wStart = weekKey();
    const wEnd = localDateStr(new Date(new Date(wStart + 'T00:00:00').getTime() + 6 * 86400000));
    return docs.filter(d => { const dt = d.data().date; return dt >= wStart && dt <= wEnd; }).length;
  })();

  const map = {
    workouts_5:    [Math.min(total, 5),        5,    'אימונים'],
    workouts_10:   [Math.min(total, 10),       10,   'אימונים'],
    workouts_25:   [Math.min(total, 25),       25,   'אימונים'],
    workouts_50:   [Math.min(total, 50),       50,   'אימונים'],
    workouts_100:  [Math.min(total, 100),      100,  'אימונים'],
    workouts_200:  [Math.min(total, 200),      200,  'אימונים'],
    workouts_365:  [Math.min(total, 365),      365,  'אימונים'],
    workouts_500:  [Math.min(total, 500),      500,  'אימונים'],
    workouts_1000: [Math.min(total, 1000),     1000, 'אימונים'],
    streak_3:      [Math.min(streak, 3),       3,    'ימים ברצף'],
    streak_7:      [Math.min(streak, 7),       7,    'ימים ברצף'],
    streak_14:     [Math.min(streak, 14),      14,   'ימים ברצף'],
    streak_30:     [Math.min(streak, 30),      30,   'ימים ברצף'],
    streak_60:     [Math.min(streak, 60),      60,   'ימים ברצף'],
    streak_100:    [Math.min(streak, 100),     100,  'ימים ברצף'],
    variety_3:     [Math.min(uniqueTypes, 3),  3,    'סוגי אימון'],
    variety_5:     [Math.min(uniqueTypes, 5),  5,    'סוגי אימון'],
    variety_all:   [Math.min(uniqueTypes, 8),  8,    'סוגי אימון'],
    same_type_10:  [Math.min(maxType, 10),     10,   'מאותו סוג'],
    same_type_50:  [Math.min(maxType, 50),     50,   'מאותו סוג'],
    total_10h:     [Math.min(totalHours, 10),  10,   'שעות'],
    total_50h:     [Math.min(totalHours, 50),  50,   'שעות'],
    total_100h:    [Math.min(totalHours, 100), 100,  'שעות'],
    total_500h:    [Math.min(totalHours, 500), 500,  'שעות'],
    gym_20:        [Math.min(tc['gym']        || 0, 20),  20,  'חדר כושר'],
    gym_100:       [Math.min(tc['gym']        || 0, 100), 100, 'חדר כושר'],
    run_20:        [Math.min(tc['run']        || 0, 20),  20,  'ריצות'],
    run_50:        [Math.min(tc['run']        || 0, 50),  50,  'ריצות'],
    swim_10:       [Math.min(tc['swim']       || 0, 10),  10,  'שחיות'],
    swim_30:       [Math.min(tc['swim']       || 0, 30),  30,  'שחיות'],
    bball_10:      [Math.min(tc['basketball'] || 0, 10),  10,  'כדורסל'],
    tennis_10:     [Math.min(tc['tennis']     || 0, 10),  10,  'טניס'],
    padel_10:      [Math.min(tc['padel']      || 0, 10),  10,  'פאדל'],
    treadmill_20:  [Math.min(tc['treadmill']  || 0, 20),  20,  'הליכון'],
    gym_rat:       [Math.min(tc['gym']        || 0, 50),  50,  'חדר כושר'],
    photos_5:      [Math.min(withPhotos, 5),  5,   'תמונות'],
    photos_20:     [Math.min(withPhotos, 20), 20,  'תמונות'],
    mood_writer:   [Math.min(withDesc, 10),   10,  'עם תיאור'],
    good_mood:     [Math.min(withMood, 5),    5,   'עם הרגשה'],
    friends_5:     [Math.min(friendCount, 5), 5,   'חברים'],
    friends_10:    [Math.min(friendCount, 10),10,  'חברים'],
    ach_25:        [Math.min(badgeCount, 25), 25,  'הישגים'],
    ach_50:        [Math.min(badgeCount, 50), 50,  'הישגים'],
    legend:        [Math.min(badgeCount,100), 100, 'הישגים'],
    '5_in_week':   [Math.min(thisWeek, 5),    5,   'השבוע'],
    '7_in_week':   [Math.min(thisWeek, 7),    7,   'השבוע'],
    monthly_goal:  [Math.min(docs.filter(d => d.data().monthKey === monthKey()).length, goal), goal, 'החודש'],
    weekly_goal_1: [Math.min(weeklyGoalHits(), 1),  1,  'שבועות יעד'],
    weekly_goal_4: [Math.min(weeklyGoalHits(), 4),  4,  'שבועות יעד'],
    weekly_goal_10:[Math.min(weeklyGoalHits(), 10), 10, 'שבועות יעד'],
    weekly_goal_20:[Math.min(weeklyGoalHits(), 20), 20, 'שבועות יעד'],
    weekly_goal_52:[Math.min(weeklyGoalHits(), 52), 52, 'שבועות יעד'],
  };
  const entry = map[key];
  if (!entry) return null;
  const [current, target, unit] = entry;
  const displayCurrent = Number.isInteger(current) ? current : current.toFixed(1);
  return { current, target, label: `${displayCurrent}/${target} ${unit}` };
}

// ══ FIREBASE ═════════════════════════════════════════════════════════════
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db   = firebase.firestore();
let messaging;
try { messaging = firebase.messaging(); } catch (e) {}

const CLOUDINARY_CLOUD  = 'dcpvdscpx';
const CLOUDINARY_PRESET = 'yala-sport';

async function uploadToCloudinary(file, folder) {
  const fd = new FormData();
  fd.append('file', file);
  fd.append('upload_preset', CLOUDINARY_PRESET);
  fd.append('folder', folder);
  const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD}/image/upload`, {
    method: 'POST', body: fd,
  });
  if (!res.ok) throw new Error(`Cloudinary ${res.status}: ${await res.text()}`);
  const data = await res.json();
  return data.secure_url;
}

// Persist session permanently on this device (survives browser close / app reopen)
auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).catch(() => {});

// ══ STATE ════════════════════════════════════════════════════════════════
let currentUser          = null;
let userProfile          = { goal: 3 };
let leaderboardPeriod    = 'weekly';
let selectedType         = '';
let reminderDismissed    = false;
let editingWorkoutId     = null;
let chartPeriod          = 'weekly';
let progressChart        = null;
let cachedUserDocs       = [];
let goalWasHit           = false;
let currentTab           = 'home';
let workoutsUnsubscribe  = null;
let feedAllDocs          = [];
let feedOffset           = 0;
let feedObserver         = null;
let viewingUserId        = null;
let homeLbCache          = null;
let homeLbCacheTime      = 0;
let homeLbExpanded       = false;
let _calMonth = 0, _calYear = 2024, _calSelectedDate = '';
const commentListeners   = {};

// ── Notifications state ──
const DEFAULT_NOTIF_PREFS = {
  master: true,
  friendCompletedWorkout: true,
  noWorkoutTwoDays: true,
  friendLikedMyWorkout: true,
  friendCommentedMyWorkout: true,
  newAchievement: true,
  weeklyGoalReminder: true,
  storyReply: true,
};
let notifPrefs              = null;
let _notifDocs              = [];
let _notifUnsub             = null;
let _noWorkoutNotifSent     = false;
let _weeklyGoalNotifSent    = false;
let _notifPermDeniedShown   = false;

// ══ ANIMATION UTILITIES ══════════════════════════════════════════════════
function animateCounter(el, target, duration = 700) {
  if (!el) return;
  const start     = parseInt(el.textContent) || 0;
  const startTime = performance.now();
  if (start === target) return;
  function tick(now) {
    const t = Math.min((now - startTime) / duration, 1);
    const ease = 1 - Math.pow(1 - t, 3);
    el.textContent = Math.round(start + (target - start) * ease);
    if (t < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

function updateHeroRing(pct) {
  const ring = document.getElementById('hero-ring');
  if (!ring) return;
  const circumference = 464.9;
  ring.style.strokeDashoffset = circumference * (1 - Math.min(pct / 100, 1));
}

function updateAvatarRing(pct) {
  const ring = document.getElementById('avatar-ring');
  if (!ring) return;
  const circumference = 138.2;
  ring.style.strokeDashoffset = circumference * (1 - Math.min(pct / 100, 1));
  ring.style.transition = 'stroke-dashoffset .9s cubic-bezier(.2,.8,.4,1)';
}

function launchConfetti() {
  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:9999;';
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
  document.body.appendChild(canvas);
  const ctx    = canvas.getContext('2d');
  const colors = ['#FF6B35','#FF1F5A','#FFD060','#00D9A3','#9B8EFF','#FFFFFF'];
  const pieces = Array.from({ length: 120 }, () => ({
    x:    Math.random() * canvas.width,
    y:    -20 - Math.random() * 80,
    w:    Math.random() * 10 + 6,
    h:    Math.random() * 5 + 3,
    color: colors[Math.floor(Math.random() * colors.length)],
    vx:   (Math.random() - .5) * 5,
    vy:   Math.random() * 3.5 + 1.5,
    rot:  Math.random() * 360,
    vrot: (Math.random() - .5) * 7,
    alpha: 1,
  }));
  let frame = 0;
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pieces.forEach(p => {
      p.x += p.vx; p.y += p.vy + frame * .015;
      p.rot += p.vrot; p.vy += .06;
      if (frame > 120) p.alpha = Math.max(0, p.alpha - .012);
      ctx.save();
      ctx.globalAlpha = p.alpha;
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot * Math.PI / 180);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    });
    if (++frame < 200) requestAnimationFrame(draw);
    else canvas.remove();
  }
  draw();
}

function addRipple(e) {
  const btn  = e.currentTarget;
  const rect = btn.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height) * 2;
  const r    = document.createElement('span');
  r.style.cssText = `
    position:absolute;border-radius:50%;pointer-events:none;
    width:${size}px;height:${size}px;
    top:${e.clientY - rect.top - size / 2}px;
    left:${e.clientX - rect.left - size / 2}px;
    background:rgba(255,255,255,.18);
    transform:scale(0);animation:rippleGo .55s ease forwards;
  `;
  btn.appendChild(r);
  r.addEventListener('animationend', () => r.remove());
}

function initRipples() {
  document.querySelectorAll('.btn-primary, .btn-success, .btn-sm, .btn-accept, .fab')
    .forEach(btn => {
      if (btn._ripple) return;
      btn._ripple = true;
      btn.addEventListener('click', addRipple);
    });
}

// ══ SKELETON LOADERS ═════════════════════════════════════════════════════
function skeletonFeed(n = 3) {
  return Array.from({ length: n }, () => `
    <div class="skel-card">
      <div style="display:flex;gap:10px;align-items:center">
        <div class="skel" style="width:42px;height:42px;border-radius:50%;flex-shrink:0"></div>
        <div style="flex:1">
          <div class="skel" style="height:13px;width:48%;margin-bottom:7px"></div>
          <div class="skel" style="height:11px;width:32%"></div>
        </div>
        <div class="skel" style="height:26px;width:72px;border-radius:99px"></div>
      </div>
      <div class="skel" style="height:11px;width:80%;margin-top:12px"></div>
    </div>`).join('');
}

function skeletonLeaderboard(n = 4) {
  return Array.from({ length: n }, (_, i) => `
    <div class="lb-row" style="animation-delay:${i * 60}ms">
      <div class="skel" style="width:30px;height:30px;border-radius:8px"></div>
      <div class="skel" style="width:44px;height:44px;border-radius:50%"></div>
      <div style="flex:1;margin:0 10px">
        <div class="skel" style="height:14px;width:55%;margin-bottom:8px"></div>
        <div class="skel" style="height:3px;width:100%;border-radius:99px"></div>
      </div>
      <div class="skel" style="width:32px;height:32px;border-radius:8px"></div>
    </div>`).join('');
}

function skeletonList(n = 3) {
  return Array.from({ length: n }, () => `
    <div class="skel-card">
      <div class="skel" style="height:13px;width:40%;margin-bottom:10px"></div>
      <div style="display:flex;justify-content:space-between;align-items:center">
        <div>
          <div class="skel" style="height:14px;width:120px;margin-bottom:7px"></div>
          <div class="skel" style="height:11px;width:90px"></div>
        </div>
        <div class="skel" style="height:28px;width:48px;border-radius:8px"></div>
      </div>
    </div>`).join('');
}

// ══ NAVIGATION ═══════════════════════════════════════════════════════════
function moveNavIndicator(tab) {
  const navItem   = document.getElementById('nav-' + tab);
  const nav       = document.getElementById('bottom-nav');
  const indicator = document.getElementById('nav-indicator');
  if (!navItem || !nav || !indicator) return;
  const r  = navItem.getBoundingClientRect();
  const nr = nav.getBoundingClientRect();
  indicator.style.left  = (r.left - nr.left) + 'px';
  indicator.style.width = r.width + 'px';
}

function switchTab(tab) {
  if (tab === currentTab) return;
  currentTab = tab;

  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  document.getElementById('view-' + tab).classList.add('active');
  document.getElementById('nav-' + tab).classList.add('active');
  moveNavIndicator(tab);

  // FAB only on home
  const fabWrap = document.getElementById('fab-wrap');
  if (fabWrap) fabWrap.classList.toggle('hidden', tab !== 'home');

  if (tab === 'home')         loadHomeView();
  if (tab === 'leaderboard')  loadLeaderboard();
  if (tab === 'achievements') loadAchievementsView();
  if (tab === 'settings')     renderSettings();
  if (tab === 'friends')      loadFriendsView();
}

// ══ UTILITIES ════════════════════════════════════════════════════════════
let _toastTimer;
function toast(msg, type = '') {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.className = type ? `show ${type}` : 'show';
  clearTimeout(_toastTimer);
  _toastTimer = setTimeout(() => { el.className = ''; }, 3500);
}

function avatarOf(name) {
  if (!name) return '?';
  const p = name.trim().split(/\s+/);
  return (p.length >= 2 ? p[0][0] + p[1][0] : p[0].slice(0, 2)).toUpperCase();
}

// Build "YYYY-MM-DD" from a local Date (avoids UTC-shift bugs in toISOString)
function localDateStr(d) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

// Monday of the week that is `offsetWeeks` weeks from now (Mon–Sun calendar)
function weekKey(offsetWeeks = 0) {
  const d   = new Date();
  const day = d.getDay();                                  // 0=Sun … 6=Sat
  d.setDate(d.getDate() + (day === 0 ? -6 : 1 - day) + offsetWeeks * 7);
  return localDateStr(d);
}

function monthKey(d = new Date()) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
}

// Monday of the week that contains the given date string (Mon–Sun calendar)
function dateToWeekKey(dateStr) {
  const d   = new Date(dateStr + 'T12:00:00');             // noon avoids DST edge cases
  const day = d.getDay();
  d.setDate(d.getDate() + (day === 0 ? -6 : 1 - day));
  return localDateStr(d);
}

function fmtDate(dateStr) {
  if (!dateStr) return '';
  try {
    return new Date(dateStr + 'T12:00:00')
      .toLocaleDateString('he-IL', { day: 'numeric', month: 'long' });
  } catch { return dateStr; }
}

function escHtml(s) {
  if (!s) return '';
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

// Returns relative time in Hebrew; ts can be a Firestore Timestamp or Date-like
function timeAgo(ts) {
  if (!ts) return '';
  const then = ts.toMillis ? ts.toMillis() : (ts.seconds ? ts.seconds * 1000 : new Date(ts).getTime());
  const diff = Math.floor((Date.now() - then) / 1000);
  if (diff < 60)    return 'עכשיו';
  if (diff < 3600)  return `לפני ${Math.floor(diff / 60)} דקות`;
  if (diff < 86400) return `לפני ${Math.floor(diff / 3600)} שעות`;
  if (diff < 172800) return 'אתמול';
  return `לפני ${Math.floor(diff / 86400)} ימים`;
}

function storyTimeAgoShort(ts) {
  if (!ts) return '';
  const then = ts.toMillis ? ts.toMillis() : (ts.seconds ? ts.seconds * 1000 : new Date(ts).getTime());
  const diff = Math.floor((Date.now() - then) / 60000);
  if (diff < 60) return `${diff}ד׳`;
  return `${Math.floor(diff / 60)}ש׳`;
}

// Compresses an image file to maxDimPx × maxDimPx and under maxKB, using Canvas
async function compressImage(file, maxDimPx, maxKB) {
  return new Promise(resolve => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      let { width, height } = img;
      if (width > maxDimPx || height > maxDimPx) {
        const ratio = Math.min(maxDimPx / width, maxDimPx / height);
        width  = Math.round(width  * ratio);
        height = Math.round(height * ratio);
      }
      const canvas = document.createElement('canvas');
      canvas.width = width; canvas.height = height;
      canvas.getContext('2d').drawImage(img, 0, 0, width, height);
      let quality = 0.9;
      function tryCompress() {
        canvas.toBlob(blob => {
          if (!blob) { resolve(file); return; }
          if (blob.size <= maxKB * 1024 || quality <= 0.3) {
            resolve(new File([blob], file.name.replace(/\.[^.]+$/, '.jpg'), { type: 'image/jpeg' }));
          } else { quality -= 0.1; tryCompress(); }
        }, 'image/jpeg', quality);
      }
      tryCompress();
    };
    img.onerror = () => { URL.revokeObjectURL(url); resolve(file); };
    img.src = url;
  });
}

// Produces a branded 1080×1080 JPEG: center-cropped photo + gradient overlay + workout text
async function brandWorkoutImage(file, meta) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      const SIZE = 1080;
      const canvas = document.createElement('canvas');
      canvas.width = SIZE; canvas.height = SIZE;
      const ctx = canvas.getContext('2d');

      // Center-crop to 1:1
      const sw = img.naturalWidth, sh = img.naturalHeight;
      const minDim = Math.min(sw, sh);
      const sx = (sw - minDim) / 2, sy = (sh - minDim) / 2;
      ctx.drawImage(img, sx, sy, minDim, minDim, 0, 0, SIZE, SIZE);

      // Dark gradient over bottom half
      const grad = ctx.createLinearGradient(0, SIZE * 0.45, 0, SIZE);
      grad.addColorStop(0, 'rgba(0,0,0,0)');
      grad.addColorStop(1, 'rgba(0,0,0,0.75)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, SIZE, SIZE);

      ctx.textAlign = 'right';
      ctx.direction = 'rtl';
      ctx.fillStyle = '#ffffff';
      const rx = SIZE - 40;
      const shadow = () => { ctx.shadowColor = 'rgba(0,0,0,0.55)'; ctx.shadowBlur = 8; };
      const noShadow = () => { ctx.shadowBlur = 0; };

      // Watermark — top right
      ctx.globalAlpha = 0.6;
      ctx.font = 'bold 26px Heebo, Arial, sans-serif';
      shadow();
      ctx.fillText('💪 go and move', rx, 54);
      noShadow();
      ctx.globalAlpha = 1;

      // Workout type
      ctx.font = 'bold 58px Heebo, Arial, sans-serif';
      shadow();
      ctx.fillText(`${meta.typeEmoji || '💪'} ${meta.typeName || ''}`.trim(), rx, SIZE - 120);
      noShadow();

      // Duration (optional)
      if (meta.duration) {
        ctx.font = '600 38px Heebo, Arial, sans-serif';
        shadow();
        ctx.fillText(fmtDuration(meta.duration), rx, SIZE - 68);
        noShadow();
      }

      // Date
      const dateStr = meta.date ? meta.date.split('-').reverse().join('.') : '';
      if (dateStr) {
        ctx.globalAlpha = 0.8;
        ctx.font = '400 28px Heebo, Arial, sans-serif';
        shadow();
        ctx.fillText(dateStr, rx, SIZE - 30);
        noShadow();
        ctx.globalAlpha = 1;
      }

      canvas.toBlob(blob => {
        if (!blob) { reject(new Error('branding failed')); return; }
        resolve(new File([blob], 'branded.jpg', { type: 'image/jpeg' }));
      }, 'image/jpeg', 0.92);
    };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('image load failed')); };
    img.src = url;
  });
}

// ══ AVATAR HELPERS ═══════════════════════════════════════════════════════
// Returns HTML for an avatar: photo <img> when available, initials otherwise
function avatarHtml(name, photoUrl, cls = 'lb-avatar', size = '') {
  const initials = escHtml(avatarOf(name || '?'));
  const szStyle  = size ? `width:${size}px;height:${size}px;` : '';
  if (photoUrl) {
    return `<div class="${cls}" style="${szStyle}padding:0;overflow:hidden">` +
           `<img src="${escHtml(photoUrl)}" alt="${initials}" ` +
           `style="width:100%;height:100%;object-fit:cover;display:block" ` +
           `onerror="this.parentElement.innerHTML='${initials}'">` +
           `</div>`;
  }
  return `<div class="${cls}" style="${szStyle}">${initials}</div>`;
}

// Updates the header avatar element (photo or initials)
function setHeaderAvatar() {
  const el       = document.getElementById('user-avatar');
  if (!el) return;
  const name     = currentUser?.displayName || '?';
  const photoUrl = userProfile?.photoUrl || currentUser?.photoURL || '';
  if (photoUrl) {
    el.innerHTML = `<img src="${escHtml(photoUrl)}" alt="${escHtml(avatarOf(name))}" ` +
                   `style="width:100%;height:100%;object-fit:cover;border-radius:50%;display:block" ` +
                   `onerror="this.parentElement.textContent='${escHtml(avatarOf(name))}'">`;
  } else {
    el.textContent = avatarOf(name);
  }
}

async function uploadProfilePhoto(file) {
  if (!file) return;
  const wrap = document.getElementById('settings-avatar-wrap');
  if (wrap) wrap.style.opacity = '0.45';
  try {
    const compressed = await compressImage(file, 400, 200);
    const photoUrl   = await uploadToCloudinary(compressed, `yala-sport/avatars/${currentUser.uid}`);
    await currentUser.updateProfile({ photoURL: photoUrl });
    await db.collection('users').doc(currentUser.uid).update({ photoUrl });
    userProfile.photoUrl = photoUrl;
    setHeaderAvatar();
    renderSettings();
    toast('תמונת הפרופיל עודכנה! ✓', 'success');
  } catch (err) {
    console.error('Profile photo upload error:', err);
    toast('שגיאה בהעלאת התמונה', 'error');
  } finally {
    if (wrap) wrap.style.opacity = '1';
    document.getElementById('photo-upload-input').value = '';
  }
}

// ══ REAL-TIME WORKOUTS LISTENER ══════════════════════════════════════════
// Subscribes to the current user's workouts; calls onFirst() once data is ready
function subscribeWorkouts(onFirst) {
  if (workoutsUnsubscribe) { workoutsUnsubscribe(); workoutsUnsubscribe = null; }
  let isFirst = true;
  workoutsUnsubscribe = db.collection('workouts')
    .where('userId', '==', currentUser.uid)
    .onSnapshot(snap => {
      cachedUserDocs = snap.docs.sort((a, b) => b.data().date.localeCompare(a.data().date));
      updateWeeklyStats();
      if (isFirst) { isFirst = false; if (onFirst) onFirst(); }
    }, err => console.error('Workouts listener:', err));
}

// Recomputes stats and badge; called by the workouts snapshot listener
function updateWeeklyStats() {
  renderProgressSection();
}

// ══ PARALLAX / SCROLL ════════════════════════════════════════════════════
function initScrollEffects() {
  const content = document.getElementById('app-content');
  const header  = document.getElementById('app-header');
  const hero    = document.getElementById('progress-card');
  if (!content) return;
  content.addEventListener('scroll', () => {
    const y = content.scrollTop;
    if (header) header.classList.toggle('scrolled', y > 10);
    if (hero && currentTab === 'home') {
      const scale = Math.max(.96, 1 - y * 0.00015);
      hero.style.transform = `scale(${scale})`;
      hero.style.transformOrigin = 'top center';
    }
  }, { passive: true });
}

// ══ AUTH ═════════════════════════════════════════════════════════════════
function switchAuthTab(tab) {
  const isLogin = tab === 'login';
  document.getElementById('login-form').classList.toggle('hidden', !isLogin);
  document.getElementById('register-form').classList.toggle('hidden', isLogin);
  document.getElementById('tab-login-btn').classList.toggle('active', isLogin);
  document.getElementById('tab-reg-btn').classList.toggle('active', !isLogin);
}

async function doLogin(e) {
  e.preventDefault();
  const identifier = document.getElementById('login-identifier').value.trim();
  const password   = document.getElementById('login-password').value;
  const errEl      = document.getElementById('login-err');
  const btn        = document.getElementById('login-btn');
  errEl.textContent = '';
  btn.textContent = 'נכנס...'; btn.disabled = true;
  try {
    let email = identifier;
    if (!identifier.includes('@')) {
      const uDoc = await db.collection('usernames').doc(identifier.toLowerCase()).get();
      if (!uDoc.exists) {
        errEl.textContent = 'שם משתמש לא נמצא';
        btn.disabled = false; btn.textContent = 'כניסה →';
        return;
      }
      email = uDoc.data().email;
    }
    await auth.signInWithEmailAndPassword(email, password);
  } catch (err) {
    errEl.textContent = authErr(err.code);
    btn.disabled = false; btn.textContent = 'כניסה →';
  }
}

async function doRegister(e) {
  e.preventDefault();
  const name     = document.getElementById('reg-name').value.trim();
  const username = document.getElementById('reg-username').value.trim().toLowerCase();
  const email    = document.getElementById('reg-email').value.trim();
  const password = document.getElementById('reg-password').value;
  const errEl    = document.getElementById('reg-err');
  const btn      = document.getElementById('reg-btn');
  if (!name)     { errEl.textContent = 'נא להזין שם'; return; }
  if (!username) { errEl.textContent = 'נא להזין שם משתמש'; return; }
  if (!/^[a-z0-9_]{3,20}$/.test(username)) {
    errEl.textContent = 'שם משתמש: 3-20 תווים, אותיות לועזיות/מספרים/קו תחתון בלבד';
    return;
  }
  errEl.textContent = '';
  btn.textContent = 'בודק...'; btn.disabled = true;
  try {
    const unameDoc = await db.collection('usernames').doc(username).get();
    if (unameDoc.exists) {
      errEl.textContent = 'שם המשתמש הזה כבר תפוס. נסה אחר.';
      btn.disabled = false; btn.textContent = 'הרשמה →';
      return;
    }
    btn.textContent = 'נרשם...';
    const cred = await auth.createUserWithEmailAndPassword(email, password);
    await cred.user.updateProfile({ displayName: name });
    const batch = db.batch();
    batch.set(db.collection('users').doc(cred.user.uid), {
      name, username, email, goal: 3, friendIds: [], badges: [],
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    batch.set(db.collection('usernames').doc(username), { uid: cred.user.uid, email });
    await batch.commit();
    autoFriendNewUser(cred.user.uid);
  } catch (err) {
    errEl.textContent = authErr(err.code);
    btn.disabled = false; btn.textContent = 'הרשמה →';
  }
}

let _usernameCheckTimer = null;
function onRegUsernameInput(val) {
  clearTimeout(_usernameCheckTimer);
  const badge = document.getElementById('username-avail');
  if (!badge) return;
  const v = val.trim().toLowerCase();
  if (!v || !/^[a-z0-9_]{3,20}$/.test(v)) { badge.textContent = ''; return; }
  badge.textContent = '⋯';
  badge.style.color = 'var(--text-3)';
  _usernameCheckTimer = setTimeout(async () => {
    try {
      const snap = await db.collection('usernames').doc(v).get();
      if (snap.exists) {
        badge.textContent = '✗';
        badge.style.color = 'var(--danger)';
      } else {
        badge.textContent = '✓';
        badge.style.color = 'var(--success)';
      }
    } catch { badge.textContent = ''; }
  }, 400);
}

function authErr(code) {
  return ({
    'auth/user-not-found':       'משתמש לא נמצא',
    'auth/wrong-password':       'סיסמה שגויה',
    'auth/invalid-email':        'כתובת מייל לא תקינה',
    'auth/email-already-in-use': 'המייל כבר בשימוש',
    'auth/weak-password':        'הסיסמה חלשה מדי',
    'auth/invalid-credential':   'פרטי התחברות שגויים',
    'auth/too-many-requests':    'יותר מדי ניסיונות',
  })[code] || 'שגיאה, נסה שוב';
}

async function doSignOut() { await auth.signOut(); }

// ══ WORKOUT MODAL ════════════════════════════════════════════════════════
function openWorkoutModal(workoutData = null, workoutId = null) {
  editingWorkoutId = workoutId;
  const isEdit = !!workoutData;
  selectedType = isEdit ? workoutData.type : '';
  const initDate = isEdit ? workoutData.date : localDateStr(new Date());
  document.getElementById('workout-date').value = initDate;
  const _d0 = new Date(initDate + 'T12:00:00');
  _calMonth = _d0.getMonth(); _calYear = _d0.getFullYear(); _calSelectedDate = initDate;
  document.getElementById('wf-date-label').textContent = fmtDate(initDate);
  document.getElementById('wf-calendar').style.display = 'none';
  renderDurationChips(isEdit ? (workoutData.duration || 45) : 45);
  document.getElementById('workout-notes').value    = isEdit ? (workoutData.notes || '') : '';
  document.getElementById('workout-mood').value     = isEdit ? (workoutData.mood  || '') : '';
  clearWorkoutPhoto();
  if (isEdit && workoutData.photoUrl) {
    document.getElementById('photo-preview').src = workoutData.photoUrl;
    document.getElementById('photo-preview-wrap').style.display = 'block';
    document.getElementById('photo-pick-btn').textContent = '📷 שנה תמונה';
  }
  document.getElementById('modal-title').textContent = isEdit ? 'ערוך אימון ✏️' : 'רשום אימון 💪';
  document.getElementById('delete-workout-btn').classList.toggle('hidden', !isEdit);
  document.getElementById('submit-workout-btn').textContent = isEdit ? 'עדכן אימון ✓' : 'שמור אימון ✓';
  renderTypeGrid();
  document.getElementById('workout-modal').classList.add('show');
  setTimeout(initRipples, 50);
}

function closeWorkoutModal() {
  document.getElementById('workout-modal').classList.remove('show');
  const cal = document.getElementById('wf-calendar');
  if (cal) cal.style.display = 'none';
  editingWorkoutId = null;
  clearWorkoutPhoto();
}

// ── Duration chips ──────────────────────────────────────────────────────────
const _DUR_LABELS = {15:'15 דק׳',30:'30 דק׳',45:'45 דק׳',60:'שעה',75:'75 דק׳',
  90:'1.5 ש׳',105:'105 דק׳',120:'2 ש׳',135:'135 דק׳',150:'2.5 ש׳',180:'3 ש׳'};
function renderDurationChips(selected) {
  const el = document.getElementById('dur-chips');
  if (!el) return;
  el.innerHTML = [15,30,45,60,75,90,105,120,135,150,180].map(m =>
    `<button type="button" class="dur-chip${m===selected?' selected':''}" data-mins="${m}" onclick="selectDuration(${m})">${_DUR_LABELS[m]}</button>`
  ).join('');
  document.getElementById('workout-minutes').value = selected || '';
}
function selectDuration(m) {
  document.querySelectorAll('.dur-chip').forEach(c => c.classList.toggle('selected', +c.dataset.mins === m));
  document.getElementById('workout-minutes').value = m;
}

// ── Custom calendar ─────────────────────────────────────────────────────────
const _CAL_MONTH_NAMES = ['ינואר','פברואר','מרץ','אפריל','מאי','יוני','יולי','אוגוסט','ספטמבר','אוקטובר','נובמבר','דצמבר'];
function toggleCalendar() {
  const cal = document.getElementById('wf-calendar');
  if (!cal) return;
  if (cal.style.display === 'none') { cal.style.display = ''; renderCalendar(); }
  else cal.style.display = 'none';
}
function renderCalendar() {
  const today    = new Date();
  const todayStr = localDateStr(today);
  const minDate  = new Date(today.getTime() - 180 * 86400000);
  const minStr   = localDateStr(minDate);

  document.getElementById('wf-cal-month-lbl').textContent =
    `${_CAL_MONTH_NAMES[_calMonth]} ${_calYear}`;

  const firstDow  = new Date(_calYear, _calMonth, 1).getDay();
  const daysInMon = new Date(_calYear, _calMonth + 1, 0).getDate();

  let html = '';
  for (let i = 0; i < firstDow; i++) html += '<div class="wf-cal-cell empty"></div>';
  for (let d = 1; d <= daysInMon; d++) {
    const ds       = `${_calYear}-${String(_calMonth+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
    const isSel    = ds === _calSelectedDate;
    const isToday  = ds === todayStr;
    const disabled = ds > todayStr || ds < minStr;
    html += `<div class="wf-cal-cell${isSel?' selected':''}${isToday&&!isSel?' today':''}${disabled?' disabled':''}"${
      !disabled ? ` onclick="calSelectDay('${ds}')"` : ''}>${d}</div>`;
  }
  document.getElementById('wf-cal-grid').innerHTML = html;

  const prevDisabled = _calYear < minDate.getFullYear() ||
    (_calYear === minDate.getFullYear() && _calMonth <= minDate.getMonth());
  const nextDisabled = _calYear > today.getFullYear() ||
    (_calYear === today.getFullYear() && _calMonth >= today.getMonth());
  const pb = document.getElementById('wf-cal-prev');
  const nb = document.getElementById('wf-cal-next');
  if (pb) pb.disabled = prevDisabled;
  if (nb) nb.disabled = nextDisabled;
}
function calPrevMonth() {
  if (_calMonth === 0) { _calMonth = 11; _calYear--; } else _calMonth--;
  renderCalendar();
}
function calNextMonth() {
  if (_calMonth === 11) { _calMonth = 0; _calYear++; } else _calMonth++;
  renderCalendar();
}
function calSelectDay(ds) {
  _calSelectedDate = ds;
  document.getElementById('workout-date').value = ds;
  document.getElementById('wf-date-label').textContent = fmtDate(ds);
  document.getElementById('wf-calendar').style.display = 'none';
}

let _pendingPhotoFile = null;

function previewWorkoutPhoto(file) {
  if (!file) return;
  _pendingPhotoFile = file;
  const reader = new FileReader();
  reader.onload = e => {
    document.getElementById('photo-preview').src = e.target.result;
    document.getElementById('photo-preview-wrap').style.display = 'block';
    document.getElementById('photo-pick-btn').textContent = '📷 שנה תמונה';
  };
  reader.readAsDataURL(file);
}

function clearWorkoutPhoto() {
  _pendingPhotoFile = null;
  document.getElementById('photo-preview-wrap').style.display = 'none';
  document.getElementById('photo-preview').src = '';
  document.getElementById('photo-pick-btn').textContent = '📷 בחר תמונה';
  const inp = document.getElementById('workout-photo-input');
  if (inp) inp.value = '';
}

async function uploadWorkoutPhoto(file, meta = null) {
  if (!file) return null;
  try {
    const toUpload = meta
      ? await brandWorkoutImage(file, meta)
      : await compressImage(file, 1080, 500);
    return await uploadToCloudinary(toUpload, `yala-sport/workouts/${currentUser.uid}`);
  } catch (err) {
    console.error('Workout photo upload failed:', err);
    toast(`שגיאה בהעלאת תמונה: ${err.message || String(err)}`, 'error');
    return null;
  }
}

function onModalBackdrop(e) {
  if (e.target.id === 'workout-modal') closeWorkoutModal();
}

function renderTypeGrid() {
  document.getElementById('type-grid').innerHTML = WORKOUT_TYPES.map(t => `
    <button class="type-btn${selectedType === t.key ? ' selected' : ''}" onclick="selectType('${t.key}')">
      <span class="t-emoji">${t.emoji}</span>
      <span class="t-label">${t.label}</span>
    </button>`).join('');
}

function selectType(key) {
  selectedType = key;
  renderTypeGrid();
  // Pop animation on selected button
  const btn = document.querySelector('.type-btn.selected');
  if (btn) { btn.style.animation = 'none'; btn.offsetHeight; btn.style.animation = 'popIn .3s ease'; }
}

async function submitWorkout(skipPhotoCheck = false) {
  if (!selectedType) { toast('בחר סוג אימון', 'error'); return; }
  const dateVal = document.getElementById('workout-date').value;
  if (!dateVal)  { toast('בחר תאריך', 'error'); return; }
  if (!skipPhotoCheck && !editingWorkoutId && !_pendingPhotoFile) {
    document.getElementById('no-photo-confirm').classList.add('show');
    return;
  }
  const notes    = document.getElementById('workout-notes').value.trim();
  const mood     = document.getElementById('workout-mood').value.trim();
  const duration = parseInt(document.getElementById('workout-minutes').value) || null;
  const t        = WORKOUT_TYPES.find(x => x.key === selectedType);
  const btn      = document.getElementById('submit-workout-btn');
  btn.disabled = true; btn.textContent = 'שומר...';
  try {
    const workoutMeta = { typeEmoji: t.emoji, typeName: t.label, date: dateVal, duration };
    if (editingWorkoutId) {
      let photoUrl = undefined;
      if (_pendingPhotoFile) {
        btn.textContent = 'מעצב תמונה...';
        photoUrl = await uploadWorkoutPhoto(_pendingPhotoFile, workoutMeta);
      }
      const upd = {
        type: selectedType, typeEmoji: t.emoji, typeName: t.label,
        date: dateVal, weekKey: dateToWeekKey(dateVal),
        monthKey: dateVal.slice(0, 7), notes: notes || null, mood: mood || null, duration,
      };
      if (photoUrl !== undefined) {
        upd.photoUrl  = photoUrl;
        upd.isBranded = true;
        upd.brandedAt = firebase.firestore.FieldValue.serverTimestamp();
      }
      await db.collection('workouts').doc(editingWorkoutId).update(upd);
      toast('האימון עודכן ✓', 'success');
    } else {
      const docRef = await db.collection('workouts').add({
        userId: currentUser.uid, userName: userProfile.name || currentUser.displayName || '',
        userUsername: userProfile.username || '',
        userPhotoUrl: userProfile.photoUrl || '',
        type: selectedType, typeEmoji: t.emoji, typeName: t.label,
        date: dateVal, weekKey: dateToWeekKey(dateVal),
        monthKey: dateVal.slice(0, 7), notes: notes || null, mood: mood || null, duration,
        likedBy: [], photoUrl: null,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
      if (_pendingPhotoFile) {
        btn.textContent = 'מעצב תמונה...';
        const photoUrl = await uploadWorkoutPhoto(_pendingPhotoFile, workoutMeta);
        if (photoUrl) {
          await docRef.update({ photoUrl, isBranded: true, brandedAt: firebase.firestore.FieldValue.serverTimestamp() });
          toast('האימון נרשם עם תמונה! 📸', 'success');
        } else {
          toast('האימון נרשם, אבל התמונה לא הועלתה ⚠️', '');
        }
      } else {
        toast('האימון נרשם! 💪', 'success');
      }
    }
    // Notify friends about new workout (not on edits)
    if (!editingWorkoutId) {
      const friendIds = userProfile.friendIds || [];
      if (friendIds.length) {
        const t = WORKOUT_TYPES.find(x => x.key === selectedType);
        friendIds.forEach(fid => pushNotification(fid, {
          type: 'friendCompletedWorkout',
          title: `${t?.emoji || '💪'} ${userProfile.name || 'חבר'} התאמן!`,
          body: `${userProfile.name || 'חבר'} סיים ${t?.label || 'אימון'}`,
          icon: t?.emoji || '💪',
        }));
      }
    }
    closeWorkoutModal();
    loadHomeView();
  } catch (err) {
    toast('שגיאה בשמירה', 'error'); console.error(err);
  } finally {
    btn.disabled = false;
    btn.textContent = editingWorkoutId ? 'עדכן אימון ✓' : 'שמור אימון ✓';
  }
}

async function editWorkout(wid) {
  try {
    const doc = await db.collection('workouts').doc(wid).get();
    if (doc.exists) openWorkoutModal(doc.data(), wid);
  } catch (err) { toast('שגיאה בטעינה', 'error'); }
}

function confirmDeleteWorkout(widOverride) {
  const wid = widOverride || editingWorkoutId;
  if (!wid) return;
  if (!confirm('למחוק את האימון הזה?')) return;
  deleteWorkout(wid);
}

async function deleteWorkout(wid) {
  try {
    await db.collection('workouts').doc(wid).delete();
    closeWorkoutModal();
    toast('האימון נמחק', '');
    loadHomeView();
  } catch (err) { toast('שגיאה במחיקה', 'error'); }
}

// ══ HOME ═════════════════════════════════════════════════════════════════
// cachedUserDocs is kept current by subscribeWorkouts(); this just renders the view
async function loadHomeView() {
  if (!currentUser) return;
  renderProgressSection();
  document.getElementById('activity-feed').innerHTML = skeletonFeed(3);
  loadActivityFeed();
  loadStories();
  loadHomeLb();
  checkReminder(cachedUserDocs);
  checkAchievements(cachedUserDocs);
  checkWeeklyGoalReminder();
}

// ══ HOME LEADERBOARD ═════════════════════════════════════════════════════
async function loadHomeLb() {
  const el = document.getElementById('home-lb-card');
  if (!el || !currentUser) return;

  homeLbExpanded = false;
  const friendIds = userProfile?.friendIds || [];

  if (!friendIds.length) {
    el.style.display = '';
    renderHomeLb(null);
    return;
  }

  const now5 = Date.now();
  if (homeLbCache && now5 - homeLbCacheTime < 5 * 60 * 1000) {
    el.style.display = '';
    renderHomeLb(homeLbCache);
    return;
  }

  const wStart  = weekKey();
  const wEnd    = localDateStr(new Date(new Date(wStart + 'T00:00:00').getTime() + 6 * 86400000));
  const myGroup = new Set([currentUser.uid, ...friendIds]);

  try {
    const snap = await db.collection('workouts')
      .where('date', '>=', wStart).where('date', '<=', wEnd).get();

    const counts = {}, names = {}, photos = {}, latest = {};
    snap.docs.forEach(doc => {
      const w = doc.data();
      if (!w.userId || !myGroup.has(w.userId)) return;
      counts[w.userId] = (counts[w.userId] || 0) + 1;
      if (!names[w.userId])               names[w.userId]  = w.userName || 'משתמש';
      if (!photos[w.userId] && w.userPhotoUrl) photos[w.userId] = w.userPhotoUrl;
      if (!latest[w.userId] || w.date > latest[w.userId]) latest[w.userId] = w.date;
    });

    // Always include current user
    if (counts[currentUser.uid] === undefined) {
      counts[currentUser.uid] = 0;
      names[currentUser.uid]  = userProfile.name || currentUser.displayName || 'אתה';
      photos[currentUser.uid] = userProfile.photoUrl || '';
    }

    // Always include every friend — fetch user docs for those with 0 workouts this week
    const missingFriends = friendIds.filter(uid => counts[uid] === undefined);
    if (missingFriends.length) {
      const friendDocs = await Promise.all(
        missingFriends.map(uid => db.collection('users').doc(uid).get())
      );
      friendDocs.forEach(d => {
        const fd = d.exists ? d.data() : {};
        counts[d.id] = 0;
        names[d.id]  = fd.name || fd.displayName || 'משתמש';
        photos[d.id] = fd.photoUrl || '';
      });
    }

    homeLbCache = Object.entries(counts)
      .sort((a, b) =>
        b[1] - a[1] ||
        (latest[b[0]] || '').localeCompare(latest[a[0]] || '') ||
        (names[a[0]] || '').localeCompare(names[b[0]] || ''))
      .map(([uid, cnt], i) => ({ uid, cnt, name: names[uid], photo: photos[uid] || '', rank: i + 1 }));
    homeLbCacheTime = Date.now();

    el.style.display = '';
    renderHomeLb(homeLbCache);
  } catch (err) {
    console.error(err);
  }
}

function renderHomeLb(rows) {
  const el = document.getElementById('home-lb-card');
  if (!el) return;

  if (!rows) {
    el.innerHTML = `
      <div class="home-lb-head"><span class="home-lb-title">🏆 ליגת חברים</span></div>
      <div class="home-lb-empty">
        הוסף חברים כדי לראות איפה אתה ניצב!
        <button class="home-lb-add-btn" onclick="switchTab('friends')">הוסף חברים</button>
      </div>`;
    return;
  }

  const medals  = ['🥇','🥈','🥉'];
  const SHOW    = 5;

  const rowHtml = (row, i) => {
    const isMe     = row.uid === currentUser?.uid;
    const rankHtml = i < 3
      ? medals[i]
      : `<span class="home-lb-rank-num">${i + 1}</span>`;
    const nameHtml = isMe
      ? `<span style="color:var(--primary);font-weight:800">${escHtml(row.name)}</span><span class="home-lb-me">אתה</span>`
      : escHtml(row.name);
    const onclick  = isMe ? `switchTab('profile')` : `openFriendProfile('${row.uid}')`;
    return `<div class="home-lb-row${isMe ? ' me' : ''}" onclick="${onclick}">
      <div class="home-lb-rank">${rankHtml}</div>
      ${avatarHtml(row.name, row.photo, 'home-lb-avatar')}
      <div class="home-lb-name">${nameHtml}</div>
      <div class="home-lb-cnt-col"><div class="home-lb-cnt">${row.cnt}</div><div class="home-lb-unit">אימונים</div></div>
    </div>`;
  };

  const visible   = homeLbExpanded ? rows : rows.slice(0, SHOW);
  const hiddenCnt = rows.length - SHOW;

  el.innerHTML = `
    <div class="home-lb-head">
      <span class="home-lb-title">🏆 ליגת חברים</span>
      <span class="home-lb-week">השבוע</span>
    </div>
    ${visible.map((r, i) => rowHtml(r, i)).join('')}
    ${!homeLbExpanded && hiddenCnt > 0
      ? `<button class="home-lb-expand" onclick="expandHomeLb()">הצג עוד (${hiddenCnt})</button>`
      : ''}`;
}

function expandHomeLb() {
  homeLbExpanded = true;
  renderHomeLb(homeLbCache);
}

// ══ PROGRESS CARD ════════════════════════════════════════════════════════
function setPeriod(period) {
  chartPeriod = period;
  renderProgressSection();
}

function renderProgressSection() {
  const card = document.getElementById('progress-card');
  if (!card || !currentUser) return;

  const goal      = userProfile?.goal || 3;
  const now       = new Date();
  const todayStr  = localDateStr(now);
  const weekdayN  = now.getDay();                                   // 0=Sun

  // Weekly: Sun–Sat (Israeli week)
  const sunDate   = new Date(now);
  sunDate.setDate(now.getDate() - weekdayN);
  sunDate.setHours(0, 0, 0, 0);
  const sunStr    = localDateStr(sunDate);
  const satStr    = localDateStr(new Date(sunDate.getTime() + 6 * 86400000));
  const DAY_LABELS = ['א','ב','ג','ד','ה','ו','ש'];
  const weekDays   = Array.from({ length: 7 }, (_, i) => {
    const d       = new Date(sunDate.getTime() + i * 86400000);
    const dateStr = localDateStr(d);
    return {
      dateStr,
      dayName:    DAY_LABELS[i],
      hasWorkout: cachedUserDocs.some(doc => doc.data().date === dateStr),
      isFuture:   dateStr > todayStr,
      isToday:    dateStr === todayStr,
    };
  });
  // Count individual workout documents (not unique days) for the weekly total
  const weekCount = cachedUserDocs.filter(d => {
    const dt = d.data().date;
    return dt >= sunStr && dt <= satStr && dt <= todayStr;
  }).length;

  // Monthly
  const mStart     = localDateStr(new Date(now.getFullYear(), now.getMonth(), 1));
  const mEnd       = localDateStr(new Date(now.getFullYear(), now.getMonth() + 1, 0));
  const monthCount = cachedUserDocs.filter(d => { const dt = d.data().date; return dt >= mStart && dt <= mEnd; }).length;
  const daysInMon  = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  const monthGoal  = goal * Math.ceil(daysInMon / 7);

  // Weeks of month (Sun-aligned)
  const monthWeeks = [];
  const mStartDate = new Date(mStart + 'T00:00:00');
  const ws0 = new Date(mStartDate);
  ws0.setDate(mStartDate.getDate() - mStartDate.getDay());
  const mEndDate = new Date(mEnd + 'T23:59:59');
  for (let wk = 1, ws = ws0; ws <= mEndDate && wk <= 6; wk++, ws.setDate(ws.getDate() + 7)) {
    const wsStr = localDateStr(ws);
    const weStr = localDateStr(new Date(ws.getTime() + 6 * 86400000));
    const cnt   = cachedUserDocs.filter(d => { const dt = d.data().date; return dt >= wsStr && dt <= weStr; }).length;
    monthWeeks.push({ label: `ש${wk}`, count: cnt,
      isCurrent: todayStr >= wsStr && todayStr <= weStr,
      isFuture:  wsStr > todayStr });
  }

  const goalMet   = weekCount >= goal;

  const isWeekly     = chartPeriod === 'weekly';
  const displayCount = isWeekly ? weekCount : monthCount;
  const displayGoal  = isWeekly ? goal : monthGoal;
  const fmtDM = str => { const [,m,d] = str.split('-'); return `${+d}.${+m}`; };
  const MONTH_HE = ['ינואר','פברואר','מרץ','אפריל','מאי','יוני','יולי','אוגוסט','ספטמבר','אוקטובר','נובמבר','דצמבר'];
  const periodLabel  = isWeekly
    ? `אימונים השבוע &nbsp;·&nbsp; ${fmtDM(sunStr)}&nbsp;–&nbsp;${fmtDM(satStr)}`
    : `אימונים בחודש ${MONTH_HE[now.getMonth()]}`;
  const maxMonthVal  = Math.max(...monthWeeks.map(w => w.count), goal, 1);

  card.innerHTML = `
    <div class="pc-count-row">
      <span class="pc-count-x${goalMet ? ' goal-met' : ''}">${displayCount}</span>
      <span class="pc-count-sep">/</span>
      <span class="pc-count-y">${displayGoal}</span>
    </div>
    <div class="pc-count-label">${periodLabel}${!userProfile?.goal ? ' <span class="pc-set-goal-link" onclick="switchTab(\'profile\')">הגדר יעד</span>' : ''}</div>
    <div class="pc-tabs">
      <button class="pc-tab${isWeekly ? ' active' : ''}" onclick="setPeriod('weekly')">שבועי</button>
      <button class="pc-tab${!isWeekly ? ' active' : ''}" onclick="setPeriod('monthly')">חודשי</button>
    </div>
    <div class="pc-chart-wrap">
      <div class="pc-bars-outer">
        ${isWeekly ? _renderWeekBars(weekDays) : _renderMonthBars(monthWeeks, maxMonthVal)}
      </div>
    </div>`;

  requestAnimationFrame(() => {
    card.querySelectorAll('.pc-bar-fill').forEach((b, i) => {
      b.style.animationDelay = `${i * 45}ms`;
      b.classList.add('pc-bar-animate');
    });
  });

  // Avatar ring + badge + confetti
  updateAvatarRing(Math.min(100, Math.round((weekCount / goal) * 100)));
  const badge = document.getElementById('week-count-badge');
  if (badge) badge.textContent = `${weekCount} 🏋️`;
  if (goalMet && !goalWasHit) { goalWasHit = true; setTimeout(launchConfetti, 400); }
  else if (!goalMet) goalWasHit = false;
}

function _renderWeekBars(days) {
  return days.map(d => {
    const cls = d.hasWorkout ? 'filled' : d.isFuture ? 'future' : 'empty';
    return `<div class="pc-bar-col"><div class="pc-bar-cell"><div class="pc-bar-fill ${cls}"></div></div><div class="pc-bar-label${d.isToday ? ' today' : ''}">${d.dayName}</div></div>`;
  }).join('');
}

function _renderMonthBars(weeks, maxVal) {
  const BH = 66;
  return weeks.map(w => {
    const ht  = w.isFuture ? BH : w.count === 0 ? 18 : Math.max(14, Math.round(w.count / maxVal * BH));
    const cls = w.isFuture ? 'm-future' : w.count > 0 ? 'm-filled' : 'm-empty';
    return `<div class="pc-bar-col"><div class="pc-bar-cell">${!w.isFuture && w.count > 0 ? `<div class="pc-bar-count">${w.count}</div>` : ''}<div class="pc-bar-fill ${cls}" style="height:${ht}px"></div></div><div class="pc-bar-label${w.isCurrent ? ' today' : ''}">${w.label}</div></div>`;
  }).join('');
}

// ══ ACTIVITY FEED ════════════════════════════════════════════════════════
function syncFeedHeight() {
  const el   = document.getElementById('activity-feed');
  const wrap = el?.parentElement;
  if (!el || !wrap) return;
  const firstItem = el.querySelector('.feed-item');
  if (!firstItem) { el.style.maxHeight = ''; wrap.classList.remove('has-overflow'); return; }
  requestAnimationFrame(() => {
    const itemH = firstItem.offsetHeight;
    const gap   = parseInt(getComputedStyle(firstItem).marginBottom) || 6;
    // +4 accounts for the container's padding-bottom so item 2 isn't clipped
    el.style.maxHeight = (itemH * 2 + gap + 4) + 'px';
    wrap.classList.toggle('has-overflow', feedAllDocs.length > 2);
  });
}

async function loadActivityFeed(reset = true) {
  const el = document.getElementById('activity-feed');
  if (reset) {
    feedAllDocs = []; feedOffset = 0;
    if (feedObserver) { feedObserver.disconnect(); feedObserver = null; }
    Object.values(commentListeners).forEach(u => u());
    Object.keys(commentListeners).forEach(k => delete commentListeners[k]);
    el.innerHTML = skeletonFeed(3);
  }
  try {
    const friendIds = userProfile.friendIds || [];
    const allUids   = [currentUser.uid, ...friendIds].slice(0, 10);
    const snaps     = await Promise.all(
      allUids.map(uid => db.collection('workouts').where('userId', '==', uid).get())
    );
    feedAllDocs = snaps
      .flatMap(s => s.docs)
      .sort((a, b) => {
        const ta = a.data().createdAt?.toMillis?.() || new Date(a.data().date + 'T12:00:00').getTime();
        const tb = b.data().createdAt?.toMillis?.() || new Date(b.data().date + 'T12:00:00').getTime();
        return tb - ta;
      });
    if (!feedAllDocs.length) {
      el.innerHTML = `<div class="empty-state"><div class="empty-icon">👥</div>אין פעילות עדיין<br><small style="font-size:13px;color:var(--text-3)">הוסף חברים כדי לראות את הפעילות שלהם</small></div>`;
      return;
    }
    el.innerHTML = '';
    renderFeedPage();
    syncFeedHeight();
  } catch (err) {
    el.innerHTML = '<div class="empty-state">שגיאה בטעינת הפעילות</div>';
    console.error(err);
  }
}

function renderFeedPage() {
  const el    = document.getElementById('activity-feed');
  const slice = feedAllDocs.slice(feedOffset, feedOffset + FEED_PAGE);
  if (!slice.length) return;
  const wids = slice.map(d => d.id);
  el.insertAdjacentHTML('beforeend', slice.map((doc, i) => renderFeedItem(doc, feedOffset + i)).join(''));
  feedOffset += FEED_PAGE;
  loadCommentCounts(wids);
  wids.forEach(id => subscribeComments(id));
  initRipples();
  // Sentinel for next page
  const oldSentinel = el.querySelector('.feed-sentinel');
  if (oldSentinel) oldSentinel.remove();
  if (feedOffset < feedAllDocs.length) {
    const sentinel = document.createElement('div');
    sentinel.className = 'feed-sentinel';
    sentinel.style.cssText = 'height:1px;margin:4px 0';
    el.appendChild(sentinel);
    if (feedObserver) feedObserver.disconnect();
    feedObserver = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        feedObserver.disconnect(); feedObserver = null;
        renderFeedPage();
      }
    }, { root: el, rootMargin: '120px' });
    feedObserver.observe(sentinel);
  }
}

function fmtDuration(mins) {
  if (!mins) return '';
  const h = Math.floor(mins / 60), m = mins % 60;
  if (h && m) return `${h}ש׳ ${m}ד׳`;
  if (h)      return `${h} שעות`;
  return `${m} דק׳`;
}

function renderFeedItem(doc, idx = 0) {
  const w        = doc.data();
  const wid      = doc.id;
  const isMe     = w.userId === currentUser?.uid;
  const likedBy  = w.likedBy || [];
  const liked    = likedBy.includes(currentUser?.uid);
  const tsStr    = w.createdAt ? timeAgo(w.createdAt) : fmtDate(w.date);
  const thumb = w.photoUrl
    ? `<div class="feed-thumb" onclick="event.stopPropagation();viewPhoto('${escHtml(w.photoUrl)}')" data-photo="${escHtml(w.photoUrl)}"><img src="${escHtml(w.photoUrl)}" alt="אימון" loading="lazy"></div>`
    : `<div class="feed-thumb feed-thumb--emoji">${w.typeEmoji || '💪'}</div>`;
  const midLine = `${w.typeEmoji || '💪'} ${escHtml(w.typeName || w.type)}${w.duration ? ` · ⏱ ${fmtDuration(w.duration)}` : ''}`;
  return `<div class="feed-item" style="animation-delay:${idx * 50}ms">
    <div class="feed-row">
      <div class="feed-info">
        <div class="feed-name-row">
          <span class="feed-username">${escHtml(w.userName || 'משתמש')}</span>
          ${isMe ? '<span class="feed-me-tag">אני</span>' : ''}
          ${isMe ? `<span class="feed-edit-btns">
            <button class="feed-icon-btn" onclick="event.stopPropagation();editWorkout('${wid}')"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></button>
            <button class="feed-icon-btn" onclick="event.stopPropagation();confirmDeleteWorkout('${wid}')"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg></button>
          </span>` : ''}
        </div>
        <div class="feed-mid-line">${midLine}</div>
        <div class="feed-bot-line">
          <span class="feed-date">${tsStr}</span>
          <button class="like-btn${liked ? ' liked' : ''}" id="like-btn-${wid}" data-owner="${escHtml(w.userId || '')}" onclick="event.stopPropagation();toggleLike('${wid}', this)">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
            <span id="like-count-${wid}">${likedBy.length}</span>
          </button>
          <button class="feed-comment-btn" id="comment-toggle-${wid}" onclick="event.stopPropagation();toggleComments('${wid}')">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            <span id="comment-count-${wid}">···</span>
          </button>
        </div>
      </div>
      ${thumb}
    </div>
    <div class="comments-section hidden" id="comments-section-${wid}">
      <div id="comments-list-${wid}"></div>
    </div>
    <div class="comment-input-row">
      <input class="form-input" id="comment-input-${wid}" data-owner="${escHtml(w.userId || '')}" placeholder="כתוב תגובה..." style="flex:1">
      <button class="btn-sm" onclick="addComment('${wid}')">שלח</button>
    </div>
  </div>`;
}

function viewPhoto(url) {
  document.getElementById('photo-viewer-img').src = url;
  document.getElementById('photo-viewer').classList.remove('hidden');
}

// ══ STORIES ══════════════════════════════════════════════════════════════
const seenStories = new Set(JSON.parse(localStorage.getItem('seenStories') || '[]'));
let storyDocs = [], storyIndex = 0, storyTimer = null;
let storyPaused = false, storyRemaining = 10000, storyStartTime = 0;
let storyPointerStartX = 0, storyPointerStartY = 0, storyLongPressTimer = null;
let storyGestureDir = null; // null | 'up' | 'down'  — locked for the lifetime of one touch

async function loadStories() {
  const el = document.getElementById('stories-scroll');
  if (!el) return;
  try {
    const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const friendIds = userProfile.friendIds || [];
    const allUids   = [currentUser.uid, ...friendIds].slice(0, 10);
    const snaps = await Promise.all(
      allUids.map(uid => db.collection('workouts').where('userId', '==', uid).get())
    );
    storyDocs = snaps.flatMap(s => s.docs).filter(doc => {
      const d = doc.data();
      if (!d.photoUrl) return false;
      const ts = d.createdAt?.toMillis?.() || new Date(d.date + 'T12:00:00').getTime();
      return ts >= cutoff.getTime();
    }).sort((a, b) => {
      const ta = a.data().createdAt?.toMillis?.() || 0;
      const tb = b.data().createdAt?.toMillis?.() || 0;
      return tb - ta;
    });
    const bar = document.getElementById('stories-bar');
    if (!storyDocs.length) { if (bar) bar.style.display = 'none'; return; }
    if (bar) bar.style.display = '';
    el.innerHTML = storyDocs.map((doc, i) => {
      const w    = doc.data();
      const seen = seenStories.has(doc.id);
      const ts   = w.createdAt || null;
      const ago  = storyTimeAgoShort(ts);
      return `<div class="story-item" onclick="openStory(${i})">
        <div class="story-ring${seen ? ' seen' : ''}">
          ${w.userPhotoUrl
            ? `<img class="story-avatar-img" src="${escHtml(w.userPhotoUrl)}" alt="">`
            : `<div class="story-avatar-img" style="background:var(--grad);display:flex;align-items:center;justify-content:center;font-size:18px;font-weight:800;color:#fff">${escHtml(avatarOf(w.userName || '?'))}</div>`}
        </div>
        <div class="story-name">${escHtml((w.userName || '?').split(' ')[0])}</div>
        ${ago ? `<div class="story-time-ago">${ago}</div>` : ''}
      </div>`;
    }).join('');
  } catch (err) { console.error('Stories:', err); }
}

function openStory(idx) {
  storyIndex = idx;
  document.getElementById('story-overlay').classList.remove('hidden');
  showStoryAt(idx);
}

function showStoryAt(idx) {
  if (idx < 0) { closeStory(); return; }
  if (idx >= storyDocs.length) { closeStory(); return; }
  storyIndex   = idx;
  storyPaused  = false;
  storyRemaining = 10000;

  const doc = storyDocs[idx];
  const w   = doc.data();
  const isOwn = w.userId === currentUser.uid;

  seenStories.add(doc.id);
  try { localStorage.setItem('seenStories', JSON.stringify([...seenStories])); } catch {}

  document.getElementById('story-img').src = w.photoUrl;

  document.getElementById('story-user-info').innerHTML = `
    ${avatarHtml(w.userName || '?', w.userPhotoUrl || '', 'lb-avatar', '36')}
    <div style="margin-right:8px">
      <div class="story-user-name">${escHtml(w.userName || 'משתמש')}${w.userUsername ? ` <span style="font-size:11px;font-weight:500;opacity:.7">@${escHtml(w.userUsername)}</span>` : ''}</div>
      <div class="story-time">${w.createdAt ? timeAgo(w.createdAt) : fmtDate(w.date)}</div>
    </div>`;

  const cap   = document.getElementById('story-caption-bar');
  const pills = (w.typeEmoji || w.notes || w.mood) ? `
    <span class="story-pill">${w.typeEmoji || '💪'} ${escHtml(w.typeName || w.type)}</span>
    ${w.mood  ? `<div class="story-caption-text" style="margin-top:6px">💬 ${escHtml(w.mood)}</div>`  : ''}
    ${w.notes ? `<div class="story-caption-text" style="margin-top:4px">${escHtml(w.notes)}</div>` : ''}` : '';
  cap.innerHTML = pills + (isOwn
    ? `<div class="story-views-row" id="story-views-row" onclick="openStoryViewers()">
         <span>👁 <span id="story-views-count">0</span> צפיות</span>
         <span class="story-swipe-hint">↑ החלק למעלה</span>
       </div>`
    : '');

  const replyBar = document.getElementById('story-reply-bar');
  if (replyBar) {
    replyBar.classList.toggle('hidden', isOwn);
    document.getElementById('story-reply-input').value = '';
  }

  // Restart CSS animation
  const fill = document.getElementById('story-progress-fill');
  fill.style.animation = 'none';
  fill.offsetHeight;
  fill.style.animation = 'story-progress 10s linear forwards';

  if (storyTimer) clearTimeout(storyTimer);
  storyStartTime = Date.now();
  storyTimer = setTimeout(() => showStoryAt(storyIndex + 1), 10000);

  if (!isOwn) recordStoryView(doc.id);

  if (isOwn) {
    doc.ref.get().then(fresh => {
      const views = fresh.data().storyViews || {};
      const count = Array.isArray(views) ? views.length : Object.keys(views).length;
      const el = document.getElementById('story-views-count');
      if (el) el.textContent = count;
    }).catch(() => {});
  }
}

function pauseStory() {
  if (storyPaused) return;
  storyPaused    = true;
  storyRemaining = Math.max(0, storyRemaining - (Date.now() - storyStartTime));
  clearTimeout(storyTimer);
  storyTimer = null;
  const fill = document.getElementById('story-progress-fill');
  if (fill) fill.style.animationPlayState = 'paused';
}

function resumeStory() {
  if (!storyPaused) return;
  storyPaused    = false;
  storyStartTime = Date.now();
  const fill = document.getElementById('story-progress-fill');
  if (fill) fill.style.animationPlayState = 'running';
  storyTimer = setTimeout(() => showStoryAt(storyIndex + 1), storyRemaining);
}

function onStoryPointerDown(e) {
  storyPointerStartX = e.clientX;
  storyPointerStartY = e.clientY;
  storyGestureDir    = null;
  // Only skip long-press for buttons/inputs — still record position for swipe-down anywhere
  if (e.target.closest('.story-close, .story-reply-bar, .story-views-row')) return;
  storyLongPressTimer = setTimeout(() => {
    storyLongPressTimer = null;
    pauseStory();
  }, 180);
}

function onStoryPointerMove(e) {
  const dy_up   = storyPointerStartY - e.clientY;   // positive = finger moved up
  const dy_down = e.clientY - storyPointerStartY;   // positive = finger moved down
  const dx      = Math.abs(e.clientX - storyPointerStartX);

  // Direction not yet locked — detect it from first significant movement
  if (!storyGestureDir) {
    if (dy_up > 10 && dx < 60) {
      const w = storyDocs[storyIndex]?.data();
      if (w && w.userId === currentUser?.uid) {
        storyGestureDir = 'up';
      } else {
        // Not own story — no viewers to show; clear timer so it doesn't count as long-press
        clearTimeout(storyLongPressTimer); storyLongPressTimer = null;
        return;
      }
    } else if (dy_down > 10 && dx < 80) {
      storyGestureDir = 'down';
    } else {
      return; // tiny movement, keep waiting
    }
    clearTimeout(storyLongPressTimer); storyLongPressTimer = null;
    pauseStory();
    // falls through to direction handler below
  }

  if (storyGestureDir === 'up') {
    const sheet  = document.getElementById('story-viewers-sheet');
    const inner  = document.getElementById('story-viewers-inner');
    const sheetH = 0.6 * window.innerHeight;
    if (sheet.classList.contains('hidden')) {
      // First move: show panel off-screen and start loading data
      inner.style.transition = 'none';
      inner.style.transform  = `translateY(${sheetH}px)`;
      sheet.classList.remove('hidden');
      _loadViewersData(); // async — fills the list while user drags
    }
    // Panel follows the finger (clamped so it doesn't go above its natural position)
    inner.style.transform = `translateY(${Math.max(0, sheetH - dy_up)}px)`;
    return;
  }

  if (storyGestureDir === 'down') {
    const overlay  = document.getElementById('story-overlay');
    const progress = Math.min(dy_down / window.innerHeight, 1);
    overlay.style.transform = `translateY(${dy_down}px)`;
    overlay.style.opacity   = `${Math.max(0.2, 1 - progress * 1.5)}`;
  }
}

function onStoryPointerUp(e) {
  // ── Downward drag release ──
  if (storyGestureDir === 'down') {
    storyGestureDir  = null;
    const dy_down    = e.clientY - storyPointerStartY;
    const threshold  = Math.min(80, window.innerHeight * 0.3);
    const overlay    = document.getElementById('story-overlay');
    if (dy_down >= threshold) {
      overlay.style.transition = 'transform .25s ease, opacity .25s ease';
      overlay.style.transform  = `translateY(${window.innerHeight}px)`;
      overlay.style.opacity    = '0';
      setTimeout(() => closeStory(), 260);
    } else {
      overlay.style.transition = 'transform .2s ease, opacity .2s ease';
      overlay.style.transform  = '';
      overlay.style.opacity    = '';
      setTimeout(() => { overlay.style.transition = ''; }, 210);
      resumeStory();
    }
    return;
  }

  // ── Upward drag release ──
  if (storyGestureDir === 'up') {
    storyGestureDir  = null;
    const dy_up      = storyPointerStartY - e.clientY;
    const sheetH     = 0.6 * window.innerHeight;
    const sheet      = document.getElementById('story-viewers-sheet');
    const inner      = document.getElementById('story-viewers-inner');
    if (dy_up >= window.innerHeight * 0.25) {
      // Snap fully open
      inner.style.transition = 'transform .25s ease';
      inner.style.transform  = 'translateY(0)';
    } else {
      // Snap closed
      inner.style.transition = 'transform .2s ease';
      inner.style.transform  = `translateY(${sheetH}px)`;
      setTimeout(() => {
        sheet.classList.add('hidden');
        inner.style.transition = '';
        inner.style.transform  = '';
      }, 210);
      resumeStory();
    }
    return;
  }

  // ── Interactive controls — let them handle their own events ──
  if (e.target.closest('.story-close, .story-views-row, .story-top, .story-reply-bar')) {
    clearTimeout(storyLongPressTimer);
    storyLongPressTimer = null;
    return;
  }

  if (storyLongPressTimer) {
    // Short tap: LEFT = older story, RIGHT = newer story (restart if already at newest)
    clearTimeout(storyLongPressTimer);
    storyLongPressTimer = null;
    if (e.clientX < window.innerWidth / 2) {
      showStoryAt(storyIndex + 1);                                    // older
    } else {
      showStoryAt(storyIndex > 0 ? storyIndex - 1 : storyIndex);     // newer or restart
    }
  } else {
    if (storyPaused) resumeStory();
  }
}

function onStoryPointerCancel() {
  if (storyGestureDir === 'down') {
    const overlay = document.getElementById('story-overlay');
    overlay.style.transition = 'transform .2s ease, opacity .2s ease';
    overlay.style.transform  = '';
    overlay.style.opacity    = '';
    setTimeout(() => { overlay.style.transition = ''; }, 210);
  }
  if (storyGestureDir === 'up') {
    const sheet  = document.getElementById('story-viewers-sheet');
    const inner  = document.getElementById('story-viewers-inner');
    const sheetH = 0.6 * window.innerHeight;
    inner.style.transition = 'transform .2s ease';
    inner.style.transform  = `translateY(${sheetH}px)`;
    setTimeout(() => {
      sheet.classList.add('hidden');
      inner.style.transition = '';
      inner.style.transform  = '';
    }, 210);
  }
  storyGestureDir = null;
  clearTimeout(storyLongPressTimer);
  storyLongPressTimer = null;
  const sheet = document.getElementById('story-viewers-sheet');
  if (sheet && !sheet.classList.contains('hidden')) return;
  if (storyPaused) resumeStory();
}

async function recordStoryView(docId) {
  if (!currentUser) return;
  try {
    await db.collection('workouts').doc(docId).update({
      [`storyViews.${currentUser.uid}`]: {
        name:     userProfile?.name || currentUser.displayName || 'משתמש',
        viewedAt: firebase.firestore.Timestamp.now(),
      },
    });
  } catch (e) {}
}

// Called from the views-row click button — animated open from bottom
async function openStoryViewers() {
  pauseStory();
  if (storyIndex >= storyDocs.length) return;
  const w = storyDocs[storyIndex].data();
  if (w.userId !== currentUser.uid) return;

  const sheet  = document.getElementById('story-viewers-sheet');
  const inner  = document.getElementById('story-viewers-inner');
  const sheetH = 0.6 * window.innerHeight;

  inner.style.transition = 'none';
  inner.style.transform  = `translateY(${sheetH}px)`;
  sheet.classList.remove('hidden');
  // Double rAF so the browser paints the initial off-screen state before transitioning
  requestAnimationFrame(() => requestAnimationFrame(() => {
    inner.style.transition = 'transform .3s ease';
    inner.style.transform  = 'translateY(0)';
  }));

  await _loadViewersData();
}

// Loads viewer data and renders list — called from both click and swipe gesture
async function _loadViewersData() {
  const list = document.getElementById('story-viewers-list');
  if (!list) return;
  if (storyIndex >= storyDocs.length) return;
  const w = storyDocs[storyIndex].data();
  if (w.userId !== currentUser?.uid) return;
  list.innerHTML = '<div class="viewers-loading">טוען...</div>';
  try {
    const fresh   = await storyDocs[storyIndex].ref.get();
    const raw     = fresh.data().storyViews || {};
    const viewMap = Array.isArray(raw)
      ? raw.reduce((m, v) => { m[v.uid] = v; return m; }, {})
      : raw;

    const friendIds = userProfile.friendIds || [];
    if (!friendIds.length) {
      list.innerHTML = '<div class="viewers-empty">אין חברים עדיין</div>';
      return;
    }
    const friendDocs = await Promise.all(
      friendIds.map(uid => db.collection('users').doc(uid).get())
    );
    const friends = friendDocs.filter(d => d.exists).map(d => {
      const fd = d.data();
      return { uid: d.id, name: fd.name || fd.displayName || 'משתמש', photo: fd.photoUrl || '', view: viewMap[d.id] || null };
    });
    friends.sort((a, b) => {
      if (a.view && !b.view) return -1;
      if (!a.view && b.view) return 1;
      if (a.view && b.view) {
        return (b.view.viewedAt?.toMillis?.() || 0) - (a.view.viewedAt?.toMillis?.() || 0);
      }
      return 0;
    });
    list.innerHTML = friends.map(f => `
      <div class="viewers-item">
        ${avatarHtml(f.name, f.photo, 'lb-avatar', '44')}
        <div class="viewers-info">
          <div class="viewers-name">${escHtml(f.name)}</div>
          <div class="viewers-status${f.view ? '' : ' unseen'}">
            ${f.view ? (f.view.viewedAt ? timeAgo(f.view.viewedAt) : 'ראה') : 'טרם צפה'}
          </div>
        </div>
        ${f.view ? '<div class="viewers-check">✓</div>' : ''}
      </div>`).join('');
  } catch (err) {
    console.error('_loadViewersData:', err);
    list.innerHTML = '<div class="viewers-empty">שגיאה בטעינה</div>';
  }
}

function closeStoryViewers() {
  const sheet  = document.getElementById('story-viewers-sheet');
  const inner  = document.getElementById('story-viewers-inner');
  const sheetH = 0.6 * window.innerHeight;
  inner.style.transition = 'transform .25s ease';
  inner.style.transform  = `translateY(${sheetH}px)`;
  setTimeout(() => {
    sheet.classList.add('hidden');
    inner.style.transition = '';
    inner.style.transform  = '';
  }, 260);
  resumeStory();
}

function closeStory() {
  storyGestureDir = null;
  if (storyLongPressTimer) { clearTimeout(storyLongPressTimer); storyLongPressTimer = null; }
  if (storyTimer)          { clearTimeout(storyTimer); storyTimer = null; }
  storyPaused = false;
  const overlay = document.getElementById('story-overlay');
  overlay.style.transition = '';
  overlay.style.transform  = '';
  overlay.style.opacity    = '';
  overlay.classList.add('hidden');
  loadStories();
}

async function sendStoryReply() {
  const input = document.getElementById('story-reply-input');
  const msg   = input?.value.trim();
  if (!msg || !currentUser) return;
  const doc = storyDocs[storyIndex];
  if (!doc) return;
  const w = doc.data();
  input.value = '';
  input.blur();
  resumeStory();
  toast('תגובה נשלחה ✓', 'success');
  try {
    await db.collection('workouts').doc(doc.id).collection('replies').add({
      fromUserId:     currentUser.uid,
      fromUserName:   userProfile?.name || currentUser.displayName || 'משתמש',
      fromUserAvatar: userProfile?.photoUrl || currentUser.photoURL || '',
      message:        msg,
      timestamp:      firebase.firestore.FieldValue.serverTimestamp(),
      read:           false,
    });
    if (isNotifEnabled('storyReply')) {
      await pushNotification(w.userId, {
        type:  'storyReply',
        title: `${userProfile?.name || 'מישהו'} הגיב/ה על הסטורי שלך`,
        body:  msg,
        icon:  '↩️',
        data:  { workoutId: doc.id },
      });
    }
  } catch (err) { console.error('sendStoryReply:', err); }
}

function onStoryReplyBlur() {
  const sheet = document.getElementById('story-viewers-sheet');
  if (sheet && !sheet.classList.contains('hidden')) return;
  resumeStory();
}

async function loadCommentCounts(wids) {
  const results = await Promise.all(
    wids.map(wid =>
      db.collection('comments').where('workoutId', '==', wid).get()
        .then(s => ({ wid, count: s.size }))
        .catch(() => ({ wid, count: 0 }))
    )
  );
  results.forEach(({ wid, count }) => {
    const el = document.getElementById(`comment-count-${wid}`);
    if (el) el.textContent = count ? `${count} תגובות` : 'הוסף תגובה';
  });
}

async function toggleLike(wid, btn) {
  if (!currentUser) return;
  const liked    = btn.classList.contains('liked');
  const countEl  = document.getElementById(`like-count-${wid}`);
  const delta    = liked ? -1 : 1;
  // Optimistic update
  btn.classList.toggle('liked', !liked);
  btn.style.animation = 'none'; btn.offsetHeight;
  btn.style.animation = 'likeHeartbeat .4s ease';
  if (countEl) countEl.textContent = Math.max(0, (parseInt(countEl.textContent) || 0) + delta);
  try {
    await db.collection('workouts').doc(wid).update({
      likedBy: liked
        ? firebase.firestore.FieldValue.arrayRemove(currentUser.uid)
        : firebase.firestore.FieldValue.arrayUnion(currentUser.uid),
    });
    if (!liked) {
      const ownerId = btn.dataset.owner;
      if (ownerId && ownerId !== currentUser.uid) {
        pushNotification(ownerId, {
          type: 'friendLikedMyWorkout',
          title: 'קיבלת לייק! 💪',
          body: `${userProfile.name || 'מישהו'} אהב את האימון שלך`,
          icon: '💪',
        });
      }
    }
  } catch {
    btn.classList.toggle('liked', liked);
    if (countEl) countEl.textContent = Math.max(0, (parseInt(countEl.textContent) || 0) - delta);
    toast('שגיאה', 'error');
  }
}

function toggleComments(wid) {
  const section = document.getElementById(`comments-section-${wid}`);
  const btn     = document.getElementById(`comment-toggle-${wid}`);
  if (!section.classList.contains('hidden')) {
    section.classList.add('hidden'); btn.classList.remove('active');
    if (commentListeners[wid]) { commentListeners[wid](); delete commentListeners[wid]; }
    return;
  }
  section.classList.remove('hidden'); btn.classList.add('active');
  subscribeComments(wid);
  initRipples();
}

function subscribeComments(wid) {
  if (commentListeners[wid]) return;
  const listEl = document.getElementById(`comments-list-${wid}`);
  if (!listEl) return;
  listEl.innerHTML = '<div style="padding:8px 0;color:var(--text-3);font-size:12px;text-align:center">טוען...</div>';
  const unsub = db.collection('comments')
    .where('workoutId', '==', wid)
    .onSnapshot(snap => {
      const docs = snap.docs.sort((a, b) =>
        (a.data().createdAt?.toMillis?.() || 0) - (b.data().createdAt?.toMillis?.() || 0));
      const countEl = document.getElementById(`comment-count-${wid}`);
      if (countEl) countEl.textContent = docs.length ? `${docs.length} תגובות` : 'הוסף תגובה';
      if (docs.length) {
        const section = document.getElementById(`comments-section-${wid}`);
        const btn     = document.getElementById(`comment-toggle-${wid}`);
        if (section) { section.classList.remove('hidden'); btn?.classList.add('active'); }
      }
      if (!docs.length) {
        listEl.innerHTML = '<div style="padding:4px 0;color:var(--text-3);font-size:13px">אין תגובות עדיין</div>';
        return;
      }
      listEl.innerHTML = docs.map(doc => {
        const c = doc.data();
        return `<div class="comment-item">
          ${avatarHtml(c.userName || '?', c.userPhotoUrl || '', 'comment-avatar')}
          <div class="comment-body">
            <div class="comment-author">${escHtml(c.userName || 'משתמש')}${c.userUsername ? ` <span style="color:var(--text-3);font-weight:500;font-size:11px">@${escHtml(c.userUsername)}</span>` : ''}</div>
            <div class="comment-text">${escHtml(c.text)}</div>
          </div>
        </div>`;
      }).join('');
    }, err => console.error('Comments listener:', err));
  commentListeners[wid] = unsub;
}

async function addComment(wid) {
  const input = document.getElementById(`comment-input-${wid}`);
  const text  = input?.value.trim();
  if (!text) return;
  input.value = '';
  try {
    await db.collection('comments').add({
      workoutId: wid, userId: currentUser.uid,
      userName: userProfile.name || currentUser.displayName || '',
      userUsername: userProfile.username || '',
      userPhotoUrl: userProfile.photoUrl || '',
      text,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    const ownerId = input?.dataset.owner;
    if (ownerId && ownerId !== currentUser.uid) {
      pushNotification(ownerId, {
        type: 'friendCommentedMyWorkout',
        title: 'תגובה חדשה על האימון שלך 💬',
        body: `${userProfile.name || 'מישהו'}: ${text.slice(0, 60)}`,
        icon: '💬',
      });
    }
  } catch (err) {
    toast('שגיאה בשליחת התגובה', 'error'); input.value = text;
  }
}

// ══ REMINDER BANNER ══════════════════════════════════════════════════════
function checkReminder(allDocs) {
  if (reminderDismissed) return;
  const banner = document.getElementById('reminder-banner');
  if (!allDocs.length) {
    document.getElementById('reminder-text').textContent = 'עדיין לא התאמנת! יאלה! 💪';
    banner.classList.remove('hidden'); return;
  }
  const lastDate = new Date(allDocs[0].data().date + 'T12:00:00');
  const today    = new Date(); today.setHours(0, 0, 0, 0);
  const diff     = Math.floor((today - lastDate) / 86400000);
  if (diff >= 2) {
    document.getElementById('reminder-text').textContent = `לא התאמנת ${diff} ימים — יאלה! 💪`;
    banner.classList.remove('hidden');
    if (!_noWorkoutNotifSent && isNotifEnabled('noWorkoutTwoDays')) {
      _noWorkoutNotifSent = true;
      pushNotification(currentUser.uid, {
        type: 'noWorkoutTwoDays',
        title: 'הגיע הזמן להתאמן! 💪',
        body: `לא התאמנת כבר ${diff} ימים`,
        icon: '💪',
      });
    }
  } else {
    banner.classList.add('hidden');
  }
}

function dismissReminder() {
  reminderDismissed = true;
  document.getElementById('reminder-banner').classList.add('hidden');
}

// ══ LEADERBOARD ══════════════════════════════════════════════════════════
async function setLeaderboardPeriod(period) {
  leaderboardPeriod = period;
  document.getElementById('period-weekly').classList.toggle('active', period === 'weekly');
  document.getElementById('period-monthly').classList.toggle('active', period === 'monthly');
  await loadLeaderboard();
}

async function loadLeaderboard() {
  const el = document.getElementById('leaderboard-list');
  el.innerHTML = skeletonLeaderboard(4);
  try {
    let snap;
    if (leaderboardPeriod === 'weekly') {
      const wStart = weekKey();
      const wEnd   = localDateStr(new Date(new Date(wStart + 'T00:00:00').getTime() + 6 * 86400000));
      snap = await db.collection('workouts').where('date', '>=', wStart).where('date', '<=', wEnd).get();
    } else {
      const now    = new Date();
      const mStart = localDateStr(new Date(now.getFullYear(), now.getMonth(), 1));
      const mEnd   = localDateStr(new Date(now.getFullYear(), now.getMonth() + 1, 0));
      snap = await db.collection('workouts').where('date', '>=', mStart).where('date', '<=', mEnd).get();
    }
    const counts = {}, names = {}, photoUrls = {};
    snap.docs.forEach(doc => {
      const w = doc.data();
      counts[w.userId] = (counts[w.userId] || 0) + 1;
      if (!names[w.userId])     names[w.userId]     = w.userName || 'משתמש';
      if (!photoUrls[w.userId] && w.userPhotoUrl) photoUrls[w.userId] = w.userPhotoUrl;
    });
    const myGroup = new Set([currentUser.uid, ...(userProfile.friendIds || [])]);
    const sorted  = Object.entries(counts)
      .filter(([uid]) => myGroup.has(uid))
      .sort((a, b) => b[1] - a[1]);
    renderLeaderboard(sorted, names, photoUrls);
  } catch (err) {
    el.innerHTML = '<div class="empty-state">שגיאה בטעינת הליגה</div>';
    console.error(err);
  }
}

function renderLeaderboard(sorted, names, photoUrls = {}) {
  const el = document.getElementById('leaderboard-list');
  if (!sorted.length) {
    el.innerHTML = `<div class="empty-state"><div class="empty-icon">🏆</div>אין אימונים בתקופה זו<br><small style="font-size:13px">הוסף חברים לליגה</small></div>`;
    return;
  }
  const max    = sorted[0][1];
  const medals = ['🥇', '🥈', '🥉'];
  el.innerHTML = sorted.map(([uid, cnt], i) => {
    const isMe = uid === currentUser?.uid;
    const name = names[uid];
    const pct  = Math.round((cnt / max) * 100);
    const rank = i < 3 ? medals[i] : `<span class="lb-rank-num">${i + 1}</span>`;
    return `<div class="lb-row${isMe ? ' me' : ''}" style="animation-delay:${i * 60}ms">
      <div class="lb-rank">${rank}</div>
      ${avatarHtml(name, photoUrls[uid] || '')}
      <div class="lb-info">
        <div class="lb-name">${escHtml(name)}${isMe ? ' <span class="lb-me-tag">אני</span>' : ''}</div>
        <div class="lb-prog"><div class="lb-prog-fill" style="width:0%" data-target="${pct}"></div></div>
      </div>
      <div style="text-align:center">
        <div class="lb-count">${cnt}</div>
        <div class="lb-count-label">אימונים</div>
      </div>
    </div>`;
  }).join('');
  // Animate progress bars after paint
  requestAnimationFrame(() => {
    document.querySelectorAll('.lb-prog-fill[data-target]').forEach(bar => {
      bar.style.width = bar.dataset.target + '%';
      bar.removeAttribute('data-target');
    });
  });
}

// ══ COLLAPSIBLE NOTIF SECTION ════════════════════════════════════════════
function toggleNotifSection(btn) {
  const panel   = document.getElementById('notif-section-panel');
  const chevron = btn.querySelector('.chevron-icon');
  const isOpen  = panel.style.maxHeight && panel.style.maxHeight !== '0px';
  if (isOpen) {
    panel.style.maxHeight = '0';
    chevron.style.transform = '';
  } else {
    panel.style.maxHeight = panel.scrollHeight + 'px';
    chevron.style.transform = 'rotate(180deg)';
  }
}

// ══ FRIENDS ══════════════════════════════════════════════════════════════
async function autoFriendNewUser(newUid) {
  try {
    const snap = await db.collection('users').get();
    const others = snap.docs.map(d => d.id).filter(id => id !== newUid);
    if (!others.length) return;
    const FV = firebase.firestore.FieldValue;
    const batch = db.batch();
    others.forEach(uid =>
      batch.update(db.collection('users').doc(uid), { friendIds: FV.arrayUnion(newUid) })
    );
    batch.update(db.collection('users').doc(newUid), { friendIds: others });
    await batch.commit();
  } catch (e) { console.warn('autoFriendNewUser failed', e); }
}

async function migrateAllUsersToFriends() {
  const migRef = db.collection('migrations').doc('globalFriendsMigration');
  try {
    const migDoc = await migRef.get();
    if (migDoc.exists && migDoc.data()?.completed) {
      // Migration already ran globally — still sync in-memory profile from Firestore
      const myDoc = await db.collection('users').doc(currentUser.uid).get();
      if (myDoc.exists) userProfile.friendIds = myDoc.data().friendIds || [];
      return;
    }
  } catch { /* rules not yet deployed or network error — fall through */ }

  try {
    const snap     = await db.collection('users').get();
    const allUids  = snap.docs.map(d => d.id);
    const total    = allUids.length;
    if (total < 2) return;

    console.log(`Starting global friends migration for ${total} users...`);
    const CHUNK = 400;
    for (let i = 0; i < allUids.length; i += CHUNK) {
      const batch = db.batch();
      allUids.slice(i, i + CHUNK).forEach((uid, j) => {
        console.log(`Migrating user ${i + j + 1} of ${total}...`);
        batch.update(db.collection('users').doc(uid),
          { friendIds: allUids.filter(id => id !== uid) });
      });
      await batch.commit();
    }

    await migRef.set({
      completed:    true,
      completedAt:  firebase.firestore.FieldValue.serverTimestamp(),
      usersCount:   total,
    });

    userProfile.friendIds = allUids.filter(id => id !== currentUser.uid);
    console.log(`Migration complete: ${total} users are now all friends.`);
  } catch (e) { console.warn('migrateAllUsersToFriends failed', e); }
}

async function loadFriendsView() {
  document.getElementById('friend-requests-list').innerHTML = skeletonList(2);
  document.getElementById('friends-list').innerHTML         = skeletonList(2);
  loadFriendRequests();
  loadFriendsList();
}

async function sendFriendRequest() {
  const input = document.getElementById('friend-email-input');
  const errEl = document.getElementById('friend-search-err');
  const email = input.value.trim().toLowerCase();
  errEl.textContent = '';
  if (!email) return;
  if (email === currentUser.email?.toLowerCase()) { errEl.textContent = 'לא ניתן להוסיף את עצמך'; return; }
  try {
    const usersSnap = await db.collection('users').where('email', '==', email).get();
    if (usersSnap.empty) { errEl.textContent = 'משתמש לא נמצא'; return; }
    const targetDoc  = usersSnap.docs[0];
    const targetUid  = targetDoc.id;
    const targetData = targetDoc.data();
    if ((userProfile.friendIds || []).includes(targetUid)) { errEl.textContent = 'כבר חברים!'; return; }
    const existing = await db.collection('friendRequests').where('fromUid', '==', currentUser.uid).get();
    if (existing.docs.some(d => d.data().toUid === targetUid && d.data().status === 'pending')) {
      errEl.textContent = 'בקשה כבר נשלחה'; return;
    }
    await db.collection('friendRequests').add({
      fromUid: currentUser.uid, fromName: currentUser.displayName || '',
      fromEmail: currentUser.email || '',
      fromPhotoUrl: userProfile.photoUrl || '',
      toUid: targetUid, toName: targetData.name || '', toEmail: email,
      toPhotoUrl: targetData.photoUrl || '',
      status: 'pending',
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    input.value = '';
    toast(`בקשת חברות נשלחה ל-${targetData.name || email} 👋`, 'success');
    loadFriendsView();
  } catch (err) { errEl.textContent = 'שגיאה, נסה שוב'; console.error(err); }
}

let _friendSearchTimer = null;

function onFriendSearchInput(val) {
  clearTimeout(_friendSearchTimer);
  const results = document.getElementById('friend-search-results');
  if (!val.trim()) { results.innerHTML = ''; return; }
  _friendSearchTimer = setTimeout(() => searchFriendsByQuery(val.trim()), 300);
}

async function searchFriendsByQuery(q) {
  const results = document.getElementById('friend-search-results');
  results.innerHTML = '<div style="color:var(--text-3);font-size:13px;padding:8px 0">מחפש...</div>';
  try {
    let snap;
    if (q.includes('@')) {
      snap = await db.collection('users').where('email', '==', q.toLowerCase()).get();
    } else {
      snap = await db.collection('users')
        .where('name', '>=', q)
        .where('name', '<', q + '')
        .get();
    }
    const docs = snap.docs.filter(d => d.id !== currentUser.uid);
    if (!docs.length) {
      results.innerHTML = '<div style="color:var(--text-3);font-size:13px;padding:8px 0">לא נמצאו משתמשים</div>';
      return;
    }
    results.innerHTML = docs.map(d => {
      const u = d.data();
      return `<div class="friend-req-item">
        ${avatarHtml(u.name || '?', u.photoUrl || '', 'lb-avatar', '38')}
        <div class="friend-info">
          <div class="friend-name">${escHtml(u.name || 'משתמש')}</div>
          ${u.username ? `<div class="friend-email">@${escHtml(u.username)}</div>` : ''}
        </div>
        <button class="btn-accept" onclick="sendFriendRequestToUid('${d.id}','${escHtml(u.name || '')}')">הוסף</button>
      </div>`;
    }).join('');
  } catch (err) {
    results.innerHTML = '<div style="color:var(--text-3);font-size:13px">שגיאה בחיפוש</div>';
    console.error(err);
  }
}

async function sendFriendRequestToUid(uid, name) {
  const errEl = document.getElementById('friend-search-err');
  errEl.textContent = '';
  if ((userProfile.friendIds || []).includes(uid)) { errEl.textContent = 'כבר חברים!'; return; }
  try {
    const existing = await db.collection('friendRequests').where('fromUid', '==', currentUser.uid).get();
    if (existing.docs.some(d => d.data().toUid === uid && d.data().status === 'pending')) {
      errEl.textContent = 'בקשה כבר נשלחה'; return;
    }
    const targetDoc  = await db.collection('users').doc(uid).get();
    const targetData = targetDoc.data() || {};
    await db.collection('friendRequests').add({
      fromUid: currentUser.uid, fromName: currentUser.displayName || '',
      fromEmail: currentUser.email || '',
      fromPhotoUrl: userProfile.photoUrl || '',
      toUid: uid, toName: name, toEmail: targetData.email || '',
      toPhotoUrl: targetData.photoUrl || '',
      status: 'pending',
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    document.getElementById('friend-search-results').innerHTML = '';
    document.getElementById('friend-email-input').value = '';
    toast(`בקשת חברות נשלחה ל-${name || 'משתמש'} 👋`, 'success');
    loadFriendsView();
  } catch (err) { errEl.textContent = 'שגיאה, נסה שוב'; console.error(err); }
}

async function loadFriendRequests() {
  const el = document.getElementById('friend-requests-list');
  try {
    const [inSnap, outSnap] = await Promise.all([
      db.collection('friendRequests').where('toUid', '==', currentUser.uid).get(),
      db.collection('friendRequests').where('fromUid', '==', currentUser.uid).get(),
    ]);
    const incoming = inSnap.docs.filter(d => d.data().status === 'pending');
    const outgoing = outSnap.docs.filter(d => d.data().status === 'pending');
    if (!incoming.length && !outgoing.length) {
      el.innerHTML = '<div class="empty-state" style="padding:20px">אין בקשות ממתינות</div>'; return;
    }
    el.innerHTML =
      incoming.map(doc => {
        const r = doc.data();
        return `<div class="friend-req-item">
          ${avatarHtml(r.fromName, r.fromPhotoUrl || '', 'lb-avatar', '42')}
          <div class="friend-info">
            <div class="friend-name">${escHtml(r.fromName || 'משתמש')}</div>
            <div class="friend-email">${escHtml(r.fromEmail)}</div>
          </div>
          <div class="friend-req-actions">
            <button class="btn-accept" onclick="acceptRequest('${doc.id}','${r.fromUid}','${escHtml(r.fromName)}')">אשר</button>
            <button class="btn-decline" onclick="declineRequest('${doc.id}')">דחה</button>
          </div>
        </div>`;
      }).join('') +
      outgoing.map(doc => {
        const r = doc.data();
        return `<div class="friend-req-item">
          ${avatarHtml(r.toName || r.toEmail, r.toPhotoUrl || '', 'lb-avatar', '42')}
          <div class="friend-info">
            <div class="friend-name">${escHtml(r.toName || r.toEmail)}</div>
            <div class="friend-email">${escHtml(r.toEmail)}</div>
          </div>
          <span class="outgoing-tag">ממתין לאישור</span>
        </div>`;
      }).join('');
    initRipples();
  } catch (err) { el.innerHTML = '<div class="empty-state" style="padding:20px">שגיאה</div>'; }
}

async function acceptRequest(reqId, fromUid, fromName) {
  try {
    const batch = db.batch();
    batch.update(db.collection('friendRequests').doc(reqId), {
      status: 'accepted', respondedAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    batch.update(db.collection('users').doc(currentUser.uid), {
      friendIds: firebase.firestore.FieldValue.arrayUnion(fromUid),
    });
    await batch.commit();
    await db.collection('users').doc(fromUid).update({
      friendIds: firebase.firestore.FieldValue.arrayUnion(currentUser.uid),
    });
    userProfile.friendIds = [...(userProfile.friendIds || []), fromUid];
    toast(`${fromName} הצטרף לחבריך! 🎉`, 'success');
    loadFriendsView();
  } catch (err) { toast('שגיאה', 'error'); }
}

async function declineRequest(reqId) {
  try {
    await db.collection('friendRequests').doc(reqId).update({
      status: 'declined', respondedAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    loadFriendRequests();
  } catch (err) { toast('שגיאה', 'error'); }
}

async function loadFriendsList() {
  const el        = document.getElementById('friends-list');
  const friendIds = userProfile.friendIds || [];
  if (!friendIds.length) {
    el.innerHTML = `<div class="empty-state" style="padding:20px"><div class="empty-icon" style="font-size:36px">👥</div>אין חברים עדיין<br><small style="font-size:13px;color:var(--text-3)">הוסף חברים לפי מייל</small></div>`;
    return;
  }
  try {
    const docs = await Promise.all(friendIds.map(uid => db.collection('users').doc(uid).get()));
    el.innerHTML = docs.filter(d => d.exists).map(doc => {
      const u = doc.data();
      return `<div class="friend-item" onclick="openFriendProfile('${doc.id}')" style="cursor:pointer">
        ${avatarHtml(u.name, u.photoUrl || '', 'lb-avatar', '42')}
        <div class="friend-info">
          <div class="friend-name">${escHtml(u.name || 'משתמש')}</div>
          <div class="friend-email">${escHtml(u.email || '')}</div>
        </div>
        <span style="font-size:18px;color:var(--text-3)">›</span>
      </div>`;
    }).join('');
  } catch (err) { el.innerHTML = '<div class="empty-state" style="padding:20px">שגיאה</div>'; }
}

// ══ FINES ════════════════════════════════════════════════════════════════
// ══ ACHIEVEMENTS ═════════════════════════════════════════════════════════
function calcStreak(allDocs) {
  if (!allDocs.length) return 0;
  const dates    = [...new Set(allDocs.map(d => d.data().date))].sort().reverse();
  const today    = new Date(); today.setHours(0, 0, 0, 0);
  const lastDate = new Date(dates[0] + 'T12:00:00');
  if (Math.floor((today - lastDate) / 86400000) > 1) return 0;
  let streak = 1;
  for (let i = 1; i < dates.length; i++) {
    const diff = Math.round((new Date(dates[i-1]+'T12:00:00') - new Date(dates[i]+'T12:00:00')) / 86400000);
    if (diff === 1) streak++;
    else break;
  }
  return streak;
}

async function checkAchievements(allDocs) {
  const badges = new Set(userProfile.badges || []);
  const toAdd  = [];
  const total  = allDocs.length;
  const streak = calcStreak(allDocs);
  const types  = new Set(allDocs.map(d => d.data().type));
  const typeCounts = {};
  allDocs.forEach(d => { const t = d.data().type; typeCounts[t] = (typeCounts[t] || 0) + 1; });
  const totalMins  = allDocs.reduce((s, d) => s + (d.data().duration || 0), 0);

  const check = (key, cond) => { if (cond && !badges.has(key)) toAdd.push(key); };

  // First steps
  check('first_workout',    total >= 1);
  check('first_gym',        typeCounts['gym']        >= 1);
  check('first_run',        typeCounts['run']        >= 1);
  check('first_swim',       typeCounts['swim']       >= 1);
  check('first_basketball', typeCounts['basketball'] >= 1);
  check('first_tennis',     typeCounts['tennis']     >= 1);
  check('first_padel',      typeCounts['padel']      >= 1);
  check('first_treadmill',  typeCounts['treadmill']  >= 1);
  check('app_day_1',        total >= 1);
  // Streaks
  check('streak_3',   streak >= 3);
  check('streak_7',   streak >= 7);
  check('streak_14',  streak >= 14);
  check('streak_30',  streak >= 30);
  check('streak_60',  streak >= 60);
  check('streak_100', streak >= 100);
  // Volume
  check('workouts_5',    total >= 5);
  check('workouts_10',   total >= 10);
  check('workouts_25',   total >= 25);
  check('workouts_50',   total >= 50);
  check('workouts_100',  total >= 100);
  check('workouts_200',  total >= 200);
  check('workouts_365',  total >= 365);
  check('workouts_500',  total >= 500);
  check('workouts_1000', total >= 1000);
  // Variety
  check('variety_3',    types.size >= 3);
  check('variety_5',    types.size >= 5);
  check('variety_all',  types.size >= 8);
  check('same_type_10', Object.values(typeCounts).some(c => c >= 10));
  check('same_type_50', Object.values(typeCounts).some(c => c >= 50));
  // Type-specific
  check('gym_20',      (typeCounts['gym']        || 0) >= 20);
  check('gym_100',     (typeCounts['gym']        || 0) >= 100);
  check('run_20',      (typeCounts['run']        || 0) >= 20);
  check('run_50',      (typeCounts['run']        || 0) >= 50);
  check('swim_10',     (typeCounts['swim']       || 0) >= 10);
  check('swim_30',     (typeCounts['swim']       || 0) >= 30);
  check('bball_10',    (typeCounts['basketball'] || 0) >= 10);
  check('tennis_10',   (typeCounts['tennis']     || 0) >= 10);
  check('padel_10',    (typeCounts['padel']      || 0) >= 10);
  check('treadmill_20',(typeCounts['treadmill']  || 0) >= 20);
  check('gym_rat',     (typeCounts['gym']        || 0) >= 50);
  // Monthly goal
  const mc = allDocs.filter(d => d.data().monthKey === monthKey()).length;
  check('monthly_goal',   mc >= (userProfile.goal || 3));
  check('monthly_double', mc >= (userProfile.goal || 3) * 2);
  // Weekly challenges
  const wStart = weekKey();
  const wEnd   = localDateStr(new Date(new Date(wStart + 'T00:00:00').getTime() + 6 * 86400000));
  const thisWeek = allDocs.filter(d => { const dt = d.data().date; return dt >= wStart && dt <= wEnd; });
  check('5_in_week', thisWeek.length >= 5);
  check('7_in_week', thisWeek.length >= 7);
  check('overachieve', thisWeek.length >= (userProfile.goal || 3) * 2);
  // Duration
  check('long_session', allDocs.some(d => (d.data().duration || 0) >= 60));
  check('super_long',   allDocs.some(d => (d.data().duration || 0) >= 120));
  check('quick_fire',   allDocs.some(d => (d.data().duration || 0) > 0 && (d.data().duration || 0) <= 20));
  check('total_10h',  totalMins >= 600);
  check('total_50h',  totalMins >= 3000);
  check('total_100h', totalMins >= 6000);
  check('total_500h', totalMins >= 30000);
  // Photo / media
  const withPhotos = allDocs.filter(d => d.data().photoUrl).length;
  check('first_photo', withPhotos >= 1);
  check('photos_5',    withPhotos >= 5);
  check('photos_20',   withPhotos >= 20);
  // Mood / notes
  const withMood  = allDocs.filter(d => d.data().mood  || d.data().notes).length;
  check('mood_writer', withMood >= 10);
  check('good_mood',   allDocs.filter(d => d.data().mood).length >= 5);
  // Social
  check('first_friend', (userProfile.friendIds || []).length >= 1);
  check('friends_5',    (userProfile.friendIds || []).length >= 5);
  check('friends_10',   (userProfile.friendIds || []).length >= 10);
  // Meta
  const earnedCount = badges.size + toAdd.length;
  check('ach_25',  earnedCount >= 25);
  check('ach_50',  earnedCount >= 50);
  check('legend',  earnedCount >= 100);

  if (!toAdd.length) return;
  const updated = [...Array.from(badges), ...toAdd];
  userProfile.badges = updated;
  try { await db.collection('users').doc(currentUser.uid).update({ badges: updated }); } catch {}
  toAdd.forEach((key, i) => {
    const a = ACHIEVEMENTS.find(x => x.key === key);
    if (a) {
      setTimeout(() => toast(`🏅 הישג חדש! ${a.emoji} ${a.label}`, 'success'), 900 + i * 700);
      if (isNotifEnabled('newAchievement')) {
        pushNotification(currentUser.uid, {
          type: 'newAchievement',
          title: `🏅 הישג חדש! ${a.label}`,
          body: a.desc,
          icon: a.emoji,
        });
      }
    }
  });
}

let achFilter = 'all';

function loadAchievementsView() {
  const earned = new Set(userProfile.badges || []);
  const pts    = [...earned].reduce((s, k) => {
    const a = ACHIEVEMENTS.find(x => x.key === k);
    return s + ({ common: 10, rare: 25, epic: 60, legendary: 150 }[a?.rarity] || 0);
  }, 0);
  const pct    = Math.round((earned.size / ACHIEVEMENTS.length) * 100);
  const ranks  = [
    { min: 0,    emoji: '🌱', name: 'מתחיל'    },
    { min: 5,    emoji: '⚡', name: 'מתרגל'    },
    { min: 15,   emoji: '🔥', name: 'רציני'     },
    { min: 30,   emoji: '💪', name: 'ספורטאי'   },
    { min: 50,   emoji: '🏅', name: 'מקצוען'   },
    { min: 80,   emoji: '🏆', name: 'אלוף'      },
    { min: 120,  emoji: '👑', name: 'לגנד'      },
    { min: 160,  emoji: '💎', name: 'אגדה'      },
  ];
  const rank = [...ranks].reverse().find(r => earned.size >= r.min) || ranks[0];
  document.getElementById('ach-rank-emoji').textContent   = rank.emoji;
  document.getElementById('ach-rank-name').textContent    = rank.name;
  document.getElementById('ach-earned-count').textContent = earned.size;
  document.getElementById('ach-points').textContent       = pts;
  document.getElementById('ach-pct').textContent          = `${pct}%`;
  filterAchievements(achFilter);
}

function filterAchievements(cat) {
  achFilter = cat;
  document.querySelectorAll('.ach-filter-btn').forEach(b => b.classList.remove('active'));
  const activeBtn = [...document.querySelectorAll('.ach-filter-btn')].find(b => b.textContent.includes(cat === 'all' ? 'הכל' : cat === 'earned' ? 'הושג' : ''));
  if (activeBtn) activeBtn.classList.add('active');
  // Fallback: mark by onclick attribute match
  document.querySelectorAll('.ach-filter-btn').forEach(b => {
    if (b.getAttribute('onclick')?.includes(`'${cat}'`)) b.classList.add('active');
  });

  const earned = new Set(userProfile.badges || []);
  let list = ACHIEVEMENTS;
  if (cat === 'earned') list = list.filter(a => earned.has(a.key));
  else if (cat !== 'all') list = list.filter(a => a.cat === cat);
  // Earned first (by rarity desc), locked sorted by tier asc (easiest first)
  const rarityOrder = { legendary: 0, epic: 1, rare: 2, common: 3 };
  list = [...list].sort((a, b) => {
    const ae = earned.has(a.key), be = earned.has(b.key);
    if (ae !== be) return ae ? -1 : 1;
    if (ae && be) return (rarityOrder[a.rarity] || 3) - (rarityOrder[b.rarity] || 3);
    return (a.tier || 5) - (b.tier || 5);
  });

  const grid = document.getElementById('achievements-grid');
  if (!list.length) { grid.innerHTML = '<div class="empty-state" style="grid-column:1/-1">אין הישגים בקטגוריה זו</div>'; return; }
  grid.innerHTML = list.map(a => {
    const isEarned = earned.has(a.key);
    const rc = ACH_RARITY_COLOR[a.rarity] || ACH_RARITY_COLOR.common;
    const rarityLabel = { common: 'נפוץ', rare: 'נדיר', epic: 'אפי', legendary: 'אגדי' }[a.rarity] || '';
    let progressHtml = '';
    if (!isEarned) {
      const prog = getAchievementProgress(a.key);
      if (prog && prog.target > 0 && prog.current > 0) {
        const pct = Math.min(100, Math.round((prog.current / prog.target) * 100));
        progressHtml = `<div class="ach-progress-wrap">
          <div class="ach-progress-bar"><div class="ach-progress-fill" style="width:${pct}%"></div></div>
          <div class="ach-progress-text">${prog.label}</div>
        </div>`;
      }
    }
    return `<div class="ach-card ${isEarned ? 'earned' : 'locked'}" style="background:${rc.bg};border:1px solid ${rc.border};${isEarned ? `box-shadow:${rc.glow}` : ''}">
      <div class="ach-emoji">${a.emoji}</div>
      <div class="ach-info">
        <div class="ach-name" style="color:${isEarned ? rc.text : 'var(--text-2)'}">${a.label}</div>
        <div class="ach-desc">${isEarned ? a.desc : '🔒 ' + a.desc}</div>
        <span class="ach-rarity" style="color:${rc.text}">${rarityLabel}</span>
        ${progressHtml}
      </div>
    </div>`;
  }).join('');
}

function renderBadges(badges) {
  const earned = new Set(badges || []);
  const earnedList = ACHIEVEMENTS.filter(a => earned.has(a.key)).slice(0, 15);
  const el = document.getElementById('badges-grid');
  if (!el) return;
  el.innerHTML = earnedList.length
    ? earnedList.map(a => `
      <div class="badge-item earned">
        <span class="badge-emoji">${a.emoji}</span>
        <span class="badge-label">${a.label}</span>
      </div>`).join('')
    : '<div style="padding:16px;color:var(--text-3);font-size:13px;text-align:center;grid-column:1/-1">טרם הושגו הישגים</div>';
}

// ══ PROFILE HELPERS ══════════════════════════════════════════════════════
function goalLabel(k) {
  return { lose:'ירידה במשקל', muscle:'בניית שריר', fitness:'שיפור כושר', maintain:'שמירה על משקל' }[k] || k;
}
function activityLabel(k) {
  return { sedentary:'יושבני', lightly:'פעיל קל', active:'פעיל', very:'פעיל מאוד' }[k] || k;
}

function computeStreaks(docs) {
  const dates = [...new Set(docs.map(d => d.data().date))].sort().reverse();
  if (!dates.length) return { current: 0, best: 0 };
  const today     = localDateStr(new Date());
  const yesterday = localDateStr(new Date(Date.now() - 86400000));
  let current = 0, prev = null;
  for (const d of dates) {
    if (!prev) {
      if (d !== today && d !== yesterday) break;
      current = 1; prev = d;
    } else {
      if (Math.round((new Date(prev+'T00:00:00') - new Date(d+'T00:00:00')) / 86400000) === 1) { current++; prev = d; } else break;
    }
  }
  let best = 0, streak = 0; prev = null;
  for (const d of [...dates].reverse()) {
    if (!prev) { streak = 1; prev = d; }
    else {
      if (Math.round((new Date(d+'T00:00:00') - new Date(prev+'T00:00:00')) / 86400000) === 1) streak++;
      else { best = Math.max(best, streak); streak = 1; }
      prev = d;
    }
  }
  return { current, best: Math.max(best, streak) };
}

function calcNutrition(p) {
  const w = parseFloat(p.weight), h = parseFloat(p.height), a = parseFloat(p.age);
  if (!w || !h || !a) return null;
  const bmr  = p.gender === 'נקבה' ? 10*w + 6.25*h - 5*a - 161 : 10*w + 6.25*h - 5*a + 5;
  const mult = { sedentary:1.2, lightly:1.375, active:1.55, very:1.725 }[p.activityLevel] || 1.375;
  const cals = Math.round(bmr * mult * ({ lose:.85, muscle:1.10, fitness:1.0, maintain:1.0 }[p.fitnessGoal] || 1.0));
  const protein = Math.round(({ lose:2.0, muscle:2.2, fitness:1.8, maintain:1.6 }[p.fitnessGoal] || 1.8) * w);
  const fat     = Math.round((cals * ({ lose:.25, muscle:.25, fitness:.25, maintain:.30 }[p.fitnessGoal] || .25)) / 9);
  const carbs   = Math.max(0, Math.round((cals - protein*4 - fat*9) / 4));
  return { cals, protein, carbs, fat };
}

// ══ SETTINGS / PROFILE ═══════════════════════════════════════════════════
function renderSettings() {
  if (viewingUserId) renderFriendProfile(viewingUserId);
  else renderProfile();
}

function goToOwnProfile() {
  viewingUserId = null;
  switchTab('settings');
}

function openFriendProfile(uid) {
  viewingUserId = uid;
  switchTab('settings');
}

function closeViewingProfile() {
  viewingUserId = null;
  renderProfile();
}

async function renderFriendProfile(uid) {
  const el = document.getElementById('profile-content');
  if (!el) return;
  el.innerHTML = `<div class="empty-state"><div style="font-size:48px;margin-bottom:12px">⏳</div>טוען פרופיל...</div>`;
  try {
    const [userDoc, workoutsSnap] = await Promise.all([
      db.collection('users').doc(uid).get(),
      db.collection('workouts').where('userId', '==', uid).get()
    ]);
    if (!userDoc.exists) throw new Error('not found');
    const p    = userDoc.data();
    const docs = workoutsSnap.docs.sort((a, b) => b.data().date.localeCompare(a.data().date));
    const total  = docs.length;
    const hours  = Math.round(docs.reduce((s, d) => s + (d.data().duration || 0), 0) / 60);
    const streak = calcStreak(docs);
    const name   = p.name || 'ספורטאי';
    const photoUrl = p.photoUrl || '';
    const avatarInner = photoUrl
      ? `<img class="profile-avatar" src="${escHtml(photoUrl)}" alt="${escHtml(avatarOf(name))}">`
      : `<div class="profile-avatar-init">${escHtml(avatarOf(name))}</div>`;
    el.innerHTML = `
      <button class="btn-ghost" onclick="closeViewingProfile()" style="margin-bottom:16px;display:flex;align-items:center;gap:6px">← חזרה לפרופיל שלי</button>
      <div class="profile-header">
        <div class="profile-avatar-wrap" style="cursor:default">${avatarInner}</div>
        <div class="profile-header-info">
          <div class="profile-name">${escHtml(name)}</div>
          ${p.username ? `<div class="profile-username"><span dir="ltr">@${escHtml(p.username)}</span></div>` : ''}
        </div>
      </div>
      <div class="profile-stats-grid">
        <div class="profile-stat"><div class="profile-stat-num">${total}</div><div class="profile-stat-label">אימונים</div></div>
        <div class="profile-stat"><div class="profile-stat-num">${streak}🔥</div><div class="profile-stat-label">רצף נוכחי</div></div>
        <div class="profile-stat"><div class="profile-stat-num">${p.goal || 3}</div><div class="profile-stat-label">יעד שבועי</div></div>
        <div class="profile-stat"><div class="profile-stat-num">${hours}</div><div class="profile-stat-label">שעות</div></div>
      </div>
      <div class="profile-section">
        <div class="workout-grid-header">⊞</div>
        <div class="workout-grid" id="workout-grid"></div>
      </div>
    `;
    renderWorkoutGrid(docs);
  } catch (err) {
    console.error('renderFriendProfile:', err);
    el.innerHTML = `
      <button class="btn-ghost" onclick="closeViewingProfile()" style="margin-bottom:16px">← חזרה</button>
      <div class="empty-state"><div class="empty-icon">⚠️</div>לא ניתן לטעון את הפרופיל</div>
    `;
  }
}

function notifRow(key, label, sub, prefs) {
  return `<div class="settings-row" style="border-top:1px solid var(--border)">
    <div><div class="settings-label">${label}</div><div class="settings-sub">${sub}</div></div>
    <label class="toggle">
      <input type="checkbox" ${prefs[key] !== false ? 'checked' : ''} onchange="saveNotifPref('${key}',this.checked)">
      <span class="toggle-track"></span>
    </label>
  </div>`;
}

function notifSettingsHtml(prefs) {
  const masterOn = prefs.master !== false;
  return `<div class="settings-row">
    <div><div class="settings-label">הפעל התראות</div><div class="settings-sub">מאסטר לכל סוגי ההתראות</div></div>
    <label class="toggle">
      <input type="checkbox" ${masterOn ? 'checked' : ''} onchange="saveNotifPref('master',this.checked).then(()=>renderProfile())">
      <span class="toggle-track"></span>
    </label>
  </div>
  <div style="${masterOn ? '' : 'opacity:.38;pointer-events:none'}">
    ${notifRow('friendCompletedWorkout', 'חבר סיים אימון',          'כשחבר שלך מתאמן',              prefs)}
    ${notifRow('noWorkoutTwoDays',       'לא התאמנת 2 ימים',        'תזכורת להתאמן',                 prefs)}
    ${notifRow('friendLikedMyWorkout',   'לייק על האימון שלך',      'כשחבר נותן לייק לאימון שלך',    prefs)}
    ${notifRow('friendCommentedMyWorkout','תגובה על האימון שלך',    'כשחבר מגיב על אימון שלך',       prefs)}
    ${notifRow('storyReply',             'תגובה על הסטורי שלך',    'כשמישהו מגיב על סטורי שלך',     prefs)}
    ${notifRow('newAchievement',         'הישג חדש',                 'כשמשיגים הישג',                 prefs)}
    ${notifRow('weeklyGoalReminder',     'תזכורת יעד שבועי',        'בסמ-שבוע אם מפגרים ביעד',       prefs)}
  </div>`;
}

function renderWorkoutGrid(docs = null) {
  const el = document.getElementById('workout-grid');
  if (!el) return;
  const source = (docs || cachedUserDocs || []).slice().sort((a, b) =>
    (b.data().date || '').localeCompare(a.data().date || '')
  );
  if (!source.length) {
    el.innerHTML = `<div style="grid-column:1/-1;padding:32px;text-align:center;color:var(--text-3);font-size:14px">עוד אין אימונים 💪</div>`;
    return;
  }
  const isOwn = !docs; // own grid is editable
  el.innerHTML = source.map(doc => {
    const w   = doc.data();
    const wid = doc.id;
    const shortDate = w.date ? w.date.split('-').slice(1).reverse().join('.') : '';
    const clickAttr = isOwn ? `onclick="editWorkout('${wid}')"` : '';
    if (w.photoUrl) {
      return `<div class="workout-grid-cell" ${clickAttr} style="${isOwn ? 'cursor:pointer' : ''}">
        <img src="${escHtml(w.photoUrl)}" alt="${escHtml(w.typeName || '')}" loading="lazy">
        <div class="workout-grid-info">
          <div class="workout-grid-info-type">${w.typeEmoji || '💪'} ${escHtml(w.typeName || '')}</div>
          <div class="workout-grid-info-date">${shortDate}</div>
        </div>
      </div>`;
    }
    return `<div class="workout-grid-cell workout-grid-cell--placeholder" ${clickAttr} style="${isOwn ? 'cursor:pointer' : ''}">
      <div class="workout-grid-type">${w.typeEmoji || '💪'}</div>
      <div class="workout-grid-meta">${escHtml(w.typeName || w.type || '')}</div>
      <div class="workout-grid-date">${shortDate}</div>
    </div>`;
  }).join('');
}

function renderProfile() {
  if (!currentUser) return;
  const p        = userProfile;
  const name     = p.name || currentUser.displayName || 'ספורטאי';
  const username = p.username || '';
  const photoUrl = p.photoUrl || currentUser.photoURL || '';
  const goal     = p.goal || 3;
  const docs     = cachedUserDocs || [];
  const total    = docs.length;
  const hours    = Math.round(docs.reduce((s, d) => s + (d.data().duration || 0), 0) / 60);
  const { current: streak, best: bestStreak } = computeStreaks(docs);
  const nut = calcNutrition(p);
  const el  = document.getElementById('profile-content');
  if (!el) return;

  const avatarInner = photoUrl
    ? `<img class="profile-avatar" src="${escHtml(photoUrl)}" alt="${escHtml(avatarOf(name))}">`
    : `<div class="profile-avatar-init">${escHtml(avatarOf(name))}</div>`;

  const nutHtml = nut ? `
    <div class="nutrition-card">
      <div class="nutrition-title">🥗 המלצות תזונה יומיות</div>
      <div class="nutrition-subtitle">מחושב לפי נתוני הגוף שלך · ${goalLabel(p.fitnessGoal)}</div>
      <div class="nut-cals">${nut.cals} <span>קלוריות ביום</span></div>
      <div class="macros-grid">
        <div><div class="macro-val">${nut.protein}g</div><div class="macro-label">חלבון</div><div class="macro-bar-wrap"><div class="macro-bar macro-protein" style="width:${Math.min(100,Math.round(nut.protein*4*100/nut.cals))}%"></div></div></div>
        <div><div class="macro-val">${nut.carbs}g</div><div class="macro-label">פחמימות</div><div class="macro-bar-wrap"><div class="macro-bar macro-carbs" style="width:${Math.min(100,Math.round(nut.carbs*4*100/nut.cals))}%"></div></div></div>
        <div><div class="macro-val">${nut.fat}g</div><div class="macro-label">שומן</div><div class="macro-bar-wrap"><div class="macro-bar macro-fat" style="width:${Math.min(100,Math.round(nut.fat*9*100/nut.cals))}%"></div></div></div>
      </div>
    </div>` : `
    <div class="nutrition-empty-card" onclick="openEditProfile()">
      <div style="font-size:32px;margin-bottom:8px">🥗</div>
      <div style="font-weight:700;margin-bottom:4px">חשב המלצות תזונה</div>
      <div style="font-size:12px;color:var(--text-3)">הוסף גובה, משקל וגיל לחישוב קלוריות ומאקרו יומי</div>
    </div>`;

  const bodyHtml = (p.weight || p.height || p.age || p.goalWeight) ? `
    <div class="profile-section">
      <div class="section-title">נתוני גוף</div>
      <div class="body-grid">
        ${p.weight     ? `<div class="body-item"><div class="body-val">${p.weight}</div><div class="body-lbl">משקל ק"ג</div></div>` : ''}
        ${p.goalWeight ? `<div class="body-item"><div class="body-val">${p.goalWeight}</div><div class="body-lbl">יעד ק"ג</div></div>` : ''}
        ${p.height     ? `<div class="body-item"><div class="body-val">${p.height}</div><div class="body-lbl">גובה ס"מ</div></div>` : ''}
        ${p.age        ? `<div class="body-item"><div class="body-val">${p.age}</div><div class="body-lbl">גיל</div></div>` : ''}
      </div>
    </div>` : '';

  el.innerHTML = `
    <div class="profile-header">
      <div class="profile-avatar-wrap" onclick="document.getElementById('photo-upload-input').click()">
        ${avatarInner}<div class="profile-avatar-edit">📷</div>
      </div>
      <input type="file" id="photo-upload-input" accept="image/*" style="display:none"
             onchange="if(this.files[0]) uploadProfilePhoto(this.files[0])">
      <div class="profile-header-info">
        <div class="profile-name">${escHtml(name)}</div>
        <div class="profile-username">${username
          ? `<span dir="ltr">@${escHtml(username)}</span>`
          : `<span style="color:var(--text-3);direction:rtl;cursor:pointer" onclick="openEditProfile()">הגדר שם משתמש ←</span>`}</div>
        <div class="profile-email">${escHtml(currentUser.email)}</div>
      </div>
      <button class="profile-edit-btn" onclick="openEditProfile()">✏️ עריכה</button>
    </div>
    <div class="profile-stats-grid">
      <div class="profile-stat"><div class="profile-stat-num">${total}</div><div class="profile-stat-label">אימונים</div></div>
      <div class="profile-stat"><div class="profile-stat-num">${streak}🔥</div><div class="profile-stat-label">רצף נוכחי</div></div>
      <div class="profile-stat"><div class="profile-stat-num">${bestStreak}</div><div class="profile-stat-label">רצף שיא</div></div>
      <div class="profile-stat"><div class="profile-stat-num">${hours}</div><div class="profile-stat-label">שעות</div></div>
    </div>
    <div class="profile-section">
      <div class="workout-grid-header">⊞</div>
      <div class="workout-grid" id="workout-grid"></div>
    </div>
    ${nutHtml}
    ${bodyHtml}
    <div class="profile-section">
      <div class="section-title">יעדי כושר</div>
      <div class="settings-card">
        ${p.fitnessGoal   ? `<div class="settings-row"><div class="settings-label">מטרה</div><div class="settings-sub">${goalLabel(p.fitnessGoal)}</div></div>` : ''}
        ${p.activityLevel ? `<div class="settings-row" style="border-top:1px solid var(--border)"><div class="settings-label">רמת פעילות</div><div class="settings-sub">${activityLabel(p.activityLevel)}</div></div>` : ''}
        <div class="settings-row" style="${p.fitnessGoal||p.activityLevel ? 'border-top:1px solid var(--border)' : ''}">
          <div><div class="settings-label">יעד שבועי</div><div class="settings-sub">אימונים בשבוע</div></div>
          <div class="goal-control">
            <button class="goal-btn" onclick="changeGoal(-1)">−</button>
            <div class="goal-num" id="goal-display">${goal}</div>
            <button class="goal-btn" onclick="changeGoal(1)">+</button>
          </div>
        </div>
      </div>
    </div>
    <div class="profile-section">
      <div class="section-title">הישגים</div>
      <div class="settings-card"><div class="badges-grid" id="badges-grid"></div></div>
    </div>
    <div class="profile-section">
      <button class="collapsible-header" onclick="toggleNotifSection(this)">
        <span class="section-title" style="margin:0">התראות</span>
        <svg class="chevron-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
      </button>
      <div id="notif-section-panel" style="max-height:0;overflow:hidden;transition:max-height .2s ease">
        <div class="settings-card">
          ${notifSettingsHtml(notifPrefs || DEFAULT_NOTIF_PREFS)}
        </div>
      </div>
    </div>
    <button class="btn-danger btn-full" onclick="doSignOut()" style="margin-top:8px">התנתק</button>
  `;
  renderBadges(p.badges);
  renderWorkoutGrid();
  initRipples();
}

let _editGender = 'זכר', _editFitnessGoal = 'fitness';

function openEditProfile() {
  const p = userProfile;
  document.getElementById('edit-name').value        = p.name || currentUser.displayName || '';
  document.getElementById('edit-username-static').textContent = p.username ? '🔒 @' + p.username : '—';
  document.getElementById('edit-age').value         = p.age || '';
  document.getElementById('edit-height').value      = p.height || '';
  document.getElementById('edit-weight').value      = p.weight || '';
  document.getElementById('edit-goal-weight').value = p.goalWeight || '';
  document.getElementById('edit-activity').value    = p.activityLevel || 'lightly';
  _editGender      = p.gender || 'זכר';
  _editFitnessGoal = p.fitnessGoal || 'fitness';
  selectGender(_editGender);
  selectFitnessGoal(_editFitnessGoal);
  document.getElementById('edit-profile-err').textContent = '';
  document.getElementById('edit-profile-modal').classList.add('show');
}

function closeEditProfile() {
  document.getElementById('edit-profile-modal').classList.remove('show');
}

function onEditProfileBackdrop(e) {
  if (e.target.id === 'edit-profile-modal') closeEditProfile();
}

function selectGender(g) {
  _editGender = g;
  document.getElementById('gender-male').classList.toggle('active', g === 'זכר');
  document.getElementById('gender-female').classList.toggle('active', g === 'נקבה');
}

function selectFitnessGoal(val) {
  _editFitnessGoal = val;
  document.querySelectorAll('.goal-option-btn').forEach(b => b.classList.toggle('active', b.dataset.val === val));
}

async function saveProfileEdits() {
  const name        = document.getElementById('edit-name').value.trim();
  const age         = parseInt(document.getElementById('edit-age').value)          || null;
  const height      = parseFloat(document.getElementById('edit-height').value)     || null;
  const weight      = parseFloat(document.getElementById('edit-weight').value)     || null;
  const goalWeight  = parseFloat(document.getElementById('edit-goal-weight').value) || null;
  const activityLevel = document.getElementById('edit-activity').value;
  const errEl       = document.getElementById('edit-profile-err');
  const btn         = document.getElementById('edit-profile-save-btn');
  if (!name) { errEl.textContent = 'נא להזין שם'; return; }
  errEl.textContent = '';
  btn.textContent = 'שומר...'; btn.disabled = true;
  try {
    const updates = {
      name, gender: _editGender, fitnessGoal: _editFitnessGoal, activityLevel,
      ...(age        != null && { age }),
      ...(height     != null && { height }),
      ...(weight     != null && { weight }),
      ...(goalWeight != null && { goalWeight }),
    };
    await db.collection('users').doc(currentUser.uid).update(updates);
    await currentUser.updateProfile({ displayName: name });
    Object.assign(userProfile, updates);
    closeEditProfile();
    renderProfile();
    setHeaderAvatar();
    toast('הפרופיל עודכן! ✓', 'success');
  } catch (err) {
    console.error('saveProfileEdits:', err);
    errEl.textContent = 'שגיאה בשמירה';
  } finally {
    btn.disabled = false; btn.textContent = 'שמור';
  }
}

async function changeGoal(delta) {
  const goal = Math.max(1, Math.min(7, (userProfile.goal || 3) + delta));
  if (goal === userProfile.goal) return;
  userProfile.goal = goal;
  document.getElementById('goal-display').textContent = goal;
  try { await db.collection('users').doc(currentUser.uid).update({ goal }); loadHomeView(); } catch {}
}

// ══ NOTIFICATION PREFS ═══════════════════════════════════════════════════
async function loadNotifPrefs() {
  try {
    const doc = await db.collection('users').doc(currentUser.uid)
      .collection('preferences').doc('notifications').get();
    if (doc.exists) {
      notifPrefs = { ...DEFAULT_NOTIF_PREFS, ...doc.data() };
    } else {
      notifPrefs = { ...DEFAULT_NOTIF_PREFS };
      db.collection('users').doc(currentUser.uid)
        .collection('preferences').doc('notifications').set(notifPrefs).catch(() => {});
    }
  } catch { notifPrefs = { ...DEFAULT_NOTIF_PREFS }; }
}

function isNotifEnabled(type) {
  const p = notifPrefs || DEFAULT_NOTIF_PREFS;
  return p.master !== false && p[type] !== false;
}

async function saveNotifPref(key, value) {
  if (!notifPrefs) notifPrefs = { ...DEFAULT_NOTIF_PREFS };
  notifPrefs[key] = value;
  try {
    await db.collection('users').doc(currentUser.uid)
      .collection('preferences').doc('notifications')
      .set({ [key]: value }, { merge: true });
  } catch {}
}

// ══ NOTIFICATION DELIVERY ═════════════════════════════════════════════════
async function pushNotification(uid, { type, title, body, icon = '💪', data = {} }) {
  if (!currentUser) return;
  try {
    await db.collection('users').doc(uid).collection('notifications').add({
      type, title, body, icon, data, read: false,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
  } catch {}
  if (uid === currentUser.uid && Notification.permission === 'granted' && isNotifEnabled(type)) {
    try { new Notification(title, { body, icon: './icon-192.png', dir: 'rtl', lang: 'he', tag: type }); } catch {}
  }
}

async function requestNotifPermission() {
  if (Notification.permission === 'granted') return;
  if (Notification.permission === 'denied') {
    if (!_notifPermDeniedShown && !localStorage.getItem('notifDeniedShown')) {
      _notifPermDeniedShown = true;
      localStorage.setItem('notifDeniedShown', '1');
      toast('כדי לקבל התראות, אפשר הרשאות דפדפן בהגדרות 🔔', '');
    }
    return;
  }
  try {
    const perm = await Notification.requestPermission();
    if (perm !== 'granted' && !localStorage.getItem('notifDeniedShown')) {
      _notifPermDeniedShown = true;
      localStorage.setItem('notifDeniedShown', '1');
      toast('כדי לקבל התראות, אפשר הרשאות דפדפן בהגדרות 🔔', '');
    }
  } catch {}
}

// ══ NOTIFICATIONS INBOX ═══════════════════════════════════════════════════
function subscribeNotifications() {
  if (_notifUnsub) _notifUnsub();
  if (!currentUser) return;
  _notifUnsub = db.collection('users').doc(currentUser.uid)
    .collection('notifications')
    .orderBy('createdAt', 'desc').limit(30)
    .onSnapshot(snap => {
      _notifDocs = snap.docs;
      updateNotifBadge(snap.docs.filter(d => !d.data().read).length);
    }, () => {});
}

function updateNotifBadge(count) {
  const el = document.getElementById('notif-badge');
  if (!el) return;
  if (count > 0) { el.textContent = count > 9 ? '9+' : String(count); el.style.display = ''; }
  else { el.style.display = 'none'; }
}

function openNotifInbox() {
  document.getElementById('notif-panel').classList.add('show');
  markAllRead().then(() => updateNotifBadge(0));
  renderNotifPanel();
}
function closeNotifInbox() { document.getElementById('notif-panel').classList.remove('show'); }
function onNotifPanelBackdrop(e) { if (e.target.id === 'notif-panel') closeNotifInbox(); }

function renderNotifPanel() {
  const list = document.getElementById('notif-list');
  if (!_notifDocs.length) {
    list.innerHTML = '<div class="notif-empty">אין התראות 🔕</div>';
    return;
  }
  list.innerHTML = _notifDocs.map(doc => {
    const n = doc.data();
    return `<div class="notif-item${n.read ? '' : ' unread'}" onclick="markNotifRead('${doc.id}')">
      <div class="notif-item-icon">${escHtml(n.icon || '💪')}</div>
      <div class="notif-item-body">
        <div class="notif-item-title">${escHtml(n.title)}</div>
        <div class="notif-item-sub">${escHtml(n.body)}</div>
        ${n.createdAt ? `<div class="notif-item-time">${timeAgo(n.createdAt)}</div>` : ''}
      </div>
      ${n.read ? '' : '<div class="notif-dot"></div>'}
    </div>`;
  }).join('');
}

async function markNotifRead(id) {
  try {
    await db.collection('users').doc(currentUser.uid)
      .collection('notifications').doc(id).update({ read: true });
  } catch {}
}

async function markAllRead() {
  const unread = _notifDocs.filter(d => !d.data().read);
  if (!unread.length) return;
  const batch = db.batch();
  unread.forEach(d => batch.update(d.ref, { read: true }));
  try { await batch.commit(); } catch {}
}

// ══ PERIODIC CHECKS ══════════════════════════════════════════════════════
function checkWeeklyGoalReminder() {
  if (_weeklyGoalNotifSent || !isNotifEnabled('weeklyGoalReminder')) return;
  const day = new Date().getDay();
  if (day !== 3 && day !== 4) return; // only Wed/Thu
  const wStart = weekKey();
  const wEnd   = localDateStr(new Date(new Date(wStart + 'T00:00:00').getTime() + 6 * 86400000));
  const count  = cachedUserDocs.filter(d => { const dt = d.data().date; return dt >= wStart && dt <= wEnd; }).length;
  const goal   = userProfile.goal || 3;
  if (count < goal) {
    _weeklyGoalNotifSent = true;
    pushNotification(currentUser.uid, {
      type: 'weeklyGoalReminder',
      title: 'תזכורת יעד שבועי 📅',
      body: `יש לך ${count}/${goal} אימונים השבוע — יאלה, עוד אפשר!`,
      icon: '📅',
    });
  }
}

// ══ BOOT ═════════════════════════════════════════════════════════════════
async function loadUserProfile() {
  try {
    const doc = await db.collection('users').doc(currentUser.uid).get();
    if (doc.exists) {
      userProfile = doc.data();
      // Recover missing username: the signup batch may not have committed before this ran
      if (!userProfile.username) {
        try {
          const uSnap = await db.collection('usernames')
            .where('uid', '==', currentUser.uid).limit(1).get();
          if (!uSnap.empty) {
            const recovered = uSnap.docs[0].id;
            userProfile.username = recovered;
            db.collection('users').doc(currentUser.uid).update({ username: recovered }).catch(() => {});
          }
        } catch {}
      }
    } else {
      // User doc not yet written (race condition during signup) — minimal in-memory profile;
      // doRegister's batch.commit() will write the real doc shortly after.
      userProfile = { goal: 3, friendIds: [], badges: [] };
    }
  } catch { userProfile = { goal: 3, friendIds: [], badges: [] }; }
}

auth.onAuthStateChanged(async user => {
  if (user) {
    currentUser = user;
    await loadUserProfile();
    await migrateAllUsersToFriends();
    await loadNotifPrefs();

    setHeaderAvatar();

    document.getElementById('auth-screen').classList.add('hidden');
    document.getElementById('app').classList.remove('hidden');

    initScrollEffects();
    setTimeout(() => { moveNavIndicator('home'); initRipples(); }, 50);

    subscribeWorkouts(() => loadHomeView());
    subscribeNotifications();
    requestNotifPermission();

    if ('serviceWorker' in navigator) navigator.serviceWorker.register('./sw.js').catch(() => {});
  } else {
    if (workoutsUnsubscribe) { workoutsUnsubscribe(); workoutsUnsubscribe = null; }
    if (_notifUnsub)         { _notifUnsub(); _notifUnsub = null; }
    if (feedObserver)        { feedObserver.disconnect(); feedObserver = null; }
    if (storyTimer)          { clearTimeout(storyTimer); storyTimer = null; }
    Object.values(commentListeners).forEach(u => u());
    Object.keys(commentListeners).forEach(k => delete commentListeners[k]);
    currentUser = null; userProfile = { goal: 3, friendIds: [], badges: [] };
    notifPrefs = null; _notifDocs = [];
    reminderDismissed = false; cachedUserDocs = []; goalWasHit = false; currentTab = 'home'; viewingUserId = null;
    _noWorkoutNotifSent = false; _weeklyGoalNotifSent = false;
    feedAllDocs = []; feedOffset = 0; achFilter = 'all';
    document.getElementById('auth-screen').classList.remove('hidden');
    document.getElementById('app').classList.add('hidden');
  }
});
