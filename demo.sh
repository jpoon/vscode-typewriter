#!/bin/bash

#doitlive speed: 10000
#doitlive shell: /usr/local/bin/zsh
#doitlive prompt: nicolauj
#doitlive commentecho: true

## -------
## Install Yeoman Generator
npm install -g yo generator-code
yo code

## -------
## Open Code
## code --disable-extensions
code --locale=es
code --diff <file_1> <file_2>
code .
