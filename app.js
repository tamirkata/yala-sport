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
  // ── צעדים ראשונים ──
  { key:'first_workout',    emoji:'🥇', label:'הצעד הראשון',      desc:'סיימת את האימון הראשון שלך!',             rarity:'common',    cat:'first'  },
  { key:'first_gym',        emoji:'🏋️', label:'מרים ברזל',        desc:'נכנסת לחדר כושר לראשונה',                 rarity:'common',    cat:'first'  },
  { key:'first_run',        emoji:'🏃', label:'הריצה הראשונה',    desc:'יצאת לרוץ לראשונה',                       rarity:'common',    cat:'first'  },
  { key:'first_swim',       emoji:'🏊', label:'לשחות!',           desc:'שחית לראשונה',                            rarity:'common',    cat:'first'  },
  { key:'first_basketball', emoji:'🏀', label:'כדורסל!',          desc:'שיחקת כדורסל לראשונה',                    rarity:'common',    cat:'first'  },
  { key:'first_tennis',     emoji:'🎾', label:'אייס!',            desc:'שיחקת טניס לראשונה',                      rarity:'common',    cat:'first'  },
  { key:'first_padel',      emoji:'🏓', label:'פאדל מאסטר',       desc:'שיחקת פאדל לראשונה',                      rarity:'common',    cat:'first'  },
  { key:'first_treadmill',  emoji:'🔁', label:'על הליכון',         desc:'רצת על הליכון לראשונה',                  rarity:'common',    cat:'first'  },
  { key:'first_photo',      emoji:'📷', label:'ספורטוגרף',        desc:'העלית תמונה ראשונה עם אימון',             rarity:'common',    cat:'first'  },
  { key:'first_friend',     emoji:'👥', label:'חבר ראשון',        desc:'הוספת חבר ראשון ליאלה',                   rarity:'common',    cat:'first'  },
  { key:'first_like_recv',  emoji:'💪', label:'קיבלת לייק!',      desc:'קיבלת לייק ראשון על אימון',               rarity:'common',    cat:'first'  },
  { key:'first_comment',    emoji:'💬', label:'תגובה ראשונה',     desc:'כתבת תגובה ראשונה',                       rarity:'common',    cat:'first'  },
  // ── רצפים ──
  { key:'streak_3',         emoji:'🔥', label:'3 ימים רצוף',      desc:'התאמנת 3 ימים ברצף',                      rarity:'common',    cat:'streak' },
  { key:'streak_7',         emoji:'🔥', label:'שבוע בוער',        desc:'התאמנת 7 ימים ברצף',                      rarity:'rare',      cat:'streak' },
  { key:'streak_14',        emoji:'🔥', label:'שבועיים אש',       desc:'התאמנת 14 ימים ברצף',                     rarity:'rare',      cat:'streak' },
  { key:'streak_30',        emoji:'💥', label:'חודש בוער',        desc:'התאמנת 30 ימים ברצף',                     rarity:'epic',      cat:'streak' },
  { key:'streak_60',        emoji:'🌋', label:'60 ימים',          desc:'התאמנת 60 ימים ברצף',                     rarity:'epic',      cat:'streak' },
  { key:'streak_100',       emoji:'⚡', label:'100 ימים!',        desc:'מאה ימי אימון ברצף — מדהים!',             rarity:'legendary', cat:'streak' },
  // ── נפח ──
  { key:'workouts_5',       emoji:'🌱', label:'מתחיל',            desc:'5 אימונים סה"כ',                          rarity:'common',    cat:'volume' },
  { key:'workouts_10',      emoji:'💪', label:'מתרגל',            desc:'10 אימונים סה"כ',                         rarity:'common',    cat:'volume' },
  { key:'workouts_25',      emoji:'🏅', label:'שגרה בריאה',       desc:'25 אימונים סה"כ',                         rarity:'common',    cat:'volume' },
  { key:'workouts_50',      emoji:'🥈', label:'ספורטאי מנוסה',    desc:'50 אימונים סה"כ',                         rarity:'rare',      cat:'volume' },
  { key:'workouts_100',     emoji:'💯', label:'100 אימונים',      desc:'מאה אימונים — מאה אחוז!',                 rarity:'rare',      cat:'volume' },
  { key:'workouts_200',     emoji:'🥇', label:'ספורטאי רציני',    desc:'200 אימונים סה"כ',                        rarity:'epic',      cat:'volume' },
  { key:'workouts_365',     emoji:'📅', label:'שנה שלמה',         desc:'365 אימונים — שנה של כושר!',              rarity:'epic',      cat:'volume' },
  { key:'workouts_500',     emoji:'👑', label:'לגנד',             desc:'500 אימונים — אלוף!',                     rarity:'legendary', cat:'volume' },
  { key:'workouts_1000',    emoji:'🏆', label:'אל הכושר',         desc:'1000 אימונים — יש כאלה!',                 rarity:'legendary', cat:'volume' },
  // ── מגוון ──
  { key:'variety_3',        emoji:'🎨', label:'מגוון',            desc:'ניסית 3 סוגי אימון שונים',                rarity:'common',    cat:'variety' },
  { key:'variety_5',        emoji:'🌈', label:'ספורטאי מגוון',    desc:'ניסית 5 סוגי אימון שונים',                rarity:'rare',      cat:'variety' },
  { key:'variety_all',      emoji:'🎭', label:'ספורטאי שלם',      desc:'ניסית את כל 8 סוגי האימון',               rarity:'epic',      cat:'variety' },
  { key:'same_type_10',     emoji:'🎯', label:'מתמחה',            desc:'10 אימונים מאותו סוג',                    rarity:'common',    cat:'variety' },
  { key:'same_type_50',     emoji:'🔬', label:'מומחה',            desc:'50 אימונים מאותו סוג',                    rarity:'rare',      cat:'variety' },
  // ── יעדים שבועיים ──
  { key:'weekly_goal_1',    emoji:'✅', label:'יעד ראשון',        desc:'השגת את היעד השבועי לראשונה',             rarity:'common',    cat:'goals'  },
  { key:'weekly_goal_4',    emoji:'📆', label:'4 שבועות',         desc:'השגת את היעד השבועי 4 פעמים',             rarity:'common',    cat:'goals'  },
  { key:'weekly_goal_10',   emoji:'🔟', label:'10 שבועות',        desc:'השגת את היעד השבועי 10 פעמים',            rarity:'rare',      cat:'goals'  },
  { key:'weekly_goal_20',   emoji:'🌟', label:'20 שבועות',        desc:'השגת את היעד השבועי 20 פעמים',            rarity:'epic',      cat:'goals'  },
  { key:'weekly_goal_52',   emoji:'🎊', label:'שנה של יעדים',     desc:'השגת את היעד השבועי 52 פעמים',            rarity:'legendary', cat:'goals'  },
  { key:'overachieve',      emoji:'🚀', label:'מעבר ליעד',        desc:'השלמת פי 2 מהיעד השבועי שלך',            rarity:'rare',      cat:'goals'  },
  { key:'perfect_week_4',   emoji:'🏆', label:'חודש מושלם',       desc:'4 שבועות ברצף עם יעד שבועי מלא',         rarity:'epic',      cat:'goals'  },
  // ── חברתי ──
  { key:'friends_5',        emoji:'🤝', label:'חמישה חברים',      desc:'הוספת 5 חברים ליאלה',                     rarity:'common',    cat:'social' },
  { key:'friends_10',       emoji:'🎉', label:'פופולרי',          desc:'הוספת 10 חברים ליאלה',                    rarity:'rare',      cat:'social' },
  { key:'likes_10',         emoji:'❤️', label:'אהוב',             desc:'קיבלת 10 לייקים על אימונים',              rarity:'rare',      cat:'social' },
  { key:'likes_50',         emoji:'🌟', label:'כוכב',             desc:'קיבלת 50 לייקים',                         rarity:'epic',      cat:'social' },
  { key:'likes_100',        emoji:'💫', label:'סופרסטאר',         desc:'קיבלת 100 לייקים',                        rarity:'legendary', cat:'social' },
  { key:'comments_10',      emoji:'🗣️', label:'מגיב פעיל',        desc:'כתבת 10 תגובות',                          rarity:'common',    cat:'social' },
  { key:'comments_50',      emoji:'💬', label:'דיון פעיל',        desc:'כתבת 50 תגובות',                          rarity:'rare',      cat:'social' },
  { key:'liked_others_10',  emoji:'🙌', label:'מעריך',            desc:'נתת לייק ל-10 אימונים של חברים',          rarity:'common',    cat:'social' },
  { key:'liked_others_50',  emoji:'💞', label:'תומך',             desc:'נתת לייק ל-50 אימונים',                   rarity:'rare',      cat:'social' },
  { key:'group_workout',    emoji:'👫', label:'אימון יחד',        desc:'חבר שלך התאמן באותו יום',                 rarity:'common',    cat:'social' },
  // ── זמן ──
  { key:'early_bird',       emoji:'🌅', label:'עוף מוקדם',        desc:'התאמנת לפני 7 בבוקר',                     rarity:'rare',      cat:'time'   },
  { key:'dawn_patrol',      emoji:'🌄', label:'פטרול שחר',        desc:'התאמנת לפני 6 בבוקר',                     rarity:'epic',      cat:'time'   },
  { key:'morning_5',        emoji:'☀️', label:'5 בקרים',           desc:'התאמנת 5 פעמים בבוקר (לפני 9)',          rarity:'common',    cat:'time'   },
  { key:'morning_20',       emoji:'🌞', label:'20 בקרים',          desc:'התאמנת 20 פעמים בבוקר',                  rarity:'rare',      cat:'time'   },
  { key:'night_owl',        emoji:'🦉', label:'ינשוף הלילה',      desc:'התאמנת אחרי 22:00',                       rarity:'rare',      cat:'time'   },
  { key:'night_5',          emoji:'🌙', label:'5 לילות',           desc:'התאמנת 5 פעמים בלילה (אחרי 21)',          rarity:'common',    cat:'time'   },
  { key:'weekend_warrior',  emoji:'🗓️', label:'לוחם סופ"ש',       desc:'התאמנת בשבת ובראשון',                    rarity:'common',    cat:'time'   },
  { key:'long_session',     emoji:'⏱️', label:'מרתון',            desc:'אימון של שעה ויותר',                      rarity:'rare',      cat:'time'   },
  { key:'super_long',       emoji:'🕐', label:'אולטרה',           desc:'אימון של שעתיים ויותר',                   rarity:'epic',      cat:'time'   },
  { key:'quick_fire',       emoji:'⚡', label:'מהיר כברק',        desc:'אימון קצר של עד 20 דקות',                rarity:'common',    cat:'time'   },
  // ── חודשי ──
  { key:'monthly_goal',     emoji:'📅', label:'יעד חודשי',        desc:'השגת את היעד החודשי',                     rarity:'rare',      cat:'monthly'},
  { key:'monthly_double',   emoji:'💥', label:'חודש כפול',        desc:'הכפלת את היעד החודשי',                    rarity:'epic',      cat:'monthly'},
  { key:'every_month_6',    emoji:'📊', label:'חצי שנה',          desc:'יעד חודשי 6 חודשים ברצף',                rarity:'epic',      cat:'monthly'},
  { key:'every_month_12',   emoji:'🎊', label:'שנה של יעדים',     desc:'יעד חודשי 12 חודשים ברצף',               rarity:'legendary', cat:'monthly'},
  // ── ספציפי לסוג ──
  { key:'gym_20',           emoji:'🏋️', label:'חדר כושר קבוע',   desc:'20 אימוני חדר כושר',                      rarity:'common',    cat:'type'   },
  { key:'gym_100',          emoji:'🦍', label:'בודיבילדר',        desc:'100 אימוני חדר כושר',                     rarity:'epic',      cat:'type'   },
  { key:'run_20',           emoji:'🏃', label:'רץ',               desc:'20 אימוני ריצה',                          rarity:'common',    cat:'type'   },
  { key:'run_50',           emoji:'🥇', label:'מרתוניסט',         desc:'50 אימוני ריצה',                          rarity:'rare',      cat:'type'   },
  { key:'swim_10',          emoji:'🏊', label:'שחיין',            desc:'10 שיחיות',                               rarity:'common',    cat:'type'   },
  { key:'swim_30',          emoji:'🐬', label:'דולפין',           desc:'30 שיחיות',                               rarity:'rare',      cat:'type'   },
  { key:'bball_10',         emoji:'🏀', label:'שחקן כדורסל',      desc:'10 משחקי כדורסל',                         rarity:'common',    cat:'type'   },
  { key:'tennis_10',        emoji:'🎾', label:'טניסאי',           desc:'10 אימוני טניס',                          rarity:'common',    cat:'type'   },
  { key:'padel_10',         emoji:'🏓', label:'פאדל פרו',         desc:'10 אימוני פאדל',                          rarity:'common',    cat:'type'   },
  { key:'treadmill_20',     emoji:'🔁', label:'הליכון מקצועי',    desc:'20 אימוני הליכון',                        rarity:'common',    cat:'type'   },
  // ── מדיה ──
  { key:'photos_5',         emoji:'📸', label:'אלבום כושר',       desc:'העלית 5 תמונות אימון',                    rarity:'common',    cat:'media'  },
  { key:'photos_20',        emoji:'🎞️', label:'צלם כושר',         desc:'העלית 20 תמונות אימון',                   rarity:'rare',      cat:'media'  },
  { key:'stories_5',        emoji:'🎬', label:'סטוריז קבוע',      desc:'פרסמת 5 סטוריז',                          rarity:'common',    cat:'media'  },
  { key:'stories_20',       emoji:'🎥', label:'יוטיובר כושר',     desc:'פרסמת 20 סטוריז',                         rarity:'rare',      cat:'media'  },
  { key:'mood_writer',      emoji:'✍️', label:'יומן כושר',        desc:'הוספת תיאור ל-10 אימונים',                rarity:'common',    cat:'media'  },
  // ── עקביות ──
  { key:'no_skip_month',    emoji:'📆', label:'ללא דילוג',         desc:'לא פספסת שבוע במשך חודש',                rarity:'epic',      cat:'consist'},
  { key:'rain_or_shine',    emoji:'🌦️', label:'בכל מזג אוויר',    desc:'4 שבועות ברצף עם לפחות אימון אחד',       rarity:'rare',      cat:'consist'},
  { key:'mon_to_fri',       emoji:'5️⃣', label:'5 ימי עבודה',      desc:'5 אימונים מיום א׳ עד ה׳',                rarity:'rare',      cat:'consist'},
  // ── אתגרים ──
  { key:'5_in_week',        emoji:'5️⃣', label:'שבוע אש',          desc:'5 אימונים בשבוע אחד',                     rarity:'rare',      cat:'chall'  },
  { key:'7_in_week',        emoji:'7️⃣', label:'שבוע מדהים',       desc:'7 אימונים בשבוע אחד',                     rarity:'epic',      cat:'chall'  },
  { key:'double_day',       emoji:'✌️', label:'יום כפול',          desc:'שני אימונים ביום אחד',                    rarity:'rare',      cat:'chall'  },
  { key:'diverse_week',     emoji:'🎨', label:'שבוע צבעוני',      desc:'3 סוגי אימון שונים באותו שבוע',           rarity:'rare',      cat:'chall'  },
  { key:'best_week',        emoji:'📈', label:'שבוע השיא',         desc:'שבוע עם יותר אימונים מתמיד',              rarity:'rare',      cat:'chall'  },
  { key:'top_leaderboard',  emoji:'🥇', label:'ראשון בליגה',       desc:'הגעת למקום ראשון בלוח השיאים',            rarity:'epic',      cat:'chall'  },
  // ── שוברי קוד ──
  { key:'comeback',         emoji:'🔄', label:'חזרה לעניינים',     desc:'חזרת לאמן אחרי הפסקה של שבוע',           rarity:'common',    cat:'special'},
  { key:'gym_rat',          emoji:'🐀', label:'חולדת הכושר',      desc:'50 אימוני חדר כושר',                      rarity:'rare',      cat:'special'},
  { key:'friday_sport',     emoji:'🌅', label:'שישי ספורט',       desc:'התאמנת 5 פעמים ביום שישי',                rarity:'common',    cat:'special'},
  { key:'jan_1',            emoji:'🥂', label:'שנה חדשה חדשה',    desc:'התאמנת ב-1 בינואר',                       rarity:'rare',      cat:'special'},
  { key:'good_mood',        emoji:'😊', label:'אנרגיה טובה',      desc:'הוספת הרגשה חיובית ל-5 אימונים',          rarity:'common',    cat:'special'},
  { key:'app_day_1',        emoji:'📱', label:'ברוך הבא!',         desc:'הצטרפת ליאלה ספורט',                      rarity:'common',    cat:'special'},
  // ── משך זמן ──
  { key:'total_10h',        emoji:'⏱️', label:'10 שעות',           desc:'10 שעות מצטברות של אימונים',              rarity:'common',    cat:'duration'},
  { key:'total_50h',        emoji:'🕐', label:'50 שעות',           desc:'50 שעות מצטברות',                         rarity:'rare',      cat:'duration'},
  { key:'total_100h',       emoji:'💯', label:'100 שעות',          desc:'100 שעות מצטברות',                        rarity:'epic',      cat:'duration'},
  { key:'total_500h',       emoji:'🏆', label:'500 שעות',          desc:'500 שעות — מקצועי לגמרי!',               rarity:'legendary', cat:'duration'},
  // ── אגדות ──
  { key:'ach_25',           emoji:'⭐', label:'25 הישגים',         desc:'השגת 25 הישגים',                          rarity:'rare',      cat:'meta'   },
  { key:'ach_50',           emoji:'🌟', label:'50 הישגים',         desc:'השגת 50 הישגים',                          rarity:'epic',      cat:'meta'   },
  { key:'legend',           emoji:'⚡', label:'אגדה',              desc:'השגת 100 הישגים',                         rarity:'legendary', cat:'meta'   },
  { key:'completionist',    emoji:'💎', label:'קומפלטיוניסט',      desc:'השגת 150 הישגים',                         rarity:'legendary', cat:'meta'   },
];

const ACH_RARITY_COLOR = {
  common:    { bg:'rgba(255,255,255,.07)', border:'rgba(255,255,255,.15)', text:'var(--text-3)', glow:'' },
  rare:      { bg:'rgba(59,130,246,.1)',   border:'rgba(59,130,246,.35)',  text:'#60A5FA',       glow:'0 0 16px rgba(59,130,246,.3)' },
  epic:      { bg:'rgba(139,92,246,.12)',  border:'rgba(139,92,246,.4)',   text:'#A78BFA',       glow:'0 0 16px rgba(139,92,246,.35)' },
  legendary: { bg:'rgba(255,208,60,.12)',  border:'rgba(255,208,60,.45)',  text:'#FFD060',       glow:'0 0 20px rgba(255,208,60,.45)' },
};

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
  const email    = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value;
  const errEl    = document.getElementById('login-err');
  const btn      = document.getElementById('login-btn');
  errEl.textContent = '';
  btn.textContent = 'נכנס...'; btn.disabled = true;
  try {
    await auth.signInWithEmailAndPassword(email, password);
  } catch (err) {
    errEl.textContent = authErr(err.code);
    btn.disabled = false; btn.textContent = 'כניסה →';
  }
}

async function doRegister(e) {
  e.preventDefault();
  const name     = document.getElementById('reg-name').value.trim();
  const email    = document.getElementById('reg-email').value.trim();
  const password = document.getElementById('reg-password').value;
  const errEl    = document.getElementById('reg-err');
  const btn      = document.getElementById('reg-btn');
  if (!name) { errEl.textContent = 'נא להזין שם'; return; }
  errEl.textContent = '';
  btn.textContent = 'נרשם...'; btn.disabled = true;
  try {
    const cred = await auth.createUserWithEmailAndPassword(email, password);
    await cred.user.updateProfile({ displayName: name });
    await db.collection('users').doc(cred.user.uid).set({
      name, email, goal: 3, friendIds: [], badges: [],
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
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
        userId: currentUser.uid, userName: currentUser.displayName || '',
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
      const w = doc.data();
      const seen = seenStories.has(doc.id);
      return `<div class="story-item" onclick="openStory(${i})">
        <div class="story-ring${seen ? ' seen' : ''}">
          ${w.userPhotoUrl
            ? `<img class="story-avatar-img" src="${escHtml(w.userPhotoUrl)}" alt="">`
            : `<div class="story-avatar-img" style="background:var(--grad);display:flex;align-items:center;justify-content:center;font-size:18px;font-weight:800;color:#fff">${escHtml(avatarOf(w.userName || '?'))}</div>`}
        </div>
        <div class="story-name">${escHtml((w.userName || '?').split(' ')[0])}</div>
      </div>`;
    }).join('');
  } catch (err) { console.error('Stories:', err); }
}

function openStory(idx) {
  storyIndex = idx;
  showStoryAt(storyIndex);
  document.getElementById('story-overlay').classList.remove('hidden');
}

function showStoryAt(idx) {
  if (idx >= storyDocs.length) { closeStory(); return; }
  const doc = storyDocs[idx];
  const w   = doc.data();
  seenStories.add(doc.id);
  try { localStorage.setItem('seenStories', JSON.stringify([...seenStories])); } catch {}
  document.getElementById('story-img').src = w.photoUrl;
  const userInfo = document.getElementById('story-user-info');
  userInfo.innerHTML = `
    ${avatarHtml(w.userName || '?', w.userPhotoUrl || '', 'lb-avatar', '36')}
    <div style="margin-right:8px">
      <div class="story-user-name">${escHtml(w.userName || 'משתמש')}</div>
      <div class="story-time">${w.createdAt ? timeAgo(w.createdAt) : fmtDate(w.date)}</div>
    </div>`;
  const cap = document.getElementById('story-caption-bar');
  cap.innerHTML = (w.typeEmoji || w.notes || w.mood) ? `
    <span class="story-pill">${w.typeEmoji || '💪'} ${escHtml(w.typeName || w.type)}</span>
    ${w.mood  ? `<div class="story-caption-text" style="margin-top:6px">💬 ${escHtml(w.mood)}</div>`  : ''}
    ${w.notes ? `<div class="story-caption-text" style="margin-top:4px">${escHtml(w.notes)}</div>` : ''}` : '';
  // Progress bar animation
  const fill = document.getElementById('story-progress-fill');
  fill.style.transition = 'none'; fill.style.width = '0%';
  fill.offsetHeight;
  fill.style.transition = 'width 5s linear'; fill.style.width = '100%';
  if (storyTimer) clearTimeout(storyTimer);
  storyTimer = setTimeout(() => showStoryAt(storyIndex + 1), 5000);
}

function closeStory() {
  document.getElementById('story-overlay').classList.add('hidden');
  if (storyTimer) { clearTimeout(storyTimer); storyTimer = null; }
  // Refresh story rings (seen state)
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
            <div class="comment-author">${escHtml(c.userName || 'משתמש')}</div>
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
      userName: currentUser.displayName || '',
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
  // Sort: earned first, then by rarity
  const rarityOrder = { legendary: 0, epic: 1, rare: 2, common: 3 };
  list = [...list].sort((a, b) => {
    const ae = earned.has(a.key), be = earned.has(b.key);
    if (ae !== be) return ae ? -1 : 1;
    return (rarityOrder[a.rarity] || 3) - (rarityOrder[b.rarity] || 3);
  });

  const grid = document.getElementById('achievements-grid');
  if (!list.length) { grid.innerHTML = '<div class="empty-state" style="grid-column:1/-1">אין הישגים בקטגוריה זו</div>'; return; }
  grid.innerHTML = list.map(a => {
    const isEarned = earned.has(a.key);
    const rc = ACH_RARITY_COLOR[a.rarity] || ACH_RARITY_COLOR.common;
    const rarityLabel = { common: 'נפוץ', rare: 'נדיר', epic: 'אפי', legendary: 'אגדי' }[a.rarity] || '';
    return `<div class="ach-card ${isEarned ? 'earned' : 'locked'}" style="background:${rc.bg};border:1px solid ${rc.border};${isEarned ? `box-shadow:${rc.glow}` : ''}">
      <div class="ach-emoji">${a.emoji}</div>
      <div class="ach-info">
        <div class="ach-name" style="color:${isEarned ? rc.text : 'var(--text-2)'}">${a.label}</div>
        <div class="ach-desc">${isEarned ? a.desc : '🔒 ' + a.desc}</div>
        <span class="ach-rarity" style="color:${rc.text}">${rarityLabel}</span>
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

// ══ SETTINGS ═════════════════════════════════════════════════════════════
function renderSettings() {
  if (!currentUser) return;
  const name     = currentUser.displayName || 'ספורטאי';
  const photoUrl = userProfile.photoUrl || currentUser.photoURL || '';
  document.getElementById('settings-name').textContent  = name;
  document.getElementById('settings-email').textContent = currentUser.email;
  const avatarEl = document.getElementById('settings-avatar');
  if (photoUrl) {
    avatarEl.innerHTML = `<img src="${escHtml(photoUrl)}" alt="${escHtml(avatarOf(name))}" style="width:100%;height:100%;object-fit:cover;display:block;border-radius:50%" onerror="this.parentElement.textContent='${escHtml(avatarOf(name))}'">`;
  } else {
    avatarEl.textContent = avatarOf(name);
  }
  document.getElementById('goal-display').textContent = userProfile.goal || 3;
  renderBadges(userProfile.badges);
  initRipples();
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
