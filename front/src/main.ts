import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { KeycloakInitService } from './app/services/keycloak.service';
import { KeycloakService } from 'keycloak-angular';

const keycloakService = new KeycloakInitService(new KeycloakService());

keycloakService
  .initKeycloak()
  .then(() => {
    platformBrowserDynamic()
      .bootstrapModule(AppModule, {
        ngZoneEventCoalescing: true,
      })
      .catch((err) => console.error('Bootstrap error:', err));
  })
  .catch((error) => console.error('Keycloak initialization failed:', error));
