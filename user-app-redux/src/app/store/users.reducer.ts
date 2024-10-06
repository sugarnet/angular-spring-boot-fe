import { createReducer, on } from '@ngrx/store';
import { User } from '../models/user';
import {
  add,
  find,
  findAll,
  remove,
  setPaginator,
  update,
} from './users.action';

const users: User[] = [];
const user: User = new User();

export const usersReducer = createReducer(
  {
    users,
    paginator: {},
    user,
  },
  on(findAll, (state, { users }) => ({
    users: [...users],
    paginator: state.paginator,
    user: state.user,
  })),
  on(find, (state, { id }) => ({
    users: state.users,
    paginator: state.paginator,
    user: state.users.find((user) => user.id == id) || new User(),
  })),
  on(setPaginator, (state, { paginator }) => ({
    users: state.users,
    paginator: { ...paginator },
    user: state.user,
  })),
  on(add, (state, { userCreated }) => ({
    users: [...state.users, { ...userCreated }],
    paginator: state.paginator,
    user: state.user,
  })),
  on(update, (state, { userUpdated }) => ({
    users: state.users.map((u) =>
      u.id == userUpdated.id ? { ...userUpdated } : u
    ),
    paginator: state.paginator,
    user: state.user,
  })),
  on(remove, (state, { id }) => ({
    users: state.users.filter((user) => user.id != id),
    paginator: state.paginator,
    user: state.user,
  }))
);
