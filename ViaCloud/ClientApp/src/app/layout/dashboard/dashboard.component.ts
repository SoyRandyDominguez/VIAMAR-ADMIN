import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseService, DataApi } from '../../Services/HTTPClient/base.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  CardsCargando = false;
  Cargando = false;

  Cards: any[] = [];





  barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    tooltips: {
      backgroundColor: "rgb(255,255,255)",
      bodyFontColor: "#858796",
      borderColor: '#dddfeb',
      borderWidth: 1,
      xPadding: 15,
      yPadding: 10,
      displayColors: false,
      caretPadding: 10,
    },
    legend: {
      display: true
    }
  };


  barChartLabels = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  barChartType = 'line';
  barChartLegend = true;
  barChartData = [
    { data: [58, 90, 50, 75, 96, 96, 58, 42], label: '2019' },
    { data: [65, 59, 80, 81, 56, 55, 40, 28, 48, 40, 19, 86, 27, 90], label: '2018' }
  ];



  pieChartLabels = ['Ventas', 'Pendientes por pagar', 'Pagos'];
  pieChartData = [120, 150, 180];
  pieChartType = 'pie';

  pieChartOpctions = {
    maintainAspectRatio: false,
    tooltips: {
      backgroundColor: "rgb(255,255,255)",
      bodyFontColor: "#858796",
      borderColor: '#dddfeb',
      borderWidth: 1,
      xPadding: 15,
      yPadding: 15,
      displayColors: false,
      caretPadding: 10,
    },
    legend: {
      display: true
    },
    cutoutPercentage: 70,
  }
  constructor(public router: Router, public base: BaseService) { }

  ngOnInit() {
    //this.CardsCargando = true;
    //this.Cargando = true;
    //this.base.DoPost<DashBoardCardsModel>(DataApi.DashBoardCards, "FlujoDashboard", {}).subscribe(x => {
    //  if (x.ok) {
    //    this.Cards = x.records;

    //  }
    //  this.CardsCargando = false;
    //  this.Cargando = false;

    //});




    //let uno = new DashBoardCardsModel();
    //uno.title = "Balance General";
    //uno.iconName = "fa-wallet";
    //uno.value = "40918";
    //uno.titleColorClass = "text-primary"
    //uno.iconColorClass = "text-gray-300"
    //uno.borderColorClass = "border-left-primary";
    //uno.tipoCard = "money";
    //uno.valueColorClass = "text-gray-800"


    //let dos = new DashBoardCardsModel();
    //dos.title = "Por llevar";
    //dos.iconName = "fa-wallet";
    //dos.value = "0";
    //dos.titleColorClass = "text-danger"
    //dos.iconColorClass = "text-gray-300"
    //dos.borderColorClass = "border-left-danger";
    //dos.tipoCard = "money";
    //dos.valueColorClass = "text-gray-800";


    //let tres = new DashBoardCardsModel();
    //tres.title = "Por recoger";
    //tres.iconName = "fa-wallet";
    //tres.value = "0";
    //tres.titleColorClass = "text-info"
    //tres.iconColorClass = "text-gray-300"
    //tres.borderColorClass = "border-left-info";
    //tres.tipoCard = "money";
    //tres.valueColorClass = "text-gray-800";


    //let cuatro = new DashBoardCardsModel();
    //cuatro.title = "Mensajeros";
    //cuatro.iconName = "fa-wallet";
    //cuatro.value = "0";
    //cuatro.titleColorClass = "text-warning"
    //cuatro.iconColorClass = "text-gray-300"
    //cuatro.borderColorClass = "border-left-warning";
    //cuatro.tipoCard = "money";
    //cuatro.valueColorClass = "text-gray-800";
    //cuatro.subTitulo = "Balance general";

    //this.Cards.push(uno);
    //this.Cards.push(dos);
    //this.Cards.push(tres);
    //this.Cards.push(cuatro);


  }




}
