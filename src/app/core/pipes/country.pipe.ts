import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'country'
})
export class CountryPipe implements PipeTransform {

  langsMap = {
    'ESP': {
      'es': 'España'
    },
    'USA':{
      'es': 'Estados unidos'
    }
  }
  

  transform(shortCountry: string, lang: 'es'): string {
    return this.langsMap[shortCountry][lang];
  }

}
