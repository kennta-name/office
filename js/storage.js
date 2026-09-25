/**
 * storage.js — 学習データの保存と読み込み（ブラウザの localStorage）
 * ------------------------------------------------------------
 * 保存できない環境（プライベートモード等）では、画面を開いている間だけメモリに保持します。
 * 保存データが壊れていた場合は、壊れたデータを別キーに退避してから新しく始めます。
 */
(function (global) {
  'use strict';

  const STORAGE_KEY = 'officeKeyDojo:v1';
  const HISTORY_LIMIT = 30;
  const RECENT_LIMIT = 10;

  let state = null;
  let memoryOnly = false;
  const notices = [];

  function defaultState() {
    return {
      version: 1,
      profile: {
        sessions: 0,          // 挑戦回数
        completed: 0,         // 最後まで解いた回数
        totalAnswered: 0,     // 総回答数
        correct: 0,
        wrong: 0,
        totalXP: 0,           // 累計獲得ポイント（レベルの元）
        bestScore: 0,         // 1回の最高ポイント
        bestAccuracy: null,   // 最高正答率（5問以上の回）
        maxCombo: 0,
        fastest: {}           // 出題数ごとの最速クリア（正答率80%以上）{ "10": ミリ秒 }
      },
      questions: {},          // 問題IDごとの回答履歴・お気に入り・苦手状態
      history: [],            // 直近の結果
      session: null,          // 途中の挑戦（前回の続き）
      prefs: { count: 10, type: 'mix', source: 'all', category: 'all', random: true }
    };
  }

  const num = (v, d) => (typeof v === 'number' && isFinite(v) ? v : d);
  const isObj = v => !!v && typeof v === 'object' && !Array.isArray(v);

  /** 読み込んだデータの型を確認し、足りない項目は初期値で補う */
  function sanitize(raw) {
    const base = defaultState();
    if (!isObj(raw)) throw new Error('invalid');
    const p = isObj(raw.profile) ? raw.profile : {};
    Object.keys(base.profile).forEach(k => {
      if (k === 'fastest') base.profile.fastest = isObj(p.fastest) ? p.fastest : {};
      else if (k === 'bestAccuracy') base.profile.bestAccuracy = typeof p.bestAccuracy === 'number' ? p.bestAccuracy : null;
      else base.profile[k] = num(p[k], base.profile[k]);
    });
    if (isObj(raw.questions)) {
      Object.keys(raw.questions).forEach(id => {
        const r = raw.questions[id];
        if (!isObj(r)) return;
        base.questions[id] = {
          answered: num(r.answered, 0), correct: num(r.correct, 0), wrong: num(r.wrong, 0),
          favorite: !!r.favorite, weak: !!r.weak, weakStreak: num(r.weakStreak, 0), mastered: !!r.mastered,
          recent: Array.isArray(r.recent) ? r.recent.filter(isObj).slice(-RECENT_LIMIT) : [],
          lastAt: num(r.lastAt, null)
        };
      });
    }
    base.history = Array.isArray(raw.history) ? raw.history.filter(isObj).slice(0, HISTORY_LIMIT) : [];
    base.session = isObj(raw.session) && Array.isArray(raw.session.queue) ? raw.session : null;
    if (isObj(raw.prefs)) Object.assign(base.prefs, raw.prefs);
    return base;
  }

  function load() {
    let raw = null;
    try {
      raw = global.localStorage.getItem(STORAGE_KEY);
    } catch (err) {
      memoryOnly = true;
      notices.push('このブラウザでは学習データを保存できません。画面を閉じると記録は消えます。');
      state = defaultState();
      return state;
    }
    if (!raw) { state = defaultState(); return state; }
    try {
      state = sanitize(JSON.parse(raw));
    } catch (err) {
      try { global.localStorage.setItem(STORAGE_KEY + ':broken', raw); } catch (e) { /* 退避できなくても続行 */ }
      notices.push('保存データを読み込めなかったため、新しく記録を始めます。');
      state = defaultState();
      save();
    }
    return state;
  }

  function save() {
    if (memoryOnly || !state) return false;
    try {
      global.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      return true;
    } catch (err) {
      memoryOnly = true;
      notices.push('学習データを保存できませんでした。ブラウザの保存容量や設定を確認してください。');
      return false;
    }
  }

  /** 問題ごとの記録（なければ作る） */
  function questionRecord(id) {
    if (!state.questions[id]) {
      state.questions[id] = { answered: 0, correct: 0, wrong: 0, favorite: false, weak: false, weakStreak: 0, mastered: false, recent: [], lastAt: null };
    }
    return state.questions[id];
  }
  function peekRecord(id) {
    return state.questions[id] || null;
  }

  /**
   * 回答結果を問題の記録に反映する。
   * 苦手問題は「2回続けて正解」で克服済みになる。
   * 戻り値：'added'（苦手に登録） / 'still'（苦手のまま） / 'progress'（克服まであと1回） / 'mastered'（克服） / null
   */
  function recordAnswer(id, correct, given) {
    const r = questionRecord(id);
    r.answered += 1;
    r.lastAt = Date.now();
    r.recent.push({ ok: correct ? 1 : 0, at: r.lastAt, given: String(given || '').slice(0, 60) });
    if (r.recent.length > RECENT_LIMIT) r.recent.splice(0, r.recent.length - RECENT_LIMIT);
    if (correct) {
      r.correct += 1;
      if (r.weak) {
        r.weakStreak += 1;
        if (r.weakStreak >= 2) { r.weak = false; r.mastered = true; r.weakStreak = 0; return 'mastered'; }
        return 'progress';
      }
      return null;
    }
    r.wrong += 1;
    const wasWeak = r.weak;
    r.weak = true;
    r.mastered = false;
    r.weakStreak = 0;
    return wasWeak ? 'still' : 'added';
  }

  function toggleFavorite(id) {
    const r = questionRecord(id);
    r.favorite = !r.favorite;
    save();
    return r.favorite;
  }

  function addHistory(entry) {
    state.history.unshift(entry);
    if (state.history.length > HISTORY_LIMIT) state.history.length = HISTORY_LIMIT;
  }

  function reset() {
    state = defaultState();
    save();
  }

  global.Store = {
    load, save, reset, questionRecord, peekRecord, recordAnswer, toggleFavorite, addHistory,
    get state() { return state; },
    get memoryOnly() { return memoryOnly; },
    takeNotices() { return notices.splice(0, notices.length); }
  };
})(window);
