#!/bin/sh

################## create numbers object #################
#rm -f ../__mocks__/numbers.js
#echo "export const numbers = [" > ../__mocks__/numbers.js
#while read number; do
#  id="id_${number}"
#  echo "  {
#    id: '${id}',
#    text_en: '${number}',
#    audioId_en: '${id}_en',
#    text_it: '${number}',
#    audioId_it: '${id}_it',
#    text_de: '${number}',
#    audioId_de: '${id}_de',
#    imgId: '${id}'
#  }," >> ../__mocks__/numbers.js
#done < assetsNumbers.txt
#echo "]" >> ../__mocks__/numbers.js

##############################################################################################################
##############################################################################################################
##############################################################################################################
##############################################################################################################
################# create imports and exports for assets ######################################################
#rm -f numberAssetsExports.js
#echo "// import visual assets" >> numberAssetsExports.js
#while read number; do
#  id="id_${number}"
#  echo "import ${id} from \"./${id}/${id}.png\"" >> numberAssetsExports.js
#done < assetsNumbers.txt
#
#echo "
#// import audio assets for en, it and de" >> numberAssetsExports.js
#while read number; do
#  id="id_${number}"
#  echo "import ${id}_en from \"./${id}/${id}_en.mp3\"
#import ${id}_it from \"./${id}/${id}_it.mp3\"
#import ${id}_de from \"./${id}/${id}_de.mp3\"" >> numberAssetsExports.js
#done < assetsNumbers.txt
#
#echo "
#// export visual assets
#export const numberImgs = {" >> numberAssetsExports.js
#while read number; do
#  id="id_${number}"
#  echo "  ${id}," >> numberAssetsExports.js
#done < assetsNumbers.txt
#
#echo "}
#
#// export audio assets
#export const numberAudio = {" >> numberAssetsExports.js
#while read number; do
#  id="id_${number}"
#  echo "  ${id}_en,
#  ${id}_it,
#  ${id}_de," >> numberAssetsExports.js
#
#done < assetsNumbers.txt
#
#echo "}" >> numberAssetsExports.js

##############################################################################################################
##############################################################################################################
##############################################################################################################
##############################################################################################################
################## create audio assets for words #############################################################
#while read number; do
#  id="id_${number}"
#  mkdir "${id}"

################# get UK English audio #################
#request="{
#  'input':{
#    'text':'${number}'
#  },
#  'voice':{
#    'languageCode':'en-gb',
#    'name':'en-GB-Wavenet-C',
#    'ssmlGender':'FEMALE'
#  },
#  'audioConfig':{
#    'audioEncoding':'MP3'
#  }
#}"
#  # shellcheck disable=SC2046
#  curl -s -X POST -H "Authorization: Bearer $(gcloud auth application-default print-access-token)" -H "Content-Type: application/json; charset=utf-8" --data-binary "${request}" https://texttospeech.googleapis.com/v1/text:synthesize | awk -F'"' '$2=="audioContent"{printf("%s", $4)}' > temp.txt
#  base64 temp.txt --decode > "${id}/${id}_en.mp3"
#  rm -f temp.txt

################### get Italian audio #################
#request="{
#  'input':{
#    'text':'${number}'
#  },
#  'voice':{
#    'languageCode':'it-IT',
#    'name':'it-IT-Wavenet-B',
#    'ssmlGender':'FEMALE'
#  },
#  'audioConfig':{
#    'audioEncoding':'MP3'
#  }
#}"
#  # shellcheck disable=SC2046
#  curl -s -X POST -H "Authorization: Bearer $(gcloud auth application-default print-access-token)" -H "Content-Type: application/json; charset=utf-8" --data-binary "${request}" https://texttospeech.googleapis.com/v1/text:synthesize | awk -F'"' '$2=="audioContent"{printf("%s", $4)}' > temp.txt
#  base64 temp.txt --decode > "${id}/${id}_it.mp3"
#  rm -f temp.txt

################## get German audio #################
#request="{
#  'input':{
#    'text':'${number}'
#  },
#  'voice':{
#    'languageCode':'de-DE',
#    'name':'de-DE-Wavenet-C',
#    'ssmlGender':'FEMALE'
#  },
#  'audioConfig':{
#    'audioEncoding':'MP3'
#  }
#}"
#  # shellcheck disable=SC2046
#  curl -s -X POST -H "Authorization: Bearer $(gcloud auth application-default print-access-token)" -H "Content-Type: application/json; charset=utf-8" --data-binary "${request}" https://texttospeech.googleapis.com/v1/text:synthesize | awk -F'"' '$2=="audioContent"{printf("%s", $4)}' > temp.txt
#  base64 temp.txt --decode > "${id}/${id}_de.mp3"
#  rm -f temp.txt

#done < assetsNumbers.txt
