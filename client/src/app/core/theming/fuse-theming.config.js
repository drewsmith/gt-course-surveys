(function () {
  'use strict';

  angular
    .module('app.core')
    .config(config);

  /** @ngInject */
  function config($mdThemingProvider, fusePalettes, fuseThemes, fuseThemingProvider) {
    var $cookies;
    angular.injector(['ngCookies']).invoke(['$cookies', function (_$cookies_) {
      $cookies = _$cookies_;
    }]);

    var customTheme = $cookies.getObject('ct');
    if (customTheme) {
      fuseThemes['custom'] = customTheme;
    }

    $mdThemingProvider.alwaysWatchTheme(true);

    angular.forEach(fusePalettes, function (palette) {
      $mdThemingProvider.definePalette(palette.name, palette.options);
    });

    angular.forEach(fuseThemes, function (theme, themeName) {
      $mdThemingProvider.theme(themeName)
        .primaryPalette(theme.primary.name, theme.primary.hues)
        .accentPalette(theme.accent.name, theme.accent.hues)
        .warnPalette(theme.warn.name, theme.warn.hues)
        .backgroundPalette(theme.background.name, theme.background.hues);
    });

    fuseThemingProvider.setRegisteredPalettes($mdThemingProvider._PALETTES);
    fuseThemingProvider.setRegisteredThemes($mdThemingProvider._THEMES);
  }
})();
