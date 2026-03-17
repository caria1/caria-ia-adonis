import type { HttpContext } from '@adonisjs/core/http'
import Bank from '#models/bank'
import Transaction from '#models/transaction'

export default class BanksController {
  async index({ inertia, auth }: HttpContext) {
    const user = auth.user!
    
    // Fetch user banks
    const banks = await Bank.query()
      .where('userId', user.id)
      .orderBy('name', 'asc')

    // For each bank, calculate current balance based on transactions
    const banksWithBalance = await Promise.all(banks.map(async (bank) => {
      const transactions = await Transaction.query()
        .where('bankId', bank.id)
      
      const transactionsSum = transactions.reduce((acc, t) => {
        return t.type === 'income' ? acc + Number(t.amount) : acc - Number(t.amount)
      }, 0)

      return {
        ...bank.toJSON(),
        currentBalance: Number(bank.initialBalance) + transactionsSum
      }
    }))

    return inertia.render('banks/index' as any, {
      banks: banksWithBalance
    })
  }

  async store({ request, response, auth }: HttpContext) {
    const user = auth.user!
    const data = request.only(['name', 'type', 'initialBalance', 'color', 'icon'])

    await Bank.create({
      ...data,
      userId: user.id
    })

    return response.redirect().back()
  }

  async update({ request, response, params }: HttpContext) {
    const bank = await Bank.findOrFail(params.id)
    const data = request.only(['name', 'type', 'initialBalance', 'color', 'icon'])

    bank.merge(data)
    await bank.save()

    return response.redirect().back()
  }

  async destroy({ response, params }: HttpContext) {
    const bank = await Bank.findOrFail(params.id)
    await bank.delete()

    return response.redirect().back()
  }
}