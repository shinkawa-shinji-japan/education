<!-- docker-compose run --rm db mysql -u root -p -->

# 環境構築メモ（見なくていいよ）

```yml:docker-compose.yml
version: "3"
services:
  #######################################
  # マケプレ （Next.js + TypeScript）
  #######################################
  front_end:
    image: node:16-alpine
    working_dir: /usr/src/app
    volumes:
      - ./front_end/:/usr/src/app
    # command: "yarn dev"
    tty: true
    ports:
      - "9001:3000"

  #######################################
  # API  （Node.js（Expreess） + TypeScript）
  #######################################
  api:
    image: node:14
    working_dir: /usr/src/app
    volumes:
      - ./api/:/usr/src/app
    depends_on:
      - db
    tty: true
    ports:
      - "9002:3000"
    # command: "yarn dev"

  #######################################
  # Database (MySQL v8)
  #######################################
  db:
    image: mysql:8.0
    command: --default-authentication-plugin=mysql_native_password
    environment:
      MYSQL_ROOT_PASSWORD: example
    ports:
      - "3306:3306"
```

docker-compose up

docker exec -it 5e8da775d7202cafd44e3c3ecf2168d56a15e92b2af1963a3bfb8e691743da60 sh
next.js 構築 ref: https://nextjs.org/docs
yarn create next-app --typescript

docker exec -it d72852e78825fa5516972c848926b0d19790195b35378578bdd65771ca1beecb bash
express 構築 re: https://blog.logrocket.com/how-to-set-up-node-typescript-express/
npm init --yes
touch index.js

# 初期構築

```bash
# git clone
git clone git@github.com:shinkawa-shinji-japan/education.git

# 初期構築 (初回のみ必須 + Gitで誰かがパッケージを追加した時に必須)
docker-compose run --rm front_end yarn # front のパッケージをインストール
docker-compose run --rm api yarn # api のパッケージをインストール
```

# 遊ぼう

```bash
# 起動
docker-compose up # 全コンテナ(front,api,db)を起動
# docker-compose up front_end # 起動(frontのみ)
# docker-compose up api # 起動(apiのみ)
# ※止めるときは「ctrl + c」

# 起動 （バックグラウンド実行）
docker-compose up -d # 全コンテナ(front,api,db)を起動
docker ps # 起動確認
docker-compose stop # 停止


docker-compose exec db sh # mysql コンテナにログイン
mysql -u root -p # パスワードは example を入力する
show databases; # 今あるDBを確認
```
