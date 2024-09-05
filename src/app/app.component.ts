import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from "./pages/home/home.component";
import { NavbarComponent } from "./_components/navbar/navbar.component";
import { FooterComponent } from "./_components/footer/footer.component";
import { BaseUiComponent } from "./_components/base-ui/base-ui.component";
import { PieComponent } from './pages/pie/pie.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomeComponent, NavbarComponent, FooterComponent, BaseUiComponent, PieComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'graphic-project-angular-basic';
}
