import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

(function() {
  var p = document.createElement('script');
  p.type = 'text/javascript';
  p.async = true;
  p.src = 'https://apis.google.com/js/client.js?onload=onLoadFunction';
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(p, s);
})();

function onLoadFunction() {

}