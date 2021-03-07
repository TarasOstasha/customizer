import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from "rxjs/operators";
import { Subject } from "rxjs";

import { MainProduct } from '../models/product-data.model';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AdminPageService {
  private url = 'http://localhost:3000/api/';
  products = [];

  constructor(private _http: HttpClient) { }

  addPostAdmin(userData: MainProduct) {
    return this._http.post<MainProduct>(this.url + 'admin-product-data', userData, httpOptions).toPromise();
  }

  getPosts() {
    return this._http.get<MainProduct>(this.url + 'admin-product-data').toPromise();
  }

  // test
  getProducts() {
    return this._http.get('http://localhost:3000/api/products').toPromise();
  }
  //test

  addMyPostAdmin(data: any, image: File) {
    const postData: any = new FormData();
    postData.append('size', data.size);
    postData.append('group', data.group);
    postData.append('classification', data.classification);
    postData.append('pattern', data.pattern);
    postData.append('variety', data.variety);
    postData.append('model', data.model);
    postData.append('price', data.price);
    postData.append('image', image);

    this._http.post(this.url + 'admin-data/my-prod', postData).subscribe(
      (response) => console.log(response),
      (erorr) => console.log(erorr)
    )
  }

  // addPostAdmin(
  //   size: string,
  //   group: string,
  //   classification: string,
  //   pattern: string,
  //   variety: string,
  //   model: string,
  //   price: string)
  //   // image: File) {
  //   const postData = new FormData();
  //   postData.append('size', size);
  //   postData.append('group', group);
  //   postData.append('classification', classification);
  //   postData.append('pattern', pattern);
  //   postData.append('variety', variety);
  //   postData.append('model', model);
  //   postData.append('price', price);
  //   //postData.append('image', image);
  //   console.log(postData)
  //   this._http.post<any>(this.url + 'admin-product-data', postData).subscribe(responseData => {
  //     //console.log(responseData, 'responseData');
  //     const product = {
  //       //id: responseData.id,
  //       size: responseData.size,
  //       group: responseData.group,
  //       classification: responseData.classification,
  //       pattern: responseData.pattern,
  //       variety: responseData.variety,
  //       model: responseData.model,
  //       price: responseData.price,
  //       imagePath: responseData.data.imagePath
  //     }
  //     this.products.push(product);
  //   });
  // }

  // getPosts() {
  //   this._http
  //     .get<{ posts: any }>(this.url + 'admin-product-data')
  //     .pipe(
  //       map(postData => {
  //         console.log(postData)
  //         return postData.posts.map(post => {
  //           // return {
  //           //   size: post.size,
  //           //   group: post.group,
  //           //   id: post._id,
  //           //   classification: post.classification,
  //           //   pattern: post.pattern,
  //           //   variety: post.variety,
  //           //   model: post.model,
  //           //   price: post.price,
  //           //   imagePath: post.imagePath
  //           // };
  //         });
  //       })
  //     )
  //     .subscribe(transformedPosts => {
  //       console.log(transformedPosts);
  //      // this.postsUpdated.next([...this.posts]);
  //     });
  // }










}
