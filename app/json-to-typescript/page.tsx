"use client";

import { useCallback } from "react";
import { useSettings } from "../../hooks/useSettings";

export default function JsonToTypescript() {
  const name = "JSON to Typescript";

  const [settings, setSettings] = useSettings(name, {
    typealias: false
  });

  console.log(settings);
  const transformer = useCallback(
    async ({ value }: { value: string }) => {
      const { run } = await import("json_typegen_wasm");
      return run(
        "Root",
        value,
        JSON.stringify({
          output_mode: settings.typealias
            ? "typescript/typealias"
            : "typescript"
        })
      );
    },
    [settings]
  );


  return (
    <ConversionPanel
      transformer={transformer}
      editorTitle="JSON"
      editorLanguage="json"
      resultTitle="TypeScript"
      resultLanguage={"typescript"}
      editorSettingsElement={setSettings}
      settings={settings}
    />
  );
}
