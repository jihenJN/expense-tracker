import * as ExpenseActions from './expense.actions';
import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ExpenseService } from './expense.service';
import { catchError, exhaustMap, map, of } from 'rxjs';

@Injectable()
export class ExpenseEffects {
  private actions$ = inject(Actions);
  private expenseService = inject(ExpenseService);

  //load Expense
  loadExpense$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ExpenseActions.loadExpenses),
      exhaustMap(() =>
        this.expenseService.getExpenses().pipe(
          map((expenses) => ExpenseActions.loadExpensesSuccess({ expenses })),
          catchError((error) => of(ExpenseActions.loadExpensesFailure({ error })))
        )
      )
    )
  );

   //add Expense
  addExpense$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ExpenseActions.addExpense),
      exhaustMap(action =>
        this.expenseService.addExpense(action.expenseData).pipe(
          map(expense => ExpenseActions.addExpenseSuccess({ expense })),
          catchError((error) => of(ExpenseActions.addExpenseFaillure({ error })))
        )
      )
    )
  );


   //update Expense
  updateExpense$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ExpenseActions.updateExpense),
      exhaustMap(action =>
        this.expenseService.updateExpense(action.expense).pipe(
          map(expense => ExpenseActions.updateExpenseSuccess({ expense })),
          catchError((error) => of(ExpenseActions.updateExpenseFaillure({ error })))
        )
      )
    )
  );

   //delete Expense
  deleteExpense$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ExpenseActions.deleteExpense),
      exhaustMap(action =>
        this.expenseService.deleteExpense(action.expenseId).pipe(
          map(() => ExpenseActions.deleteExpenseSuccess({ expenseId:action.expenseId })),
          catchError((error) => of(ExpenseActions.deleteExpenseFaillure({ error })))
        )
      )
    )
  );
}
