import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ServicesPageComponent } from './pages/services-page/services-page.component';
import { SoftwarePageComponent } from './pages/software-page/software-page.component';
import { MobilePageComponent } from './pages/mobile-page/mobile-page.component';
import { WebPageComponent } from './pages/web-page/web-page.component';
import { ConsultoriaPageComponent } from './pages/consultoria-page/consultoria-page.component';

export const routes: Routes = [
    { path: 'home', component: HomePageComponent },
    { path: 'services', component: ServicesPageComponent },
    { path: 'services/desarrollo', component: SoftwarePageComponent },
    { path: 'services/mobile', component: MobilePageComponent },
    { path: 'services/web', component: WebPageComponent },
    { path: 'services/consultoria', component: ConsultoriaPageComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '**', redirectTo: '/home' }
];
