// src/app/app.config.ts
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { provideRouter } from '@angular/router';
// import { routes } from './routes'; // si tienes rutas

export const appConfig = {
  providers: [
    importProvidersFrom(HttpClientModule), // ✅ Esto permite inyectar HttpClient
    // provideRouter(routes) // si usas rutas
  ]
};
