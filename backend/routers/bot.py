from fastapi import APIRouter, Depends, HTTPException
from os import environ
from values.bot import command
import telebot

router = APIRouter()
bot = telebot.TeleBot(environ['BOT_TOKEN'], parse_mode=None)

@bot.message_handler(commands=['start'])
def send_start(message):
    user = message.from_user
    text =  "Приве, " + user.first_name + ". Я, Домовёнок, твой домашний помощник"
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