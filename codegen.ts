import type { CodegenConfig } from '@graphql-codegen/cli';

const apiUrl = process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:3333';

const config: CodegenConfig = {
  overwrite: true,
  schema: `${apiUrl}/api/graphql`,
  documents: 'src/services/gql/**/*.{gql,graphql}',
  generates: {
    './src/services/gql/types/': {
      preset: 'client',
      plugins: [],
    },
  },
};

export default config;
