from fastapi import APIRouter, Depends, HTTPException
from os import environ
from values.bot import command
from service import bot_users as bot_users_service
from service import bot_users_messages as bot_users_messages_service
import telebot

router = APIRouter()
bot = telebot.TeleBot(environ['BOT_TOKEN'], parse_mode=None)

@bot.message_handler(commands=['start'])
def send_start(message):
    user = message.from_user
    bot_user = bot_users_service.get_bot_user(user.id)
    if bot_user is None:
        bot_user = bot_users_service.create_bot_user(user.id,
                                              user.username,
                                              user.first_name,
                                              user.last_name,
                                              user.language_code)
    print(bot_user)
    exit()
    text =  "Приве, " + user.first_name + "[" + bot_user.id + "]" + ". Я, Домовёнок, твой домашний помощник"
    bot.reply_to(message, text)

@bot.message_handler(commands=['chatid'])
def send_help(message):
    user = message.from_user
    text = str(user.id) +  ': ' + str(user.first_name)
    bot.reply_to(message, text)

@bot.message_handler(commands=['help'])
def send_help(message):
    bot.reply_to(message, command.getCommandsText())

@bot.message_handler(func=lambda m: True)
def echo_all(message):
    text = "Сам ты " + message.text
    bot.reply_to(message, text)

bot.infinity_polling()