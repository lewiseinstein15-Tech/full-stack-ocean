module.exports = function(api) {
  api.cache.using(() => ({
    createRequire: (filepath) => require('module').createRequire(path.resolve(filepath))
  }));
  api.cache.forever();
  
  return {
    presets: [
      ['@babel/preset-env', { targets: { node: 'current' } }],
      ['@babel/preset-react', { runtime: 'automatic' }]
    ]
  };
};