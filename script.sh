#!/bin/bash

case "$(uname -s)" in
  Darwin)
    echo 'Mac OS X'
    OS='darwin'
  ;;
  Linux)
    echo 'Linux'
    OS='linux'
  ;;
  *)
    echo 'Unsupported OS'
    exit 1
esac

case "$1" in
  start)
    export NODE_ENV=dev
    export NODE_PATH=server
    nodemon server/bin/www.js
  ;;
  test)
    export NODE_ENV=test
    export NODE_PATH=server
    nyc mocha test/* --exit
  ;;
  *)
    echo "Usage: {start|test}"
    exit 1
  ;;
esac