import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Status, Ticket} from "../types";

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit {

  ticketForm: FormGroup;

  constructor(private database: AngularFireDatabase) {
    this.ticketForm = new FormGroup({
      'requester': new FormControl(null, Validators.required),
      'course': new FormControl(null, Validators.required),
      'status': new FormControl(Status.new),
      'reason': new FormControl(null, Validators.required),
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.database.list('tickets').push(this.ticketForm.getRawValue());
    this.ticketForm.reset();
  }
}
