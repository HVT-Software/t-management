"use client";
import { useEffect, useReducer } from "react";
import { UseFormReturn } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";

/**
 * Props for the MoneyInput component
 * @interface MoneyInputProps
 */
interface MoneyInputProps {
  /** Form instance from react-hook-form */
  form: UseFormReturn<any>;
  /** Field name in the form */
  name: string;
  /** Label text for the input */
  label: string;
  /** Placeholder text for the input */
  placeholder?: string;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Vietnamese currency formatter
 * Formats numbers as Vietnamese currency without decimal places
 */
const MONEY_FORMATTER = new Intl.NumberFormat("vi-VN", {
  style: "decimal",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0
});

/**
 * MoneyInput component
 * A form input specifically designed for monetary values in Vietnamese Dong
 */
export function MoneyInput({ form, name, label, placeholder, className }: MoneyInputProps) {
  const initialValue = form.getValues()[name] ? MONEY_FORMATTER.format(form.getValues()[name] as number) : "0";
  const [value, setValue] = useReducer((_: string, next: string) => {
    const digits = next.replace(/\D/g, "");
    return MONEY_FORMATTER.format(Number(digits)) || "0";
  }, initialValue);

  useEffect(() => {
    if (initialValue !== value) {
      console.log(initialValue, value);
      setValue(initialValue);
    }
  }, [initialValue, value]);

  /**
   * Handles the input change, converting formatted value to number
   */
  function handleChange(realChangeFn: (value: number) => void, formattedValue: string): void {
    const digits = formattedValue.replace(/\D/g, "");
    const realValue = Number(digits);
    realChangeFn(realValue || 0);
  }

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => {
        field.value = value;
        const originalOnChange = field.onChange;

        return (
          <div className={className}>
            <FormItem>
              <FormLabel>{label}</FormLabel>
              <FormControl>
                <Input
                  placeholder={placeholder}
                  type="text"
                  {...field}
                  onChange={event => {
                    setValue(event.target.value);
                    handleChange(originalOnChange, event.target.value);
                  }}
                  value={value}
                  endIcon="₫"
                  className="[&>input]:text-right"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </div>
        );
      }}
    />
  );
}
