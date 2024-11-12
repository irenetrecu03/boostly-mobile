import 'dotenv/config';
import { ExpoConfig, ConfigContext } from '@expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'boostly_mobile',
  slug: 'boostly',
  extra: {
    apiUrl: process.env.API_URL,
  },
});