import type { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'

export default class UsersController {
  async edit({ inertia, auth }: HttpContext) {
    const user = auth.user!
    return inertia.render('profile/index' as any, { user: user.toJSON() })
  }

  async update({ auth, request, response }: HttpContext) {
    const user = auth.user!
    const { fullName, initialBalance } = request.only(['fullName', 'initialBalance'])

    user.fullName = fullName
    user.initialBalance = Number(initialBalance)
    await user.save()

    return response.redirect().back()
  }

  async updateAvatar({ auth, request, response }: HttpContext) {
    const user = auth.user!
    const avatar = request.file('avatar', {
      size: '2mb',
      extnames: ['jpg', 'png', 'jpeg'],
    })

    if (avatar) {
      await avatar.move(app.makePath('public/uploads/avatars'), {
        name: `${user.id}-${Date.now()}.${avatar.extname}`,
        overwrite: true,
      })
      user.avatar = `/uploads/avatars/${avatar.fileName}`
      await user.save()
    }

    return response.redirect().back()
  }
}