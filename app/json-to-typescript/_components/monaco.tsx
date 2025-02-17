"use client"

import React from "react";
import Editor from "@monaco-editor/react";
import type { EditorProps } from '@monaco-editor/react';

export function processSize(size: string) {
  return !/^\d+$/.test(size) ? size : `${size}px`;
}

interface MonacoProps {
  theme?: string;
  language?: string;
  value?: string;
  width?: number | string;
  height?: number | string;
  options?: EditorProps['options'];
  defaultValue?: string;
  onChange: (value: string | undefined) => void;
}

export const Monaco: React.FC<MonacoProps> = ({
  language,
  value,
  defaultValue,
  height,
  width,
  options,
  onChange
}) => {
  return (
    <Editor
      defaultLanguage={language}
      defaultValue={defaultValue}
      value={value}
      height={height}
      width={width}
      options={options}
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
  );
};

export default Monaco;
