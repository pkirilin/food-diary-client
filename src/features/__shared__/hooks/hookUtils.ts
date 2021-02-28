import { useState } from 'react';
import { InputHook } from './types';

export function createInputHook<TValue, TBindingProps>(
  createBinding: (
    value: TValue,
    setValue: React.Dispatch<React.SetStateAction<TValue>>,
  ) => TBindingProps,
): InputHook<TValue, TBindingProps> {
  return initialValue => {
    const [value, setValue] = useState(initialValue);
    return [value, setValue, () => createBinding(value, setValue)];
  };
}