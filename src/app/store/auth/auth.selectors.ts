import { createFeatureSelector } from "@ngrx/store";
import { AuthState } from "./auth.state";

export const selectAuthSate = createFeatureSelector<AuthState>('auth');