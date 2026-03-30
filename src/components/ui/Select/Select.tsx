'use client';

import { Select as BaseSelect } from '@base-ui/react/select';
import cn from 'classnames';
import { ChevronDown, Check } from 'lucide-react';

import styles from './Select.module.scss';

type TSelectOption = {
  label: string;
  value: string;
};

type TSelectProps = {
  name: string;
  defaultValue?: string;
  options: readonly TSelectOption[];
  placeholder?: string;
  className?: string;
};

const Select = ({ name, defaultValue, options, placeholder = 'Select option', className }: TSelectProps) => {
  return (
    <BaseSelect.Root name={name} defaultValue={defaultValue}>
      <BaseSelect.Trigger className={cn(styles.trigger, className)}>
        <BaseSelect.Value placeholder={placeholder} />
        <ChevronDown size={16} />
      </BaseSelect.Trigger>

      <BaseSelect.Portal>
        <BaseSelect.Positioner sideOffset={8}>
          <BaseSelect.Popup className={styles.popup}>
            {options.map((option) => (
              <BaseSelect.Item key={option.value} className={styles.item} value={option.value}>
                <BaseSelect.ItemIndicator className={styles.indicator}>
                  <Check size={14} />
                </BaseSelect.ItemIndicator>

                <BaseSelect.ItemText>{option.label}</BaseSelect.ItemText>
              </BaseSelect.Item>
            ))}
          </BaseSelect.Popup>
        </BaseSelect.Positioner>
      </BaseSelect.Portal>
    </BaseSelect.Root>
  );
};

export { Select };
