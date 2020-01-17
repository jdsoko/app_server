const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

app.use(morgan('common'));
app.use(cors());

const apps = require('./apps-data.js');

app.get('/apps', (req, res) => {
    const { sort, genres = "" } = req.query;

    if(sort){
        if(!['Rating', 'App'].includes(sort)){
            return res
                .status(400)
                .send('Sort must be either rating or app');
        }
    }

    

   let results = apps
        .filter(app =>
            app
            .Genres
            .includes(genres));


     results.sort((a, b) => {
        return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
    });
    
            


    if(results.length >= 1){
        res
        .json(results)
    }

    else{
        res
        .send('Please enter a valid genre')
    }
   
});

app.listen(8000, () => {
    console.log('Server started on PORT 8000')
})