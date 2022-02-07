import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Products } from 'src/app/models/products';
import { CommunService } from 'src/app/shares/services/commun.service';
import { ProductService } from 'src/app/shares/services/product.service';
import { ReviewService } from 'src/app/shares/services/review.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  startLigthImg: string = '../../../assets/icons/VectorYellow.png';
  startDartImg: string = '../../../assets/icons/Vector.png';
  review = new Map<string, number>();
  starsLigth = new Map<string, string[]>();
  starsDark = new Map<string, string[]>();
  @Input() articles: Products[];
  @Input() favorisProduct: boolean = true;
  showCart: boolean = false;
  @Output() addProductToPaner = new EventEmitter<string>();

  constructor(public communService: CommunService, private reviewService: ReviewService, private productService: ProductService) { }

  ngOnInit(): void {
    console.log('article', this.articles);
    if (this.articles != undefined ? this.articles.length > 0 : false) {
      this.getStarsAndReview();
    }
  }

  getStarsAndReview() {
    this.articles.forEach(
      (article) => {
        if (article.nombreEtoile < 5) {
          if (article.nombreEtoile > 0) {
            this.starsLigth.set(article._id, article.nombreEtoile == 1 ? [4] : Array(article.nombreEtoile).fill(4));
            this.starsDark.set(article._id,Array(5 - article.nombreEtoile).fill(4));
          } else {
            this.starsLigth.set(article._id, []);
            this.starsDark.set(article._id,Array(5).fill(4));
          }
        } else {
          this.starsLigth.set(article._id, Array(5).fill(4));
          this.starsDark.set(article._id,[]);
        }
        this.getNumberReview(article._id);
      }
    );
  }
 
  getNumberReview(idProduct) {
    this.reviewService.findNumberByProduct(idProduct).subscribe(
      (data) => {
        if (data) {
          this.review.set(idProduct, data);
        } else{
          this.review.set(idProduct, 0);
        }
      },
      (error) => {
        this.review.set(idProduct, 0);
        console.log('Error', error);
      }
    );
  }

  buy(product) {
    this.showCart = !this.showCart;
    this.addProductToPaner.emit(this.showCart + '');
  }

}
