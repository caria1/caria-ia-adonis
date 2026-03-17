import type { HttpContext } from '@adonisjs/core/http'
import Category from '#models/category'
import { DateTime } from 'luxon'

const CATEGORY_COLORS: Record<string, string> = {
  'home': '#3B82F6',
  'utensils': '#F97316',
  'car': '#8B5CF6',
  'heart-pulse': '#EF4444',
  'palmtree': '#10B981',
  'book-open': '#6366F1',
  'trending-up': '#14B8A6',
  'shopping-bag': '#EC4899',
  'credit-card': '#F59E0B',
  'briefcase': '#64748B',
  'gift': '#D946EF',
  'dog': '#84CC16',
  'box': '#94A3B8',
}

export default class CategoriesController {
  async index({ inertia, auth }: HttpContext) {
    const user = auth.user!
    const now = DateTime.local()
    const startOfMonth = now.startOf('month')
    const endOfMonth = now.endOf('month')

    const categories = await Category.query()
      .where('userId', user.id)
      .preload('transactions', (query) => {
        query.whereBetween('date', [startOfMonth.toSQL(), endOfMonth.toSQL()])
      })
      .orderBy('name', 'asc')

    const categoriesWithStats = categories.map((cat) => {
      const totalSpent = cat.transactions.reduce((acc, t) => acc + Number(t.amount), 0)
      const percentage = cat.budgetLimit ? Math.round((totalSpent / Number(cat.budgetLimit)) * 100) : 0
      
      return {
        id: cat.id,
        name: cat.name,
        icon: cat.icon || 'box',
        color: cat.color || CATEGORY_COLORS[cat.icon || 'box'] || '#94A3B8',
        type: cat.type || 'expense',
        budgetLimit: cat.budgetLimit ? Number(cat.budgetLimit) : null,
        spent: totalSpent,
        percentage,
      }
    })

    return inertia.render('categories/index' as any, { categories: categoriesWithStats })
  }

  async store({ request, auth, response }: HttpContext) {
    const user = auth.user!
    const { name, type, budgetLimit } = request.only(['name', 'type', 'budgetLimit'])
    
    await Category.create({
      name,
      type: type || 'expense',
      budgetLimit: budgetLimit ? Number(budgetLimit) : null,
      userId: user.id
    })

    return response.redirect().back()
  }

  async update({ request, auth, response, params }: HttpContext) {
    const user = auth.user!
    const category = await Category.query()
      .where('userId', user.id)
      .where('id', params.id)
      .firstOrFail()

    const { name, type, budgetLimit } = request.only(['name', 'type', 'budgetLimit'])
    category.merge({
      name,
      type: type || 'expense',
      budgetLimit: budgetLimit ? Number(budgetLimit) : null
    })
    
    await category.save()

    return response.redirect().back()
  }

  async destroy({ auth, response, params }: HttpContext) {
    const user = auth.user!
    const category = await Category.query()
      .where('userId', user.id)
      .where('id', params.id)
      .firstOrFail()

    await category.delete()
    return response.redirect().back()
  }
}