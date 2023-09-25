module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
       coverageReporter: {
      dir: require('path').join(__dirname, './coverage'), // O diretório de saída
      reporters: [
        { type: 'lcov', subdir: 'lcov' },
        { type: 'text-summary' },
      ],
    }
  });
};
