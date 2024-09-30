import { Product } from './interfaces/product';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(products: Product[], productName = ""): any {
    if (!productName.trim()) {
      return products;
    }
    return products.filter(product => {
      return product.title?.toLocaleLowerCase().includes(productName.toLocaleLowerCase());
    });
  }
}
