import { ApolloClient, InMemoryCache, createHttpLink, from } from '@apollo/client/core';
import { CombinedGraphQLErrors } from '@apollo/client/errors';
import { setContext } from '@apollo/client/link/context';
import { ErrorLink } from '@apollo/client/link/error';
import { GRAPHQL_URL } from '../../../lib/constants';
import { storage } from '../../../lib/storage';
import { tokenManager } from '../../../lib/token-manager';

const authLink = setContext(async (_, { headers }) => {
  const token = await tokenManager.getValidToken();
  return {
    headers: {
      ...headers,
      ...(token ? { Authorization: `JWT ${token}` } : {}),
    },
  };
});

let onUnauthenticated: (() => void) | null = null;

export function setUnauthenticatedHandler(fn: () => void) {
  onUnauthenticated = fn;
}

function isAuthError(error: unknown): boolean {
  if (CombinedGraphQLErrors.is(error)) {
    return error.errors.some(
      (e) =>
        e.extensions?.code === 'UNAUTHENTICATED' ||
        (typeof e.message === 'string' &&
          e.message.toLowerCase().includes('not authorized')),
    );
  }
  if (error instanceof Error && 'statusCode' in error) {
    return (error as Error & { statusCode: number }).statusCode === 401;
  }
  return false;
}

const errorLink = new ErrorLink(({ error }) => {
  if (isAuthError(error)) {
    storage.clear();
    onUnauthenticated?.();
  }
});

const httpLink = createHttpLink({ uri: GRAPHQL_URL });

export const apolloClient = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: { errorPolicy: 'all' },
    query: { errorPolicy: 'all' },
  },
});
