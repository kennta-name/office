/**
 * keyboard.js — キー操作の取得・表記ゆれの吸収・正誤判定
 * ------------------------------------------------------------
 * キーの組み合わせは { mods: ['Ctrl','Shift'], key: 'S' } の形（Combo）で扱います。
 *  - mods は必ず Ctrl → Shift → Alt → Win の順に並べる
 *  - key は 'A'〜'Z', '0'〜'9', 'F1'〜'F24', 'Left'/'Right'/'Up'/'Down', 'Enter' など
 *  - key が null のときは修飾キーだけの操作（例：Shift）
 *  - 'Arrow' は「どの矢印キーでもよい」を表す特別な値
 */
(function (global) {
  'use strict';

  const MODIFIER_ORDER = ['Ctrl', 'Shift', 'Alt', 'Win'];
  const ARROWS = ['Left', 'Right', 'Up', 'Down'];
  const IS_MAC = /Mac|iPhone|iPad|iPod/i.test((navigator.userAgentData && navigator.userAgentData.platform) || navigator.platform || navigator.userAgent);

  /** 画面に表示するときのキー名 */
  const KEY_LABELS = { Left: '←', Right: '→', Up: '↑', Down: '↓', Arrow: '矢印キー', Win: 'Win' };

  /** KeyboardEvent.code → キー名（配列に依存しない物理キーで判定する） */
  const CODE_TO_KEY = {
    Semicolon: ';', Equal: '=', Minus: '-', Comma: ',', Period: '.', Slash: '/', Quote: "'",
    BracketLeft: '[', BracketRight: ']', Backslash: '\\', IntlRo: '\\', IntlYen: '¥', Backquote: '`',
    Space: 'Space', Enter: 'Enter', NumpadEnter: 'Enter', Escape: 'Esc', Tab: 'Tab',
    Backspace: 'Backspace', Delete: 'Delete', Insert: 'Insert', Home: 'Home', End: 'End',
    PageUp: 'PageUp', PageDown: 'PageDown', ArrowLeft: 'Left', ArrowRight: 'Right',
    ArrowUp: 'Up', ArrowDown: 'Down', ContextMenu: 'Menu', PrintScreen: 'PrintScreen',
    NumpadAdd: '+', NumpadSubtract: '-', NumpadMultiply: '*', NumpadDivide: '/', NumpadDecimal: '.'
  };

  /** KeyboardEvent.key のうち修飾キーを表すもの */
  const MODIFIER_EVENT_KEYS = { Control: 'Ctrl', Shift: 'Shift', Alt: 'Alt', AltGraph: 'Alt', Meta: 'Win', OS: 'Win' };

  /** 文字入力の表記ゆれ（小文字・「キー」除去後の文字列で照合） */
  const MODIFIER_WORDS = {
    ctrl: 'Ctrl', control: 'Ctrl', ctl: 'Ctrl', 'コントロール': 'Ctrl', '⌃': 'Ctrl', strg: 'Ctrl', '^': 'Ctrl',
    cmd: 'Ctrl', command: 'Ctrl', '⌘': 'Ctrl', 'コマンド': 'Ctrl',
    shift: 'Shift', 'シフト': 'Shift', '⇧': 'Shift',
    alt: 'Alt', option: 'Alt', opt: 'Alt', 'オルト': 'Alt', 'オプション': 'Alt', '⌥': 'Alt',
    win: 'Win', windows: 'Win', 'ウィンドウズ': 'Win', 'ウインドウズ': 'Win', '⊞': 'Win',
    meta: 'Win', super: 'Win', 'windowsロゴ': 'Win', 'ロゴ': 'Win'
  };
  const KEY_WORDS = {
    enter: 'Enter', return: 'Enter', 'エンター': 'Enter', '改行': 'Enter', '↵': 'Enter', '⏎': 'Enter',
    esc: 'Esc', escape: 'Esc', 'エスケープ': 'Esc',
    space: 'Space', spacebar: 'Space', 'スペース': 'Space', '空白': 'Space',
    tab: 'Tab', 'タブ': 'Tab',
    home: 'Home', 'ホーム': 'Home', end: 'End', 'エンド': 'End',
    delete: 'Delete', del: 'Delete', 'デリート': 'Delete', backspace: 'Backspace', bs: 'Backspace', 'バックスペース': 'Backspace',
    insert: 'Insert', ins: 'Insert', pageup: 'PageUp', pgup: 'PageUp', pagedown: 'PageDown', pgdn: 'PageDown',
    printscreen: 'PrintScreen', prtsc: 'PrintScreen', prtscn: 'PrintScreen',
    '←': 'Left', left: 'Left', '左': 'Left', '左矢印': 'Left', '→': 'Right', right: 'Right', '右': 'Right', '右矢印': 'Right',
    '↑': 'Up', up: 'Up', '上': 'Up', '上矢印': 'Up', '↓': 'Down', down: 'Down', '下': 'Down', '下矢印': 'Down',
    '矢印': 'Arrow', arrow: 'Arrow', arrows: 'Arrow', '方向': 'Arrow', 'カーソル': 'Arrow', '十字': 'Arrow', '←→↑↓': 'Arrow',
    'セミコロン': ';', semicolon: ';', 'コロン': ':', colon: ':', 'プラス': '+', plus: '+', 'イコール': '=', equal: '='
  };

  /** ブラウザや OS が先に処理してしまい、ページで受け取れない（または危険な）組み合わせ */
  const RESERVED = new Set(['Alt+Tab', 'Alt+F4', 'Ctrl+W', 'Ctrl+T', 'Ctrl+N', 'Ctrl+Shift+N', 'Ctrl+Shift+T',
    'Ctrl+Shift+W', 'Ctrl+Shift+Esc', 'Ctrl+Alt+Delete', 'Ctrl+Tab', 'F12', 'Ctrl+Shift+I']);

  // ---------------------------------------------------------------- Combo 基本操作
  function sortMods(mods) {
    return MODIFIER_ORDER.filter(m => mods.indexOf(m) !== -1);
  }
  function createCombo(mods, key) {
    return { mods: sortMods(mods || []), key: key || null };
  }
  function comboToString(combo) {
    if (!combo) return '';
    return combo.mods.concat(combo.key ? [combo.key] : []).join('+');
  }
  function keyLabel(key) {
    return KEY_LABELS[key] || key;
  }
  /** 表示用のキー名の配列（例：['Ctrl','Shift','←']） */
  function comboToLabels(combo) {
    if (!combo) return [];
    return combo.mods.map(keyLabel).concat(combo.key ? [keyLabel(combo.key)] : []);
  }
  function isModifierOnly(combo) {
    return !!combo && !combo.key && combo.mods.length > 0;
  }
  function isReserved(combo) {
    if (!combo) return false;
    return combo.mods.indexOf('Win') !== -1 || RESERVED.has(comboToString(combo));
  }

  // ---------------------------------------------------------------- キーボードイベント → Combo
  function modsFromEvent(e) {
    const mods = [];
    if (e.ctrlKey || (IS_MAC && e.metaKey)) mods.push('Ctrl'); // Mac の ⌘ は Office の Ctrl として扱う
    if (e.shiftKey) mods.push('Shift');
    if (e.altKey) mods.push('Alt');
    if (e.metaKey && !IS_MAC) mods.push('Win');
    return sortMods(mods);
  }
  function keyFromEvent(e) {
    const code = e.code || '';
    let m = code.match(/^Key([A-Z])$/);
    if (m) return m[1];
    m = code.match(/^(?:Digit|Numpad)([0-9])$/);
    if (m) return m[1];
    if (/^F([1-9]|1[0-9]|2[0-4])$/.test(code)) return code;
    if (CODE_TO_KEY[code]) return CODE_TO_KEY[code];
    // code が取れない環境（一部のスマートフォン等）では key から推測する
    const k = e.key || '';
    if (k.length === 1) return k === ' ' ? 'Space' : k.toUpperCase();
    const fromKey = { ArrowLeft: 'Left', ArrowRight: 'Right', ArrowUp: 'Up', ArrowDown: 'Down', Escape: 'Esc', ' ': 'Space' };
    if (fromKey[k]) return fromKey[k];
    if (/^F\d{1,2}$/.test(k)) return k;
    return k || null;
  }

  /**
   * 要素に「キー入力欄」の振る舞いを付ける。
   * handlers: onChange(combo|null), onPreview(combo|null), onSubmit(), onNotice(type)
   * 戻り値の destroy() でイベントを外せる。
   */
  function attachKeyCapture(el, handlers) {
    let soloCandidate = null;   // 修飾キーだけを押している間の候補（例：Shift 単独）
    let heldWin = false;

    function onKeyDown(e) {
      if (e.isComposing || e.key === 'Process' || e.keyCode === 229) {
        handlers.onNotice('ime');
        return;
      }
      const modName = MODIFIER_EVENT_KEYS[e.key];
      const mods = modsFromEvent(e);
      if (modName) {
        e.preventDefault();
        if (modName === 'Win') heldWin = true;
        if (!e.repeat) {
          const own = IS_MAC && modName === 'Win' ? 'Ctrl' : modName;
          soloCandidate = sortMods(mods.indexOf(own) === -1 ? mods.concat(own) : mods);
          handlers.onPreview(createCombo(soloCandidate, null));
        }
        return;
      }
      const key = keyFromEvent(e);
      if (!key || key === 'Unidentified' || key === 'Dead') { handlers.onNotice('unknown'); return; }
      const plain = mods.length === 0;
      // 画面操作のためのキーはそのまま使えるようにする
      if (key === 'Tab' && (plain || (mods.length === 1 && mods[0] === 'Shift'))) return;
      if (plain && key === 'Esc') { el.blur(); return; }
      if (plain && key === 'Enter') { e.preventDefault(); handlers.onSubmit(); return; }
      if (plain && key === 'Backspace') { e.preventDefault(); soloCandidate = null; handlers.onChange(null); return; }

      e.preventDefault();
      e.stopPropagation();
      if (e.repeat) return;
      soloCandidate = null;
      handlers.onChange(createCombo(mods, key));
    }
    function onKeyUp(e) {
      const modName = MODIFIER_EVENT_KEYS[e.key];
      if (!modName) return;
      e.preventDefault(); // Alt 単独で離したときにブラウザのメニューへ移動しないようにする
      if (modName === 'Win') heldWin = false;
      if (soloCandidate) {
        handlers.onChange(createCombo(soloCandidate, null));
        soloCandidate = null;
      } else {
        handlers.onPreview(null);
      }
    }
    function onBlur() {
      // Windows キーを押したままフォーカスが外れた＝OS がキー操作を横取りした可能性が高い
      if (heldWin) handlers.onNotice('os');
      heldWin = false;
      soloCandidate = null;
      handlers.onPreview(null);
    }
    el.addEventListener('keydown', onKeyDown);
    el.addEventListener('keyup', onKeyUp);
    el.addEventListener('blur', onBlur);
    window.addEventListener('blur', onBlur);
    return {
      destroy() {
        el.removeEventListener('keydown', onKeyDown);
        el.removeEventListener('keyup', onKeyUp);
        el.removeEventListener('blur', onBlur);
        window.removeEventListener('blur', onBlur);
      }
    };
  }

  // ---------------------------------------------------------------- 文字列 → Combo（表記ゆれの吸収）
  function normalizeWord(word) {
    let w = word.trim().toLowerCase();
    w = w.replace(/(キー|key)$/i, '').trim();
    return w;
  }
  function parseKeyWord(word) {
    const w = normalizeWord(word);
    if (!w) return null;
    if (MODIFIER_WORDS[w]) return { mod: MODIFIER_WORDS[w] };
    if (KEY_WORDS[w]) return { key: KEY_WORDS[w] };
    const f = w.match(/^f(\d{1,2})$/);
    if (f && +f[1] >= 1 && +f[1] <= 24) return { key: 'F' + (+f[1]) };
    if (w.length === 1) return { key: /[a-z]/.test(w) ? w.toUpperCase() : w };
    // 「←/→」「←→」のように複数の矢印をまとめて書いた場合
    const arrows = Array.from(w.replace(/[\s\/・,、]/g, '')).map(ch => KEY_WORDS[ch]);
    if (arrows.length > 1 && arrows.every(k => ARROWS.indexOf(k) !== -1)) return { keys: arrows };
    return null;
  }
  function splitParts(text) {
    if (text.indexOf('+') !== -1) {
      const parts = text.split('+').map(s => s.trim());
      // 「Ctrl++」のように + キーそのものを指定した場合
      if (parts.length >= 2 && parts[parts.length - 1] === '' && parts[parts.length - 2] === '') { parts.splice(-2, 2, '+'); }
      return parts.filter(Boolean);
    }
    if (/^(ctrl|control|shift|alt|win|cmd)[-_]/i.test(text)) return text.split(/[-_]/).filter(Boolean);
    if (/\s/.test(text)) return text.split(/\s+/).filter(Boolean);
    return [text];
  }
  /**
   * 文字列を Combo の配列に変換する（「F5 または Ctrl+G」のように複数書かれた場合は複数返す）。
   * 戻り値：{ combos: Combo[], unknown: string[] }
   */
  function parseComboText(input) {
    let text = String(input || '').normalize('NFKC').trim();
    const result = { combos: [], unknown: [] };
    if (!text) return result;
    const extras = [];
    text = text.replace(/\(([^)]*)\)/g, (m, inner) => { extras.push(inner); return ' '; });
    const splitAlternatives = s => s.split(/または|もしくは|\bor\b|\|/i).map(p => p.trim()).filter(Boolean);
    const alternatives = splitAlternatives(text).map(t => ({ text: t, extra: false }))
      .concat(extras.reduce((list, s) => list.concat(splitAlternatives(s)), []).map(t => ({ text: t, extra: true })));
    alternatives.forEach(({ text: alt, extra: isExtra }) => {
      const mods = [];
      let keys = [null];
      const unknown = [];
      let keyCount = 0;
      splitParts(alt).forEach(part => {
        const parsed = parseKeyWord(part);
        if (!parsed) { unknown.push(part); return; }
        if (parsed.mod) { if (mods.indexOf(parsed.mod) === -1) mods.push(parsed.mod); return; }
        keyCount += 1;
        keys = parsed.keys ? parsed.keys : [parsed.key];
      });
      if (isExtra && (unknown.length || !mods.length)) return; // （セミコロン）などの補足は無視し、「（またはCtrl+G）」は別解として扱う
      if (unknown.length) { result.unknown = result.unknown.concat(unknown); return; }
      if (keyCount > 1) { result.unknown.push(alt); return; }
      if (!mods.length && keyCount === 0) return;
      keys.forEach(k => result.combos.push(createCombo(mods, k)));
    });
    return result;
  }

  // ---------------------------------------------------------------- 判定
  function keysMatch(a, b) {
    if (a === b) return true;
    if (a === 'Arrow' && ARROWS.indexOf(b) !== -1) return true;
    if (b === 'Arrow' && ARROWS.indexOf(a) !== -1) return true;
    return false;
  }
  function combosMatch(a, b) {
    return a.mods.join('+') === b.mods.join('+') && keysMatch(a.key, b.key);
  }
  /** accepted（文字列配列）をすべて Combo に変換する */
  function acceptedCombos(accepted) {
    return (accepted || []).reduce((list, text) => list.concat(parseComboText(text).combos), []);
  }
  /** 入力された Combo（1つ以上）がすべて許容回答に含まれていれば正解 */
  function judgeCombos(userCombos, accepted) {
    const valid = acceptedCombos(accepted);
    if (!userCombos || !userCombos.length || !valid.length) return false;
    return userCombos.every(u => valid.some(a => combosMatch(u, a)));
  }

  /** 用語の回答用：全角半角・大文字小文字・ひらがな/カタカナ・空白や記号の違いを吸収 */
  function normalizeTerm(text) {
    return String(text || '')
      .normalize('NFKC')
      .toLowerCase()
      .replace(/[ぁ-ゖ]/g, ch => String.fromCharCode(ch.charCodeAt(0) + 0x60))
      .replace(/[\s、。・,.!?「」『』()\[\]"'`~\-ー_:：;]/g, '');
  }
  function judgeTerm(input, accepted) {
    const value = normalizeTerm(input);
    if (!value) return false;
    return (accepted || []).some(a => normalizeTerm(a) === value);
  }

  global.KeyCombo = {
    IS_MAC, ARROWS, MODIFIER_ORDER,
    createCombo, comboToString, comboToLabels, keyLabel, isModifierOnly, isReserved,
    attachKeyCapture, parseComboText, acceptedCombos, judgeCombos, combosMatch,
    normalizeTerm, judgeTerm
  };
})(window);
