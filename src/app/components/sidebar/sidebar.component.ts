import { Component, OnInit } from '@angular/core';

declare interface RouteInfo {
  path: string;
  title: string;
  rtlTitle: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  {
    path: '/dashboard',
    title: 'Tableau De Bord',
    rtlTitle: 'لوحة القيادة',
    icon: 'icon-chart-pie-36',
    class: ''
  },
  {
    path: '/utilisateurs',
    title: 'utilisateurs',
    rtlTitle: 'ملف تعريفي للمستخدم',
    icon: 'icon-single-02',
    class: ''
  },
   {
    path: '/produits',
    title: 'Produits',
    rtlTitle: 'الرموز',
    icon: 'icon-cart',
    class: ''
  },
  {
    path: '/devis',
    title: 'Devis',
    rtlTitle: 'طباعة',
    icon: 'icon-money-coins',
    class: ''
  },
  {
    path: '/clients',
    title: 'Clients',
    rtlTitle: 'قائمة الجدول',
    icon: 'icon-single-02',
    class: ''
  },
  {
    path: '/facture',
    title: 'Facture',
    rtlTitle: 'طباعة',
    icon: 'icon-notes',
    class: ''
  },
  {
    path: '/paiement',
    title: 'paiement',
    rtlTitle: 'طباعة',
    icon: 'icon-coins',
    class: ''
  },
  {
    path: '/categories',
    title: 'Categorie des Produits',
    rtlTitle: 'إخطارات',
    icon: 'icon-bell-55',
    class: ''
  },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() {}

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
    if (window.innerWidth > 991) {
      return false;
    }
    return true;
  }
}
