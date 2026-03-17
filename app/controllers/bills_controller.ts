import type { HttpContext } from '@adonisjs/core/http'
import Bill from '#models/bill'
import Transaction from '#models/transaction'
import { DateTime } from 'luxon'

export default class BillsController {
  async index({ inertia, auth }: HttpContext) {
    const user = auth.user!
    const bills = await Bill.query()
      .where('userId', user.id)
      .preload('category')
      .orderBy('dueDate', 'asc')

    return inertia.render('bills/index' as any, { bills })
  }

  async store({ request, auth, response }: HttpContext) {
    const user = auth.user!
    const data = request.only(['categoryId', 'description', 'amount', 'type', 'dueDate', 'isRecurring', 'recurrencePeriod'])
    
    await Bill.create({
      ...data,
      userId: user.id,
      status: 'pending'
    })

    return response.redirect().back()
  }

  async pay({ auth, response, params }: HttpContext) {
    const user = auth.user!
    const bill = await Bill.query()
      .where('userId', user.id)
      .where('id', params.id)
      .firstOrFail()

    // Create a transaction
    await Transaction.create({
      userId: user.id,
      categoryId: bill.categoryId,
      description: `Pagamento: ${bill.description}`,
      amount: bill.amount,
      type: bill.type,
      date: DateTime.local(),
      isRecurring: false
    })

    // Update bill status
    bill.status = 'paid'
    await bill.save()

    return response.redirect().back()
  }

  async destroy({ auth, response, params }: HttpContext) {
    const user = auth.user!
    const bill = await Bill.query()
      .where('userId', user.id)
      .where('id', params.id)
      .firstOrFail()

    await bill.delete()
    return response.redirect().back()
  }
}