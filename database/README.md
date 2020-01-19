### sequelize-cli commands

npx sequelize db:migrate
NODE_ENV=test npx sequelize db:migrate

npx sequelize db:migrate
npx sequelize db:migrate:undo
npx sequelize-cli db:migrate:undo:all --to XXXXXXXXXXXXXX-create-posts.js

npx sequelize-cli db:seed:all
npx sequelize-cli db:seed:undo:all
npx sequelize-cli db:seed:undo --seed name-of-seed-as-in-data

### use of mysqldump

mysqldump -uroot -p --databases assist > db.assist.sql

mysql -uroot -p < db.assist.sql