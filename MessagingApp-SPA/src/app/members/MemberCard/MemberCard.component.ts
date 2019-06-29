import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/_models/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-MemberCard',
  templateUrl: './MemberCard.component.html',
  styleUrls: ['./MemberCard.component.css']
})
export class MemberCardComponent implements OnInit {

  @Input() user: User;

  constructor(private router: Router) { }

  ngOnInit() {
  }


}
