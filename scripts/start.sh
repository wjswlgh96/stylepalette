#!/bin/bash
cd /home/ubuntu/stylepalette/server/

export DATABASE_USER=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_USER --query Parameters[0].Value | sed 's/"//g')
export DATABASE_PASSWORD=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_PASSWORD --query Parameters[0].Value | sed 's/"//g')
export DATABASE_PORT=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_PORT --query Parameters[0].Value | sed 's/"//g')
export DATABASE_HOST=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_HOST --query Parameters[0].Value | sed 's/"//g')
export DATABASE=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE --query Parameters[0].Value | sed 's/"//g')
export ACCESS_SECRET=$(aws ssm get-parameters --region ap-northeast-2 --names ACCESS_SECRET --query Parameters[0].Value | sed 's/"//g')
export REGION=$(aws ssm get-parameters --region ap-northeast-2 --names REGION --query Parameters[0].Value | sed 's/"//g')
export IDENTITYPOOLID=$(aws ssm get-parameters --region ap-northeast-2 --names IDENTITYPOOLID --query Parameters[0].Value | sed 's/"//g')
export ACCESS_KEY_ID=$(aws ssm get-parameters --region ap-northeast-2 --names ACCESS_KEY_ID --query Parameters[0].Value | sed 's/"//g')
export ACCESS_KEY_PASSWORD=$(aws ssm get-parameters --region ap-northeast-2 --names ACCESS_KEY_PASSWORD --query Parameters[0].Value | sed 's/"//g')
export GOOGLE_CLIENT_ID=$(aws ssm get-parameters --region ap-northeast-2 --names GOOGLE_CLIENT_ID --query Parameters[0].Value | sed 's/"//g')
export GOOGLE_CLIENT_SECRET=$(aws ssm get-parameters --region ap-northeast-2 --names GOOGLE_CLIENT_SECRET --query Parameters[0].Value | sed 's/"//g')
export KAKAO_CLIENT_ID=$(aws ssm get-parameters --region ap-northeast-2 --names KAKAO_CLIENT_ID --query Parameters[0].Value | sed 's/"//g')

cd /home/ubuntu/stylepalette/server/src/build

authbind --deep pm2 stop index.js
authbind --deep pm2 start index.js