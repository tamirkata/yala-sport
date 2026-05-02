// ── Sound & Haptic System — go and move ─────────────────────────────────
// All tones generated via Web Audio API — zero asset files.

const _AC = (() => {
  try { return new (window.AudioContext || window.webkitAudioContext)(); }
  catch { return null; }
})();

function _beep(freq, dur, vol, type = 'sine', delay = 0) {
  if (!_AC) return;
  try {
    const t    = _AC.currentTime + delay;
    const osc  = _AC.createOscillator();
    const gain = _AC.createGain();
    osc.connect(gain); gain.connect(_AC.destination);
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(vol, t + 0.005);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    osc.start(t);
    osc.stop(t + dur + 0.01);
  } catch {}
}

const _SOUNDS = {
  like:                () => { _beep(660, 0.09, 0.22); _beep(880, 0.09, 0.18, 'sine', 0.07); },
  comment_sent:        () => { _beep(520, 0.12, 0.18); _beep(660, 0.10, 0.14, 'sine', 0.11); },
  workout_saved:       () => { _beep(523, 0.11, 0.28); _beep(659, 0.11, 0.28, 'sine', 0.13); _beep(784, 0.22, 0.32, 'sine', 0.26); },
  achievement_unlocked:() => { _beep(523, 0.09, 0.28); _beep(659, 0.09, 0.28, 'sine', 0.11); _beep(784, 0.09, 0.28, 'sine', 0.22); _beep(1047, 0.28, 0.35, 'sine', 0.35); },
  notification:        () => _beep(880, 0.09, 0.22),
  tab_switch:          () => _beep(440, 0.04, 0.12),
  error:               () => { _beep(300, 0.10, 0.22); _beep(220, 0.13, 0.18, 'sine', 0.10); },
};

function playSound(name) {
  if (!window._fxPrefs?.soundsEnabled) return;
  const fn = _SOUNDS[name]; if (!fn) return;
  if (!_AC) return;
  _AC.state === 'suspended' ? _AC.resume().then(fn) : fn();
}

function triggerHaptic(type) {
  if (!window._fxPrefs?.hapticsEnabled) return;
  if (!navigator.vibrate) return;
  const P = { light: [10], medium: [20], success: [10, 50, 20], achievement: [15, 80, 15, 80, 30] };
  navigator.vibrate(P[type] || [10]);
}

// Default prefs before app.js loads
if (!window._fxPrefs) window._fxPrefs = { soundsEnabled: true, hapticsEnabled: true, animationsEnabled: true };
