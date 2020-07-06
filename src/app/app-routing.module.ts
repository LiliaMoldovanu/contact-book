import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ListContactsComponent } from "./list-contacts/list-contacts.component";
import { AddContactComponent } from "./add-contact/add-contact.component";
import { EditContactComponent } from "./edit-contact/edit-contact.component";

const routes: Routes = [
  { path: "list-contacts", component: ListContactsComponent },
  { path: "add-contact", component: AddContactComponent },
  { path: "edit-contact", component: EditContactComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
