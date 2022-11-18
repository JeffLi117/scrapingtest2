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

        $('.comp mntl-card-list-items mntl-document-card mntl-card card card--no-image', html).each(function() {
            const title = $(this).find('span.card__title-text ').text()
            const url = $(this).find('a').attr('href')
            recipes.push({
                title,
                url
            })
        })
        console.log(recipes)
    }).catch(err => console.log(err))

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))