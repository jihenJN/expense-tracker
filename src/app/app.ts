import { Component, signal } from '@angular/core';
import { ExpenseTracker } from "./expense-tracker/expense-tracker";

@Component({
  selector: 'app-root',
  imports: [ExpenseTracker],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
 // protected readonly title = signal('expense-tracker');
}
