export const PAGES = [{
    path: '/',
    title: 'Accueil'
},{
    path: '/beats',
    title: 'Beats'
},{
    path: '/faq',
    title: 'FAQ'
},{
    path: '/ajouter',
    title: 'Ajouter'
},{
    path: '/:userId/mon-compte',
    title: 'Mon compte'
}];

export const SIDEBAR = {
    show: true,
    title: 'Browse Music',
    links: [{
        path: '/',
        title: 'Accueil',
        icon: 'home',
        show: false
    },{
        path: '/beats',
        title: 'Beats',
        icon: 'default',
        show: true
    },{
        path: '/faq',
        title: 'FAQ',
        icon: 'question',
        show: true
    }]
};

export const TABS = {
    show: true,
    elements: [
        'All',
        'Trap',
        'Old school',
        'Others',
        'Favoris'
    ]
};

export const BUTTONS = {
    favourite: 'Favori',
    add: 'Ajouter',
    edit: 'Éditer',
    delete: 'Supprimer',
    confirmLabel: 'Oui',
    cancelLabel: 'Non',
};

export const ACTIONS = {
    confirmAction: 'confirm',
    cancelAction: 'cancel',
    add: 'add',
    remove: 'remove'
};

export const MODAL = {
    message: {
        deleteSong: 'Supprimer cette chanson ?',
        favAdded: 'Ajouté aux favoris !',
        favRemoved: 'Supprimé des favoris'
    },
    mode: {
        alert: 'alert',
        confirm: 'confirm',
    }
};