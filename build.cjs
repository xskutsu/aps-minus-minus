const esbuild = require("esbuild");
const args = process.argv.slice(2);
const isWatch = args.includes("--watch");
(async function () {
	const options = {
		entryPoints: ["./src/server/index.ts"],
		bundle: true,
		sourcemap: true,
		logLevel: "info",
		format: "cjs",
		outfile: "dist/aps-minus-minus-server.cjs.js",
		platform: "node"
	};
	const ctx = await esbuild.context(options);
	if (isWatch) {
		await ctx.watch();
		console.log(`Watching to outfile: ${options.outfile}`);
	} else {
		await ctx.rebuild();
		await ctx.dispose();
		console.log(`Built outfile: ${options.outfile}`);
	}
})();