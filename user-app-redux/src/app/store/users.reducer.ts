import { createReducer, on } from "@ngrx/store";
import { User } from "../models/user";
import { findAll } from "./users.action";

const users: User[] = [];
const user: User = new User();

export const usersReducer = createReducer(
    {
        users,
        paginator: {},
        user
    },
    on(findAll, (state, {users}) => ({
        users: [...users],
        paginator: state.paginator,
        user: state.user
    }),
    ))