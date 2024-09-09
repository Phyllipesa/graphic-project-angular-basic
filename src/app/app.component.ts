import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from "./pages/home/home.component";
import { NavbarComponent } from "./_components/navbar/navbar.component";
import { FooterComponent } from "./_components/footer/footer.component";
import { BaseUiComponent } from "./_components/base-ui/base-ui.component";
import { PieComponent } from './pages/pie/pie.component';
import { BarComponent } from './pages/bar/bar.component';
import { LineComponent } from './pages/line/line.component';
import { StackedComponent } from './pages/stacked/stacked.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    HomeComponent, 
    NavbarComponent, 
    FooterComponent, 
    BaseUiComponent, 
    PieComponent, 
    BarComponent,
    LineComponent,
    StackedComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'graphic-project-angular-basic';
}
