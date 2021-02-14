# fe-bootstrap

[ development instructions ](#dev)<br />
[ npm built package ](#build)
<br /><br />
 special thanks to @devexperts team for them amazing work ;)
 https://github.com/Devexperts
 

<hr  />
<br /><br />
<a name="dev"></a>

## Development instructions

run development mode
 > yarn start

create optimized production build

 > yarn build

... run it:
  > yarn build:run

 run tests

 > yarn test

 check repository code integrity

 > yarn cicheck

 check code linting rules

 > yarn lint
 
 ... fix it:

 > yarn lint:fix

play with demo components

 > yarn storybook

publish build in registry

 > yarn publish

 stack:
 - typescript
 - react
 - rxjs
 - fp-ts
 - css modules
 - jest
 - eslint
 - storybook


conventions:
 - conventional commits (https://udacity.github.io/git-styleguide/)

<a name="build"></a>
## npm built package

The package in npm containx exclusively the production ready files to be served from a static HTTP server.

You can run it with `yarn build:run`, but for real production deplyment we recomend using somthing like [nginx](https://www.nginx.com/).
