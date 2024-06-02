const path = require("path");

module.exports = {
    entry: "./src/index.tsx",
    mode: "development",
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "dist"),
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
    },
    module: {
        rules: [
            {
                test: /\.tsx?/i,
                use: {
                    loader: "ts-loader",
                    options: {
                        projectReferences: true,
                        experimentalWatchApi: true,
                        transpileOnly: true,
                    },
                },
                exclude: /node_modules/,
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: {
                    loader: "file-loader",
                },
            },
        ],
    },
    devServer: {
        historyApiFallback: true,
        proxy: [
            {
                context: ["/api"],
                target: "http://localhost:3000",
                pathRewrite: { "^/api": "" },
            },
            {
                context: ["/python"],
                target: "http://localhost:3001",
                pathRewrite: { "^/python": "" },
            },
        ],
    },
};
