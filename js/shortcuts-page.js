/**
 * shortcuts-page.js — ショートカット一覧サイトの表示・検索・「覚えた」チェック
 * 依存：data/shortcuts.js（window.SHORTCUT_DATA）, keyboard.js（KeyCombo）
 */
(function () {
  'use strict';

  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const norm = s => String(s || '').normalize('NFKC').toLowerCase().replace(/\s+/g, '');

  const LEARNED_KEY = 'officeKeyDojo:learned';
  const LEVEL_LABEL = { 3: '最優先', 2: '慣れたら', 1: '必要なとき' };
  const KEY_LABEL = { Left: '←', Right: '→', Up: '↑', Down: '↓', Arrow: '矢印キー' };

  const state = { app: 'all', query: '', combo: null, topOnly: false, unlearnedOnly: false };
  let learned = new Set();

  function loadLearned() {
    try { learned = new Set(JSON.parse(localStorage.getItem(LEARNED_KEY) || '[]')); }
    catch (e) { learned = new Set(); }
  }
  function saveLearned() {
    try { localStorage.setItem(LEARNED_KEY, JSON.stringify(Array.from(learned))); }
    catch (e) { toast('チェックを保存できませんでした。画面を閉じると元に戻ります。'); }
  }
  function toast(message) {
    const box = $('#toast');
    const item = document.createElement('div');
    item.className = 'toast-item';
    item.textContent = message;
    box.appendChild(item);
    setTimeout(() => item.classList.add('out'), 3200);
    setTimeout(() => item.remove(), 3600);
  }

  /** "Ctrl+Shift+S" / "Alt>F" / "Shift+ドラッグ" をキーキャップで表示 */
  function keyHTML(text) {
    if (text.indexOf('>') !== -1) return text.split('>').map(keyHTML).join('<span class="then" aria-label="の次に">→</span>');
    const parts = text.split('+');
    if (parts.length > 1 && parts[parts.length - 1] === '') { parts.splice(-2, 2, '+'); }
    return '<span class="keys">' + parts.map(p =>
      /^「.*」$/.test(p) ? `<span class="typed" title="この文字を入力">${esc(p.slice(1, -1))}</span>`
        : /ドラッグ|クリック/.test(p) ? `<span class="mouse">${esc(p)}</span>` : `<kbd>${esc(KEY_LABEL[p] || p)}</kbd>`
    ).join('<span class="plus" aria-hidden="true">+</span>') + '</span>';
  }

  /** 項目のキーを Combo に変換（キー検索用） */
  function itemCombos(item) {
    if (!item._combos) {
      item._combos = item.keys.filter(k => !/ドラッグ|クリック|>/.test(k))
        .reduce((list, k) => list.concat(KeyCombo.parseComboText(k).combos), []);
    }
    return item._combos;
  }

  function matches(item) {
    if (state.app !== 'all' && item.app !== state.app) return false;
    if (state.topOnly && item.level !== 3) return false;
    if (state.unlearnedOnly && learned.has(item.id)) return false;
    if (state.combo && !itemCombos(item).some(c => KeyCombo.combosMatch(c, state.combo))) return false;
    if (state.query) {
      // 「ctrl+s」「コントロール＋S」のようにキーとして読める場合は、キーの組み合わせで探す
      const parsed = /[+＋]/.test(state.query) ? KeyCombo.parseComboText(state.query) : { unknown: [1], combos: [] };
      if (!parsed.unknown.length && parsed.combos.length) {
        return itemCombos(item).some(c => parsed.combos.some(p => KeyCombo.combosMatch(c, p)));
      }
      const q = norm(state.query);
      const haystack = norm([item.name, item.description, item.usage, item.app, item.keys.join(' ')].join(' '));
      return haystack.indexOf(q) !== -1;
    }
    return true;
  }

  function rowHTML(item) {
    const isLearned = learned.has(item.id);
    const practice = item.practice && item.practice.length
      ? `<a class="practice-link" href="index.html#practice.${item.practice.map(encodeURIComponent).join('.')}">道場で練習<small>${item.practice.length}問</small></a>`
      : '<span class="practice-none">—</span>';
    return `
      <li class="sc-row ${isLearned ? 'is-learned' : ''}">
        <div class="sc-keys">${item.keys.map(keyHTML).join('<span class="or">または</span>')}</div>
        <div class="sc-body-cell">
          <p class="sc-name">${esc(item.name)}<span class="level-tag l${item.level}">${LEVEL_LABEL[item.level]}</span></p>
          <p class="sc-desc">${esc(item.description)}</p>
          <p class="sc-usage"><span>使いどころ</span>${esc(item.usage)}</p>
        </div>
        <div class="sc-side">
          <label class="learn"><input type="checkbox" data-learn="${esc(item.id)}" ${isLearned ? 'checked' : ''}><span>覚えた</span></label>
          ${practice}
        </div>
      </li>`;
  }

  function render() {
    const data = window.SHORTCUT_DATA;
    const items = data.items.filter(matches);
    const groups = state.app === 'all' ? data.apps : [state.app];
    const html = groups.map(app => {
      const list = items.filter(i => i.app === app);
      if (!list.length) return '';
      return `<section class="sc-group" aria-labelledby="g-${esc(app)}">
        <h2 class="sec-h" id="g-${esc(app)}">${esc(app)}<span class="num-count">${list.length}</span></h2>
        <ul class="sc-list">${list.map(rowHTML).join('')}</ul>
      </section>`;
    }).join('');
    $('#sc-list').innerHTML = html || '<p class="empty">条件に合うショートカットがありません。検索語やキーを変えてみてください。</p>';
    const total = data.items.length;
    $('#sc-progress').innerHTML = `覚えた <b>${learned.size}</b> ／ ${total}<span class="bar" aria-hidden="true"><span style="width:${(learned.size / total * 100).toFixed(1)}%"></span></span>`;
    $$('#sc-apps .filter-tab').forEach(t => {
      t.setAttribute('aria-selected', String(t.dataset.app === state.app));
    });
  }

  function init() {
    const data = window.SHORTCUT_DATA;
    if (!data || !Array.isArray(data.items) || !data.items.length) {
      $('#sc-list').innerHTML = '<p class="empty">ショートカットのデータ（data/shortcuts.js）を読み込めませんでした。ファイル構成を確認して、再読み込みしてください。</p>';
      return;
    }
    loadLearned();
    $('#sc-total').textContent = data.items.length + '件';
    const counts = data.apps.map(a => [a, data.items.filter(i => i.app === a).length]);
    $('#sc-apps').innerHTML = `<button type="button" role="tab" class="filter-tab" data-app="all">すべて<span>${data.items.length}</span></button>` +
      counts.map(([a, n]) => `<button type="button" role="tab" class="filter-tab" data-app="${esc(a)}">${esc(a)}<span>${n}</span></button>`).join('');
    $('#sc-apps').addEventListener('click', e => {
      const t = e.target.closest('[data-app]');
      if (!t) return;
      state.app = t.dataset.app;
      render();
    });

    const search = $('#sc-search');
    search.addEventListener('input', () => { state.query = search.value.trim(); render(); });

    // キーを押して探す
    const capture = $('#sc-capture');
    const display = $('#sc-capture-display');
    const clearBtn = $('#sc-clear');
    const showCombo = (combo, done) => {
      clearBtn.hidden = !state.combo;
      if (!combo) {
        display.className = 'placeholder';
        display.innerHTML = 'ここをクリックしてキーを押す';
        return;
      }
      display.className = '';
      display.innerHTML = '<span class="keys">' + KeyCombo.comboToLabels(combo).map(l => `<kbd>${esc(l)}</kbd>`).join('<span class="plus">+</span>') + '</span>' + (done ? '' : '<span class="plus">+ …</span>');
    };
    // 解除ボタンはキー表示の外に置き、押した瞬間に表示が書き換わっても消えないようにする
    clearBtn.addEventListener('mousedown', ev => ev.preventDefault());
    clearBtn.addEventListener('click', ev => {
      ev.stopPropagation();
      state.combo = null;
      showCombo(null);
      render();
      capture.focus();
    });
    KeyCombo.attachKeyCapture(capture, {
      onChange(combo) { state.combo = combo; showCombo(combo, true); render(); },
      onPreview(combo) { if (combo) showCombo(combo, false); else showCombo(state.combo, !!state.combo); },
      onSubmit() {},
      onNotice(type) {
        toast(type === 'ime' ? '日本語入力をオフにしてから、キーを押してください。'
          : type === 'os' ? 'Windows キーを使う操作は OS が先に反応するため、ことばで探してください。'
            : 'このキーは読み取れませんでした。ことばで探してください。');
      }
    });

    $('#sc-top').addEventListener('change', e => { state.topOnly = e.target.checked; render(); });
    $('#sc-unlearned').addEventListener('change', e => { state.unlearnedOnly = e.target.checked; render(); });
    $('#sc-list').addEventListener('change', e => {
      const box = e.target.closest('[data-learn]');
      if (!box) return;
      if (box.checked) learned.add(box.dataset.learn); else learned.delete(box.dataset.learn);
      saveLearned();
      box.closest('.sc-row').classList.toggle('is-learned', box.checked);
      if (state.unlearnedOnly && box.checked) { setTimeout(render, 250); return; }
      const id = box.dataset.learn;
      render();
      const again = $(`[data-learn="${id}"]`);
      if (again) again.focus({ preventScroll: true });
    });

    // 「/」で検索欄へ
    document.addEventListener('keydown', e => {
      if (e.key === '/' && !e.target.closest('input, textarea, .sc-capture')) { e.preventDefault(); search.focus(); }
    });
    render();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
