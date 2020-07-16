import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm, NgControl } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { Contact } from "../contact.model";

@Component({
  selector: "app-add-contact",
  templateUrl: "./add-contact.component.html",
  styleUrls: ["./add-contact.component.scss"],
})
export class AddContactComponent {
  @ViewChild("f") signupForm: NgForm;
  @ViewChild("avatar") imageInput: any;
  constructor(private http: HttpClient) {}

  onSubmit(contactData: Contact) {
    console.log(contactData);

    var file = this.imageInput.nativeElement.files[0];
    var reader = new FileReader();

    const http = this.http;

    reader.onloadend = function () {
      console.log("RESULT", reader.result);

      contactData.image = reader.result;

      http
        .post<{ name: string }>(
          "https://contact-book-60025.firebaseio.com/contacts.json",
          contactData
        )
        .subscribe((responseData) => {
          console.log(responseData);
        });
    };
    reader.readAsDataURL(file);
    this.signupForm.reset();
  }

  encodeImageFileAsURL(element) {
    // console.log(element);
    var file = element.target.files[0];
    var reader = new FileReader();
    reader.onloadend = function () {
      // console.log("RESULT", reader.result);
    };
    reader.readAsDataURL(file);
  }
}
