import { Provider } from '@nestjs/common';
import {
  Configuration,
  type ConfigurationParameters,
  JwkApi,
  MetadataApi,
  OAuth2Api,
  OidcApi,
  WellknownApi,
} from '@ory/client';

import { HYDRA_MODULE_OPTIONS_TOKEN } from './options';

// oauth2 client provider
export const OAUTH2_CLIENT_TOKEN = Symbol('OAUTH2_CLIENT_TOKEN');

export const oauth2ClientProvider: Provider = {
  inject: [HYDRA_MODULE_OPTIONS_TOKEN],
  provide: OAUTH2_CLIENT_TOKEN,
  useFactory(options: ConfigurationParameters) {
    return new OAuth2Api(new Configuration(options));
  },
};

// jwk client provider
export const JWK_CLIENT_TOKEN = Symbol('JWK_CLIENT_TOKEN');

export const jwkClientProvider: Provider = {
  inject: [HYDRA_MODULE_OPTIONS_TOKEN],
  provide: JWK_CLIENT_TOKEN,
  useFactory(options: ConfigurationParameters) {
    return new JwkApi(new Configuration(options));
  },
};

// oidc client provider
export const OIDC_CLIENT_TOKEN = Symbol('OIDC_CLIENT_TOKEN');
export const oidcClientProvider: Provider = {
  inject: [HYDRA_MODULE_OPTIONS_TOKEN],
  provide: OIDC_CLIENT_TOKEN,
  useFactory(options: ConfigurationParameters) {
    return new OidcApi(new Configuration(options));
  },
};

// wellknown client provider
export const WELL_KNOWN_CLIENT_TOKEN = Symbol('WELL_KNOWN_CLIENT_TOKEN');
export const wellKnownClientProvider: Provider = {
  inject: [HYDRA_MODULE_OPTIONS_TOKEN],
  provide: WELL_KNOWN_CLIENT_TOKEN,
  useFactory(options: ConfigurationParameters) {
    return new WellknownApi(new Configuration(options));
  },
};

// metadata client provider
export const METADATA_CLIENT_TOKEN = Symbol('METADATA_CLIENT_TOKEN');
export const metadataClientProvider: Provider = {
  inject: [HYDRA_MODULE_OPTIONS_TOKEN],
  provide: METADATA_CLIENT_TOKEN,
  useFactory(options: ConfigurationParameters) {
    return new MetadataApi(new Configuration(options));
  },
};

// hydra provider with all the clients
export const HYDRA_CLIENT_TOKEN = Symbol('HYDRA_CLIENT_TOKEN');

export const hydraProvider: Provider = {
  inject: [
    OAUTH2_CLIENT_TOKEN,
    JWK_CLIENT_TOKEN,
    OIDC_CLIENT_TOKEN,
    WELL_KNOWN_CLIENT_TOKEN,
    METADATA_CLIENT_TOKEN,
  ],
  provide: HYDRA_CLIENT_TOKEN,
  useFactory(
    oauth2: OAuth2Api,
    jwk: JwkApi,
    oidc: OidcApi,
    wellKnown: WellknownApi,
    metadata: MetadataApi,
  ) {
    return {
      oauth2,
      jwk,
      oidc,
      wellKnown,
      metadata,
    };
  },
};

const providers: Provider[] = [
  oauth2ClientProvider,
  jwkClientProvider,
  oidcClientProvider,
  wellKnownClientProvider,
  metadataClientProvider,
  hydraProvider,
];

export const tokens = [
  OAUTH2_CLIENT_TOKEN,
  JWK_CLIENT_TOKEN,
  OIDC_CLIENT_TOKEN,
  WELL_KNOWN_CLIENT_TOKEN,
  METADATA_CLIENT_TOKEN,
  HYDRA_CLIENT_TOKEN,
];

export type HydraClient = {
  oauth2: OAuth2Api;
  jwk: JwkApi;
  oidc: OidcApi;
  wellKnown: WellknownApi;
  metadata: MetadataApi;
};
export default providers;
