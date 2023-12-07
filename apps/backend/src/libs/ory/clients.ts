import { Inject } from '@nestjs/common';
import {
  HYDRA_CLIENT_TOKEN,
  JWK_CLIENT_TOKEN,
  METADATA_CLIENT_TOKEN,
  OAUTH2_CLIENT_TOKEN,
  OIDC_CLIENT_TOKEN,
  WELL_KNOWN_CLIENT_TOKEN,
} from './providers';

export const InjectOAuth2Client = () => Inject(OAUTH2_CLIENT_TOKEN);
export const InjectMetadataClient = () => Inject(METADATA_CLIENT_TOKEN);
export const InjectHydraClient = () => Inject(HYDRA_CLIENT_TOKEN);
export const InjectJwkClient = () => Inject(JWK_CLIENT_TOKEN);
export const InjectOidcClient = () => Inject(OIDC_CLIENT_TOKEN);
export const InjectWellKnownClient = () => Inject(WELL_KNOWN_CLIENT_TOKEN);
