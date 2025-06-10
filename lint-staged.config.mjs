export default {
  "*.{js,ts,tsx,css,mjs,cjs}": stagedFiles => [`prettier --write ${stagedFiles.join(" ")}`, "tsc", `eslint .`]
};
