import { createApp } from '@backstage/frontend-defaults';
import { createFrontendModule } from '@backstage/frontend-plugin-api';
import { SignInPageBlueprint } from '@backstage/plugin-app-react';
import catalogPlugin from '@backstage/plugin-catalog/alpha';
import { SignInPage, type SignInProviderConfig } from '@backstage/core-components';
import { githubAuthApiRef } from '@backstage/core-plugin-api';
import { navModule } from './modules/nav';
import { homeModule } from './modules/home';
 
const githubProvider: SignInProviderConfig = {
  id: 'github-auth-provider',
  title: 'GitHub',
  message: 'Sign in using GitHub',
  apiRef: githubAuthApiRef,
};
 
const signInPageModule = createFrontendModule({
  pluginId: 'app',
  extensions: [
    SignInPageBlueprint.make({
      params: {
        loader: async () => {
          return props => (
            <SignInPage {...props} auto provider={githubProvider} />
          );
        },
      },
    }),
  ],
});
 
export default createApp({
  features: [catalogPlugin, navModule, homeModule, signInPageModule],
});