import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Category from '#models/category'
import User from '#models/user'

export default class extends BaseSeeder {
  async run() {
    const user = await User.first()
    if (!user) return

    await Category.updateOrCreateMany('name', [
      {
        userId: user.id,
        name: 'Moradia',
        icon: 'home',
        color: '#7B2FBE',
        budgetLimit: 2000,
      },
      {
        userId: user.id,
        name: 'Alimentação',
        icon: 'utensils',
        color: '#FF4444',
        budgetLimit: 1000,
      },
      {
        userId: user.id,
        name: 'Transporte',
        icon: 'car',
        color: '#00D4FF',
        budgetLimit: 500,
      },
      {
        userId: user.id,
        name: 'Saúde',
        icon: 'heart-pulse',
        color: '#00FF88',
        budgetLimit: 300,
      },
      {
        userId: user.id,
        name: 'Lazer',
        icon: 'palmtree',
        color: '#FFCC00',
        budgetLimit: 400,
      },
      {
        userId: user.id,
        name: 'Educação',
        icon: 'book-open',
        color: '#6C5CE7',
        budgetLimit: 600,
      },
      {
        userId: user.id,
        name: 'Investimentos',
        icon: 'trending-up',
        color: '#00FF88',
        budgetLimit: 1000,
      },
      {
        userId: user.id,
        name: 'Compras',
        icon: 'shopping-bag',
        color: '#F472B6',
        budgetLimit: 500,
      },
      {
        userId: user.id,
        name: 'Assinaturas',
        icon: 'credit-card',
        color: '#6366F1',
        budgetLimit: 200,
      },
      {
        userId: user.id,
        name: 'Trabalho',
        icon: 'briefcase',
        color: '#3B82F6',
        budgetLimit: 0,
      },
      {
        userId: user.id,
        name: 'Presentes',
        icon: 'gift',
        color: '#EC4899',
        budgetLimit: 100,
      },
      {
        userId: user.id,
        name: 'Pets',
        icon: 'dog',
        color: '#F59E0B',
        budgetLimit: 200,
      },
      {
        userId: user.id,
        name: 'Outros',
        icon: 'box',
        color: '#A29BFE',
        budgetLimit: 200,
      },
    ])
  }
}