import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import body from '@/components/body'
import home from '@/components/home.vue'
import error from '@/components/404.vue'
import childView from '@/components/appMain.vue'





Vue.use(Router)
/**
 * routes==默认路由节点
 */
export const routes = [{
  path: '/login',
  name: '登录',
  component: login,
  hidden: true
},
{
  path: '/',
  name: '首页',
  meta: {
    role: 'home'
  },
  component: body,
  iconCls: 'icon-item-manage',
  leaf: true, //只有一个节点
  redirect: '/home',
  children: [{
    path: '/home',
    component: home,
  }
  ]
},

// {
//   path: '/test', 
//   name: '告警',
//   component: body,
//   iconCls: 'icon-item-manage',
//   meta: {
//     isLink: true
//   },
//   children: [
//     {
//       path: '/test/test01',
//       name: '测试001',
//       component: childView,
//       iconCls: 'icon-item-manage',
//       children: [
//         {
//           path: '/test/test01/001',
//           name: '测试001-001',
//           isParent: true,
//           iconCls: 'icon-item-manage',
//           component: resolve => { require(['@/components/test/test02.vue'], resolve) }
//         },
//         {
//           path: '/test/test01/002',
//           name: '测试001-002',
//           isParent: true,
//           iconCls: 'icon-item-manage',
//           component: resolve => { require(['@/components/test/test02.vue'], resolve) }
//         },
//         {
//           path: '/test/test01/003',
//           name: '测试001-003',
//           isParent: true,
//           iconCls: 'icon-item-manage',
//           component: resolve => { require(['@/components/test/test02.vue'], resolve) }
//         },
//       ]
//     }
//   ]
// },
// {
//   path: '/monitor-information', 
//   name: '监控信息',
//   component: body,
//   iconCls: 'icon-item-manage',
//   meta: {
//     isLink: true
//   },
//   children: [  
//     {
//       path: '/monitor-information/hostDetail',
//       name: '主机详情页面', 
//       isParent: true,
//       component: resolve => { require(['@/views/monitor-information/dphost/view-hostDetail.vue'], resolve) },
//       hidden:true,
//     },  
//     {
//       path: '/monitor-information/resource/list',
//       name: '一览列表',
//       isParent: true,
//       iconCls: 'icon-item-manage',
//       component: resolve => { require(['@/views/monitor-information/dphost/view-hostlist.vue'], resolve) },
//     },    
//     {
//       path: '/monitor-information/resource/host',
//       name: '主机',
//       isParent: true,
//       iconCls: 'icon-item-manage',
//       component: resolve => { require(['@/views/monitor-information/dpresource/view-resource.vue'], resolve) },
//       redirect: '/monitor-information/resource/host',
//       children:[
//         {
//           path: '/monitor-information/resource/host',
//           name: '资源类页面-主机', 
//           component: resolve => { require(['@/views/monitor-information/dpresource/content/host.vue'], resolve) },
//           hidden: true,
//         }, 
//         {
//           path: '/monitor-information/hostList',
//           name: '主机模板类页面', 
//           component: resolve => { require(['@/components/dpcomponents/list/host-list.vue'], resolve) },
//           hidden: true,
//         },
//       ]
//     },
//     {
//       path: '/monitor-information/resource/db',
//       name: '数据库',
//       isParent: true,
//       iconCls: 'icon-item-manage',
//       component: resolve => { require(['@/components/test/test02.vue'], resolve) }
//     },
//   ]
// },
{
  path: '/monitor-manager', 
  name: '监控基础维护',
  component: body,
  iconCls: 'icon-item-manage',
  meta: {
    isLink: true
  },
  children: [
    {
      path: '/monitor-manager/resource',
      name: '资源管理',
      isParent: true,
      iconCls: 'icon-item-manage',
      component: childView,
      redirect: '/monitor-manager/resource/list',
      children:[
        {
          path: '/monitor-manager/resource/list',
          name: '资源类页面-列表', 
          component: resolve => { require(['@/views/monitor-manager/dpresource/list.vue'], resolve) },
          hidden: true,
        }, 
        {
          path: '/monitor-manager/resource/add-edit',
          name: '资源类页面-新增与维护', 
          component: resolve => { require(['@/views/monitor-manager/dpresource/add-edit.vue'], resolve) },
          hidden: true,
        }, 
        {
          path: '/monitor-manager/resource/config',
          name: '资源类-模板配置', 
          component: resolve => { require(['@/views/monitor-manager/dpresource/config.vue'], resolve) },
          hidden: true,
        }, 
      ]      
    },
    {
      path: '/monitor-manager/template',
      name: '模板管理',
      isParent: true,
      iconCls: 'icon-item-manage',
      component: childView,
      redirect: '/monitor-manager/template/list',
      children:[
        {
          path: '/monitor-manager/template/list',
          name: '模板管理-列表', 
          component: resolve => { require(['@/views/monitor-manager/dptemplate/list.vue'], resolve) },
          hidden: true,
        }, 
        {
          path: '/monitor-manager/template/template-detail',
          name: '模板管理-模板详情', 
          component: resolve => { require(['@/views/monitor-manager/dptemplate/template-detail.vue'], resolve) },
          hidden: true,
        },       
      ]
    },
    {
      path: '/monitor-manager/host',
      name: '主机管理',
      component: childView,
      iconCls: 'icon-item-manage',
      children:[
        {
          path: '/monitor-manager/host/list',
          name: '主机', 
          isParent: true,
          iconCls: 'icon-item-manage',
          component: resolve => { require(['@/views/monitor-manager/dphost/list.vue'], resolve) },
        },
        {
          path: '/monitor-manager/host/add-edit',
          name: '主机新增编辑', 
          component: resolve => { require(['@/views/monitor-manager/dphost/add-edit.vue'], resolve) },
          hidden:true,
        },          
        {
          path: '/monitor-manager/host/config',
          name: '主机配置', 
          component: resolve => { require(['@/views/monitor-manager/dphost/config.vue'], resolve) },
          hidden:true,
        },        
        {
          path: '/monitor-manager/hostgroup/list',
          name: '主机组', 
          isParent: true,
          iconCls: 'icon-item-manage',
          component: resolve => { require(['@/views/monitor-manager/dphostgroup/list.vue'], resolve) },
        },
        {
          path: '/monitor-manager/hostgroup/add-edit',
          name: '主机组新增编辑', 
          component: resolve => { require(['@/views/monitor-manager/dphostgroup/add-edit.vue'], resolve) },
          hidden:true,
        }

      ]
    },       
  ]
},
// {
//   path: '/monitor10', 
//   name: '业务应用',
//   component: body,
//   iconCls: 'icon-item-manage',
//   meta: {
//     isLink: true
//   },
//   children: [
//     {
//       path: '/monitor/host12',
//       name: '应用管理',
//       isParent: true,
//       iconCls: 'icon-item-manage',
//       //component: home,
//       component: resolve => { require(['@/components/test/test01.vue'], resolve) }
//     },
//     {
//       path: '/monitor/d11',
//       name: '巡检管理',
//       isParent: true,
//       iconCls: 'icon-item-manage',
//       //component: home,
//       component: resolve => { require(['@/components/test/test02.vue'], resolve) }
//     },
//     {
//       path: '/monitor/d18',
//       name: '专家智库',
//       isParent: true,
//       iconCls: 'icon-item-manage',
//       //component: home,
//       component: resolve => { require(['@/components/test/test02.vue'], resolve) }
//     },
//   ]
// },
// {
//   path: '/monitor3', 
//   name: '视图管理',
//   component: body,
//   iconCls: 'icon-item-manage',
//   meta: {
//     isLink: true
//   },
//   children: [
//     {
//       path: '/monitor/db31',
//       name: '应用系统图',
//       isParent: true,
//       iconCls: 'icon-item-manage',
//       //component: home,
//       component: resolve => { require(['@/components/test/test02.vue'], resolve) }
//     },    
//     {
//       path: '/monitor/db32',
//       name: '网络拓扑图',
//       isParent: true,
//       iconCls: 'icon-item-manage',
//       //component: home,
//       component: resolve => { require(['@/components/test/test02.vue'], resolve) }
//     },
//     {
//       path: '/monitor/host33',
//       name: '动态大屏图',
//       isParent: true,
//       iconCls: 'icon-item-manage',
//       //component: home,
//       component: resolve => { require(['@/components/test/test01.vue'], resolve) }
//     },
//     {
//       path: '/monitor/db351',
//       name: '定制化驾驶舱',
//       isParent: true,
//       iconCls: 'icon-item-manage',
//       //component: home,
//       component: resolve => { require(['@/components/test/test02.vue'], resolve) }
//     },
//     {
//       path: '/monitor/db352',
//       name: '3D机房',
//       isParent: true,
//       iconCls: 'icon-item-manage',
//       //component: home,
//       component: resolve => { require(['@/components/test/test02.vue'], resolve) }
//     },
//   ]
// },
// {
//   path: '/monitor4', 
//   name: '报表管理',
//   component: body,
//   iconCls: 'icon-item-manage',
//   meta: {
//     isLink: true
//   },
//   children: [
//     {
//       path: '/monitor/host4',
//       name: '动态报表',
//       isParent: true,
//       iconCls: 'icon-item-manage',
//       //component: home,
//       component: resolve => { require(['@/components/test/test01.vue'], resolve) }
//     },
//     {
//       path: '/monitor/db4',
//       name: '定制化报表',
//       isParent: true,
//       iconCls: 'icon-item-manage',
//       //component: home,
//       component: resolve => { require(['@/components/test/test02.vue'], resolve) }
//     },
//   ]
// },
// {
//   path: '/monitor2', 
//   name: '用户管理',
//   component: body,
//   iconCls: 'icon-item-manage',
//   meta: {
//     isLink: true
//   },
//   children: [
//     {
//       path: '/monitor/host2',
//       name: '主机',
//       isParent: true,
//       iconCls: 'icon-item-manage',
//       //component: home,
//       component: resolve => { require(['@/components/test/test01.vue'], resolve) }
//     },
//     {
//       path: '/monitor/db2',
//       name: '数据库',
//       isParent: true,
//       iconCls: 'icon-item-manage',
//       //component: home,
//       component: resolve => { require(['@/components/test/test02.vue'], resolve) }
//     },
//   ]
// },
// {
//   path: '/monitor5', 
//   name: '系统配置',
//   component: body,
//   iconCls: 'icon-item-manage',
//   meta: {
//     isLink: true
//   },
//   children: [
//     {
//       path: '/monitor/host5',
//       name: '主机',
//       isParent: true,
//       iconCls: 'icon-item-manage',
//       //component: home,
//       component: resolve => { require(['@/components/test/test01.vue'], resolve) }
//     },
//     {
//       path: '/monitor/db5',
//       name: '数据库',
//       isParent: true,
//       iconCls: 'icon-item-manage',
//       //component: home,
//       component: resolve => { require(['@/components/test/test02.vue'], resolve) }
//     },
//   ]
// },
  
];
export const ansycRoutes = [
];
