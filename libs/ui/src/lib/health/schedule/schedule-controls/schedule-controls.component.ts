import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

/*
Remark: ChangeDetectionStrategy.OnPush tells Angular that the component only depends on its @Inputs() and needs to be checked only in the following cases:
- The Input reference changes.
- An event originated from the component or one of its children.
- We run change detection explicitly.
*/

@Component({
  selector: 'fitness-schedule-controls',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './schedule-controls.component.html',
  styleUrls: ['./schedule-controls.component.scss'],
})
export class ScheduleControlsComponent {
  offset = 0;

  @Input()
  selected?: Date;

  @Output()
  move = new EventEmitter<number>();

  constructor() {}

  moveDate(offset: number) {
    this.offset = offset;
    this.move.emit(offset);
  }
}
