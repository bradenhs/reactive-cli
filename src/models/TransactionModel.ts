import fnx from 'fnx'

export class TransactionModel extends fnx.Model<{}> {
  @fnx.readonly id = fnx.string
  @fnx.readonly created = fnx.complex.date
  amount = fnx.number

  @fnx.optional location? = fnx.string

  @fnx.action
  setLocation?(location: string) {
    this.location = location
  }
}
