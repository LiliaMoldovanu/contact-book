import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Contact } from "./contact.model";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "contact-book";
  loadedContacts: Contact[] = [];

  constructor(private http: HttpClient) {}

  onFetchContacts() {
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
      .subscribe((contacts) => {
        this.loadedContacts = contacts;
        console.log(this.loadedContacts);
      });
  }
}
