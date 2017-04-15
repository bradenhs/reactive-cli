import * as inquirer from 'inquirer'
import * as terminalKit from 'terminal-kit'
import { AppModel } from './models/AppModel'
import { reaction } from 'fnx'
import axios from 'axios'
import * as boxen from 'boxen'
import { times } from 'lodash'

const app = new AppModel({
  transactions: { }
})

const term = terminalKit.terminal

setInterval(() => 0, 100)

start()

const STATUS_BAR_HEIGHT = 7

term.clear()
term.moveTo(1, STATUS_BAR_HEIGHT)

async function start() {
  term.clear()
  while (true) {
    await createTransaction()
  }
}

async function createTransaction() {
  startQuestion()
  const amount = (await inquirer.prompt({
    type: 'input',
    name: 'answer',
    message: 'How much did you spend?',
    validate: input => /\d+/.test(input) ? true : 'Should be a number'
  })).answer
  let id = app.createTransaction(parseFloat(amount))
  setTransactionLocation(id)
}

async function setTransactionLocation(id) {
  const res = await axios.get('http://geoip.nekudo.com/api')
  app.transactions[id].setLocation(res.data.city)
}

function startQuestion() {
  term.clear()
  renderStatusBar()
  term.moveTo(1, STATUS_BAR_HEIGHT)
}

reaction(() => {
  renderStatusBar()
})

function renderStatusBar() {
  term.saveCursor()
  term.moveTo(1, 1)
  erase(1, STATUS_BAR_HEIGHT)
  let output = 'Total $' + app.getTotal() + '\n'
  let lastTransactionLocation = 'None'
  if (app.getMostRecentTransaction() != undefined) {
    lastTransactionLocation = app.getMostRecentTransaction().location
  }
  output += 'Last transaction location: ' +  (lastTransactionLocation || 'Fetching...')
  term(boxen(output, {
    padding: 1,
    borderColor: 'cyan'
  }))
  term.restoreCursor()
}

function erase(from, until) {
  term.saveCursor()
  for (let line = from; line <= until; line++) {
    term.moveTo(1, line)
    term.eraseLine()
  }
  term.restoreCursor()
}
