#!/bin/bash
cp -rf BidOnBuy/client/buld/* /usr/share/nginx/html/
sudo systemctl start nginx
