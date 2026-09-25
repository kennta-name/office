/**
 * 問題データ（Officeキー道場）
 * ------------------------------------------------------------
 * 元資料：「Office活用 基礎力チェック問題集」（選択式50問・入力式50問）
 *
 * ■ 問題を追加するときは questions 配列にオブジェクトを1つ足すだけです。
 *   アプリ本体（js/ 以下）を変更する必要はありません。
 *
 * ■ 共通の項目
 *   id          : 問題ID（重複不可。例 "C-051"）
 *   type        : "choice"（選択式） / "input"（入力式）
 *   category    : 分類（categories のどれか。新しい分類も使えます）
 *   difficulty  : "EASY" / "NORMAL" / "HARD"（獲得ポイントは points で設定）
 *   question    : 問題文
 *   explanation : 解説
 *   supplement  : 補足説明（空文字なら非表示）
 *
 * ■ 選択式（type: "choice"）
 *   choices     : [{ text: "選択肢", explanation: "この選択肢の解説" }, ...]
 *   answer      : 正解の選択肢の番号（0 始まり。A=0, B=1, C=2, D=3）
 *
 * ■ 入力式（type: "input"）
 *   inputMode   : "keys"（ショートカットキーを押して回答） / "text"（用語を文字で回答）
 *   answer      : 画面に表示する正解
 *   accepted    : 正解として扱う回答の一覧
 *                 keys の場合はキーの組み合わせ（"Ctrl+C", "Win+Shift+S" など）。
 *                 "Arrow" はどの矢印キーでも正解、"Left/Right/Up/Down" は個別の矢印キー。
 *                 大文字・小文字、空白、全角・半角の違いは自動で吸収します。
 */
window.QUIZ_DATA = {
  "meta": {
    "title": "Officeキー道場",
    "version": "1.0.0",
    "source": "Office活用 基礎力チェック問題集"
  },
  "points": {
    "EASY": 50,
    "NORMAL": 100,
    "HARD": 200
  },
  "categories": [
    "共通",
    "Excel",
    "Word",
    "PowerPoint",
    "Windows"
  ],
  "questions": [
    {
      "id": "C-001",
      "type": "choice",
      "category": "共通",
      "difficulty": "EASY",
      "question": "作業中のファイルを上書き保存するための最も一般的で重要な共通ショートカットキーは何ですか。",
      "choices": [
        {
          "text": "Ctrl+C",
          "explanation": "Ctrl+C はコピーです。"
        },
        {
          "text": "Ctrl+S",
          "explanation": "こまめに押すことでデータ消失を防げます。"
        },
        {
          "text": "Ctrl+V",
          "explanation": "Ctrl+V は貼り付けです。"
        },
        {
          "text": "Ctrl+P",
          "explanation": "Ctrl+P は印刷です。"
        }
      ],
      "answer": 1,
      "explanation": "Ctrl+S は上書き保存を行う共通ショートカットです。",
      "supplement": "プロのコツ：区切りのいいところ、席を立つ前、別のファイルを開く前には必ず Ctrl+S。数秒の習慣で作業の消失を防げます。"
    },
    {
      "id": "C-002",
      "type": "choice",
      "category": "共通",
      "difficulty": "EASY",
      "question": "間違えた操作を取り消し、直前の状態に戻すための共通ショートカットキーは何ですか。",
      "choices": [
        {
          "text": "Ctrl+Y",
          "explanation": "Ctrl+Y はやり直しです。"
        },
        {
          "text": "Ctrl+Z",
          "explanation": "操作を間違えたときに何度でも取り消せます。"
        },
        {
          "text": "Ctrl+X",
          "explanation": "Ctrl+X は切り取りです。"
        },
        {
          "text": "Ctrl+A",
          "explanation": "Ctrl+A はすべて選択です。"
        }
      ],
      "answer": 1,
      "explanation": "Ctrl+Z は元に戻すを実行します。",
      "supplement": "プロのコツ：「何か変になった」と思ったら、まず Ctrl+Z。戻せると分かっていれば、新しい機能も気軽に試せます。"
    },
    {
      "id": "C-003",
      "type": "choice",
      "category": "Windows",
      "difficulty": "EASY",
      "question": "離席する際など、情報の漏えいを防ぐためにWindowsの画面をロックするためのショートカットキーは何ですか。",
      "choices": [
        {
          "text": "Win+D",
          "explanation": "Win+D はデスクトップの表示です。"
        },
        {
          "text": "Win+E",
          "explanation": "Win+E はエクスプローラーを開きます。"
        },
        {
          "text": "Win+L",
          "explanation": "離席時の情報漏えいを防ぐ必須マナーです。"
        },
        {
          "text": "Win+V",
          "explanation": "Win+V はクリップボード履歴です。"
        }
      ],
      "answer": 2,
      "explanation": "Win+L は画面をロックします。",
      "supplement": "プロのコツ：離席時は必ず Win+L。社会人の必須マナーです。"
    },
    {
      "id": "C-004",
      "type": "choice",
      "category": "Excel",
      "difficulty": "NORMAL",
      "question": "Excelの表の中で、何千行もあるデータの「最終行（データの端）」へ一瞬でジャンプするために使用する組み合わせはどれですか。",
      "choices": [
        {
          "text": "Ctrl+矢印キー",
          "explanation": "スクロールの手間を省く重要操作です。"
        },
        {
          "text": "Shift+矢印キー",
          "explanation": "Shift+矢印は範囲選択です。"
        },
        {
          "text": "Alt+Enter",
          "explanation": "Alt+Enterはセル内改行です。"
        },
        {
          "text": "F2キー",
          "explanation": "F2はセル編集です。"
        }
      ],
      "answer": 0,
      "explanation": "Ctrl+矢印キーでデータの端へジャンプできます。",
      "supplement": "プロのコツ：Shift を足した Ctrl+Shift+矢印キー なら、データの端までまとめて選択できます。"
    },
    {
      "id": "C-005",
      "type": "choice",
      "category": "PowerPoint",
      "difficulty": "NORMAL",
      "question": "PowerPointで、作成中の現在のスライドからスライドショーを開始するためのショートカットキーは何ですか。",
      "choices": [
        {
          "text": "F5",
          "explanation": "F5は最初からです。"
        },
        {
          "text": "Shift+F5",
          "explanation": "作成中のスライドの見え方をすぐに確認できます。"
        },
        {
          "text": "Ctrl+M",
          "explanation": "Ctrl+M はスライド追加です。"
        },
        {
          "text": "Ctrl+D",
          "explanation": "Ctrl+D は複製です。"
        }
      ],
      "answer": 1,
      "explanation": "Shift+F5 は現在のスライドからスライドショーを開始します。",
      "supplement": ""
    },
    {
      "id": "C-006",
      "type": "choice",
      "category": "共通",
      "difficulty": "EASY",
      "question": "Word文書やExcelシートの文字やデータ、あるいはファイル全体を「すべて選択」するための共通ショートカットキーは何ですか。",
      "choices": [
        {
          "text": "Ctrl+C",
          "explanation": "Ctrl+C はコピーです。"
        },
        {
          "text": "Ctrl+A",
          "explanation": "文書や表全体を一度に選べます。"
        },
        {
          "text": "Ctrl+V",
          "explanation": "Ctrl+V は貼り付けです。"
        },
        {
          "text": "Ctrl+S",
          "explanation": "Ctrl+S は保存です。"
        }
      ],
      "answer": 1,
      "explanation": "Ctrl+A はすべてを選択します。",
      "supplement": ""
    },
    {
      "id": "C-007",
      "type": "choice",
      "category": "Excel",
      "difficulty": "HARD",
      "question": "Excelにおいて、数式を編集している最中に「$A$1」のような絶対参照を簡単に入力・切り替えるために使用するキーは何ですか。",
      "choices": [
        {
          "text": "F2",
          "explanation": "F2はセル編集です。"
        },
        {
          "text": "F4",
          "explanation": "固定セルを参照する際に手軽に入力できます。"
        },
        {
          "text": "F7",
          "explanation": "F7はスペルチェックです。"
        },
        {
          "text": "F12",
          "explanation": "F12は名前を付けて保存です。"
        }
      ],
      "answer": 1,
      "explanation": "F4キーは数式編集中に絶対参照を切り替えます。",
      "supplement": ""
    },
    {
      "id": "C-008",
      "type": "choice",
      "category": "Word",
      "difficulty": "NORMAL",
      "question": "Wordの文書作成において、次の章や項目を強制的に「新しいページ」から始めるために最も適切な操作は何ですか。",
      "choices": [
        {
          "text": "Enterキーを何度も連打する",
          "explanation": "Enterの連打はレイアウト崩れの原因になります。"
        },
        {
          "text": "スペースキーを大量に入力する",
          "explanation": "スペースキーでの調整も不適切です。"
        },
        {
          "text": "Ctrl+Enter（改ページ）を使う",
          "explanation": "レイアウトを綺麗に保つ標準操作です。"
        },
        {
          "text": "新しいファイルを別々に作成する",
          "explanation": "別ファイル作成は目的外です。"
        }
      ],
      "answer": 2,
      "explanation": "Ctrl+Enter（改ページ）を使います。",
      "supplement": ""
    },
    {
      "id": "C-009",
      "type": "choice",
      "category": "PowerPoint",
      "difficulty": "NORMAL",
      "question": "PowerPointの資料作成において、1枚のスライドに盛り込む文字数の一般的な目安として最も適切なものはどれですか。",
      "choices": [
        {
          "text": "1000字以上詰め込んで詳細に説明する",
          "explanation": "多すぎると読みにくくなります。"
        },
        {
          "text": "200字以内を原則とし、要点だけにする",
          "explanation": "一目で伝わる資料になります。"
        },
        {
          "text": "500字程度で文章形式で記載する",
          "explanation": "文章形式が長すぎると伝わりません。"
        },
        {
          "text": "文字は一切入れず図形だけにする",
          "explanation": "図形だけでは文脈が伝わりません。"
        }
      ],
      "answer": 1,
      "explanation": "200字以内を原則とし要点を絞ります。",
      "supplement": ""
    },
    {
      "id": "C-010",
      "type": "choice",
      "category": "Windows",
      "difficulty": "NORMAL",
      "question": "Windowsのエクスプローラー画面などを素早く開き、ファイルやフォルダーを管理するためのショートカットキーは何ですか。",
      "choices": [
        {
          "text": "Win+D",
          "explanation": "Win+D はデスクトップ表示です。"
        },
        {
          "text": "Win+E",
          "explanation": "ファイルやフォルダー管理を素早く行えます。"
        },
        {
          "text": "Win+L",
          "explanation": "Win+L は画面ロックです。"
        },
        {
          "text": "Win+S",
          "explanation": "Win+Shift+S はスクリーンショットです。"
        }
      ],
      "answer": 1,
      "explanation": "Win+E はエクスプローラーを開きます。",
      "supplement": ""
    },
    {
      "id": "C-011",
      "type": "choice",
      "category": "Excel",
      "difficulty": "NORMAL",
      "question": "Excelの表作成において、セルの中の改行を行いたい場合に押すべきキーの組み合わせは何ですか。",
      "choices": [
        {
          "text": "Enterキーのみ",
          "explanation": "Enterのみでは下のセルへ移動します。"
        },
        {
          "text": "Alt+Enterキー",
          "explanation": "1つのセルに複数行入れるために必須です。"
        },
        {
          "text": "Shift+Enterキー",
          "explanation": "Shift+Enterは上のセルへ移動します。"
        },
        {
          "text": "Ctrl+Enterキー",
          "explanation": "Ctrl+Enterは用途が異なります。"
        }
      ],
      "answer": 1,
      "explanation": "Alt+Enter でセル内改行を行います。",
      "supplement": ""
    },
    {
      "id": "C-012",
      "type": "choice",
      "category": "共通",
      "difficulty": "EASY",
      "question": "コピーや切り取りを行った内容が一時的に保管される場所の名前として正しいものはどれですか。",
      "choices": [
        {
          "text": "テンプレート",
          "explanation": "テンプレートはひな形ファイルです。"
        },
        {
          "text": "クリップボード",
          "explanation": "貼り付けはこの場所から呼び出されます。"
        },
        {
          "text": "拡張子",
          "explanation": "拡張子はファイルの種類を表します。"
        },
        {
          "text": "プレースホルダー",
          "explanation": "プレースホルダーは入力枠です。"
        }
      ],
      "answer": 1,
      "explanation": "クリップボードに一時保管されます。",
      "supplement": ""
    },
    {
      "id": "C-013",
      "type": "choice",
      "category": "PowerPoint",
      "difficulty": "NORMAL",
      "question": "PowerPointで、複数の図形の端や間隔を自動でそろえるために使用する機能・リボンの分類はどれですか。",
      "choices": [
        {
          "text": "配置（整列）機能",
          "explanation": "端や間隔を自動で正確にそろえられます。"
        },
        {
          "text": "スライドマスター",
          "explanation": "スライドマスターは全体のデザイン設定です。"
        },
        {
          "text": "編集記号",
          "explanation": "編集記号はWordの表示機能です。"
        },
        {
          "text": "オートフィル",
          "explanation": "オートフィルはExcelの自動入力です。"
        }
      ],
      "answer": 0,
      "explanation": "配置（整列）機能を使います。",
      "supplement": "プロのコツ：図形の位置は目で合わせず、［図形の書式］→［配置］で揃えると資料の完成度が一段上がります。"
    },
    {
      "id": "C-014",
      "type": "choice",
      "category": "共通",
      "difficulty": "EASY",
      "question": "文書や表の中から、特定のキーワードを一瞬で探し出すための共通ショートカットキーは何ですか。",
      "choices": [
        {
          "text": "Ctrl+F",
          "explanation": "目的の文字を一瞬で見つけ出します。"
        },
        {
          "text": "Ctrl+H",
          "explanation": "Ctrl+H は検索と置換です。"
        },
        {
          "text": "Ctrl+P",
          "explanation": "Ctrl+P は印刷です。"
        },
        {
          "text": "Ctrl+W",
          "explanation": "Ctrl+W は閉じるです。"
        }
      ],
      "answer": 0,
      "explanation": "Ctrl+F は検索を行います。",
      "supplement": ""
    },
    {
      "id": "C-015",
      "type": "choice",
      "category": "共通",
      "difficulty": "HARD",
      "question": "WordやPowerPointなどで、おかしくなってしまった文字の書式を標準の状態に戻すためのショートカットキーは何ですか。",
      "choices": [
        {
          "text": "Ctrl+Space",
          "explanation": "崩れた書式をリセットできます。"
        },
        {
          "text": "Ctrl+B",
          "explanation": "Ctrl+B は太字です。"
        },
        {
          "text": "Ctrl+I",
          "explanation": "Ctrl+I は斜体です。"
        },
        {
          "text": "Ctrl+U",
          "explanation": "Ctrl+U は下線です。"
        }
      ],
      "answer": 0,
      "explanation": "Ctrl+Space は文字書式を標準に戻します。",
      "supplement": "プロのコツ：Web から貼り付けるときは［貼り付けのオプション］→「テキストのみ保持」で、余計な書式を持ち込まずに済みます。"
    },
    {
      "id": "C-016",
      "type": "choice",
      "category": "Windows",
      "difficulty": "HARD",
      "question": "Windowsにおいて、過去にコピーした複数の内容の履歴から選んで貼り付けられるようにする機能のショートカットキーは何ですか。",
      "choices": [
        {
          "text": "Win+C",
          "explanation": "Win+C はクリップボード履歴を開くキーではありません。"
        },
        {
          "text": "Win+V",
          "explanation": "過去にコピーした複数項目から選んで貼れます。"
        },
        {
          "text": "Win+D",
          "explanation": "Win+D はデスクトップ表示です。"
        },
        {
          "text": "Win+E",
          "explanation": "Win+E はエクスプローラーです。"
        }
      ],
      "answer": 1,
      "explanation": "Win+V はクリップボード履歴を開きます。",
      "supplement": "プロのコツ：クリップボード履歴は初回だけ有効化が必要です。Win+V を押して「有効にする」を選びましょう。"
    },
    {
      "id": "C-017",
      "type": "choice",
      "category": "Excel",
      "difficulty": "HARD",
      "question": "Excelの表を「テーブル」として書式設定し、フィルターや縞模様の書式を素早く適用するためのショートカットキーは何ですか。",
      "choices": [
        {
          "text": "Ctrl+T",
          "explanation": "フィルターや縞模様の書式が手に入ります。"
        },
        {
          "text": "Ctrl+1",
          "explanation": "Ctrl+1 はセルの書式設定です。"
        },
        {
          "text": "Ctrl+D",
          "explanation": "Ctrl+D は下方向へのコピーです。"
        },
        {
          "text": "Ctrl+G",
          "explanation": "Ctrl+G はジャンプです。"
        }
      ],
      "answer": 0,
      "explanation": "Ctrl+T は表をテーブル化します。",
      "supplement": "プロのコツ：テーブル化すると、縞模様・フィルター・行追加時の数式の自動コピーがまとめて手に入ります。"
    },
    {
      "id": "C-018",
      "type": "choice",
      "category": "PowerPoint",
      "difficulty": "NORMAL",
      "question": "PowerPointで、スライド資料全体のフォント・色・ロゴ・レイアウトを一括管理する親設定の画面を何と呼びますか。",
      "choices": [
        {
          "text": "スライドマスター",
          "explanation": "全体のデザイン親設定を変更できます。"
        },
        {
          "text": "プレースホルダー",
          "explanation": "プレースホルダーは入力枠です。"
        },
        {
          "text": "クリップボード",
          "explanation": "クリップボードは保管場所です。"
        },
        {
          "text": "クイックアクセスツールバー",
          "explanation": "クイックアクセスツールバーはボタン棚です。"
        }
      ],
      "answer": 0,
      "explanation": "スライドマスターで一括管理します。",
      "supplement": "プロのコツ：ロゴやページ番号はスライドマスターに1回だけ置けば、変更も1か所で済みます。"
    },
    {
      "id": "C-019",
      "type": "choice",
      "category": "Windows",
      "difficulty": "NORMAL",
      "question": "開いているアプリ（ウィンドウ）の間を素早く行き来するために使用するWindowsの標準ショートカットキーは何ですか。",
      "choices": [
        {
          "text": "Alt+F4",
          "explanation": "Alt+F4 はアプリ終了です。"
        },
        {
          "text": "Alt+Tab",
          "explanation": "開いているアプリ間を素早く行き来できます。"
        },
        {
          "text": "Ctrl+W",
          "explanation": "Ctrl+W はファイル終了です。"
        },
        {
          "text": "Win+L",
          "explanation": "Win+L は画面ロックです。"
        }
      ],
      "answer": 1,
      "explanation": "Alt+Tab でウィンドウを切り替えます。",
      "supplement": ""
    },
    {
      "id": "C-020",
      "type": "choice",
      "category": "共通",
      "difficulty": "EASY",
      "question": "ファイル名の末尾にある「.xlsx」や「.pptx」などの文字列のことを何と呼びますか。",
      "choices": [
        {
          "text": "拡張子",
          "explanation": "ファイルの種類を見分けるために使われます。"
        },
        {
          "text": "ショートカットキー",
          "explanation": "ショートカットキーは操作の組み合わせです。"
        },
        {
          "text": "セル",
          "explanation": "セルは表のマス目です。"
        },
        {
          "text": "スタイル",
          "explanation": "スタイルはWordの書式集です。"
        }
      ],
      "answer": 0,
      "explanation": "拡張子と呼ばれます。",
      "supplement": ""
    },
    {
      "id": "C-021",
      "type": "choice",
      "category": "Excel",
      "difficulty": "NORMAL",
      "question": "Excelにおいて、ダブルクリックせずにセルの編集モードに入るためのファンクションキーは何ですか。",
      "choices": [
        {
          "text": "F1",
          "explanation": "F1はヘルプです。"
        },
        {
          "text": "F2",
          "explanation": "マウスを使わずにセルを修正できます。"
        },
        {
          "text": "F5",
          "explanation": "ExcelのF5はジャンプです。"
        },
        {
          "text": "F12",
          "explanation": "F12は名前を付けて保存です。"
        }
      ],
      "answer": 1,
      "explanation": "F2キーでセル編集モードに入ります。",
      "supplement": ""
    },
    {
      "id": "C-022",
      "type": "choice",
      "category": "PowerPoint",
      "difficulty": "NORMAL",
      "question": "PowerPoint資料を作成する際、スライドのタイトルや見出しに用いるべき最も適切な考え方はどれですか。",
      "choices": [
        {
          "text": "「売上の推移」のように単なる話題の名前だけを書く",
          "explanation": "単なる話題名では主張が伝わりません。"
        },
        {
          "text": "「売上は3か月連続で増加している」のように結論を書く",
          "explanation": "プロの資料作成における基本ノウハウです。"
        },
        {
          "text": "専門用語を並べて難解にする",
          "explanation": "難解にするのは避けるべきです。"
        },
        {
          "text": "タイトルは一切付けない",
          "explanation": "タイトルは必須です。"
        }
      ],
      "answer": 1,
      "explanation": "結論を書くことで内容が伝わりやすくなります。",
      "supplement": "プロのコツ：各スライドのタイトルだけを縦に並べて読み、話の筋が通るか確認してからデザインに入りましょう。"
    },
    {
      "id": "C-023",
      "type": "choice",
      "category": "共通",
      "difficulty": "EASY",
      "question": "WordやPowerPointなどの画面上部に並ぶ「ホーム」「挿入」などのタブとボタンの集まり全体を何と呼びますか。",
      "choices": [
        {
          "text": "クイックアクセスツールバー",
          "explanation": "クイックアクセスツールバーは個別棚です。"
        },
        {
          "text": "リボン",
          "explanation": "使いたい機能の大半はここにあります。"
        },
        {
          "text": "タスクビュー",
          "explanation": "タスクビューはWindowsの画面一覧です。"
        },
        {
          "text": "クリップボード",
          "explanation": "クリップボードは保管場所です。"
        }
      ],
      "answer": 1,
      "explanation": "リボンと呼ばれます。",
      "supplement": ""
    },
    {
      "id": "C-024",
      "type": "choice",
      "category": "Windows",
      "difficulty": "NORMAL",
      "question": "画面の一部を切り取って画像として保存・取得できる、Windowsのスクリーンショット用のショートカットキーは何ですか。",
      "choices": [
        {
          "text": "Win+D",
          "explanation": "Win+D はデスクトップ表示です。"
        },
        {
          "text": "Win+Shift+S",
          "explanation": "手順書等の画像準備に不可欠です。"
        },
        {
          "text": "Win+E",
          "explanation": "Win+E はエクスプローラーです。"
        },
        {
          "text": "Win+L",
          "explanation": "Win+L は画面ロックです。"
        }
      ],
      "answer": 1,
      "explanation": "Win+Shift+S で画面の一部を切り取れます。",
      "supplement": "注意：共有する前に、パスワードや個人情報が写り込んでいないか確認しましょう。"
    },
    {
      "id": "C-025",
      "type": "choice",
      "category": "Excel",
      "difficulty": "NORMAL",
      "question": "Excelの表で、条件に合う行だけを表示させるために絞り込みを行う機能の名称は何ですか。",
      "choices": [
        {
          "text": "フィルター",
          "explanation": "条件に合う行だけを表示できます。"
        },
        {
          "text": "オートフィル",
          "explanation": "オートフィルは自動入力です。"
        },
        {
          "text": "テーブル",
          "explanation": "テーブルはデータのまとまり化です。"
        },
        {
          "text": "相対参照",
          "explanation": "相対参照は数式のズレの仕組みです。"
        }
      ],
      "answer": 0,
      "explanation": "フィルター機能で絞り込みを行います。",
      "supplement": ""
    },
    {
      "id": "C-026",
      "type": "choice",
      "category": "PowerPoint",
      "difficulty": "NORMAL",
      "question": "PowerPointで、箇条書きのテキストを手順図や組織図などの図解に一瞬で変換できる機能の名前は何ですか。",
      "choices": [
        {
          "text": "SmartArt",
          "explanation": "箇条書きを手順図等に一瞬で変えられます。"
        },
        {
          "text": "スライドマスター",
          "explanation": "スライドマスターは全体設定です。"
        },
        {
          "text": "プレースホルダー",
          "explanation": "プレースホルダーは入力枠です。"
        },
        {
          "text": "発表者ツール",
          "explanation": "発表者ツールは発表用画面です。"
        }
      ],
      "answer": 0,
      "explanation": "SmartArtで図解に変換できます。",
      "supplement": "プロのコツ：箇条書きのテキストボックスを選び、［ホーム］→「SmartArtに変換」を押すだけで図解になります。"
    },
    {
      "id": "C-027",
      "type": "choice",
      "category": "Excel",
      "difficulty": "HARD",
      "question": "Excelで、今日の「日付」をセルに素早く入力するためのショートカットキーは何ですか。",
      "choices": [
        {
          "text": "Ctrl+;（セミコロン）",
          "explanation": "入力ミスを防ぐ実用的なショートカットです。"
        },
        {
          "text": "Ctrl+S",
          "explanation": "Ctrl+S は上書き保存です。"
        },
        {
          "text": "Ctrl+D",
          "explanation": "Ctrl+D は下方向コピーです。"
        },
        {
          "text": "Ctrl+1",
          "explanation": "Ctrl+1 は書式設定です。"
        }
      ],
      "answer": 0,
      "explanation": "Ctrl+;（セミコロン）で今日の日付を入力できます。",
      "supplement": ""
    },
    {
      "id": "C-028",
      "type": "choice",
      "category": "共通",
      "difficulty": "HARD",
      "question": "Officeアプリで、ファイルを新しく別名で保存し、元のファイルを残したまま新しい版を作るために使うキーは何ですか。",
      "choices": [
        {
          "text": "F1",
          "explanation": "F1はヘルプです。"
        },
        {
          "text": "F7",
          "explanation": "F7は文章校正です。"
        },
        {
          "text": "F12",
          "explanation": "別名で保存し元ファイルを保護できます。"
        },
        {
          "text": "F5",
          "explanation": "ExcelのF5はジャンプです。"
        }
      ],
      "answer": 2,
      "explanation": "F12キーで名前を付けて保存を開けます。",
      "supplement": ""
    },
    {
      "id": "C-029",
      "type": "choice",
      "category": "PowerPoint",
      "difficulty": "NORMAL",
      "question": "PowerPointで発表する際、発表者自身だけが原稿メモや次のスライドを確認できる便利な表示モードを何と呼びますか。",
      "choices": [
        {
          "text": "スライドマスター",
          "explanation": "スライドマスターはデザイン管理です。"
        },
        {
          "text": "発表者ツール",
          "explanation": "手元でメモや次のスライドを確認できます。"
        },
        {
          "text": "プレースホルダー",
          "explanation": "プレースホルダーは入力枠です。"
        },
        {
          "text": "SmartArt",
          "explanation": "SmartArtは図解化機能です。"
        }
      ],
      "answer": 1,
      "explanation": "発表者ツールを使用します。",
      "supplement": ""
    },
    {
      "id": "C-030",
      "type": "choice",
      "category": "Windows",
      "difficulty": "NORMAL",
      "question": "複数の資料やウィンドウを左右の画面半分ずつにきれいに配置し、見比べながら作業しやすくするためのWindowsショートカットキーは何ですか。",
      "choices": [
        {
          "text": "Win+← / →",
          "explanation": "2つの資料を見比べる作業が効率化します。"
        },
        {
          "text": "Win+D",
          "explanation": "Win+D はデスクトップ表示です。"
        },
        {
          "text": "Win+L",
          "explanation": "Win+L は画面ロックです。"
        },
        {
          "text": "Win+E",
          "explanation": "Win+E はエクスプローラーです。"
        }
      ],
      "answer": 0,
      "explanation": "Win+← / → で左右半分のスナップ配置ができます。",
      "supplement": "プロのコツ：資料と Excel を左右に並べれば、画面を行き来せずに転記でき、転記ミスも減ります。"
    },
    {
      "id": "C-031",
      "type": "choice",
      "category": "Excel",
      "difficulty": "EASY",
      "question": "Excelの表の中にある1つ1つのマス目のことを何と呼びますか。",
      "choices": [
        {
          "text": "シート",
          "explanation": "シートは表のタブです。"
        },
        {
          "text": "ブック",
          "explanation": "ブックはファイル全体です。"
        },
        {
          "text": "セル",
          "explanation": "データを入れる最小単位です。"
        },
        {
          "text": "テーブル",
          "explanation": "テーブルは機能の名称です。"
        }
      ],
      "answer": 2,
      "explanation": "セルと呼ばれます。",
      "supplement": ""
    },
    {
      "id": "C-032",
      "type": "choice",
      "category": "Word",
      "difficulty": "NORMAL",
      "question": "Word文書において、見出しやタイトルの書式をまとめて適用でき、後からのデザイン一括変更や目次自動作成にもつながる機能は何ですか。",
      "choices": [
        {
          "text": "スタイル",
          "explanation": "書式を統一でき目次自動作成にもつながります。"
        },
        {
          "text": "改ページ",
          "explanation": "改ページはページ送りの操作です。"
        },
        {
          "text": "編集記号",
          "explanation": "編集記号はマークの表示です。"
        },
        {
          "text": "クリップボード",
          "explanation": "クリップボードは保管場所です。"
        }
      ],
      "answer": 0,
      "explanation": "スタイル機能を使用します。",
      "supplement": "プロのコツ：見出しにスタイルを当てておくと、［参考資料］→［目次］で目次を自動作成できます。"
    },
    {
      "id": "C-033",
      "type": "choice",
      "category": "PowerPoint",
      "difficulty": "NORMAL",
      "question": "PowerPointで、新しいスライドを追加するために使用するショートカットキーは何ですか。",
      "choices": [
        {
          "text": "Ctrl+M",
          "explanation": "資料作成中にスライドを増やす定番操作です。"
        },
        {
          "text": "Ctrl+D",
          "explanation": "Ctrl+D は複製です。"
        },
        {
          "text": "Ctrl+N",
          "explanation": "Ctrl+N は新規ファイルです。"
        },
        {
          "text": "Ctrl+S",
          "explanation": "Ctrl+S は上書き保存です。"
        }
      ],
      "answer": 0,
      "explanation": "Ctrl+M で新しいスライドを追加します。",
      "supplement": ""
    },
    {
      "id": "C-034",
      "type": "choice",
      "category": "Excel",
      "difficulty": "EASY",
      "question": "Excelファイル1つ全体のことを指す専門用語は何ですか。",
      "choices": [
        {
          "text": "シート",
          "explanation": "シートは個別のタブです。"
        },
        {
          "text": "ブック",
          "explanation": "Excelファイル1つ全体の名称です。"
        },
        {
          "text": "セル",
          "explanation": "セルはマス目です。"
        },
        {
          "text": "範囲",
          "explanation": "範囲は複数セルのエリアです。"
        }
      ],
      "answer": 1,
      "explanation": "ブックと呼ばれます。",
      "supplement": ""
    },
    {
      "id": "C-035",
      "type": "choice",
      "category": "Windows",
      "difficulty": "HARD",
      "question": "画面が固まって動かなくなったアプリを強制終了させるために、タスクマネージャーを開くためのWindowsショートカットキーは何ですか。",
      "choices": [
        {
          "text": "Ctrl+Shift+Esc",
          "explanation": "フリーズしたアプリを安全に終了できます。"
        },
        {
          "text": "Alt+F4",
          "explanation": "Alt+F4 は通常終了です。"
        },
        {
          "text": "Win+L",
          "explanation": "Win+L は画面ロックです。"
        },
        {
          "text": "Ctrl+Alt+Delete",
          "explanation": "Ctrl+Alt+Delete はセキュリティ画面を経由するため、「直接」開く操作ではありません。"
        }
      ],
      "answer": 0,
      "explanation": "Ctrl+Shift+Esc でタスクマネージャーを直接開けます。",
      "supplement": "プロのコツ：まず少し待ち、それでも動かなければタスクマネージャーから該当アプリを終了します。"
    },
    {
      "id": "C-036",
      "type": "choice",
      "category": "PowerPoint",
      "difficulty": "NORMAL",
      "question": "PowerPointの資料作成で、複数の図形をまとめて一緒に動かせるように結合するショートカットキーは何ですか。",
      "choices": [
        {
          "text": "Ctrl+G",
          "explanation": "複数の図形をまとめて移動・変形できます。"
        },
        {
          "text": "Ctrl+F",
          "explanation": "Ctrl+F は検索です。"
        },
        {
          "text": "Ctrl+H",
          "explanation": "Ctrl+H は置換です。"
        },
        {
          "text": "Ctrl+Z",
          "explanation": "Ctrl+Z は元に戻すです。"
        }
      ],
      "answer": 0,
      "explanation": "Ctrl+G でグループ化します。",
      "supplement": ""
    },
    {
      "id": "C-037",
      "type": "choice",
      "category": "Excel",
      "difficulty": "HARD",
      "question": "Excelにおいて、入力した数式や値を下方向のセルへ一気にコピー・埋め込むためのショートカットキーは何ですか。",
      "choices": [
        {
          "text": "Ctrl+D",
          "explanation": "縦方向のデータ入力を効率化します。"
        },
        {
          "text": "Ctrl+R",
          "explanation": "Ctrl+R は右方向コピーです。"
        },
        {
          "text": "Ctrl+C",
          "explanation": "Ctrl+C は通常コピーです。"
        },
        {
          "text": "Ctrl+V",
          "explanation": "Ctrl+V は貼り付けです。"
        }
      ],
      "answer": 0,
      "explanation": "Ctrl+D で下方向へコピーします。",
      "supplement": ""
    },
    {
      "id": "C-038",
      "type": "choice",
      "category": "PowerPoint",
      "difficulty": "NORMAL",
      "question": "PowerPointのスライドで、本文の文字サイズとして一般的に推奨される最低限の目安サイズはどれですか。",
      "choices": [
        {
          "text": "8pt〜10pt",
          "explanation": "小さすぎると後方の席から読めません。"
        },
        {
          "text": "18pt以上",
          "explanation": "視認性を担保する基本サイズです。"
        },
        {
          "text": "44pt以上",
          "explanation": "44pt前後は表紙タイトル向けです。"
        },
        {
          "text": "6pt以下",
          "explanation": "小さすぎて見えなくなります。"
        }
      ],
      "answer": 1,
      "explanation": "18pt以上を目安にします。",
      "supplement": "プロのコツ：入りきらないときは文字を小さくする前に、文章を削るかスライドを2枚に分けましょう。"
    },
    {
      "id": "C-039",
      "type": "choice",
      "category": "Word",
      "difficulty": "NORMAL",
      "question": "Word文書などで、印刷されない「改行」や「スペース」などの記号を表示させてレイアウト崩れの原因を調べる機能は何ですか。",
      "choices": [
        {
          "text": "編集記号の表示",
          "explanation": "レイアウト崩れの原因を調査できます。"
        },
        {
          "text": "スライドマスター",
          "explanation": "スライドマスターはPowerPointのデザイン設定です。"
        },
        {
          "text": "テンプレート",
          "explanation": "テンプレートはひな形です。"
        },
        {
          "text": "変更履歴",
          "explanation": "変更履歴は修正記録です。"
        }
      ],
      "answer": 0,
      "explanation": "編集記号の表示機能を使います。",
      "supplement": ""
    },
    {
      "id": "C-040",
      "type": "choice",
      "category": "Excel",
      "difficulty": "NORMAL",
      "question": "Excelで「指定したセルへ直接ジャンプする」ために押すファンクションキーはどれですか。",
      "choices": [
        {
          "text": "F2",
          "explanation": "F2はセル編集です。"
        },
        {
          "text": "F5",
          "explanation": "指定したセルへ一瞬で移動できます。"
        },
        {
          "text": "F7",
          "explanation": "F7はスペルチェックです。"
        },
        {
          "text": "F12",
          "explanation": "F12は名前を付けて保存です。"
        }
      ],
      "answer": 1,
      "explanation": "ExcelのF5キーはジャンプ機能を呼び出します。",
      "supplement": "注意：F5 はアプリで働きが違います。ブラウザでは更新、Excel ではジャンプ、PowerPoint ではスライドショー開始です。"
    },
    {
      "id": "C-041",
      "type": "choice",
      "category": "Word",
      "difficulty": "NORMAL",
      "question": "Wordなどの文書で、長い文章の中から特定の言葉を一括して書き換えるためのショートカットキーは何ですか。",
      "choices": [
        {
          "text": "Ctrl+F",
          "explanation": "Ctrl+F は検索のみです。"
        },
        {
          "text": "Ctrl+H",
          "explanation": "表記ゆれや言葉の一括修正を行えます。"
        },
        {
          "text": "Ctrl+P",
          "explanation": "Ctrl+P は印刷です。"
        },
        {
          "text": "Ctrl+Z",
          "explanation": "Ctrl+Z は元に戻すです。"
        }
      ],
      "answer": 1,
      "explanation": "Ctrl+H は検索と置換を開きます。",
      "supplement": "プロのコツ：「すべて置換」の前に「次を検索」で数件確認すると、意図しない場所まで置き換わる事故を防げます。"
    },
    {
      "id": "C-042",
      "type": "choice",
      "category": "PowerPoint",
      "difficulty": "NORMAL",
      "question": "PowerPoint資料の色使いにおいて、資料全体で使う色の数の一般的な目安として最も適切なものはどれですか。",
      "choices": [
        {
          "text": "10色以上を使い分けて賑やかにする",
          "explanation": "多すぎるとどこが重要か分からなくなります。"
        },
        {
          "text": "2〜3色程度に絞り、アクセントカラーを限定する",
          "explanation": "見やすく洗練された資料になります。"
        },
        {
          "text": "すべて真っ赤で統一する",
          "explanation": "強調効果が失われます。"
        },
        {
          "text": "色は一切使わず白黒のみにする",
          "explanation": "情報分類の色使いが失われます。"
        }
      ],
      "answer": 1,
      "explanation": "2〜3色程度に絞ります。",
      "supplement": ""
    },
    {
      "id": "C-043",
      "type": "choice",
      "category": "Windows",
      "difficulty": "HARD",
      "question": "Windowsの機能で、画面（デスクトップ）を複数用意して用途別に切り替えて使える仕組みを何と呼びますか。",
      "choices": [
        {
          "text": "仮想デスクトップ",
          "explanation": "作業用や閲覧用を用途別に分けられます。"
        },
        {
          "text": "エクスプローラー",
          "explanation": "エクスプローラーはファイル管理です。"
        },
        {
          "text": "タスクビュー",
          "explanation": "タスクビューは一覧管理画面です。"
        },
        {
          "text": "クリップボード",
          "explanation": "クリップボードは保管場所です。"
        }
      ],
      "answer": 0,
      "explanation": "仮想デスクトップ機能です。",
      "supplement": ""
    },
    {
      "id": "C-044",
      "type": "choice",
      "category": "Excel",
      "difficulty": "EASY",
      "question": "Excelで数式を入力する際、計算式の先頭に必ず入力しなければならない記号は何ですか。",
      "choices": [
        {
          "text": "＋（プラス）",
          "explanation": "プラスから始める変則的な書き方も一部ありますが基本は＝です。"
        },
        {
          "text": "＝（イコール）",
          "explanation": "イコールがないと単なる文字扱いになります。"
        },
        {
          "text": "＃（シャープ）",
          "explanation": "シャープはエラー表示等に使われます。"
        },
        {
          "text": "％（パーセント）",
          "explanation": "パーセントは書式等に使われます。"
        }
      ],
      "answer": 1,
      "explanation": "必ず「＝」から始めます。",
      "supplement": ""
    },
    {
      "id": "C-045",
      "type": "choice",
      "category": "PowerPoint",
      "difficulty": "HARD",
      "question": "PowerPointで図形を移動させる際、水平や垂直に真っ直ぐ動かしたいときに同時に押し続けるべきキーは何ですか。",
      "choices": [
        {
          "text": "Shiftキー",
          "explanation": "水平垂直の移動や縦横比の維持ができます。"
        },
        {
          "text": "Ctrlキー",
          "explanation": "Ctrlキーは複製移動です。"
        },
        {
          "text": "Altキー",
          "explanation": "Altキーは微調整です。"
        },
        {
          "text": "Tabキー",
          "explanation": "Tabキーは用途が異なります。"
        }
      ],
      "answer": 0,
      "explanation": "Shiftキーを押しながらドラッグします。",
      "supplement": ""
    },
    {
      "id": "C-046",
      "type": "choice",
      "category": "共通",
      "difficulty": "EASY",
      "question": "Officeの共通操作として、現在開いているファイルを閉じるためのショートカットキーは何ですか。",
      "choices": [
        {
          "text": "Ctrl+W",
          "explanation": "アプリ全体ではなくファイル単位で閉じられます。"
        },
        {
          "text": "Ctrl+S",
          "explanation": "Ctrl+S は上書き保存です。"
        },
        {
          "text": "Ctrl+P",
          "explanation": "Ctrl+P は印刷です。"
        },
        {
          "text": "Ctrl+A",
          "explanation": "Ctrl+A はすべて選択です。"
        }
      ],
      "answer": 0,
      "explanation": "Ctrl+W は開いているファイルを閉じます。",
      "supplement": ""
    },
    {
      "id": "C-047",
      "type": "choice",
      "category": "Excel",
      "difficulty": "NORMAL",
      "question": "Excelの表において、数式をコピーしたときに参照先が自動的にずれる仕組みのことを何と呼びますか。",
      "choices": [
        {
          "text": "相対参照",
          "explanation": "位置に応じて参照先が自動的にずれる仕組みです。"
        },
        {
          "text": "絶対参照",
          "explanation": "絶対参照は固定する仕組みです。"
        },
        {
          "text": "オートフィル",
          "explanation": "オートフィルは自動入力です。"
        },
        {
          "text": "フィルター",
          "explanation": "フィルターは絞り込みです。"
        }
      ],
      "answer": 0,
      "explanation": "相対参照と呼ばれます。",
      "supplement": ""
    },
    {
      "id": "C-048",
      "type": "choice",
      "category": "共通",
      "difficulty": "EASY",
      "question": "WordやPowerPointなどで、文字を「太字」にするための共通ショートカットキーは何ですか。",
      "choices": [
        {
          "text": "Ctrl+B",
          "explanation": "重要なキーワードを目立たせます。"
        },
        {
          "text": "Ctrl+I",
          "explanation": "Ctrl+I は斜体です。"
        },
        {
          "text": "Ctrl+U",
          "explanation": "Ctrl+U は下線です。"
        },
        {
          "text": "Ctrl+C",
          "explanation": "Ctrl+C はコピーです。"
        }
      ],
      "answer": 0,
      "explanation": "Ctrl+B は太字にします。",
      "supplement": ""
    },
    {
      "id": "C-049",
      "type": "choice",
      "category": "PowerPoint",
      "difficulty": "NORMAL",
      "question": "PowerPoint作成時、背景と文字の配色に関する注意点として最も適切なものはどれですか。",
      "choices": [
        {
          "text": "薄い背景に薄い文字を組み合わせてスタイリッシュにする",
          "explanation": "薄い色同士は読めなくなります。"
        },
        {
          "text": "背景と文字のコントラストをはっきりさせ、プロジェクターでも読めるようにする",
          "explanation": "遠くの席からも確実に読めるようになります。"
        },
        {
          "text": "1スライドごとに背景の色を全く違う派手な色に変える",
          "explanation": "スライドごとに変わると統一感が失われます。"
        },
        {
          "text": "文字はすべて真っ赤にして目立たせる",
          "explanation": "全て赤では強調されません。"
        }
      ],
      "answer": 1,
      "explanation": "コントラストをはっきりさせます。",
      "supplement": ""
    },
    {
      "id": "C-050",
      "type": "choice",
      "category": "共通",
      "difficulty": "NORMAL",
      "question": "Office製品の操作中に機能の場所が分からないとき、検索ボックスに機能名を入力することのメリットとして正しいものはどれですか。",
      "choices": [
        {
          "text": "ファイルが自動的に削除される",
          "explanation": "ファイル削除は起こりません。"
        },
        {
          "text": "その機能を直接実行したり、場所をすばやく見つけられる",
          "explanation": "場所を完璧に覚えていなくても操作を進められます。"
        },
        {
          "text": "パソコンが強制シャットダウンされる",
          "explanation": "シャットダウンは起こりません。"
        },
        {
          "text": "自動保存がオフになる",
          "explanation": "自動保存とは関係ありません。"
        }
      ],
      "answer": 1,
      "explanation": "機能を直接実行したり場所を見つけられます。",
      "supplement": "プロのコツ：「罫線」「改ページ」など機能名を入れると、その機能を直接実行できます。場所を覚えていなくても大丈夫です。"
    },
    {
      "id": "K-001",
      "type": "input",
      "inputMode": "keys",
      "category": "共通",
      "difficulty": "EASY",
      "question": "文章やデータなどを複製するための基本的な共通ショートカットキーを入力してください。",
      "answer": "Ctrl+C",
      "accepted": [
        "Ctrl+C"
      ],
      "explanation": "文字やセル、図形などを複製するための最も基本となるショートカットです。",
      "supplement": ""
    },
    {
      "id": "K-002",
      "type": "input",
      "inputMode": "keys",
      "category": "共通",
      "difficulty": "EASY",
      "question": "コピーした内容を別の場所に貼り付けるための共通ショートカットキーを入力してください。",
      "answer": "Ctrl+V",
      "accepted": [
        "Ctrl+V"
      ],
      "explanation": "コピーや切り取りで一時保管された内容を、別の場所に取り出して貼り付けます。",
      "supplement": ""
    },
    {
      "id": "K-003",
      "type": "input",
      "inputMode": "keys",
      "category": "共通",
      "difficulty": "EASY",
      "question": "選択した内容を削除せずに別の場所へ移動（切り取り）するためのショートカットキーを入力してください。",
      "answer": "Ctrl+X",
      "accepted": [
        "Ctrl+X"
      ],
      "explanation": "内容を別の場所へ「移動」させたいときに使います。",
      "supplement": ""
    },
    {
      "id": "K-004",
      "type": "input",
      "inputMode": "keys",
      "category": "共通",
      "difficulty": "EASY",
      "question": "直前の操作を何回でも取り消すことができる「元に戻す」のショートカットキーを入力してください。",
      "answer": "Ctrl+Z",
      "accepted": [
        "Ctrl+Z"
      ],
      "explanation": "間違えた操作を取り消すため、何度でも安心してやり直せます。",
      "supplement": "プロのコツ：「何か変になった」と思ったら、まず Ctrl+Z。戻せると分かっていれば、新しい機能も気軽に試せます。"
    },
    {
      "id": "K-005",
      "type": "input",
      "inputMode": "keys",
      "category": "共通",
      "difficulty": "NORMAL",
      "question": "Ctrl+Zで戻しすぎたときに、もう一度先へ進める「やり直し」のショートカットキーを入力してください。",
      "answer": "Ctrl+Y",
      "accepted": [
        "Ctrl+Y"
      ],
      "explanation": "Ctrl+Zで戻しすぎたときに、再び先へ進めるためのキーです。",
      "supplement": ""
    },
    {
      "id": "K-006",
      "type": "input",
      "inputMode": "keys",
      "category": "共通",
      "difficulty": "EASY",
      "question": "文書全体やシート全体をまとめて選ぶ「すべて選択」のショートカットキーを入力してください。",
      "answer": "Ctrl+A",
      "accepted": [
        "Ctrl+A"
      ],
      "explanation": "文書全体やシート内のすべてのデータを一発で選択します。",
      "supplement": ""
    },
    {
      "id": "K-007",
      "type": "input",
      "inputMode": "keys",
      "category": "共通",
      "difficulty": "EASY",
      "question": "長い文章や大きな表から、特定のキーワードを一瞬で探す「検索」のショートカットキーを入力してください。",
      "answer": "Ctrl+F",
      "accepted": [
        "Ctrl+F"
      ],
      "explanation": "長い文書や大きな表から、特定のキーワードを一瞬で探し出します。",
      "supplement": ""
    },
    {
      "id": "K-008",
      "type": "input",
      "inputMode": "keys",
      "category": "共通",
      "difficulty": "NORMAL",
      "question": "特定の言葉を別の言葉に一括で置き換える「検索と置換」のショートカットキーを入力してください。",
      "answer": "Ctrl+H",
      "accepted": [
        "Ctrl+H"
      ],
      "explanation": "特定の言葉を別の言葉に一括で書き換えるときに使用します。",
      "supplement": "プロのコツ：「すべて置換」の前に「次を検索」で数件確認すると、意図しない場所まで置き換わる事故を防げます。"
    },
    {
      "id": "K-009",
      "type": "input",
      "inputMode": "keys",
      "category": "共通",
      "difficulty": "EASY",
      "question": "作業中のファイルを上書き保存するための最も重要なショートカットキーを入力してください。",
      "answer": "Ctrl+S",
      "accepted": [
        "Ctrl+S"
      ],
      "explanation": "データの消失を防ぐため、こまめに押す「手のクセ」にすべき最重要操作です。",
      "supplement": "プロのコツ：区切りのいいところ、席を立つ前、別のファイルを開く前には必ず Ctrl+S。数秒の習慣で作業の消失を防げます。"
    },
    {
      "id": "K-010",
      "type": "input",
      "inputMode": "keys",
      "category": "共通",
      "difficulty": "EASY",
      "question": "印刷画面を開くための共通ショートカットキーを入力してください。",
      "answer": "Ctrl+P",
      "accepted": [
        "Ctrl+P"
      ],
      "explanation": "印刷プレビュー画面をすばやく開きます。",
      "supplement": ""
    },
    {
      "id": "K-011",
      "type": "input",
      "inputMode": "keys",
      "category": "共通",
      "difficulty": "NORMAL",
      "question": "現在開いているファイルやタブだけを閉じるためのショートカットキーを入力してください。",
      "answer": "Ctrl+W",
      "accepted": [
        "Ctrl+W"
      ],
      "explanation": "アプリ自体は終了させず、いま開いているファイルだけを閉じます。",
      "supplement": ""
    },
    {
      "id": "K-012",
      "type": "input",
      "inputMode": "keys",
      "category": "共通",
      "difficulty": "NORMAL",
      "question": "アプリそのものを終了するためのショートカットキーを入力してください。",
      "answer": "Alt+F4",
      "accepted": [
        "Alt+F4"
      ],
      "explanation": "アプリケーションそのものを完全に終了させます。",
      "supplement": ""
    },
    {
      "id": "K-013",
      "type": "input",
      "inputMode": "keys",
      "category": "共通",
      "difficulty": "EASY",
      "question": "重要な文字を強調するための「太字」にするショートカットキーを入力してください。",
      "answer": "Ctrl+B",
      "accepted": [
        "Ctrl+B"
      ],
      "explanation": "重要な文字を太くして強調します。",
      "supplement": ""
    },
    {
      "id": "K-014",
      "type": "input",
      "inputMode": "keys",
      "category": "共通",
      "difficulty": "NORMAL",
      "question": "文字を斜めにする「斜体」のショートカットキーを入力してください。",
      "answer": "Ctrl+I",
      "accepted": [
        "Ctrl+I"
      ],
      "explanation": "文字を斜めに傾けて書式を設定します。",
      "supplement": ""
    },
    {
      "id": "K-015",
      "type": "input",
      "inputMode": "keys",
      "category": "共通",
      "difficulty": "NORMAL",
      "question": "文字に下線を引く「下線」のショートカットキーを入力してください。",
      "answer": "Ctrl+U",
      "accepted": [
        "Ctrl+U"
      ],
      "explanation": "文字の下に線を引き目立たせます。",
      "supplement": ""
    },
    {
      "id": "K-016",
      "type": "input",
      "inputMode": "keys",
      "category": "共通",
      "difficulty": "NORMAL",
      "question": "文書やシートの一番最初（先頭）へジャンプするためのショートカットキーを入力してください。",
      "answer": "Ctrl+Home",
      "accepted": [
        "Ctrl+Home"
      ],
      "explanation": "文書やシートの一番最初へ一気にジャンプします。",
      "supplement": ""
    },
    {
      "id": "K-017",
      "type": "input",
      "inputMode": "keys",
      "category": "Excel",
      "difficulty": "NORMAL",
      "question": "文書の最後や、Excelでデータが入った最後のセルへジャンプするショートカットキーを入力してください。",
      "answer": "Ctrl+End",
      "accepted": [
        "Ctrl+End"
      ],
      "explanation": "文書の最後や、Excelのデータ最終セルへジャンプします。",
      "supplement": ""
    },
    {
      "id": "K-018",
      "type": "input",
      "inputMode": "keys",
      "category": "共通",
      "difficulty": "NORMAL",
      "question": "誤字や文章の校正を確認するためのファンクションキーを入力してください。",
      "answer": "F7",
      "accepted": [
        "F7"
      ],
      "explanation": "誤字や入力ミスを確認するために使います。",
      "supplement": ""
    },
    {
      "id": "K-019",
      "type": "input",
      "inputMode": "keys",
      "category": "共通",
      "difficulty": "HARD",
      "question": "ファイルの名前を付けて保存ダイアログを開くファンクションキーを入力してください。",
      "answer": "F12",
      "accepted": [
        "F12"
      ],
      "explanation": "別名でファイルを保存し、新しい版を作りたいときに使います。",
      "supplement": ""
    },
    {
      "id": "K-020",
      "type": "input",
      "inputMode": "keys",
      "category": "共通",
      "difficulty": "NORMAL",
      "question": "マウスを使わずに、文字やセルを少しずつ選択していくときに矢印キーと組み合わせて押すキーを入力してください。",
      "answer": "Shiftキー",
      "accepted": [
        "Shift",
        "Shift+Arrow"
      ],
      "explanation": "マウスを使わずにキーボードだけで文字やセルを少しずつ選択できます。",
      "supplement": ""
    },
    {
      "id": "K-021",
      "type": "input",
      "inputMode": "keys",
      "category": "Excel",
      "difficulty": "NORMAL",
      "question": "Excelの表の最終行や右端といったデータの端へ一瞬で移動するためのキーの組み合わせを入力してください。",
      "answer": "Ctrl+矢印キー",
      "accepted": [
        "Ctrl+Arrow"
      ],
      "explanation": "何千行もある表をスクロールせず、一瞬で端へ移動できます。",
      "supplement": "プロのコツ：Shift を足した Ctrl+Shift+矢印キー なら、データの端までまとめて選択できます。"
    },
    {
      "id": "K-022",
      "type": "input",
      "inputMode": "keys",
      "category": "Excel",
      "difficulty": "NORMAL",
      "question": "Excelでダブルクリックせずにセルの編集モードに入るためのファンクションキーを入力してください。",
      "answer": "F2",
      "accepted": [
        "F2"
      ],
      "explanation": "ダブルクリックせずに、セルの中身の修正をスムーズに始められます。",
      "supplement": ""
    },
    {
      "id": "K-023",
      "type": "input",
      "inputMode": "keys",
      "category": "Excel",
      "difficulty": "NORMAL",
      "question": "Excelのセルの書式設定画面を開くためのショートカットキーを入力してください。",
      "answer": "Ctrl+1",
      "accepted": [
        "Ctrl+1"
      ],
      "explanation": "表示形式や罫線、塗りつぶしなどをまとめて設定します。",
      "supplement": ""
    },
    {
      "id": "K-024",
      "type": "input",
      "inputMode": "keys",
      "category": "Excel",
      "difficulty": "HARD",
      "question": "Excelで指定したセルへ移動するジャンプ機能を呼び出すファンクションキーを入力してください。",
      "answer": "F5（またはCtrl+G）",
      "accepted": [
        "F5",
        "Ctrl+G"
      ],
      "explanation": "指定したセルへ一瞬で移動するための機能を開きます。",
      "supplement": "注意：F5 はアプリで働きが違います。ブラウザでは更新、Excel ではジャンプ、PowerPoint ではスライドショー開始です。"
    },
    {
      "id": "K-025",
      "type": "input",
      "inputMode": "keys",
      "category": "Excel",
      "difficulty": "NORMAL",
      "question": "Excelの1つのセルの中で改行を行うために押すキーの組み合わせを入力してください。",
      "answer": "Alt+Enter",
      "accepted": [
        "Alt+Enter"
      ],
      "explanation": "1つのセルの中に複数行の文字を入れて見やすく整えます。",
      "supplement": ""
    },
    {
      "id": "K-026",
      "type": "input",
      "inputMode": "keys",
      "category": "Excel",
      "difficulty": "HARD",
      "question": "Excelで上のセルの内容を下方向へ一気にコピーするショートカットキーを入力してください。",
      "answer": "Ctrl+D",
      "accepted": [
        "Ctrl+D"
      ],
      "explanation": "同じ値や数式を下方向へ一気に埋めることができます。",
      "supplement": ""
    },
    {
      "id": "K-027",
      "type": "input",
      "inputMode": "keys",
      "category": "Excel",
      "difficulty": "HARD",
      "question": "Excelのセルに今日の日付を素早く入力するためのショートカットキーを入力してください。",
      "answer": "Ctrl+;（セミコロン）",
      "accepted": [
        "Ctrl+;"
      ],
      "explanation": "日付の入力ミスを防ぎ、素早く今日の日付を入れられます。",
      "supplement": ""
    },
    {
      "id": "K-028",
      "type": "input",
      "inputMode": "keys",
      "category": "Excel",
      "difficulty": "HARD",
      "question": "Excelの表をすばやくテーブル化するためのショートカットキーを入力してください。",
      "answer": "Ctrl+T",
      "accepted": [
        "Ctrl+T"
      ],
      "explanation": "表をすばやくテーブル化し、集計やフィルターを便利に使えます。",
      "supplement": "プロのコツ：テーブル化すると、縞模様・フィルター・行追加時の数式の自動コピーがまとめて手に入ります。"
    },
    {
      "id": "K-029",
      "type": "input",
      "inputMode": "keys",
      "category": "Word",
      "difficulty": "NORMAL",
      "question": "Word文書において、次のページへ新しく送る「改ページ」のショートカットキーを入力してください。",
      "answer": "Ctrl+Enter",
      "accepted": [
        "Ctrl+Enter"
      ],
      "explanation": "Enterの連打をせず、レイアウトを崩さずに次のページへ新しく送ります。",
      "supplement": ""
    },
    {
      "id": "K-030",
      "type": "input",
      "inputMode": "keys",
      "category": "共通",
      "difficulty": "HARD",
      "question": "WordやPowerPointでおかしくなってしまった文字書式を標準に戻すショートカットキーを入力してください。",
      "answer": "Ctrl+Space",
      "accepted": [
        "Ctrl+Space"
      ],
      "explanation": "おかしくなってしまった文字の装飾を標準の状態に戻します。",
      "supplement": "プロのコツ：Web から貼り付けるときは［貼り付けのオプション］→「テキストのみ保持」で、余計な書式を持ち込まずに済みます。"
    },
    {
      "id": "K-031",
      "type": "input",
      "inputMode": "keys",
      "category": "PowerPoint",
      "difficulty": "NORMAL",
      "question": "PowerPointで新しいスライドを追加するためのショートカットキーを入力してください。",
      "answer": "Ctrl+M",
      "accepted": [
        "Ctrl+M"
      ],
      "explanation": "資料作成中に新しいスライドをすばやく追加します。",
      "supplement": ""
    },
    {
      "id": "K-032",
      "type": "input",
      "inputMode": "keys",
      "category": "PowerPoint",
      "difficulty": "NORMAL",
      "question": "PowerPointでスライドショーを最初から開始するためのファンクションキーを入力してください。",
      "answer": "F5",
      "accepted": [
        "F5"
      ],
      "explanation": "発表の開始や、資料全体の全体像を確認するために使います。",
      "supplement": ""
    },
    {
      "id": "K-033",
      "type": "input",
      "inputMode": "keys",
      "category": "PowerPoint",
      "difficulty": "NORMAL",
      "question": "PowerPointで現在のスライドからスライドショーを開始するためのキーの組み合わせを入力してください。",
      "answer": "Shift+F5",
      "accepted": [
        "Shift+F5"
      ],
      "explanation": "今作成しているスライドの見え方をピンポイントで確認できます。",
      "supplement": ""
    },
    {
      "id": "K-034",
      "type": "input",
      "inputMode": "keys",
      "category": "PowerPoint",
      "difficulty": "NORMAL",
      "question": "PowerPointで選択した図形やスライドを複製するショートカットキーを入力してください。",
      "answer": "Ctrl+D",
      "accepted": [
        "Ctrl+D"
      ],
      "explanation": "選択した図形やスライドをすばやく複製します。",
      "supplement": ""
    },
    {
      "id": "K-035",
      "type": "input",
      "inputMode": "keys",
      "category": "PowerPoint",
      "difficulty": "HARD",
      "question": "PowerPointで複数の図形をグループ化するためのショートカットキーを入力してください。",
      "answer": "Ctrl+G",
      "accepted": [
        "Ctrl+G"
      ],
      "explanation": "複数の図形をまとめて一緒に動かせるように結合します。",
      "supplement": ""
    },
    {
      "id": "K-036",
      "type": "input",
      "inputMode": "keys",
      "category": "Windows",
      "difficulty": "EASY",
      "question": "離席時にWindowsの画面をロックするためのショートカットキーを入力してください。",
      "answer": "Win+L",
      "accepted": [
        "Win+L"
      ],
      "explanation": "離席時に情報の漏えいを防ぐための社会人の必須マナーです。",
      "supplement": "プロのコツ：離席時は必ず Win+L。社会人の必須マナーです。"
    },
    {
      "id": "K-037",
      "type": "input",
      "inputMode": "keys",
      "category": "Windows",
      "difficulty": "NORMAL",
      "question": "現在開いているウィンドウを素早く切り替えるためのWindowsショートカットキーを入力してください。",
      "answer": "Alt+Tab",
      "accepted": [
        "Alt+Tab"
      ],
      "explanation": "現在開いているアプリの間を素早く行き来します。",
      "supplement": ""
    },
    {
      "id": "K-038",
      "type": "input",
      "inputMode": "keys",
      "category": "Windows",
      "difficulty": "NORMAL",
      "question": "Windowsのエクスプローラーを開くためのショートカットキーを入力してください。",
      "answer": "Win+E",
      "accepted": [
        "Win+E"
      ],
      "explanation": "ファイルやフォルダーを管理・検索する画面を直接開きます。",
      "supplement": ""
    },
    {
      "id": "K-039",
      "type": "input",
      "inputMode": "keys",
      "category": "Windows",
      "difficulty": "NORMAL",
      "question": "開いている画面を一時的にすべて隠してデスクトップを表示するWindowsショートカットキーを入力してください。",
      "answer": "Win+D",
      "accepted": [
        "Win+D"
      ],
      "explanation": "開いている画面を一時的にすべて隠してデスクトップを表示します。",
      "supplement": ""
    },
    {
      "id": "K-040",
      "type": "input",
      "inputMode": "keys",
      "category": "Windows",
      "difficulty": "NORMAL",
      "question": "画面の一部を切り取ってスクリーンショットを取得するWindowsショートカットキーを入力してください。",
      "answer": "Win+Shift+S",
      "accepted": [
        "Win+Shift+S"
      ],
      "explanation": "画面の一部を切り取って画像としてすばやく取得できます。",
      "supplement": "注意：共有する前に、パスワードや個人情報が写り込んでいないか確認しましょう。"
    },
    {
      "id": "K-041",
      "type": "input",
      "inputMode": "keys",
      "category": "Windows",
      "difficulty": "NORMAL",
      "question": "ウィンドウを画面の左右半分にきれいにスナップ配置するためのWindowsキーの組み合わせを入力してください。",
      "answer": "Win+← / →",
      "accepted": [
        "Win+Left",
        "Win+Right"
      ],
      "explanation": "2つの資料を左右に並べて見比べながら作業しやすくします。",
      "supplement": "プロのコツ：資料と Excel を左右に並べれば、画面を行き来せずに転記でき、転記ミスも減ります。"
    },
    {
      "id": "K-042",
      "type": "input",
      "inputMode": "keys",
      "category": "Windows",
      "difficulty": "HARD",
      "question": "過去にコピーした複数の履歴から選んで貼り付けられるようにするWindowsショートカットキーを入力してください。",
      "answer": "Win+V",
      "accepted": [
        "Win+V"
      ],
      "explanation": "過去にコピーした複数の内容から選んで貼り付けられるようにします。",
      "supplement": "プロのコツ：クリップボード履歴は初回だけ有効化が必要です。Win+V を押して「有効にする」を選びましょう。"
    },
    {
      "id": "K-043",
      "type": "input",
      "inputMode": "keys",
      "category": "Windows",
      "difficulty": "HARD",
      "question": "固まったアプリを終了させるためにタスクマネージャーを直接開くWindowsショートカットキーを入力してください。",
      "answer": "Ctrl+Shift+Esc",
      "accepted": [
        "Ctrl+Shift+Esc"
      ],
      "explanation": "固まって動かなくなったアプリを安全に強制終了させます。",
      "supplement": "プロのコツ：まず少し待ち、それでも動かなければタスクマネージャーから該当アプリを終了します。"
    },
    {
      "id": "K-044",
      "type": "input",
      "inputMode": "text",
      "category": "共通",
      "difficulty": "NORMAL",
      "question": "Officeのファイル名末尾にある「.xlsx」や「.pptx」などの名称を入力してください。",
      "answer": "拡張子",
      "accepted": [
        "拡張子"
      ],
      "explanation": "ファイル名の末尾にあり、ファイルの種類を見分ける役割を持ちます。",
      "supplement": ""
    },
    {
      "id": "K-045",
      "type": "input",
      "inputMode": "text",
      "category": "Excel",
      "difficulty": "EASY",
      "question": "Excelのファイル1つ全体のことを指す専門用語を入力してください。",
      "answer": "ブック",
      "accepted": [
        "ブック"
      ],
      "explanation": "Excelファイル1つ全体のことを指す専門用語です。",
      "supplement": ""
    },
    {
      "id": "K-046",
      "type": "input",
      "inputMode": "text",
      "category": "Excel",
      "difficulty": "EASY",
      "question": "Excelの表の中にある1つ1つのマス目を指す専門用語を入力してください。",
      "answer": "セル",
      "accepted": [
        "セル"
      ],
      "explanation": "Excelの表の中にある1つ1つのマス目のことで、データを入れる最小単位です。",
      "supplement": ""
    },
    {
      "id": "K-047",
      "type": "input",
      "inputMode": "text",
      "category": "PowerPoint",
      "difficulty": "NORMAL",
      "question": "PowerPoint資料のフォントサイズについて、本文用に推奨される最低限のサイズを入力してください。",
      "answer": "18pt以上",
      "accepted": [
        "18pt以上",
        "18pt",
        "18ポイント以上",
        "18ポイント",
        "18"
      ],
      "explanation": "後ろの席からでもしっかりと読める見やすい文字サイズの基準です。",
      "supplement": "プロのコツ：入りきらないときは文字を小さくする前に、文章を削るかスライドを2枚に分けましょう。"
    },
    {
      "id": "K-048",
      "type": "input",
      "inputMode": "text",
      "category": "PowerPoint",
      "difficulty": "NORMAL",
      "question": "PowerPoint資料作成の基本原則である「1枚のスライドに盛り込むメッセージの数」について入力してください。",
      "answer": "1スライド1メッセージ（1つ）",
      "accepted": [
        "1スライド1メッセージ",
        "1枚1メッセージ",
        "1メッセージ",
        "1つ",
        "ひとつ",
        "一つ",
        "1",
        "1個"
      ],
      "explanation": "1枚のスライドで伝える内容は1つに絞り、シンプルに伝えるのが鉄則です。",
      "supplement": "プロのコツ：タイトルは「話題」ではなく「結論」を書くと、タイトルだけで内容が伝わります。"
    },
    {
      "id": "K-049",
      "type": "input",
      "inputMode": "text",
      "category": "共通",
      "difficulty": "EASY",
      "question": "WordやPowerPoint画面の上部に並ぶ「ホーム」「挿入」などのタブとボタンの集まりの名称を入力してください。",
      "answer": "リボン",
      "accepted": [
        "リボン"
      ],
      "explanation": "画面上部に並ぶ「ホーム」「挿入」などのタブとボタンの集まり全体を指します。",
      "supplement": ""
    },
    {
      "id": "K-050",
      "type": "input",
      "inputMode": "text",
      "category": "共通",
      "difficulty": "EASY",
      "question": "コピーや切り取りをした内容が一時的に保管される仕組みの名称を入力してください。",
      "answer": "クリップボード",
      "accepted": [
        "クリップボード"
      ],
      "explanation": "コピーや切り取りをした内容を一時的に保管しておく場所のことです。",
      "supplement": ""
    }
  ]
};
