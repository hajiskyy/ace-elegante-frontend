import { Injectable } from '@angular/core';
import { Products } from "../models/Products";

@Injectable()
export class ProductsService {
  products: Products[];
  sorted: Products[];
  cart: Products[];
  constructor() {
    this.products = [
      {
        id: 1,
        name: "some cool name",
        description: "some cool description",
        category: "scarf",
        price: 8.99,
        brand: "ummai",
        imageUrl: "../../assets/img/earth.jpg",
        quantity: 1
      },
      {
        id: 2,
        name: "some cool name 2",
        description: "some cool description 2",
        category: "abaya",
        price: 9.99,
        brand: "kamal",
        imageUrl: "../../assets/img/aure.jpg",
        quantity: 1
      },
      {
        id: 3,
        name: "some cool name 2",
        description: "some cool description 2",
        category: "abaya",
        price: 9.99,
        brand: "kamai",
        imageUrl: "../../assets/img/air.jpg",
        quantity: 1
      },
      {
        id: 4,
        name: "some cool name 2",
        description: "some cool description 2",
        category: "abaya",
        price: 9.99,
        brand: "kamai",
        imageUrl: "../../assets/img/SI.jpg",
        quantity: 1
      },
      {
        id: 5,
        name: "some cool name 2",
        description: "some cool description 2",
        category: "scarf",
        price: 9.99,
        brand: "kamai",
        imageUrl: "../../assets/img/cinta.jpg",
        quantity: 1
      },
      {
        id: 6,
        name: "some cool name 2",
        description: "some cool description 2",
        category: "scarf",
        price: 9.99,
        brand: "kamai",
        imageUrl: "../../assets/img/upendo.jpg",
        quantity: 1
      }
    ]
    this.sorted = [];
    this.cart = [];
  }

  getProducts() {
    return this.products;
  }

  sortProducts(sort: string) {
    this.sorted = [];
    if(sort === "") {
      return this.products;
    } else {
      this.products.forEach(prod => {
        if (sort === prod.category) {
          this.sorted.unshift(prod);
        }
      })
      return this.sorted;
    }
    
  }

  addToCart(product: Products){
    this.cart.forEach((item, index) => {
      if(item.id === product.id){
        ++product.quantity;
        this.cart.splice(index, 1);
      }
    });
    this.cart.push(product);
    
  }

  getCart(){
    return this.cart;
  }

}
