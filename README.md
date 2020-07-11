# geneProject
* initial project
```sh
$ npm install
```
* start the project
```sh
$ npm start
```

* In the web API URL https://geneherokudb.herokuapp.com/


# Debug
* heroku use the asyns , the node version must >= 7.6.0
* use the async to await the database process , and get the response


# Heroku Remote update
* connect the heroku remote
```sh
$ heroku git:remote -a geneherokudb
```
* push the commit to heroku remote
```sh
$ git push --force heroku HEAD:master
```
