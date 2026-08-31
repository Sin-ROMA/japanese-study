const hiragana = [
  { character: 'あ', pronunciation: '아', romaji: 'a', example: 'あめ', exampleRomaji: 'ame', meaning: '비' },
  { character: 'い', pronunciation: '이', romaji: 'i', example: 'いぬ', exampleRomaji: 'inu', meaning: '개' },
  { character: 'う', pronunciation: '우', romaji: 'u', example: 'うみ', exampleRomaji: 'umi', meaning: '바다' },
  { character: 'え', pronunciation: '에', romaji: 'e', example: 'えき', exampleRomaji: 'eki', meaning: '역' },
  { character: 'お', pronunciation: '오', romaji: 'o', example: 'おちゃ', exampleRomaji: 'ocha', meaning: '차' },

  { character: 'か', pronunciation: '카', romaji: 'ka', example: 'かさ', exampleRomaji: 'kasa', meaning: '우산' },
  { character: 'き', pronunciation: '키', romaji: 'ki', example: 'き', exampleRomaji: 'ki', meaning: '나무' },
  { character: 'く', pronunciation: '쿠', romaji: 'ku', example: 'くるま', exampleRomaji: 'kuruma', meaning: '자동차' },
  { character: 'け', pronunciation: '케', romaji: 'ke', example: 'けさ', exampleRomaji: 'kesa', meaning: '오늘 아침' },
  { character: 'こ', pronunciation: '코', romaji: 'ko', example: 'こえ', exampleRomaji: 'koe', meaning: '목소리' },

  { character: 'さ', pronunciation: '사', romaji: 'sa', example: 'さかな', exampleRomaji: 'sakana', meaning: '물고기' },
  { character: 'し', pronunciation: '시', romaji: 'shi', example: 'しお', exampleRomaji: 'shio', meaning: '소금' },
  { character: 'す', pronunciation: '스', romaji: 'su', example: 'すし', exampleRomaji: 'sushi', meaning: '초밥' },
  { character: 'せ', pronunciation: '세', romaji: 'se', example: 'せんせい', exampleRomaji: 'sensei', meaning: '선생님' },
  { character: 'そ', pronunciation: '소', romaji: 'so', example: 'そら', exampleRomaji: 'sora', meaning: '하늘' },

  { character: 'た', pronunciation: '타', romaji: 'ta', example: 'たまご', exampleRomaji: 'tamago', meaning: '달걀' },
  { character: 'ち', pronunciation: '치', romaji: 'chi', example: 'ちず', exampleRomaji: 'chizu', meaning: '지도' },
  { character: 'つ', pronunciation: '츠', romaji: 'tsu', example: 'つき', exampleRomaji: 'tsuki', meaning: '달' },
  { character: 'て', pronunciation: '테', romaji: 'te', example: 'て', exampleRomaji: 'te', meaning: '손' },
  { character: 'と', pronunciation: '토', romaji: 'to', example: 'とけい', exampleRomaji: 'tokei', meaning: '시계' },

  { character: 'な', pronunciation: '나', romaji: 'na', example: 'なつ', exampleRomaji: 'natsu', meaning: '여름' },
  { character: 'に', pronunciation: '니', romaji: 'ni', example: 'にく', exampleRomaji: 'niku', meaning: '고기' },
  { character: 'ぬ', pronunciation: '누', romaji: 'nu', example: 'ぬの', exampleRomaji: 'nuno', meaning: '천' },
  { character: 'ね', pronunciation: '네', romaji: 'ne', example: 'ねこ', exampleRomaji: 'neko', meaning: '고양이' },
  { character: 'の', pronunciation: '노', romaji: 'no', example: 'のみもの', exampleRomaji: 'nomimono', meaning: '음료' },

  { character: 'は', pronunciation: '하', romaji: 'ha', example: 'はな', exampleRomaji: 'hana', meaning: '꽃' },
  { character: 'ひ', pronunciation: '히', romaji: 'hi', example: 'ひと', exampleRomaji: 'hito', meaning: '사람' },
  { character: 'ふ', pronunciation: '후', romaji: 'fu', example: 'ふゆ', exampleRomaji: 'fuyu', meaning: '겨울' },
  { character: 'へ', pronunciation: '헤', romaji: 'he', example: 'へや', exampleRomaji: 'heya', meaning: '방' },
  { character: 'ほ', pronunciation: '호', romaji: 'ho', example: 'ほし', exampleRomaji: 'hoshi', meaning: '별' },

  { character: 'ま', pronunciation: '마', romaji: 'ma', example: 'まど', exampleRomaji: 'mado', meaning: '창문' },
  { character: 'み', pronunciation: '미', romaji: 'mi', example: 'みず', exampleRomaji: 'mizu', meaning: '물' },
  { character: 'む', pronunciation: '무', romaji: 'mu', example: 'むし', exampleRomaji: 'mushi', meaning: '벌레' },
  { character: 'め', pronunciation: '메', romaji: 'me', example: 'め', exampleRomaji: 'me', meaning: '눈' },
  { character: 'も', pronunciation: '모', romaji: 'mo', example: 'もり', exampleRomaji: 'mori', meaning: '숲' },

  { character: 'や', pronunciation: '야', romaji: 'ya', example: 'やま', exampleRomaji: 'yama', meaning: '산' },
  { character: 'ゆ', pronunciation: '유', romaji: 'yu', example: 'ゆき', exampleRomaji: 'yuki', meaning: '눈' },
  { character: 'よ', pronunciation: '요', romaji: 'yo', example: 'よる', exampleRomaji: 'yoru', meaning: '밤' },

  { character: 'ら', pronunciation: '라', romaji: 'ra', example: 'らいげつ', exampleRomaji: 'raigetsu', meaning: '다음 달' },
  { character: 'り', pronunciation: '리', romaji: 'ri', example: 'りんご', exampleRomaji: 'ringo', meaning: '사과' },
  { character: 'る', pronunciation: '루', romaji: 'ru', example: 'るす', exampleRomaji: 'rusu', meaning: '부재' },
  { character: 'れ', pronunciation: '레', romaji: 're', example: 'れいぞうこ', exampleRomaji: 'reizouko', meaning: '냉장고' },
  { character: 'ろ', pronunciation: '로', romaji: 'ro', example: 'ろうそく', exampleRomaji: 'rousoku', meaning: '양초' },

  { character: 'わ', pronunciation: '와', romaji: 'wa', example: 'わたし', exampleRomaji: 'watashi', meaning: '나' },
  { character: 'を', pronunciation: '오', romaji: 'wo', example: 'みずを', exampleRomaji: 'mizu wo', meaning: '물을' },
  { character: 'ん', pronunciation: '응', romaji: 'n', example: 'ほん', exampleRomaji: 'hon', meaning: '책' },
]

export default hiragana