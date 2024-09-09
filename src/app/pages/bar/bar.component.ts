import { Component, OnInit } from '@angular/core';
import { VendasService } from '../../services/vendas.service';
import { EChartsOption } from 'echarts'
import { NgxEchartsDirective, provideEcharts } from 'ngx-echarts';
import { CommonModule } from '@angular/common';
import { Bar } from '../../_models/Bar';

@Component({
  selector: 'app-bar',
  standalone: true,
  imports: [CommonModule, NgxEchartsDirective],
  templateUrl: './bar.component.html',
  styleUrl: './bar.component.css',
  providers: [
    provideEcharts()
  ]
})
export class BarComponent implements OnInit {

  data!: Bar;
  chartOptions: EChartsOption = {};

  constructor(private vendasService: VendasService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.vendasService.getGraphicInfo<Bar[]>("toBar").subscribe((response) => {
      if (response) {
        this.data = response[0];
        this.loadChartOptions();
      }
    });
  }

  loadChartOptions() {
    const { categorias, quantidadeVendida } = this.data;

    this.chartOptions = {
      xAxis: {
        type: 'category',
        data: categorias
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: 'Vendas (unit)',
          data: quantidadeVendida,
          type: 'bar',
          label: {
            show: true,
            position: 'top',
            formatter: '{c} units'
          }
        }
      ]
    };
  }
}