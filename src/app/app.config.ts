import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
  isDevMode,
} from '@angular/core';
import { ActionReducer,provideState,provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideHttpClient } from '@angular/common/http';

import * as fromExpenses from './expenses/expense.reducer';
import {ExpenseEffects} from './expenses/expense.effects';

import { localStorageSync } from 'ngrx-store-localstorage';

function expenseLocalStorageSyncReducer(reducer:ActionReducer<any>) : ActionReducer<any>
{
  return localStorageSync({
    keys:[fromExpenses.expensesKeyFeature],
    rehydrate:true,
    storage:window.localStorage
  })(reducer);
}

const metaReducers=[expenseLocalStorageSyncReducer]

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing:true}),
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(),
    provideStore({},{metaReducers}),
    provideState(fromExpenses.expensesKeyFeature,fromExpenses.expenseReducer),
    provideEffects([ExpenseEffects]),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
  ],
};
