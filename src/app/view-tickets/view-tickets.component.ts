import { Component, OnInit } from '@angular/core';
import {Status, Ticket} from "../types";
import {AngularFireDatabase} from "@angular/fire/compat/database";


@Component({
  selector: 'app-view-tickets',
  templateUrl: './view-tickets.component.html',
  styleUrls: ['./view-tickets.component.css']
})
export class ViewTicketsComponent implements OnInit {
  tests: Record<string, Ticket> = {};
  showArchived = true;
  // same as {[key: string]: Ticket},

  constructor(private database: AngularFireDatabase) {
    // this.database.list<Ticket>('tickets').snapshotChanges().pipe(map(data => {
    //   const list: Ticket[] = [];
    //   data.map(e => {
    //     list.push(e.payload.toJSON() as Ticket);
    //   })
    //   return list;
    // })).subscribe(data => {
    //   console.log(data);
    //   this.tests = data;
    // });
    this.database.object<{ [key: string]: Ticket}>('tickets').valueChanges().subscribe(data => {
      console.log(data);
      if (data) {
        this.tests = data;
      }
    });
  }

  ngOnInit(): void {
  }

  async resolve(id: string) {
    await this.database.object(`tickets/${id}`).update({status: Status.resolved});
  }

  async pending(id: string) {
    await this.database.object(`tickets/${id}`).update({status: Status.pending});
  }

  async delete(id: string) {
    await this.database.object(`tickets/${id}`).remove();
  }

  getKeys() {
    if (this.tests) {
      if (!this.showArchived) {
        return Object.keys(this.tests).filter(key => this.tests[key].status != Status.resolved);
      } else {
        return Object.keys(this.tests);
      }
    } else {
      return null;
    }
  }

  get getStatus(): typeof Status{
    return Status;
  }

  toggled(event: Event) {
    this.showArchived ? this.showArchived = false : this.showArchived = true
  }

}
