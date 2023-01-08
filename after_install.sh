#!/bin/bash
cd client/
npm install --force
npm run build
cp -rf build/* /usr/share/nginx/html/


