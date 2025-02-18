import Monaco from "./monaco";
import React, { useState } from "react";

interface ConversionPanelProps {
  transformer: (value: string | undefined) => Promise<string>;
  editorLanguage: string;
  resultLanguage: string;
}

export const ConversionPanel: React.FC<ConversionPanelProps> = ({ transformer, editorLanguage, resultLanguage }) => {
  const [transformedCode, setTransformedCode] = useState<string>("");

  const handleInputChange = async (value: string | undefined) => {
    const result = await transformer(value);
    setTransformedCode(result);
  };

  return (
    <div className="grid grid-cols-7 gap-2 h-screen m-2">
      <div className="border border-collapse col-span-3">
        <Monaco language={editorLanguage} onChange={handleInputChange} />
      </div>
      <div className="col-span-1"></div>
      <div className="border border-collapse col-span-3">
        <Monaco language={resultLanguage} value={transformedCode} readOnly={true} />
      </div>
    </div>
  );
};
