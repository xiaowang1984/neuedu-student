import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Index from '@/components/Index'
import LogIndex from '@/components/Log/LogIndex'
import LogAdd from '@/components/Log/LogAdd'
import Me from '@/components/Me/MeDetails'
import Password from '@/components/Me/Password'
import Image from '@/components/Me/Image'
import Task from '@/components/task/Task'
import InterView from '@/components/interview/InterviewList'
import Exam from  '@/components/exam/ExamIndex'
import InterExam from '@/components/exam/InterView'
import CompiterExam from '@/components/exam/ComputerExam'
import Statistics from '@/components/statistics/Statistics'
import ReadOffer from '@/components/interview/ReadOffer'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/index',
      name: 'Index',
      component: Index,
      children: [  //这里就是二级路由的配置
        {
          path: '/log',
          name:'LogIndex',
          component:LogIndex
        },
        {
          path: '/logadd',
          name:'LogAdd',
          component:LogAdd
        },
        {
          path:'/me',
          name:'MeDetails',
          component:Me
        },
        {
          path:'/password',
          name:'Password',
          component:Password
        },
        {
          path:'/image',
          name:'imagevue',
          component:Image
        },
        {
          path:'/task',
          name:'task',
          component:Task
        },
        {
          path:'/interview',
          name:'interview',
          component:InterView
        },
        {
          path:'/exam',
          name:'exam',
          component:Exam
        },
        {
          path:'/interexam',
          name:'iterviewexam',
          component:InterExam
        },
        {
          path:'/computerExam',
          name:'computerExam',
          component:CompiterExam
        },
        {
          path:'/statistics',
          name:'statistics',
          component:Statistics
        },
        {
          path:'/readoffer',
          name:'readoffer',
          component:ReadOffer
        }
      ]
    }
  ]
})
