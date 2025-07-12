
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
    metaInfo: 'Giá Bitcoin (BTC) hiện tại',
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
    data: [89210, 89235, 89280, 89315, 89340, 89375, 89420, 89450, 89480, 89510, 89530, 89560],
    categories: ['10:00', '10:05', '10:10', '10:15', '10:20', '10:25', '10:30', '10:35', '10:40', '10:45', '10:50', '10:55']
  },
  {
    time: '24 giờ',
    value: '24 giờ',
    selected: true,
    data: [86200, 86550, 86800, 87250, 87600, 88050, 88300, 88600, 88850, 89200, 89500, 89800, 90100, 90350, 90600, 90850, 91100, 91350, 91600, 91800, 92000, 92250, 92500, 92800],
    categories: ['0h', '1h', '2h', '3h', '4h', '5h', '6h', '7h', '8h', '9h', '10h', '11h', '12h', '13h', '14h', '15h', '16h', '17h', '18h', '19h', '20h', '21h', '22h', '23h']
  },
  {
    time: '1 tuần',
    value: '1 tuần',
    selected: false,
    data: [85200, 85500, 85800, 86200, 86500, 86800, 87200, 87500, 87800, 88200, 88500, 88800, 89200, 89500, 89800, 90200, 90500, 90800, 91200, 91500, 91800, 92200, 92500, 92800],
    categories: [
      'T2 0h', 'T2 12h', 
      'T3 0h', 'T3 12h', 
      'T4 0h', 'T4 12h', 
      'T5 0h', 'T5 12h', 
      'T6 0h', 'T6 12h', 
      'T7 0h', 'T7 12h', 
      'CN 0h', 'CN 12h'
    ]
  },
  {
    time: '1 tháng',
    value: '1 tháng',
    selected: false,
    data: [82000, 82500, 83000, 83500, 84000, 84500, 85000, 85500, 86000, 86500, 87000, 87500, 88000, 88500, 89000, 89500, 90000, 90500, 91000, 91500, 92000, 92500, 93000, 93500],
    categories: ['Tuần 1', 'Tuần 2', 'Tuần 3', 'Tuần 4', 'Tuần 5']
  },
  {
    time: '6 tháng',
    value: '6 tháng',
    selected: false,
    data: [78000, 79000, 80000, 81000, 82000, 83000, 84000, 85000, 86000, 87000, 88000, 89000, 90000, 91000, 92000, 93000, 94000, 95000, 96000, 97000, 98000, 99000, 100000, 101000],
    categories: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6']
  },
  {
    time: '1 năm',
    value: '1 năm',
    selected: false,
    data: [60000, 62000, 64000, 66000, 68000, 70000, 72000, 74000, 76000, 78000, 80000, 82000, 84000, 86000, 88000, 90000, 92000, 94000, 96000, 98000, 100000, 102000, 104000, 106000],
    categories: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 
                'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12']
  },
  {
    time: '2 năm',
    value: '2 năm',
    selected: false,
    data: [40000, 45000, 50000, 55000, 60000, 65000, 70000, 75000, 80000, 85000, 90000, 95000, 100000, 105000, 110000, 115000, 120000, 125000, 130000, 135000, 140000, 145000, 150000, 155000],
    categories: [
      '2023 Q1', '2023 Q2', '2023 Q3', '2023 Q4',
      '2024 Q1', '2024 Q2', '2024 Q3', '2024 Q4',
      '2025 Q1', '2025 Q2', '2025 Q3', '2025 Q4'
    ]
  },

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
