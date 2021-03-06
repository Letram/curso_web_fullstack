import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-entry',
  templateUrl: './category-entry.component.html',
  styleUrls: ['./category-entry.component.scss']
})
export class CategoryEntryComponent implements OnInit {

  @Input('category')
  set category(value: any){
    console.log(value);
    this.modifiedCategory = new Category(value.id, value.name, value.count);
    this.currentCategory =  new Category(value.id, value.name, value.count);
  }
  get category(){
    return this.currentCategory;
  }

  @Output() onRemoveClicked: EventEmitter<number> = new EventEmitter();
  @Output() onEditPerformed: EventEmitter<Category> = new EventEmitter();

  public editing: boolean;
  private modifiedCategory: Category;
  private currentCategory: Category;
  constructor(private _categoryService: CategoryService) {
    this.editing=false;
    this.modifiedCategory = new Category(0, "", 0);
   }

  ngOnInit(): void { 
    console.log(this.category);
   }

  public removeCategory(){
    this.onRemoveClicked.emit(this.category.id);
  }

  public updateCategory(){
    this.editing = !this.editing;
    console.log({edit: this.editing, mod: this.modifiedCategory, cur: this.currentCategory});
    //user just finished editing
    if(!this.editing && this.modifiedCategory.name == "")
      this.modifiedCategory = this.currentCategory;
      else if(this.modifiedCategory.name != this.currentCategory.name){
        this.onEditPerformed.emit(this.modifiedCategory);
      }
  }
}
