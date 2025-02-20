"use client";

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import React, { useEffect, useState } from "react";
import Monaco from "../../_components/monaco";

interface ConversionPanelProps {
  transformer: (value: string) => Promise<string>;
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

const ConversionPanel: React.FC<ConversionPanelProps> = ({ transformer, editorLanguage, resultLanguage }) => {
  const [json, setJson] = useState<string | undefined>(JSON.stringify(defaultJson, null, 2));
  const [transformedCode, setTransformedCode] = useState<string>("");

  useEffect(() => {
    async function transform() {
      try {
        const result = await transformer(json || "");
        setTransformedCode(result);
      } catch (e) {
        console.error(e);
      }
    }

    transform();
  }, [json, transformer]);

  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel>
        <Monaco value={json} language={editorLanguage} onChange={setJson} />
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel>
        <Monaco language={resultLanguage} value={transformedCode} readOnly={true} />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default React.memo(ConversionPanel);
