import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'fitness-schedule-days',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './schedule-days.component.html',
  styleUrls: ['./schedule-days.component.scss'],
})
export class ScheduleDaysComponent {
  days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  @Input()
  selected?: number;

  @Output()
  // eslint-disable-next-line @angular-eslint/no-output-native
  select = new EventEmitter<number>();

  constructor() {}

  selectDay(index: number) {
    this.select.emit(index);
  }
}
