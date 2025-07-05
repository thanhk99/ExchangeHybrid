
import { Component, ViewChild } from '@angular/core';
import { ApexChart, ApexAxisChartSeries, ApexXAxis, ChartComponent as ApexChartComponent, ApexOptions, ApexTitleSubtitle, ApexTooltip, ApexYAxis, ApexDataLabels, ApexPlotOptions, ApexStroke } from 'ng-apexcharts';
import { NgApexchartsModule } from 'ng-apexcharts';
import { CommonModule } from '@angular/common';

import { NgModule } from '@angular/core';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis?: ApexYAxis;
  title?: ApexTitleSubtitle;
  tooltip?: ApexTooltip;
  dataLabels?: ApexDataLabels;
  plotOptions?: ApexPlotOptions;
  stroke?: ApexStroke;
  colors?: string[];
  grid?: any; // Added grid property
};

interface TimeInterval {
  time: string;
  value: string;
  selected: boolean;
  data: number[];
  categories: string[];
}

@Component({
  selector: 'app-chart',
  standalone: true,
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.css',
  imports: [CommonModule, NgApexchartsModule]
})
export class ChartComponent {
  @ViewChild("chart") chart!: ApexChartComponent;
    public chartOptions!: Partial<ChartOptions>;
  activeTab: string = 'market-info';

  priceData = {
    currentPrice: '$107.028,7',
    usdPrice: '$131.401,0 USD, 0',
    metaInfo: 'Các máu bílej: dà tương đồn máu: 21.06.0107/2005',
    usdSection: {
      price: 'S147.376,40',
      tip: 'Típ: 23.29.300/000205',
      volume: 'Khối lượng trong giovin: $1.35 m'
    }
  };

  marketTabs = [
    { id: 'market-info', label: 'Thông tin thị trường' },
    { id: 'news', label: 'Tin tức' },
    { id: 'introduction', label: 'Giới thiệu' },
    { id: 'related-crypto', label: 'Crypto liên quan' },
    { id: 'social', label: 'Mạng xã hội' },
    { id: 'faq', label: 'Câu hỏi thường gặp' }
  ];

  marketData = {
    marketCap: '$2.128,278',
    circulatingSupply: '19.885.900 BTC',
    supplyPercentage: '94,69% của 21.000.000 BTC',
    marketRank: '1',
    certification: 'Lần kiểm tra gần nhất: --',
    high24h: '$107.849,7',
    low24h: '$106.331,8',
    allTimeHigh: '$111.963,0',
    athChange: '-4,41% (-$4.934,30)',
    athDate: '(UTC+9) 23 thứ 5, 2025',
    allTimeLow: '$67,810,0',
    atlChange: '+157.736,15% (+$106.960,9)',
    atlDate: '(UTC+9) 6 thứ 7, 2013'
  };

  timeIntervals: TimeInterval[] = [
    {
      time: '1 giờ',
      value: '1 giờ',
      selected: false,
      data: [89000, 89100, 89200, 89300, 89250, 89350, 89400],
      categories: ['10:00', '10:10', '10:20', '10:30', '10:40', '10:50', '11:00']
    },
    {
      time: '24 giờ',
      value: '24 giờ',
      selected: true,
      data: [86000, 86500, 87000, 87500, 88000, 88500, 89000],
      categories: ['0h', '4h', '8h', '12h', '16h', '20h', '24h']
    },
    {
      time: '1 tuần',
      value: '1 tuần',
      selected: false,
      data: [82000, 83000, 84000, 85000, 86000, 87000, 88000],
      categories: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN']
    },
    {
      time: '1 tháng',
      value: '1 tháng',
      selected: false,
      data: [78000, 80000, 82000, 85000, 87000, 89000, 90000],
      categories: ['Tuần 1', 'Tuần 2', 'Tuần 3', 'Tuần 4']
    },
    {
      time: '1 năm',
      value: '1 năm',
      selected: false,
      data: [50000, 60000, 70000, 80000, 90000, 95000, 100000],
      categories: ['Q1', 'Q2', 'Q3', 'Q4']
    },
    {
      time: '2 năm',
      value: '2 năm',
      selected: false,
      data: [30000, 40000, 50000, 60000, 70000, 80000, 90000],
      categories: ['2023 Q1', 'Q2', 'Q3', 'Q4', '2024 Q1', 'Q2', 'Q3']
    }
  ];

  constructor() {
    const defaultInterval = this.timeIntervals.find(i => i.selected);
    if (defaultInterval) this.initChart(defaultInterval);
  }

  selectInterval(interval: TimeInterval) {
    this.timeIntervals.forEach(i => i.selected = false);
    interval.selected = true;
    this.initChart(interval);
  }

  initChart(interval: TimeInterval) {
    this.chartOptions = {
      series: [{ name: 'BTC Price', data: interval.data }],
      chart: {
        type: 'line',
        height: 350,
        zoom: {
          enabled: true,
          type: 'x',
          autoScaleYaxis: true
        },
        toolbar: {
          show: true,
          tools: {
            zoom: true,
            zoomin: true,
            zoomout: true,
            pan: true,
            reset: true
          }
        },
        animations: { enabled: true, speed: 800 }
      },
      colors: ['#1890ff'],
      dataLabels: { enabled: false },
      stroke: { curve: 'smooth', width: 3 },
      title: {
        text: `Biểu đồ giá Bitcoin (${interval.value})`,
        align: 'left',
        style: { fontSize: '16px', fontWeight: 'bold', color: '#333' }
      },
      grid: {
        row: { colors: ['#f9f9f9', 'transparent'], opacity: 0.5 },
        borderColor: '#f0f0f0'
      },
      xaxis: {
        categories: interval.categories,
        labels: { style: { colors: '#666', fontSize: '12px' } },
        axisBorder: { show: true, color: '#e0e0e0' }
      },
      yaxis: {
        labels: {
          formatter: (value) => "$" + value.toLocaleString(),
          style: { colors: '#666', fontSize: '12px' }
        },
        opposite: true
      },
      tooltip: {
        y: { formatter: (val) => "$" + val.toLocaleString() },
        style: { fontSize: '14px' }
      }
    };
  }

  switchTab(tabId: string) {
    this.activeTab = tabId;
  }
  }
