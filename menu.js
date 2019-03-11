const { Menu } = require('electron');

const menuTemplate = [{
    label: 'Process',
    submenu: [
        {
            label: 'Bifurcate',
            accelerator: 'Ctrl+B'
        },
        { type: 'separator' },
        // {
        //     label: 'Department',
        //     accelerator: 'Ctrl+D'
        // },
        // { type: 'separator' },
        // {
        //     label: 'Employee',
        //     accelerator: 'Ctrl+E'
        // },
        // { type: 'separator' },
        // {
        //     label: 'Shift',
        //     accelerator: 'Ctrl+H'
        // }
    ]
}];

menu = Menu.buildFromTemplate(menuTemplate);
Menu.setApplicationMenu(menu);

exports.ApplicationMenu = menu;