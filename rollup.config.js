const path = require("path");
const babel = require("rollup-plugin-babel");
const replace = require("rollup-plugin-replace");
const { uglify } = require("rollup-plugin-uglify");

const pkg = require("./package.json");

function isBareModuleId(id) {
    return !id.startsWith(".") && !id.includes(path.join(process.cwd(), "modules"));
}

const cjs = [
    {
        input: "modules/index.js",
        output: {
            file: `cjs/${pkg.name}.js`,
            sourcemap: true,
            format: "cjs",
            esModule: false,
        },
        external: isBareModuleId,
        plugins: [
            babel({ exclude: /node_modules/, sourceMaps: true }),
            replace({ "process.env.NODE_ENV": JSON.stringify("development") }),
        ],
    },
    {
        input: "modules/index.js",
        output: { file: `cjs/${pkg.name}.min.js`, sourcemap: true, format: "cjs" },
        external: isBareModuleId,
        plugins: [
            babel({ exclude: /node_modules/, sourceMaps: true }),
            replace({ "process.env.NODE_ENV": JSON.stringify("production") }),
            uglify(),
        ],
    },
];

const esm = [
    {
        input: "modules/index.js",
        output: { file: `esm/${pkg.name}.js`, sourcemap: true, format: "esm" },
        external: isBareModuleId,
        plugins: [
            babel({
                exclude: /node_modules/,
                runtimeHelpers: true,
                sourceMaps: true,
                plugins: [["@babel/transform-runtime", { useESModules: true }]],
            }),
        ],
    },
];

let config;
switch (process.env.BUILD_ENV) {
    case "cjs":
        config = cjs;
        break;
    case "esm":
        config = esm;
        break;
    default:
        config = cjs.concat(esm);
}

module.exports = config;
