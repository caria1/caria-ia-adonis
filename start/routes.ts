/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import { middleware } from '#start/kernel'
import { controllers } from '#generated/controllers'
import router from '@adonisjs/core/services/router'

router
  .get('/', [controllers.Dashboard, 'index'])
  .as('home')
  .use(middleware.auth())

router
  .group(() => {
    router.get('signup', [controllers.NewAccount, 'create'])
    router.post('signup', [controllers.NewAccount, 'store'])

    router.get('login', [controllers.Session, 'create'])
    router.post('login', [controllers.Session, 'store'])
  })
  .use(middleware.guest())

router
  .group(() => {
    router.post('logout', [controllers.Session, 'destroy'])
    
    // Transactions
    router.get('transactions', [controllers.Transactions, 'index']).as('transactions.index')
    router.post('transactions', [controllers.Transactions, 'store']).as('transactions.store')
    router.put('transactions/:id', [controllers.Transactions, 'update']).as('transactions.update')
    router.delete('transactions/:id', [controllers.Transactions, 'destroy']).as('transactions.destroy')

    // Profile
    router.get('profile', [controllers.Users, 'edit']).as('profile.edit')
    router.post('profile', [controllers.Users, 'update']).as('profile.update')
    router.post('profile/avatar', [controllers.Users, 'updateAvatar']).as('profile.avatar')

    // Categories
    router.get('categories', [controllers.Categories, 'index']).as('categories.index')
    router.post('categories', [controllers.Categories, 'store']).as('categories.store')
    router.put('categories/:id', [controllers.Categories, 'update']).as('categories.update')
    router.delete('categories/:id', [controllers.Categories, 'destroy']).as('categories.destroy')

    // Banks
    router.get('banks', [controllers.Banks, 'index']).as('banks.index')
    router.post('banks', [controllers.Banks, 'store']).as('banks.store')
    router.put('banks/:id', [controllers.Banks, 'update']).as('banks.update')
    router.delete('banks/:id', [controllers.Banks, 'destroy']).as('banks.destroy')

    // Insights
    router.get('insights', '#controllers/dashboard_controller.insights').as('insights.index')

    // Bills
    router.get('bills', '#controllers/bills_controller.index').as('bills.index')
    router.post('bills', '#controllers/bills_controller.store').as('bills.store')
    router.post('bills/:id/pay', '#controllers/bills_controller.pay').as('bills.pay')
    router.delete('bills/:id', '#controllers/bills_controller.destroy').as('bills.destroy')
  })
  .use(middleware.auth())
