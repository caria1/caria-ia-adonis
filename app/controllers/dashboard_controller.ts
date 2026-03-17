import type { HttpContext } from '@adonisjs/core/http'
import Transaction from '#models/transaction'
import Category from '#models/category'
import Bank from '#models/bank'
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

export default class DashboardController {
  async index({ inertia, auth }: HttpContext) {
    const user = auth.user!
    const now = DateTime.local()
    const startOfMonth = now.startOf('month')
    const endOfMonth = now.endOf('month')

    // Fetch categorical data for the grid
    const categories = await Category.query()
      .where('userId', user.id)
      .preload('transactions', (query) => {
        query.whereBetween('date', [startOfMonth.toSQL(), endOfMonth.toSQL()])
      })

    const categoriesWithStats = categories
      .map((cat) => {
        const totalSpent = cat.transactions.reduce((acc, t) => acc + Number(t.amount), 0)
        const percentage = cat.budgetLimit ? Math.round((totalSpent / Number(cat.budgetLimit)) * 100) : 0

        return {
          id: cat.id,
          name: cat.name,
          icon: cat.icon || 'box',
          color: cat.color || CATEGORY_COLORS[cat.icon || 'box'] || '#94A3B8',
          type: cat.type || 'expense',
          spent: totalSpent,
          budget: Number(cat.budgetLimit) || 0,
          percentage,
        }
      })
    // Removed filter to show all categories for interactive budgeting

    // Fetch monthly totals
    const transactions = await Transaction.query()
      .where('userId', user.id)
      .whereBetween('date', [startOfMonth.toSQL(), endOfMonth.toSQL()])

    const monthlyIncome = transactions
      .filter((t) => t.type === 'income')
      .reduce((acc, t) => acc + Number(t.amount), 0)

    const monthlyExpense = transactions
      .filter((t) => t.type === 'expense')
      .reduce((acc, t) => acc + Number(t.amount), 0)

    // Current balance: Sum of (Bank Initial Balance + Bank Transactions)
    const banks = await Bank.query().where('userId', user.id)
    let totalBankBalance = 0
    
    for (const bank of banks) {
      const bTransactions = await Transaction.query().where('bankId', bank.id)
      const bSum = bTransactions.reduce((acc, t) => {
        return t.type === 'income' ? acc + Number(t.amount) : acc - Number(t.amount)
      }, 0)
      totalBankBalance += Number(bank.initialBalance) + bSum
    }

    const balance = totalBankBalance

    // Health Score calculation (initial logic)
    let healthScore = 100
    if (monthlyIncome > 0) {
      const expenseRatio = monthlyExpense / monthlyIncome
      if (expenseRatio > 1) healthScore = 40 // Overspending
      else if (expenseRatio > 0.8) healthScore = 70 // Tight
      else if (expenseRatio > 0.5) healthScore = 85 // Safe
      else healthScore = 95 // Excellent
    } else if (monthlyExpense > 0) {
      healthScore = 50 // No income but spending
    }

    // Active Alerts (Categories > 90%)
    const alerts = categoriesWithStats
      .filter(c => c.type === 'expense' && c.percentage >= 90)
      .map(c => ({
        message: c.percentage >= 100
          ? `Limite excedido em ${c.name}!`
          : `Atenção: ${c.name} atingiu ${c.percentage}% do limite.`,
        severity: c.percentage >= 100 ? 'danger' : 'warning'
      }))

    // Chart data (Evolution - last 6 months)
    const sixMonthsAgo = now.minus({ months: 5 }).startOf('month')
    const monthlyData = await Transaction.query()
      .where('userId', user.id)
      .whereBetween('date', [sixMonthsAgo.toSQL(), endOfMonth.toSQL()])

    const months = []
    const incomeData = []
    const expenseData = []
    
    for (let i = 0; i < 6; i++) {
      const monthDate = sixMonthsAgo.plus({ months: i })
      const monthStart = monthDate.startOf('month')
      const monthEnd = monthDate.endOf('month')
      const monthLabel = monthDate.toFormat('MMM')
      
      const monthTransactions = monthlyData.filter(t => {
        return t.date >= monthStart && t.date <= monthEnd
      })
      
      const monthIncome = monthTransactions
        .filter(t => t.type === 'income')
        .reduce((acc, t) => acc + Number(t.amount), 0)
      
      const monthExpense = monthTransactions
        .filter(t => t.type === 'expense')
        .reduce((acc, t) => acc + Number(t.amount), 0)
      
      months.push(monthLabel)
      incomeData.push(monthIncome)
      expenseData.push(monthExpense)
    }

    const chartData = {
      labels: months,
      income: incomeData,
      expense: expenseData,
    }

    return inertia.render('home' as any, {
      stats: {
        balance,
        monthlyIncome,
        monthlyExpense,
        healthScore,
        lastMonthBalance: 1250.80, // Mock for comparison
      },
      categories: categoriesWithStats,
      alerts,
      charts: {
        evolution: chartData,
        distribution: categoriesWithStats
          .filter(c => c.type === 'expense' && c.spent > 0)
          .map(c => ({
            name: c.name,
            value: c.spent,
            color: c.color
          })),
        topCategories: categoriesWithStats
          .filter(c => c.type === 'expense' && c.spent > 0)
          .sort((a, b) => b.spent - a.spent)
          .slice(0, 5)
          .map(c => ({
            name: c.name,
            spent: c.spent,
            budget: c.budget,
            color: c.color
          }))
      }
    })
  }

  async insights({ inertia, auth }: HttpContext) {
    const user = auth.user!
    const now = DateTime.local()
    const startOfMonth = now.startOf('month')
    const endOfMonth = now.endOf('month')

    const transactions = await Transaction.query()
      .where('userId', user.id)
      .whereBetween('date', [startOfMonth.toSQL(), endOfMonth.toSQL()])

    const monthlyIncome = transactions
      .filter((t) => t.type === 'income')
      .reduce((acc, t) => acc + Number(t.amount), 0)

    const monthlyExpense = transactions
      .filter((t) => t.type === 'expense')
      .reduce((acc, t) => acc + Number(t.amount), 0)

    const categories = await Category.query()
      .where('userId', user.id)
      .preload('transactions', (query) => {
        query.whereBetween('date', [startOfMonth.toSQL(), endOfMonth.toSQL()])
      })

    const topExpenses = categories
      .map(c => ({
        name: c.name,
        spent: c.transactions.reduce((acc, t) => acc + Number(t.amount), 0),
        limit: Number(c.budgetLimit) || 0
      }))
      .filter(c => c.spent > 0)
      .sort((a, b) => b.spent - a.spent)

    const tips = []

    if (monthlyExpense > monthlyIncome && monthlyIncome > 0) {
      tips.push({
        title: 'Gasto acima da receita',
        message: 'Você está gastando mais do que ganha este mês. Considere revisar seus gastos fixos.',
        type: 'critical'
      })
    }

    if (topExpenses.length > 0 && topExpenses[0].spent > (topExpenses[0].limit * 0.8) && topExpenses[0].limit > 0) {
      tips.push({
        title: `Alerta: ${topExpenses[0].name}`,
        message: `Seu gasto em ${topExpenses[0].name} já consumiu grande parte do orçamento previsto.`,
        type: 'warning'
      })
    }

    tips.push({
      title: 'Dica de Economia',
      message: 'Tente poupar pelo menos 10% da sua receita mensal para criar uma reserva de emergência.',
      type: 'info'
    })

    return inertia.render('insights' as any, {
      stats: {
        monthlyIncome,
        monthlyExpense,
        ratio: monthlyIncome > 0 ? Math.round((monthlyExpense / monthlyIncome) * 100) : 0
      },
      tips,
      topExpenses
    })
  }
}