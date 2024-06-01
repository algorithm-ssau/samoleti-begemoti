import * as esbuild from "esbuild";

await esbuild.build({
    entryPoints: ["src/index.ts"],
    bundle: true,
    outfile: "prod/server.js",
    platform: "node",
    minify: true,
    loader: {
        ".html": "file",
    },
});
