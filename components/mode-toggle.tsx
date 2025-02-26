"use client";

import { Moon, Settings, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  console.log(theme);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild value={theme}>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Chọn mode</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")} className={`${theme === "light" && "bg-accent"}`}>
          <Sun className="mr-2 h-4 w-4" />
          Sáng
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")} className={`${theme === "dark" && "bg-accent"}`}>
          <Moon className="mr-2 h-4 w-4" />
          Tối
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")} className={`${theme === "system" && "bg-accent"}`}>
          <Settings className="mr-2 h-4 w-4" />
          Hệ thống
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
