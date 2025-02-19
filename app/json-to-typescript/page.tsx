"use client";

import { useCallback } from "react";
import { useSettings } from "../../hooks/useSettings";
import { ConversionPanel } from "./_components/conversion-panel";

export default function JsonToTypescript() {
  const name = "JSON to Typescript";

  const [settings] = useSettings(name, {
    typealias: false
  });

  const transformer = useCallback(
    async (value: string | undefined) => {
      if (!value) return "";
      const { run } = await import("json_typegen_wasm");
      return run(
        "Root",
        value,
        JSON.stringify({
          output_mode: settings.typealias ? "typescript/typealias" : "typescript"
        })
      );
    },
    [settings]
  );

  return <ConversionPanel transformer={transformer} editorLanguage="json" resultLanguage={"typescript"} />;
}
