import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
      {
         path: '/',
         redirect: '/main/formImportCustom/fakeId',
      },
      {
         path: '/main',
         name: 'MainPage',
         meta: {
                  requireAuth: true,  
               },
         component: () => import('../components/main'),
         children:[
            {
               path: 'formImportCustom/:receiptId',
               name: 'formImportCustom',
               component: () => import('../components/page/formPage/formImportCustom'),
               meta: {
                  title: 'excel处理demo'
               }
            }      
      ]
    }
  ];


const router = new VueRouter({
      routes
});

export default router;


