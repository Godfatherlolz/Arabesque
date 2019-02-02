import { Observable } from 'rxjs';

export abstract class CountrySectorData {
  abstract getCountriesCategories(): Observable<string[]>;
  abstract getCountriesCategoriesData(country: string): Observable<number[]>;
}
