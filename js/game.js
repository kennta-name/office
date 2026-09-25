/**
 * game.js — ポイント・コンボ・レベルの計算ルール
 * ------------------------------------------------------------
 * ゲームバランスを調整したいときは、このファイルの数値だけを変更します。
 */
(function (global) {
  'use strict';

  const DEFAULT_POINTS = { EASY: 50, NORMAL: 100, HARD: 200 };

  /** コンボ演出を出すコンボ数 */
  const COMBO_MILESTONES = [3, 5, 10, 15, 20, 30, 50];

  /** 全問正解ボーナス（5問以上のとき） */
  const PERFECT_BONUS = 300;

  /** レベルごとの称号（そのレベル以上で表示） */
  const LEVEL_TITLES = [
    [1, 'ビギナー'], [3, 'ルーキー'], [5, 'アシスタント'], [8, 'エキスパート'],
    [12, 'プロフェッショナル'], [16, 'マスター'], [20, 'レジェンド']
  ];

  function basePoints(difficulty, table) {
    const points = table || DEFAULT_POINTS;
    return points[difficulty] || points.NORMAL || DEFAULT_POINTS.NORMAL;
  }

  /** 連続正解ボーナス：2連続で +10%、3連続で +20% … 最大 +100% */
  function comboBonus(base, combo) {
    if (combo < 2) return 0;
    return Math.round(base * Math.min(combo - 1, 10) * 0.1);
  }

  /** レベル n になるのに必要な累計ポイント（2:300, 3:900, 4:1800, 5:3000 …） */
  function levelThreshold(level) {
    return 150 * level * (level - 1);
  }

  function levelFromXP(xp) {
    let level = 1;
    while (xp >= levelThreshold(level + 1)) level += 1;
    return level;
  }

  function levelProgress(xp) {
    const level = levelFromXP(xp);
    const start = levelThreshold(level);
    const next = levelThreshold(level + 1);
    return { level, start, next, toNext: next - xp, ratio: (xp - start) / (next - start) };
  }

  function levelTitle(level) {
    let title = LEVEL_TITLES[0][1];
    LEVEL_TITLES.forEach(([min, name]) => { if (level >= min) title = name; });
    return title;
  }

  function isComboMilestone(combo) {
    return COMBO_MILESTONES.indexOf(combo) !== -1 || (combo > 50 && combo % 10 === 0);
  }

  /** 結果画面のひとこと */
  function resultMessage(accuracy) {
    if (accuracy === 100) return 'パーフェクト！';
    if (accuracy >= 80) return 'すばらしい！';
    if (accuracy >= 60) return 'いい調子です';
    if (accuracy >= 40) return 'あと少し！';
    return 'ここから伸びます';
  }

  global.Game = {
    DEFAULT_POINTS, COMBO_MILESTONES, PERFECT_BONUS,
    basePoints, comboBonus, levelThreshold, levelFromXP, levelProgress, levelTitle,
    isComboMilestone, resultMessage
  };
})(window);
