import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root',
})
export class KeycloakInitService {
  constructor(private keycloak: KeycloakService) {}

  initKeycloak(): Promise<boolean> {
    return this.keycloak.init({
      config: {
        url: 'http://localhost:8050', 
        realm: 'myrealm',           
        clientId: 'fixora',          
      },
      initOptions: {
        onLoad: 'check-sso',    
        checkLoginIframe: false,     
      },
      enableBearerInterceptor: true, 
      bearerExcludedUrls: ['/assets', '/public'], 
    });
  }
}
