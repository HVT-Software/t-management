"use client";

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useSettings } from "@/hooks/useSettings";
import { useCallback } from "react";
import ConversionPanel from "./_components/conversion-panel";

export default function JsonToTypescript() {
  const name = "JSON to Typescript";

  const [settings] = useSettings(name, {
    typealias: false
  });

  const transformer = useCallback(
    async (value: string) => {
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

  console.log("render");

  return (
    <main>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">Tools</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Json to Typescript</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <ConversionPanel transformer={transformer} editorLanguage="json" resultLanguage={"typescript"} />
    </main>
  );
}
