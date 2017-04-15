import { TransactionModel } from './TransactionModel'
import fnx from 'fnx'
import * as uuid from 'uuid'

export class AppModel extends fnx.Model<AppModel> {
  transactions = fnx.mapOf(fnx.object(TransactionModel))

  @fnx.computed
  getTotal?() {
    let total = 0
    Object.keys(this.transactions).forEach(id => {
      total += this.transactions[id].amount
    })
    return total
  }

  @fnx.computed
  getTransactionsOrderedByDateCreated?() {
    return Object.keys(this.transactions).map(id => this.transactions[id]).sort((t1, t2) => {
      return t1.created.valueOf() > t2.created.valueOf() ? 1 : -1
    })
  }

  @fnx.computed
  getMostRecentTransaction?() {
    return this.getTransactionsOrderedByDateCreated()[0]
  }

  @fnx.action
  createTransaction?(amount: number) {
    const id = uuid.v4()
    this.transactions[id] = {
      amount, id, created: new Date()
    }
    return id
  }
}
