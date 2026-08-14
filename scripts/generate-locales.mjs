import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const origin = "https://snorz.ajigu.com";

const locales = [
  {
    code: "en-US",
    route: "",
    label: "English (US)",
    target: null,
    titles: {
      home: "Snorz — Record. Understand. Discover.",
      support: "Support — Snorz",
      privacy: "Privacy Policy — Snorz",
    },
    descriptions: {
      home: "Snorz privately detects likely snores, turns each night into clear trends, and lets you discover memorable Sound Matches.",
      support: "Help, troubleshooting, and contact options for Snorz.",
      privacy: "Privacy Policy for Snorz, including on-device audio analysis, iCloud Sync, Discover, and subscriptions.",
    },
  },
  {
    code: "en-GB",
    route: "en-gb",
    label: "English (UK)",
    target: null,
    titles: {
      home: "Snorz — Record. Understand. Discover.",
      support: "Support — Snorz",
      privacy: "Privacy Policy — Snorz",
    },
    descriptions: {
      home: "Snorz privately detects likely snores, turns each night into clear trends, and lets you discover memorable Sound Matches.",
      support: "Help, troubleshooting and contact options for Snorz.",
      privacy: "Privacy Policy for Snorz, including on-device audio analysis, iCloud Sync, Discover and subscriptions.",
    },
  },
  {
    code: "zh-Hans",
    route: "zh-hans",
    label: "简体中文",
    target: "zh-CN",
    hero: "记录。<br>读懂。<br><span class=\"gradient-word\">发现。</span>",
    privacyHeading: "卧室里的声音，默认不会成为公开内容。",
    titles: { home: "Snorz — 记录、读懂、发现", support: "Snorz 支持", privacy: "Snorz 隐私政策" },
    descriptions: {
      home: "Snorz 私密识别疑似鼾声，将每晚记录转化为清晰趋势，并带您发现有趣的 Sound Match。",
      support: "获取 Snorz 的使用帮助、故障排查和联系渠道。",
      privacy: "了解 Snorz 如何处理设备端声音分析、iCloud Sync、Discover 和订阅数据。",
    },
  },
  {
    code: "zh-Hant",
    route: "zh-hant",
    label: "繁體中文",
    target: "zh-TW",
    hero: "記錄。<br>讀懂。<br><span class=\"gradient-word\">探索。</span>",
    privacyHeading: "臥室裡的聲音，預設不會成為公開內容。",
    titles: { home: "Snorz — 記錄、讀懂、探索", support: "Snorz 支援", privacy: "Snorz 隱私權政策" },
    descriptions: {
      home: "Snorz 私密識別疑似鼾聲，將每晚記錄轉化為清晰趨勢，並帶您探索有趣的 Sound Match。",
      support: "取得 Snorz 的使用協助、疑難排解與聯絡管道。",
      privacy: "瞭解 Snorz 如何處理裝置端聲音分析、iCloud Sync、Discover 與訂閱資料。",
    },
  },
  {
    code: "ja",
    route: "ja",
    label: "日本語",
    target: "ja",
    hero: "記録。<br>理解。<br><span class=\"gradient-word\">発見。</span>",
    privacyHeading: "寝室の音が、勝手に公開されることはありません。",
    titles: { home: "Snorz — 記録・理解・発見", support: "Snorz サポート", privacy: "Snorz プライバシーポリシー" },
    descriptions: {
      home: "Snorz はいびきの可能性がある音をプライベートに検出し、夜ごとの記録を分かりやすい傾向と楽しい Sound Match に変えます。",
      support: "Snorz の使い方、トラブルシューティング、お問い合わせ方法をご案内します。",
      privacy: "端末上の音声分析、iCloud Sync、Discover、サブスクリプションに関する Snorz のプライバシーポリシーです。",
    },
  },
  {
    code: "ko",
    route: "ko",
    label: "한국어",
    target: "ko",
    hero: "기록.<br>이해.<br><span class=\"gradient-word\">발견.</span>",
    privacyHeading: "침실의 소리는 기본적으로 공개되지 않습니다.",
    titles: { home: "Snorz — 기록하고, 이해하고, 발견하세요", support: "Snorz 지원", privacy: "Snorz 개인정보 처리방침" },
    descriptions: {
      home: "Snorz는 코골이 가능성이 있는 소리를 비공개로 감지하고, 매일 밤을 명확한 추세와 재미있는 Sound Match로 보여 줍니다.",
      support: "Snorz 사용법, 문제 해결 및 문의 방법을 확인하세요.",
      privacy: "기기 내 오디오 분석, iCloud Sync, Discover 및 구독에 관한 Snorz 개인정보 처리방침입니다.",
    },
  },
  {
    code: "de",
    route: "de",
    label: "Deutsch",
    target: "de",
    hero: "Aufnehmen.<br>Verstehen.<br><span class=\"gradient-word\">Entdecken.</span>",
    privacyHeading: "Was im Schlafzimmer passiert, bleibt standardmäßig privat.",
    titles: { home: "Snorz — Aufnehmen. Verstehen. Entdecken.", support: "Snorz Support", privacy: "Datenschutzerklärung — Snorz" },
    descriptions: {
      home: "Snorz erkennt mögliches Schnarchen privat, macht aus jeder Nacht klare Trends und lässt Sie besondere Sound Matches entdecken.",
      support: "Hilfe, Fehlerbehebung und Kontaktmöglichkeiten für Snorz.",
      privacy: "Datenschutzerklärung für Snorz zu Audioanalyse auf dem Gerät, iCloud Sync, Discover und Abonnements.",
    },
  },
  {
    code: "fr",
    route: "fr",
    label: "Français",
    target: "fr",
    hero: "Enregistrer.<br>Comprendre.<br><span class=\"gradient-word\">Découvrir.</span>",
    privacyHeading: "Dans votre chambre, rien n’est public par défaut.",
    titles: { home: "Snorz — Enregistrer. Comprendre. Découvrir.", support: "Assistance Snorz", privacy: "Politique de confidentialité — Snorz" },
    descriptions: {
      home: "Snorz détecte les ronflements probables en privé, transforme chaque nuit en tendances claires et vous fait découvrir des Sound Matches mémorables.",
      support: "Aide, dépannage et moyens de contacter l’assistance Snorz.",
      privacy: "Politique de confidentialité de Snorz concernant l’analyse audio sur l’appareil, iCloud Sync, Discover et les abonnements.",
    },
  },
];

const pages = [
  { name: "home", source: "index.html", segment: "" },
  { name: "support", source: "support/index.html", segment: "support" },
  { name: "privacy", source: "privacy/index.html", segment: "privacy" },
];

const protectedTerms = new Set(["Snorz", "Discover", "iCloud Sync", "Snorz Pro", "Apple", "GitHub", "RevenueCat"]);
const accessibility = {
  "zh-Hans": {
    "Main navigation": "主导航", "Snorz home": "Snorz 首页", "Choose language": "选择语言",
    "Snorz night report illustration": "Snorz 夜间报告插图", "Snore Load 48 out of 100": "Snore Load：100 分中的 48 分",
    "Illustrated Snorz night report": "Snorz 夜间报告示意图", "Decorative audio waveform": "装饰性音频波形",
    "Privacy highlights": "隐私保护重点", "Support topics": "支持主题", "Privacy Policy sections": "隐私政策章节",
  },
  "zh-Hant": {
    "Main navigation": "主導覽", "Snorz home": "Snorz 首頁", "Choose language": "選擇語言",
    "Snorz night report illustration": "Snorz 夜間報告插圖", "Snore Load 48 out of 100": "Snore Load：100 分中的 48 分",
    "Illustrated Snorz night report": "Snorz 夜間報告示意圖", "Decorative audio waveform": "裝飾性音訊波形",
    "Privacy highlights": "隱私保護重點", "Support topics": "支援主題", "Privacy Policy sections": "隱私權政策章節",
  },
  ja: {
    "Main navigation": "メインナビゲーション", "Snorz home": "Snorz ホーム", "Choose language": "言語を選択",
    "Snorz night report illustration": "Snorz ナイトレポートのイラスト", "Snore Load 48 out of 100": "Snore Load、100 点中 48 点",
    "Illustrated Snorz night report": "Snorz ナイトレポートの図", "Decorative audio waveform": "装飾的な音声波形",
    "Privacy highlights": "プライバシーのポイント", "Support topics": "サポート項目", "Privacy Policy sections": "プライバシーポリシーの項目",
  },
  ko: {
    "Main navigation": "주요 탐색", "Snorz home": "Snorz 홈", "Choose language": "언어 선택",
    "Snorz night report illustration": "Snorz 야간 리포트 그림", "Snore Load 48 out of 100": "Snore Load 100점 중 48점",
    "Illustrated Snorz night report": "Snorz 야간 리포트 도해", "Decorative audio waveform": "장식용 오디오 파형",
    "Privacy highlights": "개인정보 보호 핵심", "Support topics": "지원 항목", "Privacy Policy sections": "개인정보 처리방침 항목",
  },
  de: {
    "Main navigation": "Hauptnavigation", "Snorz home": "Snorz Startseite", "Choose language": "Sprache auswählen",
    "Snorz night report illustration": "Illustration des Snorz-Nachtberichts", "Snore Load 48 out of 100": "Snore Load 48 von 100",
    "Illustrated Snorz night report": "Illustrierter Snorz-Nachtbericht", "Decorative audio waveform": "Dekorative Audiowellenform",
    "Privacy highlights": "Datenschutz-Highlights", "Support topics": "Support-Themen", "Privacy Policy sections": "Abschnitte der Datenschutzerklärung",
  },
  fr: {
    "Main navigation": "Navigation principale", "Snorz home": "Accueil Snorz", "Choose language": "Choisir la langue",
    "Snorz night report illustration": "Illustration du rapport nocturne Snorz", "Snore Load 48 out of 100": "Snore Load : 48 sur 100",
    "Illustrated Snorz night report": "Rapport nocturne Snorz illustré", "Decorative audio waveform": "Forme d’onde audio décorative",
    "Privacy highlights": "Points clés de confidentialité", "Support topics": "Rubriques d’assistance", "Privacy Policy sections": "Sections de la politique de confidentialité",
  },
};
const curatedCopy = {
  "zh-Hans": {
    "Snorz turns likely snores into clear night reports, useful trends, and a playful place to hear memorable Sound Matches.": "Snorz 将疑似鼾声转化为清晰的夜间报告和实用趋势，还能让您发现令人印象深刻的 Sound Match。",
    "On-device analysis · Silence is never intentionally stored · You choose what to share": "设备端分析 · 静音内容不会被主动保存 · 分享什么由您决定",
    "A calmer way to make sense of the sounds at night.": "更从容地读懂夜间的声音。",
    "Record privately": "私密记录", "Understand the night": "读懂每晚", "Discover the fun": "发现趣味鼾声",
    "Your night, made understandable.": "让每晚变得清晰易懂。",
    "Email support@ajigu.com with the app version, iOS version, and a short description. Never attach private recordings, personal information, purchase receipts, or Apple Account details.": "请发送邮件至 support@ajigu.com，并注明 App 版本、iOS 版本和简要说明。请勿附上私人录音、个人信息、购买凭证或 Apple 账户详情。",
    "Email support": "发送邮件给支持团队",
    "If you email support@ajigu.com, Cloudflare routes the message, Google hosts the support inbox, and Resend may deliver replies. These providers handle the information privately under their own privacy terms. Do not include recordings, health information, purchase receipts, Apple Account details, or other sensitive personal information unless it is necessary to resolve your request.": "如果您向 support@ajigu.com 发送邮件，Cloudflare 会转发邮件，Google 托管支持收件箱，Resend 可能用于发送回复。这些服务提供商会依据各自的隐私条款私密处理信息。除非解决问题确有必要，否则请勿提供录音、健康信息、购买凭证、Apple 账户详情或其他敏感个人信息。",
    "GitHub processes website data under the": "GitHub 依据以下声明处理网站数据：",
    "Apple provides microphone, App Store, and CloudKit services; RevenueCat provides subscription entitlement infrastructure; GitHub hosts this website; Cloudflare, Google, and Resend handle support email.": "Apple 提供麦克风、App Store 和 CloudKit 服务；RevenueCat 提供订阅权益基础设施；GitHub 托管本网站；Cloudflare、Google 和 Resend 处理支持邮件。",
    "Support emails remain in the support inbox only as long as reasonably needed to respond, maintain safety, and meet legal obligations.": "支持邮件仅会在回复请求、维护安全和履行法律义务所合理需要的期间内保留在支持收件箱中。",
    "For general, privacy, safety, or security questions, email support@ajigu.com. Do not include sensitive information unless it is needed to resolve your request.": "如有一般问题、隐私、安全或信息安全相关问题，请发送邮件至 support@ajigu.com。除非解决问题确有必要，否则请勿提供敏感信息。",
  },
  "zh-Hant": {
    "Snorz turns likely snores into clear night reports, useful trends, and a playful place to hear memorable Sound Matches.": "Snorz 將疑似鼾聲轉化為清晰的夜間報告和實用趨勢，還能讓您探索令人印象深刻的 Sound Match。",
    "On-device analysis · Silence is never intentionally stored · You choose what to share": "裝置端分析 · 靜音內容不會被主動儲存 · 分享什麼由您決定",
    "A calmer way to make sense of the sounds at night.": "更從容地讀懂夜間的聲音。",
    "Record privately": "私密記錄", "Understand the night": "讀懂每晚", "Discover the fun": "探索趣味鼾聲",
    "Your night, made understandable.": "讓每晚變得清晰易懂。",
    "Email support@ajigu.com with the app version, iOS version, and a short description. Never attach private recordings, personal information, purchase receipts, or Apple Account details.": "請傳送電子郵件至 support@ajigu.com，並註明 App 版本、iOS 版本與簡短說明。請勿附上私人錄音、個人資訊、購買收據或 Apple 帳號詳細資料。",
    "Email support": "傳送電子郵件給支援團隊",
    "If you email support@ajigu.com, Cloudflare routes the message, Google hosts the support inbox, and Resend may deliver replies. These providers handle the information privately under their own privacy terms. Do not include recordings, health information, purchase receipts, Apple Account details, or other sensitive personal information unless it is necessary to resolve your request.": "如果您傳送電子郵件至 support@ajigu.com，Cloudflare 會轉送郵件，Google 代管支援收件匣，Resend 可能用於傳送回覆。這些服務供應商會依各自的隱私條款私密處理資訊。除非解決問題確有必要，否則請勿提供錄音、健康資訊、購買收據、Apple 帳號詳細資料或其他敏感個人資訊。",
    "GitHub processes website data under the": "GitHub 依據以下聲明處理網站資料：",
    "Apple provides microphone, App Store, and CloudKit services; RevenueCat provides subscription entitlement infrastructure; GitHub hosts this website; Cloudflare, Google, and Resend handle support email.": "Apple 提供麥克風、App Store 與 CloudKit 服務；RevenueCat 提供訂閱權益基礎架構；GitHub 代管本網站；Cloudflare、Google 與 Resend 處理支援郵件。",
    "Support emails remain in the support inbox only as long as reasonably needed to respond, maintain safety, and meet legal obligations.": "支援郵件只會在回覆請求、維護安全及履行法律義務所合理需要的期間內保留於支援收件匣。",
    "For general, privacy, safety, or security questions, email support@ajigu.com. Do not include sensitive information unless it is needed to resolve your request.": "如有一般、隱私、安全或資訊安全相關問題，請傳送電子郵件至 support@ajigu.com。除非解決問題確有必要，否則請勿提供敏感資訊。",
  },
  ja: {
    "Snorz turns likely snores into clear night reports, useful trends, and a playful place to hear memorable Sound Matches.": "Snorz は、いびきの可能性がある音を分かりやすいナイトレポートと役立つ傾向にまとめ、印象的な Sound Match を楽しく発見できる場所を提供します。",
    "On-device analysis · Silence is never intentionally stored · You choose what to share": "端末上で分析 · 無音は意図的に保存しません · 共有する内容は自分で選べます",
    "A calmer way to make sense of the sounds at night.": "夜の音を、もっと落ち着いて理解する方法。",
    "Record privately": "プライベートに記録", "Understand the night": "夜を理解", "Discover the fun": "楽しいいびきを発見",
    "Your night, made understandable.": "一晩の様子を、分かりやすく。",
    "Email support@ajigu.com with the app version, iOS version, and a short description. Never attach private recordings, personal information, purchase receipts, or Apple Account details.": "support@ajigu.com 宛てに、アプリのバージョン、iOS のバージョン、問題の簡単な説明を添えてメールしてください。非公開の録音、個人情報、購入レシート、Apple Account の詳細は添付しないでください。",
    "Email support": "サポートにメール",
    "If you email support@ajigu.com, Cloudflare routes the message, Google hosts the support inbox, and Resend may deliver replies. These providers handle the information privately under their own privacy terms. Do not include recordings, health information, purchase receipts, Apple Account details, or other sensitive personal information unless it is necessary to resolve your request.": "support@ajigu.com にメールを送信すると、Cloudflare がメッセージを転送し、Google がサポート受信箱をホストし、Resend が返信を配信する場合があります。これらのサービス提供者は、それぞれのプライバシー条件に基づいて情報を非公開で取り扱います。問題の解決に必要な場合を除き、録音、健康情報、購入レシート、Apple Account の詳細、その他の機密性の高い個人情報を含めないでください。",
    "GitHub processes website data under the": "GitHub はウェブサイトデータを次の規約に基づいて処理します：",
    "Apple provides microphone, App Store, and CloudKit services; RevenueCat provides subscription entitlement infrastructure; GitHub hosts this website; Cloudflare, Google, and Resend handle support email.": "Apple はマイク、App Store、CloudKit の各サービスを提供し、RevenueCat はサブスクリプション権限の基盤を提供し、GitHub は本ウェブサイトをホストし、Cloudflare、Google、Resend はサポートメールを処理します。",
    "Support emails remain in the support inbox only as long as reasonably needed to respond, maintain safety, and meet legal obligations.": "サポートメールは、返信、安全の維持、法的義務への対応に合理的に必要な期間のみ、サポート受信箱に保持されます。",
    "For general, privacy, safety, or security questions, email support@ajigu.com. Do not include sensitive information unless it is needed to resolve your request.": "一般的な質問、プライバシー、安全、セキュリティに関するお問い合わせは support@ajigu.com までメールしてください。問題の解決に必要な場合を除き、機密情報を含めないでください。",
  },
  ko: {
    "Snorz turns likely snores into clear night reports, useful trends, and a playful place to hear memorable Sound Matches.": "Snorz는 코골이 가능성이 있는 소리를 명확한 야간 리포트와 유용한 추세로 정리하고, 기억에 남는 Sound Match를 재미있게 발견할 수 있게 합니다.",
    "On-device analysis · Silence is never intentionally stored · You choose what to share": "기기 내 분석 · 무음은 의도적으로 저장하지 않음 · 공유할 내용은 직접 선택",
    "A calmer way to make sense of the sounds at night.": "밤의 소리를 더 편안하게 이해하는 방법.",
    "Record privately": "비공개로 기록", "Understand the night": "밤을 이해", "Discover the fun": "재미있는 코골이 발견",
    "Your night, made understandable.": "매일 밤을 이해하기 쉽게.",
    "Email support@ajigu.com with the app version, iOS version, and a short description. Never attach private recordings, personal information, purchase receipts, or Apple Account details.": "앱 버전, iOS 버전, 간단한 설명을 적어 support@ajigu.com으로 이메일을 보내 주세요. 비공개 녹음, 개인정보, 구매 영수증 또는 Apple Account 세부 정보는 첨부하지 마세요.",
    "Email support": "지원팀에 이메일 보내기",
    "If you email support@ajigu.com, Cloudflare routes the message, Google hosts the support inbox, and Resend may deliver replies. These providers handle the information privately under their own privacy terms. Do not include recordings, health information, purchase receipts, Apple Account details, or other sensitive personal information unless it is necessary to resolve your request.": "support@ajigu.com으로 이메일을 보내면 Cloudflare가 메시지를 전달하고 Google이 지원 받은편지함을 호스팅하며 Resend가 답장을 전송할 수 있습니다. 이러한 서비스 제공업체는 각자의 개인정보 보호 약관에 따라 정보를 비공개로 처리합니다. 요청 해결에 필요한 경우가 아니라면 녹음, 건강 정보, 구매 영수증, Apple Account 세부 정보 또는 기타 민감한 개인정보를 포함하지 마세요.",
    "GitHub processes website data under the": "GitHub는 웹사이트 데이터를 다음 정책에 따라 처리합니다:",
    "Apple provides microphone, App Store, and CloudKit services; RevenueCat provides subscription entitlement infrastructure; GitHub hosts this website; Cloudflare, Google, and Resend handle support email.": "Apple은 마이크, App Store 및 CloudKit 서비스를 제공하고 RevenueCat은 구독 권한 인프라를 제공하며 GitHub는 이 웹사이트를 호스팅하고 Cloudflare, Google 및 Resend는 지원 이메일을 처리합니다.",
    "Support emails remain in the support inbox only as long as reasonably needed to respond, maintain safety, and meet legal obligations.": "지원 이메일은 답변, 안전 유지 및 법적 의무 이행에 합리적으로 필요한 기간 동안만 지원 받은편지함에 보관됩니다.",
    "For general, privacy, safety, or security questions, email support@ajigu.com. Do not include sensitive information unless it is needed to resolve your request.": "일반 문의나 개인정보 보호, 안전 또는 보안 관련 질문은 support@ajigu.com으로 이메일을 보내 주세요. 요청 해결에 필요한 경우가 아니라면 민감한 정보를 포함하지 마세요.",
  },
  de: {
    "Snorz turns likely snores into clear night reports, useful trends, and a playful place to hear memorable Sound Matches.": "Snorz verwandelt mögliches Schnarchen in klare Nachtberichte und hilfreiche Trends – und lädt dazu ein, besondere Sound Matches zu entdecken.",
    "On-device analysis · Silence is never intentionally stored · You choose what to share": "Analyse auf dem Gerät · Stille wird nicht absichtlich gespeichert · Sie entscheiden, was Sie teilen",
    "A calmer way to make sense of the sounds at night.": "Die ruhigere Art, nächtliche Geräusche zu verstehen.",
    "Record privately": "Privat aufnehmen", "Understand the night": "Die Nacht verstehen", "Discover the fun": "Besondere Momente entdecken",
    "Your night, made understandable.": "Ihre Nacht, verständlich aufbereitet.",
    "Email support@ajigu.com with the app version, iOS version, and a short description. Never attach private recordings, personal information, purchase receipts, or Apple Account details.": "Senden Sie eine E-Mail mit App-Version, iOS-Version und einer kurzen Beschreibung an support@ajigu.com. Hängen Sie niemals private Aufnahmen, persönliche Informationen, Kaufbelege oder Apple Account-Daten an.",
    "Email support": "Support per E-Mail kontaktieren",
    "If you email support@ajigu.com, Cloudflare routes the message, Google hosts the support inbox, and Resend may deliver replies. These providers handle the information privately under their own privacy terms. Do not include recordings, health information, purchase receipts, Apple Account details, or other sensitive personal information unless it is necessary to resolve your request.": "Wenn Sie eine E-Mail an support@ajigu.com senden, leitet Cloudflare die Nachricht weiter, Google hostet das Support-Postfach und Resend kann Antworten zustellen. Diese Anbieter behandeln die Informationen gemäß ihren eigenen Datenschutzbestimmungen vertraulich. Fügen Sie keine Aufnahmen, Gesundheitsinformationen, Kaufbelege, Apple Account-Daten oder andere sensible persönliche Informationen bei, sofern dies nicht zur Bearbeitung Ihrer Anfrage erforderlich ist.",
    "GitHub processes website data under the": "GitHub verarbeitet Website-Daten gemäß der",
    "Apple provides microphone, App Store, and CloudKit services; RevenueCat provides subscription entitlement infrastructure; GitHub hosts this website; Cloudflare, Google, and Resend handle support email.": "Apple stellt Mikrofon-, App Store- und CloudKit-Dienste bereit; RevenueCat bietet die Infrastruktur für Abonnementberechtigungen; GitHub hostet diese Website; Cloudflare, Google und Resend verarbeiten Support-E-Mails.",
    "Support emails remain in the support inbox only as long as reasonably needed to respond, maintain safety, and meet legal obligations.": "Support-E-Mails bleiben nur so lange im Support-Postfach, wie dies für die Beantwortung, die Sicherheit und die Erfüllung gesetzlicher Pflichten angemessen erforderlich ist.",
    "For general, privacy, safety, or security questions, email support@ajigu.com. Do not include sensitive information unless it is needed to resolve your request.": "Bei allgemeinen Fragen sowie Fragen zu Datenschutz, Sicherheit oder Informationssicherheit senden Sie eine E-Mail an support@ajigu.com. Fügen Sie sensible Informationen nur bei, wenn sie zur Bearbeitung Ihrer Anfrage erforderlich sind.",
  },
  fr: {
    "Snorz turns likely snores into clear night reports, useful trends, and a playful place to hear memorable Sound Matches.": "Snorz transforme les ronflements probables en rapports nocturnes clairs et en tendances utiles, tout en vous faisant découvrir des Sound Matches mémorables.",
    "On-device analysis · Silence is never intentionally stored · You choose what to share": "Analyse sur l’appareil · Le silence n’est jamais enregistré volontairement · Vous choisissez ce que vous partagez",
    "A calmer way to make sense of the sounds at night.": "Une façon plus sereine de comprendre les sons de la nuit.",
    "Record privately": "Enregistrer en privé", "Understand the night": "Comprendre la nuit", "Discover the fun": "Découvrir le côté amusant",
    "Your night, made understandable.": "Votre nuit, enfin facile à comprendre.",
    "Email support@ajigu.com with the app version, iOS version, and a short description. Never attach private recordings, personal information, purchase receipts, or Apple Account details.": "Envoyez un e-mail à support@ajigu.com en indiquant la version de l’app, la version d’iOS et une brève description. Ne joignez jamais d’enregistrements privés, d’informations personnelles, de reçus d’achat ou de données Apple Account.",
    "Email support": "Contacter l’assistance par e-mail",
    "If you email support@ajigu.com, Cloudflare routes the message, Google hosts the support inbox, and Resend may deliver replies. These providers handle the information privately under their own privacy terms. Do not include recordings, health information, purchase receipts, Apple Account details, or other sensitive personal information unless it is necessary to resolve your request.": "Si vous envoyez un e-mail à support@ajigu.com, Cloudflare achemine le message, Google héberge la boîte de réception d’assistance et Resend peut distribuer les réponses. Ces fournisseurs traitent les informations de manière confidentielle selon leurs propres conditions de confidentialité. N’incluez pas d’enregistrements, d’informations de santé, de reçus d’achat, de données Apple Account ni d’autres informations personnelles sensibles, sauf si cela est nécessaire pour résoudre votre demande.",
    "GitHub processes website data under the": "GitHub traite les données du site conformément à la",
    "Apple provides microphone, App Store, and CloudKit services; RevenueCat provides subscription entitlement infrastructure; GitHub hosts this website; Cloudflare, Google, and Resend handle support email.": "Apple fournit les services de microphone, d’App Store et de CloudKit ; RevenueCat fournit l’infrastructure des droits d’abonnement ; GitHub héberge ce site ; Cloudflare, Google et Resend traitent les e-mails d’assistance.",
    "Support emails remain in the support inbox only as long as reasonably needed to respond, maintain safety, and meet legal obligations.": "Les e-mails d’assistance restent dans la boîte de réception uniquement pendant la durée raisonnablement nécessaire pour répondre, assurer la sécurité et respecter les obligations légales.",
    "For general, privacy, safety, or security questions, email support@ajigu.com. Do not include sensitive information unless it is needed to resolve your request.": "Pour toute question générale, de confidentialité, de sûreté ou de sécurité, écrivez à support@ajigu.com. N’incluez des informations sensibles que si elles sont nécessaires pour résoudre votre demande.",
  },
};

const terminology = {
  "zh-Hans": [["鼾声负荷", "Snore Load"], ["打鼾负荷", "Snore Load"], ["声音匹配", "Sound Match"]],
  "zh-Hant": [["鼾聲負荷", "Snore Load"], ["打鼾負荷", "Snore Load"], ["聲音匹配", "Sound Match"]],
  ja: [["いびき負荷", "Snore Load"], ["サウンドマッチ", "Sound Match"]],
  ko: [["코골이 부하", "Snore Load"], ["사운드 매치", "Sound Match"]],
  de: [["Schnarchlast", "Snore Load"], ["Klangübereinstimmungen", "Sound Matches"]],
  fr: [["charge de ronflements", "Snore Load"], ["charge de ronflement", "Snore Load"], ["Charge de ronflement", "Snore Load"], ["Sound Matchs", "Sound Matches"]],
};

const sleep = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

async function translateFragment(fragment, target, attempt = 1) {
  await sleep(250);
  const response = await fetch("https://translate.googleapis.com/translate_a/single", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded;charset=UTF-8" },
    body: new URLSearchParams({ client: "gtx", sl: "en", tl: target, dt: "t", q: fragment }),
  });

  if (!response.ok) {
    if (attempt < 4 && (response.status === 429 || response.status >= 500)) {
      await sleep(1500 * (2 ** (attempt - 1)));
      return translateFragment(fragment, target, attempt + 1);
    }
    throw new Error(`Translation failed with HTTP ${response.status}`);
  }

  const payload = await response.json();
  return payload[0].map((part) => part[0]).join("");
}

async function translateHtml(html, target) {
  const tokens = html.split(/(<[^>]+>)/g);
  const entries = [];

  tokens.forEach((token, tokenIndex) => {
    if (token.startsWith("<") || !/[A-Za-z]/.test(token)) return;
    const leading = token.match(/^\s*/)?.[0] || "";
    const trailing = token.match(/\s*$/)?.[0] || "";
    const text = token.slice(leading.length, token.length - trailing.length);
    if (!text || protectedTerms.has(text)) return;
    entries.push({ id: entries.length, tokenIndex, leading, trailing, text });
  });

  const batches = [];
  let current = [];
  let length = 11;
  for (const entry of entries) {
    const size = entry.text.length + 45;
    if (current.length && length + size > 3200) {
      batches.push(current);
      current = [];
      length = 11;
    }
    current.push(entry);
    length += size;
  }
  if (current.length) batches.push(current);

  for (const batch of batches) {
    const fragment = `<main>${batch.map((entry) => `<p data-snorz-i="${entry.id}">${entry.text}</p>`).join("")}</main>`;
    const result = await translateFragment(fragment, target);
    const translated = new Map();
    for (const match of result.matchAll(/<p[^>]*data-snorz-i\s*=\s*["']?(\d+)["']?[^>]*>([\s\S]*?)<\/p>/g)) {
      translated.set(Number(match[1]), match[2]);
    }
    if (translated.size !== batch.length) {
      const missing = batch.filter((entry) => !translated.has(entry.id)).map((entry) => `${entry.id}:${entry.text}`);
      throw new Error(`Translation response lost text nodes for ${target}: expected ${batch.length}, received ${translated.size}; missing ${missing.join(" | ")}`);
    }
    for (const entry of batch) {
      tokens[entry.tokenIndex] = `${entry.leading}${translated.get(entry.id)}${entry.trailing}`;
    }
  }

  return tokens.join("");
}

function normalizePaths(body, page) {
  const replacements = page.name === "home"
    ? [["./assets/", "/assets/"], ["./styles.css", "/styles.css"], ["./support/", "/support/"], ["./privacy/", "/privacy/"], ['href="./"', 'href="/"']]
    : page.name === "support"
      ? [["../assets/", "/assets/"], ["../styles.css", "/styles.css"], ["../privacy/", "/privacy/"], ['href="../"', 'href="/"'], ['href="./"', 'href="/support/"']]
      : [["../assets/", "/assets/"], ["../styles.css", "/styles.css"], ["../support/", "/support/"], ['href="../"', 'href="/"'], ['href="./"', 'href="/privacy/"']];

  return replacements.reduce((value, [from, to]) => value.replaceAll(from, to), body);
}

function localizedUrl(locale, segment) {
  const parts = [locale.route, segment].filter(Boolean);
  return `${origin}/${parts.join("/")}${parts.length ? "/" : ""}`;
}

function localizeLinks(body, locale) {
  if (!locale.route) return body;
  return body
    .replaceAll('href="/support/"', `href="/${locale.route}/support/"`)
    .replaceAll('href="/privacy/"', `href="/${locale.route}/privacy/"`)
    .replaceAll('href="/"', `href="/${locale.route}/"`);
}

function languageMenu(locale, page) {
  const links = locales.map((option) => {
    const url = new URL(localizedUrl(option, page.segment)).pathname;
    const current = option.code === locale.code ? ' aria-current="page"' : "";
    return `          <a data-language="${option.code}" href="${url}" lang="${option.code}"${current}>${option.label}</a>`;
  }).join("\n");

  return `
      <details class="language-switcher">
        <summary aria-label="Choose language"><span aria-hidden="true">◎</span> ${locale.label}</summary>
        <div class="language-menu">
${links}
        </div>
      </details>`;
}

function alternateLinks(page) {
  const links = locales.map((locale) => `  <link rel="alternate" hreflang="${locale.code}" href="${localizedUrl(locale, page.segment)}">`);
  links.push(`  <link rel="alternate" hreflang="x-default" href="${localizedUrl(locales[0], page.segment)}">`);
  return links.join("\n");
}

function cleanBody(body) {
  return body
    .replace(/\s*<details class="language-switcher"[\s\S]*?<\/details>/, "")
    .replace(/\s*<script src="\/language\.js" defer><\/script>/, "");
}

function translationSeed(html) {
  const headEnd = html.indexOf("</head>");
  const body = cleanBody(headEnd >= 0 ? html.slice(headEnd + 7) : html);
  return body
    .split(/(<[^>]+>)/g)
    .filter((token) => !token.startsWith("<") && token.trim())
    .map((token) => token.trim());
}

function applyTranslationSeed(html, seed, locale, page) {
  const tokens = html.split(/(<[^>]+>)/g);
  const textIndexes = tokens
    .map((token, index) => (!token.startsWith("<") && token.trim() ? index : -1))
    .filter((index) => index >= 0);

  if (textIndexes.length !== seed.length) {
    throw new Error(`Translation seed mismatch for ${locale.code}/${page.name}: expected ${textIndexes.length}, received ${seed.length}`);
  }

  textIndexes.forEach((tokenIndex, seedIndex) => {
    const token = tokens[tokenIndex];
    const leading = token.match(/^\s*/)?.[0] || "";
    const trailing = token.match(/\s*$/)?.[0] || "";
    const sourceText = token.trim();
    const translated = curatedCopy[locale.code]?.[sourceText] || (protectedTerms.has(sourceText) ? sourceText : seed[seedIndex]);
    tokens[tokenIndex] = `${leading}${translated}${trailing}`;
  });
  return tokens.join("");
}

function buildHead(sourceHead, locale, page) {
  let head = sourceHead
    .replace(/\s*<link rel="canonical"[^>]*>/g, "")
    .replace(/\s*<link rel="alternate"[^>]*>/g, "")
    .replace(/\s*<meta property="og:[^"]+"[^>]*>/g, "")
    .replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${locale.descriptions[page.name]}">`)
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${locale.titles[page.name]}</title>`)
    .replace(/<link rel="icon" href="[^"]+">/, '<link rel="icon" href="/assets/app-icon.png">')
    .replace(/<link rel="stylesheet" href="[^"]+">/, '<link rel="stylesheet" href="/styles.css">');

  const descriptionTag = `<meta name="description" content="${locale.descriptions[page.name]}">`;
  const social = `${descriptionTag}\n  <meta property="og:title" content="${locale.titles[page.name]}">\n  <meta property="og:description" content="${locale.descriptions[page.name]}">\n  <meta property="og:image" content="${origin}/assets/app-icon.png">\n  <meta property="og:type" content="website">\n  <meta property="og:url" content="${localizedUrl(locale, page.segment)}">\n  <meta property="og:locale" content="${locale.code.replace("-", "_")}">`;
  head = head.replace(descriptionTag, social);

  return head.replace("</head>", `  <link rel="canonical" href="${localizedUrl(locale, page.segment)}">\n${alternateLinks(page)}\n</head>`);
}

function applyCuratedCopy(body, locale, page) {
  if (page.name === "home" && locale.hero) {
    body = body.replace(/<h1>[\s\S]*?<\/h1>/, `<h1>${locale.hero}</h1>`);
  }
  if (page.name === "home" && locale.privacyHeading) {
    body = body.replace(/(<section class="privacy-band[\s\S]*?<h2>)[\s\S]*?(<\/h2>)/, `$1${locale.privacyHeading}$2`);
  }
  return body;
}

function localizeAccessibility(body, locale) {
  for (const [source, translated] of Object.entries(accessibility[locale.code] || {})) {
    body = body
      .replaceAll(`aria-label="${source}"`, `aria-label="${translated}"`)
      .replaceAll(`alt="${source}"`, `alt="${translated}"`);
  }
  return body;
}

function normalizeTerminology(body, locale) {
  for (const [source, replacement] of terminology[locale.code] || []) {
    body = body.replaceAll(source, replacement);
  }
  return body
    .replace(/([\p{L}\p{N}])(Snore Load|Sound Matches|Sound Match)/gu, "$1 $2")
    .replace(/(Snore Load|Sound Matches|Sound Match)([\p{L}\p{N}])/gu, "$1 $2");
}

function outputPath(locale, page) {
  if (!locale.route) return path.join(root, page.source);
  return path.join(root, locale.route, page.segment, "index.html");
}

async function render(source, locale, page, seed) {
  const sourceHead = source.match(/<head>[\s\S]*?<\/head>/)?.[0];
  const sourceBody = source.match(/<body>[\s\S]*?<\/body>/)?.[0];
  if (!sourceHead || !sourceBody) throw new Error(`Invalid HTML source: ${page.source}`);

  let body = normalizePaths(cleanBody(sourceBody), page);
  if (locale.target) body = seed ? applyTranslationSeed(body, seed, locale, page) : await translateHtml(body, locale.target);
  body = applyCuratedCopy(body, locale, page);
  body = localizeLinks(body, locale);
  body = body.replace(/\s*<\/nav>/, `${languageMenu(locale, page)}\n    </nav>`);
  body = localizeAccessibility(body, locale);
  body = normalizeTerminology(body, locale);
  body = body.replace("</body>", "  <script src=\"/language.js\" defer></script>\n</body>");

  const html = `<!doctype html>\n<html lang="${locale.code}" data-locale="${locale.code}">\n${buildHead(sourceHead, locale, page)}\n${body}\n</html>\n`;
  const destination = outputPath(locale, page);
  await mkdir(path.dirname(destination), { recursive: true });
  await writeFile(destination, html);
  return path.relative(root, destination);
}

async function runPool(tasks, concurrency = 3) {
  const results = [];
  let cursor = 0;

  async function worker() {
    while (cursor < tasks.length) {
      const index = cursor++;
      results[index] = await tasks[index]();
    }
  }

  await Promise.all(Array.from({ length: concurrency }, worker));
  return results;
}

function sitemap() {
  const urls = pages.flatMap((page) => locales.map((locale) => {
    const alternates = locales.map((option) => `    <xhtml:link rel="alternate" hreflang="${option.code}" href="${localizedUrl(option, page.segment)}" />`).join("\n");
    return `  <url>\n    <loc>${localizedUrl(locale, page.segment)}</loc>\n${alternates}\n    <xhtml:link rel="alternate" hreflang="x-default" href="${localizedUrl(locales[0], page.segment)}" />\n  </url>`;
  }));
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join("\n")}\n</urlset>\n`;
}

const sources = Object.fromEntries(await Promise.all(pages.map(async (page) => [page.name, await readFile(path.join(root, page.source), "utf8")])));
const seeds = {};
for (const locale of locales.filter((item) => item.target)) {
  seeds[locale.code] = {};
  for (const page of pages) {
    try {
      seeds[locale.code][page.name] = translationSeed(await readFile(outputPath(locale, page), "utf8"));
    } catch {
      seeds[locale.code][page.name] = null;
    }
  }
}
const tasks = locales.flatMap((locale) => pages.map((page) => () => render(sources[page.name], locale, page, seeds[locale.code]?.[page.name])));
const generated = await runPool(tasks, 3);
await writeFile(path.join(root, "sitemap.xml"), sitemap());
console.log(`Generated ${generated.length} localized pages.`);
