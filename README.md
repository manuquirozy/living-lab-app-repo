This is an implementation of: https://medium.com/javascript-in-plain-english/full-stack-mongodb-react-node-js-express-js-in-one-simple-app-6cc8ed6de274

Forked from: https://github.com/manuquirozy/living-lab-app-repo

Combined with: https://medium.com/poka-techblog/simplify-your-javascript-use-map-reduce-and-filter-bd02c593cc2d

The changes are:
0. Removed the link to the original cloud account.
1. Wrote javascript method that takes the data (the entire table), and transforms the colum  `temperature` into an array and returns it.
That means you can show a specific entry of the datatable into the html/website.

What I have learned from this, is that, instead of making separate queries to get a specific region/entry of the data table in MongoDB, it appearently is conventional to copy the entire datatable into the application, every `x` (mili)seconds. And you can get whatever you want from this table by transforming its columns into arrays in the `app.js` which has the body/render of the html/website.
