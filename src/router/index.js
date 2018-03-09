import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import login from '@/components/login'
import notFound from '@/components/404.vue'
const home = () =>
  import ('@/components/article/home');

const commodity = () =>
  import ('@/components/commodity/index')
const linkCommodity = () =>
  import ('@/components/commodity/linkCommodity')
const linkCommodityAdd = () =>
  import ('@/components/commodity/linkCommodityAdd')
const commodityDetail = () =>
  import ('@/components/commodity/commodityChild/commodityDetail')
const commodityBinding = () =>
  import ('@/components/commodity/commodityChild/commodityBinding')

const template = () =>
  import ('@/components/template/index')
const linkTemplate = () =>
  import ('@/components/template/linkTemplate')

const templateDetailList = () =>
  import ('@/components/template/templateDetailList')
const templateAdd = () =>
  import ('@/components/template/templateAdd')
const templateAmend = () =>
  import ('@/components/template/templateAmend.vue')



const activities = () =>
  import ('@/components/activities/index')
const linkActivities = () =>
  import ('@/components/activities/linkActivities')
const activeDetail = () =>
  import ('@/components/activities/activeChild/activeDetail')
const activeAdd = () =>
  import ('@/components/activities/activeChild/activeAdd')


const realtimelog = () =>
  import ('@/components/realtimelog/index')
const linklogs = () =>
  import ('@/components/realtimelog/linklogs')


const linkDevice = () =>
  import ('@/components/device/linkDevice')
const linkDeviceTag = () =>
  import ('@/components/device/linkDeviceTag')
const tagDetail = () =>
  import ('@/components/device/DeviceChild/tagDetail')
const BSDetail = () =>
  import ('@/components/device/DeviceChild/BSDetail')
const back = () =>
  import ('@/components/device/DeviceChild/back')
const linkDeviceBS = () =>
  import ('@/components/device/linkDeviceBS')
const linkDeviceHandheld = () =>
  import ('@/components/device/linkDeviceHandheld')


const linkSystem = () =>
  import ('@/components/systemConfig/linkSystem')
const linkAuthority = () =>
  import ('@/components/systemConfig/linkAuthority')
const authorityEdit = () =>
  import ('@/components/systemConfig/systemChild/authorityEdit')
const authorityManagement = () =>
  import ('@/components/systemConfig/systemChild/authorityManagement')

const linkNotice = () =>
  import ('@/components/systemConfig/linkNotice')
const linkProperty = () =>
  import ('@/components/systemConfig/linkProperty')

const linkSynchronize = () =>
  import ('@/components/systemConfig/linkSynchronize')
const Microsoft = () =>
  import ('@/components/systemConfig/synchronizeChild/Microsoft')
const SQL = () =>
  import ('@/components/systemConfig/synchronizeChild/SQL')

const linkBSConfiguration = () =>
  import ('@/components/systemConfig/linkBSConfiguration')
const linkTest = () =>
  import ('@/components/systemConfig/linkTest')



Vue.use(Router)

export default new Router({
  routes: [

    { path: '/login', name: 'login', hidden: true, component: login, meta: { auth: false } },
    { path: '/404', component: notFound, name: '404', hidden: true },
    { path: '*', hidden: true, redirect: { path: '/404' } },
    {
      path: '/',
      name: 'index',
      component: index,
      redirect: '/home',
      children: [{
          path: '/home',
          name: 'home',
          component: home,
          // redirect:'home',
        },
        {
          path: '/commodity',
          name: '商品管理',
          component: commodity,
          redirect: "/commodity/linkCommodity",
          children: [{
              path: 'linkCommodity',
              name: 'linkCommodity',
              component: linkCommodity,
            },
            {
              path: 'linkCommodityAdd',
              name: 'linkCommodityAdd',
              component: linkCommodityAdd,
            },
            {
              path: 'commodityDetail',
              name: 'commodityDetail',
              component: commodityDetail,
            },
            {
              path: 'commodityBinding',
              name: 'commodityBinding',
              component: commodityBinding,
            },
          ]
        },
        {
          path: '/template',
          name: '模板配置',
          component: template,
          redirect: "/template/linkTemplate",
          children: [{
              path: 'linkTemplate',
              name: 'linkTemplate',
              component: linkTemplate,
            },
            {
              path: 'templateAdd',
              name: 'templateAdd',
              component: templateAdd,
            },
            {
              path: 'templateAmend',
              name: 'templateAmend',
              component: templateAmend,
              meta:{keepAlive:true},
            }
          ]
        },
        {
          path: '/activities',
          name: 'activities',
          component: activities,
          redirect: "/activities/linkActivities",
          children: [{
              path: 'linkActivities',
              name: 'linkActivities',
              component: linkActivities
            },
            {
              path: 'activeDetail ',
              name: 'activeDetail',
              component: activeDetail
            },
            {
              path: 'activeAdd',
              name: 'activeAdd',
              component: activeAdd
            },
          ]
        },
        {
          path: '/realtimelog',
          name: 'realtimelog',
          component: realtimelog,
          redirect: "/realtimelog/linklogs",
          children: [{
            path: 'linklogs',
            name: 'linklogs',
            component: linklogs
          }]
        },
        {
          path: '/linkDevice',
          name: 'linkDevice',
          component: linkDevice,
          redirect: "/linkDevice/linkDeviceTag",
          children: [{
              path: 'linkDeviceTag',
              name: 'linkDeviceTag',
              component: linkDeviceTag
            },
            {
              path: 'tagDetail',
              name: 'tagDetail',
              component: tagDetail
            },
            {
              path: 'linkDeviceBS',
              name: 'linkDeviceBS',
              component: linkDeviceBS
            },
            {
              path: 'BSDetail',
              name: 'BSDetail',
              component: BSDetail
            },
            {
              path: 'linkDeviceHandheld',
              name: 'linkDeviceHandheld',
              component: linkDeviceHandheld
            },
          ]

        },
        {
          path: '/linkSystem',
          name: 'linkSystem',
          component: linkSystem,
          redirect: "/linkSystem/linkProperty",
          children: [{
              path: 'linkProperty',
              name: 'linkProperty',
              component: linkProperty,
            },
            {
              path: 'linkAuthority',
              name: 'linkAuthority',
              component: linkAuthority
            },
            {
              path: 'authorityEdit',
              name: 'authorityEdit',
              component: authorityEdit
            },
            {
              path: 'linkBSConfiguration',
              name: 'linkBSConfiguration',
              component: linkBSConfiguration
            },
            {
              path: 'authorityManagement',
              name: 'authorityManagement',
              component: authorityManagement,

            },
            {
              path: 'linkNotice',
              name: 'linkNotice',
              component: linkNotice
            },
           
            {
              path: 'linkSynchronize',
              name: 'linkSynchronize',
              component: linkSynchronize,
              redirect: "/linkSystem/linkSynchronize/SQL",
              children: [{
                  path: 'Microsoft',
                  name: 'Microsoft',
                  component: Microsoft
                },
                {
                  path: 'SQL',
                  name: 'SQL',
                  component: SQL
                },
              ]
            },
            {
              path: 'linkTest',
              name: 'linkTest',
              component: linkTest
            },
          ]
        }

      ]
    },


  ]
})
