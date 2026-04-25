import { useLazyQuery, useMutation } from '@apollo/client/react'
import {
  GetSessionDocument,
  LoginUserDocument,
  LogoutUserDocument,
  type AuthUserFieldsFragment,
  type AppSettingsAiFieldsFragment,
  type LoginUserMutationVariables,
} from '../types/graphql'

// ── Exported types ─────────────────────────────────────────────────────────────

export type AuthUser = AuthUserFieldsFragment

export type AuthSettings = NonNullable<
  NonNullable<AuthUserFieldsFragment['settings']>['docs']
>[number]

export type AppSettings = AppSettingsAiFieldsFragment

// ── Session (meUser + AppSetting in one query) ────────────────────────────────

export const useGetSession = () => {
  const [fetch, { loading, error }] = useLazyQuery(GetSessionDocument, {
    fetchPolicy: 'network-only',
  })

  const fetchSession = async () => {
    const result = await fetch()
    return {
      user: (result.data?.meUser?.user as AuthUser | null | undefined) ?? null,
      appSettings: (result.data?.AppSetting as AppSettings | null | undefined) ?? null,
      exp: result.data?.meUser?.exp ?? null,
    }
  }

  return { fetchSession, loading, error }
}

// ── Login ─────────────────────────────────────────────────────────────────────

export const useLoginUser = () => {
  const [loginMutation, { loading, error }] = useMutation(LoginUserDocument, {
    fetchPolicy: 'no-cache',
  })

  const login = async (variables: LoginUserMutationVariables) => {
    const result = await loginMutation({ variables })
    const payload = result.data?.loginUser
    if (!payload?.token || !payload?.user) {
      throw new Error('Invalid email or password.')
    }
    return {
      token: payload.token,
      exp: payload.exp ?? 0,
      user: payload.user as AuthUser,
    }
  }

  return { login, loading, error }
}

// ── Logout ────────────────────────────────────────────────────────────────────

export const useLogoutUser = () => {
  const [logoutMutation] = useMutation(LogoutUserDocument, {
    fetchPolicy: 'no-cache',
  })

  // Fire-and-forget — caller clears local state independently
  const logout = () => logoutMutation().catch(() => {})

  return { logout }
}
