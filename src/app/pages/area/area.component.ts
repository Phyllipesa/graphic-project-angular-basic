import { Component, OnInit } from '@angular/core';
import { VendasService } from '../../services/vendas.service';
import { EChartsOption } from 'echarts'
import { NgxEchartsDirective, provideEcharts } from 'ngx-echarts';
import { CommonModule } from '@angular/common';
import { Area } from '../../_models/Area';

@Component({
  selector: 'app-area',
  standalone: true,
  imports: [CommonModule, NgxEchartsDirective],
  templateUrl: './area.component.html',
  styleUrl: './area.component.css',
  providers: [
    provideEcharts()
  ]
})
export class AreaComponent implements OnInit {

  data!: Area[];
  chartOptions: EChartsOption = {};

  constructor(private vendasService: VendasService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.vendasService.getGraphicInfo<Area[]>("toArea").subscribe((response) => {
      if (response) {
        this.data = response;
        this.loadChartOptions();
        console.log(response);
      }
    });
  }

  loadChartOptions() {
    const serie: Array<any> = []

    this.data.forEach(({ metodoDePagamento, quantidadeMes }) => {
      serie.push({
        name: metodoDePagamento,
        type: 'line',
        stack: 'total',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: quantidadeMes
      });
    })

    this.chartOptions = {
      title: {
        text: 'Vendas por Método de Pagamento'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      legend: {
        data: ['Cartão de Crédito', 'Dinheiro', 'Boleto', 'Pix'],
        left: 'right'
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: { 
        type: 'category', 
        boundaryGap: false, 
        data: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio'] 
      },
      yAxis: { 
        type: 'value' 
      },
      series: serie
    };
  }
}
