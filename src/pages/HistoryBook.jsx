import { useState } from "react";
import './HistoryBook.css';

const pages = [
  {
    title: "Тарих: Қазақ хандығының құрылуы",
    img: "/assets/pixel-art.png",
    text: [
      "XV ғасырдың ортасында Ұлы далада Керей мен Жәнібек хандар Абылқайыр ханның билігіне наразы болған ру-тайпаларды бастап, Шу өзенінің бойына қоныс аударды.",
      "1465 жылы Қазақ хандығы құрылды. Бұл оқиға қазақ халқының жаңа дәуірінің бастамасы болды."
    ]
  },
  {
    title: "Бірлік пен даму",
    img: "/assets/react.svg",
    text: [
      "Қазақ хандығы тез өсіп, бытыраңқы тайпаларды біріктірді.",
      "Керей алғашқы хан болды, Жәнібек — оның мұрагері. Хандық тәуелсіздігін нығайтып, мәдениет, дәстүр, әскери істі дамытты."
    ]
  },
  {
    title: "Алтын дәуір",
    img: "/projects_pixel_gif/mini-game-id-1-intro.gif",
    text: [
      "XVI-XVII ғасырларда хандық Қасым хан, кейін Тәуке хан тұсында гүлденді.",
      "\"Жеті жарғы\" заңдары қабылданды, көршілермен байланыс нығайды, сауда мен қолөнер дамыды."
    ]
  },
  {
    title: "Сынақтар мен күрес",
    img: "/projects_pixel_gif/mini-game-id-4.gif",
    text: [
      "XVIII ғасырда хандық жоңғар шапқыншылығына қарсы тұрды.",
      "Қазақ батырлары мен халқы жерін қорғауда ерлік көрсетті. Бұл кезеңде Абылай хан, Бөгенбай, Қазыбек би сияқты тұлғалар шықты."
    ]
  },
  {
    title: "Мұра",
    img: "/assets/pixel-art.png",
    text: [
      "Қазақ хандығы — қазақтың бірлігі, мәдениеті мен мемлекеттілігінің негізі.",
      "Оның тарихы — еркіндік пен бірліктің, қиындықты жеңудің жолы."
    ]
  }
];

const HistoryBook = () => {
  const [opened, setOpened] = useState(false);
  const [page, setPage] = useState(0);
  const next = () => setPage(p => Math.min(p + 1, pages.length - 1));
  const prev = () => setPage(p => Math.max(p - 1, 0));

  return (
    <main className="history-book-section container">
      <div className="book-frame">
        {!opened ? (
          <div className="book-cover">
            <h2 className="book-title gradient-text">Тарих кітабы</h2>
            <div className="book-img-wrap">
              <img src="/projects_pixel_gif/book/kazakh-history-1.png" alt="Кітап мұқабасы" className="book-img" />
            </div>
            <div className="book-text">
              <p>Қазақ хандығының тарихы<br/>Интерактивті кітап</p>
            </div>
            <button className="book-btn book-open-btn" onClick={() => setOpened(true)}>Кітапты ашу</button>
          </div>
        ) : (
          <>
            <div className="book-page">
              <h2 className="book-title gradient-text">{pages[page].title}</h2>
              <div className="book-img-wrap">
                <img src={pages[page].img} alt="Иллюстрация" className="book-img" />
              </div>
              <div className="book-text">
                {pages[page].text.map((t, i) => <p key={i}>{t}</p>)}
              </div>
            </div>
            <div className="book-controls">
              <button className="book-btn" onClick={prev} disabled={page === 0}>← Алдыңғы</button>
              <span className="book-page-num">{page + 1} / {pages.length}</span>
              <button className="book-btn" onClick={next} disabled={page === pages.length - 1}>Келесі →</button>
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default HistoryBook;
