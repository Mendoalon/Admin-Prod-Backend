const getMenuFrontEnd = (role = 'USER_ROLE') =>{

    const menu = [
        {
          titulo: 'Dashboard',
          icono: 'mdi mdi-gauge',
          submenu: [
            { titulo: 'Main', url: '/dashboard' },
            { titulo: 'ProgressBar', url: '/dashboard/progress' },
            { titulo: 'Graficas', url: '/dashboard/grafica1' },
            { titulo: 'Promesas', url: '/dashboard/promesa' },
            { titulo: 'Rxjs', url: '/dashboard/rxjs' },
          ]
        },
        {
          titulo: 'Mantenimiento',
          icono: 'mdi mdi-folder-lock-open',
          submenu: [
            // { titulo: 'Usuarios', url: './usuarios' },
            { titulo: 'Hospitales', url: './hospitales' },
            { titulo: 'Medicos', url: './medicos' },
    
          ]
        }
      ];

      if( role === 'ADMIN_ROLE'){
        menu[1].submenu.unshift({ titulo: 'Usuarios', url: './usuarios' })
      }

      return menu;
}

module.exports = {
    getMenuFrontEnd
}