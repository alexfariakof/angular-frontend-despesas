import { Component, ViewChild } from "@angular/core";
import * as dayjs from "dayjs";
import { BarraFerramentaComponent, BarChartComponent, AlertComponent, AlertType } from "src/app/shared/components";
import { MenuService, FilterAnoService, UserDataService } from "src/app/shared/services";
import { DashboardService } from "src/app/shared/services/api";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  @ViewChild(BarraFerramentaComponent) barraFerramenta: BarraFerramentaComponent;
  @ViewChild(BarChartComponent) baseChart: BarChartComponent;
  barChartDatasets: any[] = [];
  barChartLabels: string[] = [];

  constructor(
    public menuService: MenuService,
    public dashboardService: DashboardService,
    public modalAlert: AlertComponent,
    private filterAnoService: FilterAnoService,
    private userDataService: UserDataService
    ) {
  }

  ngOnInit() {
    this.menuService.menuSelecionado = 1;
    this.initializeChart();
  }

  initializeChart = () => {
    this.dashboardService.getDataGraphicByYear(dayjs(`${this.filterAnoService.dataAno}-01-01`), this.userDataService.getIdUsuario())
    .subscribe({
      next: (response: any) => {
        if (response)
        {
          this.barChartLabels = response.labels;
          this.barChartDatasets = response.datasets;
          this.baseChart.loadBarChart(response.labels, response.datasets);
          this.barraFerramenta.setOnChangeDataAno(() => { this.updateChart(); } );

        }
      },
      error :(response : any) =>  {
        this.modalAlert.open(AlertComponent, response.message, AlertType.Warning);
      }
    });
  }


  updateChart = () => {
this.dashboardService.getDataGraphicByYear(dayjs(`${this.filterAnoService.dataAno}-01-01`), this.userDataService.getIdUsuario())
    .subscribe({
      next: (response: any) => {
        if (response)
        {
          this.barChartDatasets = response.datasets;
          this.baseChart.updateBarChart(response.datasets);
        }
      },
      error :(response : any) =>  {
        this.modalAlert.open(AlertComponent, response.message, AlertType.Warning);
      }
    });
  }

  getChartData = () => {
    return this.barChartDatasets;
  }
}
