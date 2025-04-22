"use client";
import { useReducer } from "react";
import { UseFormReturn } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";

type TextInputProps = {
  form: UseFormReturn<any>;
  name: string;
  label: string;
  placeholder?: string;
  className?: string;
};

// Brazilian currency config
const moneyFormatter = new Intl.NumberFormat("vi-VN", {
  style: "decimal",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0
});

export default function MoneyInput(props: TextInputProps) {
  const initialValue = props.form.getValues()[props.name] ? moneyFormatter.format(props.form.getValues()[props.name]) : "";

  const [value, setValue] = useReducer((_: any, next: string) => {
    const digits = next.replace(/\D/g, "");
    return moneyFormatter.format(Number(digits));
  }, initialValue);

  function handleChange(realChangeFn: (value: number) => void, formattedValue: string): void {
    const digits = formattedValue.replace(/\D/g, "");
    const realValue = Number(digits);
    realChangeFn(realValue);
  }

  return (
    <FormField
      control={props.form.control}
      name={props.name}
      render={({ field }) => {
        field.value = value;
        const _change = field.onChange;

        return (
          <div className={props.className}>
            <FormItem>
              <FormLabel>{props.label}</FormLabel>
              <FormControl>
                <Input
                  placeholder={props.placeholder}
                  type="text"
                  {...field}
                  onChange={ev => {
                    setValue(ev.target.value);
                    handleChange(_change, ev.target.value);
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
