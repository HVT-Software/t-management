"use client";

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@components/ui/resizable";
import React, { useEffect, useState } from "react";
import { EditorPannel } from "../../_components/editor-pannel";
import { useIsMobile } from "@hooks/use-mobile";

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
  const isMobile = useIsMobile();

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

  return isMobile ? (
    <div className="flex flex-col w-full h-[calc(100vh-4rem)]">
      <EditorPannel value={json} language={editorLanguage} onChange={setJson} className="max-h-[calc(50%)]" />
      <EditorPannel language={resultLanguage} value={transformedCode} readOnly={true} className="max-h-[calc(50%)]" />
    </div>
  ) : (
    <ResizablePanelGroup direction="horizontal" className="w-full h-[calc(100vh-4rem)] flex-col">
      <ResizablePanel className="h-full">
        <EditorPannel value={json} language={editorLanguage} onChange={setJson} />
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel>
        <EditorPannel language={resultLanguage} value={transformedCode} readOnly={true} />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default React.memo(ConversionPanel);
