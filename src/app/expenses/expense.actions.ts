
import { createAction, props } from '@ngrx/store';
import { Expense } from './expense.model';

export type ExpenseData = Omit<Expense, 'id'>;

//loading
export const loadExpenses = createAction('[Expenses Page] load Expense');
export const loadExpensesSuccess = createAction(
  '[Expenses API] load Expense Success',
  props<{ expenses: Expense[] }>()
);
export const loadExpensesFailure = createAction(
  '[Expenses API] load Expense Failure',
  props<{ error: any }>()
);

//add
export const addExpense = createAction(
  '[Expenses Page] Add Expense',
  props<{ expenseData: ExpenseData }>()
);
export const addExpenseSuccess = createAction(
  '[Expenses API] Add Expense Success',
  props<{ expense: Expense }>()
);
export const addExpenseFaillure = createAction(
  '[Expenses API] Add Expense Faillure',
  props<{ error: any }>()
);


//update
export const updateExpense = createAction(
  '[Expenses Page] Update Expense',
  props<{ expense: Expense }>()
);
export const updateExpenseSuccess = createAction(
  '[Expenses API] Update Expense Success',
  props<{ expense: Expense }>()
);
export const updateExpenseFaillure = createAction(
  '[Expenses API] Update Expense Faillure',
  props<{ error: any }>()
);

//delete
export const deleteExpense = createAction(
  '[Expenses Page] Delete Expense',
  props<{ expenseId: string }>()
);
export const deleteExpenseSuccess = createAction(
  '[Expenses API] Delete Expense Success',
  props<{ expenseId: string }>()
);
export const deleteExpenseFaillure = createAction(
  '[Expenses API] Delete Expense Faillure',
  props<{ error: any }>()
);
