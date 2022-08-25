import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { IWorkout } from '@fitness/store';

@Component({
  selector: 'fitness-workout-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './workout-form.component.html',
  styleUrls: ['./workout-form.component.scss'],
})
export class WorkoutFormComponent implements OnChanges {
  toggled = false;
  exists = false;

  @Input()
  workout?: IWorkout;

  @Output()
  create = new EventEmitter<IWorkout>();

  @Output()
  update = new EventEmitter<IWorkout>();

  @Output()
  remove = new EventEmitter<IWorkout>();

  form = this.fb.group({
    name: ['', Validators.required],
    type: 'strength',
    strength: this.fb.group({
      reps: 0,
      sets: 0,
      weight: 0,
    }),
    endurance: this.fb.group({
      distance: 0,
      duration: 0,
    }),
  });

  constructor(private fb: FormBuilder) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.workout && this.workout.name) {
      this.exists = true;
      const value = this.workout;
      this.form.patchValue(value);
    }
  }

  get placeholder() {
    return `e.g. ${
      this.form.get('type')?.value === 'strength' ? 'Benchpress' : 'Treadmill'
    }`;
  }

  get required() {
    return (
      this.form.get('name')?.hasError('required') &&
      this.form.get('name')?.touched
    );
  }

  createWorkout() {
    if (this.form.valid) {
      this.create.emit(this.form.value as IWorkout);
    }
  }

  updateWorkout() {
    if (this.form.valid) {
      this.update.emit(this.form.value as IWorkout);
    }
  }

  removeWorkout() {
    this.remove.emit(this.form.value as IWorkout);
  }

  toggle() {
    this.toggled = !this.toggled;
  }
}
