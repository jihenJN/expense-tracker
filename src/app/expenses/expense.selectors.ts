import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ExpenseState } from './expense.model';
import * as fromExpenses from './expense.reducer';

export const selectExpenseState = createFeatureSelector<ExpenseState>(
  fromExpenses.expensesKeyFeature
);
//basic selectors
export const selectAllExpenses = createSelector(selectExpenseState, (state) => state.items);

export const selectExpensesLoding = createSelector(selectExpenseState, (state) => state.loading);

export const selectExpenseError = createSelector(selectExpenseState, (state) => state.error);

export const selectIncomesItems = createSelector(selectAllExpenses, (expenses) =>
  expenses.filter((expense) => expense.category === 'Income')
);

export const selectExpensesItems = createSelector(selectAllExpenses, (expenses) =>
  expenses.filter((expense) => expense.category !== 'Income')
);

export const selectTotalIncome = createSelector(selectIncomesItems, (incomeItems) =>
  incomeItems.reduce((total, item) => total + item.amount, 0)
);

export const selectTotalExpense = createSelector(selectExpensesItems, (expenseItems) =>
  expenseItems.reduce((total, item) => total + item.amount, 0)
);

export const selectNetBalance = createSelector(
  selectTotalIncome,
  selectTotalExpense,
  (totalIncome, totalExpense) => totalIncome - totalExpense
);
