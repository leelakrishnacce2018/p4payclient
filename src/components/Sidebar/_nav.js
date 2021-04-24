import { createRoletitle } from "../../util/APIUtils";

export default {

  
  items: [
   
    {
      role:'maker',
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer',
      badge: {
        variant: 'info',
        text: ''
      },
     
    },
    {
      role:'checker',
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer',
      badge: {
        variant: 'info',
        text: ''
      },
     
    },      
   
    {
      name: 'Masters',
      url: '/masters',
      icon: 'fa fa-list',
      role:'maker',
      children: [
        {
          name: 'Country',
          url: '/masters/country',
          icon: 'icon-flag'
        },
        {
          name: 'SBU',
          url: '/masters/samsbu',
          icon: 'fa fa-superpowers'
        },
        {
          name: 'BU',
          url: '/masters/sambu',
          icon: 'fa fa-building'
        },        
         {
          name: 'HR Role',
          url: '/masters/roletitle',
          icon: 'fa fa-tags'
        },
        {
          name: 'Application',
          url: '/masters/application',
          icon: 'fa fa-rocket'
        },
        {
          name: 'App Function Details',
          url: '/masters/test',
          icon: 'fa fa-diamond'
        },
       
        {
          name: 'SAM Role',
          url: '/masters/samroles',
          icon: 'fa fa-id-card'
        }      
              ]
    },
    
    {
      divider: true,
      role:'maker'
    },
    {
      name: 'SAM Data',
      url: '/samdata',
      icon: 'fa fa-shield',
      badge: {
        variant: 'info',
        text: ''
      },
      role:'maker'
    },
    {
      role:'checker',
      name: 'UnApproves',
      url: '/approvesamdata',
      icon: 'fa fa-ban',
     
    },
    {
      role:'admin',
      name: 'User Privileges',
      url: '/masters/user',
      icon: 'fa fa-key'
     
    }
   
   
  ],
  items2: [
   
    {
      role:'maker',
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer',
      badge: {
        variant: 'info',
        text: ''
      },
     
    },
     {
      title: true,
      name: 'Components',
      wrapper: {
        element: 'span',
        attributes: {}
      },
      role:'maker'
    },   
    {
      divider: true,
      role:'maker'
    },
   
    {
      role:'admin',
      name: 'Users',
      url: '/masters/user',
      icon: 'fa fa-key'
     
    },
    {
      role:'admin',
      name: 'Search',
      url: '/masters/search',
      icon: 'fa fa-key'
     
    },
    {
      name: 'Reports',
      url: '/reports',
      icon: 'fa fa-list',
      role:'admin',
      children: [
        {
          name: 'Transactions',
          url: '/reports/transactions',
          icon: 'fa fa-check'
        }
      ]
    }
   
   
  ]
 
   
  
};
