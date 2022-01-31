import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, ReplaySubject } from 'rxjs';
import { Products } from 'src/app/models/products';
import { ProductService } from 'src/app/shares/services/product.service';
import {NgxImageCompressService} from "ngx-image-compress";

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  productForm: FormGroup;
  product = new Products();
  image: FileList;
  base64Output : string;
  fileName: string;
  _id;

  constructor(private formBuilder: FormBuilder, private service: ProductService, private route: ActivatedRoute, private imageCompress: NgxImageCompressService) { }

  ngOnInit(): void {
    this.initForm();

    if (this.route.snapshot.params['id']) {
      console.log('ok');
      
      this._id = this.route.snapshot.params['id'];
      this.get();
    }
  }

  initForm() {
    this.productForm = this.formBuilder.group({
      image: ['', Validators.required],
      nom:  ['', Validators.required],
      description:  [''],
      fonction: [''],
      prixNormal: ['', Validators.required],
      marque: ['', Validators.required],
      type: ['', Validators.required],
      nombreEtoile: ['', Validators.required],
      tauxReduction: ['', Validators.required],
    });
  }

  selectFile(event) {
    this.image = event.target.files[0];
    this.fileName = event.target.files[0].name;

    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = () => {
        console.log(reader.result);
    };

    this.convertFile(event.target.files[0]).subscribe(base64 => {
      this.base64Output = base64;
    });
  }

  convertFile(file : File) : Observable<string> {
    const result = new ReplaySubject<string>(1);
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = (event) => result.next(btoa(event.target.result.toString()));
    return result;
  }

  add() {
    const value = this.productForm.value;
    const p:Products = {
      _id: '',
      image: '../../../assets/images/' + this.fileName,
      nom: value.nom,
      description: value.description,
      fonction: value.fonction,
      prixNormal: value.prixNormal,
      marque: value.marque,
      type: value.type,
      nombreEtoile: value.nombreEtoile,
      tauxReduction: value.tauxReduction,
      prixReduis: 0
    }

    if (this._id != null && this._id != undefined) {
      this.service.update(this._id, p).subscribe(
        (data) => {
          if (data !== null && data != undefined) {
            alert("Modification éffectué avec succes");
          } else {
            console.log('Erreur', data);
            alert('Echec de la Modification\nErreur: ' + data);
          }
        }, (error) => {
          console.log('Erreur', error);
          alert('Echec de la Modification\nErreur: ' + error.message);
        }
      );
    } else {
      this.service.create(p).subscribe(
        (data) => {
          if (data !== null && data != undefined) {
            alert("Enregistrement éffectué avec succes");
          } else {
            console.log('Erreur', data);
            alert('Echec de la Modification\nErreur: ' + data);
          }
        }, (error) => {
          console.log('Erreur', error);
          alert('Echec de la Modification\nErreur: ' + error.message);
        }
      );
    }
  }

  get() {
    console.log(this._id);
    
    this.service.find(this._id).subscribe(
      (data) => {
        if (data) {
          console.log('product', data);
          this.product = data;
        }
      }, (error) => {
        console.log('Erreur', error);
        alert('Echec de la Modification\nErreur: ' + error.message);
      }
    );
  }

  imgResultBeforeCompression: string = "";
  imgResultAfterCompression: string = "";

  compressFile() {
    this.imageCompress.uploadFile().then(
      ({image, orientation}) => {

        this.imgResultBeforeCompression = image;
        console.log("Size in bytes of the uploaded image was:", this.imageCompress.byteCount(image));

        this.imageCompress
          .compressFile(image, orientation, 50, 50) // 50% ratio, 50% quality
          .then(
            (compressedImage) => {
              this.imgResultAfterCompression = compressedImage;
              console.log("Size in bytes after compression is now:", this.imageCompress.byteCount(compressedImage));
            }
          );
      }
    );
  }

}
