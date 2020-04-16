export default { 
    columns2 : [
    {
        title: 'funId',
        dataIndex: 'funId',
        key: 'funId',
      },
      {
        title: 'funName',
        dataIndex: 'funName',
        key: 'funName',
        width: '12%',
      },
     {
        title: 'menuName',
        dataIndex: 'menuName',
        width: '30%',
        key: 'menuName',
      }
],

cdata : [
    {
      "level": 0,
      "appName": "BOP Permissions",
      "funtypesId": "1,2",
      "funtypeAcclevel": "8",
      "menuName": "User Management",
      "funId": 4,
      "rstatus": "1",
      "parentFunName": "",
      "parentFunId": 0,
      "children": [
        {
          "level": 0,
          "appName": "Call center Business Analyst",
          "funtypesId": "2",
          "funtypeAcclevel": "0",
          "menuName": "User Management",
          "funId": 5,
          "rstatus": "1",
          "parentFunName": "Users",
          "parentFunId": 4,
          "children": [
            {
              "level": 0,
              "appName": "BOP Permissions",
              "funtypesId": "2",
              "funtypeAcclevel": "8",
              "menuName": "User Management",
              "funId": 6,
              "rstatus": "1",
              "parentFunName": "List Approved",
              "parentFunId": 5,
              "children": [],
              "strAccessId": "9",
              "appId": 1,
              "strParentFunId": "5",
              "funtypes": "Edit",
              "funName": "List Unapproved"
            }
          ],
          "strAccessId": "1",
          "appId": 7,
          "strParentFunId": "4",
          "funtypes": "Edit",
          "funName": "List Approved"
        }
      ],
      "strAccessId": "9",
      "appId": 1,
      "strParentFunId": "0",
      "funtypes": "Add,Edit",
      "funName": "Users"
    },
    
  ]

}