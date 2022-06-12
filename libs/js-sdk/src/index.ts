export * from './lib/js-sdk';

declare global {
  interface Safari {
    pushNotification: boolean;
  }

  interface Window {
    HTMLElement: never;
    safari?: Safari;
  }
}
