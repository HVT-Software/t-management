"use client";

import React from "react";
import Editor from "@monaco-editor/react";
import type { EditorProps } from "@monaco-editor/react";

export function processSize(size: string) {
  return !/^\d+$/.test(size) ? size : `${size}px`;
}

interface MonacoProps {
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

export const Monaco: React.FC<MonacoProps> = ({ language, value, defaultValue, height, width, options, onChange, readOnly }) => {
  return (
    <div className="h-full w-full">
      <div className="flex justify-between">Al</div>
      <Editor
        defaultLanguage={language}
        defaultValue={defaultValue}
        value={value}
        height={height}
        width={width}
        options={{ ...options, readOnly: readOnly }}
        onChange={onChange}
        // TODO: Add loading state
        // loading={
        //   <Pane
        //     display="flex"
        //     alignItems="center"
        //     justifyContent="center"
        //     height={400}
        //     flex={1}
        //   >
        //     <Spinner />
        //   </Pane>
        // }
      />
    </div>
  );
};

export default Monaco;
