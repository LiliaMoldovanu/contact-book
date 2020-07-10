import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { map } from "rxjs/operators";
import { Contact } from "../contact.model";

@Component({
  selector: "app-list-contacts",
  templateUrl: "./list-contacts.component.html",
  styleUrls: ["./list-contacts.component.scss"],
})
export class ListContactsComponent implements OnInit {
  loadedContacts: Contact[] = [];
  isFetching = false;
  error = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.onFetchContacts();
  }

  onFetchContacts() {
    this.isFetching = true;
    this.http
      .get<{ [key: string]: Contact }>(
        "https://contact-book-60025.firebaseio.com/contacts.json"
      )
      .pipe(
        map((responseData) => {
          const contactsArray: Contact[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              contactsArray.push({ ...responseData[key], id: key });
            }
          }
          return contactsArray;
        })
      )
      .subscribe(
        (contacts) => {
          this.isFetching = false;
          this.loadedContacts = contacts;
          console.log(this.loadedContacts);
        },
        (error) => {
          this.error = error.message;
        }
      );
  }
}
