import * as inquirer from 'inquirer'
import * as terminalKit from 'terminal-kit'
import { AppModel } from './models/AppModel'
import { reaction } from 'fnx'
import axios from 'axios'
import * as boxen from 'boxen'
import { times } from 'lodash'
import { initStatusBar, STATUS_BAR_HEIGHT } from './statusBar'
import { app } from './app'
import { View } from './models/AppModel'
import fnx from 'fnx'

const term = terminalKit.terminal

start()

function start() {
  const views = {
    [View.CHOOSE_NAME]: displayChooseName,
    [View.JOIN_OR_CREATE_SELECTION]: displayJoinOrCreateSelection,
    [View.CREATE_BUDGET]: displayCreateBudget,
    [View.JOIN_BUDGET]: displayJoinBudget,
    [View.ACTION_SELECTION]: displayActionSelection,
    [View.DEPOSIT]: displayDepositSelection,
    [View.WITHDRAW]: displayWithdrawSelection,
  }

  initStatusBar()
  fnx.reaction(() => {
    term.moveTo(1, STATUS_BAR_HEIGHT + 4)
    term.eraseDisplayBelow()
    views[app.view]()
  })
}

async function displayChooseName() {
  const { name } = await inquirer.prompt({
    name: 'name',
    message: 'Choose your name',
    validate: required
  })
  app.transaction(() => {
    app.setUserName(name.trim())
    app.setView(View.JOIN_OR_CREATE_SELECTION)
  })
}

async function displayJoinOrCreateSelection() {
  const { choice } = await inquirer.prompt({
    name: 'choice',
    message: 'Would you like to create a new budget or join an existing one?',
    type: 'list',
    choices: [ 'Join', 'Create' ]
  })
  if (choice === 'Join') {
    app.setView(View.JOIN_BUDGET)
  } else {
    app.setView(View.CREATE_BUDGET)
  }
}

async function displayCreateBudget() {
  const { name } = await inquirer.prompt({
    name: 'name',
    message: 'Pick a name for your budget',
    validate: required
  })
  app.transaction(() => {
    app.createBudget(name.trim())
    app.setView(View.ACTION_SELECTION)
  })
}

async function displayJoinBudget() {
  throw new Error('Right now this does not work')
  // app.setView(View.WITHDRAW_OR_DEPOSIT_SELECTION)
}

async function displayActionSelection() {
  const { choice } = await inquirer.prompt({
    name: 'choice',
    message: 'Would you like to record a withdrawl or deposit?',
    type: 'list',
    choices: [ 'Widthdraw', 'Deposit' ]
  })
  if (choice === 'Widthdraw') {
    app.setView(View.WITHDRAW)
  } else {
    app.setView(View.DEPOSIT)
  }
}

async function displayDepositSelection() {
  const { amount } = await inquirer.prompt({
    name: 'amount',
    message: 'How much would you like to deposit?',
    validate: combineValidators(required, isNumber)
  })
  app.transaction(() => {
    createTransaction(parseFloat(amount.trim()))
    app.setView(View.ACTION_SELECTION)
  })
}

async function displayWithdrawSelection() {
  const { amount } = await inquirer.prompt({
    name: 'amount',
    message: 'How much would you like to withdraw?',
    validate: combineValidators(required, isNumber)
  })
  app.transaction(() => {
    createTransaction(-parseFloat(amount.trim()))
    app.setView(View.ACTION_SELECTION)
  })
}

function createTransaction(amount) {
  const id = app.budget.createTransaction(amount)
  setTransactionLocation(id)
}

async function setTransactionLocation(id) {
  const res = await axios.get('http://geoip.nekudo.com/api')
  app.budget.transactions[id].setLocation(res.data.city)
}

function combineValidators(...validators: ((value: string) => true | string)[]) {
  return (value: string) => {
    for (let i = 0; i < validators.length; i++) {
      let result = validators[i](value)
      if (typeof result === 'string') {
        return result
      }
    }
    return true
  }
}

function isNumber(value: string) {
  if (/^\d+(\.\d+)?$/.test(value.trim())) {
    return true
  } else {
    return 'Should be positive number'
  }
}

function required(value: string) {
  if (value != undefined && value.trim().length > 0) {
    return true
  } else {
    return 'Required'
  }
}
