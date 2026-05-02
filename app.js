// ══ CONSTANTS ═══════════════════════════════════════════════════════════
const WORKOUT_TYPES = [
  { key: 'gym',        emoji: '🏋️', label: 'חדר כושר' },
  { key: 'run',        emoji: '🏃', label: 'ריצה'      },
  { key: 'swim',       emoji: '🏊', label: 'שחייה'     },
  { key: 'basketball', emoji: '🏀', label: 'כדורסל'    },
  { key: 'tennis',     emoji: '🎾', label: 'טניס'      },
  { key: 'padel',      emoji: '🏓', label: 'פאדל'      },
  { key: 'treadmill',  emoji: '🔁', label: 'הליכון'    },
  { key: 'other',      emoji: '💪', label: 'אחר'       },
];
const FEED_PAGE = 10;

const ACHIEVEMENTS = [
  // ── צעדים ראשונים (tier 1) ──
  { key:'app_day_1',        emoji:'📱', label:'ברוך הבא!',         desc:'הצטרפת ליאלה ספורט',                      rarity:'common',    cat:'special', tier:1 },
  { key:'first_workout',    emoji:'🥇', label:'הצעד הראשון',      desc:'סיימת את האימון הראשון שלך!',             rarity:'common',    cat:'first',   tier:1 },
  { key:'first_gym',        emoji:'🏋️', label:'מרים ברזל',        desc:'נכנסת לחדר כושר לראשונה',                 rarity:'common',    cat:'first',   tier:1 },
  { key:'first_run',        emoji:'🏃', label:'הריצה הראשונה',    desc:'יצאת לרוץ לראשונה',                       rarity:'common',    cat:'first',   tier:1 },
  { key:'first_swim',       emoji:'🏊', label:'לשחות!',           desc:'שחית לראשונה',                            rarity:'common',    cat:'first',   tier:1 },
  { key:'first_basketball', emoji:'🏀', label:'כדורסל!',          desc:'שיחקת כדורסל לראשונה',                    rarity:'common',    cat:'first',   tier:1 },
  { key:'first_tennis',     emoji:'🎾', label:'אייס!',            desc:'שיחקת טניס לראשונה',                      rarity:'common',    cat:'first',   tier:1 },
  { key:'first_padel',      emoji:'🏓', label:'פאדל מאסטר',       desc:'שיחקת פאדל לראשונה',                      rarity:'common',    cat:'first',   tier:1 },
  { key:'first_treadmill',  emoji:'🔁', label:'על הליכון',         desc:'רצת על הליכון לראשונה',                  rarity:'common',    cat:'first',   tier:1 },
  { key:'first_photo',      emoji:'📷', label:'ספורטוגרף',        desc:'העלית תמונה ראשונה עם אימון',             rarity:'common',    cat:'first',   tier:1 },
  { key:'first_friend',     emoji:'👥', label:'חבר ראשון',        desc:'הוספת חבר ראשון ליאלה',                   rarity:'common',    cat:'first',   tier:1 },
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
  { key:'friends_5',        emoji:'🤝', label:'חמישה חברים',      desc:'הוספת 5 חברים ליאלה',                     rarity:'common',    cat:'social',  tier:6 },
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
  { key:'friends_10',       emoji:'🎉', label:'פופולרי',          desc:'הוספת 10 חברים ליאלה',                    rarity:'rare',      cat:'social',  tier:7 },
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
const commentListeners   = {};

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

// Recomputes and renders the weekly counter, progress ring, and header badge
function updateWeeklyStats() {
  if (!currentUser) return;
  const wStart    = weekKey();
  const wEnd      = localDateStr(new Date(new Date(wStart + 'T00:00:00').getTime() + 6 * 86400000));
  const goal      = userProfile.goal || 3;
  const weekCount = cachedUserDocs.filter(d => { const dt = d.data().date; return dt >= wStart && dt <= wEnd; }).length;
  const pct       = Math.min(100, Math.round((weekCount / goal) * 100));
  const remaining = Math.max(0, goal - weekCount);

  animateCounter(document.getElementById('hero-num'), weekCount);
  const badge = document.getElementById('week-count-badge');
  if (badge) badge.textContent = `${weekCount} 🏋️`;
  updateHeroRing(pct);
  updateAvatarRing(pct);

  const subEl  = document.getElementById('hero-sub');
  const progEl = document.getElementById('hero-prog-text');
  if (remaining === 0) {
    if (subEl)  subEl.textContent  = 'השגת את היעד השבועי! 🎉';
    if (progEl) progEl.textContent = 'כל הכבוד! 🏆';
    if (!goalWasHit) { goalWasHit = true; setTimeout(launchConfetti, 600); }
  } else {
    if (subEl)  subEl.textContent  = 'יאלה, נמשיך!';
    if (progEl) progEl.textContent = `עוד ${remaining} אימונים לסיום היעד`;
    goalWasHit = false;
  }
}

// ══ PARALLAX / SCROLL ════════════════════════════════════════════════════
function initScrollEffects() {
  const content = document.getElementById('app-content');
  const header  = document.getElementById('app-header');
  const hero    = document.getElementById('hero-card');
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
      errEl.textContent = 'שם המשתמש תפוס — נסה שם אחר';
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
  } catch (err) {
    errEl.textContent = authErr(err.code);
    btn.disabled = false; btn.textContent = 'הרשמה →';
  }
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
  document.getElementById('workout-date').value     = isEdit ? workoutData.date : localDateStr(new Date());
  const durMins = isEdit ? (workoutData.duration || 0) : 0;
  document.getElementById('workout-hours').value    = isEdit ? Math.floor(durMins / 60) || '' : '';
  document.getElementById('workout-minutes').value  = isEdit ? (durMins % 60 || '')    : '';
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
  editingWorkoutId = null;
  clearWorkoutPhoto();
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

async function uploadWorkoutPhoto(file) {
  if (!file) return null;
  try {
    const compressed = await compressImage(file, 1080, 500);
    return await uploadToCloudinary(compressed, `yala-sport/workouts/${currentUser.uid}`);
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

async function submitWorkout() {
  if (!selectedType) { toast('בחר סוג אימון', 'error'); return; }
  const dateVal = document.getElementById('workout-date').value;
  if (!dateVal)  { toast('בחר תאריך', 'error'); return; }
  const notes    = document.getElementById('workout-notes').value.trim();
  const mood     = document.getElementById('workout-mood').value.trim();
  const hrs      = parseInt(document.getElementById('workout-hours').value)   || 0;
  const mins     = parseInt(document.getElementById('workout-minutes').value) || 0;
  const duration = hrs * 60 + mins || null;
  const t        = WORKOUT_TYPES.find(x => x.key === selectedType);
  const btn      = document.getElementById('submit-workout-btn');
  btn.disabled = true; btn.textContent = 'שומר...';
  try {
    if (editingWorkoutId) {
      let photoUrl = undefined;
      if (_pendingPhotoFile) {
        btn.textContent = 'מעלה תמונה...';
        photoUrl = await uploadWorkoutPhoto(_pendingPhotoFile);
      }
      const upd = {
        type: selectedType, typeEmoji: t.emoji, typeName: t.label,
        date: dateVal, weekKey: dateToWeekKey(dateVal),
        monthKey: dateVal.slice(0, 7), notes: notes || null, mood: mood || null, duration,
      };
      if (photoUrl !== undefined) upd.photoUrl = photoUrl;
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
        btn.textContent = 'מעלה תמונה...';
        const photoUrl = await uploadWorkoutPhoto(_pendingPhotoFile);
        if (photoUrl) {
          await docRef.update({ photoUrl });
          toast('האימון נרשם עם תמונה! 📸', 'success');
        } else {
          toast('האימון נרשם, אבל התמונה לא הועלתה ⚠️', '');
        }
      } else {
        toast('האימון נרשם! 💪', 'success');
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
  const name  = currentUser.displayName || 'ספורטאי';
  const first = name.split(/\s+/)[0];

  document.getElementById('header-week-label').textContent = `שבוע ${weekKey()}`;
  document.getElementById('hero-denom').textContent        = String(userProfile.goal || 3);

  const greetEl = document.getElementById('hero-greeting');
  if (greetEl) {
    greetEl.innerHTML = `שלום, ${escHtml(first)}! <span class="wave" style="display:inline-block;animation:wave 1.5s ease .3s 1">👋</span>`;
  }

  // Stats are kept current by the onSnapshot listener — just sync the UI
  updateWeeklyStats();
  renderProgressChart();

  document.getElementById('activity-feed').innerHTML = skeletonFeed(3);
  loadActivityFeed();
  loadStories();
  checkReminder(cachedUserDocs);
  checkAchievements(cachedUserDocs);
}

// ══ PROGRESS CHART ═══════════════════════════════════════════════════════
function setChartPeriod(period) {
  chartPeriod = period;
  document.getElementById('chart-weekly-btn').classList.toggle('active', period === 'weekly');
  document.getElementById('chart-monthly-btn').classList.toggle('active', period === 'monthly');
  renderProgressChart();
}

function renderProgressChart() {
  const canvas = document.getElementById('progress-chart');
  if (!canvas) return;
  if (progressChart) { progressChart.destroy(); progressChart = null; }

  const labels = [], data = [];
  const hebrewMonths = ['ינו','פבר','מרץ','אפר','מאי','יונ','יול','אוג','ספט','אוק','נוב','דצמ'];

  if (chartPeriod === 'weekly') {
    for (let i = 7; i >= 0; i--) {
      const wStart = weekKey(-i);
      const wEnd   = localDateStr(new Date(new Date(wStart + 'T00:00:00').getTime() + 6 * 86400000));
      const d      = new Date(wStart + 'T12:00:00');
      labels.push(`${d.getDate()}/${d.getMonth() + 1}`);
      data.push(cachedUserDocs.filter(doc => { const dt = doc.data().date; return dt >= wStart && dt <= wEnd; }).length);
    }
  } else {
    const now = new Date();
    for (let i = 5; i >= 0; i--) {
      const d      = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const mStart = localDateStr(d);
      const mEnd   = localDateStr(new Date(d.getFullYear(), d.getMonth() + 1, 0));
      labels.push(hebrewMonths[d.getMonth()]);
      data.push(cachedUserDocs.filter(doc => { const dt = doc.data().date; return dt >= mStart && dt <= mEnd; }).length);
    }
  }

  const maxVal = Math.max(...data, 1);
  progressChart = new Chart(canvas, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        data,
        backgroundColor: data.map((v, i) =>
          i === data.length - 1
            ? 'rgba(255,107,53,1)'
            : v >= (userProfile.goal || 3)
              ? 'rgba(0,217,163,.7)'
              : 'rgba(255,107,53,.45)'),
        borderRadius: 6,
        borderSkipped: false,
      }],
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: 'rgba(24,24,31,.95)',
          borderColor: 'rgba(255,255,255,.1)', borderWidth: 1,
          titleColor: 'rgba(255,255,255,.5)', bodyColor: '#fff',
          padding: 10, cornerRadius: 10,
          callbacks: { label: ctx => ` ${ctx.raw} אימונים` },
        },
      },
      scales: {
        y: {
          beginAtZero: true, max: maxVal + 1,
          ticks: { stepSize: 1, precision: 0, color: 'rgba(255,255,255,.3)', font: { size: 11 } },
          grid: { color: 'rgba(255,255,255,.05)' },
          border: { color: 'transparent' },
        },
        x: {
          grid: { display: false },
          ticks: { color: 'rgba(255,255,255,.35)', font: { size: 10 } },
          border: { color: 'transparent' },
        },
      },
    },
  });
}

// ══ ACTIVITY FEED ════════════════════════════════════════════════════════
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
    }, { rootMargin: '200px' });
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
  return `<div class="feed-item" style="animation-delay:${idx * 50}ms">
    <div class="feed-header">
      ${avatarHtml(w.userName || '?', w.userPhotoUrl || '', 'lb-avatar', '40')}
      <div class="feed-meta">
        <div class="feed-username">${escHtml(w.userName || 'משתמש')}${isMe ? ' <span class="feed-me-tag">אני</span>' : ''}</div>
        ${w.userUsername ? `<div class="feed-user-at">@${escHtml(w.userUsername)}</div>` : ''}
        <div class="feed-date">${tsStr}</div>
      </div>
      ${isMe ? `<div class="feed-actions-right">
        <button class="feed-icon-btn" onclick="editWorkout('${wid}')">✏️</button>
        <button class="feed-icon-btn" onclick="confirmDeleteWorkout('${wid}')">🗑️</button>
      </div>` : ''}
    </div>
    <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:8px">
      <span class="feed-pill">${w.typeEmoji || '💪'} ${escHtml(w.typeName || w.type)}</span>
      ${w.duration ? `<span class="feed-duration">⏱ ${fmtDuration(w.duration)}</span>` : ''}
    </div>
    ${w.mood  ? `<div class="feed-notes" style="font-style:italic;color:var(--text-2)">💬 ${escHtml(w.mood)}</div>` : ''}
    ${w.notes ? `<div class="feed-notes">${escHtml(w.notes)}</div>` : ''}
    ${w.photoUrl ? `<div class="feed-photo" data-photo="${escHtml(w.photoUrl)}" onclick="viewPhoto(this.dataset.photo)"><img src="${escHtml(w.photoUrl)}" alt="אימון" loading="lazy"></div>` : ''}
    <div class="feed-actions">
      <button class="like-btn${liked ? ' liked' : ''}" id="like-btn-${wid}" onclick="toggleLike('${wid}', this)">
        💪 <span id="like-count-${wid}">${likedBy.length}</span>
      </button>
      <button class="feed-comment-btn" id="comment-toggle-${wid}" onclick="toggleComments('${wid}')">
        💬 <span id="comment-count-${wid}">···</span>
      </button>
    </div>
    <div class="comments-section hidden" id="comments-section-${wid}">
      <div id="comments-list-${wid}"></div>
      <div class="comment-input-row">
        <input class="form-input" id="comment-input-${wid}" placeholder="כתוב תגובה..." style="flex:1">
        <button class="btn-sm" onclick="addComment('${wid}')">שלח</button>
      </div>
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
let storyPaused = false, storyRemaining = 5000, storyStartTime = 0;
let storyPointerStartX = 0, storyPointerStartY = 0, storyLongPressTimer = null;

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
  if (idx < 0) return;
  if (idx >= storyDocs.length) { closeStory(); return; }
  storyIndex   = idx;
  storyPaused  = false;
  storyRemaining = 5000;

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

  // Restart CSS animation
  const fill = document.getElementById('story-progress-fill');
  fill.style.animation = 'none';
  fill.offsetHeight;
  fill.style.animation = 'story-progress 5s linear forwards';

  if (storyTimer) clearTimeout(storyTimer);
  storyStartTime = Date.now();
  storyTimer = setTimeout(() => showStoryAt(storyIndex + 1), 5000);

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
  if (e.target.closest('.story-close, .story-top')) return;
  storyLongPressTimer = setTimeout(() => {
    storyLongPressTimer = null;
    pauseStory();
  }, 180);
}

function onStoryPointerUp(e) {
  const dy = storyPointerStartY - e.clientY;
  const dx = Math.abs(e.clientX - storyPointerStartX);

  // Swipe up → viewer sheet (own stories only)
  if (dy > 60 && dx < 60) {
    clearTimeout(storyLongPressTimer);
    storyLongPressTimer = null;
    pauseStory();
    openStoryViewers();
    return;
  }

  // Let interactive controls handle themselves
  if (e.target.closest('.story-close, .story-views-row, .story-top')) {
    clearTimeout(storyLongPressTimer);
    storyLongPressTimer = null;
    return;
  }

  if (storyLongPressTimer) {
    // Short tap → navigate
    clearTimeout(storyLongPressTimer);
    storyLongPressTimer = null;
    if (e.clientX < window.innerWidth / 2) showStoryAt(storyIndex - 1);
    else showStoryAt(storyIndex + 1);
  } else {
    // Long press release → resume
    if (storyPaused) resumeStory();
  }
}

function onStoryPointerCancel() {
  clearTimeout(storyLongPressTimer);
  storyLongPressTimer = null;
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

async function openStoryViewers() {
  if (storyIndex >= storyDocs.length) return;
  const w = storyDocs[storyIndex].data();
  if (w.userId !== currentUser.uid) return;

  const sheet = document.getElementById('story-viewers-sheet');
  const list  = document.getElementById('story-viewers-list');
  sheet.classList.remove('hidden');
  list.innerHTML = '<div class="viewers-loading">טוען...</div>';

  try {
    const fresh    = await storyDocs[storyIndex].ref.get();
    const raw      = fresh.data().storyViews || {};
    // Support both old array format and new map format
    const viewMap  = Array.isArray(raw)
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
      return {
        uid:     d.id,
        name:    fd.name || fd.displayName || 'משתמש',
        photo:   fd.photoUrl || '',
        view:    viewMap[d.id] || null,
      };
    });

    // Viewers first (most recent), non-viewers at bottom
    friends.sort((a, b) => {
      if (a.view && !b.view) return -1;
      if (!a.view && b.view) return 1;
      if (a.view && b.view) {
        const ta = a.view.viewedAt?.toMillis?.() || 0;
        const tb = b.view.viewedAt?.toMillis?.() || 0;
        return tb - ta;
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
    console.error('openStoryViewers:', err);
    list.innerHTML = '<div class="viewers-empty">שגיאה בטעינה</div>';
  }
}

function closeStoryViewers() {
  document.getElementById('story-viewers-sheet').classList.add('hidden');
  resumeStory();
}

function closeStory() {
  if (storyLongPressTimer) { clearTimeout(storyLongPressTimer); storyLongPressTimer = null; }
  if (storyTimer)          { clearTimeout(storyTimer); storyTimer = null; }
  storyPaused = false;
  document.getElementById('story-overlay').classList.add('hidden');
  loadStories();
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
    // onSnapshot in subscribeComments will update the list automatically
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

// ══ FRIENDS ══════════════════════════════════════════════════════════════
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
      return `<div class="friend-item">
        ${avatarHtml(u.name, u.photoUrl || '', 'lb-avatar', '42')}
        <div class="friend-info">
          <div class="friend-name">${escHtml(u.name || 'משתמש')}</div>
          <div class="friend-email">${escHtml(u.email || '')}</div>
        </div>
        <span style="font-size:22px">💪</span>
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
    if (a) setTimeout(() => toast(`🏅 הישג חדש! ${a.emoji} ${a.label}`, 'success'), 900 + i * 700);
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
function renderSettings() { renderProfile(); }

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
        <div class="profile-username">${username ? '@'+escHtml(username) : '<span style="color:var(--text-3)">הוסף שם משתמש ←</span>'}</div>
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
      <div class="section-title">התראות</div>
      <div class="settings-card">
        <div class="settings-row">
          <div><div class="settings-label">תזכורות אימון</div><div class="settings-sub">קבל התראה אם לא התאמנת 2 ימים</div></div>
          <label class="toggle">
            <input type="checkbox" id="notif-toggle" ${p.notifications ? 'checked' : ''} onchange="toggleNotifications(this.checked)">
            <span class="toggle-track"></span>
          </label>
        </div>
      </div>
    </div>
    <button class="btn-danger btn-full" onclick="doSignOut()" style="margin-top:8px">התנתק</button>
  `;
  renderBadges(p.badges);
  initRipples();
}

let _editGender = 'זכר', _editFitnessGoal = 'fitness';

function openEditProfile() {
  const p = userProfile;
  document.getElementById('edit-name').value        = p.name || currentUser.displayName || '';
  document.getElementById('edit-username').value    = p.username || '';
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
  const name       = document.getElementById('edit-name').value.trim();
  const username   = document.getElementById('edit-username').value.trim().toLowerCase();
  const age        = parseInt(document.getElementById('edit-age').value)         || null;
  const height     = parseFloat(document.getElementById('edit-height').value)     || null;
  const weight     = parseFloat(document.getElementById('edit-weight').value)     || null;
  const goalWeight = parseFloat(document.getElementById('edit-goal-weight').value) || null;
  const activityLevel = document.getElementById('edit-activity').value;
  const errEl      = document.getElementById('edit-profile-err');
  const btn        = document.getElementById('edit-profile-save-btn');
  if (!name)     { errEl.textContent = 'נא להזין שם'; return; }
  if (!username) { errEl.textContent = 'נא להזין שם משתמש'; return; }
  if (!/^[a-z0-9_]{3,20}$/.test(username)) { errEl.textContent = 'שם משתמש לא תקין'; return; }
  errEl.textContent = '';
  btn.textContent = 'שומר...'; btn.disabled = true;
  try {
    const oldUsername = userProfile.username || '';
    if (username !== oldUsername) {
      const snap = await db.collection('usernames').doc(username).get();
      if (snap.exists) { errEl.textContent = 'שם המשתמש תפוס'; btn.disabled = false; btn.textContent = 'שמור'; return; }
    }
    const updates = {
      name, username, gender: _editGender, fitnessGoal: _editFitnessGoal, activityLevel,
      ...(age        != null && { age }),
      ...(height     != null && { height }),
      ...(weight     != null && { weight }),
      ...(goalWeight != null && { goalWeight }),
    };
    const batch = db.batch();
    batch.update(db.collection('users').doc(currentUser.uid), updates);
    if (username !== oldUsername) {
      batch.set(db.collection('usernames').doc(username), { uid: currentUser.uid, email: currentUser.email });
      if (oldUsername) batch.delete(db.collection('usernames').doc(oldUsername));
    }
    await batch.commit();
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

async function toggleNotifications(checked) {
  if (checked) { await setupPushNotifications(); }
  else {
    try { await db.collection('users').doc(currentUser.uid).update({ notifications: false }); toast('התראות כובו'); } catch {}
  }
}

async function setupPushNotifications() {
  if (!messaging) { toast('התראות לא נתמכות בדפדפן זה', 'error'); document.getElementById('notif-toggle').checked = false; return; }
  try {
    const permission = await Notification.requestPermission();
    if (permission !== 'granted') { toast('הרשאת התראות נדחתה', 'error'); document.getElementById('notif-toggle').checked = false; return; }
    const token = await messaging.getToken({ vapidKey: VAPID_KEY });
    if (token) {
      await db.collection('users').doc(currentUser.uid).update({ fcmToken: token, notifications: true });
      toast('התראות הופעלו! 🔔', 'success');
    }
  } catch (err) { toast('שגיאה', 'error'); document.getElementById('notif-toggle').checked = false; }
}

// ══ BOOT ═════════════════════════════════════════════════════════════════
async function loadUserProfile() {
  try {
    const doc = await db.collection('users').doc(currentUser.uid).get();
    if (doc.exists) {
      userProfile = doc.data();
    } else {
      userProfile = { goal: 3, friendIds: [], badges: [] };
      await db.collection('users').doc(currentUser.uid).set({
        name: currentUser.displayName || '', email: currentUser.email || '',
        goal: 3, friendIds: [], badges: [],
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
    }
  } catch { userProfile = { goal: 3, friendIds: [], badges: [] }; }
}

auth.onAuthStateChanged(async user => {
  if (user) {
    currentUser = user;
    await loadUserProfile();

    setHeaderAvatar();
    if (userProfile.notifications) document.getElementById('notif-toggle').checked = true;

    document.getElementById('auth-screen').classList.add('hidden');
    document.getElementById('app').classList.remove('hidden');

    initScrollEffects();
    setTimeout(() => { moveNavIndicator('home'); initRipples(); }, 50);

    // Subscribe to workouts; load home once first snapshot arrives
    subscribeWorkouts(() => loadHomeView());

    if ('serviceWorker' in navigator) navigator.serviceWorker.register('./sw.js').catch(() => {});
  } else {
    if (workoutsUnsubscribe) { workoutsUnsubscribe(); workoutsUnsubscribe = null; }
    if (feedObserver)        { feedObserver.disconnect(); feedObserver = null; }
    if (storyTimer)          { clearTimeout(storyTimer); storyTimer = null; }
    Object.values(commentListeners).forEach(u => u());
    Object.keys(commentListeners).forEach(k => delete commentListeners[k]);
    currentUser = null; userProfile = { goal: 3, friendIds: [], badges: [] };
    reminderDismissed = false; cachedUserDocs = []; goalWasHit = false; currentTab = 'home';
    feedAllDocs = []; feedOffset = 0; achFilter = 'all';
    if (progressChart) { progressChart.destroy(); progressChart = null; }
    document.getElementById('auth-screen').classList.remove('hidden');
    document.getElementById('app').classList.add('hidden');
  }
});
