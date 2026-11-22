import { transition, initial, type Action } from '../simulation/game';
import { load, save } from '../persistence/save';
let state = load();
const listeners = new Set<() => void>();
export const snapshot = () => state;
export const subscribe = (fn: () => void) => { listeners.add(fn); return () => { listeners.delete(fn); }; };
export function command(action: Action | 'load' | 'reset' | 'save') {
  const next = action === 'load' ? load() : action === 'reset' ? initial() : action === 'save' ? state : transition(state, action);
  save(next); state = next; listeners.forEach(fn => fn());
}
