import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { InventoryItem } from './models';

@Injectable({
  providedIn: 'root',
})
export class InventoryDataService {
  private inventorySubject: BehaviorSubject<
    InventoryItem
  > = new BehaviorSubject({
    id: 1,
    name: 'Coffee',
    quantity: 3,
  });

  inventory$: Observable<InventoryItem> = this.inventorySubject.asObservable();

  patch(data: Partial<InventoryItem>): void {
    const existing: InventoryItem = this.inventorySubject.getValue();
    const patched: InventoryItem = {
      ...existing,
      ...data,
    };

    this.inventorySubject.next(patched);
  }
}
