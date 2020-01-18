This is an implementation of: https://medium.com/javascript-in-plain-english/full-stack-mongodb-react-node-js-express-js-in-one-simple-app-6cc8ed6de274

Forked from: https://github.com/manuquirozy/living-lab-app-repo

Combined with: https://medium.com/poka-techblog/simplify-your-javascript-use-map-reduce-and-filter-bd02c593cc2d

The changes are:

0. Removed the link to the original cloud account.

1. Wrote javascript method that takes the data (the entire table), and transforms the colum  `temperature` into an array and returns it.
That means you can show a specific entry of the datatable into the html/website.

What I have learned from this, is that, instead of making separate queries to get a specific region/entry of the data table in MongoDB, it appearently is conventional to copy the entire datatable into the application, every `x` (mili)seconds. And you can get whatever you want from this table by transforming its columns into arrays in the `app.js` which has the body/render of the html/website.

# How to install:
```
cd to ../client/
npm install
npm audit fix
cd to ../backend/
npm install
npm audit fix
```
Download mongodb from: https://www.mongodb.com/download-center/community
Select the complete install and just next everything.
Change the `E:` of the `.bat` files to whatever drive you put this repository in.
For mongodb create the folder for database storage, open cmd and:
```cd c:
mkdir data
cd data
mkdir db
```
That is it, now you can run the server by opening the 3 `.bat` files. 
To run server at startup, type:
```
start>run>shell:startup
```
and copy paste shortcuts to the `.bat` files in that folder. (SHORTCUTS, not the `.bat` files themselves.)

Try forwarding your port 80 to port 3000:
Source; https://tecadmin.net/set-up-reverse-proxy-using-iis/
Install:
https://www.iis.net/downloads/microsoft/url-rewrite
https://www.iis.net/downloads/microsoft/application-request-routing
start>run>inetmgr
Works for the outside world. Note, the front-end should not refer to localhost:3000 but to hiveminds.eu:3000

# How to use
To get an element from the mongoDB you must run the backend, and after that, in a separate cmd, run the front ent (client):
 If you get an error with npm start just type npm install <keyword> of error message, untill it doesn't give an error anymore. (repeat if the npm install gives an error as well).
0. look at https://github.com/a-t-0/living-lab-app-repo
open the project with netbeans
open cmd with administrative priviliges 
cd into subfolder /backend/`
npm install
npm start
Now the backend should be running. 
Then open a new cmd AS ADMIN
cd into the /client/ folder.
npm i ajv
npm install
npm install react-scripts
(Make sure you don't have any of the client files opened in notepad/netbeans when you do this)
then npm start then visit:http://localhost:3000/
(modify the `startupMongoDb.bat` to point to your own directory that contains `mongod.exe`.)

# Understanding: client: 
0. The `AppV2.js` connects to the MongoDB database named `fullstack_app` as specified in line 13 of `/backend/server.js/` containing:
```
const dbRoute = 'mongodb://localhost:27017/fullstack_app';
```
Within the database `fullstack_app` it searches in the collection named:`datas` which I can't find anywhere.  
1. Then the first table displays the elements of all the documents in the collection `datas` that are listed in the columns.  (line 50 to 82).
2. If the document contains an element with element name that is not specified in the table columns, the table will just show an empty row.
3. The line:
```
dat.temperature={data.map((dat) => dat.temperature)}
```
displays the temperature. and the right part of the equal sign folds the dat.temperature value to contain all the values of element type temperatures into a single row.
To understand how the arrow (lambda function) works, look here: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions


4. To get a specific element of a datatype E.g. temperature you can create a function, and put that above the html:
getSingleEntry(data) {
        var officersIds = [];
        data.forEach(function (data) {officersIds.push(data.temperature);})   
        console.log(officersIds[2]);
        return officersIds[2];
    }
5. In the html in the `App.js` you can write comments with: `{/*This is a comment example*/}`
6. `AppV5` puts the dropdownbox in the front end that is connected to the database and functions that can display a single element. It also has the option to add/modify elements of the dropdownbox.
7. use <script> to hide the output of a computation. The result is stored beyond/after the scope of the script.
8. `AppV8` : Made anyonymous function which is only called upon button click, using: https://stackoverflow.com/questions/14425397/onclick-function-runs-automatically 
9. `AppV9` Made a function that is not executed on loading site, passes parameter and is called on click, using: https://upmostly.com/tutorials/pass-a-parameter-through-onclick-in-react
10. `AppV10` Fills a dropdownbox with the column `Temperature` of a collection named datas in db `fullstack_app`.
11. You can make a backup of your mongoDB collections after you have downloaded the tools from: https://www.mongodb.com/download-center/community?jmp=docs
To export db, see instructions at: https://docs.mongodb.com/manual/reference/program/mongoexport/ use: mongoexport --collection=<collection name>
11.a Connection string = mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=false
11.b To run the server, use first create `c:/data\db`, then add `C:\Program Files\MongoDB\Server\4.2\bin` to path in environment variables `path`.
11.c then run `mongod.exe` (note the d.)
11.d In the future add C:\Program Files\MongoDB\Server\4.2\bin/mongod.exe to startup on your server.
12. To implement (one)/many to many relations just enter the document id to each respective collection, as explained in: http://blog.markstarkman.com/blog/2011/09/15/mongodb-many-to-many-relationship-data-modeling/
12.a so at university, add all the id's of the faculty, then at faculty, add the university.
12.b then at faculty, add bachelor and master, then at bachelor add faculty.
12.c then at e.g. bachelor, add courses, at courses at bachelor (OR master).

13. You can automate starting up the mongdb server with: 

14.a YOu can select the database in file: /backend/server.js 
14.b You can select the collection `faculties` in file `/backend/faculties.js` in line: `module.exports = mongoose.model("faculties", Faculties);`
14.c To read from a different collections from a single database, add the collections to the state, create a separate link in `server.js` and read it separately in `app.js`
14.d shown in: https://github.com/a-t-0/living-lab-app-repo/commit/0ccb45ed31e4d90648ba575b79caaae2dd2aa675

15. Working add to uni in: https://github.com/a-t-0/living-lab-app-repo/commit/a176a348d828167991010d41ba042b5f4fd985f8

17. `AppV17` has a function call from another method. Note these methods are not (yet classes), because I was not (yet) able to call a method/function from another class from another file. The example call is performed from file `test.js` at the top of `AppV17.js`. Now the `FormatChecks`,`ModifyDropdowns` and `getUniversities` to `getCourses` methods can be modified and put into another file.
18. `AppV18` contains the functionalities of FormatChecks, PutDataInDb sperated into files and cleaned commented code.
19. `AppV19` contains the first attemt to populate the dropdownboxes with university data.
20. `AppV20` contains the code to fill the dropdownbox with all faculty names. (To pass an array of something to a function, just pass the exact same thing that prints the row of the array content, e.g.:
```
<button onClick={() => ModifyDropdowns.fillDropdownWithArr(faculties.map((dat) => dat.name))}>Greet</button>	
```
21. `AppV21` Implemented an automatic update in ModifyDropdownsV0 of the dropdownbox to which an entry has been added.
22. `AppV22` Read the current value from the dropdownbox with `selectBox.options[selectBox.selectedIndex].label` in `ModifyDropdownsV0`. 
23. `AppV23` Has the verification question implemented that asks the user whether the dropdownboxes are matching the new faculty/masters/bachelors/course.
24. `AppV24` Has a separate periodic loop that checks for new entries to the system, and implements the many-to-many database relations.