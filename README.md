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

# Procfile
* procfile is heroku first read file in start server


# Subsystem description
* DMS: Disease Manager Subsystem
* PMS: Patient Manager Subsystem
* PGMS: Patient Gene Manger Subsystem
* MGMS: Match Gene Manager Subsystem
* PGRMS: Preterm Gene Reference Management Subsystem