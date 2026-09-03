import { useState, useEffect } from 'react'
import './App.css'
import hiragana from './data/hiragana'
import katakana from './data/katakana'
import words from './data/words'

function App() {

  // =========================
  // 기본 페이지
  // =========================

  const [page, setPage] = useState('home')

  // =========================
  // 히라가나 / 가타카나 / 단어
  // =========================

  const [currentIndex, setCurrentIndex] = useState(0)
  const [katakanaIndex, setKatakanaIndex] = useState(0)
  const [wordIndex, setWordIndex] = useState(0)

  // =========================
  // 문자 퀴즈
  // =========================

  const [quizCharacterIndex, setQuizCharacterIndex] = useState(0)
  const [quizOptions, setQuizOptions] = useState([])
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [quizScore, setQuizScore] = useState(0)
  const [quizQuestionCount, setQuizQuestionCount] = useState(0)
  const [quizCorrectCount, setQuizCorrectCount] = useState(0)
  const [quizType, setQuizType] = useState('hiragana')

  // =========================
  // 단어 퀴즈
  // =========================

  const [wordQuizIndex, setWordQuizIndex] = useState(0)
  const [wordQuizOptions, setWordQuizOptions] = useState([])
  const [wordQuizAnswer, setWordQuizAnswer] = useState(null)
  const [wordQuizScore, setWordQuizScore] = useState(0)
  const [wordQuizQuestionCount, setWordQuizQuestionCount] = useState(0)
  const [wordQuizCorrectCount, setWordQuizCorrectCount] = useState(0)

  // =========================
  // 타자연습
  // =========================

  const [typingIndex, setTypingIndex] = useState(0)
  const [typingInput, setTypingInput] = useState('')
  const [typingScore, setTypingScore] = useState(0)
  const [typingTime, setTypingTime] = useState(60)
  const [typingStarted, setTypingStarted] = useState(false)
  const [typingCorrectCount, setTypingCorrectCount] = useState(0)
  const [typingTotalCount, setTypingTotalCount] = useState(0)
  const [typingFeedback, setTypingFeedback] = useState('')
  const [typingLevel, setTypingLevel] = useState(null)
  const [typingWrongCount, setTypingWrongCount] = useState(0)
  const [typingWrong, setTypingWrong] = useState(false)


  // =========================
  // 퀴즈 데이터
  // =========================

  const getQuizData = () => {

    if (quizType === 'katakana') {
      return katakana
    }

    return hiragana
  }


  // =========================
  // 문자 퀴즈 시작
  // =========================

  const startQuiz = (type = quizType) => {

    const quizData =
      type === 'katakana'
        ? katakana
        : hiragana

    const randomIndex = Math.floor(
      Math.random() * quizData.length
    )

    const correctAnswer =
      quizData[randomIndex].pronunciation

    const wrongAnswers = quizData
      .filter((_, index) => index !== randomIndex)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map((item) => item.pronunciation)

    const options = [
      correctAnswer,
      ...wrongAnswers
    ].sort(() => Math.random() - 0.5)

    setQuizType(type)
    setQuizCharacterIndex(randomIndex)
    setQuizOptions(options)
    setSelectedAnswer(null)

    setQuizScore(0)
    setQuizQuestionCount(0)
    setQuizCorrectCount(0)

    setPage('quiz')
  }


  // =========================
  // 다음 문자 퀴즈
  // =========================

  const nextQuiz = () => {

    if (quizQuestionCount >= 9) {
      setPage('quizResult')
      return
    }

    const quizData = getQuizData()

    const randomIndex = Math.floor(
      Math.random() * quizData.length
    )

    const correctAnswer =
      quizData[randomIndex].pronunciation

    const wrongAnswers = quizData
      .filter((_, index) => index !== randomIndex)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map((item) => item.pronunciation)

    const options = [
      correctAnswer,
      ...wrongAnswers
    ].sort(() => Math.random() - 0.5)

    setQuizCharacterIndex(randomIndex)
    setQuizOptions(options)
    setSelectedAnswer(null)

    setQuizQuestionCount(
      (count) => count + 1
    )
  }


  // =========================
  // 문자 퀴즈 정답 확인
  // =========================

  const checkAnswer = (answer) => {

    if (selectedAnswer !== null) {
      return
    }

    const quizData = getQuizData()

    setSelectedAnswer(answer)

    if (
      answer ===
      quizData[quizCharacterIndex].pronunciation
    ) {

      setQuizScore(
        (score) => score + 10
      )

      setQuizCorrectCount(
        (count) => count + 1
      )
    }
  }


  // =========================
  // 단어 퀴즈 시작
  // =========================

  const startWordQuiz = () => {

    const randomIndex = Math.floor(
      Math.random() * words.length
    )

    const correctAnswer =
      words[randomIndex].meaning

    const wrongAnswers = words
      .filter((_, index) => index !== randomIndex)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map((item) => item.meaning)

    const options = [
      correctAnswer,
      ...wrongAnswers
    ].sort(() => Math.random() - 0.5)

    setWordQuizIndex(randomIndex)
    setWordQuizOptions(options)
    setWordQuizAnswer(null)

    setWordQuizScore(0)
    setWordQuizQuestionCount(0)
    setWordQuizCorrectCount(0)

    setPage('wordQuiz')
  }


  // =========================
  // 단어 퀴즈 정답 확인
  // =========================

  const checkWordQuizAnswer = (answer) => {

    if (wordQuizAnswer !== null) {
      return
    }

    const currentWord = words[wordQuizIndex]

    setWordQuizAnswer(answer)

    if (answer === currentWord.meaning) {

      setWordQuizScore(
        (score) => score + 10
      )

      setWordQuizCorrectCount(
        (count) => count + 1
      )
    }
  }


  // =========================
  // 다음 단어 퀴즈
  // =========================

  const nextWordQuiz = () => {

    if (wordQuizQuestionCount >= 9) {
      setPage('wordQuizResult')
      return
    }

    const randomIndex = Math.floor(
      Math.random() * words.length
    )

    const correctAnswer =
      words[randomIndex].meaning

    const wrongAnswers = words
      .filter((_, index) => index !== randomIndex)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map((item) => item.meaning)

    const options = [
      correctAnswer,
      ...wrongAnswers
    ].sort(() => Math.random() - 0.5)

    setWordQuizIndex(randomIndex)
    setWordQuizOptions(options)
    setWordQuizAnswer(null)

    setWordQuizQuestionCount(
      (count) => count + 1
    )
  }


  // =========================
  // 타자연습 시작
  // =========================

  const startTypingGame = (level) => {

    const levelWords = words.filter(
      (word) => word.level === level
    )

    if (levelWords.length === 0) {
      return
    }

    const randomIndex = Math.floor(
      Math.random() * levelWords.length
    )

    const selectedWord =
      levelWords[randomIndex]

    setTypingLevel(level)
    setTypingIndex(
      words.indexOf(selectedWord)
    )
    setTypingInput('')
    setTypingScore(0)
    setTypingTime(60)
    setTypingStarted(true)
    setTypingCorrectCount(0)
    setTypingTotalCount(0)
    setTypingWrongCount(0)
    setTypingWrong(false)
    setTypingFeedback('')
    setPage('typing')
  }


  // =========================
  // 타자 입력 확인
  // =========================

  const checkTypingAnswer = (value) => {

    if (typingWrong) {
    return
  }

  const currentWord = words[typingIndex]

  const answer =
    currentWord.romaji.toLowerCase()

  const input =
    value.trim().toLowerCase()

  setTypingInput(value)


  // =========================
  // 정답
  // =========================

  if (input === answer) {

    setTypingWrong(false)

    setTypingTotalCount(
      (count) => count + 1
    )
    
    setTypingScore(
      (score) => score + 10
    )

    setTypingCorrectCount(
      (count) => count + 1
    )

    setTypingFeedback(
      '+10점! 🎉'
    )

    setTimeout(() => {

      setTypingFeedback('')

      const levelWords = words.filter(
        (word) => word.level === typingLevel
      )

      const randomIndex = Math.floor(
        Math.random() * levelWords.length
      )

      const nextWord =
        levelWords[randomIndex]

      setTypingIndex(
        words.indexOf(nextWord)
      )

      setTypingInput('')

    }, 700)

    return
  }


  // =========================
  // 오답
  // =========================

  if (!typingWrong) {

  setTypingWrongCount(
    (count) => count + 1
  )

  setTypingTotalCount(
    (count) => count + 1
  )

  setTypingWrong(true)
}

setTypingFeedback(
  `❌ 오답입니다! 정답: ${currentWord.romaji}`
)

}


  // =========================
  // 타자 게임 타이머
  // =========================

  useEffect(() => {

    if (!typingStarted) {
      return
    }

    if (typingTime <= 0) {

      setTypingStarted(false)
      setPage('typingResult')

      return
    }

    const timer = setTimeout(() => {

      setTypingTime(
        (time) => time - 1
      )

    }, 1000)

    return () => clearTimeout(timer)

  }, [typingStarted, typingTime])


  // =========================
  // 다음 히라가나
  // =========================

  const nextCharacter = () => {

    if (
      currentIndex <
      hiragana.length - 1
    ) {

      setCurrentIndex(
        currentIndex + 1
      )
    }
  }


  // =========================
  // 이전 히라가나
  // =========================

  const previousCharacter = () => {

    if (currentIndex > 0) {

      setCurrentIndex(
        currentIndex - 1
      )
    }
  }


  // ============================================================
  // 홈 화면
  // ============================================================

  if (page === 'home') {

    return (
      <div className="app">

        <header className="header">

          <div className="logo">
            🇯🇵 にほんご
          </div>

          <nav>

            <button
              onClick={() => setPage('home')}
            >
              홈
            </button>

            <button>
              학습
            </button>

            <button>
              게임
            </button>

          </nav>

        </header>


        <main className="main">

          <section className="welcome">

            <p className="japanese">
              いっしょに にほんごを べんきょうしましょう!
            </p>

            <h1>
              재미있게 배우는 일본어
            </h1>

            <p>
              히라가나부터 단어, 타자 연습과 게임까지
              <br />
              쉽고 재미있게 일본어를 공부해보세요.
            </p>

          </section>


          <section className="study-menu">

            {/* 히라가나 */}

            <div className="menu-card">

              <div className="icon">
                あ
              </div>

              <h2>
                히라가나
              </h2>

              <p>
                일본어의 기본 문자를 배워요.
              </p>

              <button
                className="start-button"
                onClick={() => {
                  setCurrentIndex(0)
                  setPage('hiragana')
                }}
              >
                공부하기
              </button>

            </div>


            {/* 가타카나 */}

            <div className="menu-card">

              <div className="icon">
                カ
              </div>

              <h2>
                가타카나
              </h2>

              <p>
                가타카나를 쉽고 재미있게 배워요.
              </p>

              <button
                className="start-button"
                onClick={() => {
                  setKatakanaIndex(0)
                  setPage('katakana')
                }}
              >
                공부하기
              </button>

            </div>


            {/* 단어 */}

            <div className="menu-card">

              <div className="icon">
                言
              </div>

              <h2>
                단어 학습
              </h2>

              <p>
                일상에서 사용하는 일본어 단어를 배워요.
              </p>

              <button
                className="start-button"
                onClick={() => {
                  setWordIndex(0)
                  setPage('words')
                }}
              >
                공부하기
              </button>

            </div>


            {/* 게임 */}

            <div className="menu-card game-card">

              <div className="icon">
                🎮
              </div>

              <h2>
                게임 모드
              </h2>

              <p>
                게임을 하면서 일본어를 연습해요.
              </p>

              <button
                className="start-button"
                onClick={() => setPage('quizSelect')}
              >
                게임 시작
              </button>

              <button
                className="start-button"
                onClick={() => setPage('typingDifficulty')}
              >
                ⌨️ 타자연습 시작
              </button>

            </div>

          </section>


          {/* 학습 진행률 */}

          <section className="progress">

            <div className="progress-header">

              <h2>
                나의 학습 진행률
              </h2>

              <span>
                0%
              </span>

            </div>

            <div className="progress-bar">
              <div className="progress-fill"></div>
            </div>

            <p>
              오늘도 조금씩 일본어를 공부해봐요! 🌱
            </p>

          </section>

        </main>


        <footer>

          <p>
            にほんご 공부 · Japanese Study
          </p>

        </footer>

      </div>
    )
  }


  // ============================================================
  // 히라가나 학습
  // ============================================================

  if (page === 'hiragana') {

    const current =
      hiragana[currentIndex]

    return (
      <div className="app">

        <header className="header">

          <div className="logo">
            🇯🇵 にほんご
          </div>

          <nav>
            <button
              onClick={() => setPage('home')}
            >
              홈
            </button>
          </nav>

        </header>


        <main className="main">

          <section className="hiragana-page">

            <button
              className="back-button"
              onClick={() => setPage('home')}
            >
              ← 홈으로 돌아가기
            </button>

            <p className="japanese">
              ひらがな
            </p>

            <h1>
              히라가나 학습
            </h1>

            <p className="description">
              일본어의 기본 문자인 히라가나를 배워봅시다.
            </p>


            <div className="hiragana-card">

              <div className="big-character">
                {current.character}
              </div>

              <div className="pronunciation">
                {current.pronunciation}
              </div>

              <div className="romaji">
                {current.romaji}
              </div>

              <div className="example">

                <h3>
                  예시 단어
                </h3>

                <div className="example-japanese">
                  {current.example}
                </div>

                <div className="example-romaji">
                  {current.exampleRomaji}
                </div>

                <div className="example-meaning">
                  {current.meaning}
                </div>

              </div>

            </div>


            <p className="character-count">
              {currentIndex + 1} / {hiragana.length}
            </p>


            <div className="navigation-buttons">

              <button
                className="next-button"
                onClick={previousCharacter}
                disabled={currentIndex === 0}
              >
                ← 이전
              </button>

              <button
                className="next-button"
                onClick={nextCharacter}
                disabled={
                  currentIndex === hiragana.length - 1
                }
              >
                다음 →
              </button>

            </div>


            <div className="hiragana-table">

              <h2>
                히라가나 전체 보기
              </h2>

              <p>
                문자를 클릭하면 해당 문자로 이동합니다.
              </p>

              <div className="hiragana-grid">

                {hiragana.map((item, index) => (

                  <button
                    key={item.character}
                    className={
                      index === currentIndex
                        ? 'hiragana-item active'
                        : 'hiragana-item'
                    }
                    onClick={() =>
                      setCurrentIndex(index)
                    }
                  >

                    <span className="table-character">
                      {item.character}
                    </span>

                    <span className="table-pronunciation">
                      {item.pronunciation}
                    </span>

                  </button>

                ))}

              </div>

            </div>

          </section>

        </main>


        <footer>
          <p>
            にほんご 공부 · Japanese Study
          </p>
        </footer>

      </div>
    )
  }


  // ============================================================
  // 가타카나 학습
  // ============================================================

  if (page === 'katakana') {

    const current =
      katakana[katakanaIndex]

    return (
      <div className="app">

        <header className="header">

          <div className="logo">
            🇯🇵 にほんご
          </div>

          <nav>

            <button
              onClick={() => setPage('home')}
            >
              홈
            </button>

          </nav>

        </header>


        <main className="main">

          <section className="hiragana-page">

            <button
              className="back-button"
              onClick={() => setPage('home')}
            >
              ← 홈으로 돌아가기
            </button>

            <p className="japanese">
              カタカナ
            </p>

            <h1>
              가타카나 학습
            </h1>

            <p className="description">
              일본어의 또 다른 기본 문자인 가타카나를 배워봅시다.
            </p>


            <div className="hiragana-card">

              <div className="big-character">
                {current.character}
              </div>

              <div className="pronunciation">
                {current.pronunciation}
              </div>

              <div className="romaji">
                {current.romaji}
              </div>

              <div className="example">

                <h3>
                  예시 단어
                </h3>

                <div className="example-japanese">
                  {current.example}
                </div>

                <div className="example-romaji">
                  {current.exampleRomaji}
                </div>

                <div className="example-meaning">
                  {current.meaning}
                </div>

              </div>

            </div>


            <p className="character-count">
              {katakanaIndex + 1} / {katakana.length}
            </p>


            <div className="navigation-buttons">

              <button
                className="next-button"
                onClick={() => {

                  if (katakanaIndex > 0) {
                    setKatakanaIndex(
                      katakanaIndex - 1
                    )
                  }

                }}
                disabled={katakanaIndex === 0}
              >
                ← 이전
              </button>


              <button
                className="next-button"
                onClick={() => {

                  if (
                    katakanaIndex <
                    katakana.length - 1
                  ) {

                    setKatakanaIndex(
                      katakanaIndex + 1
                    )
                  }

                }}
                disabled={
                  katakanaIndex === katakana.length - 1
                }
              >
                다음 →
              </button>

            </div>


            <div className="hiragana-table">

              <h2>
                가타카나 전체 보기
              </h2>

              <p>
                문자를 클릭하면 해당 문자로 이동합니다.
              </p>

              <div className="hiragana-grid">

                {katakana.map((item, index) => (

                  <button
                    key={item.character}
                    className={
                      index === katakanaIndex
                        ? 'hiragana-item active'
                        : 'hiragana-item'
                    }
                    onClick={() =>
                      setKatakanaIndex(index)
                    }
                  >

                    <span className="table-character">
                      {item.character}
                    </span>

                    <span className="table-pronunciation">
                      {item.pronunciation}
                    </span>

                  </button>

                ))}

              </div>

            </div>

          </section>

        </main>


        <footer>

          <p>
            にほんご 공부 · Japanese Study
          </p>

        </footer>

      </div>
    )
  }


  // ============================================================
  // 단어 학습
  // ============================================================

  if (page === 'words') {

    const currentWord =
      words[wordIndex]

    return (
      <div className="app">

        <header className="header">

          <div className="logo">
            🇯🇵 にほんご
          </div>

          <nav>

            <button
              onClick={() => setPage('home')}
            >
              홈
            </button>

          </nav>

        </header>


        <main className="main">

          <section className="word-page">

            <button
              className="back-button"
              onClick={() => setPage('home')}
            >
              ← 홈으로 돌아가기
            </button>


            <p className="japanese">
              ことば
            </p>

            <h1>
              단어 학습
            </h1>

            <p className="description">
              자주 사용하는 일본어 단어를 배워봅시다.
            </p>


            <div className="word-card">

              <div className="word-number">
                {wordIndex + 1} / {words.length}
              </div>

              <div className="word-japanese">
                {currentWord.word}
              </div>

              <div className="word-reading">
                {currentWord.reading}
              </div>

              <div className="word-romaji">
                {currentWord.romaji}
              </div>

              <div className="word-meaning">
                {currentWord.meaning}
              </div>


              <div className="word-example">

                <h3>
                  예문
                </h3>

                <div className="example-japanese">
                  {currentWord.example}
                </div>

                <div className="example-romaji">
                  {currentWord.exampleRomaji}
                </div>

                <div className="example-meaning">
                  {currentWord.exampleMeaning}
                </div>

              </div>

            </div>


            <div className="navigation-buttons">

              <button
                className="next-button"
                onClick={() => {

                  if (wordIndex > 0) {
                    setWordIndex(
                      wordIndex - 1
                    )
                  }

                }}
                disabled={wordIndex === 0}
              >
                ← 이전
              </button>


              <button
                className="next-button"
                onClick={() => {

                  if (
                    wordIndex <
                    words.length - 1
                  ) {

                    setWordIndex(
                      wordIndex + 1
                    )
                  }

                }}
                disabled={
                  wordIndex === words.length - 1
                }
              >
                다음 →
              </button>

            </div>


            <div className="word-list">

              <h2>
                단어 목록
              </h2>

              <p>
                단어를 클릭하면 해당 단어로 이동합니다.
              </p>

              <div className="word-list-grid">

                {words.map((item, index) => (

                  <button
                    key={item.word}
                    className={
                      index === wordIndex
                        ? 'word-list-item active'
                        : 'word-list-item'
                    }
                    onClick={() =>
                      setWordIndex(index)
                    }
                  >

                    <span className="list-word">
                      {item.word}
                    </span>

                    <span className="list-meaning">
                      {item.meaning}
                    </span>

                  </button>

                ))}

              </div>

            </div>


            <div className="word-quiz-start">

              <h2>
                🎮 단어 퀴즈
              </h2>

              <p>
                배운 단어를 퀴즈로 복습해보세요.
              </p>

              <button
                className="quiz-next-button"
                onClick={startWordQuiz}
              >
                단어 퀴즈 시작
              </button>

            </div>

          </section>

        </main>


        <footer>
          <p>
            にほんご 공부 · Japanese Study
          </p>
        </footer>

      </div>
    )
  }


  // ============================================================
  // 퀴즈 선택
  // ============================================================

  if (page === 'quizSelect') {

    return (
      <div className="app">

        <header className="header">

          <div className="logo">
            🇯🇵 にほんご
          </div>

          <nav>

            <button
              onClick={() => setPage('home')}
            >
              홈
            </button>

          </nav>

        </header>


        <main className="main">

          <section className="quiz-select-page">

            <button
              className="back-button"
              onClick={() => setPage('home')}
            >
              ← 홈으로 돌아가기
            </button>

            <p className="japanese">
              クイズを えらんでください
            </p>

            <h1>
              퀴즈 선택
            </h1>

            <p className="description">
              공부하고 싶은 문자를 선택해보세요.
            </p>


            <div className="quiz-select-grid">

              <button
                className="quiz-select-card"
                onClick={() =>
                  startQuiz('hiragana')
                }
              >

                <div className="select-character">
                  あ
                </div>

                <h2>
                  히라가나
                </h2>

                <p>
                  히라가나 46자를
                  <br />
                  퀴즈로 연습해요.
                </p>

              </button>


              <button
                className="quiz-select-card"
                onClick={() =>
                  startQuiz('katakana')
                }
              >

                <div className="select-character">
                  カ
                </div>

                <h2>
                  가타카나
                </h2>

                <p>
                  가타카나 46자를
                  <br />
                  퀴즈로 연습해요.
                </p>

              </button>

            </div>

          </section>

        </main>


        <footer>
          <p>
            にほんご 공부 · Japanese Study
          </p>
        </footer>

      </div>
    )
  }


  // ============================================================
  // 문자 퀴즈
  // ============================================================

  if (page === 'quiz') {

    const quizData =
      getQuizData()

    const currentQuiz =
      quizData[quizCharacterIndex]

    const isCorrect =
      selectedAnswer ===
      currentQuiz.pronunciation

    return (
      <div className="app">

        <header className="header">

          <div className="logo">
            🇯🇵 にほんご
          </div>

          <nav>

            <button
              onClick={() => setPage('home')}
            >
              홈
            </button>

          </nav>

        </header>


        <main className="main">

          <section className="quiz-page">

            <button
              className="back-button"
              onClick={() => setPage('home')}
            >
              ← 홈으로 돌아가기
            </button>


            <p className="japanese">
              {quizType === 'katakana'
                ? 'カタカナ クイズ'
                : 'ひらがな クイズ'}
            </p>


            <h1>
              {quizType === 'katakana'
                ? '가타카나 퀴즈'
                : '히라가나 퀴즈'}
            </h1>


            <div className="quiz-progress">
              문제 {quizQuestionCount + 1} / 10
            </div>


            <div className="quiz-score">
              현재 점수 : {quizScore}점
            </div>


            <div className="quiz-card">

              <p className="quiz-question">
                다음 문자의 발음은?
              </p>


              <div className="quiz-character">
                {currentQuiz.character}
              </div>


              <div className="quiz-options">

                {quizOptions.map((option) => {

                  let className =
                    'quiz-option'

                  if (
                    selectedAnswer !== null
                  ) {

                    if (
                      option ===
                      currentQuiz.pronunciation
                    ) {

                      className +=
                        ' correct'

                    } else if (
                      option ===
                      selectedAnswer
                    ) {

                      className +=
                        ' wrong'
                    }
                  }


                  return (
                    <button
                      key={option}
                      className={className}
                      onClick={() =>
                        checkAnswer(option)
                      }
                    >
                      {option}
                    </button>
                  )

                })}

              </div>


              {selectedAnswer !== null && (

                <div className="quiz-result">

                  {isCorrect ? (

                    <>
                      <div className="correct-text">
                        🎉 정답입니다!
                      </div>

                      <p>
                        잘했어요!
                      </p>
                    </>

                  ) : (

                    <>
                      <div className="wrong-text">
                        😢 아쉬워요!
                      </div>

                      <p>
                        정답은
                        <strong>
                          {' '}
                          {currentQuiz.pronunciation}
                        </strong>
                        입니다.
                      </p>
                    </>

                  )}


                  <button
                    className="quiz-next-button"
                    onClick={nextQuiz}
                  >
                    다음 문제 →
                  </button>

                </div>

              )}

            </div>

          </section>

        </main>


        <footer>
          <p>
            にほんご 공부 · Japanese Study
          </p>
        </footer>

      </div>
    )
  }


  // ============================================================
  // 단어 퀴즈
  // ============================================================

  if (page === 'wordQuiz') {

    const currentWord =
      words[wordQuizIndex]

    const isCorrect =
      wordQuizAnswer ===
      currentWord.meaning

    return (
      <div className="app">

        <header className="header">

          <div className="logo">
            🇯🇵 にほんご
          </div>

          <nav>

            <button
              onClick={() => setPage('home')}
            >
              홈
            </button>

          </nav>

        </header>


        <main className="main">

          <section className="quiz-page">

            <button
              className="back-button"
              onClick={() => setPage('words')}
            >
              ← 단어 학습으로
            </button>


            <p className="japanese">
              ことば クイズ
            </p>

            <h1>
              단어 퀴즈
            </h1>


            <div className="quiz-progress">
              문제 {wordQuizQuestionCount + 1} / 10
            </div>


            <div className="quiz-score">
              현재 점수 : {wordQuizScore}점
            </div>


            <div className="quiz-card">

              <p className="quiz-question">
                다음 단어의 뜻은?
              </p>


              <div className="quiz-character">
                {currentWord.word}
              </div>


              <div className="word-quiz-reading">
                {currentWord.reading}
              </div>


              <div className="word-quiz-options">

                {wordQuizOptions.map((option) => {

                  let className =
                    'quiz-option'

                  if (
                    wordQuizAnswer !== null
                  ) {

                    if (
                      option ===
                      currentWord.meaning
                    ) {

                      className +=
                        ' correct'

                    } else if (
                      option ===
                      wordQuizAnswer
                    ) {

                      className +=
                        ' wrong'
                    }
                  }


                  return (
                    <button
                      key={option}
                      className={className}
                      onClick={() =>
                        checkWordQuizAnswer(option)
                      }
                    >
                      {option}
                    </button>
                  )

                })}

              </div>


              {wordQuizAnswer !== null && (

                <div className="quiz-result">

                  {isCorrect ? (

                    <>
                      <div className="correct-text">
                        🎉 정답입니다!
                      </div>

                      <p>
                        잘했어요!
                      </p>
                    </>

                  ) : (

                    <>
                      <div className="wrong-text">
                        😢 아쉬워요!
                      </div>

                      <p>
                        정답은
                        <strong>
                          {' '}
                          {currentWord.meaning}
                        </strong>
                        입니다.
                      </p>
                    </>

                  )}


                  <button
                    className="quiz-next-button"
                    onClick={nextWordQuiz}
                  >
                    다음 문제 →
                  </button>

                </div>

              )}

            </div>

          </section>

        </main>


        <footer>
          <p>
            にほんご 공부 · Japanese Study
          </p>
        </footer>

      </div>
    )
  }


  // ============================================================
  // 문자 퀴즈 결과
  // ============================================================

  if (page === 'quizResult') {

    return (
      <div className="app">

        <header className="header">

          <div className="logo">
            🇯🇵 にほんご
          </div>

          <nav>

            <button
              onClick={() =>
                setPage('home')
              }
            >
              홈
            </button>

          </nav>

        </header>


        <main className="main">

          <section className="quiz-result-page">

            <div className="result-icon">
              🎉
            </div>

            <p className="japanese">
              おつかれさまでした!
            </p>

            <h1>
              {quizType === 'katakana'
                ? '가타카나 퀴즈 완료!'
                : '히라가나 퀴즈 완료!'}
            </h1>

            <p className="result-description">
              10문제의 퀴즈가 끝났습니다.
            </p>

            <div className="result-card">

              <div className="result-score">

                <span>
                  맞힌 문제
                </span>

                <strong>
                  {quizCorrectCount} / 10
                </strong>

              </div>

              <div className="result-score">

                <span>
                  최종 점수
                </span>

                <strong>
                  {quizScore}점
                </strong>

              </div>

            </div>

            <div className="result-buttons">

              <button
                className="quiz-next-button"
                onClick={() =>
                  startQuiz(quizType)
                }
              >
                다시 도전하기
              </button>

              <button
                className="result-home-button"
                onClick={() =>
                  setPage('home')
                }
              >
                홈으로 돌아가기
              </button>

            </div>

          </section>

        </main>


        <footer>
          <p>
            にほんご 공부 · Japanese Study
          </p>
        </footer>

      </div>
    )
  }


  // ============================================================
  // 단어 퀴즈 결과
  // ============================================================

  if (page === 'wordQuizResult') {

    return (
      <div className="app">

        <header className="header">

          <div className="logo">
            🇯🇵 にほんご
          </div>

          <nav>

            <button
              onClick={() => setPage('home')}
            >
              홈
            </button>

          </nav>

        </header>


        <main className="main">

          <section className="quiz-result-page">

            <div className="result-icon">
              🎉
            </div>

            <p className="japanese">
              おつかれさまでした!
            </p>

            <h1>
              단어 퀴즈 완료!
            </h1>

            <p className="result-description">
              10문제의 단어 퀴즈가 끝났습니다.
            </p>

            <div className="result-card">

              <div className="result-score">

                <span>
                  맞힌 문제
                </span>

                <strong>
                  {wordQuizCorrectCount} / 10
                </strong>

              </div>

              <div className="result-score">

                <span>
                  최종 점수
                </span>

                <strong>
                  {wordQuizScore}점
                </strong>

              </div>

            </div>

            <div className="result-buttons">

              <button
                className="quiz-next-button"
                onClick={startWordQuiz}
              >
                다시 도전하기
              </button>

              <button
                className="result-home-button"
                onClick={() =>
                  setPage('home')
                }
              >
                홈으로 돌아가기
              </button>

            </div>

          </section>

        </main>


        <footer>
          <p>
            にほんご 공부 · Japanese Study
          </p>
        </footer>

      </div>
    )
  }


  // ============================================================
  // JLPT 타자연습 급수 선택
  // ============================================================

  if (page === 'typingDifficulty') {

    return (
      <div className="app">

        <header className="header">

          <div className="logo">
            🇯🇵 にほんご
          </div>

          <nav>

            <button
              onClick={() => setPage('home')}
            >
              홈
            </button>

          </nav>

        </header>


        <main className="main">

          <section className="typing-difficulty-page">

            <button
              className="back-button"
              onClick={() => setPage('home')}
            >
              ← 홈으로 돌아가기
            </button>


            <p className="japanese">
              JLPT タイピング
            </p>


            <h1>
              JLPT 급수 선택
            </h1>


            <p className="difficulty-description">
              연습하고 싶은 JLPT 급수를 선택하세요.
            </p>


            <div className="difficulty-grid">

              {/* N5 */}

              <button
                className="difficulty-card"
                onClick={() =>
                  startTypingGame('N5')
                }
              >

                <div className="difficulty-icon">
                  N5
                </div>

                <h2>
                  JLPT N5
                </h2>

                <p>
                  가장 기초적인 일본어 단어
                </p>

                <span>
                  초급
                </span>

              </button>


              {/* N4 */}

              <button
                className="difficulty-card"
                onClick={() =>
                  startTypingGame('N4')
                }
              >

                <div className="difficulty-icon">
                  N4
                </div>

                <h2>
                  JLPT N4
                </h2>

                <p>
                  기본적인 일본어 단어
                </p>

                <span>
                  초급
                </span>

              </button>


              {/* N3 */}

              <button
                className="difficulty-card"
                onClick={() =>
                  startTypingGame('N3')
                }
              >

                <div className="difficulty-icon">
                  N3
                </div>

                <h2>
                  JLPT N3
                </h2>

                <p>
                  일상생활에서 사용하는 단어
                </p>

                <span>
                  중급
                </span>

              </button>


              {/* N2 */}

              <button
                className="difficulty-card"
                onClick={() =>
                  startTypingGame('N2')
                }
              >

                <div className="difficulty-icon">
                  N2
                </div>

                <h2>
                  JLPT N2
                </h2>

                <p>
                  조금 더 어려운 일본어 단어
                </p>

                <span>
                  중상급
                </span>

              </button>


              {/* N1 */}

              <button
                className="difficulty-card"
                onClick={() =>
                  startTypingGame('N1')
                }
              >

                <div className="difficulty-icon">
                  N1
                </div>

                <h2>
                  JLPT N1
                </h2>

                <p>
                  높은 수준의 일본어 단어
                </p>

                <span>
                  고급
                </span>

              </button>

            </div>

          </section>

        </main>


        <footer>

          <p>
            にほんご 공부 · Japanese Study
          </p>

        </footer>

      </div>
    )
  }


  // ============================================================
  // 타자연습
  // ============================================================

  if (page === 'typing') {

    const currentWord =
      words[typingIndex]

    return (
      <div className="app">

        <header className="header">

          <div className="logo">
            🇯🇵 にほんご
          </div>

          <nav>

            <button
              onClick={() => {
                setTypingStarted(false)
                setPage('home')
              }}
            >
              홈
            </button>

          </nav>

        </header>


        <main className="main">

          <section className="typing-page">

            <button
              className="back-button"
              onClick={() => {
                setTypingStarted(false)
                setPage('home')
              }}
            >
              ← 홈으로 돌아가기
            </button>


            <p className="japanese">
              タイピング
            </p>


            <h1>
              일본어 타자연습
            </h1>


           <div className="typing-info">

  <div>

    급수

    <strong>
      {typingLevel}
    </strong>

  </div>


  <div>

    남은 시간

    <strong>
      {typingTime}초
    </strong>

  </div>


  <div>

    점수

    <strong>
      {typingScore}점
    </strong>

  </div>


  <div>

    정답

    <strong>
      {typingCorrectCount}개
    </strong>

  </div>

</div>


            <div className="typing-card">

              <p className="typing-guide">
                아래 일본어를 로마자로 입력한 후 Enter를 눌러주세요.
              </p>


              <div className="typing-japanese">
                {currentWord.word}
              </div>


              <div className="typing-reading">
                {currentWord.reading}
              </div>


              {typingFeedback && (

  <div className="typing-feedback">

    {typingFeedback}

    {typingWrong && (

      <div className="typing-wrong-detail">

        <p>
          입력한 답 :
          <strong>
            {' '}
            {typingInput}
          </strong>
        </p>

        <p>
          정답 :
          <strong>
            {' '}
            {currentWord.romaji}
          </strong>
        </p>

        <p>
          뜻 :
          <strong>
            {' '}
            {currentWord.meaning}
          </strong>
        </p>


        <button
          className="quiz-next-button"
          onClick={() => {

            const levelWords = words.filter(
              (word) =>
                word.level === typingLevel
            )

            const randomIndex =
              Math.floor(
                Math.random() *
                levelWords.length
              )

            const nextWord =
              levelWords[randomIndex]

            setTypingIndex(
              words.indexOf(nextWord)
            )

            setTypingInput('')
            setTypingFeedback('')
            setTypingWrong(false)

          }}
        >
          다음 문제 →
        </button>

      </div>

    )}

  </div>

)}


              <input
                className="typing-input"
                type="text"
                value={typingInput}
                onChange={(event) =>
                  setTypingInput(event.target.value)
                }
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    checkTypingAnswer(typingInput)
                  }
                }}
                autoFocus
                placeholder="로마자를 입력하세요"
              />


              <p className="typing-hint">
                예: ねこ → neko → Enter
              </p>

            </div>

          </section>

        </main>


        <footer>

          <p>
            にほんご 공부 · Japanese Study
          </p>

        </footer>

      </div>
    )
  }


  // ============================================================
  // 타자연습 결과
  // ============================================================

  if (page === 'typingResult') {

    return (
      <div className="app">

        <header className="header">

          <div className="logo">
            🇯🇵 にほんご
          </div>

          <nav>

            <button
              onClick={() =>
                setPage('home')
              }
            >
              홈
            </button>

          </nav>

        </header>


        <main className="main">

          <section className="typing-result-page">

            <div className="result-icon">
              🎉
            </div>


            <p className="japanese">
              おつかれさまでした!
            </p>


            <h1>
              타자연습 완료!
            </h1>


            <p className="result-description">
  60초 동안 열심히 입력했어요!
</p>

<div className="typing-result-level">
  JLPT {typingLevel}
</div>


            <div className="result-card">

  <div className="result-score">

    <span>
      선택한 급수
    </span>

    <strong>
      {typingLevel}
    </strong>

  </div>


  <div className="result-score">

    <span>
      최종 점수
    </span>

    <strong>
      {typingScore}점
    </strong>

  </div>


  <div className="result-score">

    <span>
      맞힌 단어
    </span>

    <strong>
      {typingCorrectCount}개
    </strong>
  </div>

  <div className="result-score">
  <span>
    틀린 단어
  </span>

  <strong>
    {typingWrongCount}개
  </strong>
</div>

  <div className="result-score">
  <span>
    정답률
  </span>

  <strong>
    {typingTotalCount > 0
      ? `${Math.round(
          (typingCorrectCount / typingTotalCount) * 100
        )}%`
      : '0%'}
  </strong>
</div>

</div>


            <div className="result-buttons">

              <button
                className="quiz-next-button"
                onClick={() =>
                  startTypingGame(typingLevel)
                }
              >
                다시 도전하기
              </button>


              <button
                className="result-home-button"
                onClick={() =>
                  setPage('home')
                }
              >
                홈으로 돌아가기
              </button>

            </div>

          </section>

        </main>


        <footer>

          <p>
            にほんご 공부 · Japanese Study
          </p>

        </footer>

      </div>
    )
  }


  // 모든 페이지에 해당하지 않을 경우

  return null
}

export default App