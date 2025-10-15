import { ExpenseCategory } from './../expenses/expense.model';
import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Expense } from '../expenses/expense.model';
import * as ExpenseSelectors from '../expenses/expense.selectors';
import * as ExpenseActions from '../expenses/expense.actions';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-expense-tracker',
  imports: [CommonModule, FormsModule],
  templateUrl: './expense-tracker.html',
  styleUrl: './expense-tracker.css',
})
export class ExpenseTracker {
  private store = inject(Store);
  //allExpenses
  //isloading
  //totalIncome
  //totalExpense
  //netBalance
  allExpenses$!: Observable<Expense[]>;
  isLoading$!: Observable<boolean>;
  totalIncomes$!: Observable<number>;
  totalExpenses$!: Observable<number>;
  netBalance$!: Observable<number>;

  //for properties
  isEditing = false;
  expenseCategories: ExpenseCategory[] = [
    'Food',
    'Transport',
    'Shopping',
    'Utilities',
    'Income',
    'Other',
  ];
  formModel: Omit<Expense, 'id'> & { id?: string } = {
    description: '',
    amount: 0,
    category: 'Food',
    date: new Date().toISOString().split('T')[0],
  };

  constructor() {
    this.allExpenses$ = this.store.select(ExpenseSelectors.selectAllExpenses);

    this.isLoading$ = this.store.select(ExpenseSelectors.selectExpensesLoding);
    this.totalIncomes$ = this.store.select(ExpenseSelectors.selectTotalIncome);
     console.log(this.totalIncomes$);
    this.totalExpenses$ = this.store.select(ExpenseSelectors.selectTotalExpense);
    this.netBalance$ = this.store.select(ExpenseSelectors.selectNetBalance);
  }

  ngOnInit(): void {
    //loading the expenses
    this.store.dispatch(ExpenseActions.loadExpenses());

  }

  onSubmit(form: NgForm) {
    if (form.invalid) return;
    if (this.isEditing && this.formModel.id) {
      this.store.dispatch(ExpenseActions.updateExpense({ expense: this.formModel as Expense }));
      //editing the form
    } else {
      //adding to the form
      const expenseData: ExpenseActions.ExpenseData = {
        description: this.formModel.description,
        amount: this.formModel.amount,
        category: this.formModel.category,
        date: new Date(this.formModel.date).toISOString(),
      };
      this.store.dispatch(ExpenseActions.addExpense({ expenseData }));
    }

    form.resetForm();
    this.resetForm();
  }

  onDelete(expenseId: string) {
    if (confirm('Are you sure you want to delete this transaction?')) {
      this.store.dispatch(ExpenseActions.deleteExpense({ expenseId }));
    }
  }

  onEdit(expense:Expense){
      this.isEditing=true;
      this.formModel={
        ...expense,
        date: new Date(expense.date).toISOString().split('T')[0]
      };
      window.scrollTo(0,0);
  }

  onCancelEdit(form:NgForm){
    form.resetForm();
    this.resetForm();
    }

  resetForm() {
    this.isEditing = false;
    this.formModel = {
      description: '',
      amount: 0,
      category: 'Food',
      date: new Date().toISOString().split('T')[0],
    };
  }
}
