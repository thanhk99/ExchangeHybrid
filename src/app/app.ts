import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavTabs } from "./shared/nav-tabs/nav-tabs";
import { HeaderComponent } from './header/header.component';
import { Footer } from './footer/footer';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavTabs,HeaderComponent, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'HybridExchange';
}
