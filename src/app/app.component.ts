import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})



export class AppComponent {
  text: string = ''
  idKey: any
  obj = [
    {
      "id": 1,
      "title": "title 1",
      "children": [
        {
          "id": 2,
          "title": " title 2",
          "children": [
            {
              "id": 3,
              "title": " title 3",
              "children": [
                {
                  "id": 4,
                  "title": " title 4",
                  "children": []
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": 5,
      "title": " title 6",
      "children": []
    },
    {
      "id": 7,
      "title": " title 7",
      "children": [
        {
          "id": 8,
          "title": " title 8",
          "children": [
            {
              "id": 9,
              "title": " title 9",
              "children": []
            }
          ]
        }
      ]
    },
    {
      "id": 10,
      "title": " title 10",
      "children": []
    }
  ]
  title = 'Angular-form';
  arrayTitles: Array<any> = []
  newForm: FormGroup;
  // children: any;

  constructor(private fb: FormBuilder) {
    this.getValues(this.obj, true);
    this.newForm = this.fb.group({
      title: new FormControl(''),
      children: this.fb.array([]),
    });

  }
  getValues(array: Array<any>, flag: Boolean) {
    if (flag == true) {
      for (let index = 0; index < array?.length; index++) {
        // const element = array[index];
        console.log(array[index])
        this.arrayTitles.push({ id: array[index]?.id, title: array[index]?.title });
        if (array[index]?.children?.length) {
          this.getValues(array[index]?.children, true)
        }
      }
    }
    console.log(this.arrayTitles, "arrayyyyyy")
    return this.arrayTitles
  }

  objectForm(array: any, id: any, text: string) {
    for (let index = 0; index < array?.length; index++) {

      if (array[index]?.id == id) {
        array?.push({
          id: 20,
          title: text,
          children: []
        });
      }
      if (array[index]?.children?.length) {
        this.objectForm(array[index]?.children, id, text)
      }
    }
    console.log(array)
    this.getValues(array, false);
    // return array;
  }

  inputChange(e: any) {
    this.text = e.value;
  }

  submitForm() {
    this.objectForm(this.arrayTitles, this.idKey, this.text)
  }

  selectChange(e: any) {
    this.idKey = e.value
  }

  get children(): FormArray {
    return this.newForm.get("skills") as FormArray
  }

  newSkill(): FormGroup {
    return this.fb.group({
      id: 10,
      title: '',
      children: [],
    })
  }

  addSkills() {
    this.children.push(this.newSkill());
  }

  onSubmit() {

  }
}
