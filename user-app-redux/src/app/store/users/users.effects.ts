import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import Swal from 'sweetalert2';

import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import {
  add,
  addSuccess,
  findAllPageable,
  load,
  remove,
  removeSuccess,
  setErrors,
  update,
  updateSuccess,
} from './users.actions';

@Injectable()
export class UsersEffects {
  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(load),
      exhaustMap((action) =>
        this.userService.findAllPageable(action.page).pipe(
          map((pageable) => {
            const users = pageable.content as User[];
            const paginator = pageable;

            return findAllPageable({ users, paginator });
          }),
          catchError((error) => of(error))
        )
      )
    )
  );

  addUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(add),
      exhaustMap((action) =>
        this.userService.create(action.userCreated).pipe(
          map((userCreated) => addSuccess({ userCreated })),
          catchError((error) =>
            error.status == 400
              ? of(
                  setErrors({
                    userForm: action.userCreated,
                    errors: error.error,
                  })
                )
              : of(error)
          )
        )
      )
    )
  );

  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(update),
      exhaustMap((action) =>
        this.userService.update(action.userUpdated).pipe(
          map((userUpdated) => updateSuccess({ userUpdated })),
          catchError((error) =>
            error.status == 400
              ? of(
                  setErrors({
                    userForm: action.userUpdated,
                    errors: error.error,
                  })
                )
              : of(error)
          )
        )
      )
    )
  );

  removeUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(remove),
      exhaustMap((action) =>
        this.userService
          .remove(action.id)
          .pipe(map(() => removeSuccess({ id: action.id })))
      )
    )
  );

  addUserSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(addSuccess),
        tap(() => {
          this.router.navigate(['/users']);
          Swal.fire({
            title: 'User saved!',
            text: 'The user was saved!',
            icon: 'success',
          });
        })
      ),
    { dispatch: false }
  );

  updateUserSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updateSuccess),
        tap(() => {
          this.router.navigate(['/users']);
          Swal.fire({
            title: 'User updated!',
            text: 'The user was updated!',
            icon: 'success',
          });
        })
      ),
    { dispatch: false }
  );

  removUserSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(removeSuccess),
        tap(() => {
          this.router.navigate(['/users']);
          Swal.fire({
            title: 'Removed!',
            text: 'Your user has been removed.',
            icon: 'success',
          });
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private userService: UserService,
    private router: Router
  ) {}
}
