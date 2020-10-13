import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { InventoryItem } from '../models';
import { filter, debounceTime, takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-autosave-form',
  templateUrl: './autosave-form.component.html',
  styleUrls: ['./autosave-form.component.scss'],
})
export class AutosaveFormComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<any> = new Subject();
  private formSaveable = false;
  private data: InventoryItem;

  @Input()
  get inventory(): InventoryItem {
    return this.data;
  }
  set inventory(data: InventoryItem) {
    this.data = data;
    this.buildForm(data);
  }
  @Output() save: EventEmitter<InventoryItem> = new EventEmitter();

  form = this.fb.group({
    quantity: this.fb.control(0),
  });

  constructor(private fb: FormBuilder) {}

  /**
   * ngOnInit
   * listen for value changes to the form
   */
  ngOnInit(): void {
    this.form.valueChanges
      .pipe(
        filter(() => this.formSaveable),
        debounceTime(300),
        takeUntil(this.unsubscribe$),
        tap((value) => this.save.emit(value))
      )
      .subscribe();
  }

  /**
   * onFocus
   * when input is focused then set its value to null so that a user can change the number
   * without clearing the previous number
   */
  onFocus(): void {
    this.form.get('quantity').setValue(null, { onlySelf: true });
  }

  /**
   * onBlur
   * when input is blureed then check if it's still null from the focus handler
   * if its not null then the user has input a number
   * and the form will be saved with the latest value by the save handler
   */
  onBlur(): void {
    const control = this.form.get('quantity');
    const quantity = this.inventory.quantity ?? 0;

    if (control.value === null) {
      control.setValue(quantity, {
        onlySelf: true,
      });
    }
  }

  /**
   * buildForm
   * build a form by using setControl and not reassigning form
   * @param data an InventoryItem
   */
  buildForm(data: InventoryItem): void {
    this.formSaveable = false;
    const quantity = data.quantity ?? 0;
    const quantityControl = this.fb.control(quantity);

    this.form.setControl('quantity', quantityControl);

    this.formSaveable = true;
  }

  /**
   * ngOnDestroy
   * unsubscribe from all manual subscriptions
   */
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
