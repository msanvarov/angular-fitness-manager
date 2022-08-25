import { ChangeDetectionStrategy, Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export const TYPE_CONTROL_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => WorkoutTypeComponent),
  multi: true,
};

@Component({
  selector: 'fitness-workout-type',
  providers: [TYPE_CONTROL_ACCESSOR],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './workout-type.component.html',
  styleUrls: ['./workout-type.component.scss'],
})
export class WorkoutTypeComponent implements ControlValueAccessor {
  selectors = ['strength', 'endurance'];

  value?: string;

  private onTouch?: () => void;
  private onModelChange?: (value?: string) => void;

  registerOnTouched(fn: () => void) {
    this.onTouch = fn;
  }

  registerOnChange(fn: () => void) {
    this.onModelChange = fn;
  }

  writeValue(value: string) {
    this.value = value;
  }

  setSelected(value: string) {
    this.value = value;
    this.onModelChange && this.onModelChange(value);
    this.onTouch && this.onTouch();
  }
}
