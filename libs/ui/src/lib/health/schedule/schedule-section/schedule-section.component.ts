import { Component, EventEmitter, Input, Output } from '@angular/core';

import { IScheduleItem } from '@fitness/store';

@Component({
  selector: 'fitness-schedule-section',
  templateUrl: './schedule-section.component.html',
  styleUrls: ['./schedule-section.component.scss'],
})
export class ScheduleSectionComponent {
  @Input()
  name?: string;

  @Input()
  section?: IScheduleItem;

  @Output()
  // eslint-disable-next-line @angular-eslint/no-output-native
  select = new EventEmitter<any>();

  onSelect(type: string, assigned: any[] = []) {
    const data = this.section;
    this.select.emit({
      type,
      assigned,
      data,
    });
  }
}
