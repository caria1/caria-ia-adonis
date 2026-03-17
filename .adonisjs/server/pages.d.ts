import '@adonisjs/inertia/types'

import type React from 'react'
import type { Prettify } from '@adonisjs/core/types/common'

type ExtractProps<T> =
  T extends React.FC<infer Props>
    ? Prettify<Omit<Props, 'children'>>
    : T extends React.Component<infer Props>
      ? Prettify<Omit<Props, 'children'>>
      : never

declare module '@adonisjs/inertia/types' {
  export interface InertiaPages {
    'auth/login': ExtractProps<(typeof import('../../inertia/pages/auth/login.tsx'))['default']>
    'auth/signup': ExtractProps<(typeof import('../../inertia/pages/auth/signup.tsx'))['default']>
    'banks/index': ExtractProps<(typeof import('../../inertia/pages/banks/index.tsx'))['default']>
    'bills/index': ExtractProps<(typeof import('../../inertia/pages/bills/index.tsx'))['default']>
    'categories/index': ExtractProps<(typeof import('../../inertia/pages/categories/index.tsx'))['default']>
    'errors/not_found': ExtractProps<(typeof import('../../inertia/pages/errors/not_found.tsx'))['default']>
    'errors/server_error': ExtractProps<(typeof import('../../inertia/pages/errors/server_error.tsx'))['default']>
    'home': ExtractProps<(typeof import('../../inertia/pages/home.tsx'))['default']>
    'insights': ExtractProps<(typeof import('../../inertia/pages/insights.tsx'))['default']>
    'onboarding': ExtractProps<(typeof import('../../inertia/pages/onboarding.tsx'))['default']>
    'profile/index': ExtractProps<(typeof import('../../inertia/pages/profile/index.tsx'))['default']>
    'transactions/index': ExtractProps<(typeof import('../../inertia/pages/transactions/index.tsx'))['default']>
  }
}
