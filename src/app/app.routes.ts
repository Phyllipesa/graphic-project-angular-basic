import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { BarComponent } from './pages/bar/bar.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'bar', component: BarComponent }
];
