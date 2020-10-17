import { Injectable } from '@angular/core';
import { GridsterConfig, GridsterItem } from 'angular-gridster2';
import { UUID } from 'angular2-uuid';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  public options: GridsterConfig = {
    draggable: {
      enabled: true
    },
    pushItems: false,
    resizable: {
      enabled: false
    },
    gridType: 'fixed',
    displayGrid: 'always',
    minCols: 6,
    maxCols: 6
  };
  public layout: GridsterItem[] = [];

  constructor() {
  }

  addItem(): void {
    this.layout.push({
      cols: 1,
      id: UUID.UUID(),
      rows: 1,
      x: 0,
      y: 0
    });
  }

  deleteItem(id): void {
    const item = this.layout.find(d => d.id === id);
    this.layout.splice(this.layout.indexOf(item), 1);
  }
}
