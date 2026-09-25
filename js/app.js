/**
 * app.js — 画面の表示と操作（トップ／問題／結果／問題一覧／記録）
 * ------------------------------------------------------------
 * 依存：data/questions.js（window.QUIZ_DATA）, storage.js（Store）, keyboard.js（KeyCombo）, game.js（Game）
 */
(function () {
  'use strict';

  // ================================================================ ユーティリティ
  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const fmt = n => Number(n || 0).toLocaleString('ja-JP');
  const media = q => (window.matchMedia ? window.matchMedia(q).matches : false);
  const REDUCED_MOTION = media('(prefers-reduced-motion: reduce)');
  const TOUCH_FIRST = media('(pointer: coarse)') && !media('(pointer: fine)');
  const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];

  function shuffle(list) {
    const a = list.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }
  function formatDuration(ms) {
    const total = Math.max(0, Math.round((ms || 0) / 1000));
    const m = Math.floor(total / 60);
    const s = total % 60;
    return m > 0 ? `${m}分${String(s).padStart(2, '0')}秒` : `${s}秒`;
  }
  function formatDate(ts) {
    const d = new Date(ts);
    return `${d.getMonth() + 1}/${d.getDate()} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
  }
  function keycaps(combo) {
    const labels = KeyCombo.comboToLabels(combo);
    if (!labels.length) return '';
    return '<span class="keys">' + labels.map(l => `<kbd>${esc(l)}</kbd>`).join('<span class="plus" aria-hidden="true">+</span>') + '</span>';
  }
  /** 正解表示用：許容回答をキーキャップで並べる */
  function acceptedKeycaps(question) {
    const combos = KeyCombo.acceptedCombos(question.accepted);
    if (!combos.length) return esc(question.answer);
    return combos.map(keycaps).join('<span class="or">または</span>');
  }

  // ================================================================ 問題データ
  const Bank = { list: [], byId: new Map(), categories: [], skipped: 0, points: Game.DEFAULT_POINTS, meta: {} };

  function validateQuestion(q) {
    if (!q || typeof q !== 'object') return '形式が正しくありません';
    if (!q.id || typeof q.id !== 'string') return 'IDがありません';
    if (!q.question) return '問題文がありません';
    if (q.type === 'choice') {
      if (!Array.isArray(q.choices) || q.choices.length < 2) return '選択肢が足りません';
      if (!Number.isInteger(q.answer) || q.answer < 0 || q.answer >= q.choices.length) return '正解の番号が正しくありません';
      return null;
    }
    if (q.type === 'input') {
      if (!Array.isArray(q.accepted) || !q.accepted.length) return '許容回答がありません';
      if (q.inputMode !== 'keys' && q.inputMode !== 'text') return '入力方法（inputMode）が正しくありません';
      return null;
    }
    return '問題形式（type）が正しくありません';
  }

  function loadBank() {
    const raw = window.QUIZ_DATA;
    if (!raw || !Array.isArray(raw.questions) || !raw.questions.length) return false;
    Bank.meta = raw.meta || {};
    Bank.points = Object.assign({}, Game.DEFAULT_POINTS, raw.points || {});
    raw.questions.forEach((q, order) => {
      const problem = validateQuestion(q) || (q && Bank.byId.has(q.id) ? 'IDが重複しています' : null);
      if (problem) {
        Bank.skipped += 1;
        console.warn('[Officeキー道場] 問題データを除外しました:', q && q.id, problem);
        return;
      }
      const item = Object.assign({}, q, {
        order,
        category: q.category || 'その他',
        difficulty: Bank.points[q.difficulty] ? q.difficulty : 'NORMAL',
        explanation: q.explanation || '',
        supplement: q.supplement || ''
      });
      if (item.type === 'choice') {
        item.choices = q.choices.map(c => (typeof c === 'string' ? { text: c, explanation: '' } : { text: c.text, explanation: c.explanation || '' }));
      }
      Bank.list.push(item);
      Bank.byId.set(item.id, item);
    });
    const declared = Array.isArray(raw.categories) ? raw.categories : [];
    const used = Array.from(new Set(Bank.list.map(q => q.category)));
    Bank.categories = declared.filter(c => used.indexOf(c) !== -1).concat(used.filter(c => declared.indexOf(c) === -1));
    return Bank.list.length > 0;
  }

  const TYPE_LABEL = { choice: '選択式', input: '入力式' };
  const DIFF_LABEL = { EASY: 'EASY', NORMAL: 'NORMAL', HARD: 'HARD' };

  // ================================================================ 画面共通
  const view = () => $('#view');
  let currentView = 'home';
  let keyCaptureHandle = null;

  function setView(name, html, focusSelector) {
    if (keyCaptureHandle) { keyCaptureHandle.destroy(); keyCaptureHandle = null; }
    currentView = name;
    document.body.dataset.view = name;
    const el = view();
    el.classList.remove('enter');
    void el.offsetWidth;
    el.innerHTML = html;
    el.classList.add('enter');
    window.scrollTo(0, 0);
    $$('.nav-btn').forEach(b => b.setAttribute('aria-current', b.dataset.nav === name ? 'page' : 'false'));
    const target = focusSelector ? $(focusSelector) : null;
    if (target) target.focus({ preventScroll: true });
  }

  function toast(message) {
    const box = $('#toast');
    const item = document.createElement('div');
    item.className = 'toast-item';
    item.textContent = message;
    box.appendChild(item);
    setTimeout(() => item.classList.add('out'), 3600);
    setTimeout(() => item.remove(), 4000);
  }
  function announce(message) {
    const live = $('#live');
    live.textContent = '';
    setTimeout(() => { live.textContent = message; }, 30);
  }
  function flushNotices() {
    Store.takeNotices().forEach(toast);
  }

  /** 紙吹雪（レベルアップ・自己ベスト用の軽い演出） */
  function confetti(count) {
    if (REDUCED_MOTION) return;
    const layer = $('#fx');
    const colors = ['var(--accent)', 'var(--gold)', 'var(--ok)', 'var(--ink)'];
    for (let i = 0; i < count; i++) {
      const p = document.createElement('span');
      p.className = 'confetti';
      p.style.left = (10 + Math.random() * 80) + 'vw';
      p.style.background = colors[i % colors.length];
      p.style.setProperty('--dx', (Math.random() * 160 - 80) + 'px');
      p.style.setProperty('--rot', (Math.random() * 720 - 360) + 'deg');
      p.style.animationDelay = (Math.random() * 0.25) + 's';
      layer.appendChild(p);
      setTimeout(() => p.remove(), 1900);
    }
  }

  function countUp(el, from, to, duration) {
    if (!el) return;
    if (REDUCED_MOTION || from === to) { el.textContent = fmt(to); return; }
    const start = performance.now();
    const step = now => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = fmt(Math.round(from + (to - from) * eased));
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  // ================================================================ 出題の組み立て
  function buildPool(config) {
    const state = Store.state;
    let pool = Bank.list.slice();
    if (config.source === 'custom') {
      pool = (config.ids || []).map(id => Bank.byId.get(id)).filter(Boolean);
    }
    if (config.type && config.type !== 'mix') pool = pool.filter(q => q.type === config.type);
    if (config.category && config.category !== 'all') pool = pool.filter(q => q.category === config.category);
    if (config.source === 'weak') pool = pool.filter(q => { const r = state.questions[q.id]; return r && r.weak; });
    if (config.source === 'favorite') pool = pool.filter(q => { const r = state.questions[q.id]; return r && r.favorite; });
    return pool;
  }

  function pickQuestions(config) {
    let pool = buildPool(config);
    if (config.source === 'fresh') {
      const answered = q => { const r = Store.state.questions[q.id]; return r ? r.answered : 0; };
      pool = shuffle(pool).sort((a, b) => answered(a) - answered(b));
    } else if (config.random) {
      pool = shuffle(pool);
    } else if (config.source !== 'custom') {
      pool.sort((a, b) => a.order - b.order);
    }
    const limit = config.count === 'all' ? pool.length : Number(config.count) || 10;
    return pool.slice(0, limit).map(q => q.id);
  }

  function emptyPoolMessage(config) {
    if (config.source === 'weak') return '苦手問題はまだありません。問題を解いて間違えると、ここに自動で追加されます。';
    if (config.source === 'favorite') return 'お気に入りの問題はまだありません。問題画面の「★ お気に入り」で登録できます。';
    return 'この条件に合う問題がありません。出題形式や分類を変えてみてください。';
  }

  // ================================================================ トップ画面
  let practiceRequest = null; // ショートカット一覧から「練習する」で来たときの問題ID

  function renderHome() {
    const state = Store.state;
    const prefs = state.prefs;
    const profile = state.profile;
    const lp = Game.levelProgress(profile.totalXP);
    const weakCount = Object.values(state.questions).filter(r => r.weak).length;
    const favCount = Object.values(state.questions).filter(r => r.favorite).length;
    const accuracy = profile.totalAnswered ? Math.round(profile.correct / profile.totalAnswered * 100) : null;
    const session = validSession();
    const choiceCount = Bank.list.filter(q => q.type === 'choice').length;
    const inputCount = Bank.list.filter(q => q.type === 'input').length;
    const ticks = Array.from({ length: 10 }, (_, i) => `<i class="${i < Math.floor(lp.ratio * 10) ? 'on' : ''}"></i>`).join('');

    const seg = (name, value, label, checked) =>
      `<label class="seg"><input type="radio" name="${name}" value="${value}" ${checked ? 'checked' : ''}><span>${label}</span></label>`;

    const html = `
    <section class="home">
      <div class="home-top">
        <div class="hero-copy">
          <p class="kicker">Office ショートカットと用語の稽古場</p>
          <h1>押して覚える、<br>Officeキー道場</h1>
          <p class="lead">選択式 ${choiceCount}問・入力式 ${inputCount}問。入力式は、実際に <span class="keys inline"><kbd>Ctrl</kbd><span class="plus">+</span><kbd>C</kbd></span> を押して答えます。</p>
          <a class="site-link" href="shortcuts.html">ショートカット一覧で予習する<span aria-hidden="true">→</span></a>
        </div>
        <div class="rank-card" aria-label="現在のレベル">
          <div class="rank-head">
            <p class="rank-lv"><small>レベル</small><b>${lp.level}</b></p>
            <p class="rank-title">${esc(Game.levelTitle(lp.level))}</p>
          </div>
          <div class="rank-ticks" role="progressbar" aria-label="次のレベルまでの進み具合" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${Math.round(lp.ratio * 100)}">${ticks}</div>
          <p class="rank-sub">累計 <b>${fmt(profile.totalXP)}</b> pt ／ 次のレベルまで <b>${fmt(lp.toNext)}</b> pt</p>
          <dl class="mini-stats">
            <div><dt>正答率</dt><dd>${accuracy == null ? '—' : accuracy + '<small>%</small>'}</dd></div>
            <div><dt>最大コンボ</dt><dd>${fmt(profile.maxCombo)}</dd></div>
            <div><dt>苦手</dt><dd>${weakCount}<small>問</small></dd></div>
            <div><dt>お気に入り</dt><dd>${favCount}<small>問</small></dd></div>
          </dl>
        </div>
      </div>

      ${practiceRequest ? `
      <div class="notice-card practice-card" id="practice-card">
        <div>
          <p class="notice-label">ショートカット一覧から</p>
          <p class="notice-main">選んだショートカットの問題を <b>${practiceRequest.length}問</b> 練習できます</p>
          ${session ? '<p class="notice-sub">はじめると、途中の挑戦は新しい挑戦に置き換わります。</p>' : ''}
        </div>
        <div class="notice-actions">
          <button class="btn primary" data-action="practice">練習をはじめる</button>
          <button class="btn ghost" data-action="practice-cancel">やめる</button>
        </div>
      </div>` : ''}

      ${session ? `
      <div class="notice-card resume-card" id="resume-card">
        <div>
          <p class="notice-label">途中の挑戦があります</p>
          <p class="notice-main">第 <b>${Math.min(session.index + 1, session.queue.length)}</b> 問 ／ 全${session.queue.length}問 ・ ${fmt(session.score)} pt ・ ${session.combo} コンボ中</p>
          <p class="notice-sub">${session.phase === 'answered' ? '回答済みの問題の解説から再開します。' : '中断した問題から再開します。'}</p>
        </div>
        <div class="notice-actions">
          <button class="btn primary" data-action="resume">続きから再開</button>
          <button class="btn ghost" data-action="discard">破棄する</button>
        </div>
        <div class="confirm" id="discard-confirm" hidden>
          <p>途中の記録を破棄します。よろしいですか？</p>
          <button class="btn danger small" data-action="discard-yes">破棄する</button>
          <button class="btn ghost small" data-action="discard-no">やめる</button>
        </div>
      </div>` : ''}

      <form class="setup" id="setup-form" novalidate>
        <h2 class="sec-h">稽古の設定</h2>
        <fieldset>
          <legend>出題数</legend>
          <div class="segs count">${[5, 10, 20, 30, 40, 50, 'all'].map(c => seg('count', c, c === 'all' ? '全問' : c + '問', String(prefs.count) === String(c))).join('')}</div>
        </fieldset>
        <fieldset>
          <legend>出題形式</legend>
          <div class="segs">${[['mix', 'ミックス'], ['choice', '選択式'], ['input', '入力式']].map(([v, l]) => seg('type', v, l, prefs.type === v)).join('')}</div>
        </fieldset>
        <fieldset>
          <legend>出題する問題</legend>
          <div class="segs wrap">${[['all', 'すべて'], ['fresh', '未回答を優先'], ['weak', `苦手問題（${weakCount}）`], ['favorite', `お気に入り（${favCount}）`]].map(([v, l]) => seg('source', v, l, prefs.source === v)).join('')}</div>
        </fieldset>
        <div class="setup-row">
          <label class="field">
            <span>分類</span>
            <select id="setup-category" name="category">
              <option value="all">すべての分類</option>
              ${Bank.categories.map(c => `<option value="${esc(c)}" ${prefs.category === c ? 'selected' : ''}>${esc(c)}</option>`).join('')}
            </select>
          </label>
          <label class="switch">
            <input type="checkbox" id="setup-random" name="random" ${prefs.random ? 'checked' : ''}>
            <span class="switch-ui" aria-hidden="true"></span>
            <span>ランダム出題</span>
          </label>
        </div>
        <p class="pool-note" id="pool-note" aria-live="polite"></p>
        <button class="btn primary xl" type="submit" id="start-btn">稽古をはじめる</button>
      </form>

      <section class="howto" aria-label="ルール">
        <h2 class="sec-h">ルール</h2>
        <dl>
          <div><dt>得点</dt><dd>正解すると EASY 50 ／ NORMAL 100 ／ HARD 200 pt。</dd></div>
          <div><dt>コンボ</dt><dd>連続正解でボーナス。2連続で +10%、最大 +100%。</dd></div>
          <div><dt>段位</dt><dd>累計ポイントでレベルが上がり、十級から初段、そして名人へ。</dd></div>
          <div><dt>苦手</dt><dd>間違えた問題は自動で登録。2回続けて正解すると克服。</dd></div>
        </dl>
      </section>
      ${Bank.skipped ? `<p class="data-warning">問題データの一部に不備があったため、${Bank.skipped}問を除外して表示しています。</p>` : ''}
    </section>`;
    setView('home', html);

    const form = $('#setup-form');
    const readConfig = () => {
      const data = new FormData(form);
      const count = data.get('count');
      return {
        count: count === 'all' ? 'all' : Number(count),
        type: data.get('type'),
        source: data.get('source'),
        category: data.get('category'),
        random: $('#setup-random').checked
      };
    };
    const updatePoolNote = () => {
      const config = readConfig();
      Object.assign(Store.state.prefs, config);
      Store.save();
      const pool = buildPool(config);
      const note = $('#pool-note');
      const btn = $('#start-btn');
      if (!pool.length) {
        note.textContent = emptyPoolMessage(config);
        note.classList.add('is-empty');
        btn.disabled = true;
      } else {
        const n = config.count === 'all' ? pool.length : Math.min(pool.length, config.count);
        const short = config.count !== 'all' && pool.length < config.count ? `（条件に合う問題が${pool.length}問のため）` : '';
        note.textContent = `${n}問 を出題します${short}` + (validSession() ? ' ※ 途中の挑戦は新しい挑戦に置き換わります' : '');
        note.classList.remove('is-empty');
        btn.disabled = false;
      }
    };
    form.addEventListener('change', updatePoolNote);
    form.addEventListener('submit', e => {
      e.preventDefault();
      const config = readConfig();
      const ids = pickQuestions(config);
      if (!ids.length) { updatePoolNote(); return; }
      Store.state.session = null;
      startSession(ids, config);
    });
    updatePoolNote();

    const cards = [$('#resume-card'), $('#practice-card')].filter(Boolean);
    cards.forEach(card => card.addEventListener('click', e => {
      const action = e.target.closest('[data-action]');
      if (!action) return;
      const a = action.dataset.action;
      if (a === 'resume') resumeSession();
      if (a === 'discard') { $('#discard-confirm').hidden = false; $('[data-action="discard-no"]').focus(); }
      if (a === 'discard-no') { $('#discard-confirm').hidden = true; }
      if (a === 'discard-yes') { Store.state.session = null; Store.save(); toast('途中の記録を破棄しました'); renderHome(); }
      if (a === 'practice') {
        const ids = practiceRequest.slice();
        practiceRequest = null;
        Store.state.session = null;
        startSession(ids, { source: 'custom', ids, count: 'all', type: 'mix', category: 'all', random: false });
      }
      if (a === 'practice-cancel') { practiceRequest = null; renderHome(); }
    }));
  }

  // ================================================================ 挑戦（セッション）
  let clockSince = null;
  let answerUI = null; // 回答中の入力状態

  function validSession() {
    const s = Store.state.session;
    if (!s) return null;
    const queue = (s.queue || []).filter(id => Bank.byId.has(id));
    if (!queue.length || typeof s.index !== 'number') {
      Store.state.session = null;
      Store.save();
      return null;
    }
    if (queue.length !== s.queue.length) {
      // 問題データが変わり、存在しない問題IDが含まれていた場合は取り除く
      const removedBefore = s.queue.slice(0, s.index).filter(id => !Bank.byId.has(id)).length;
      s.queue = queue;
      s.index = Math.max(0, Math.min(queue.length - 1, s.index - removedBefore));
      s.phase = 'question';
      Store.save();
    }
    return s;
  }

  function startSession(ids, config) {
    const profile = Store.state.profile;
    profile.sessions += 1;
    Store.state.session = {
      id: Date.now(),
      config: Object.assign({}, config, { ids: config.source === 'custom' ? config.ids : undefined }),
      queue: ids,
      index: 0,
      phase: 'question',
      results: [],
      score: 0,
      combo: 0,
      maxCombo: 0,
      startXP: profile.totalXP,
      startLevel: Game.levelFromXP(profile.totalXP),
      elapsedMs: 0,
      startedAt: Date.now()
    };
    Store.save();
    clockSince = Date.now();
    renderQuestion();
  }

  function resumeSession() {
    const s = validSession();
    if (!s) { toast('前回の続きを読み込めませんでした。新しく始めてください。'); renderHome(); return; }
    clockSince = Date.now();
    renderQuestion();
    if (s.phase === 'answered') restoreAnswered(s);
  }

  /** 回答後に中断した問題は、解説を表示した状態で再開する */
  function restoreAnswered(s) {
    const q = answerUI.question;
    const r = s.results[s.results.length - 1];
    if (!r || r.id !== q.id) { goNext(); return; }
    const combos = (r.combos || []).map(t => KeyCombo.parseComboText(t).combos[0]).filter(Boolean);
    renderFeedback(q, { correct: r.correct, given: r.given, selected: r.selected, combos: combos.length ? combos : null },
      { base: r.base || r.points, bonus: r.bonus || 0, earned: r.points, weakStatus: r.weakStatus || null });
    const fill = $('#progress-fill');
    if (fill) fill.style.setProperty('--w', (s.results.length / s.queue.length * 100).toFixed(2) + '%');
  }

  function commitClock() {
    const s = Store.state.session;
    if (s && clockSince) {
      s.elapsedMs += Date.now() - clockSince;
      clockSince = Date.now();
    }
  }

  /** 問題画面から離れるとき（ホームへ戻る・メニュー移動）に進み具合を保存する */
  function leaveQuiz() {
    commitClock();
    clockSince = null;
    Store.save();
    toast('途中まで保存しました。ホームの「続きから再開」で戻れます');
  }

  function quitSession() {
    leaveQuiz();
    renderHome();
  }

  // ---------------------------------------------------------------- 問題画面
  function hudHTML(s) {
    const lv = Game.levelFromXP(Store.state.profile.totalXP);
    const answeredCount = s.results.length;
    const prevRatio = Math.max(0, (answeredCount - (s.phase === 'answered' ? 1 : 0)) / s.queue.length);
    return `
      <div class="hud">
        <div class="hud-row">
          <button class="btn ghost small back-btn" data-action="quit" type="button"><span aria-hidden="true">←</span> ホームへ戻る</button>
          <p class="q-count" aria-label="全${s.queue.length}問中 ${s.index + 1}問目">第<b>${s.index + 1}</b>問<span>／${s.queue.length}</span></p>
        </div>
        <div class="progress" role="progressbar" aria-label="進み具合" aria-valuemin="0" aria-valuemax="${s.queue.length}" aria-valuenow="${answeredCount}">
          <span id="progress-fill" style="--w:${(prevRatio * 100).toFixed(2)}%"></span>
        </div>
        <dl class="hud-stats">
          <div class="stat"><dt>得点</dt><dd id="hud-score">${fmt(s.score)}</dd></div>
          <div class="stat stat-combo ${s.combo >= 2 ? 'is-hot' : ''}" id="hud-combo-box"><dt>コンボ</dt><dd id="hud-combo">${s.combo}</dd></div>
          <div class="stat"><dt>レベル</dt><dd id="hud-level">${lv}</dd></div>
        </dl>
      </div>`;
  }

  function renderQuestion() {
    const s = Store.state.session;
    const q = Bank.byId.get(s.queue[s.index]);
    if (!q) { goNext(true); return; }
    const rec = Store.peekRecord(q.id);
    const fav = !!(rec && rec.favorite);
    const points = Game.basePoints(q.difficulty, Bank.points);
    const html = `
      <section class="quiz">
        ${hudHTML(s)}
        <article class="q-card" id="q-card" aria-labelledby="q-text">
          <div class="q-meta">
            <span class="chip">${esc(q.category)}</span>
            <span class="chip diff diff-${q.difficulty.toLowerCase()}">${DIFF_LABEL[q.difficulty]} ・ ${points}pt</span>
            <span class="chip plain">${TYPE_LABEL[q.type]}</span>${rec && rec.weak ? '<span class="chip weak">苦手</span>' : ''}
            <button class="fav-btn" type="button" data-action="fav" aria-pressed="${fav}"><span aria-hidden="true">${fav ? '★' : '☆'}</span> お気に入り</button>
          </div>
          <h1 class="q-text" id="q-text" tabindex="-1">${esc(q.question)}</h1>
          <div id="answer-area">${q.type === 'choice' ? choiceAreaHTML(q) : inputAreaHTML(q)}</div>
          <p class="form-error" id="form-error" role="alert"></p>
          <div class="q-actions" id="q-actions">
            <button class="btn primary xl" type="button" id="submit-btn" data-action="submit">回答する</button>
            ${!TOUCH_FIRST ? `<p class="kbd-hint">${q.type === 'choice' ? '<kbd>1</kbd>〜<kbd>4</kbd> で選択 ／ <kbd>Enter</kbd> で回答' : '<kbd>Enter</kbd> で回答'}</p>` : ''}
          </div>
        </article>
        <div id="feedback"></div>
      </section>`;
    setView('quiz', html);
    requestAnimationFrame(() => {
      const fill = $('#progress-fill');
      if (fill) fill.style.setProperty('--w', (s.results.length / s.queue.length * 100).toFixed(2) + '%');
    });
    answerUI = { question: q, selected: null, combo: null, mode: null };
    if (q.type === 'choice') bindChoiceArea(q); else bindInputArea(q);
    $('#q-card').addEventListener('click', onQuizClick);
    $('.hud').addEventListener('click', onQuizClick);
  }

  function onQuizClick(e) {
    const btn = e.target.closest('[data-action]');
    if (!btn) return;
    const action = btn.dataset.action;
    if (action === 'submit') submitAnswer();
    if (action === 'quit') quitSession();
    if (action === 'fav') {
      const q = answerUI && answerUI.question;
      if (!q) return;
      const on = Store.toggleFavorite(q.id);
      btn.setAttribute('aria-pressed', String(on));
      btn.firstElementChild.textContent = on ? '★' : '☆';
      btn.classList.remove('pop'); void btn.offsetWidth; btn.classList.add('pop');
      toast(on ? 'お気に入りに登録しました' : 'お気に入りを解除しました');
    }
  }

  // ---------------------------------------------------------------- 選択式
  function choiceAreaHTML(q) {
    return `<div class="choices" role="radiogroup" aria-labelledby="q-text">
      ${q.choices.map((c, i) => `
        <button type="button" class="choice" role="radio" aria-checked="false" data-index="${i}">
          <span class="choice-letter" aria-hidden="true">${LETTERS[i]}</span>
          <span class="choice-text">${esc(c.text)}</span>
          <span class="choice-state"></span>
        </button>`).join('')}
    </div>`;
  }
  function bindChoiceArea() {
    $$('.choice').forEach(btn => btn.addEventListener('click', () => selectChoice(Number(btn.dataset.index))));
  }
  function selectChoice(index) {
    if (!answerUI || Store.state.session.phase !== 'question') return;
    const buttons = $$('.choice');
    if (!buttons[index]) return;
    answerUI.selected = index;
    buttons.forEach((b, i) => {
      b.setAttribute('aria-checked', String(i === index));
      b.classList.toggle('is-selected', i === index);
    });
    clearError();
  }

  // ---------------------------------------------------------------- 入力式
  function reservedAnswer(q) {
    return q.inputMode === 'keys' && KeyCombo.acceptedCombos(q.accepted).some(KeyCombo.isReserved);
  }
  function inputAreaHTML(q) {
    if (q.inputMode === 'text') {
      return `
        <label class="field big" for="text-answer"><span>回答欄</span>
          <input id="text-answer" type="text" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="用語を入力してください" enterkeyhint="done">
        </label>
        <p class="help">ひらがな・カタカナ、全角・半角の違いは気にしなくて大丈夫です。</p>`;
    }
    const reserved = reservedAnswer(q);
    const keyOptions = [
      ['文字', 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(k => [k, k])],
      ['数字・記号', '0123456789'.split('').map(k => [k, k]).concat([[';', '; （セミコロン）'], ['=', '='], ['-', '-']])],
      ['ファンクション', Array.from({ length: 12 }, (_, i) => ['F' + (i + 1), 'F' + (i + 1)])],
      ['矢印・移動', [['Left', '←'], ['Right', '→'], ['Up', '↑'], ['Down', '↓'], ['Arrow', '矢印キー（どれでも）'], ['Home', 'Home'], ['End', 'End'], ['PageUp', 'PageUp'], ['PageDown', 'PageDown']]],
      ['特殊キー', [['Enter', 'Enter'], ['Esc', 'Esc'], ['Tab', 'Tab'], ['Space', 'Space'], ['Backspace', 'Backspace'], ['Delete', 'Delete']]]
    ];
    return `
      <div class="mode-tabs" role="tablist" aria-label="回答の入力方法">
        <button type="button" role="tab" class="mode-tab" data-mode="capture" aria-selected="false" aria-controls="panel-capture">キーを押して入力</button>
        <button type="button" role="tab" class="mode-tab" data-mode="builder" aria-selected="false" aria-controls="panel-builder">ボタンで組み立て</button>
        <button type="button" role="tab" class="mode-tab" data-mode="text" aria-selected="false" aria-controls="panel-text">文字で入力</button>
      </div>

      <div class="mode-panel" id="panel-capture" role="tabpanel" data-panel="capture" hidden>
        <div class="capture" id="capture" tabindex="0" role="textbox" aria-label="キー入力欄。答えのショートカットキーを押してください" aria-describedby="capture-help">
          <div class="capture-display" id="capture-display"><span class="placeholder">ここをクリックして、キーを押してください</span></div>
        </div>
        <p class="help" id="capture-help"><kbd>Enter</kbd> 回答 ・ <kbd>Backspace</kbd> やり直し ・ <kbd>Tab</kbd> 次のボタンへ${KeyCombo.IS_MAC ? ' ・ Mac の <kbd>⌘</kbd> は Ctrl として読み取ります' : ''}</p>
      </div>

      <div class="mode-panel" id="panel-builder" role="tabpanel" data-panel="builder" hidden>
        <div class="builder">
          <div class="mod-toggles" role="group" aria-label="同時に押すキー">
            ${['Ctrl', 'Shift', 'Alt', 'Win'].map(m => `<button type="button" class="modkey" data-mod="${m}" aria-pressed="false">${m}</button>`).join('')}
          </div>
          <span class="plus big" aria-hidden="true">+</span>
          <label class="field compact" for="builder-key"><span class="sr-only">キー</span>
            <select id="builder-key">
              <option value="">（キーなし）</option>
              ${keyOptions.map(([label, opts]) => `<optgroup label="${label}">${opts.map(([v, t]) => `<option value="${esc(v)}">${esc(t)}</option>`).join('')}</optgroup>`).join('')}
            </select>
          </label>
        </div>
        <div class="builder-preview" id="builder-preview" aria-live="polite"><span class="placeholder">キーを選ぶと、ここに組み合わせが表示されます</span></div>
      </div>

      <div class="mode-panel" id="panel-text" role="tabpanel" data-panel="text" hidden>
        <label class="field big" for="keys-text"><span>回答欄</span>
          <input id="keys-text" type="text" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="例：Ctrl+C" enterkeyhint="done">
        </label>
        <div class="text-preview" id="text-preview" aria-live="polite"><span class="placeholder">「Ctrl + C」「ctrl+c」「CTRL＋C」などの書き方でも読み取れます</span></div>
      </div>
      <p class="notice" id="capture-notice" ${reserved ? '' : 'hidden'}>${reserved ? 'この問題は、ブラウザやOSが先に反応するキー操作が答えの可能性があります。「ボタンで組み立て」か「文字で入力」で答えると確実です。' : ''}</p>`;
  }

  function bindInputArea(q) {
    if (q.inputMode === 'text') {
      const input = $('#text-answer');
      input.addEventListener('input', clearError);
      input.addEventListener('keydown', e => { if (e.key === 'Enter' && !e.isComposing) { e.preventDefault(); submitAnswer(); } });
      answerUI.mode = 'text';
      if (!TOUCH_FIRST) input.focus({ preventScroll: true });
      return;
    }
    // --- タブ切り替え
    const tabs = $$('.mode-tab');
    const selectMode = (mode, focus) => {
      answerUI.mode = mode;
      tabs.forEach(t => t.setAttribute('aria-selected', String(t.dataset.mode === mode)));
      $$('.mode-panel').forEach(p => { p.hidden = p.dataset.panel !== mode; });
      clearError();
      if (!focus) return;
      if (mode === 'capture') $('#capture').focus({ preventScroll: true });
      if (mode === 'text') $('#keys-text').focus({ preventScroll: true });
    };
    tabs.forEach((t, i) => {
      t.addEventListener('click', () => selectMode(t.dataset.mode, true));
      t.addEventListener('keydown', e => {
        if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
        e.preventDefault();
        const next = tabs[(i + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length];
        next.focus();
        selectMode(next.dataset.mode, false);
      });
    });

    // --- キーを押して入力
    const display = $('#capture-display');
    const notice = $('#capture-notice');
    const showCombo = (combo, recorded) => {
      if (!combo) {
        display.innerHTML = answerUI.captured
          ? keycaps(answerUI.captured) + '<span class="captured-note">を記録しました</span>'
          : '<span class="placeholder">ここをクリックして、キーを押してください</span>';
        return;
      }
      display.innerHTML = keycaps(combo) + (recorded ? '<span class="captured-note">を記録しました</span>' : '<span class="plus pending">+ …</span>');
      if (recorded) {
        display.classList.remove('pulse'); void display.offsetWidth; display.classList.add('pulse');
      }
    };
    keyCaptureHandle = KeyCombo.attachKeyCapture($('#capture'), {
      onChange(combo) {
        answerUI.captured = combo;
        clearError();
        showCombo(combo, !!combo);
        if (combo) announce(KeyCombo.comboToLabels(combo).join(' プラス ') + ' を記録しました');
      },
      onPreview(combo) {
        if (combo) showCombo(combo, false); else showCombo(null);
      },
      onSubmit() { submitAnswer(); },
      onNotice(type) {
        const messages = {
          ime: '日本語入力がオンになっています。半角英数に切り替えてから、もう一度キーを押してください。',
          os: 'Windows キーを使う操作は、OS が先に処理するためブラウザでは読み取れないことがあります。「ボタンで組み立て」か「文字で入力」で答えてください。',
          unknown: 'このキーは読み取れませんでした。「ボタンで組み立て」か「文字で入力」を使ってください。'
        };
        notice.textContent = messages[type] || messages.unknown;
        notice.hidden = false;
      }
    });

    // --- ボタンで組み立て
    const builderMods = new Set();
    const builderKey = $('#builder-key');
    const updateBuilder = () => {
      const combo = KeyCombo.createCombo(Array.from(builderMods), builderKey.value || null);
      answerUI.built = combo.mods.length || combo.key ? combo : null;
      $('#builder-preview').innerHTML = answerUI.built ? keycaps(answerUI.built) : '<span class="placeholder">キーを選ぶと、ここに組み合わせが表示されます</span>';
      clearError();
    };
    $$('.modkey').forEach(b => b.addEventListener('click', () => {
      const m = b.dataset.mod;
      if (builderMods.has(m)) builderMods.delete(m); else builderMods.add(m);
      b.setAttribute('aria-pressed', String(builderMods.has(m)));
      updateBuilder();
    }));
    builderKey.addEventListener('change', updateBuilder);

    // --- 文字で入力
    const textInput = $('#keys-text');
    textInput.addEventListener('input', () => {
      clearError();
      const parsed = KeyCombo.parseComboText(textInput.value);
      const preview = $('#text-preview');
      if (!textInput.value.trim()) {
        preview.innerHTML = '<span class="placeholder">「Ctrl + C」「ctrl+c」「CTRL＋C」などの書き方でも読み取れます</span>';
      } else if (parsed.unknown.length || !parsed.combos.length) {
        preview.innerHTML = `<span class="placeholder warn">「${esc(parsed.unknown[0] || textInput.value)}」はキーの名前として読み取れません</span>`;
      } else {
        preview.innerHTML = parsed.combos.map(keycaps).join('<span class="or">または</span>') + '<span class="captured-note">として読み取りました</span>';
      }
    });
    textInput.addEventListener('keydown', e => { if (e.key === 'Enter' && !e.isComposing) { e.preventDefault(); submitAnswer(); } });

    const initial = reservedAnswer(q) || TOUCH_FIRST ? 'builder' : 'capture';
    selectMode(initial, !TOUCH_FIRST);
  }

  // ---------------------------------------------------------------- 回答・判定
  function showError(message) {
    const el = $('#form-error');
    el.textContent = message;
    const card = $('#q-card');
    card.classList.remove('shake'); void card.offsetWidth; card.classList.add('shake');
  }
  function clearError() {
    const el = $('#form-error');
    if (el) el.textContent = '';
  }

  /** 現在の入力内容を取り出して判定する。未入力なら null */
  function evaluateAnswer(q) {
    if (q.type === 'choice') {
      if (answerUI.selected == null) { showError('選択肢を1つ選んでから「回答する」を押してください。'); return null; }
      return { correct: answerUI.selected === q.answer, given: q.choices[answerUI.selected].text, selected: answerUI.selected };
    }
    if (q.inputMode === 'text') {
      const value = $('#text-answer').value.trim();
      if (!value) { showError('回答欄に用語を入力してから「回答する」を押してください。'); return null; }
      return { correct: KeyCombo.judgeTerm(value, q.accepted), given: value };
    }
    let combos = [];
    if (answerUI.mode === 'capture') {
      if (!answerUI.captured) { showError('キー入力欄をクリックして、答えのキーを押してください。'); $('#capture').focus(); return null; }
      combos = [answerUI.captured];
    } else if (answerUI.mode === 'builder') {
      if (!answerUI.built) { showError('キーを選んでから「回答する」を押してください。'); return null; }
      combos = [answerUI.built];
    } else {
      const value = $('#keys-text').value;
      if (!value.trim()) { showError('回答欄にキーを入力してから「回答する」を押してください。例：Ctrl+C'); return null; }
      const parsed = KeyCombo.parseComboText(value);
      if (parsed.unknown.length || !parsed.combos.length) { showError('キーの名前として読み取れませんでした。「Ctrl+C」のように「+」でつないで入力してください。'); return null; }
      combos = parsed.combos;
    }
    return { correct: KeyCombo.judgeCombos(combos, q.accepted), given: combos.map(KeyCombo.comboToString).join(' / '), combos };
  }

  function submitAnswer() {
    const s = Store.state.session;
    if (!s || currentView !== 'quiz') return;
    if (s.phase === 'answered') { goNext(); return; }
    const q = answerUI.question;
    const result = evaluateAnswer(q);
    if (!result) return;

    const profile = Store.state.profile;
    const levelBefore = Game.levelFromXP(profile.totalXP);
    const base = Game.basePoints(q.difficulty, Bank.points);
    let bonus = 0;
    let earned = 0;
    const scoreBefore = s.score;
    if (result.correct) {
      s.combo += 1;
      s.maxCombo = Math.max(s.maxCombo, s.combo);
      bonus = Game.comboBonus(base, s.combo);
      earned = base + bonus;
    } else {
      s.combo = 0;
    }
    s.score += earned;
    profile.totalXP += earned;
    profile.totalAnswered += 1;
    if (result.correct) profile.correct += 1; else profile.wrong += 1;
    const weakStatus = Store.recordAnswer(q.id, result.correct, result.given);
    s.results.push({
      id: q.id, correct: result.correct, given: result.given, points: earned, base, bonus, weakStatus,
      selected: result.selected == null ? null : result.selected,
      combos: result.combos ? result.combos.map(KeyCombo.comboToString) : null
    });
    s.phase = 'answered';
    commitClock();
    Store.save();

    const levelAfter = Game.levelFromXP(profile.totalXP);
    renderFeedback(q, result, { base, bonus, earned, weakStatus });
    updateHud(scoreBefore, s, earned);
    if (result.correct && Game.isComboMilestone(s.combo)) comboBurst(s.combo);
    if (levelAfter > levelBefore) setTimeout(() => levelUp(levelAfter), result.correct && Game.isComboMilestone(s.combo) ? 900 : 350);
  }

  function updateHud(scoreBefore, s, earned) {
    countUp($('#hud-score'), scoreBefore, s.score, 700);
    $('#hud-combo').textContent = s.combo;
    const box = $('#hud-combo-box');
    box.classList.toggle('is-hot', s.combo >= 2);
    box.classList.remove('bump', 'drop'); void box.offsetWidth;
    box.classList.add(earned > 0 ? 'bump' : 'drop');
    $('#hud-level').textContent = Game.levelFromXP(Store.state.profile.totalXP);
    const fill = $('#progress-fill');
    if (fill) fill.style.setProperty('--w', (s.results.length / s.queue.length * 100).toFixed(2) + '%');
    $('.progress').setAttribute('aria-valuenow', s.results.length);
    if (earned > 0) {
      const float = document.createElement('span');
      float.className = 'float-pts';
      float.textContent = '+' + fmt(earned);
      $('#hud-score').parentElement.appendChild(float);
      setTimeout(() => float.remove(), 1200);
    }
  }

  function comboBurst(combo) {
    const el = document.createElement('div');
    el.className = 'combo-burst';
    el.innerHTML = `<b>${combo}</b><span>コンボ</span>`;
    $('#fx').appendChild(el);
    announce(`${combo}コンボ！`);
    setTimeout(() => el.remove(), 1400);
  }

  function levelUp(level) {
    const overlay = $('#overlay');
    overlay.innerHTML = `
      <div class="levelup" role="dialog" aria-modal="true" aria-labelledby="lu-title">
        <p class="lu-kicker">${Game.levelTitle(level).endsWith('段') || level > 20 ? '昇段' : '昇級'}</p>
        <p class="lu-level" id="lu-title"><small>レベル</small><b>${level}</b></p>
        <p class="lu-title">${esc(Game.levelTitle(level))}</p>
        <button class="btn primary" type="button" data-action="close-overlay">続ける</button>
      </div>`;
    overlay.hidden = false;
    confetti(40);
    announce(`レベルアップ！ レベル${level}になりました`);
    const close = () => {
      overlay.hidden = true;
      overlay.innerHTML = '';
      const next = $('#next-btn');
      if (next) next.focus({ preventScroll: true });
    };
    overlay.querySelector('[data-action="close-overlay"]').addEventListener('click', close);
    overlay.querySelector('button').focus({ preventScroll: true });
    overlay.onclick = e => { if (e.target === overlay) close(); };
    clearTimeout(levelUp.timer);
    levelUp.timer = setTimeout(() => { if (!overlay.hidden) close(); }, 3200);
  }

  function renderFeedback(q, result, pts) {
    const s = Store.state.session;
    const last = s.index >= s.queue.length - 1;
    const card = $('#q-card');
    card.classList.add(result.correct ? 'is-correct' : 'is-wrong', 'is-answered');
    $('#submit-btn').hidden = true;
    const hint = $('.kbd-hint'); if (hint) hint.hidden = true;
    $$('.mode-tab, .modkey, #builder-key, #keys-text, #text-answer').forEach(el => { el.disabled = true; });
    const cap = $('#capture'); if (cap) { cap.setAttribute('tabindex', '-1'); cap.setAttribute('aria-disabled', 'true'); }
    if (keyCaptureHandle) { keyCaptureHandle.destroy(); keyCaptureHandle = null; }

    if (q.type === 'choice') {
      $$('.choice').forEach((b, i) => {
        b.disabled = true;
        const state = b.querySelector('.choice-state');
        if (i === q.answer) { b.classList.add('is-answer'); state.innerHTML = '<span class="pill ok">○ 正解</span>'; }
        else if (i === result.selected) { b.classList.add('is-miss'); state.innerHTML = '<span class="pill ng">✕ あなたの回答</span>'; }
        else b.classList.add('is-dim');
      });
    }

    const weakText = {
      added: '苦手問題に登録しました。あとで復習できます。',
      still: '苦手問題のままです。次は正解を目指しましょう。',
      progress: '苦手克服まで、あと1回正解！',
      mastered: '苦手問題を克服しました！'
    }[pts.weakStatus] || '';

    let detail = '';
    if (q.type === 'choice') {
      detail = `
        <p class="exp-main">${esc(q.explanation)}</p>
        <h3 class="exp-h">選択肢ごとの解説</h3>
        <ul class="choice-exps">
          ${q.choices.map((c, i) => `
            <li class="${i === q.answer ? 'is-answer' : ''}">
              <span class="choice-letter" aria-hidden="true">${LETTERS[i]}</span>
              <div><p class="ce-text">${esc(c.text)}${i === q.answer ? ' <span class="pill ok">正解</span>' : ''}${i === result.selected && i !== q.answer ? ' <span class="pill ng">あなたの回答</span>' : ''}</p>
              <p class="ce-exp">${esc(c.explanation || (i === q.answer ? q.explanation : ''))}</p></div>
            </li>`).join('')}
        </ul>`;
    } else {
      const yours = q.inputMode === 'keys' && result.combos
        ? result.combos.map(keycaps).join('<span class="or">/</span>')
        : `<span class="term">${esc(result.given)}</span>`;
      const correctView = q.inputMode === 'keys' ? acceptedKeycaps(q) : `<span class="term">${esc(q.answer)}</span>`;
      detail = `
        <dl class="answer-compare">
          <div class="${result.correct ? 'ok' : 'ng'}"><dt>あなたの回答</dt><dd>${yours}</dd></div>
          <div class="ok"><dt>正解</dt><dd>${correctView}</dd></div>
        </dl>
        <p class="exp-main">${esc(q.explanation)}</p>`;
    }

    const pointsLine = result.correct
      ? `<b>+${fmt(pts.earned)} pt</b>${pts.bonus ? `<span>（基本 ${pts.base} ＋ コンボボーナス ${pts.bonus}）</span>` : ''}`
      : '<b>+0 pt</b><span>コンボはリセットされました</span>';

    $('#feedback').innerHTML = `
      <section class="feedback ${result.correct ? 'ok' : 'ng'}" aria-labelledby="verdict">
        <div class="verdict">
          <span class="stamp ${result.correct ? 'ok' : 'ng'}" aria-hidden="true">${result.correct ? '正解' : '不正解'}</span>
          <div>
            <h2 id="verdict">${result.correct ? '正解！' : '不正解'}</h2>
            <p class="verdict-pts">${pointsLine}</p>
          </div>
        </div>
        ${weakText ? `<p class="weak-note ${pts.weakStatus}">${weakText}</p>` : ''}
        <div class="explain">
          ${detail}
          ${q.supplement ? `<p class="supplement">${esc(q.supplement)}</p>` : ''}
        </div>
        <div class="next-row">
          <button class="btn primary xl" type="button" id="next-btn">${last ? '結果を見る' : '次の問題へ'}<span aria-hidden="true"> →</span></button>
          ${!TOUCH_FIRST ? '<p class="kbd-hint"><kbd>Enter</kbd> で進む</p>' : ''}
        </div>
      </section>`;
    $('#next-btn').addEventListener('click', () => goNext());
    announce(result.correct ? `正解。${pts.earned}ポイント獲得` : '不正解');
    const fb = $('.feedback');
    if (!REDUCED_MOTION) fb.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    $('#next-btn').focus({ preventScroll: true });
  }

  function goNext() {
    const s = Store.state.session;
    if (!s) { renderHome(); return; }
    s.index += 1;
    s.phase = 'question';
    if (s.index >= s.queue.length) { finishSession(); return; }
    commitClock();
    Store.save();
    renderQuestion();
  }

  // ================================================================ 結果画面
  function finishSession() {
    commitClock();
    clockSince = null;
    const state = Store.state;
    const s = state.session;
    const profile = state.profile;
    const total = s.results.length;
    const correct = s.results.filter(r => r.correct).length;
    const accuracy = total ? Math.round(correct / total * 100) : 0;
    let perfectBonus = 0;
    if (total >= 5 && correct === total) {
      perfectBonus = Game.PERFECT_BONUS;
      s.score += perfectBonus;
      profile.totalXP += perfectBonus;
    }
    const firstTime = profile.completed === 0;
    const bests = [];
    if (s.score > profile.bestScore) { bests.push('最高ポイント'); profile.bestScore = s.score; }
    if (total >= 5 && (profile.bestAccuracy == null || accuracy > profile.bestAccuracy)) { bests.push('最高正答率'); profile.bestAccuracy = accuracy; }
    if (s.maxCombo > profile.maxCombo) { bests.push('最大コンボ'); profile.maxCombo = s.maxCombo; }
    if (accuracy >= 80) {
      const key = String(total);
      if (!profile.fastest[key] || s.elapsedMs < profile.fastest[key]) { bests.push(`最速クリア（${total}問）`); profile.fastest[key] = s.elapsedMs; }
    }
    profile.completed += 1;
    const entry = {
      at: Date.now(), total, correct, wrong: total - correct, accuracy, score: s.score, maxCombo: s.maxCombo,
      timeMs: s.elapsedMs, perfectBonus, levelBefore: s.startLevel, levelAfter: Game.levelFromXP(profile.totalXP),
      queue: s.queue.slice(), wrongIds: s.results.filter(r => !r.correct).map(r => r.id),
      results: s.results.slice(),
      config: s.config
    };
    Store.addHistory(entry);
    state.session = null;
    Store.save();
    renderResult(entry, { bests: firstTime ? [] : bests, firstTime });
  }

  /** 結果画面の1問分：正誤・回答・正解・解説 */
  function reviewItemHTML(r, index) {
    const q = Bank.byId.get(r.id);
    if (!q) return '';
    let yours;
    let correct;
    if (q.type === 'choice') {
      yours = r.selected != null && q.choices[r.selected] ? `${LETTERS[r.selected]}. ${esc(q.choices[r.selected].text)}` : esc(r.given);
      correct = `${LETTERS[q.answer]}. ${esc(q.choices[q.answer].text)}`;
    } else if (q.inputMode === 'keys') {
      const combos = (r.combos || []).map(t => KeyCombo.parseComboText(t).combos[0]).filter(Boolean);
      yours = combos.length ? combos.map(keycaps).join('<span class="or">/</span>') : esc(r.given);
      correct = acceptedKeycaps(q);
    } else {
      yours = esc(r.given);
      correct = esc(q.answer);
    }
    const choiceDetail = q.type === 'choice' ? `
      <details class="rv-choices">
        <summary>選択肢ごとの解説を見る</summary>
        <ul class="choice-exps">${q.choices.map((c, i) => `
          <li class="${i === q.answer ? 'is-answer' : ''}">
            <span class="choice-letter" aria-hidden="true">${LETTERS[i]}</span>
            <div><p class="ce-text">${esc(c.text)}${i === q.answer ? ' <span class="pill ok">正解</span>' : ''}${i === r.selected && i !== q.answer ? ' <span class="pill ng">あなたの回答</span>' : ''}</p>
            <p class="ce-exp">${esc(c.explanation || (i === q.answer ? q.explanation : ''))}</p></div>
          </li>`).join('')}</ul>
      </details>` : '';
    return `
      <li class="rv ${r.correct ? 'ok' : 'ng'}" data-result="${r.correct ? 'ok' : 'ng'}">
        <div class="rv-head">
          <span class="rv-mark">${r.correct ? '○ 正解' : '✕ 不正解'}</span>
          <span class="rv-no">第${index + 1}問</span>
          <span class="chip">${esc(q.category)}</span>
          <span class="chip plain">${TYPE_LABEL[q.type]}</span>
          <span class="rv-pts">${r.correct ? '+' + fmt(r.points) + ' pt' : '0 pt'}</span>
        </div>
        <p class="rv-q">${esc(q.question)}</p>
        <dl class="rv-ans">
          <div class="${r.correct ? 'ok' : 'ng'}"><dt>あなたの回答</dt><dd>${yours}</dd></div>
          <div class="ok"><dt>正解</dt><dd>${correct}</dd></div>
        </dl>
        <p class="rv-exp"><span class="rv-label">解説</span>${esc(q.explanation)}</p>
        ${q.supplement ? `<p class="supplement">${esc(q.supplement)}</p>` : ''}
        ${choiceDetail}
      </li>`;
  }

  function renderResult(entry, flags) {
    const lvUp = entry.levelAfter > entry.levelBefore;
    const weakCount = Object.values(Store.state.questions).filter(r => r.weak).length;
    const favCount = Object.values(Store.state.questions).filter(r => r.favorite).length;
    const results = entry.results || [];
    const html = `
      <section class="result">
        <div class="result-hero">
          <div class="score-stamp ${entry.accuracy >= 80 ? 'good' : entry.accuracy >= 50 ? 'mid' : 'low'}" role="img" aria-label="${entry.accuracy}点">
            <b id="result-score">0</b><span>点</span>
          </div>
          <div class="result-copy">
            <p class="kicker">今回の結果</p>
            <h1>${esc(Game.resultMessage(entry.accuracy))}</h1>
            <p class="result-sub">${entry.total}問中 <b>${entry.correct}問</b> 正解 ／ <b>${fmt(entry.score)} pt</b> 獲得</p>
            <div class="badges">
              ${flags.firstTime ? '<span class="badge best">初記録</span>' : ''}
              ${flags.bests.map(b => `<span class="badge best">自己ベスト更新 ${esc(b)}</span>`).join('')}
              ${lvUp ? `<span class="badge level">レベル ${entry.levelBefore} → ${entry.levelAfter}（${esc(Game.levelTitle(entry.levelAfter))}）</span>` : ''}
              ${entry.perfectBonus ? `<span class="badge perfect">全問正解ボーナス +${entry.perfectBonus}</span>` : ''}
            </div>
          </div>
        </div>

        <dl class="result-grid">
          <div><dt>正解数</dt><dd>${entry.correct}<small>問</small></dd></div>
          <div><dt>不正解数</dt><dd>${entry.wrong}<small>問</small></dd></div>
          <div><dt>正答率</dt><dd>${entry.accuracy}<small>%</small></dd></div>
          <div><dt>獲得ポイント</dt><dd>${fmt(entry.score)}<small>pt</small></dd></div>
          <div><dt>最大コンボ</dt><dd>${entry.maxCombo}</dd></div>
          <div><dt>レベル</dt><dd>${entry.levelAfter}<small>${esc(Game.levelTitle(entry.levelAfter))}</small></dd></div>
          <div><dt>学習時間</dt><dd class="small-num">${formatDuration(entry.timeMs)}</dd></div>
        </dl>

        <div class="result-actions">
          <button class="btn primary xl" data-action="review-wrong" ${entry.wrongIds.length ? '' : 'disabled'}>間違えた問題を復習（${entry.wrongIds.length}）</button>
          <div class="action-grid">
            <button class="btn outline" data-action="retry">もう一度同じ問題に挑戦</button>
            <button class="btn outline" data-action="fresh">新しい問題に挑戦</button>
            <button class="btn outline" data-action="review-weak" ${weakCount ? '' : 'disabled'}>苦手問題を復習（${weakCount}）</button>
            <button class="btn outline" data-action="review-fav" ${favCount ? '' : 'disabled'}>お気に入りを復習（${favCount}）</button>
          </div>
          <div class="action-grid">
            <button class="btn ghost" data-action="home">トップページへ戻る</button>
            <a class="btn ghost" href="shortcuts.html">ショートカット一覧で確認する</a>
          </div>
        </div>

        ${results.length ? `
        <section class="review" aria-labelledby="review-h">
          <div class="review-head">
            <h2 class="sec-h" id="review-h">答え合わせ</h2>
            <div class="filter-tabs small" role="tablist" aria-label="表示する問題">
              <button type="button" role="tab" class="filter-tab" data-review="all" aria-selected="true">すべて<span>${results.length}</span></button>
              <button type="button" role="tab" class="filter-tab" data-review="ng" aria-selected="false">不正解<span>${entry.wrong}</span></button>
              <button type="button" role="tab" class="filter-tab" data-review="ok" aria-selected="false">正解<span>${entry.correct}</span></button>
            </div>
          </div>
          <ol class="review-list">${results.map(reviewItemHTML).join('')}</ol>
        </section>` : ''}
      </section>`;
    setView('result', html);
    countUp($('#result-score'), 0, entry.accuracy, 1100);
    if (flags.bests.length || entry.accuracy === 100) setTimeout(() => confetti(60), 700);
    else if (lvUp) setTimeout(() => confetti(30), 700);

    $$('[data-review]').forEach(tab => tab.addEventListener('click', () => {
      const mode = tab.dataset.review;
      $$('[data-review]').forEach(t => t.setAttribute('aria-selected', String(t === tab)));
      $$('.rv').forEach(li => { li.hidden = mode !== 'all' && li.dataset.result !== mode; });
    }));

    $('.result-actions').addEventListener('click', e => {
      const btn = e.target.closest('[data-action]');
      if (!btn || btn.disabled) return;
      const cfg = entry.config || {};
      const base = { count: 'all', type: 'mix', category: 'all', random: true };
      switch (btn.dataset.action) {
        case 'review-wrong': startSession(shuffle(entry.wrongIds.filter(id => Bank.byId.has(id))), Object.assign(base, { source: 'custom', ids: entry.wrongIds })); break;
        case 'retry': { const ids = entry.queue.filter(id => Bank.byId.has(id)); startSession(ids, Object.assign(base, { source: 'custom', ids, random: false })); break; }
        case 'fresh': {
          const config = { count: cfg.count || entry.total, type: cfg.type || 'mix', category: cfg.category || 'all', source: 'fresh', random: true };
          const ids = pickQuestions(config);
          if (ids.length) startSession(ids, config); else toast(emptyPoolMessage(config));
          break;
        }
        case 'review-weak': startFromSource('weak'); break;
        case 'review-fav': startFromSource('favorite'); break;
        case 'home': renderHome(); break;
      }
    });
  }

  function startFromSource(source) {
    const prefs = Store.state.prefs;
    const config = { count: prefs.count || 10, type: 'mix', category: 'all', source, random: true };
    const ids = pickQuestions(config);
    if (!ids.length) { toast(emptyPoolMessage(config)); return; }
    startSession(ids, config);
  }

  // ================================================================ 問題一覧（お気に入り・苦手）
  const listState = { filter: 'all', category: 'all', type: 'all' };

  function renderList() {
    const qs = Store.state.questions;
    const status = q => qs[q.id] || null;
    const counts = {
      all: Bank.list.length,
      weak: Bank.list.filter(q => { const r = status(q); return r && r.weak; }).length,
      favorite: Bank.list.filter(q => { const r = status(q); return r && r.favorite; }).length,
      mastered: Bank.list.filter(q => { const r = status(q); return r && r.mastered && !r.weak; }).length,
      unanswered: Bank.list.filter(q => { const r = status(q); return !r || !r.answered; }).length
    };
    let items = Bank.list.filter(q => {
      const r = status(q);
      if (listState.filter === 'weak' && !(r && r.weak)) return false;
      if (listState.filter === 'favorite' && !(r && r.favorite)) return false;
      if (listState.filter === 'mastered' && !(r && r.mastered && !r.weak)) return false;
      if (listState.filter === 'unanswered' && r && r.answered) return false;
      if (listState.category !== 'all' && q.category !== listState.category) return false;
      if (listState.type !== 'all' && q.type !== listState.type) return false;
      return true;
    });
    const tabs = [['all', 'すべて'], ['weak', '苦手'], ['favorite', 'お気に入り'], ['mastered', '克服済み'], ['unanswered', '未回答']];
    const emptyText = {
      weak: '苦手問題はありません。間違えた問題が自動でここに追加されます。',
      favorite: 'お気に入りはまだありません。右の ☆ を押すと登録できます。',
      mastered: '克服済みの問題はまだありません。苦手問題に2回続けて正解すると、ここに移ります。',
      unanswered: 'すべての問題に回答済みです。',
      all: '条件に合う問題がありません。'
    }[listState.filter];

    const html = `
      <section class="list">
        <header class="page-head">
          <p class="kicker">問題一覧</p>
          <h1>苦手とお気に入りを管理</h1>
          <p class="lead">☆ を押すとお気に入りに登録できます。表示中の問題から、そのまま出題できます。</p>
        </header>
        <div class="filter-tabs" role="tablist" aria-label="表示する問題">
          ${tabs.map(([v, l]) => `<button type="button" role="tab" class="filter-tab" data-filter="${v}" aria-selected="${listState.filter === v}">${l}<span>${counts[v]}</span></button>`).join('')}
        </div>
        <div class="list-tools">
          <label class="field compact"><span>分類</span>
            <select id="list-category"><option value="all">すべて</option>${Bank.categories.map(c => `<option value="${esc(c)}" ${listState.category === c ? 'selected' : ''}>${esc(c)}</option>`).join('')}</select>
          </label>
          <label class="field compact"><span>形式</span>
            <select id="list-type"><option value="all">すべて</option><option value="choice" ${listState.type === 'choice' ? 'selected' : ''}>選択式</option><option value="input" ${listState.type === 'input' ? 'selected' : ''}>入力式</option></select>
          </label>
          <button class="btn primary" id="list-start" ${items.length ? '' : 'disabled'}>表示中の問題から出題（${Math.min(items.length, Store.state.prefs.count === 'all' ? items.length : Store.state.prefs.count || 10)}問）</button>
        </div>
        ${items.length ? `<ul class="q-list">${items.map(q => {
          const r = status(q);
          const recent = r && r.recent.length ? r.recent.slice(-5).map(x => `<i class="${x.ok ? 'ok' : 'ng'}" title="${x.ok ? '正解' : '不正解'}">${x.ok ? '○' : '✕'}</i>`).join('') : '';
          return `<li>
            <div class="ql-main">
              <p class="ql-meta"><span class="ql-id">${esc(q.id)}</span><span class="chip">${esc(q.category)}</span><span class="chip plain">${TYPE_LABEL[q.type]}</span><span class="chip diff diff-${q.difficulty.toLowerCase()}">${q.difficulty}</span>
                ${r && r.weak ? '<span class="pill ng">苦手</span>' : ''}${r && r.mastered && !r.weak ? '<span class="pill ok">克服</span>' : ''}</p>
              <p class="ql-q">${esc(q.question)}</p>
              <p class="ql-stats">${r && r.answered ? `回答 ${r.answered}回 ・ 正解 ${r.correct}回 ・ 正答率 ${Math.round(r.correct / r.answered * 100)}%` : 'まだ回答していません'}${recent ? `<span class="recent" aria-label="直近の結果">${recent}</span>` : ''}</p>
            </div>
            <button type="button" class="star" data-id="${esc(q.id)}" aria-pressed="${!!(r && r.favorite)}" aria-label="${esc(q.id)} をお気に入り${r && r.favorite ? 'から外す' : 'に登録'}">${r && r.favorite ? '★' : '☆'}</button>
          </li>`;
        }).join('')}</ul>` : `<p class="empty">${emptyText}</p>`}
      </section>`;
    setView('list', html);

    $$('.filter-tab').forEach(t => t.addEventListener('click', () => { listState.filter = t.dataset.filter; renderList(); const again = $(`.filter-tab[data-filter="${listState.filter}"]`); if (again) again.focus(); }));
    $('#list-category').addEventListener('change', e => { listState.category = e.target.value; renderList(); });
    $('#list-type').addEventListener('change', e => { listState.type = e.target.value; renderList(); });
    $('#list-start').addEventListener('click', () => {
      const ids = items.map(q => q.id);
      const count = Store.state.prefs.count || 10;
      startSession(pickQuestions({ source: 'custom', ids, count, type: 'mix', category: 'all', random: true }), { source: 'custom', ids, count, type: 'mix', category: 'all', random: true });
    });
    $$('.star').forEach(b => b.addEventListener('click', () => {
      const on = Store.toggleFavorite(b.dataset.id);
      b.setAttribute('aria-pressed', String(on));
      b.textContent = on ? '★' : '☆';
      b.setAttribute('aria-label', `${b.dataset.id} をお気に入り${on ? 'から外す' : 'に登録'}`);
      b.classList.remove('pop'); void b.offsetWidth; b.classList.add('pop');
      const favTab = $('.filter-tab[data-filter="favorite"] span');
      if (favTab) favTab.textContent = Bank.list.filter(q => { const r = Store.state.questions[q.id]; return r && r.favorite; }).length;
      if (listState.filter === 'favorite' && !on) setTimeout(renderList, 250);
    }));
  }

  // ================================================================ 記録（自己記録ランキング・学習履歴）
  function renderRecords() {
    const state = Store.state;
    const p = state.profile;
    const lp = Game.levelProgress(p.totalXP);
    const accuracy = p.totalAnswered ? Math.round(p.correct / p.totalAnswered * 100) : null;
    const ranking = state.history.slice().sort((a, b) => b.score - a.score || b.accuracy - a.accuracy).slice(0, 5);
    const fastestKeys = Object.keys(p.fastest).sort((a, b) => Number(a) - Number(b));
    const html = `
      <section class="records">
        <header class="page-head">
          <p class="kicker">学習の記録</p>
          <h1>自分の記録を更新しよう</h1>
          <p class="lead">記録はこのブラウザに保存されます。${Store.memoryOnly ? '<strong>現在は保存できない状態のため、画面を閉じると記録は消えます。</strong>' : ''}</p>
        </header>

        <div class="best-grid">
          <div class="best-cell"><p>最高ポイント</p><b>${fmt(p.bestScore)}<small>pt</small></b></div>
          <div class="best-cell"><p>最大コンボ</p><b>${fmt(p.maxCombo)}</b></div>
          <div class="best-cell"><p>最高正答率</p><b>${p.bestAccuracy == null ? '—' : p.bestAccuracy + '<small>%</small>'}</b></div>
          <div class="best-cell"><p>最速クリア</p><b class="small-num">${fastestKeys.length ? fastestKeys.map(k => `<span>${k}問 ${formatDuration(p.fastest[k])}</span>`).join('') : '—'}</b></div>
        </div>
        <p class="note">最高正答率は5問以上の回、最速クリアは正答率80%以上の回が対象です。</p>

        <h2 class="sec-h">これまでの学習</h2>
        <dl class="stat-table">
          <div><dt>レベル</dt><dd>LEVEL ${lp.level}（${esc(Game.levelTitle(lp.level))}）</dd></div>
          <div><dt>累計ポイント</dt><dd>${fmt(p.totalXP)} pt</dd></div>
          <div><dt>挑戦回数</dt><dd>${fmt(p.sessions)} 回（最後まで解いた回 ${fmt(p.completed)}）</dd></div>
          <div><dt>総回答数</dt><dd>${fmt(p.totalAnswered)} 問</dd></div>
          <div><dt>正解数 / 不正解数</dt><dd>${fmt(p.correct)} / ${fmt(p.wrong)}</dd></div>
          <div><dt>正答率</dt><dd>${accuracy == null ? '—' : accuracy + '%'}</dd></div>
        </dl>

        <h2 class="sec-h">自己記録ランキング</h2>
        ${ranking.length ? `<ol class="ranking">${ranking.map((h, i) => `
          <li><span class="rank r${i + 1}">${i + 1}</span>
            <div><b>${fmt(h.score)} pt</b><span>${h.total}問 ・ 正答率 ${h.accuracy}% ・ 最大 ${h.maxCombo} コンボ ・ ${formatDuration(h.timeMs)}</span></div>
            <time>${formatDate(h.at)}</time></li>`).join('')}</ol>` : '<p class="empty">まだ記録がありません。最初の挑戦をしてみましょう。</p>'}

        <h2 class="sec-h">最近の挑戦</h2>
        ${state.history.length ? `<div class="table-wrap"><table class="history">
          <thead><tr><th scope="col">日時</th><th scope="col">問題数</th><th scope="col">正答率</th><th scope="col">ポイント</th><th scope="col">最大コンボ</th><th scope="col">時間</th></tr></thead>
          <tbody>${state.history.slice(0, 10).map(h => `<tr><td>${formatDate(h.at)}</td><td>${h.total}</td><td>${h.accuracy}%</td><td>${fmt(h.score)}</td><td>${h.maxCombo}</td><td>${formatDuration(h.timeMs)}</td></tr>`).join('')}</tbody>
        </table></div>` : '<p class="empty">まだ挑戦の履歴がありません。</p>'}

        <section class="danger-zone">
          <h2 class="sec-h">データの初期化</h2>
          <p>レベル・記録・お気に入り・苦手問題をすべて消去します。元に戻せません。</p>
          <button class="btn danger" id="reset-btn">学習データを初期化する</button>
          <div class="confirm" id="reset-confirm" hidden>
            <p>本当にすべての学習データを消去しますか？</p>
            <button class="btn danger small" id="reset-yes">消去する</button>
            <button class="btn ghost small" id="reset-no">やめる</button>
          </div>
        </section>
      </section>`;
    setView('records', html);
    $('#reset-btn').addEventListener('click', () => { $('#reset-confirm').hidden = false; $('#reset-no').focus(); });
    $('#reset-no').addEventListener('click', () => { $('#reset-confirm').hidden = true; });
    $('#reset-yes').addEventListener('click', () => { Store.reset(); toast('学習データを初期化しました'); renderRecords(); });
  }

  // ================================================================ エラー画面
  function renderFatal(message) {
    setView('error', `
      <section class="fatal">
        <p class="kicker">読み込みエラー</p>
        <h1>問題を表示できませんでした</h1>
        <p>${esc(message)}</p>
        <p class="note">ファイル構成が正しいか（index.html と同じ場所に data フォルダがあるか）を確認してから、ページを再読み込みしてください。</p>
        <button class="btn primary" onclick="location.reload()">再読み込みする</button>
      </section>`);
  }

  // ================================================================ キーボード操作（問題画面）
  function onGlobalKeydown(e) {
    const overlay = $('#overlay');
    if (!overlay.hidden) {
      if (e.key === 'Escape' || e.key === 'Enter') { e.preventDefault(); overlay.querySelector('[data-action="close-overlay"]').click(); }
      return;
    }
    if (currentView !== 'quiz' || e.ctrlKey || e.altKey || e.metaKey) return;
    const t = e.target;
    if (t.closest && t.closest('input, select, textarea, .capture')) return;
    const s = Store.state.session;
    if (!s || !answerUI) return;
    const isButton = t.tagName === 'BUTTON';
    if (s.phase === 'question' && answerUI.question.type === 'choice') {
      const map = { '1': 0, '2': 1, '3': 2, '4': 3, a: 0, b: 1, c: 2, d: 3 };
      const idx = map[e.key.toLowerCase()];
      if (idx != null) { e.preventDefault(); selectChoice(idx); return; }
    }
    if (e.key === 'Enter' && !isButton) {
      e.preventDefault();
      if (s.phase === 'answered') goNext(); else submitAnswer();
    }
  }

  // ================================================================ 起動
  function navigate(name) {
    if (currentView === 'quiz' && Store.state.session) leaveQuiz();
    if (name === 'home') renderHome();
    if (name === 'list') renderList();
    if (name === 'records') renderRecords();
  }

  /** shortcuts.html の「道場で練習」から来たとき：#practice.K-001.C-001 */
  function readPracticeHash() {
    const m = (location.hash || '').match(/^#practice\.([A-Za-z0-9.\-_]+)$/);
    if (!m) return;
    const ids = m[1].split('.').filter(id => Bank.byId.has(id));
    practiceRequest = ids.length ? ids : null;
    if (!ids.length) toast('練習する問題が見つかりませんでした。');
    try { history.replaceState(null, '', location.pathname + location.search); } catch (e) { /* 失敗しても続行 */ }
  }

  function init() {
    Store.load();
    $$('.nav-btn').forEach(b => b.addEventListener('click', () => navigate(b.dataset.nav)));
    $$('.site-switch a, a[href="shortcuts.html"]').forEach(a => a.addEventListener('click', () => { if (currentView === 'quiz' && Store.state.session) { commitClock(); clockSince = null; Store.save(); } }));
    document.addEventListener('keydown', onGlobalKeydown);
    const persist = () => { if (currentView === 'quiz') { commitClock(); Store.save(); } };
    window.addEventListener('hashchange', () => { readPracticeHash(); if (practiceRequest && currentView !== 'quiz') renderHome(); });
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') { persist(); clockSince = null; }
      else if (currentView === 'quiz' && Store.state.session) clockSince = Date.now();
    });
    window.addEventListener('pagehide', persist);

    if (!window.QUIZ_DATA) { renderFatal('問題データ（data/questions.js）が見つかりませんでした。'); return; }
    if (!loadBank()) { renderFatal('問題データに表示できる問題がありませんでした。問題の書き方を確認してください。'); return; }
    readPracticeHash();
    renderHome();
    flushNotices();
    if (Bank.skipped) toast(`問題データの一部に不備があったため、${Bank.skipped}問を除外しました`);
  }

  window.addEventListener('error', e => {
    console.error(e.error || e.message);
    toast('予期しない問題が発生しました。ページを再読み込みしても学習データは残っています。');
  });

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
