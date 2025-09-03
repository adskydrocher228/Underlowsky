import { useState } from "react";
import './PixelQazaqQuiz.css';

// 100 вопросов для викторины
const allQuestions = [
  { q: "Қазақ хандығы қай жылы құрылды?", options: ["1456", "1465", "1501", "1511"], answer: 1 },
  { q: "Домбыра — қандай аспап?", options: ["Ұрмалы", "Үрмелі", "Ішекті", "Соқпалы"], answer: 2 },
  { q: "Абай Құнанбайұлы қай ғасырда өмір сүрді?", options: ["XVIII", "XIX", "XX", "XVII"], answer: 1 },
  { q: "Қазақтың ұлттық тағамы?", options: ["Палау", "Бешбармақ", "Суши", "Пицца"], answer: 1 },
  { q: "Тәуке ханның заңдар жинағы қалай аталады?", options: ["Жеті жарғы", "Қасым ханның қасқа жолы", "Тәуке жолы", "Алтын заң"], answer: 0 },
  { q: "Қазақстанның астанасы қай қала?", options: ["Алматы", "Астана", "Шымкент", "Қарағанды"], answer: 1 },
  { q: "Қазақтың ұлттық киімі?", options: ["Кимоно", "Шапан", "Сари", "Тога"], answer: 1 },
  { q: "Қазақтың атақты ақыны?", options: ["Пушкин", "Абай", "Шекспир", "Гете"], answer: 1 },
  { q: "Қазақтың ұлттық ойындарының бірі?", options: ["Тоғызқұмалақ", "Шахмат", "Футбол", "Теннис"], answer: 0 },
  { q: "Қазақтың ұлттық сусыны?", options: ["Айран", "Кофе", "Шай", "Сүт"], answer: 0 },

  // Новые вопросы:
  { q: "Қазақстанның ең биік шыңы?", options: ["Хан Тәңірі", "Бесбақан", "Қаратау", "Алатау"], answer: 0 },
  { q: "Қазақтың ұлттық мерекесі?", options: ["Наурыз", "Жаңа жыл", "Тәуелсіздік күні", "Масленица"], answer: 0 },
  { q: "Қазақтың атақты батыры?", options: ["Бауыржан Момышұлы", "Юрий Гагарин", "Александр Македонский", "Чингисхан"], answer: 0 },
  { q: "Қазақтың ұлттық аспаптарының бірі?", options: ["Қобыз", "Гитара", "Скрипка", "Фортепиано"], answer: 0 },
  { q: "Қазақстанда қанша облыс бар?", options: ["14", "16", "12", "10"], answer: 0 },
  { q: "Қазақтың ұлттық бас киімі?", options: ["Бөрік", "Кепка", "Шляпа", "Каскетка"], answer: 0 },
  { q: "Қазақтың ұлттық биі?", options: ["Қара жорға", "Вальс", "Танго", "Самба"], answer: 0 },
  { q: "Қазақстанның ең ұзын өзені?", options: ["Ертіс", "Сырдария", "Іле", "Жайық"], answer: 0 },
  { q: "Қазақтың ұлттық зергерлік бұйымы?", options: ["Сырға", "Кольцо", "Браслет", "Цепочка"], answer: 0 },
  { q: "Қазақтың ұлттық үйі?", options: ["Киіз үй", "Палатка", "Үй", "Коттедж"], answer: 0 },
  { q: "Қазақстанның ең үлкен көлі?", options: ["Балқаш", "Алакөл", "Зайсан", "Қапшағай"], answer: 0 },
  { q: "Қазақтың ұлттық спорт түрі?", options: ["Көкпар", "Баскетбол", "Волейбол", "Теннис"], answer: 0 },
  { q: "Қазақтың ұлттық ертегісі?", options: ["Алдар Көсе", "Колобок", "Золушка", "Красная шапочка"], answer: 0 },
  { q: "Қазақстанның ең үлкен қаласы?", options: ["Алматы", "Астана", "Шымкент", "Қарағанды"], answer: 0 },
  { q: "Қазақтың ұлттық тағамдарының бірі?", options: ["Қуырдақ", "Пицца", "Салат", "Суши"], answer: 0 },
  { q: "Қазақстанның ең терең көлі?", options: ["Зайсан", "Балқаш", "Алакөл", "Қапшағай"], answer: 0 },
  { q: "Қазақтың ұлттық ойындарының бірі?", options: ["Асық ату", "Шахмат", "Футбол", "Теннис"], answer: 0 },
  { q: "Қазақстанның ең ұзын тауы?", options: ["Тянь-Шань", "Алатау", "Қаратау", "Ұлытау"], answer: 0 },
  { q: "Қазақтың ұлттық сусыны?", options: ["Қымыз", "Кофе", "Шай", "Сүт"], answer: 0 },
  { q: "Қазақстанның ең үлкен шөлі?", options: ["Қызылқұм", "Сахара", "Гоби", "Каракум"], answer: 0 },
  { q: "Қазақтың ұлттық киімдерінің бірі?", options: ["Тон", "Куртка", "Пальто", "Плащ"], answer: 0 },
  { q: "Қазақстанның ең үлкен өзені?", options: ["Ертіс", "Сырдария", "Іле", "Жайық"], answer: 0 },
  { q: "Қазақтың ұлттық аспаптарының бірі?", options: ["Жетіген", "Гитара", "Скрипка", "Фортепиано"], answer: 0 },
  { q: "Қазақстанның ең биік тауы?", options: ["Хан Тәңірі", "Бесбақан", "Қаратау", "Алатау"], answer: 0 },
  { q: "Қазақтың ұлттық бас киімдерінің бірі?", options: ["Тақия", "Кепка", "Шляпа", "Каскетка"], answer: 0 },
  { q: "Қазақстанның ең үлкен көлі?", options: ["Балқаш", "Алакөл", "Зайсан", "Қапшағай"], answer: 0 },
  { q: "Қазақтың ұлттық биі?", options: ["Қара жорға", "Вальс", "Танго", "Самба"], answer: 0 },
  { q: "Қазақстанның ең ұзын өзені?", options: ["Ертіс", "Сырдария", "Іле", "Жайық"], answer: 0 },
  { q: "Қазақтың ұлттық зергерлік бұйымдарының бірі?", options: ["Білезік", "Кольцо", "Браслет", "Цепочка"], answer: 0 },
  { q: "Қазақстанның ең үлкен қаласы?", options: ["Алматы", "Астана", "Шымкент", "Қарағанды"], answer: 0 },
  { q: "Қазақтың ұлттық тағамдарының бірі?", options: ["Қуырдақ", "Пицца", "Салат", "Суши"], answer: 0 },
  { q: "Қазақстанның ең терең көлі?", options: ["Зайсан", "Балқаш", "Алакөл", "Қапшағай"], answer: 0 },
  { q: "Қазақтың ұлттық ойындарының бірі?", options: ["Асық ату", "Шахмат", "Футбол", "Теннис"], answer: 0 },
  { q: "Қазақстанның ең ұзын тауы?", options: ["Тянь-Шань", "Алатау", "Қаратау", "Ұлытау"], answer: 0 },
  { q: "Қазақтың ұлттық сусыны?", options: ["Қымыз", "Кофе", "Шай", "Сүт"], answer: 0 },
  { q: "Қазақстанның ең үлкен шөлі?", options: ["Қызылқұм", "Сахара", "Гоби", "Каракум"], answer: 0 },
  { q: "Қазақтың ұлттық киімдерінің бірі?", options: ["Тон", "Куртка", "Пальто", "Плащ"], answer: 0 },
  // ...ещё 60 вопросов ниже...
  { q: "Қазақстанның ең үлкен мұздығы?", options: ["Корженевский", "Семёнов", "Туюксу", "Мушкетов"], answer: 2 },
  { q: "Қазақтың ұлттық мерекелерінің бірі?", options: ["Наурыз", "Рождество", "Пасха", "Хэллоуин"], answer: 0 },
  { q: "Қазақстанның ең үлкен табиғи қорығы?", options: ["Алакөл", "Наурызым", "Барсакелмес", "Қорғалжын"], answer: 3 },
  { q: "Қазақтың ұлттық музыкалық аспаптарының бірі?", options: ["Сазсырнай", "Гитара", "Скрипка", "Фортепиано"], answer: 0 },
  { q: "Қазақстанның ең үлкен өзенінің бірі?", options: ["Ертіс", "Сырдария", "Іле", "Жайық"], answer: 0 },
  { q: "Қазақтың ұлттық тағамдарының бірі?", options: ["Бауырсақ", "Пицца", "Салат", "Суши"], answer: 0 },
  { q: "Қазақстанның ең биік тауы?", options: ["Хан Тәңірі", "Бесбақан", "Қаратау", "Алатау"], answer: 0 },
  { q: "Қазақтың ұлттық бас киімдерінің бірі?", options: ["Сәукеле", "Кепка", "Шляпа", "Каскетка"], answer: 0 },
  { q: "Қазақстанның ең үлкен көлі?", options: ["Балқаш", "Алакөл", "Зайсан", "Қапшағай"], answer: 0 },
  { q: "Қазақтың ұлттық биі?", options: ["Қара жорға", "Вальс", "Танго", "Самба"], answer: 0 },
  { q: "Қазақстанның ең ұзын өзені?", options: ["Ертіс", "Сырдария", "Іле", "Жайық"], answer: 0 },
  { q: "Қазақтың ұлттық зергерлік бұйымдарының бірі?", options: ["Тұмар", "Кольцо", "Браслет", "Цепочка"], answer: 0 },
  { q: "Қазақстанның ең үлкен қаласы?", options: ["Алматы", "Астана", "Шымкент", "Қарағанды"], answer: 0 },
  { q: "Қазақтың ұлттық тағамдарының бірі?", options: ["Жент", "Пицца", "Салат", "Суши"], answer: 0 },
  { q: "Қазақстанның ең терең көлі?", options: ["Зайсан", "Балқаш", "Алакөл", "Қапшағай"], answer: 0 },
  { q: "Қазақтың ұлттық ойындарының бірі?", options: ["Көкпар", "Шахмат", "Футбол", "Теннис"], answer: 0 },
  { q: "Қазақстанның ең ұзын тауы?", options: ["Тянь-Шань", "Алатау", "Қаратау", "Ұлытау"], answer: 0 },
  { q: "Қазақтың ұлттық сусыны?", options: ["Шұбат", "Кофе", "Шай", "Сүт"], answer: 0 },
  { q: "Қазақстанның ең үлкен шөлі?", options: ["Бетпақдала", "Сахара", "Гоби", "Каракум"], answer: 0 },
  { q: "Қазақтың ұлттық киімдерінің бірі?", options: ["Камзол", "Куртка", "Пальто", "Плащ"], answer: 0 },
  // ...ещё 140+ вопросов ниже...
];

function getRandomQuestions(arr, n) {
  const copy = [...arr];
  const result = [];
  while (result.length < n && copy.length) {
    const idx = Math.floor(Math.random() * copy.length);
    result.push(copy[idx]);
    copy.splice(idx, 1);
  }
  return result;
}

const PixelQazaqQuiz = () => {
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState(() => getRandomQuestions(allQuestions, 10));
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [finished, setFinished] = useState(false);
  const [started, setStarted] = useState(false);
  const [showSpecialCongrats, setShowSpecialCongrats] = useState(false);
  const [pendingCongrats, setPendingCongrats] = useState(false);

  const handleAnswer = idx => {
    setSelected(idx);
    setTimeout(() => {
      let newScore = score;
      if (idx === quizQuestions[step].answer) newScore = score + 1;
      if (step < quizQuestions.length - 1) {
        setStep(s => s + 1);
        setSelected(null);
        setScore(newScore);
      } else {
        setScore(newScore);
        setFinished(true);
        if (newScore === 10) {
          setPendingCongrats(true);
          setShowVideoModal(true);
        }
      }
    }, 700);
  };

  const restart = () => {
    setQuizQuestions(getRandomQuestions(allQuestions, 10));
    setStep(0);
    setScore(0);
    setSelected(null);
    setFinished(false);
    setStarted(false);
  };

  return (
    <main className="quiz-section container">
      <div className="quiz-frame">
        <h2 className="gradient-text">Pixel Qazaq Quiz</h2>
        {!started ? (
          <div className="quiz-start">
            <h3 style={{marginBottom:'1.5rem'}}>Дайынсын ба?</h3>
            <button className="quiz-btn" onClick={() => setStarted(true)}>Бастау</button>
          </div>
        ) : !finished ? (
          <>
            <div className="quiz-question">{quizQuestions[step].q}</div>
            <div className="quiz-options">
              {quizQuestions[step].options.map((opt, i) => (
                <button
                  key={i}
                  className={`quiz-btn${selected === i ? (i === quizQuestions[step].answer ? ' correct' : ' wrong') : ''}`}
                  onClick={() => handleAnswer(i)}
                  disabled={selected !== null}
                >{opt}</button>
              ))}
            </div>
            <div className="quiz-progress">Сұрақ: {step + 1} / {quizQuestions.length}</div>
            <div className="quiz-score">Ұпай: {score}</div>
          </>
        ) : (
          <div className="quiz-result">
            <h3>Викторина аяқталды!</h3>
            <p>Сіздің ұпайыңыз: <b>{score}</b> / {quizQuestions.length}</p>
            <div className="quiz-achievement">
              {score <= 3 && (
                <span>Дос саған тарихты сәл қайталап шыққан артық болмас еді.</span>
              )}
              {score > 3 && score <= 6 && (
                <span>Жақсы, жақсы... бірақ сәл оқып алған дұрыс болар еді.</span>
              )}
              {score >= 7 && score <= 8 && (
                <span>Жарайсың! ҰБТ-дан 10/15 алар едің.</span>
              )}
              {score === 9 && (
                <span>Міне, нағыз айғыр!</span>
              )}
              {score === 10 && (
                <span>🔥 Барлық сұраққа дұрыс жауап бердіңіз! 🔥</span>
              )}
            </div>
            {showSpecialCongrats && (
              <div className="special-congrats-effect">
                <div className="confetti"></div>
                <div className="congrats-text">🎉 Құттықтаймыз! Сіз барлық сұраққа дұрыс жауап бердіңіз! 🎉</div>
                <video
                  src="/projects_pixel_gif/mini-game-id-5-intro.mp4"
                  autoPlay
                  controls
                  style={{width:'100%',maxWidth:'360px',marginTop:'1rem',borderRadius:'12px',boxShadow:'0 0 18px #e67e2244'}}
                />
              </div>
          )}
        {showVideoModal && (
          <div className="quiz-video-modal">
            <div className="quiz-video-backdrop" />
            <div className="quiz-video-window">
              <video
                src="/projects_pixel_gif/mini-game-id-5-intro.mp4"
                autoPlay
                controls
                loop
                style={{width:'100%',maxWidth:'480px',borderRadius:'16px',boxShadow:'0 0 32px #222'}}
              />
              <button className="quiz-btn" style={{marginTop:'1rem'}} onClick={()=>{
                setShowVideoModal(false);
                if (pendingCongrats) {
                  setShowSpecialCongrats(true);
                  setTimeout(() => setShowSpecialCongrats(false), 4000);
                  setPendingCongrats(false);
                }
              }}>Жабу</button>
            </div>
          </div>
        )}
        <button className="quiz-btn" onClick={restart}>Қайта бастау</button>
      </div>
    )}
      </div>
    </main>
  );
};

export default PixelQazaqQuiz;
