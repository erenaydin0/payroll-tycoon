export type State = { version: 1; money: number; month: number; client: boolean; step: number };
export type Action = 'accept' | 'step' | 'next';
export const initial = (): State => ({ version: 1, money: 5000, month: 1, client: false, step: 0 });
export function transition(s: State, action: Action): State {
  if (action === 'accept') {
    if (s.client) throw Error('Sözleşme zaten aktif.');
    return { ...s, client: true };
  }
  if (!s.client) throw Error('Önce bir müşteri sözleşmesi kabul edin.');
  if (action === 'next') {
    if (s.step !== 3) throw Error('Önce bu ayın bordrosunu tamamlayın.');
    return { ...s, month: s.month + 1, step: 0 };
  }
  if (s.step >= 3) throw Error('Bu ayın ödemesi zaten alındı.');
  return { ...s, step: s.step + 1, money: s.money + (s.step === 2 ? 600 : 0) };
}
export function valid(s: unknown): s is State {
  if (!s || typeof s !== 'object') return false;
  const v = s as State;
  return v.version === 1 && Number.isSafeInteger(v.money) && v.money >= 5000 && Number.isSafeInteger(v.month) && v.month >= 1 && typeof v.client === 'boolean' && Number.isInteger(v.step) && v.step >= 0 && v.step <= 3 && (v.client || (v.step === 0 && v.month === 1)) && v.money === 5000 + ((v.month - 1) + (v.step === 3 ? 1 : 0)) * 600;
}
