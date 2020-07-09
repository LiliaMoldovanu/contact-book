import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { Contact } from "../contact.model";

@Component({
  selector: "app-add-contact",
  templateUrl: "./add-contact.component.html",
  styleUrls: ["./add-contact.component.scss"],
})
export class AddContactComponent {
  @ViewChild("f") signupForm: NgForm;
  constructor(private http: HttpClient) {}

  onSubmit(contactData: Contact) {
    this.signupForm.reset();
    this.http
      .post<{ name: string }>(
        "https://contact-book-60025.firebaseio.com/contacts.json",
        contactData
      )
      .subscribe((responseData) => {
        console.log(responseData);
      });
  }
}
