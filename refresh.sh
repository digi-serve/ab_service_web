# refresh.sh
# update and copy the expected files into place.

#!/bin/bash

# update our repos:
npm update

# update bpmnio fonts
rm -Rf ./assets/font/*
cp ./node_modules/bpmn-js/dist/assets/bpmn-font/font/* ./assets/font/.

# update tinymce plugins
rm -Rf ./assets/plugins/*
cp -r ./node_modules/tinymce/plugins ./assets
