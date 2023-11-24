import 'dayjs/locale/pt-br';
import * as dayjs from 'dayjs';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

dayjs.locale('pt-br');

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
