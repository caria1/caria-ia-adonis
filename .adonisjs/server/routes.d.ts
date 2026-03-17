import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'home': { paramsTuple?: []; params?: {} }
    'new_account.create': { paramsTuple?: []; params?: {} }
    'new_account.store': { paramsTuple?: []; params?: {} }
    'session.create': { paramsTuple?: []; params?: {} }
    'session.store': { paramsTuple?: []; params?: {} }
    'session.destroy': { paramsTuple?: []; params?: {} }
    'transactions.index': { paramsTuple?: []; params?: {} }
    'transactions.store': { paramsTuple?: []; params?: {} }
    'transactions.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'transactions.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'profile.edit': { paramsTuple?: []; params?: {} }
    'profile.update': { paramsTuple?: []; params?: {} }
    'profile.avatar': { paramsTuple?: []; params?: {} }
    'categories.index': { paramsTuple?: []; params?: {} }
    'categories.store': { paramsTuple?: []; params?: {} }
    'categories.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'categories.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'banks.index': { paramsTuple?: []; params?: {} }
    'banks.store': { paramsTuple?: []; params?: {} }
    'banks.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'banks.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'insights.index': { paramsTuple?: []; params?: {} }
    'bills.index': { paramsTuple?: []; params?: {} }
    'bills.store': { paramsTuple?: []; params?: {} }
    'bills.pay': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'bills.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  GET: {
    'home': { paramsTuple?: []; params?: {} }
    'new_account.create': { paramsTuple?: []; params?: {} }
    'session.create': { paramsTuple?: []; params?: {} }
    'transactions.index': { paramsTuple?: []; params?: {} }
    'profile.edit': { paramsTuple?: []; params?: {} }
    'categories.index': { paramsTuple?: []; params?: {} }
    'banks.index': { paramsTuple?: []; params?: {} }
    'insights.index': { paramsTuple?: []; params?: {} }
    'bills.index': { paramsTuple?: []; params?: {} }
  }
  HEAD: {
    'home': { paramsTuple?: []; params?: {} }
    'new_account.create': { paramsTuple?: []; params?: {} }
    'session.create': { paramsTuple?: []; params?: {} }
    'transactions.index': { paramsTuple?: []; params?: {} }
    'profile.edit': { paramsTuple?: []; params?: {} }
    'categories.index': { paramsTuple?: []; params?: {} }
    'banks.index': { paramsTuple?: []; params?: {} }
    'insights.index': { paramsTuple?: []; params?: {} }
    'bills.index': { paramsTuple?: []; params?: {} }
  }
  POST: {
    'new_account.store': { paramsTuple?: []; params?: {} }
    'session.store': { paramsTuple?: []; params?: {} }
    'session.destroy': { paramsTuple?: []; params?: {} }
    'transactions.store': { paramsTuple?: []; params?: {} }
    'profile.update': { paramsTuple?: []; params?: {} }
    'profile.avatar': { paramsTuple?: []; params?: {} }
    'categories.store': { paramsTuple?: []; params?: {} }
    'banks.store': { paramsTuple?: []; params?: {} }
    'bills.store': { paramsTuple?: []; params?: {} }
    'bills.pay': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  PUT: {
    'transactions.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'categories.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'banks.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  DELETE: {
    'transactions.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'categories.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'banks.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'bills.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}