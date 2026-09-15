import n5 from './jlpt/n5_ko.json'
import n4 from './jlpt/n4_ko.json'
import n3 from './jlpt/n3_ko.json'
import n2 from './jlpt/n2_ko.json'
import n1 from './jlpt/n1_ko.json'

const normalizeWords = (data) =>
  data.words.map((item, index) => ({
    id: index + 1,
    word: item.word,
    reading: item.kana,
    romaji: item.romaji?.[0] || '',
    meaning: item.koreanMeaning || item.meaning,
    level: item.jlptLevel,
    example: item.example || '',
    exampleRomaji: item.exampleRomaji || '',
    exampleMeaning: item.exampleMeaning || ''
  }))

const words = [
  ...normalizeWords(n5),

  ...normalizeWords(n4).map((word, index) => ({
    ...word,
    id: n5.words.length + index + 1
  })),

  ...normalizeWords(n3).map((word, index) => ({
    ...word,
    id: n5.words.length + n4.words.length + index + 1
  })),

  ...normalizeWords(n2).map((word, index) => ({
    ...word,
    id:
      n5.words.length +
      n4.words.length +
      n3.words.length +
      index +
      1
  })),

  ...normalizeWords(n1).map((word, index) => ({
    ...word,
    id:
      n5.words.length +
      n4.words.length +
      n3.words.length +
      n2.words.length +
      index +
      1
  }))
]

export default words