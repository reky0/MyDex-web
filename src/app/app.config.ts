import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';

import { provideRouter } from '@angular/router';
import routeConfig from './routes';
import { provideProtractorTestingSupport } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routeConfig),
    provideProtractorTestingSupport(),
  ]
};
