
export type ExpenseCategory='Food'|'Transport'|'Utilities'|'Shopping'|'Income'|'Other';

export interface Expense {
id:string;
description:string;
amount:number;
category:ExpenseCategory;
date:string;

}

export interface ExpenseState{
  items :Expense[];
  loading:boolean;
  error:string|null;
}

