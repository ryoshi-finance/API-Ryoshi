require('../../../../models/NewsModel');

import mongoose from 'mongoose';
const NewsModel = mongoose.model('NewsModel');
const urls =  require('../../../../modules/Feeds');
const { Telegraf } = require('telegraf')
const bot = new Telegraf('5130804289:AAHDoOi1hvatN6dZAatAqQX7IX18bPKDd_w')

let Parser = require('rss-parser');
let parser = new Parser();
var psl = require('psl');


module.exports = (req, res, next) => {

    const list = urls();
    const random = Math.floor(Math.random() * list.length);

    let feed = parser.parseURL(list[random]);

    feed.then((data) => {

        data.items.forEach((e,i,a) => {

            NewsModel.find({title: e.title, guid: e.guid}, (er, doc) => {

                if(doc.length <= 0){
                    var parsed = psl.parse(e.guid);

                    let nw = new NewsModel({
                        autor: e.creator,
                        title: e.title,
                        link: e.link,
                        content: e.content,
                        snippet: e.contentSnippet,
                        guid: e.guid,
                        tag: e.categories,
                        pubDate: e.pubDate,
                        website: parsed.domain,
                        full: e.description
                    });

                    nw.save(() => {
                        bot.telegram.sendMessage('-1001278143866', `Metadex News: ${e.title} ${e.link}`);
                        bot.launch();
                        console.log('Inserted True');
                    });

                }

            });

        });



    });

}
