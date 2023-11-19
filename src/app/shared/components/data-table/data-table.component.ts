import { AfterViewInit, Component, Input, OnChanges, OnDestroy, SimpleChanges, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})

export class DataTableComponent implements AfterViewInit, OnDestroy, OnChanges {
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  @Input() editAction: Function = () => {};
  @Input() deleteAction: Function = () => {};
  @Input() columns: { title: string; data: string }[];
  @Input() data: any[] = null;
  dtTrigger: any = new Subject();

  constructor(){
    this.initializeDataTable();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.rerender();
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  rerender(): void {
    if (this.dtElement != undefined){
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
        this.dtTrigger.next();
      });
    }
  }

  private initializeDataTable() {
    this.dtOptions = {
      autoWidth: true,
      retrieve: true,
      searching: true,
      paging: true,
      ordering: true,
      info: true,
      lengthMenu: [[5, 10, 25, 50, -1], [5, 10, 25, 50, 'Todos'], ],
      pageLength: 5,
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

  refresh(newData: any[]) {
    this.data = newData;
  }

  handleAction(action: string, id: string) {
    if (action === 'edit') {
      this.editAction(id);
    } else if (action === 'delete') {
      this.deleteAction(id);
    }
  }
}
