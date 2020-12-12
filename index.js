const config = require('./config/config')
const TOKEN = config.TOKEN;
const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const mongoose = require('mongoose');
// connect telegram


const bot = new TelegramBot(config.TOKEN, {polling:true})

mongoose.connect(config.DB, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Bazaga bog`landik');
    })
    .catch((err) => {
        console.log(`Bazaga ulanishda hato mavjud  ${err}`);
    })


bot.onText(/\/start/, msg => {
    bot.sendMessage(msg.chat.id, `An Anfield PS`, {
        reply_markup: {
            keyboard: [
                [{
                    text: 'PlayStation Manzili',
                    request_location: true
                }],
                ['PS turlari', 'Admin']
            ],
            resize_keyboard: true
        }
    })
});

bot.onText(/PS turlari/, msg => {
    bot.sendMessage(msg.chat.id, 'PS turlari', {
        reply_markup: {
            keyboard: [
                [' PlayStation3 ', 'PlayStation4']
            ],resize_keyboard: true
        }
    })
})


bot.onText(/Admin/, msg => {
    bot.sendContact(msg.chat.id, '+998937133822', 'Ixtiyor');
})

bot.onText(/PlayStation3/, msg => {
    bot.sendMessage(msg.chat.id, 'PlayStation3 ', {
        reply_markup: {
            inline_keyboard: [
                [{
                    text: ' PS 1 - stol',
                    callback_data: 'birinchi'
                }, {
                    text: ' PS 2 - stol',
                    callback_data: 'ikkinchi'
                }],
                [{
                    text: ' PS 3 - stol',
                    callback_data: 'uchinchi'
                }, {
                    text: ' PS 4 - stol',
                    callback_data: 'turtinchi'
                }]
            ]
        }
    })
});

bot.onText(/PlayStation4/, msg => {
    bot.sendMessage(msg.chat.id, 'PlayStation4 ', {
        reply_markup: {
            inline_keyboard: [
                [{
                    text: ' PS 5 - stol',
                    callback_data: 'beshinchi'
                }, {
                    text: ' PS 6 - stol',
                    callback_data: 'oltinchi'
                }]
            ]
        }
    })
});

bot.on('callback_query', query => {

    switch (query.data) {
        case 'birinchi': {
            bot.sendMessage(query.message.chat.id, 'Birinchi so`rov');
            bot.answerCallbackQuery(query.id, query.id);
            break;
        }
        case 'ikkinchi': {
            bot.sendMessage(query.message.chat.id, 'Ikkinchi so`rov');
            bot.answerCallbackQuery(query.id, query.id);
            break;
        }
        case 'uchinchi': {
            bot.sendMessage(query.message.chat.id, 'Uchinchi so`rov');
            bot.answerCallbackQuery(query.id, query.id);
            break;
        }
        case 'turtinchi': {
            bot.sendMessage(query.message.chat.id, 'turtinchi so`rov');
            bot.answerCallbackQuery(query.id, query.id);
            break;
        }
        case 'beshinchi': {
            bot.sendMessage(query.message.chat.id, 'beshinchi so`rov');
            bot.answerCallbackQuery(query.id, query.id);
            break;
        }
        case 'oltinchi': {
            bot.sendMessage(query.message.chat.id, 'oltinchi so`rov');
            bot.answerCallbackQuery(query.id, query.id);
            break;
        }
    }

})
