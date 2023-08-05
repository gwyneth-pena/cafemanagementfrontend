import { Injectable } from "@angular/core"

export interface Menu{
    state: string,
    name: string,
    type: string, 
    icon: string, 
    role: string
}

const menuItems = [
    {state:'dashboard', name: 'Dashboard', type:'link', icon:'ri-dashboard-line', role:'admin'},
    {state:'category/list', name: 'Manage Categories', type:'link', icon:'ri-file-list-line', role:'admin'},
    {state:'product/list', name: 'Manage Product', type:'link', icon:'ri-cup-fill', role:'admin'},
    {state:'product/order', name: 'Orders', type:'link', icon:'ri-clipboard-fill', role:'admin,user'},
    {state:'bill/list', name: 'View Bills', type:'link', icon:'ri-bill-fill', role:'admin,user'},
    {state:'user/list', name: 'Manage Users', type:'link', icon:'ri-user-fill', role:'admin'}
]

@Injectable({
    providedIn: 'root'
})
export class MenuService{
    getMenuItems(): Menu[]{
        return menuItems;
    }
}