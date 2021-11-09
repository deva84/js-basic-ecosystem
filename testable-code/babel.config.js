module.exports = api => {
  const isTest = api.env('test');
  return {
    presets: [
      '@babel/preset-typescript',
      [
        '@babel/preset-env',
        {
          targets: {
            node: 'current',
          },
          modules: isTest ? 'commonjs' : false,
        },
      ],
    ],
    plugins: ['@babel/plugin-transform-modules-commonjs', '@babel/plugin-proposal-class-properties'],
  };
};
