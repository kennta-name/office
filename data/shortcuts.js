/**
 * ショートカット一覧データ（shortcuts.html で使用）
 * keys     : 押すキー。別の押し方がある場合は配列に並べる（例 ["F5", "Ctrl+G"]）
 *            「cmd」のようにかぎかっこで囲んだ部分は「文字を入力する」操作として表示
 *            "Alt>F" は「Alt を押して離してから F」、"Shift+ドラッグ" のようにマウス操作も書ける
 * level    : 重要度 3=最優先 / 2=慣れたら / 1=必要になったら
 * practice : 道場で練習できる問題ID（data/questions.js の id）
 */
window.SHORTCUT_DATA = {
  "apps": [
    "共通",
    "Excel",
    "Word",
    "PowerPoint",
    "Windows",
    "ブラウザ"
  ],
  "items": [
    {
      "id": "S-001",
      "app": "共通",
      "keys": [
        "Ctrl+C"
      ],
      "name": "コピー",
      "description": "選択した文字・セル・図形を複製します。",
      "usage": "同じ内容を別の場所でも使いたいとき",
      "level": 3,
      "practice": [
        "K-001"
      ]
    },
    {
      "id": "S-002",
      "app": "共通",
      "keys": [
        "Ctrl+V"
      ],
      "name": "貼り付け",
      "description": "コピー・切り取りした内容を貼り付けます。",
      "usage": "コピーした内容を取り出すとき",
      "level": 3,
      "practice": [
        "K-002"
      ]
    },
    {
      "id": "S-003",
      "app": "共通",
      "keys": [
        "Ctrl+X"
      ],
      "name": "切り取り",
      "description": "選択した内容を別の場所へ移動するために切り取ります。",
      "usage": "文章や図形の位置を入れ替えるとき",
      "level": 3,
      "practice": [
        "K-003"
      ]
    },
    {
      "id": "S-004",
      "app": "共通",
      "keys": [
        "Ctrl+Z"
      ],
      "name": "元に戻す",
      "description": "直前の操作を取り消します。何回でも戻れます。",
      "usage": "「何か変になった」と思ったらまず押す",
      "level": 3,
      "practice": [
        "C-002",
        "K-004"
      ]
    },
    {
      "id": "S-005",
      "app": "共通",
      "keys": [
        "Ctrl+Y"
      ],
      "name": "やり直し",
      "description": "Ctrl+Z で戻しすぎた操作を、もう一度進めます。",
      "usage": "取り消しすぎたとき",
      "level": 3,
      "practice": [
        "K-005"
      ]
    },
    {
      "id": "S-006",
      "app": "共通",
      "keys": [
        "Ctrl+S"
      ],
      "name": "上書き保存",
      "description": "作業中のファイルを保存します。",
      "usage": "区切りのいいところ、席を立つ前に必ず",
      "level": 3,
      "practice": [
        "C-001",
        "K-009"
      ]
    },
    {
      "id": "S-007",
      "app": "共通",
      "keys": [
        "Ctrl+A"
      ],
      "name": "すべて選択",
      "description": "文書全体・表全体をまとめて選択します。",
      "usage": "全体の書式を一度に変えるとき",
      "level": 3,
      "practice": [
        "C-006",
        "K-006"
      ]
    },
    {
      "id": "S-008",
      "app": "共通",
      "keys": [
        "Ctrl+F"
      ],
      "name": "検索",
      "description": "文書や表から特定の文字を探します。",
      "usage": "長い資料の中で目的の言葉を探すとき",
      "level": 2,
      "practice": [
        "C-014",
        "K-007"
      ]
    },
    {
      "id": "S-009",
      "app": "共通",
      "keys": [
        "Ctrl+H"
      ],
      "name": "検索と置換",
      "description": "特定の言葉を別の言葉に一括で置き換えます。",
      "usage": "表記ゆれをまとめて直すとき。「すべて置換」の前に数件確認する",
      "level": 2,
      "practice": [
        "K-008"
      ]
    },
    {
      "id": "S-010",
      "app": "共通",
      "keys": [
        "Ctrl+P"
      ],
      "name": "印刷",
      "description": "印刷画面（プレビュー付き）を開きます。",
      "usage": "印刷の前に見た目を確認するとき",
      "level": 2,
      "practice": [
        "K-010"
      ]
    },
    {
      "id": "S-011",
      "app": "共通",
      "keys": [
        "Ctrl+W"
      ],
      "name": "閉じる",
      "description": "開いているファイル（ブラウザではタブ）だけを閉じます。",
      "usage": "アプリは残したままファイルを閉じたいとき",
      "level": 2,
      "practice": [
        "C-046",
        "K-011"
      ]
    },
    {
      "id": "S-012",
      "app": "共通",
      "keys": [
        "Alt+F4"
      ],
      "name": "アプリ終了",
      "description": "アプリそのものを終了します。",
      "usage": "作業を終えてアプリごと閉じるとき",
      "level": 2,
      "practice": [
        "K-012"
      ]
    },
    {
      "id": "S-013",
      "app": "共通",
      "keys": [
        "Ctrl+N"
      ],
      "name": "新規作成",
      "description": "新しいファイルを作成します。",
      "usage": "白紙のブック・文書をすぐに作るとき",
      "level": 2,
      "practice": []
    },
    {
      "id": "S-014",
      "app": "共通",
      "keys": [
        "Ctrl+O"
      ],
      "name": "開く",
      "description": "ファイルを開く画面を表示します。",
      "usage": "保存済みのファイルを開くとき",
      "level": 1,
      "practice": []
    },
    {
      "id": "S-015",
      "app": "共通",
      "keys": [
        "Ctrl+B"
      ],
      "name": "太字",
      "description": "選択した文字を太字にします。もう一度押すと解除。",
      "usage": "重要な言葉を強調するとき",
      "level": 2,
      "practice": [
        "C-048",
        "K-013"
      ]
    },
    {
      "id": "S-016",
      "app": "共通",
      "keys": [
        "Ctrl+I"
      ],
      "name": "斜体",
      "description": "選択した文字を斜体にします。",
      "usage": "英文の強調や書名など",
      "level": 1,
      "practice": [
        "K-014"
      ]
    },
    {
      "id": "S-017",
      "app": "共通",
      "keys": [
        "Ctrl+U"
      ],
      "name": "下線",
      "description": "選択した文字に下線を引きます。",
      "usage": "強調したい語句に",
      "level": 1,
      "practice": [
        "K-015"
      ]
    },
    {
      "id": "S-018",
      "app": "共通",
      "keys": [
        "Ctrl+Home"
      ],
      "name": "先頭へ移動",
      "description": "文書・シートの一番最初へ移動します。",
      "usage": "長い資料の先頭に戻るとき",
      "level": 2,
      "practice": [
        "K-016"
      ]
    },
    {
      "id": "S-019",
      "app": "共通",
      "keys": [
        "Ctrl+End"
      ],
      "name": "末尾へ移動",
      "description": "文書の最後、Excel ではデータが入った最後のセルへ移動します。",
      "usage": "データの最後を確認するとき",
      "level": 2,
      "practice": []
    },
    {
      "id": "S-020",
      "app": "共通",
      "keys": [
        "Shift+Arrow"
      ],
      "name": "範囲選択",
      "description": "マウスを使わずに文字やセルを少しずつ選択します。",
      "usage": "選択範囲を細かく調整するとき",
      "level": 2,
      "practice": [
        "K-020"
      ]
    },
    {
      "id": "S-021",
      "app": "共通",
      "keys": [
        "Ctrl+Shift+Arrow"
      ],
      "name": "まとめて範囲選択",
      "description": "Word では単語単位、Excel ではデータの端まで一気に選択します。",
      "usage": "列全体・表全体を正確に選ぶとき",
      "level": 2,
      "practice": []
    },
    {
      "id": "S-022",
      "app": "共通",
      "keys": [
        "F7"
      ],
      "name": "スペルチェック・文章校正",
      "description": "誤字や入力ミスを確認します。",
      "usage": "資料を提出する前の最終確認",
      "level": 1,
      "practice": [
        "K-018"
      ]
    },
    {
      "id": "S-023",
      "app": "共通",
      "keys": [
        "F12"
      ],
      "name": "名前を付けて保存",
      "description": "別の名前で保存し、元のファイルを残したまま新しい版を作ります。",
      "usage": "版を分けて保存したいとき",
      "level": 2,
      "practice": [
        "C-028",
        "K-019"
      ]
    },
    {
      "id": "S-024",
      "app": "共通",
      "keys": [
        "Alt>F"
      ],
      "name": "「ファイル」タブを開く",
      "description": "Alt を押して離してから F を押します。保存・印刷・エクスポートなどのメニューを表示します。",
      "usage": "マウスなしでファイル操作をしたいとき",
      "level": 1,
      "practice": []
    },
    {
      "id": "S-074",
      "app": "共通",
      "keys": [
        "Alt"
      ],
      "name": "キーヒントを表示",
      "description": "Alt キーを1回押すと、リボンの各ボタンにアルファベットが表示されます。表示された文字を順に押すと、マウスなしで操作できます。",
      "usage": "マウスを使わずにリボンの機能を呼び出すとき",
      "level": 1,
      "practice": []
    },
    {
      "id": "S-075",
      "app": "共通",
      "keys": [
        "Alt+数字"
      ],
      "name": "クイックアクセスツールバーのボタンを実行",
      "description": "クイックアクセスツールバーに登録したボタンを、Alt と表示された番号で実行します。",
      "usage": "よく使う機能を自分専用のショートカットにしたいとき",
      "level": 1,
      "practice": []
    },
    {
      "id": "S-077",
      "app": "Excel",
      "keys": [
        "Ctrl+F"
      ],
      "name": "検索",
      "description": "大量のデータから文字や数値を探します。",
      "usage": "何千行もある表から目的のデータを探すとき",
      "level": 3,
      "practice": [
        "C-014",
        "K-007"
      ]
    },
    {
      "id": "S-078",
      "app": "Excel",
      "keys": [
        "Ctrl+H"
      ],
      "name": "検索と置換",
      "description": "文字をまとめて別の文字に置き換えます。",
      "usage": "誤字の一括修正や表記ゆれの統一",
      "level": 3,
      "practice": [
        "K-008"
      ]
    },
    {
      "id": "S-025",
      "app": "Excel",
      "keys": [
        "Ctrl+Arrow"
      ],
      "name": "データの端へジャンプ",
      "description": "表の最終行や右端へ一瞬で移動します。",
      "usage": "何千行もある表をスクロールせずに移動するとき",
      "level": 3,
      "practice": [
        "C-004",
        "K-021"
      ]
    },
    {
      "id": "S-076",
      "app": "Excel",
      "keys": [
        "Ctrl+Shift+Arrow"
      ],
      "name": "データの端まで選択",
      "description": "今のセルからデータの端までをまとめて選択します。",
      "usage": "列全体・表全体を正確に選ぶとき",
      "level": 3,
      "practice": []
    },
    {
      "id": "S-026",
      "app": "Excel",
      "keys": [
        "F2"
      ],
      "name": "セルの編集",
      "description": "ダブルクリックせずにセルの中身を編集します。",
      "usage": "セルの一部だけを直すとき",
      "level": 2,
      "practice": [
        "C-021",
        "K-022"
      ]
    },
    {
      "id": "S-027",
      "app": "Excel",
      "keys": [
        "Ctrl+1"
      ],
      "name": "セルの書式設定",
      "description": "表示形式・罫線・塗りつぶしなどをまとめて設定します。",
      "usage": "見出しを「選択範囲内で中央」にそろえるときにも",
      "level": 2,
      "practice": [
        "K-023"
      ]
    },
    {
      "id": "S-028",
      "app": "Excel",
      "keys": [
        "F5",
        "Ctrl+G"
      ],
      "name": "ジャンプ",
      "description": "指定したセルへ移動します。",
      "usage": "離れたセルへすぐ移動するとき",
      "level": 2,
      "practice": [
        "C-040",
        "K-024"
      ]
    },
    {
      "id": "S-029",
      "app": "Excel",
      "keys": [
        "Alt+Enter"
      ],
      "name": "セル内で改行",
      "description": "1つのセルの中で改行します。",
      "usage": "セルに複数行の文字を入れるとき",
      "level": 2,
      "practice": [
        "C-011",
        "K-025"
      ]
    },
    {
      "id": "S-030",
      "app": "Excel",
      "keys": [
        "Ctrl+D"
      ],
      "name": "下方向へコピー",
      "description": "上のセルの値や数式を下へコピーします。",
      "usage": "同じ数式を下へ一気に埋めるとき",
      "level": 2,
      "practice": [
        "C-037",
        "K-026"
      ]
    },
    {
      "id": "S-031",
      "app": "Excel",
      "keys": [
        "Ctrl+R"
      ],
      "name": "右方向へコピー",
      "description": "左のセルの値や数式を右へコピーします。",
      "usage": "横方向に同じ数式を入れるとき",
      "level": 1,
      "practice": []
    },
    {
      "id": "S-032",
      "app": "Excel",
      "keys": [
        "Ctrl+;"
      ],
      "name": "今日の日付を入力",
      "description": "セルに今日の日付を入力します。",
      "usage": "日付の入力ミスを防ぐとき",
      "level": 1,
      "practice": [
        "K-027"
      ]
    },
    {
      "id": "S-033",
      "app": "Excel",
      "keys": [
        "Alt+Shift+="
      ],
      "name": "オートSUM",
      "description": "合計の数式を自動で入れます。",
      "usage": "列や行の合計をすぐに出すとき",
      "level": 1,
      "practice": []
    },
    {
      "id": "S-034",
      "app": "Excel",
      "keys": [
        "Ctrl+T"
      ],
      "name": "テーブルとして書式設定",
      "description": "表をテーブルにし、縞模様・フィルター・数式の自動拡張を付けます。",
      "usage": "データ表を作ったらまず押す",
      "level": 1,
      "practice": [
        "C-017",
        "K-028"
      ]
    },
    {
      "id": "S-035",
      "app": "Excel",
      "keys": [
        "F4"
      ],
      "name": "参照の切り替え／直前の操作の繰り返し",
      "description": "数式の編集中は $A$1 などの絶対参照を切り替え、それ以外では直前の操作を繰り返します。",
      "usage": "税率など固定のセルを参照するとき",
      "level": 1,
      "practice": [
        "C-007"
      ]
    },
    {
      "id": "S-036",
      "app": "Excel",
      "keys": [
        "Ctrl+5"
      ],
      "name": "取り消し線",
      "description": "文字に取り消し線を引きます。",
      "usage": "完了したタスクや削除予定の項目に",
      "level": 1,
      "practice": []
    },
    {
      "id": "S-037",
      "app": "Excel",
      "keys": [
        "Ctrl+Space"
      ],
      "name": "列全体を選択",
      "description": "アクティブなセルがある列全体を選択します。",
      "usage": "列の幅や書式をまとめて変えるとき",
      "level": 1,
      "practice": []
    },
    {
      "id": "S-038",
      "app": "Excel",
      "keys": [
        "Shift+Space"
      ],
      "name": "行全体を選択",
      "description": "アクティブなセルがある行全体を選択します。",
      "usage": "行の挿入・削除の前に",
      "level": 1,
      "practice": []
    },
    {
      "id": "S-039",
      "app": "Word",
      "keys": [
        "Ctrl+Enter"
      ],
      "name": "改ページ",
      "description": "次の内容を新しいページから始めます。",
      "usage": "Enter の連打でページを送らない",
      "level": 3,
      "practice": [
        "K-029"
      ]
    },
    {
      "id": "S-040",
      "app": "Word",
      "keys": [
        "Ctrl+E"
      ],
      "name": "中央揃え",
      "description": "段落を中央にそろえます。",
      "usage": "タイトルを中央に置くとき",
      "level": 2,
      "practice": []
    },
    {
      "id": "S-041",
      "app": "Word",
      "keys": [
        "Ctrl+L"
      ],
      "name": "左揃え",
      "description": "段落を左にそろえます。",
      "usage": "本文を標準の配置に戻すとき",
      "level": 1,
      "practice": []
    },
    {
      "id": "S-042",
      "app": "Word",
      "keys": [
        "Ctrl+R"
      ],
      "name": "右揃え",
      "description": "段落を右にそろえます。",
      "usage": "日付や署名を右に寄せるとき",
      "level": 1,
      "practice": []
    },
    {
      "id": "S-043",
      "app": "Word",
      "keys": [
        "Ctrl+Shift+C"
      ],
      "name": "書式のコピー",
      "description": "文字の見た目（書式）だけをコピーします。",
      "usage": "見た目を別の場所にそろえたいとき",
      "level": 1,
      "practice": []
    },
    {
      "id": "S-044",
      "app": "Word",
      "keys": [
        "Ctrl+Shift+V"
      ],
      "name": "書式の貼り付け",
      "description": "コピーした書式だけを貼り付けます。",
      "usage": "Ctrl+Shift+C とセットで",
      "level": 1,
      "practice": []
    },
    {
      "id": "S-045",
      "app": "Word",
      "keys": [
        "Ctrl+Space"
      ],
      "name": "文字書式の解除",
      "description": "おかしくなった文字の書式を標準に戻します。",
      "usage": "Web から貼り付けて書式が崩れたとき",
      "level": 2,
      "practice": [
        "C-015",
        "K-030"
      ]
    },
    {
      "id": "S-046",
      "app": "Word",
      "keys": [
        "Ctrl+Shift+8"
      ],
      "name": "編集記号の表示／非表示",
      "description": "改行やスペースなど、印刷されない記号を表示します。",
      "usage": "レイアウト崩れの原因を探すとき",
      "level": 1,
      "practice": []
    },
    {
      "id": "S-047",
      "app": "PowerPoint",
      "keys": [
        "Ctrl+M"
      ],
      "name": "新しいスライドを追加",
      "description": "スライドを1枚追加します。",
      "usage": "資料を作りながらどんどん増やすとき",
      "level": 3,
      "practice": [
        "C-033",
        "K-031"
      ]
    },
    {
      "id": "S-048",
      "app": "PowerPoint",
      "keys": [
        "F5"
      ],
      "name": "スライドショーを最初から",
      "description": "1枚目からスライドショーを始めます。",
      "usage": "発表の開始、全体の見え方の確認",
      "level": 3,
      "practice": [
        "K-032"
      ]
    },
    {
      "id": "S-049",
      "app": "PowerPoint",
      "keys": [
        "Shift+F5"
      ],
      "name": "スライドショーを現在のスライドから",
      "description": "作業中のスライドからスライドショーを始めます。",
      "usage": "作ったスライドの見え方だけ確認するとき",
      "level": 3,
      "practice": [
        "C-005",
        "K-033"
      ]
    },
    {
      "id": "S-050",
      "app": "PowerPoint",
      "keys": [
        "Ctrl+D"
      ],
      "name": "複製",
      "description": "選択した図形やスライドを複製します。",
      "usage": "同じ形の図形を並べるとき",
      "level": 2,
      "practice": [
        "K-034"
      ]
    },
    {
      "id": "S-051",
      "app": "PowerPoint",
      "keys": [
        "Ctrl+G"
      ],
      "name": "グループ化",
      "description": "複数の図形を1つにまとめます。",
      "usage": "まとめて移動・拡大縮小するとき",
      "level": 2,
      "practice": [
        "C-036",
        "K-035"
      ]
    },
    {
      "id": "S-052",
      "app": "PowerPoint",
      "keys": [
        "Ctrl+Shift+G"
      ],
      "name": "グループ解除",
      "description": "グループ化した図形をばらします。",
      "usage": "一部の図形だけ直したいとき",
      "level": 1,
      "practice": []
    },
    {
      "id": "S-053",
      "app": "PowerPoint",
      "keys": [
        "Shift+ドラッグ"
      ],
      "name": "縦横比を保って変形／水平・垂直に移動",
      "description": "Shift を押しながらドラッグします。",
      "usage": "画像や図形をゆがませないとき",
      "level": 2,
      "practice": []
    },
    {
      "id": "S-054",
      "app": "PowerPoint",
      "keys": [
        "Ctrl+ドラッグ"
      ],
      "name": "コピーしながら移動",
      "description": "Ctrl を押しながら図形をドラッグします。",
      "usage": "図形をすばやく複製して並べるとき",
      "level": 2,
      "practice": []
    },
    {
      "id": "S-080",
      "app": "PowerPoint",
      "keys": [
        "Ctrl+ドラッグ"
      ],
      "name": "ガイド線を追加",
      "description": "［表示］→「ガイド」を表示した状態で、Ctrl を押しながらガイドをドラッグすると線を追加できます。",
      "usage": "全スライドで同じ位置に要素をそろえるとき",
      "level": 1,
      "practice": []
    },
    {
      "id": "S-055",
      "app": "PowerPoint",
      "keys": [
        "Ctrl+Enter"
      ],
      "name": "次の入力枠へ移動",
      "description": "次のプレースホルダーへ移動します。最後の枠では新しいスライドを追加します。",
      "usage": "タイトルから本文へすぐ移るとき",
      "level": 1,
      "practice": []
    },
    {
      "id": "S-079",
      "app": "PowerPoint",
      "keys": [
        "Ctrl+Space"
      ],
      "name": "文字書式の解除",
      "description": "選択した文字の書式を標準に戻します。",
      "usage": "おかしくなった文字の見た目をリセットするとき",
      "level": 1,
      "practice": [
        "C-015",
        "K-030"
      ]
    },
    {
      "id": "S-056",
      "app": "PowerPoint",
      "keys": [
        "B",
        "W"
      ],
      "name": "画面を黒／白にする（発表中）",
      "description": "スライドショー中に B で黒、W で白の画面にします。もう一度押すと戻ります。",
      "usage": "質疑応答で注目を話し手に戻すとき",
      "level": 1,
      "practice": []
    },
    {
      "id": "S-057",
      "app": "Windows",
      "keys": [
        "Win+L"
      ],
      "name": "画面ロック",
      "description": "PC の画面をロックします。",
      "usage": "離席するときは必ず",
      "level": 3,
      "practice": [
        "C-003",
        "K-036"
      ]
    },
    {
      "id": "S-058",
      "app": "Windows",
      "keys": [
        "Alt+Tab"
      ],
      "name": "ウィンドウの切り替え",
      "description": "開いているアプリを切り替えます。",
      "usage": "複数のアプリを行き来するとき",
      "level": 3,
      "practice": [
        "C-019",
        "K-037"
      ]
    },
    {
      "id": "S-059",
      "app": "Windows",
      "keys": [
        "Win+E"
      ],
      "name": "エクスプローラーを開く",
      "description": "ファイル・フォルダーの画面を開きます。",
      "usage": "ファイルを探す・整理するとき",
      "level": 3,
      "practice": [
        "C-010",
        "K-038"
      ]
    },
    {
      "id": "S-060",
      "app": "Windows",
      "keys": [
        "Win+D"
      ],
      "name": "デスクトップを表示",
      "description": "開いている画面をすべて隠します。もう一度押すと元に戻ります。",
      "usage": "デスクトップのファイルを使うとき",
      "level": 2,
      "practice": [
        "K-039"
      ]
    },
    {
      "id": "S-061",
      "app": "Windows",
      "keys": [
        "Win+Shift+S"
      ],
      "name": "画面の一部をスクリーンショット",
      "description": "範囲を選んで画面を画像として取得します。",
      "usage": "手順書や問い合わせに画像を貼るとき。個人情報の写り込みに注意",
      "level": 2,
      "practice": [
        "C-024",
        "K-040"
      ]
    },
    {
      "id": "S-062",
      "app": "Windows",
      "keys": [
        "Win+Left",
        "Win+Right"
      ],
      "name": "ウィンドウを左右半分に配置",
      "description": "ウィンドウを画面の左半分・右半分にそろえます。",
      "usage": "2つの資料を並べて見比べるとき",
      "level": 2,
      "practice": [
        "K-041"
      ]
    },
    {
      "id": "S-063",
      "app": "Windows",
      "keys": [
        "Win+V"
      ],
      "name": "クリップボード履歴",
      "description": "過去にコピーした内容から選んで貼り付けます（初回は有効化が必要）。",
      "usage": "少し前にコピーしたものをもう一度使うとき",
      "level": 2,
      "practice": [
        "C-016",
        "K-042"
      ]
    },
    {
      "id": "S-064",
      "app": "Windows",
      "keys": [
        "Win+Tab"
      ],
      "name": "タスクビュー",
      "description": "ウィンドウの一覧と仮想デスクトップを表示します。",
      "usage": "ウィンドウが多すぎて見つからないとき",
      "level": 1,
      "practice": []
    },
    {
      "id": "S-065",
      "app": "Windows",
      "keys": [
        "Win+R"
      ],
      "name": "ファイル名を指定して実行",
      "description": "コマンドやアプリを名前で起動します。",
      "usage": "cmd や mstsc をすぐ起動するとき",
      "level": 1,
      "practice": []
    },
    {
      "id": "S-082",
      "app": "Windows",
      "keys": [
        "Win+R>「cmd」>Enter"
      ],
      "name": "コマンドプロンプトを起動",
      "description": "Win+R の画面で「cmd」と入力して Enter を押します。",
      "usage": "ping や ipconfig でネットワークを確認するとき",
      "level": 1,
      "practice": []
    },
    {
      "id": "S-083",
      "app": "Windows",
      "keys": [
        "Win+R>「powershell」>Enter"
      ],
      "name": "PowerShell を起動",
      "description": "Win+R の画面で「powershell」と入力して Enter を押します。cmd より高機能なコマンド環境です。",
      "usage": "複数の操作を自動化するスクリプトを作るとき",
      "level": 1,
      "practice": []
    },
    {
      "id": "S-084",
      "app": "Windows",
      "keys": [
        "Win+R>「mstsc」>Enter"
      ],
      "name": "リモートデスクトップ接続を起動",
      "description": "Win+R の画面で「mstsc」と入力して Enter を押します。",
      "usage": "離れた場所の PC やサーバーに接続して操作するとき",
      "level": 1,
      "practice": []
    },
    {
      "id": "S-085",
      "app": "Windows",
      "keys": [
        "Win+R>「regedit」>Enter"
      ],
      "name": "レジストリエディターを起動",
      "description": "Win+R の画面で「regedit」と入力して Enter を押します。Windows の内部設定を直接編集する画面です。",
      "usage": "注意：誤った変更で PC が起動しなくなることがあります。手順書や管理者の指示があるときだけ開く",
      "level": 1,
      "practice": []
    },
    {
      "id": "S-066",
      "app": "Windows",
      "keys": [
        "Win+I"
      ],
      "name": "設定を開く",
      "description": "Windows の設定画面を開きます。",
      "usage": "ディスプレイやネットワークの設定を変えるとき",
      "level": 1,
      "practice": []
    },
    {
      "id": "S-067",
      "app": "Windows",
      "keys": [
        "F2"
      ],
      "name": "名前の変更（エクスプローラー）",
      "description": "選択したファイルの名前を変更します。",
      "usage": "ファイル名をすばやく直すとき",
      "level": 2,
      "practice": []
    },
    {
      "id": "S-081",
      "app": "Windows",
      "keys": [
        "F5"
      ],
      "name": "表示の更新（エクスプローラー）",
      "description": "エクスプローラーの表示を最新の状態にします。",
      "usage": "ファイルを保存したのに一覧に出てこないとき",
      "level": 1,
      "practice": []
    },
    {
      "id": "S-068",
      "app": "Windows",
      "keys": [
        "Ctrl+Shift+Esc"
      ],
      "name": "タスクマネージャーを開く",
      "description": "タスクマネージャーを直接開きます。",
      "usage": "固まったアプリを終了させるとき",
      "level": 2,
      "practice": [
        "C-035",
        "K-043"
      ]
    },
    {
      "id": "S-069",
      "app": "ブラウザ",
      "keys": [
        "F5"
      ],
      "name": "ページの更新",
      "description": "表示中のページを読み込み直します。",
      "usage": "表示が古いとき",
      "level": 2,
      "practice": []
    },
    {
      "id": "S-070",
      "app": "ブラウザ",
      "keys": [
        "Ctrl+L"
      ],
      "name": "アドレスバーを選択",
      "description": "アドレスバーにカーソルを移します。",
      "usage": "URL をコピー・入力するとき",
      "level": 1,
      "practice": []
    },
    {
      "id": "S-071",
      "app": "ブラウザ",
      "keys": [
        "Ctrl+Shift+T"
      ],
      "name": "閉じたタブを開き直す",
      "description": "直前に閉じたタブを元に戻します。",
      "usage": "うっかりタブを閉じたとき",
      "level": 2,
      "practice": []
    },
    {
      "id": "S-072",
      "app": "ブラウザ",
      "keys": [
        "F12"
      ],
      "name": "開発者ツール（DevTools）",
      "description": "Web ページの構造やエラーを調べる画面を開きます。",
      "usage": "表示崩れや通信エラーの調査",
      "level": 1,
      "practice": []
    },
    {
      "id": "S-073",
      "app": "ブラウザ",
      "keys": [
        "Ctrl+Shift+M"
      ],
      "name": "スマホ表示の確認（DevTools）",
      "description": "開発者ツールを開いた状態で、スマートフォンの画面サイズで表示します（Chrome・Edge）。",
      "usage": "レスポンシブ表示の確認",
      "level": 1,
      "practice": []
    }
  ]
};
