import parserFlow from "prettier/parser-flow";
import parserGraphql from "prettier/parser-graphql";
import parserHtml from "prettier/parser-html";
import parserMarkdown from "prettier/parser-markdown";
import parserPostcss from "prettier/parser-postcss";
import parserTypescript from "prettier/parser-typescript";
import parserYaml from "prettier/parser-yaml";
import prettier from "prettier/standalone";
import { prettierParsers, supportedLanguages } from "./prettier";


const plugins = [
  parserHtml,
  parserPostcss,
  parserGraphql,
  parserMarkdown,
  parserYaml,
  parserFlow,
  parserTypescript
];

export async function prettify(language: string, value: string) {
  let result;

  if (!supportedLanguages.includes(language)) return value;

  if (language === "json") {
    result = JSON.stringify(JSON.parse(value), null, 2);
  } else {
    result = prettier.format(value, {
      parser: prettierParsers[language as keyof typeof prettierParsers] || language,
      plugins,
      semi: false
    });
  }

  return result;
}
