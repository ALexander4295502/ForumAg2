// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

import { isDevMode } from '@angular/core';

export const environment = (isDevMode())? {
  production: false,
  api_url: 'http://127.0.0.1:3000/api'
} : {
  production: true,
  api_url: 'https://obscure-headland-52142.herokuapp.com/api'
};
