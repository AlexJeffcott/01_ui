#!/bin/sh

################## create mock questions object #################
#rm -f ../__mocks__/questions.js
#echo "export const questions = [" > ../__mocks__/questions.js
#while read line; do
#  read en it de <<< "$( echo "${line}" | awk "{print $1 $2 $3}" )"
#  echo "  {
#    id: '${en}',
#    text_en: '${en}',
#    audioId_en: '${en}_en',
#    text_it: '${it}',
#    audioId_it: '${en}_it',
#    text_de: '${de}',
#    audioId_de: '${en}_de',
#    imgId: '${en}'
#  }," >> ../__mocks__/index.js
#done < assetList.txt
#echo "]" >> ../__mocks__/index.js

##############################################################################################################
##############################################################################################################
##############################################################################################################
##############################################################################################################
################# create imports and exports for assets ######################################################
#rm -f index.js
#echo "// import visual assets" >> index.js
#while read line; do
#  read en it de <<< "$( echo "${line}" | awk "{print $1 $2 $3}" )"
#  echo "import ${en} from \"./${en}/${en}.png\"" >> index.js
#done < assetList.txt
#echo "import defaultUser from \"./defaultUser/defaultUser.png\"" >> index.js
#echo "
#// import audio assets for en, it and de" >> index.js
#while read line; do
#  read en it de <<< "$( echo "${line}" | awk "{print $1 $2 $3}" )"
#  echo "import ${en}_en from \"./${en}/${en}_en.mp3\"
#import ${en}_it from \"./${en}/${en}_it.mp3\"
#import ${en}_de from \"./${en}/${en}_de.mp3\"" >> index.js
#done < assetList.txt
#echo "
#// export visual assets
#export const imgs = {" >> index.js
#while read line; do
#  read en it de <<< "$( echo "${line}" | awk "{print $1 $2 $3}" )"
#  echo "  ${en}," >> index.js
#done < assetList.txt
#echo "  defaultUser," >> index.js
#echo "}
#// export audio assets
#export const audio = {" >> index.js
#while read line; do
#  read en it de <<< "$( echo "${line}" | awk "{print $1 $2 $3}" )"
#  echo "  ${en}_en,
#  ${en}_it,
#  ${en}_de," >> index.js
#done < assetList.txt
#echo "}" >> index.js

##############################################################################################################
##############################################################################################################
##############################################################################################################
##############################################################################################################
################## create audio assets #######################################################################
#while read line; do
#  read en it de <<< "$( echo "${line}" | awk "{print $1 $2 $3}" )"
#  echo "$en"
#  echo "$it"
#  echo "$de"
#  mkdir "${en}"

################## get UK English audio #################
#request="{
#  'input':{
#    'text':'${en}'
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
#  base64 temp.txt --decode > "${en}/${en}_en.mp3"
#  rm -f temp.txt
#
################### get Italian audio #################
#request="{
#  'input':{
#    'text':'${it}'
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
#  base64 temp.txt --decode > "${en}/${en}_it.mp3"
#  rm -f temp.txt

################## get German audio #################
#request="{
#  'input':{
#    'text':'${de}'
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
#  base64 temp.txt --decode > "${en}/${en}_de.mp3"
#  rm -f temp.txt
#
#done < assetList.txt
