/* eslint-disable prettier/prettier */
import type { AdonisEndpoint } from '@tuyau/core/types'
import type { Registry } from './schema.d.ts'
import type { ApiDefinition } from './tree.d.ts'

const placeholder: any = {}

const routes = {
  'home': {
    methods: ["GET","HEAD"],
    pattern: '/',
    tokens: [{"old":"/","type":0,"val":"/","end":""}],
    types: placeholder as Registry['home']['types'],
  },
  'new_account.create': {
    methods: ["GET","HEAD"],
    pattern: '/signup',
    tokens: [{"old":"/signup","type":0,"val":"signup","end":""}],
    types: placeholder as Registry['new_account.create']['types'],
  },
  'new_account.store': {
    methods: ["POST"],
    pattern: '/signup',
    tokens: [{"old":"/signup","type":0,"val":"signup","end":""}],
    types: placeholder as Registry['new_account.store']['types'],
  },
  'session.create': {
    methods: ["GET","HEAD"],
    pattern: '/login',
    tokens: [{"old":"/login","type":0,"val":"login","end":""}],
    types: placeholder as Registry['session.create']['types'],
  },
  'session.store': {
    methods: ["POST"],
    pattern: '/login',
    tokens: [{"old":"/login","type":0,"val":"login","end":""}],
    types: placeholder as Registry['session.store']['types'],
  },
  'session.destroy': {
    methods: ["POST"],
    pattern: '/logout',
    tokens: [{"old":"/logout","type":0,"val":"logout","end":""}],
    types: placeholder as Registry['session.destroy']['types'],
  },
  'transactions.index': {
    methods: ["GET","HEAD"],
    pattern: '/transactions',
    tokens: [{"old":"/transactions","type":0,"val":"transactions","end":""}],
    types: placeholder as Registry['transactions.index']['types'],
  },
  'transactions.store': {
    methods: ["POST"],
    pattern: '/transactions',
    tokens: [{"old":"/transactions","type":0,"val":"transactions","end":""}],
    types: placeholder as Registry['transactions.store']['types'],
  },
  'transactions.update': {
    methods: ["PUT"],
    pattern: '/transactions/:id',
    tokens: [{"old":"/transactions/:id","type":0,"val":"transactions","end":""},{"old":"/transactions/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['transactions.update']['types'],
  },
  'transactions.destroy': {
    methods: ["DELETE"],
    pattern: '/transactions/:id',
    tokens: [{"old":"/transactions/:id","type":0,"val":"transactions","end":""},{"old":"/transactions/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['transactions.destroy']['types'],
  },
  'profile.edit': {
    methods: ["GET","HEAD"],
    pattern: '/profile',
    tokens: [{"old":"/profile","type":0,"val":"profile","end":""}],
    types: placeholder as Registry['profile.edit']['types'],
  },
  'profile.update': {
    methods: ["POST"],
    pattern: '/profile',
    tokens: [{"old":"/profile","type":0,"val":"profile","end":""}],
    types: placeholder as Registry['profile.update']['types'],
  },
  'profile.avatar': {
    methods: ["POST"],
    pattern: '/profile/avatar',
    tokens: [{"old":"/profile/avatar","type":0,"val":"profile","end":""},{"old":"/profile/avatar","type":0,"val":"avatar","end":""}],
    types: placeholder as Registry['profile.avatar']['types'],
  },
  'categories.index': {
    methods: ["GET","HEAD"],
    pattern: '/categories',
    tokens: [{"old":"/categories","type":0,"val":"categories","end":""}],
    types: placeholder as Registry['categories.index']['types'],
  },
  'categories.store': {
    methods: ["POST"],
    pattern: '/categories',
    tokens: [{"old":"/categories","type":0,"val":"categories","end":""}],
    types: placeholder as Registry['categories.store']['types'],
  },
  'categories.update': {
    methods: ["PUT"],
    pattern: '/categories/:id',
    tokens: [{"old":"/categories/:id","type":0,"val":"categories","end":""},{"old":"/categories/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['categories.update']['types'],
  },
  'categories.destroy': {
    methods: ["DELETE"],
    pattern: '/categories/:id',
    tokens: [{"old":"/categories/:id","type":0,"val":"categories","end":""},{"old":"/categories/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['categories.destroy']['types'],
  },
  'banks.index': {
    methods: ["GET","HEAD"],
    pattern: '/banks',
    tokens: [{"old":"/banks","type":0,"val":"banks","end":""}],
    types: placeholder as Registry['banks.index']['types'],
  },
  'banks.store': {
    methods: ["POST"],
    pattern: '/banks',
    tokens: [{"old":"/banks","type":0,"val":"banks","end":""}],
    types: placeholder as Registry['banks.store']['types'],
  },
  'banks.update': {
    methods: ["PUT"],
    pattern: '/banks/:id',
    tokens: [{"old":"/banks/:id","type":0,"val":"banks","end":""},{"old":"/banks/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['banks.update']['types'],
  },
  'banks.destroy': {
    methods: ["DELETE"],
    pattern: '/banks/:id',
    tokens: [{"old":"/banks/:id","type":0,"val":"banks","end":""},{"old":"/banks/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['banks.destroy']['types'],
  },
  'insights.index': {
    methods: ["GET","HEAD"],
    pattern: '/insights',
    tokens: [{"old":"/insights","type":0,"val":"insights","end":""}],
    types: placeholder as Registry['insights.index']['types'],
  },
  'bills.index': {
    methods: ["GET","HEAD"],
    pattern: '/bills',
    tokens: [{"old":"/bills","type":0,"val":"bills","end":""}],
    types: placeholder as Registry['bills.index']['types'],
  },
  'bills.store': {
    methods: ["POST"],
    pattern: '/bills',
    tokens: [{"old":"/bills","type":0,"val":"bills","end":""}],
    types: placeholder as Registry['bills.store']['types'],
  },
  'bills.pay': {
    methods: ["POST"],
    pattern: '/bills/:id/pay',
    tokens: [{"old":"/bills/:id/pay","type":0,"val":"bills","end":""},{"old":"/bills/:id/pay","type":1,"val":"id","end":""},{"old":"/bills/:id/pay","type":0,"val":"pay","end":""}],
    types: placeholder as Registry['bills.pay']['types'],
  },
  'bills.destroy': {
    methods: ["DELETE"],
    pattern: '/bills/:id',
    tokens: [{"old":"/bills/:id","type":0,"val":"bills","end":""},{"old":"/bills/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['bills.destroy']['types'],
  },
} as const satisfies Record<string, AdonisEndpoint>

export { routes }

export const registry = {
  routes,
  $tree: {} as ApiDefinition,
}

declare module '@tuyau/core/types' {
  export interface UserRegistry {
    routes: typeof routes
    $tree: ApiDefinition
  }
}
