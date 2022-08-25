import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';

import { IScheduleItem, IScheduleList } from '@fitness/store';

@Component({
  selector: 'fitness-schedule-calendar',
  templateUrl: './schedule-calendar.component.html',
  styleUrls: ['./schedule-calendar.component.scss'],
})
export class ScheduleCalendarComponent implements OnChanges {
  selectedDayIndex?: number;
  selectedDay?: Date;
  selectedWeek?: Date;

  sections = [
    { key: 'morning', name: 'Morning' },
    { key: 'lunch', name: 'Lunch' },
    { key: 'evening', name: 'Evening' },
    { key: 'snacks', name: 'Snacks and Drinks' },
  ];

  @Input()
  set date(date: Date | null) {
    if (date) {
      this.selectedDay = new Date(date.getTime());
    }
  }

  @Input()
  items?: IScheduleList | null;

  @Output()
  // eslint-disable-next-line @angular-eslint/no-output-native
  change = new EventEmitter<Date>();

  @Output()
  // eslint-disable-next-line @angular-eslint/no-output-native
  select = new EventEmitter<any>();

  constructor() {}

  ngOnChanges() {
    if (this.selectedDay) {
      this.selectedDayIndex = this.getToday(this.selectedDay);
      this.selectedWeek = this.getStartOfWeek(new Date(this.selectedDay));
    }
  }

  getSection(name: string): IScheduleItem {
    return (this.items && this.items[name]) || {};
  }

  selectSection({ type, assigned, data }: any, section: string) {
    const day = this.selectedDay;
    this.select.emit({
      type,
      assigned,
      section,
      day,
      data,
    });
  }

  selectDay(index: number) {
    if (this.selectedWeek) {
      const selectedDay = new Date(this.selectedWeek);
      selectedDay.setDate(selectedDay.getDate() + index);
      this.change.emit(selectedDay);
    }
  }

  onChange(weekOffset: number) {
    const startOfWeek = this.getStartOfWeek(new Date());
    const startDate = new Date(
      startOfWeek.getFullYear(),
      startOfWeek.getMonth(),
      startOfWeek.getDate(),
    );
    startDate.setDate(startDate.getDate() + weekOffset * 7);
    this.change.emit(startDate);
  }

  private getToday(date: Date) {
    let today = date.getDay() - 1;
    if (today < 0) {
      today = 6;
    }
    return today;
  }

  private getStartOfWeek(date: Date) {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(date.setDate(diff));
  }
}
