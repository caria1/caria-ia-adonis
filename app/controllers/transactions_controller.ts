import type { HttpContext } from '@adonisjs/core/http'
import Transaction from '#models/transaction'
import Category from '#models/category'
import Bank from '#models/bank'
import { DateTime } from 'luxon'

export default class TransactionsController {
  async index({ inertia, auth, request }: HttpContext) {
    const user = auth.user!
    const page = request.input('page', 1)
    const search = request.input('search')
    const categoryId = request.input('categoryId')

    const query = Transaction.query()
      .where('userId', user.id)
      .preload('category')
      .preload('bank')
      .orderBy('date', 'desc')

    if (search) {
      query.whereRaw('LOWER(description) LIKE ?', [`%${search.toLowerCase()}%`])
    }

    if (categoryId) {
      query.where('categoryId', categoryId)
    }

    const transactions = await query.paginate(page, 15)
    
    const categories = await Category.query().where('userId', user.id)
    const banks = await Bank.query().where('userId', user.id).orderBy('name', 'asc')

    return inertia.render('transactions/index' as any, { 
      transactions,
      categories,
      banks,
      filters: { search, categoryId }
    })
  }

  async store({ auth, request, response }: HttpContext) {
    const user = auth.user!
    const { description, amount, type, categoryId, bankId, date, isRecurring } = request.all()
    
    await Transaction.create({ 
      description,
      amount: Number(amount),
      type,
      categoryId: Number(categoryId),
      bankId: bankId ? Number(bankId) : null,
      date: DateTime.fromISO(date),
      isRecurring: Boolean(isRecurring),
      userId: user.id 
    })

    return response.redirect().back()
  }

  async update({ auth, request, response, params }: HttpContext) {
    const user = auth.user!
    const transaction = await Transaction.query()
      .where('userId', user.id)
      .where('id', params.id)
      .firstOrFail()
    
    const { description, amount, type, categoryId, bankId, date, isRecurring } = request.all()
    
    transaction.merge({
      description,
      amount: Number(amount),
      type,
      categoryId: Number(categoryId),
      bankId: bankId ? Number(bankId) : null,
      date: DateTime.fromISO(date),
      isRecurring: Boolean(isRecurring)
    })
    
    await transaction.save()

    return response.redirect().back()
  }

  async destroy({ auth, params, response }: HttpContext) {
    const user = auth.user!
    const transaction = await Transaction.query()
      .where('userId', user.id)
      .where('id', params.id)
      .firstOrFail()

    await transaction.delete()
    return response.redirect().back()
  }
}