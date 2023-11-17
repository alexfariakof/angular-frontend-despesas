import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
})

export class DataTableComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  @Input() editAction: Function = () => {};
  @Input() deleteAction: Function = () => {};
  @Input() columns: { title: string; data: string }[];
  @Input() data: any[];
  Trigger: any;

  ngOnInit() {
    this.initializeDataTable();

  }

  private initializeDataTable() {
    this.dtOptions = {
      searching: false,
      paging: false,
      ordering: false,
      language: {
        search: 'Pesquisar :',
        lengthMenu: 'Mostrando _MENU_ registros por página',
        zeroRecords: 'Nada encontrado',
        info: 'Total de _MAX_ registros.',
        infoEmpty: 'Mostrando página _PAGE_ de _PAGES_',
        infoFiltered: '(filtrado de _MAX_ registros no total)',
        paginate: {
          previous: 'Anterior',
          first: 'Primeiro',
          last: 'Último',
          next: 'Proxímo',
        },
      },
    };
  }

  handleAction(action: string, id: string) {
    if (action === 'edit') {
      this.editAction(id);
    } else if (action === 'delete') {
      this.deleteAction(id);
    }
  }
}
