// ══ CONSTANTS ═══════════════════════════════════════════════════════════
const WORKOUT_TYPES = [
  { key: 'run',        emoji: '🏃', label: 'ריצה'     },
  { key: 'gym',        emoji: '🏋️', label: 'חדר כושר' },
  { key: 'swim',       emoji: '🏊', label: 'שחייה'     },
  { key: 'bike',       emoji: '🚴', label: 'אופניים'   },
  { key: 'yoga',       emoji: '🧘', label: 'יוגה'       },
  { key: 'basketball', emoji: '🏀', label: 'כדורסל'     },
  { key: 'football',   emoji: '⚽', label: 'כדורגל'     },
  { key: 'other',      emoji: '💪', label: 'אחר'        },
];
const FINE_PER_WORKOUT = 10;
const ACHIEVEMENTS = [
  { key: 'first_workout', emoji: '🏅', label: 'אימון\nראשון'  },
  { key: 'streak_7',      emoji: '🔥', label: '7 ימים\nרצוף'  },
  { key: 'workouts_10',   emoji: '💪', label: '10\nאימונים'    },
  { key: 'monthly_goal',  emoji: '🎯', label: 'יעד\nחודשי'     },
  { key: 'workouts_30',   emoji: '🏆', label: '30\nאימונים'    },
];

// ══ FIREBASE ═════════════════════════════════════════════════════════════
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db   = firebase.firestore();
let messaging;
try { messaging = firebase.messaging(); } catch (e) {}

// ══ STATE ════════════════════════════════════════════════════════════════
let currentUser       = null;
let userProfile       = { goal: 3 };
let leaderboardPeriod = 'weekly';
let selectedType      = '';
let reminderDismissed = false;
let editingWorkoutId  = null;
let chartPeriod       = 'weekly';
let progressChart     = null;
let cachedUserDocs    = [];
let goalWasHit        = false;
let currentTab        = 'home';

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

  if (tab === 'leaderboard') loadLeaderboard();
  if (tab === 'fines')       loadFines();
  if (tab === 'settings')    renderSettings();
  if (tab === 'friends')     loadFriendsView();
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

function weekKey(offsetWeeks = 0) {
  const d = new Date();
  d.setDate(d.getDate() - d.getDay() + offsetWeeks * 7);
  d.setHours(0, 0, 0, 0);
  return d.toISOString().slice(0, 10);
}

function monthKey(d = new Date()) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
}

function dateToWeekKey(dateStr) {
  const d = new Date(dateStr + 'T12:00:00');
  d.setDate(d.getDate() - d.getDay());
  return d.toISOString().slice(0, 10);
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
  document.getElementById('workout-date').value  = isEdit ? workoutData.date : new Date().toISOString().slice(0, 10);
  document.getElementById('workout-notes').value = isEdit ? (workoutData.notes || '') : '';
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
  const notes = document.getElementById('workout-notes').value.trim();
  const t     = WORKOUT_TYPES.find(x => x.key === selectedType);
  const btn   = document.getElementById('submit-workout-btn');
  btn.disabled = true; btn.textContent = 'שומר...';
  try {
    if (editingWorkoutId) {
      await db.collection('workouts').doc(editingWorkoutId).update({
        type: selectedType, typeEmoji: t.emoji, typeName: t.label,
        date: dateVal, weekKey: dateToWeekKey(dateVal),
        monthKey: dateVal.slice(0, 7), notes: notes || null,
      });
      toast('האימון עודכן ✓', 'success');
    } else {
      await db.collection('workouts').add({
        userId: currentUser.uid, userName: currentUser.displayName || '',
        type: selectedType, typeEmoji: t.emoji, typeName: t.label,
        date: dateVal, weekKey: dateToWeekKey(dateVal),
        monthKey: dateVal.slice(0, 7), notes: notes || null,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
      toast('האימון נרשם! 💪', 'success');
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
async function loadHomeView() {
  if (!currentUser) return;
  const wKey  = weekKey();
  const goal  = userProfile.goal || 3;
  const name  = currentUser.displayName || 'ספורטאי';
  const first = name.split(/\s+/)[0];

  document.getElementById('header-week-label').textContent = `שבוע ${wKey}`;
  document.getElementById('hero-denom').textContent        = String(goal);

  const greetEl = document.getElementById('hero-greeting');
  if (greetEl) {
    greetEl.innerHTML = `שלום, ${escHtml(first)}! <span class="wave" style="display:inline-block;animation:wave 1.5s ease .3s 1">👋</span>`;
  }

  // Show skeletons while loading
  document.getElementById('activity-feed').innerHTML = skeletonFeed(3);

  const snap     = await db.collection('workouts').where('userId', '==', currentUser.uid).get();
  cachedUserDocs = snap.docs.sort((a, b) => b.data().date.localeCompare(a.data().date));

  const weekCount = cachedUserDocs.filter(d => d.data().weekKey === wKey).length;
  const pct       = Math.min(100, Math.round((weekCount / goal) * 100));
  const remaining = Math.max(0, goal - weekCount);

  // Animated counter
  animateCounter(document.getElementById('hero-num'), weekCount);
  document.getElementById('week-count-badge').textContent = `${weekCount} 🏋️`;

  // Ring fill
  updateHeroRing(pct);
  updateAvatarRing(pct);

  if (remaining === 0) {
    document.getElementById('hero-sub').textContent       = 'השגת את היעד השבועי! 🎉';
    document.getElementById('hero-prog-text').textContent = 'כל הכבוד! 🏆';
    if (!goalWasHit) {
      goalWasHit = true;
      setTimeout(launchConfetti, 600);
    }
  } else {
    document.getElementById('hero-sub').textContent       = 'יאלה, נמשיך!';
    document.getElementById('hero-prog-text').textContent = `עוד ${remaining} אימונים לסיום היעד`;
    goalWasHit = false;
  }

  renderProgressChart();
  loadActivityFeed();
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
      const wk = weekKey(-i);
      const d  = new Date(wk + 'T12:00:00');
      labels.push(`${d.getDate()}/${d.getMonth() + 1}`);
      data.push(cachedUserDocs.filter(doc => doc.data().weekKey === wk).length);
    }
  } else {
    const now = new Date();
    for (let i = 5; i >= 0; i--) {
      const d  = new Date(now.getFullYear(), now.getMonth() - i, 1);
      labels.push(hebrewMonths[d.getMonth()]);
      data.push(cachedUserDocs.filter(doc => doc.data().monthKey === monthKey(d)).length);
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
async function loadActivityFeed() {
  const el = document.getElementById('activity-feed');
  try {
    const friendIds = userProfile.friendIds || [];
    const allUids   = [currentUser.uid, ...friendIds].slice(0, 10);
    const snaps     = await Promise.all(
      allUids.map(uid => db.collection('workouts').where('userId', '==', uid).get())
    );
    const allDocs = snaps
      .flatMap(s => s.docs)
      .sort((a, b) => {
        const ta = a.data().createdAt?.toMillis?.() || new Date(a.data().date + 'T12:00:00').getTime();
        const tb = b.data().createdAt?.toMillis?.() || new Date(b.data().date + 'T12:00:00').getTime();
        return tb - ta;
      })
      .slice(0, 20);

    if (!allDocs.length) {
      el.innerHTML = `<div class="empty-state"><div class="empty-icon">👥</div>אין פעילות עדיין<br><small style="font-size:13px;color:var(--text-3)">הוסף חברים כדי לראות את הפעילות שלהם</small></div>`;
      return;
    }
    el.innerHTML = allDocs.map((doc, i) => renderFeedItem(doc, i)).join('');
    loadCommentCounts(allDocs.map(d => d.id));
    initRipples();
  } catch (err) {
    el.innerHTML = '<div class="empty-state">שגיאה בטעינת הפעילות</div>';
    console.error(err);
  }
}

function renderFeedItem(doc, idx = 0) {
  const w    = doc.data();
  const wid  = doc.id;
  const isMe = w.userId === currentUser?.uid;
  return `<div class="feed-item" style="animation-delay:${idx * 50}ms">
    <div class="feed-header">
      <div class="lb-avatar" style="width:40px;height:40px;font-size:14px;flex-shrink:0">${avatarOf(w.userName || '?')}</div>
      <div class="feed-meta">
        <div class="feed-username">${escHtml(w.userName || 'משתמש')}${isMe ? ' <span style="color:var(--primary);font-size:10px;font-weight:800;background:rgba(255,107,53,.12);padding:2px 7px;border-radius:99px;border:1px solid rgba(255,107,53,.2)">אני</span>' : ''}</div>
        <div class="feed-date">${fmtDate(w.date)}</div>
      </div>
      ${isMe ? `<div class="feed-actions-right">
        <button class="feed-icon-btn" onclick="editWorkout('${wid}')">✏️</button>
        <button class="feed-icon-btn" onclick="confirmDeleteWorkout('${wid}')">🗑️</button>
      </div>` : ''}
    </div>
    <div><span class="feed-pill">${w.typeEmoji || '💪'} ${escHtml(w.typeName || w.type)}</span></div>
    ${w.notes ? `<div class="feed-notes">${escHtml(w.notes)}</div>` : ''}
    <div class="feed-actions">
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

async function toggleComments(wid) {
  const section = document.getElementById(`comments-section-${wid}`);
  const btn     = document.getElementById(`comment-toggle-${wid}`);
  if (!section.classList.contains('hidden')) {
    section.classList.add('hidden'); btn.classList.remove('active'); return;
  }
  section.classList.remove('hidden'); btn.classList.add('active');
  await loadComments(wid);
  initRipples();
}

async function loadComments(wid) {
  const listEl = document.getElementById(`comments-list-${wid}`);
  listEl.innerHTML = '<div style="padding:8px 0;color:var(--text-3);font-size:12px;text-align:center">טוען...</div>';
  try {
    const snap = await db.collection('comments').where('workoutId', '==', wid).get();
    const docs = snap.docs.sort((a, b) =>
      (a.data().createdAt?.toMillis?.() || 0) - (b.data().createdAt?.toMillis?.() || 0));
    const el = document.getElementById(`comment-count-${wid}`);
    if (el) el.textContent = docs.length ? `${docs.length} תגובות` : 'הוסף תגובה';
    if (!docs.length) {
      listEl.innerHTML = '<div style="padding:4px 0;color:var(--text-3);font-size:13px">אין תגובות עדיין</div>';
      return;
    }
    listEl.innerHTML = docs.map(doc => {
      const c = doc.data();
      return `<div class="comment-item">
        <div class="comment-avatar">${avatarOf(c.userName || '?')}</div>
        <div class="comment-body">
          <div class="comment-author">${escHtml(c.userName || 'משתמש')}</div>
          <div class="comment-text">${escHtml(c.text)}</div>
        </div>
      </div>`;
    }).join('');
  } catch (err) {
    listEl.innerHTML = '<div style="color:var(--danger);font-size:12px">שגיאה</div>';
  }
}

async function addComment(wid) {
  const input = document.getElementById(`comment-input-${wid}`);
  const text  = input?.value.trim();
  if (!text) return;
  input.value = '';
  try {
    await db.collection('comments').add({
      workoutId: wid, userId: currentUser.uid,
      userName: currentUser.displayName || '', text,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    loadComments(wid);
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
    const pKey  = leaderboardPeriod === 'weekly' ? weekKey() : monthKey();
    const field = leaderboardPeriod === 'weekly' ? 'weekKey' : 'monthKey';
    const snap  = await db.collection('workouts').where(field, '==', pKey).get();
    const counts = {}, names = {};
    snap.docs.forEach(doc => {
      const w = doc.data();
      counts[w.userId] = (counts[w.userId] || 0) + 1;
      if (!names[w.userId]) names[w.userId] = w.userName || 'משתמש';
    });
    const myGroup = new Set([currentUser.uid, ...(userProfile.friendIds || [])]);
    const sorted  = Object.entries(counts)
      .filter(([uid]) => myGroup.has(uid))
      .sort((a, b) => b[1] - a[1]);
    renderLeaderboard(sorted, names);
  } catch (err) {
    el.innerHTML = '<div class="empty-state">שגיאה בטעינת הליגה</div>';
  }
}

function renderLeaderboard(sorted, names) {
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
      <div class="lb-avatar">${avatarOf(name)}</div>
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
      toUid: targetUid, toName: targetData.name || '', toEmail: email,
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
          <div class="lb-avatar" style="width:42px;height:42px">${avatarOf(r.fromName)}</div>
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
          <div class="lb-avatar" style="width:42px;height:42px">${avatarOf(r.toName)}</div>
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
        <div class="lb-avatar" style="width:42px;height:42px">${avatarOf(u.name)}</div>
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
async function loadFines() {
  const el = document.getElementById('fines-list');
  el.innerHTML = skeletonList(3);
  try {
    const [mySnap, allUnpaidSnap] = await Promise.all([
      db.collection('fines').where('userId', '==', currentUser.uid).get(),
      db.collection('fines').where('paid', '==', false).get(),
    ]);
    const myDocs  = mySnap.docs.sort((a, b) => b.data().weekKey.localeCompare(a.data().weekKey));
    let groupDebt = 0;
    const debtors = new Set();
    allUnpaidSnap.docs.forEach(doc => {
      groupDebt += doc.data().amount || 0;
      debtors.add(doc.data().userId);
    });
    document.getElementById('group-fine-amount').textContent = `₪${groupDebt}`;
    document.getElementById('group-fine-sub').textContent =
      debtors.size ? `${debtors.size} חברים חייבים לקופה` : 'אין חובות — כל הכבוד! 🎉';
    renderFines(myDocs);
    initRipples();
  } catch (err) {
    el.innerHTML = '<div class="empty-state">שגיאה בטעינת הקנסות</div>';
  }
}

function renderFines(docs) {
  const el = document.getElementById('fines-list');
  if (!docs.length) {
    el.innerHTML = `<div class="empty-state"><div class="empty-icon">🎉</div>אין קנסות! המשך כך!</div>`;
    return;
  }
  el.innerHTML = docs.map(doc => {
    const f      = doc.data();
    const paidAt = f.paidAt?.toDate?.()?.toISOString()?.slice(0, 10);
    return `<div class="fine-item">
      <div class="fine-week">שבוע ${f.weekKey}</div>
      <div class="fine-row">
        <div>
          <div class="fine-info">${f.missed} אימונים חסרים</div>
          <div class="fine-detail">הגעת ל-${f.actual} מתוך ${f.goal} יעד</div>
        </div>
        <div class="fine-amount">₪${f.amount}</div>
      </div>
      <div class="fine-row" style="margin-top:12px">
        ${f.paid
          ? `<span class="badge-paid">✓ שולם${paidAt ? ' ' + fmtDate(paidAt) : ''}</span>`
          : `<span class="badge-unpaid">לא שולם</span>
             <button class="btn-success" onclick="markFinePaid('${doc.id}')">סמן כשולם</button>`
        }
      </div>
    </div>`;
  }).join('');
}

async function markFinePaid(fineId) {
  try {
    await db.collection('fines').doc(fineId).update({
      paid: true, paidAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    toast('הקנס סומן כשולם ✓', 'success'); loadFines();
  } catch (err) { toast('שגיאה', 'error'); }
}

async function calculateFines() {
  const pWKey = weekKey(-1);
  toast('מחשב קנסות שבוע שעבר...');
  try {
    const [workoutsSnap, usersSnap, existingSnap] = await Promise.all([
      db.collection('workouts').where('weekKey', '==', pWKey).get(),
      db.collection('users').get(),
      db.collection('fines').where('weekKey', '==', pWKey).get(),
    ]);
    const existing = new Set(existingSnap.docs.map(d => d.id));
    const counts = {}, unames = {};
    workoutsSnap.docs.forEach(doc => {
      const w = doc.data();
      counts[w.userId] = (counts[w.userId] || 0) + 1;
      if (!unames[w.userId]) unames[w.userId] = w.userName;
    });
    const batch = db.batch(); let processed = 0;
    usersSnap.docs.forEach(udoc => {
      const uid = udoc.id, udata = udoc.data();
      const goal = udata.goal || 3, actual = counts[uid] || 0;
      const fineId = `${uid}_${pWKey}`;
      if (actual < goal && !existing.has(fineId)) {
        const missed = goal - actual;
        batch.set(db.collection('fines').doc(fineId), {
          userId: uid, userName: udata.name || unames[uid] || 'משתמש',
          weekKey: pWKey, goal, actual, missed,
          amount: missed * FINE_PER_WORKOUT, paid: false,
          calculatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        });
        processed++;
      }
    });
    await batch.commit();
    toast(processed ? `נוצרו ${processed} קנסות לשבוע ${pWKey} 💸` : `אין קנסות חדשים לשבוע ${pWKey}`, processed ? 'success' : '');
    loadFines();
  } catch (err) { toast('שגיאה בחישוב', 'error'); console.error(err); }
}

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
  const badges    = new Set(userProfile.badges || []);
  const newBadges = [];
  const total     = allDocs.length;
  if (total >= 1  && !badges.has('first_workout')) newBadges.push('first_workout');
  if (total >= 10 && !badges.has('workouts_10'))   newBadges.push('workouts_10');
  if (total >= 30 && !badges.has('workouts_30'))   newBadges.push('workouts_30');
  if (!badges.has('monthly_goal')) {
    const mc = allDocs.filter(d => d.data().monthKey === monthKey()).length;
    if (mc >= (userProfile.goal || 3)) newBadges.push('monthly_goal');
  }
  if (!badges.has('streak_7') && calcStreak(allDocs) >= 7) newBadges.push('streak_7');
  if (newBadges.length) {
    const updated = [...Array.from(badges), ...newBadges];
    userProfile.badges = updated;
    try { await db.collection('users').doc(currentUser.uid).update({ badges: updated }); } catch {}
    newBadges.forEach(key => {
      const a = ACHIEVEMENTS.find(x => x.key === key);
      if (a) setTimeout(() => toast(`הישג חדש! ${a.emoji} ${a.label.replace('\n', ' ')}`, 'success'), 800);
    });
  }
}

function renderBadges(badges) {
  const earned = new Set(badges || []);
  document.getElementById('badges-grid').innerHTML = ACHIEVEMENTS.map(a => `
    <div class="badge-item ${earned.has(a.key) ? 'earned' : 'locked'}">
      <span class="badge-emoji">${a.emoji}</span>
      <span class="badge-label">${a.label}</span>
    </div>`).join('');
}

// ══ SETTINGS ═════════════════════════════════════════════════════════════
function renderSettings() {
  if (!currentUser) return;
  const name = currentUser.displayName || 'ספורטאי';
  document.getElementById('settings-name').textContent   = name;
  document.getElementById('settings-email').textContent  = currentUser.email;
  document.getElementById('settings-avatar').textContent = avatarOf(name);
  document.getElementById('goal-display').textContent    = userProfile.goal || 3;
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

    document.getElementById('user-avatar').textContent = avatarOf(user.displayName || '?');
    if (userProfile.notifications) document.getElementById('notif-toggle').checked = true;

    document.getElementById('auth-screen').classList.add('hidden');
    document.getElementById('app').classList.remove('hidden');

    // Init UI chrome
    initScrollEffects();
    setTimeout(() => {
      moveNavIndicator('home');
      initRipples();
    }, 50);

    loadHomeView();

    if ('serviceWorker' in navigator) navigator.serviceWorker.register('./sw.js').catch(() => {});
  } else {
    currentUser = null; userProfile = { goal: 3, friendIds: [], badges: [] };
    reminderDismissed = false; cachedUserDocs = []; goalWasHit = false; currentTab = 'home';
    if (progressChart) { progressChart.destroy(); progressChart = null; }
    document.getElementById('auth-screen').classList.remove('hidden');
    document.getElementById('app').classList.add('hidden');
  }
});
