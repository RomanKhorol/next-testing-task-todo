// module.exports = {
//   presets: [
//     "next/babel",
//     "@babel/preset-typescript",
//     [
//       "@babel/preset-react",
//       {
//         runtime: "automatic", // Включаем автоматический импорт React
//       },
//     ],
//   ],
//   plugins: [
//     "@babel/plugin-proposal-class-properties",
//     "@babel/plugin-proposal-optional-chaining",
//   ],
// };
module.exports = {
  presets: ["next/babel", "@babel/preset-typescript", "@babel/preset-react"],
  plugins: [
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-proposal-optional-chaining",
  ],
};
// module.exports = {
//   presets: [
//     "@babel/preset-env",
//     { targets: { node: "current" } },
//     "@babel/preset-typescript",
//   ],
// };
