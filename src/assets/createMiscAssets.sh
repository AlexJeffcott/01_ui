#!/bin/sh

IFS="|"
################### create words object #################
rm -f ../__mocks__/misc.js

echo "export const misc = [" > ../__mocks__/misc.js

while read line; do
  read en it de <<< "${line}"
  id="_${en}"
  echo "  {
    id: '${id}',
    text_en: '${en}',
    audioId_en: '${id}_en',
    text_it: '${it}',
    audioId_it: '${id}_it',
    text_de: '${de}',
    audioId_de: '${id}_de',
    imgId: '${id}'
  }," >> ../__mocks__/misc.js
done < assetsMisc.txt

echo "]" >> ../__mocks__/misc.js

##############################################################################################################
##############################################################################################################
##############################################################################################################
##############################################################################################################
################# create imports and exports for assets ######################################################
#rm -f miscAssetsExports.js
#echo "// import visual assets" >> miscAssetsExports.js
#while read line; do
#  read en it de <<< "${line}"
#  id="_${en}"
#  echo "import ${id} from \"./${id}/${id}.png\"" >> miscAssetsExports.js
#done < assetsMisc.txt
#echo "import defaultUser from \"./defaultUser/defaultUser.png\"" >> miscAssetsExports.js
#echo "
#// import audio assets for en, it and de" >> miscAssetsExports.js
#while read line; do
#  read en it de <<< "${line}"
#  id="_${en}"
#  echo "import ${id}_en from \"./${id}/${id}_en.mp3\"
#import ${id}_it from \"./${id}/${id}_it.mp3\"
#import ${id}_de from \"./${id}/${id}_de.mp3\"" >> miscAssetsExports.js
#done < assetsMisc.txt
#echo "
#// export visual assets
#export const imgs = {" >> miscAssetsExports.js
#while read line; do
#  read en it de <<< "${line}"
#  id="_${en}"
#  echo "  ${id}," >> miscAssetsExports.js
#done < assetsMisc.txt
#echo "  defaultUser," >> miscAssetsExports.js
#echo "}
#// export audio assets
#export const audio = {" >> miscAssetsExports.js
#while read line; do
#  read en it de <<< "${line}"
#  id="_${en}"
#  echo "  ${id}_en,
#  ${id}_it,
#  ${id}_de," >> miscAssetsExports.js
#done < assetsMisc.txt
#
#echo "}" >> miscAssetsExports.js

##############################################################################################################
##############################################################################################################
##############################################################################################################
##############################################################################################################
################## create audio assets for words #############################################################
#while read line; do
#  read en it de <<< "${line}"
#  id="_${en}"
#  mkdir "${id}"

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
#  base64 temp.txt --decode > "${id}/${id}_en.mp3"
#  rm -f temp.txt

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
#  base64 temp.txt --decode > "${id}/${id}_it.mp3"
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
#  base64 temp.txt --decode > "${id}/${id}_de.mp3"
#  rm -f temp.txt
#
#done < assetsMisc.txt
