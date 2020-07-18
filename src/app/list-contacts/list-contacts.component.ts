import { Component, OnInit, ViewChild } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { NgForm } from "@angular/forms";
import { DomSanitizer } from "@angular/platform-browser";

import { map } from "rxjs/operators";
import { Contact } from "../contact.model";

@Component({
  selector: "app-list-contacts",
  templateUrl: "./list-contacts.component.html",
  styleUrls: ["./list-contacts.component.scss"],
})
export class ListContactsComponent implements OnInit {
  @ViewChild("f") signupForm: NgForm;
  @ViewChild("avatar") imageInput: any;
  loadedContacts: Contact[] = [];
  isFetching = false;
  error = null;
  editMode = false;
  editContact: Contact;
  editContactId: string;
  changedImage: any;
  isChangingImage = false;
  editContactIndex: number;
  clearMode = false;
  isChecked = false;
  clearImage = false;
  letters = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}

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
        }),
        map((contacts: Contact[]) => {
          contacts = contacts.map((contact) => {
            contact.image = this.sanitizer.bypassSecurityTrustResourceUrl(
              contact.image as string
            ) as string;

            return contact;
          });
          return contacts;
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

  onDeleteContact(id, index) {
    this.http
      .delete(
        "https://contact-book-60025.firebaseio.com/contacts/" + id + ".json"
      )
      .subscribe(() => {
        this.loadedContacts.splice(index, 1);
      });
  }

  onEditContact(id, index) {
    this.clearMode = false;
    this.editMode = true;
    this.editContact = this.loadedContacts[index];
    this.editContactId = id;
    this.editContactIndex = index;
    this.clearImage = false;
  }

  onChangeImage(element) {
    this.clearImage = false;
    this.isChangingImage = true;
    var file = element.target.files[0];
    var reader = new FileReader();
    reader.onloadend = (e) => {
      this.changedImage = reader.result;
    };
    reader.readAsDataURL(file);
  }

  onSubmit(editedContactData: Contact) {
    if (editedContactData.image === "") {
      editedContactData.image = this.editContact.image[
        "changingThisBreaksApplicationSecurity"
      ];
    } else {
      editedContactData.image = this.changedImage;
    }
    this.http
      .put(
        "https://contact-book-60025.firebaseio.com/contacts/" +
          this.editContactId +
          ".json",
        editedContactData
      )
      .subscribe((responseData) => {
        this.onFetchContacts();
      });

    this.editMode = false;
    this.isChangingImage = false;
  }

  onCancel() {
    this.editMode = false;
    this.changedImage = null;
    this.isChangingImage = false;
    this.isChecked = false;
  }

  onClear() {
    if (this.isChecked) {
      this.clearImage = true;
    }
    this.clearMode = true;
    this.isChecked = false;
  }

  onClearImage() {
    this.isChecked = !this.isChecked;
  }

  onChooseLetter(index) {
    this.isFetching = true;
    let addressExtention =
      '?orderBy="last-name"&startAt="' +
      this.letters[index] +
      '"&endAt="' +
      this.letters[index] +
      '\uf8ff"';
    this.http
      .get<{ [key: string]: Contact }>(
        // 'https://contact-book-60025.firebaseio.com/contacts.json?orderBy="last-name"&startAt="h"&endAt="h\uf8ff"'
        // prettier-ignore
        "https://contact-book-60025.firebaseio.com/contacts.json"+addressExtention
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
        }),
        map((contacts: Contact[]) => {
          contacts = contacts.map((contact) => {
            contact.image = this.sanitizer.bypassSecurityTrustResourceUrl(
              contact.image as string
            ) as string;

            return contact;
          });
          return contacts;
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
  onGetAllContacts() {
    this.onFetchContacts();
  }
}
