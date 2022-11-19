const PORT = 8000
const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');

const app = express()

const url = 'https://www.allrecipes.com/recipes/198/holidays-and-events/thanksgiving/';

axios(url)
    .then(response => {
        const html = response.data
        const $ = cheerio.load(html)
        const recipes = []

        $('[id^="mntl-card-list-items_"]', html).each(function() {
            const title = $(this).find('.card__title-text ').text()
            const url = $(this).attr('href')
            recipes.push({
                title,
                url
            })
        })
        console.log(recipes)
    }).catch(err => console.log(err))

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))