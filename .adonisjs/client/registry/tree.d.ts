/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  home: typeof routes['home']
  newAccount: {
    create: typeof routes['new_account.create']
    store: typeof routes['new_account.store']
  }
  session: {
    create: typeof routes['session.create']
    store: typeof routes['session.store']
    destroy: typeof routes['session.destroy']
  }
  transactions: {
    index: typeof routes['transactions.index']
    store: typeof routes['transactions.store']
    update: typeof routes['transactions.update']
    destroy: typeof routes['transactions.destroy']
  }
  profile: {
    edit: typeof routes['profile.edit']
    update: typeof routes['profile.update']
    avatar: typeof routes['profile.avatar']
  }
  categories: {
    index: typeof routes['categories.index']
    store: typeof routes['categories.store']
    update: typeof routes['categories.update']
    destroy: typeof routes['categories.destroy']
  }
  banks: {
    index: typeof routes['banks.index']
    store: typeof routes['banks.store']
    update: typeof routes['banks.update']
    destroy: typeof routes['banks.destroy']
  }
  insights: {
    index: typeof routes['insights.index']
  }
  bills: {
    index: typeof routes['bills.index']
    store: typeof routes['bills.store']
    pay: typeof routes['bills.pay']
    destroy: typeof routes['bills.destroy']
  }
}
