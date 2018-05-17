import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from "@angular/router";
import { ProductsService } from "../../services/products.service";
import { Products } from "../../models/Products";
import { Rating } from "../../models/Rating";
import { FlashMessagesService } from "angular2-flash-messages";
import { UserService } from "../../services/user.service";




@Component({
  selector: 'app-viewproducts',
  templateUrl: './viewproducts.component.html',
  styleUrls: ['./viewproducts.component.css']
})
export class ViewproductsComponent implements OnInit {
  product: Products;
  id: string;
  ratings: any;
  loaded: boolean;
  hasComment: boolean
  total: number;
  comment: string;
  like: number
  rating: Rating;
  constructor(
    private actived: ActivatedRoute,
    private router: Router,
    private prodServe: ProductsService,
    private flash: FlashMessagesService,
    private user: UserService
  ) { }

  ngOnInit() {
    this.total = 0;
    this.like = 0;
    this.loaded = false;
    this.actived.params.subscribe(param => {
      this.id = param.id;
      this.prodServe.getProductById(this.id).subscribe(product => {
        this.product = product;
        this.loaded = true;
      });
    });
    this.hasComment = false;

    this.prodServe.getProductRating(this.id).subscribe(res => {
      if (res.success) {
        this.ratings = res.rating;
        this.ratings.forEach(rating => {
          this.total += rating.likes;
          if (rating.comments) {
            this.hasComment = true;
          }
        });
      } else {
        console.log(res.msg);
      }
    })

  }
  addToCart(e) {
    e.preventDefault();
    this.prodServe.addToCart(this.product);
    this.flash.show('Added to Cart', { cssClass: 'alert-info', timeout: 3000 });
  }

  addLike(e) {
    e.preventDefault();
    if (!this.user.auth().buyer) {
      this.flash.show('Log in to add a like', { cssClass: 'alert-info', timeout: 3000 });
      this.router.navigate(['login']);
    } else {
      this.rating = {
        likes: 1,
        comments: null,
        product: this.id,
        user: JSON.parse(localStorage.getItem('user'))._id
      }
      this.prodServe.addRating(this.rating).subscribe(res => {
        this.flash.show(res.msg, { cssClass: 'alert-info', timeout: 2000 });
      });
    }
  }

  onComment(e) {
    e.preventDefault();
    if (!this.user.auth().buyer) {
      this.flash.show('Log in to add a comment', { cssClass: 'alert-info', timeout: 3000 });
      this.router.navigate(['login']);
    } else {
      this.rating = {
        likes: 0,
        comments: this.comment,
        product: this.id,
        user: JSON.parse(localStorage.getItem('user'))._id
      }
      this.prodServe.addRating(this.rating).subscribe(res => {
        this.flash.show(res.msg, { cssClass: 'alert-info', timeout: 2000 });
        this.comment = "";
      })

    }

  }

}
