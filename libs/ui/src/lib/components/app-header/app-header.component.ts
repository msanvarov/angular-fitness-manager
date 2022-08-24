import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';

import { IUser } from '@fitness/store';

@Component({
  selector: 'fitness-app-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss'],
})
export class AppHeaderComponent implements OnInit {
  @Input()
  user?: IUser | null;

  @Output()
  logout = new EventEmitter<unknown>();

  constructor() {}

  ngOnInit(): void {
    console.log('user', this.user);
  }

  logoutUser() {
    this.logout.emit();
  }
}
