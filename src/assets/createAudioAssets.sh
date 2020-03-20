#!/bin/sh
# brew install ffmpeg

rm -f ../__mocks__/index.js
echo "export const questions = [" > ../__mocks__/index.js

rm -f *.aiff

while read line; do
  read en it de <<< "$( echo "${line}" | awk "{print $1 $2 $3}" )"
#  echo "$en"
#  echo "$it"
#  echo "$de"

#  /usr/bin/say -v Alice "$it" -o "$en"_it.aiff
#  /usr/local/Cellar/ffmpeg/4.2.2_2/bin/ffmpeg -i "$en"_it.aiff "$id"/"$en"_it.mp3 < /dev/null
#  rm -f "$en"_it.aiff

#  /usr/bin/say -v Serena "$en" -o "$en"_en.aiff
##  /usr/local/Cellar/ffmpeg/4.2.2_2/bin/ffmpeg -i "$en"_en.aiff "$en"/"$en"_en.mp3 < /dev/null
##  rm -f "$en"_en.aiff

#  /usr/bin/say -v Serena "$de" -o "$en"_de.aiff
#  /usr/local/Cellar/ffmpeg/4.2.2_2/bin/ffmpeg -i "$en"_de.aiff "$en"/"$en"_de.mp3 < /dev/null
#  rm -f "$en"_de.aiff

echo "    {
        id: '${en}',
        text_en: '${en}',
        audioId_en: '${en}_en',
        text_it: '${it}',
        audioId_it: '${it}_it',
        text_de: '${de}',
        audioId_de: '${de}_de',
        imgId: '${en}',
    }," >> ../__mocks__/index.js

done < assetList.txt

echo "]" >> ../__mocks__/index.js