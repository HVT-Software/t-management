"use client";

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import Monaco from "./monaco";
import React, { useState } from "react";

interface ConversionPanelProps {
  transformer: (value: string | undefined) => Promise<string>;
  editorLanguage: string;
  resultLanguage: string;
}

const defaultJson = {
  id: "ab081076a21b4be78cf754169c96a582",
  type: 0,
  code: "GK",
  name: "GECKON STUDIO",
  province: null,
  district: null,
  commune: null,
  address: "",
  phone: "",
  email: null,
  isActive: true,
  isEditType: false,
  createdDate: "2024-10-25T04:31:07.714+00:00"
};

export const ConversionPanel: React.FC<ConversionPanelProps> = ({ transformer, editorLanguage, resultLanguage }) => {
  const [transformedCode, setTransformedCode] = useState<string>("");

  const handleInputChange = async (value: string | undefined) => {
    const result = await transformer(value);
    setTransformedCode(result);
  };

  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel>
        <Monaco value={JSON.stringify(defaultJson, null, 2)} language={editorLanguage} onChange={handleInputChange} />
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel>
        <Monaco language={resultLanguage} value={transformedCode} readOnly={true} />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};
