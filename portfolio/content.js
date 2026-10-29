/*
 * VERO+ — all site texts and data.
 * Edit this file to change copy, links or add a new work.
 * Video:  videos/<id>.mp4   Poster: posters/<id>.jpg
 */
window.SITE_CONTENT = {
  languages: ['it', 'en', 'ru'],
  defaultLang: 'en',

  // Contact links — placeholders, replace with real ones.
  links: {
    telegram: 'https://t.me/your_username',
    whatsapp: 'https://wa.me/390000000000',
    email: 'mailto:hello@example.com',
    tiktok: 'https://www.tiktok.com/@vero.tur',
    facebook: 'https://www.facebook.com/your.page',
  },

  ui: {
    ru: {
      meta: {
        title: 'VERO+ — Вероника, AI-видеокреатор из Милана',
        description: 'Короткие рекламные ролики и мультяшные истории, созданные с ИИ. Милан.',
      },
      nav: { works: 'Работы', process: 'Процесс', contacts: 'Контакты', menu: 'Меню', lang: 'Язык' },
      hero: {
        kicker: 'AI-видеокреатор · Милан',
        name: 'Вероника',
        tagline: 'Рекламу снимает ИИ. Историю и характер придумываю я.',
        showreel: 'Смотреть шоурил',
        about: 'Обо мне',
        pause: 'Остановить фоновое видео',
        play: 'Включить фоновое видео',
      },
      about: {
        title: 'Обо мне',
        text: [
          'Я Вероника, для интернета — vero.tur. Живу в Милане и делаю видео, которые продают: рекламные ролики и визуальные истории для брендов в Reels, Shorts и TikTok. Беру на себя всё, от идеи и сценария до готового ролика. Без съёмочной группы, аренды локаций и недель ожидания.',
          'Нейросети рисуют картинку, а я отвечаю за то, чтобы ваш продукт запомнили: ролик досмотрели до конца, пересмотрели и захотели купить.',
          'Всегда в курсе новинок искусственного интеллекта и социальных сетей.',
        ],
        cta: 'Обсудить проект',
        facts: ['Милан', 'IT · EN · RU', 'Reels · Shorts · TikTok'],
      },
      works: { title: 'Работы', soon: 'Скоро', soonText: 'Ролик уже в монтаже. Загляните чуть позже.', prev: 'Назад', next: 'Вперёд', open: 'Открыть работу' },
      modal: { task: 'Задача', done: 'Что сделано', tools: 'Инструменты', close: 'Закрыть', showreel: 'Шоурил' },
      process: { title: 'Процесс', subtitle: 'Семь эпизодов — от идеи до ролика, который досматривают.' },
      tools: { title: 'Инструменты, которые я использую', subtitle: 'Нейросети меняются каждый месяц. Вкус — нет.' },
      audience: { title: 'Для кого я работаю' },
      contacts: { title: 'Контакты', subtitle: 'Расскажите, что продаём, — а персонажа я придумаю сама.' },
      footer: 'Сделано человеком. С небольшой помощью ИИ.',
    },
    it: {
      meta: {
        title: 'VERO+ — Veronica, AI video creator a Milano',
        description: 'Spot brevi e storie animate creati con l’IA. Milano.',
      },
      nav: { works: 'Lavori', process: 'Processo', contacts: 'Contatti', menu: 'Menu', lang: 'Lingua' },
      hero: {
        kicker: 'AI video creator · Milano',
        name: 'Veronica',
        tagline: 'Gli spot li gira l’IA. Storia e carattere li invento io.',
        showreel: 'Guarda lo showreel',
        about: 'Chi sono',
        pause: 'Metti in pausa il video di sfondo',
        play: 'Riproduci il video di sfondo',
      },
      about: {
        title: 'Chi sono',
        text: [
          'Sono Veronica, online vero.tur. Vivo a Milano e creo video che vendono: spot pubblicitari e storie visive per brand su Reels, Shorts e TikTok. Mi occupo di tutto, dall’idea e la sceneggiatura fino al video finito. Senza troupe, affitto di location o settimane di attesa.',
          'L’IA disegna l’immagine, io faccio in modo che il vostro prodotto resti in testa: che il video venga guardato fino alla fine, rivisto e che faccia venire voglia di comprare.',
          'Sempre aggiornata sulle novità dell’intelligenza artificiale e dei social media.',
        ],
        cta: 'Parliamo del tuo progetto',
        facts: ['Milano', 'IT · EN · RU', 'Reels · Shorts · TikTok'],
      },
      works: { title: 'Lavori', soon: 'Presto', soonText: 'Il video è in montaggio. Torna tra poco.', prev: 'Indietro', next: 'Avanti', open: 'Apri il lavoro' },
      modal: { task: 'Obiettivo', done: 'Cosa ho fatto', tools: 'Strumenti', close: 'Chiudi', showreel: 'Showreel' },
      process: { title: 'Processo', subtitle: 'Sette episodi, dall’idea a uno spot che si guarda fino alla fine.' },
      tools: { title: 'Strumenti che uso', subtitle: 'Le reti neurali cambiano ogni mese. Il gusto no.' },
      audience: { title: 'Per chi lavoro' },
      contacts: { title: 'Contatti', subtitle: 'Dimmi cosa vendiamo: al personaggio ci penso io.' },
      footer: 'Fatto da un essere umano. Con un piccolo aiuto dall’IA.',
    },
    en: {
      meta: {
        title: 'VERO+ — Veronica, AI video creator in Milan',
        description: 'Short ads and animated stories made with AI. Milan.',
      },
      nav: { works: 'Work', process: 'Process', contacts: 'Contact', menu: 'Menu', lang: 'Language' },
      hero: {
        kicker: 'AI video creator · Milan',
        name: 'Veronica',
        tagline: 'AI shoots the ads. I write the story and the soul.',
        showreel: 'Watch showreel',
        about: 'About me',
        pause: 'Pause background video',
        play: 'Play background video',
      },
      about: {
        title: 'About me',
        text: [
          'I’m Veronica, online vero.tur. I live in Milan and make videos that sell: ads and visual stories for brands on Reels, Shorts and TikTok. I handle everything, from the idea and script to the finished video. No film crew, no location rentals, no weeks of waiting.',
          'AI draws the picture. I make sure your product sticks: people watch to the end, watch again and want to buy.',
          'Always up to date with the latest in artificial intelligence and social media.',
        ],
        cta: 'Let’s talk about your project',
        facts: ['Milan', 'IT · EN · RU', 'Reels · Shorts · TikTok'],
      },
      works: { title: 'Work', soon: 'Soon', soonText: 'This one is still in the edit. Check back soon.', prev: 'Previous', next: 'Next', open: 'Open work' },
      modal: { task: 'The brief', done: 'What I did', tools: 'Tools', close: 'Close', showreel: 'Showreel' },
      process: { title: 'Process', subtitle: 'Seven episodes, from an idea to an ad people actually finish.' },
      tools: { title: 'Tools I use', subtitle: 'The models change every month. Taste doesn’t.' },
      audience: { title: 'Who I work with' },
      contacts: { title: 'Contact', subtitle: 'Tell me what we’re selling. I’ll invent the character.' },
      footer: 'Made by a human. With a little help from AI.',
    },
  },

  categories: [
    { id: 'brands', title: { ru: 'Реклама брендов', it: 'Spot per brand', en: 'Brand ads' } },
    { id: 'animation', title: { ru: 'Анимация и персонажи', it: 'Animazione e personaggi', en: 'Animation & characters' } },
    { id: 'experiments', title: { ru: 'Эксперименты', it: 'Esperimenti', en: 'Experiments' } },
  ],

  // Works. Descriptions (task / done) are placeholders — replace them.
  works: [
    {
      id: 'nu-coat',
      category: 'brands',
      brand: 'NU',
      title: { ru: 'Пальто NU', it: 'Cappotto NU', en: 'NU coat' },
      task: { ru: 'Описание задачи скоро появится.', it: 'La descrizione dell’obiettivo arriverà presto.', en: 'Brief description coming soon.' },
      done: { ru: 'Здесь будет рассказ о том, что сделано.', it: 'Qui racconterò cosa ho fatto.', en: 'The making-of story goes here.' },
      tools: ['Seedance', 'GPT Image', 'CapCut'],
    },
    {
      id: 'hair-dye',
      category: 'brands',
      brand: 'Hair color',
      title: { ru: 'Краска для волос', it: 'Tinta per capelli', en: 'Hair dye' },
      task: { ru: 'Описание задачи скоро появится.', it: 'La descrizione dell’obiettivo arriverà presto.', en: 'Brief description coming soon.' },
      done: { ru: 'Здесь будет рассказ о том, что сделано.', it: 'Qui racconterò cosa ho fatto.', en: 'The making-of story goes here.' },
      tools: ['Veo', 'Seedream', 'CapCut'],
    },
    {
      id: 'candles',
      category: 'brands',
      brand: 'Ritual Candles',
      title: { ru: 'Ritual Candles', it: 'Ritual Candles', en: 'Ritual Candles' },
      task: {
        ru: 'Рекламный ролик для ритуальных свечей ручной работы: передать атмосферу таинства и показать, что каждая свеча сделана вручную.',
        it: 'Spot per candele rituali fatte a mano: trasmettere un’atmosfera di mistero e mostrare che ogni candela è fatta a mano.',
        en: 'An ad for handmade ritual candles: capture a sense of mystery and show that every candle is made by hand.',
      },
      done: {
        ru: 'Показала весь путь свечи: травы, воск, форма, первое пламя и упаковка. Тёплый свет, крупные планы рук и закадровый голос делают ролик похожим на старинный обряд.',
        it: 'Ho mostrato tutto il percorso della candela: erbe, cera, stampo, la prima fiamma e la confezione. Luce calda, primi piani delle mani e voce fuori campo lo fanno sembrare un antico rituale.',
        en: 'I showed the candle’s whole journey: herbs, wax, mould, the first flame and the packaging. Warm light, close-ups of hands and a voiceover make it feel like an old ritual.',
      },
      tools: ['Seedance', 'Grok Image', 'MiniMax', 'CapCut'],
    },
    {
      id: 'latte',
      category: 'brands',
      brand: 'Café',
      title: { ru: 'Кофейня и латте', it: 'Caffetteria e latte', en: 'Café & latte' },
      task: { ru: 'Описание задачи скоро появится.', it: 'La descrizione dell’obiettivo arriverà presto.', en: 'Brief description coming soon.' },
      done: { ru: 'Здесь будет рассказ о том, что сделано.', it: 'Qui racconterò cosa ho fatto.', en: 'The making-of story goes here.' },
      tools: ['Veo', 'GPT Image', 'CapCut'],
    },
    {
      id: 'aventon',
      category: 'brands',
      brand: 'Aventon',
      title: { ru: 'Электровелосипеды Aventon', it: 'E-bike Aventon', en: 'Aventon e-bikes' },
      task: { ru: 'Описание задачи скоро появится.', it: 'La descrizione dell’obiettivo arriverà presto.', en: 'Brief description coming soon.' },
      done: { ru: 'Здесь будет рассказ о том, что сделано.', it: 'Qui racconterò cosa ho fatto.', en: 'The making-of story goes here.' },
      tools: ['Seedance', 'Seedream', 'Suno', 'CapCut'],
    },
    {
      id: 'pan-ladus',
      category: 'brands',
      brand: 'Pan Ladus',
      title: { ru: 'Pan Ladus', it: 'Pan Ladus', en: 'Pan Ladus' },
      task: { ru: 'Описание задачи скоро появится.', it: 'La descrizione dell’obiettivo arriverà presto.', en: 'Brief description coming soon.' },
      done: { ru: 'Здесь будет рассказ о том, что сделано.', it: 'Qui racconterò cosa ho fatto.', en: 'The making-of story goes here.' },
      tools: ['Veo', 'GPT Image', 'CapCut'],
    },
    {
      id: 'bruler-damour',
      category: 'brands',
      brand: 'Brûler d’Amour',
      title: { ru: 'Brûler d’Amour', it: 'Brûler d’Amour', en: 'Brûler d’Amour' },
      task: {
        ru: 'Имиджевый ролик для бренда одежды: показать новую зимнюю коллекцию через живую историю, а не через каталог.',
        it: 'Video d’immagine per un brand di abbigliamento: mostrare la nuova collezione invernale con una storia vera, non con un catalogo.',
        en: 'Brand film for a clothing label: show the new winter collection through a story, not a catalogue.',
      },
      done: {
        ru: 'Придумала историю любви: сообщение «Brûler?», выход из дома с пуделем, встреча с парнем, снежные горы и подарок-брелок. Одежда клиента узнаётся в каждом кадре, а ритм идёт волнами: медленно, резко, снова медленно.',
        it: 'Ho inventato una storia d’amore: il messaggio «Brûler?», l’uscita con il barboncino, l’incontro con lui, la montagna innevata e il portachiavi in regalo. I capi del cliente si riconoscono in ogni inquadratura e il ritmo va a ondate: lento, brusco, di nuovo lento.',
        en: 'I wrote a love story: a “Brûler?” text, heading out with the poodle, meeting him, snowy mountains and a keychain gift. The client’s pieces are recognisable in every shot, and the pacing comes in waves: slow, sudden, slow again.',
      },
      tools: ['GPT Image', 'Seedance', 'CapCut'],
    },
    {
      id: 'unbeatable',
      category: 'animation',
      brand: 'UNBEATABLE GIRLS',
      title: { ru: 'UNBEATABLE GIRLS', it: 'UNBEATABLE GIRLS', en: 'UNBEATABLE GIRLS' },
      task: { ru: 'Описание задачи скоро появится.', it: 'La descrizione dell’obiettivo arriverà presto.', en: 'Brief description coming soon.' },
      done: { ru: 'Здесь будет рассказ о том, что сделано.', it: 'Qui racconterò cosa ho fatto.', en: 'The making-of story goes here.' },
      tools: ['GPT Image', 'Seedance', 'Hedra', 'MiniMax', 'Suno', 'CapCut'],
    },
  ],

  process: [
    {
      title: { ru: 'Идея', it: 'Idea', en: 'Idea' },
      text: {
        ru: 'Хук: останавливаю палец в первые 2 секунды.\nДействие: продукт показывает себя в деле.\nПризыв к покупке: такой, мимо которого не пройти.',
        it: 'Hook: fermo il pollice nei primi 2 secondi.\nAzione: il prodotto si mostra all’opera.\nCall to action: un invito all’acquisto difficile da ignorare.',
        en: 'Hook: stop the thumb in the first 2 seconds.\nAction: show the product at work.\nCall to action: a reason to buy that’s hard to ignore.',
      },
    },
    {
      title: { ru: 'Сценарий', it: 'Sceneggiatura', en: 'Script' },
      text: {
        ru: 'История на 15–30 секунд. Коротко, но с поворотом.',
        it: 'Una storia da 15–30 secondi. Breve, ma con un colpo di scena.',
        en: 'A 15–30 second story. Short, but with a twist.',
      },
    },
    {
      title: { ru: 'Персонажи', it: 'Personaggi', en: 'Characters' },
      text: {
        ru: 'Герои с характером — и с одним и тем же лицом в каждом кадре.',
        it: 'Personaggi con carattere — e con la stessa faccia in ogni inquadratura.',
        en: 'Characters with attitude — and the same face in every single shot.',
      },
    },
    {
      title: { ru: 'Раскадровка', it: 'Storyboard', en: 'Storyboard' },
      text: {
        ru: 'Расписываю ролик по секундам, чтобы ИИ не импровизировал там, где не просили.',
        it: 'Divido lo spot secondo per secondo, così l’IA non improvvisa dove non deve.',
        en: 'Second by second, so the AI doesn’t improvise where nobody asked.',
      },
    },
    {
      title: { ru: 'Генерация видео', it: 'Generazione video', en: 'Video generation' },
      text: {
        ru: 'Здесь картинки начинают двигаться. Ставлю каждый кадр как на съёмочной площадке, только без кейтеринга. И слежу, чтобы герой к концу сцены остался собой.',
        it: 'Qui le immagini iniziano a muoversi. Dirigo ogni inquadratura come su un vero set, solo senza catering. E controllo che il protagonista resti se stesso fino alla fine della scena.',
        en: 'This is where images start to move. I stage every shot like on a real film set, just without the catering. And I make sure the hero is still the same person by the end of the scene.',
      },
    },
    {
      title: { ru: 'Озвучка и lip sync', it: 'Voce e lip sync', en: 'Voice & lip sync' },
      text: {
        ru: 'Даю героям голос и учу их попадать губами в слова.',
        it: 'Do una voce ai personaggi e insegno alle loro labbra a stare al passo.',
        en: 'I give characters a voice and teach their lips to keep up.',
      },
    },
    {
      title: { ru: 'Монтаж', it: 'Montaggio', en: 'Edit' },
      text: {
        ru: 'Ритм, музыка, субтитры. Здесь ролик наконец начинает дышать.',
        it: 'Ritmo, musica, sottotitoli. È qui che lo spot finalmente respira.',
        en: 'Rhythm, music, captions. This is where it finally breathes.',
      },
    },
  ],

  tools: [
    { name: 'Seedance', role: { ru: 'видео', it: 'video', en: 'video' } },
    { name: 'Veo', role: { ru: 'видео', it: 'video', en: 'video' } },
    { name: 'GPT Image', role: { ru: 'изображения', it: 'immagini', en: 'images' } },
    { name: 'Grok Image', role: { ru: 'изображения', it: 'immagini', en: 'images' } },
    { name: 'Seedream', role: { ru: 'изображения', it: 'immagini', en: 'images' } },
    { name: 'Hedra', role: { ru: 'говорящие персонажи', it: 'personaggi parlanti', en: 'talking characters' } },
    { name: 'MiniMax', role: { ru: 'голос', it: 'voce', en: 'voice' } },
    { name: 'Suno', role: { ru: 'музыка', it: 'musica', en: 'music' } },
    { name: 'CapCut', role: { ru: 'монтаж', it: 'montaggio', en: 'edit' } },
  ],

  audience: [
    {
      title: { ru: 'Итальянские бренды', it: 'Brand italiani', en: 'Italian brands' },
      text: {
        ru: 'Мода, дизайн, кофе, косметика. Говорим с аудиторией на языке Reels — без съёмочной группы и недель ожидания.',
        it: 'Moda, design, caffè, beauty. Parliamo la lingua dei Reels — senza troupe e senza settimane di attesa.',
        en: 'Fashion, design, coffee, beauty. Fluent in Reels — without a film crew or weeks of waiting.',
      },
    },
    {
      title: { ru: 'Стартапы', it: 'Startup', en: 'Startups' },
      text: {
        ru: 'Продукт уже есть, бюджета на съёмки ещё нет. Быстро проверяем идеи и оставляем ту, что заходит.',
        it: 'Il prodotto c’è, il budget per le riprese non ancora. Testiamo idee in fretta e teniamo quella che funziona.',
        en: 'The product is ready, the shoot budget isn’t. We test ideas fast and keep the one that lands.',
      },
    },
    {
      title: { ru: 'Международные клиенты', it: 'Clienti internazionali', en: 'International clients' },
      text: {
        ru: 'Работаю на итальянском, английском и русском. Часовые пояса — не проблема, дедлайны — тем более.',
        it: 'Lavoro in italiano, inglese e russo. I fusi orari non sono un problema, le scadenze ancora meno.',
        en: 'I work in Italian, English and Russian. Time zones aren’t a problem; deadlines even less so.',
      },
    },
  ],

  contacts: [
    { id: 'telegram', label: 'Telegram' },
    { id: 'whatsapp', label: 'WhatsApp' },
    { id: 'email', label: 'Email' },
    { id: 'tiktok', label: 'TikTok' },
    { id: 'facebook', label: 'Facebook' },
  ],
};
