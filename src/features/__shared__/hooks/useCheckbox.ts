import { InputHTMLAttributes, useState } from 'react';
import { BindableValueHookResult } from './types';

export type CheckboxBinding = Pick<InputHTMLAttributes<HTMLInputElement>, 'checked' | 'onChange'>;

export type CheckboxHookResult = BindableValueHookResult<boolean, CheckboxBinding>;

export function useCheckbox(initialValue = false): CheckboxHookResult {
  const [value, setValue] = useState(initialValue);

  return {
    value,
    setValue,
    binding: {
      checked: value,
      onChange: (): void => {
        setValue(!value);
      },
    },
  };
}
