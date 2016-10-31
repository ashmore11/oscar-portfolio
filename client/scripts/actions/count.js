import { INCREMENT, DECREMENT } from 'app/constants';

export function increment() {
  return { type: INCREMENT };
}
export function decrement() {
  return { type: DECREMENT };
}
