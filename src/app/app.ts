import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavTabs } from "./shared/nav-tabs/nav-tabs";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavTabs],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'HybridExchange';
}
