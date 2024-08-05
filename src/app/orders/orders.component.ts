import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  orders = [
    { item: 'Item 1', username: 'User1', address: 'Address 1', numberOfItems: 2, size: 'M', color: 'Red', status: 'Paid' },
    { item: 'Item 2', username: 'User2', address: 'Address 2', numberOfItems: 1, size: 'L', color: 'Blue', status: 'Not Paid' },
    // Add more sample orders as needed
  ];

  constructor() { }

  ngOnInit(): void { }
}
