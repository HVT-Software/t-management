import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { toCurrency } from "@/utils/format";
import * as SelectPrimitive from "@radix-ui/react-select";

interface SelectCategoryItemProps extends React.ComponentProps<typeof SelectPrimitive.Item> {
  remaining?: number;
}

function SelectCateroryItem({ className, children, remaining = 0, ...props }: SelectCategoryItemProps) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2 hover:bg-accent data-[state=checked]:bg-accent/50 data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground",
        className
      )}
      {...props}
    >
      <SelectPrimitive.ItemText>
        {children} {toCurrency(remaining)}
      </SelectPrimitive.ItemText>
      <span className="absolute right-2 flex size-3.5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <Badge className="w-[80px]" variant="default">
            {toCurrency(remaining)}
          </Badge>
        </SelectPrimitive.ItemIndicator>
      </span>
    </SelectPrimitive.Item>
  );
}

export { SelectCateroryItem };
