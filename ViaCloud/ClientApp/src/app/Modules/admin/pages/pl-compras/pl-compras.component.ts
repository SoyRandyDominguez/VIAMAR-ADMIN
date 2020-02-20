import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pl-compras',
  templateUrl: './pl-compras.component.html',
  styleUrls: ['./pl-compras.component.scss']
})
export class PlComprasComponent implements OnInit {
  disabled = false;

  test: PLComprasValores[] = 
  [

    {
      nombre: 'Order',
      values: [
        { mes: 'Enero', monto: 0 },
        { mes: 'Febrero', monto: 0 },
        { mes: 'Marzo', monto: 0 },
        { mes: 'Abril', monto: 0 },
        { mes: 'Mayo', monto: 0 },
        { mes: 'Junio', monto: 0 },
        { mes: 'Julio', monto: 0 },
        { mes: 'Agosto', monto: 0 },
        { mes: 'Septiembre', monto: 0 },
        { mes: 'Octubre', monto: 0 },
        { mes: 'Noviembre', monto: 0 },
        { mes: 'Diciembre', monto: 0 }]
    },
    {
      nombre: 'Production',
      values: [
        { mes: 'Enero', monto: 0 },
        { mes: 'Febrero', monto: 0 },
        { mes: 'Marzo', monto: 0 },
        { mes: 'Abril', monto: 0 },
        { mes: 'Mayo', monto: 0 },
        { mes: 'Junio', monto: 0 },
        { mes: 'Julio', monto: 0 },
        { mes: 'Agosto', monto: 0 },
        { mes: 'Septiembre', monto: 0 },
        { mes: 'Octubre', monto: 0 },
        { mes: 'Noviembre', monto: 0 },
        { mes: 'Diciembre', monto: 0 }]
    },
    {
      nombre: 'Shipments',
      values: [
        { mes: 'Enero', monto: 0 },
        { mes: 'Febrero', monto: 0 },
        { mes: 'Marzo', monto: 0 },
        { mes: 'Abril', monto: 0 },
        { mes: 'Mayo', monto: 0 },
        { mes: 'Junio', monto: 0 },
        { mes: 'Julio', monto: 0 },
        { mes: 'Agosto', monto: 0 },
        { mes: 'Septiembre', monto: 0 },
        { mes: 'Octubre', monto: 0 },
        { mes: 'Noviembre', monto: 0 },
        { mes: 'Diciembre', monto: 0 }]
    },
    {
      nombre: 'Arrival',
      values: [
        { mes: 'Enero', monto: 0 },
        { mes: 'Febrero', monto: 0 },
        { mes: 'Marzo', monto: 0 },
        { mes: 'Abril', monto: 0 },
        { mes: 'Mayo', monto: 0 },
        { mes: 'Junio', monto: 0 },
        { mes: 'Julio', monto: 0 },
        { mes: 'Agosto', monto: 0 },
        { mes: 'Septiembre', monto: 0 },
        { mes: 'Octubre', monto: 0 },
        { mes: 'Noviembre', monto: 0 },
        { mes: 'Diciembre', monto: 0 }]
    },
    {
      nombre: 'Sales',
      values: [
        { mes: 'Enero', monto: 0 },
        { mes: 'Febrero', monto: 0 },
        { mes: 'Marzo', monto: 0 },
        { mes: 'Abril', monto: 0 },
        { mes: 'Mayo', monto: 0 },
        { mes: 'Junio', monto: 0 },
        { mes: 'Julio', monto: 0 },
        { mes: 'Agosto', monto: 0 },
        { mes: 'Septiembre', monto: 0 },
        { mes: 'Octubre', monto: 0 },
        { mes: 'Noviembre', monto: 0 },
        { mes: 'Diciembre', monto: 0 }]
    },
    {
      nombre: 'Stock',
      values: [
        { mes: 'Enero', monto: 0 },
        { mes: 'Febrero', monto: 0 },
        { mes: 'Marzo', monto: 0 },
        { mes: 'Abril', monto: 0 },
        { mes: 'Mayo', monto: 0 },
        { mes: 'Junio', monto: 0 },
        { mes: 'Julio', monto: 0 },
        { mes: 'Agosto', monto: 0 },
        { mes: 'Septiembre', monto: 0 },
        { mes: 'Octubre', monto: 0 },
        { mes: 'Noviembre', monto: 0 },
        { mes: 'Diciembre', monto: 0 }]
    },
    {
      nombre: 'MOS (+3)',
      values: [
        { mes: 'Enero', monto: 0 },
        { mes: 'Febrero', monto: 0 },
        { mes: 'Marzo', monto: 0 },
        { mes: 'Abril', monto: 0 },
        { mes: 'Mayo', monto: 0 },
        { mes: 'Junio', monto: 0 },
        { mes: 'Julio', monto: 0 },
        { mes: 'Agosto', monto: 0 },
        { mes: 'Septiembre', monto: 0 },
        { mes: 'Octubre', monto: 0 },
        { mes: 'Noviembre', monto: 0 },
        { mes: 'Diciembre', monto: 0 }]
    },

    {
      nombre: 'MOS (-3)',
      values: [
        { mes: 'Enero', monto: 0 },
        { mes: 'Febrero', monto: 0 },
        { mes: 'Marzo', monto: 0 },
        { mes: 'Abril', monto: 0 },
        { mes: 'Mayo', monto: 0 },
        { mes: 'Junio', monto: 0 },
        { mes: 'Julio', monto: 0 },
        { mes: 'Agosto', monto: 0 },
        { mes: 'Septiembre', monto: 0 },
        { mes: 'Octubre', monto: 0 },
        { mes: 'Noviembre', monto: 0 },
        { mes: 'Diciembre', monto: 0 }]
    },
    {
      nombre: 'MOS (+6)',
      values: [
        { mes: 'Enero', monto: 0 },
        { mes: 'Febrero', monto: 0 },
        { mes: 'Marzo', monto: 0 },
        { mes: 'Abril', monto: 0 },
        { mes: 'Mayo', monto: 0 },
        { mes: 'Junio', monto: 0 },
        { mes: 'Julio', monto: 0 },
        { mes: 'Agosto', monto: 0 },
        { mes: 'Septiembre', monto: 0 },
        { mes: 'Octubre', monto: 0 },
        { mes: 'Noviembre', monto: 0 },
        { mes: 'Diciembre', monto: 0 }]
    },
    {
      nombre: 'MOS (-6)',
      values: [
        { mes: 'Enero', monto: 0 },
        { mes: 'Febrero', monto: 0 },
        { mes: 'Marzo', monto: 0 },
        { mes: 'Abril', monto: 0 },
        { mes: 'Mayo', monto: 0 },
        { mes: 'Junio', monto: 0 },
        { mes: 'Julio', monto: 0 },
        { mes: 'Agosto', monto: 0 },
        { mes: 'Septiembre', monto: 0 },
        { mes: 'Octubre', monto: 0 },
        { mes: 'Noviembre', monto: 0 },
        { mes: 'Diciembre', monto: 0 }]
    },
  ];

  meses = [
    'Enero' ,
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre', 
  'Noviembre',
  'Diciembre']

  

productos : ProductosPLCompras[] = [
  { activo: true, productoID: 1,nombreProd:'Producto 1',
  plComprasValores:
  [

    {
      nombre: 'Order',
      values: [
        { mes: 'Enero', monto: 0 },
        { mes: 'Febrero', monto: 0 },
        { mes: 'Marzo', monto: 0 },
        { mes: 'Abril', monto: 0 },
        { mes: 'Mayo', monto: 0 },
        { mes: 'Junio', monto: 0 },
        { mes: 'Julio', monto: 0 },
        { mes: 'Agosto', monto: 0 },
        { mes: 'Septiembre', monto: 0 },
        { mes: 'Octubre', monto: 0 },
        { mes: 'Noviembre', monto: 0 },
        { mes: 'Diciembre', monto: 0 }]
    },
    {
      nombre: 'Production',
      values: [
        { mes: 'Enero', monto: 0 },
        { mes: 'Febrero', monto: 0 },
        { mes: 'Marzo', monto: 0 },
        { mes: 'Abril', monto: 0 },
        { mes: 'Mayo', monto: 0 },
        { mes: 'Junio', monto: 0 },
        { mes: 'Julio', monto: 0 },
        { mes: 'Agosto', monto: 0 },
        { mes: 'Septiembre', monto: 0 },
        { mes: 'Octubre', monto: 0 },
        { mes: 'Noviembre', monto: 0 },
        { mes: 'Diciembre', monto: 0 }]
    },
    {
      nombre: 'Shipments',
      values: [
        { mes: 'Enero', monto: 0 },
        { mes: 'Febrero', monto: 0 },
        { mes: 'Marzo', monto: 0 },
        { mes: 'Abril', monto: 0 },
        { mes: 'Mayo', monto: 0 },
        { mes: 'Junio', monto: 0 },
        { mes: 'Julio', monto: 0 },
        { mes: 'Agosto', monto: 0 },
        { mes: 'Septiembre', monto: 0 },
        { mes: 'Octubre', monto: 0 },
        { mes: 'Noviembre', monto: 0 },
        { mes: 'Diciembre', monto: 0 }]
    },
    {
      nombre: 'Arrival',
      values: [
        { mes: 'Enero', monto: 0 },
        { mes: 'Febrero', monto: 0 },
        { mes: 'Marzo', monto: 0 },
        { mes: 'Abril', monto: 0 },
        { mes: 'Mayo', monto: 0 },
        { mes: 'Junio', monto: 0 },
        { mes: 'Julio', monto: 0 },
        { mes: 'Agosto', monto: 0 },
        { mes: 'Septiembre', monto: 0 },
        { mes: 'Octubre', monto: 0 },
        { mes: 'Noviembre', monto: 0 },
        { mes: 'Diciembre', monto: 0 }]
    },
    {
      nombre: 'Sales',
      values: [
        { mes: 'Enero', monto: 0 },
        { mes: 'Febrero', monto: 0 },
        { mes: 'Marzo', monto: 0 },
        { mes: 'Abril', monto: 0 },
        { mes: 'Mayo', monto: 0 },
        { mes: 'Junio', monto: 0 },
        { mes: 'Julio', monto: 0 },
        { mes: 'Agosto', monto: 0 },
        { mes: 'Septiembre', monto: 0 },
        { mes: 'Octubre', monto: 0 },
        { mes: 'Noviembre', monto: 0 },
        { mes: 'Diciembre', monto: 0 }]
    },
    {
      nombre: 'Stock',
      values: [
        { mes: 'Enero', monto: 0 },
        { mes: 'Febrero', monto: 0 },
        { mes: 'Marzo', monto: 0 },
        { mes: 'Abril', monto: 0 },
        { mes: 'Mayo', monto: 0 },
        { mes: 'Junio', monto: 0 },
        { mes: 'Julio', monto: 0 },
        { mes: 'Agosto', monto: 0 },
        { mes: 'Septiembre', monto: 0 },
        { mes: 'Octubre', monto: 0 },
        { mes: 'Noviembre', monto: 0 },
        { mes: 'Diciembre', monto: 0 }]
    },
    {
      nombre: 'MOS (+3)',
      values: [
        { mes: 'Enero', monto: 0 },
        { mes: 'Febrero', monto: 0 },
        { mes: 'Marzo', monto: 0 },
        { mes: 'Abril', monto: 0 },
        { mes: 'Mayo', monto: 0 },
        { mes: 'Junio', monto: 0 },
        { mes: 'Julio', monto: 0 },
        { mes: 'Agosto', monto: 0 },
        { mes: 'Septiembre', monto: 0 },
        { mes: 'Octubre', monto: 0 },
        { mes: 'Noviembre', monto: 0 },
        { mes: 'Diciembre', monto: 0 }]
    },

    {
      nombre: 'MOS (-3)',
      values: [
        { mes: 'Enero', monto: 0 },
        { mes: 'Febrero', monto: 0 },
        { mes: 'Marzo', monto: 0 },
        { mes: 'Abril', monto: 0 },
        { mes: 'Mayo', monto: 0 },
        { mes: 'Junio', monto: 0 },
        { mes: 'Julio', monto: 0 },
        { mes: 'Agosto', monto: 0 },
        { mes: 'Septiembre', monto: 0 },
        { mes: 'Octubre', monto: 0 },
        { mes: 'Noviembre', monto: 0 },
        { mes: 'Diciembre', monto: 0 }]
    },
    {
      nombre: 'MOS (+6)',
      values: [
        { mes: 'Enero', monto: 0 },
        { mes: 'Febrero', monto: 0 },
        { mes: 'Marzo', monto: 0 },
        { mes: 'Abril', monto: 0 },
        { mes: 'Mayo', monto: 0 },
        { mes: 'Junio', monto: 0 },
        { mes: 'Julio', monto: 0 },
        { mes: 'Agosto', monto: 0 },
        { mes: 'Septiembre', monto: 0 },
        { mes: 'Octubre', monto: 0 },
        { mes: 'Noviembre', monto: 0 },
        { mes: 'Diciembre', monto: 0 }]
    },
    {
      nombre: 'MOS (-6)',
      values: [
        { mes: 'Enero', monto: 0 },
        { mes: 'Febrero', monto: 0 },
        { mes: 'Marzo', monto: 0 },
        { mes: 'Abril', monto: 0 },
        { mes: 'Mayo', monto: 0 },
        { mes: 'Junio', monto: 0 },
        { mes: 'Julio', monto: 0 },
        { mes: 'Agosto', monto: 0 },
        { mes: 'Septiembre', monto: 0 },
        { mes: 'Octubre', monto: 0 },
        { mes: 'Noviembre', monto: 0 },
        { mes: 'Diciembre', monto: 0 }]
    },
  ]
  },
  { activo: false,productoID: 2,nombreProd:'Producto 2',
  plComprasValores:
  [

    {
      nombre: 'Order',
      values: [
        { mes: 'Enero', monto: 0 },
        { mes: 'Febrero', monto: 0 },
        { mes: 'Marzo', monto: 0 },
        { mes: 'Abril', monto: 0 },
        { mes: 'Mayo', monto: 0 },
        { mes: 'Junio', monto: 0 },
        { mes: 'Julio', monto: 0 },
        { mes: 'Agosto', monto: 0 },
        { mes: 'Septiembre', monto: 0 },
        { mes: 'Octubre', monto: 0 },
        { mes: 'Noviembre', monto: 0 },
        { mes: 'Diciembre', monto: 0 }]
    },
    {
      nombre: 'Production',
      values: [
        { mes: 'Enero', monto: 0 },
        { mes: 'Febrero', monto: 0 },
        { mes: 'Marzo', monto: 0 },
        { mes: 'Abril', monto: 0 },
        { mes: 'Mayo', monto: 0 },
        { mes: 'Junio', monto: 0 },
        { mes: 'Julio', monto: 0 },
        { mes: 'Agosto', monto: 0 },
        { mes: 'Septiembre', monto: 0 },
        { mes: 'Octubre', monto: 0 },
        { mes: 'Noviembre', monto: 0 },
        { mes: 'Diciembre', monto: 0 }]
    },
    {
      nombre: 'Shipments',
      values: [
        { mes: 'Enero', monto: 0 },
        { mes: 'Febrero', monto: 0 },
        { mes: 'Marzo', monto: 0 },
        { mes: 'Abril', monto: 0 },
        { mes: 'Mayo', monto: 0 },
        { mes: 'Junio', monto: 0 },
        { mes: 'Julio', monto: 0 },
        { mes: 'Agosto', monto: 0 },
        { mes: 'Septiembre', monto: 0 },
        { mes: 'Octubre', monto: 0 },
        { mes: 'Noviembre', monto: 0 },
        { mes: 'Diciembre', monto: 0 }]
    },
    {
      nombre: 'Arrival',
      values: [
        { mes: 'Enero', monto: 0 },
        { mes: 'Febrero', monto: 0 },
        { mes: 'Marzo', monto: 0 },
        { mes: 'Abril', monto: 0 },
        { mes: 'Mayo', monto: 0 },
        { mes: 'Junio', monto: 0 },
        { mes: 'Julio', monto: 0 },
        { mes: 'Agosto', monto: 0 },
        { mes: 'Septiembre', monto: 0 },
        { mes: 'Octubre', monto: 0 },
        { mes: 'Noviembre', monto: 0 },
        { mes: 'Diciembre', monto: 0 }]
    },
    {
      nombre: 'Sales',
      values: [
        { mes: 'Enero', monto: 0 },
        { mes: 'Febrero', monto: 0 },
        { mes: 'Marzo', monto: 0 },
        { mes: 'Abril', monto: 0 },
        { mes: 'Mayo', monto: 0 },
        { mes: 'Junio', monto: 0 },
        { mes: 'Julio', monto: 0 },
        { mes: 'Agosto', monto: 0 },
        { mes: 'Septiembre', monto: 0 },
        { mes: 'Octubre', monto: 0 },
        { mes: 'Noviembre', monto: 0 },
        { mes: 'Diciembre', monto: 0 }]
    },
    {
      nombre: 'Stock',
      values: [
        { mes: 'Enero', monto: 0 },
        { mes: 'Febrero', monto: 0 },
        { mes: 'Marzo', monto: 0 },
        { mes: 'Abril', monto: 0 },
        { mes: 'Mayo', monto: 0 },
        { mes: 'Junio', monto: 0 },
        { mes: 'Julio', monto: 0 },
        { mes: 'Agosto', monto: 0 },
        { mes: 'Septiembre', monto: 0 },
        { mes: 'Octubre', monto: 0 },
        { mes: 'Noviembre', monto: 0 },
        { mes: 'Diciembre', monto: 0 }]
    },
    {
      nombre: 'MOS (+3)',
      values: [
        { mes: 'Enero', monto: 0 },
        { mes: 'Febrero', monto: 0 },
        { mes: 'Marzo', monto: 0 },
        { mes: 'Abril', monto: 0 },
        { mes: 'Mayo', monto: 0 },
        { mes: 'Junio', monto: 0 },
        { mes: 'Julio', monto: 0 },
        { mes: 'Agosto', monto: 0 },
        { mes: 'Septiembre', monto: 0 },
        { mes: 'Octubre', monto: 0 },
        { mes: 'Noviembre', monto: 0 },
        { mes: 'Diciembre', monto: 0 }]
    },

    {
      nombre: 'MOS (-3)',
      values: [
        { mes: 'Enero', monto: 0 },
        { mes: 'Febrero', monto: 0 },
        { mes: 'Marzo', monto: 0 },
        { mes: 'Abril', monto: 0 },
        { mes: 'Mayo', monto: 0 },
        { mes: 'Junio', monto: 0 },
        { mes: 'Julio', monto: 0 },
        { mes: 'Agosto', monto: 0 },
        { mes: 'Septiembre', monto: 0 },
        { mes: 'Octubre', monto: 0 },
        { mes: 'Noviembre', monto: 0 },
        { mes: 'Diciembre', monto: 0 }]
    },
    {
      nombre: 'MOS (+6)',
      values: [
        { mes: 'Enero', monto: 0 },
        { mes: 'Febrero', monto: 0 },
        { mes: 'Marzo', monto: 0 },
        { mes: 'Abril', monto: 0 },
        { mes: 'Mayo', monto: 0 },
        { mes: 'Junio', monto: 0 },
        { mes: 'Julio', monto: 0 },
        { mes: 'Agosto', monto: 0 },
        { mes: 'Septiembre', monto: 0 },
        { mes: 'Octubre', monto: 0 },
        { mes: 'Noviembre', monto: 0 },
        { mes: 'Diciembre', monto: 0 }]
    },
    {
      nombre: 'MOS (-6)',
      values: [
        { mes: 'Enero', monto: 0 },
        { mes: 'Febrero', monto: 0 },
        { mes: 'Marzo', monto: 0 },
        { mes: 'Abril', monto: 0 },
        { mes: 'Mayo', monto: 0 },
        { mes: 'Junio', monto: 0 },
        { mes: 'Julio', monto: 0 },
        { mes: 'Agosto', monto: 0 },
        { mes: 'Septiembre', monto: 0 },
        { mes: 'Octubre', monto: 0 },
        { mes: 'Noviembre', monto: 0 },
        { mes: 'Diciembre', monto: 0 }]
    },
  ]
  },
  { activo: false,productoID: 3,nombreProd:'Producto 3',
  plComprasValores:
  [

    {
      nombre: 'Order',
      values: [
        { mes: 'Enero', monto: 0 },
        { mes: 'Febrero', monto: 0 },
        { mes: 'Marzo', monto: 0 },
        { mes: 'Abril', monto: 0 },
        { mes: 'Mayo', monto: 0 },
        { mes: 'Junio', monto: 0 },
        { mes: 'Julio', monto: 0 },
        { mes: 'Agosto', monto: 0 },
        { mes: 'Septiembre', monto: 0 },
        { mes: 'Octubre', monto: 0 },
        { mes: 'Noviembre', monto: 0 },
        { mes: 'Diciembre', monto: 0 }]
    },
    {
      nombre: 'Production',
      values: [
        { mes: 'Enero', monto: 0 },
        { mes: 'Febrero', monto: 0 },
        { mes: 'Marzo', monto: 0 },
        { mes: 'Abril', monto: 0 },
        { mes: 'Mayo', monto: 0 },
        { mes: 'Junio', monto: 0 },
        { mes: 'Julio', monto: 0 },
        { mes: 'Agosto', monto: 0 },
        { mes: 'Septiembre', monto: 0 },
        { mes: 'Octubre', monto: 0 },
        { mes: 'Noviembre', monto: 0 },
        { mes: 'Diciembre', monto: 0 }]
    },
    {
      nombre: 'Shipments',
      values: [
        { mes: 'Enero', monto: 0 },
        { mes: 'Febrero', monto: 0 },
        { mes: 'Marzo', monto: 0 },
        { mes: 'Abril', monto: 0 },
        { mes: 'Mayo', monto: 0 },
        { mes: 'Junio', monto: 0 },
        { mes: 'Julio', monto: 0 },
        { mes: 'Agosto', monto: 0 },
        { mes: 'Septiembre', monto: 0 },
        { mes: 'Octubre', monto: 0 },
        { mes: 'Noviembre', monto: 0 },
        { mes: 'Diciembre', monto: 0 }]
    },
    {
      nombre: 'Arrival',
      values: [
        { mes: 'Enero', monto: 0 },
        { mes: 'Febrero', monto: 0 },
        { mes: 'Marzo', monto: 0 },
        { mes: 'Abril', monto: 0 },
        { mes: 'Mayo', monto: 0 },
        { mes: 'Junio', monto: 0 },
        { mes: 'Julio', monto: 0 },
        { mes: 'Agosto', monto: 0 },
        { mes: 'Septiembre', monto: 0 },
        { mes: 'Octubre', monto: 0 },
        { mes: 'Noviembre', monto: 0 },
        { mes: 'Diciembre', monto: 0 }]
    },
    {
      nombre: 'Sales',
      values: [
        { mes: 'Enero', monto: 0 },
        { mes: 'Febrero', monto: 0 },
        { mes: 'Marzo', monto: 0 },
        { mes: 'Abril', monto: 0 },
        { mes: 'Mayo', monto: 0 },
        { mes: 'Junio', monto: 0 },
        { mes: 'Julio', monto: 0 },
        { mes: 'Agosto', monto: 0 },
        { mes: 'Septiembre', monto: 0 },
        { mes: 'Octubre', monto: 0 },
        { mes: 'Noviembre', monto: 0 },
        { mes: 'Diciembre', monto: 0 }]
    },
    {
      nombre: 'Stock',
      values: [
        { mes: 'Enero', monto: 0 },
        { mes: 'Febrero', monto: 0 },
        { mes: 'Marzo', monto: 0 },
        { mes: 'Abril', monto: 0 },
        { mes: 'Mayo', monto: 0 },
        { mes: 'Junio', monto: 0 },
        { mes: 'Julio', monto: 0 },
        { mes: 'Agosto', monto: 0 },
        { mes: 'Septiembre', monto: 0 },
        { mes: 'Octubre', monto: 0 },
        { mes: 'Noviembre', monto: 0 },
        { mes: 'Diciembre', monto: 0 }]
    },
    {
      nombre: 'MOS (+3)',
      values: [
        { mes: 'Enero', monto: 0 },
        { mes: 'Febrero', monto: 0 },
        { mes: 'Marzo', monto: 0 },
        { mes: 'Abril', monto: 0 },
        { mes: 'Mayo', monto: 0 },
        { mes: 'Junio', monto: 0 },
        { mes: 'Julio', monto: 0 },
        { mes: 'Agosto', monto: 0 },
        { mes: 'Septiembre', monto: 0 },
        { mes: 'Octubre', monto: 0 },
        { mes: 'Noviembre', monto: 0 },
        { mes: 'Diciembre', monto: 0 }]
    },

    {
      nombre: 'MOS (-3)',
      values: [
        { mes: 'Enero', monto: 0 },
        { mes: 'Febrero', monto: 0 },
        { mes: 'Marzo', monto: 0 },
        { mes: 'Abril', monto: 0 },
        { mes: 'Mayo', monto: 0 },
        { mes: 'Junio', monto: 0 },
        { mes: 'Julio', monto: 0 },
        { mes: 'Agosto', monto: 0 },
        { mes: 'Septiembre', monto: 0 },
        { mes: 'Octubre', monto: 0 },
        { mes: 'Noviembre', monto: 0 },
        { mes: 'Diciembre', monto: 0 }]
    },
    {
      nombre: 'MOS (+6)',
      values: [
        { mes: 'Enero', monto: 0 },
        { mes: 'Febrero', monto: 0 },
        { mes: 'Marzo', monto: 0 },
        { mes: 'Abril', monto: 0 },
        { mes: 'Mayo', monto: 0 },
        { mes: 'Junio', monto: 0 },
        { mes: 'Julio', monto: 0 },
        { mes: 'Agosto', monto: 0 },
        { mes: 'Septiembre', monto: 0 },
        { mes: 'Octubre', monto: 0 },
        { mes: 'Noviembre', monto: 0 },
        { mes: 'Diciembre', monto: 0 }]
    },
    {
      nombre: 'MOS (-6)',
      values: [
        { mes: 'Enero', monto: 0 },
        { mes: 'Febrero', monto: 0 },
        { mes: 'Marzo', monto: 0 },
        { mes: 'Abril', monto: 0 },
        { mes: 'Mayo', monto: 0 },
        { mes: 'Junio', monto: 0 },
        { mes: 'Julio', monto: 0 },
        { mes: 'Agosto', monto: 0 },
        { mes: 'Septiembre', monto: 0 },
        { mes: 'Octubre', monto: 0 },
        { mes: 'Noviembre', monto: 0 },
        { mes: 'Diciembre', monto: 0 }]
    },
  ]
  }
];




  constructor() {
  }


  ngOnInit(): void {
  }

  tooglePanelByProductID(producto:ProductosPLCompras){

    this.productos.forEach(x=>{x.activo = false;});
    producto.activo = true;

  }

}


export class ProductosPLCompras{

  productoID:number;
  nombreProd:String;
  activo:boolean;
  plComprasValores:PLComprasValores[]

}

export class PLComprasValores {
  nombre: string;
  values: Cantidades[];
}
export class Cantidades {
  mes: string;
  monto: number;
}
