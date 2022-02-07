import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Products } from 'src/app/models/products';
import { Review } from 'src/app/models/review';
import { User } from 'src/app/models/user';
import { ProductService } from 'src/app/shares/services/product.service';
import { ReviewService } from 'src/app/shares/services/review.service';
import { UserService } from 'src/app/shares/services/user.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {

  articles: Products[] = [];
  review = new Review();
  reviews: Review[] = [];
  idArticle: string;
  add: boolean = false;
  @Input() user = new User();
  reviewForm: FormGroup;

  constructor(private productService: ProductService, private formBuilder: FormBuilder, private service: ReviewService,
    private userService: UserService) { }

  ngOnInit(): void {
    this.initForm();
    if (this.user._id) {
      this.getReview('');
    } else {
      this.getReview(sessionStorage.getItem('idUser'));
    }
    this.allArticle();
  }

  initForm() {
    this.reviewForm = this.formBuilder.group({
      comment: ['',Validators.required],
      article: ['',Validators.required]
    })
  }

  getReview(id) {
    let userId = this.user._id ? this.user._id : id;
    this.service.findByUser(userId).subscribe(
      (data) => {
        if (data) {
          this.reviews = data;
        }
      },
      (error) => {
        console.log('Error', error);
      }
    );
  }

  allArticle() {
    this.productService.all().subscribe(
      (data) => {
        if (data != null && data.length > 0) {
          this.articles = data;
        }
      },
      (error) => {
        console.log('Error', error);
      }
    );
  }

  annuler() {
    this.add = false;
  }

  send() {
    let value = this.reviewForm.value;
    this.review.comment = value.comment;
    this.review.idProduct = value.article;
    this.review.dateEnvoi = new Date();
    this.review.product = this.articles.find(x => x._id === value.article);
    this.review.idUser = sessionStorage.getItem('idUser');

    if (this.review._id) {
      if(this.review.idUser && this.review.idProduct) {
        this.service.update(this.review._id, this.review).subscribe(
          (data) => {
            alert(data);
            this.addReview(this.review);
            this.review = new Review();
            this.initForm();
            this.annuler()
          },
          (error) => {
            alert(error.error);
            console.log('Error', error);
          }
        );
      }
    } else {
      if(this.review.idUser && this.review.idProduct) {
        this.service.create(this.review).subscribe(
          (data) => {
            alert(data);
            this.addReview(this.review);
            this.review = new Review();
            this.initForm();
            this.annuler()
          },
          (error) => {
            alert(error.error);
            console.log('Error', error);
          }
        );
      }
    }

  }

  addComment() {
    this.add = true;
  }

  updateComment(r: Review) {
    this.review = r;
    this.idArticle = r.idProduct;
    this.addComment();
  }

  addReview(r: Review) {
    if (r._id === null || r._id === undefined) {
      this.reviews.push(r);
    } else{
      let result = this.reviews.find(x => x._id === r._id);
      if (result._id === null || result._id === undefined) {
        this.reviews.push(r);
      }
    }
  }
}
