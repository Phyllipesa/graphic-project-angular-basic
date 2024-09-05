import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PieComponent } from './pages/pie/pie.component';
import { BarComponent } from './pages/bar/bar.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'pie', component: PieComponent },
    { path: 'bar', component: BarComponent }
];
