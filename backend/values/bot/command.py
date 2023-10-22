commands = {
    'start': {
        'command':'/start',
        'description':'Начать работу',
        'icon':'empty'
    },
    'help': {
        'command':'/help',
        'description':'Справка',
        'icon':'empty'
    },
    'chatid': {
        'command': '/chatid',
        'description': 'Получить ID часта',
        'icon': 'empty'
    },
    'statistics': {
        'command': '/statistics',
        'description': 'Статистика',
        'icon': 'empty'
    },
    'income': {
        'command': '/income',
        'description': 'Добавить доход',
        'icon': 'empty'
    },
    'outcome': {
        'command': '/outcome',
        'description': 'Добавить расходы',
        'icon': 'empty'
    }
}

def getCommandsText():
    text = ''
    for row in commands:
        action = commands[row]
        text = text + action['command'] + ' - ' + action['description'] + '\n'
    return text

def getParseMessageText(message):
    print(message)
    text = ''
    for row in message:
        text = row + '\n'
    return text