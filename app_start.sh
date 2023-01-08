#!/bin/bash
sudo amazon-linux-extras install nginx1 -y
yum install nginx -y
sudo systemctl start nginx
