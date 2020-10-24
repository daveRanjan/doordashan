import { Component, OnInit } from '@angular/core';
import { GridsterConfig, GridsterItem } from 'angular-gridster2';
import { from } from 'rxjs';
import { LayoutService } from '../../services/layout.service';
import { MatDialog } from '@angular/material/dialog';
import { WidgetSettingsComponent } from '../widget-settings/widget-settings.component';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  dashboard: Array<GridsterItem>;

  constructor(public layoutService: LayoutService,public dialog: MatDialog) {}

  get options(): GridsterConfig {
    return this.layoutService.options;
  }

  get layout(): GridsterItem[] {
    return this.layoutService.layout;
  }

  

  ngOnInit(): void {

  }

  openSettingDialog(){
    const dialogRef = this.dialog.open(WidgetSettingsComponent);

  }

}
