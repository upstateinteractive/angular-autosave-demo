import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { InventoryItem } from './models';
import { InventoryDataService } from './inventory.data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private inventoryService: InventoryDataService) {}
  inventoryItem$: Observable<InventoryItem> = this.inventoryService.inventory$;

  onSave(data: Partial<InventoryItem>): void {
    this.inventoryService.patch(data);
  }
}
