setup:
	npm install

watch:
	NODE_ENV=development gulp

release:
	NODE_ENV=production gulp build

local_dump:
	mongodump --host localhost:27017 -o dump

restore_db:
	mongorestore --db oscar-granse dump/oscar-granse
