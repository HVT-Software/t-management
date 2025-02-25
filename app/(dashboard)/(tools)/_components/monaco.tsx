"use client";

import type { EditorProps } from "@monaco-editor/react";
import Editor from "@monaco-editor/react";
import { LoaderPinwheel } from "lucide-react";
import { useTheme } from "next-themes";
import React from "react";

export function processSize(size: string) {
  return !/^\d+$/.test(size) ? size : `${size}px`;
}

export interface MonacoProps {
  theme?: string;
  language?: string;
  value?: string;
  width?: number | string;
  height?: number | string;
  options?: EditorProps["options"];
  defaultValue?: string;
  onChange?: (value: string | undefined) => void;
  readOnly?: boolean;
}

const defaultOptions: EditorProps["options"] = {
  fontSize: 14,
  codeLens: false,
  fontFamily: "Menlo, Consolas, monospace, sans-serif",
  minimap: {
    enabled: false
  },
  quickSuggestions: false,
  lineNumbers: "on",
  renderValidationDecorations: "off"
};

export const Monaco: React.FC<MonacoProps> = ({ language, value, defaultValue, height, width, options, onChange, readOnly }) => {
  const { theme } = useTheme();

  return (
    <Editor
      defaultLanguage={language}
      defaultValue={defaultValue}
      value={value}
      height={height}
      width={width}
      theme={theme === "light" ? "light" : "vs-dark"}
      options={{ ...defaultOptions, ...options, readOnly: readOnly }}
      onChange={onChange}
      loading={
        <div className="flex items-center justify-center h-[400px] flex-1">
          <LoaderPinwheel className="animate-spin text-primary" />
        </div>
      }
    />
  );
};

export default Monaco;
