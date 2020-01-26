import { useState } from 'react';
import { DropdownToggleDirection, DropdownContentAlignment } from './dropdown-types';

export const useToggle = (
  disabled: boolean,
): [
  // isOpen dropdown state
  boolean,

  // Toggle dropdown function
  () => void,

  // Close dropdown function
  () => void,
] => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = (): void => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const close = (): void => {
    setIsOpen(false);
  };

  return [isOpen, toggle, close];
};

export const useCloseIfTargetOutside = (close: () => void): ((target: HTMLElement) => void) => {
  const closeIfTargetOutside = (target: HTMLElement): void => {
    if (!target.matches('.dropdown')) {
      close();
    }
  };

  return closeIfTargetOutside;
};

export const useContentStyle = (
  toggleDirection: DropdownToggleDirection,
  elementBasedContentWidth: boolean,
  dropdownElement: React.RefObject<HTMLElement>,
  contentBlockHeight: number,
): React.CSSProperties => {
  const contentStyle: React.CSSProperties = {};

  if (toggleDirection === 'top') {
    contentStyle.top = `-${contentBlockHeight.toString()}px`;
  }

  if (!elementBasedContentWidth) {
    if (dropdownElement && dropdownElement.current) {
      contentStyle.width = `${dropdownElement.current.clientWidth}px`;
    }
  }

  return contentStyle;
};

export const useContentClassNames = (isOpen: boolean, contentAlignment: DropdownContentAlignment): string[] => {
  const contentClassNames = ['dropdown__content'];

  if (isOpen) {
    contentClassNames.push('dropdown__content_opened');
  }

  if (contentAlignment === 'right') {
    contentClassNames.push('dropdown__content_right');
  }

  return contentClassNames;
};

export const useTogglerClassNames = (isOpen: boolean, isDisabled: boolean): string[] => {
  const togglerClassNames = ['dropdown__toggler'];

  if (isOpen) {
    togglerClassNames.push('dropdown__toggler_active');
  }

  if (isDisabled) {
    togglerClassNames.push('dropdown__toggler_disabled');
  }

  return togglerClassNames;
};

export const useTogglerValueClassNames = (selectedValueChanged: boolean, isDisabled: boolean): string[] => {
  const togglerValueClassNames = ['dropdown__toggler__value'];

  if (!selectedValueChanged) {
    togglerValueClassNames.push(`dropdown__toggler__value_${isDisabled ? 'placeholder-disabled' : 'placeholder'}`);
  }

  if (isDisabled) {
    togglerValueClassNames.push('dropdown__toggler__value_disabled');
  }

  return togglerValueClassNames;
};

export const useTogglerIconClassNames = (isDisabled: boolean): string[] => {
  const togglerIconClassNames = ['dropdown__toggler__icon'];

  if (isDisabled) {
    togglerIconClassNames.push('dropdown__toggler__icon_disabled');
  }

  return togglerIconClassNames;
};