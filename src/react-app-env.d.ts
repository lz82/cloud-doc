/// <reference types="react-scripts" />
declare module '*.module.less' {
  const css: { readonly [key: string]: string };

  export default css;
}

declare var YpRiddler;

declare var __REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

declare module '@loadable/component'
