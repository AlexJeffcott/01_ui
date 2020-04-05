// import all assets
import { wordImgs, wordAudio } from './wordAssetsExports'
import { numberImgs, numberAudio } from './numberAssetsExports'
import { phraseImgs, phraseAudio } from './phraseAssetsExports'
import { miscImgs, miscAudio } from './miscAssetsExports'

const audio = {
  ...wordAudio,
  ...numberAudio,
  ...phraseAudio,
  ...miscAudio
}

const imgs = {
  ...wordImgs,
  ...numberImgs,
  ...phraseImgs,
  ...miscImgs
}

// export all assets
export { imgs, audio }
