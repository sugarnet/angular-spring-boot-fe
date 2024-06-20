import { createAction, props } from '@ngrx/store';

export const increment = createAction(
  '[Counter Compoment] Increment',
  props<{ add: number }>()
);
export const decrement = createAction('[Counter Compoment] Decrement');
export const reset = createAction('[Counter Compoment] Reset');
