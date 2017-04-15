import * as inquirer from 'inquirer'
import * as terminalKit from 'terminal-kit'
import { AppModel } from './models/AppModel'
import { reaction } from 'fnx'
import axios from 'axios'

const app = new AppModel({
  transactions: { }
})

const term = terminalKit.terminal

start()

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
  console.log()
  console.log()
}

reaction(() => {
  renderStatusBar()
})

function renderStatusBar() {
  term.saveCursor()
  term.moveTo(1, 1)
  let output = 'Total $' + app.getTotal()
  if (app.getMostRecentTransaction() != undefined) {
    const lastTransactionLocation = app.getMostRecentTransaction().location
    output += ' Last transaction location: ' +  (lastTransactionLocation || 'Fetching...')
  }
  term(output)
  term.restoreCursor()
}


