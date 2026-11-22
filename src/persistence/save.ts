import { initial, valid, type State } from '../simulation/game';
export const KEY = 'payroll-tycoon.v1';
export function decode(raw: string | null): State {
  try { const value: unknown = JSON.parse(raw ?? 'null'); return valid(value) ? value : initial(); } catch { return initial(); }
}
export function load(): State { try { return decode(localStorage.getItem(KEY)); } catch { return initial(); } }
export function save(state: State) { localStorage.setItem(KEY, JSON.stringify(state)); }
