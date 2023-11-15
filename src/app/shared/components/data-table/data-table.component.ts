import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
})

export class DataTableComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  @Input() editAction: Function;
  @Input() deleteAction: Function;
  @Input() columns: { title: string; data: string }[] = [];
  @Input() data: any[] = [];
  Trigger: any;

  ngOnInit() {
    this.dtOptions = {
      data: this.data,
      columns: this.columns,
      lengthMenu: [[5, 10, 25, 50, -1], [5, 10, 25, 50, 'Todos'], ],
      pageLength: -1,
      paging: true,
      scrollCollapse: true,
      language: {
        search: "Pesquisar :",
        lengthMenu: "Mostrando _MENU_ registros por página",
        zeroRecords: "Nada encontrado",
        info: "Mostrando página _PAGE_ de _PAGES_",
        infoEmpty: "Nenhum registro disponível",
        infoFiltered: "(filtrado de _MAX_ registros no total)",
        paginate:{
          previous: "Anterior",
          first: 'Primeiro',
          last: 'Último',
          next: 'Proxímo'
        }
      }
    };

    this.Trigger = new Subject();
  }

  handleAction(action: string, id: string) {
    if (action === 'edit') {
      this.editAction(id);
    } else if (action === 'delete') {
      this.deleteAction(id);
    }
  }
}
