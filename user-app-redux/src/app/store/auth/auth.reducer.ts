import { createReducer, on } from "@ngrx/store";
import { login, loginSuccess, logout } from "./auth.actions";

export const initialLogin = {
    isAuth: false,
    isAdmin: false,
    user: undefined
}

export const initialState = JSON.parse(sessionStorage.getItem('login') || JSON.stringify(initialLogin));

export const authReducer = createReducer(
    initialState,
    on(loginSuccess, (state, { login }) => ({
        isAuth: true,
        isAdmin: login.isAdmin,
        user: login.user
    })),
    on(logout, (state) => ({ ...initialLogin }))
)