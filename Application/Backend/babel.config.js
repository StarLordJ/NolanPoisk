module.exports = {
    test: ["**/*.ts"],
    presets: [
        "@babel/preset-typescript",
        [
            "@babel/preset-env",
            {
                targets: {
                    node: 6,
                },
                useBuiltIns: false,
                shippedProposals: true,
            },
        ],
    ],
    plugins: [
        "@babel/plugin-syntax-object-rest-spread",
        ["@babel/plugin-proposal-decorators", { legacy: true }],
        ["@babel/plugin-proposal-class-properties", { loose: true }]
    ],
    ignore: ["node_modules"],
};
