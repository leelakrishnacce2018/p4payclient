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
      title: true,
      name: 'Components',
      wrapper: {
        element: 'span',
        attributes: {}
      },
      role:'maker'
    },    
   
    {
      name: 'Masters',
      url: '/masters',
      icon: 'fa fa-list-altt',
      role:'maker',
      children: [
        {
          name: 'Country',
          url: '/masters/country',
          icon: 'icon-flag'
        },
        {
          name: 'SAM SBU',
          url: '/masters/samsbu',
          icon: 'fa fa-superpowers'
        },
        {
          name: 'SAM BU',
          url: '/masters/sambu',
          icon: 'fa fa-building'
        },
        
        {
          name: 'SAM Application',
          url: '/masters/samapp',
          icon: 'fa fa-diamond'
        },
            {
          name: 'RoleTitle',
          url: '/masters/roletitle',
          icon: 'fa fa-tags'
        },
        {
          name: 'SAM Role',
          url: '/masters/samroles',
          icon: 'fa fa-id-card'
        },
        
      ]
    },
    
    {
      divider: true,
      role:'maker'
    },
    {
      name: 'SamData',
      url: '/samdata',
      icon: 'icon-speedometer',
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
      icon: 'fa fa-check',
     
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
      name: 'Masters',
      url: '/masters',
      icon: 'fa fa-list-altt',
      role:'maker',
      children: [
        {
          name: 'Country',
          url: '/masters/country',
          icon: 'icon-flag'
        },
        {
          name: 'SAM SBU',
          url: '/masters/samsbu',
          icon: 'fa fa-superpowers'
        },
        {
          name: 'SAM BU',
          url: '/masters/sambu',
          icon: 'fa fa-building'
        },
        
        {
          name: 'SAM Application',
          url: '/masters/samapp',
          icon: 'fa fa-diamond'
        },
            {
          name: 'RoleTitle',
          url: '/masters/roletitle',
          icon: 'fa fa-tags'
        },
        {
          name: 'SAM Role',
          url: '/masters/samroles',
          icon: 'fa fa-id-card'
        },
        
      ]
    },
    
    {
      divider: true,
      role:'maker'
    },
    {
      name: 'SamData',
      url: '/samdata',
      icon: 'icon-speedometer',
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
      icon: 'fa fa-check',
     
    },
    {
      name: 'Reports',
      url: '/reports',
      icon: 'fas fa-chart-bar',
      role:'checker',
      children: [
        {
          name: 'Approves',
          url: '/reports/data',
          icon: 'fa fa-podcast'
        },
        {
          name: 'SAMByApp',
          url: '/reports/AppsRoles',
          icon: 'fa fa-podcast'
        },
        {
          name: 'SAMByRole',
          url: '/reports/sambyrole',
          icon: 'fa fa-podcast'
        },
        {
          name: 'SAMByBu',
          url: '/reports/sambybu',
          icon: 'fa fa-podcast'
        },
        {
          name: 'SAMBySbu',
          url: '/reports/sambysbu',
          icon: 'fa fa-podcast'
        }
      ]
    }
   
   
  ]
 
   
  
};
