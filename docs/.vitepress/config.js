/*
 * @Descripttion: 
 * @version: 
 * @Author: 十三
 * @Date: 2022-11-21 12:56:22
 * @LastEditors: 十三
 * @LastEditTime: 2022-11-21 23:11:33
 */
export default {
  title: 'cz-文档',
  themeConfig: {
    logo: "/logo-cz.png",
    nav: customerNav(),
    socialLinks: [{ icon: "github", link: "https://gitee.com/cyq13/cz-utils" }],
    sidebar: {
      "/guild/": sidebarGuild(),
      "/examples/notice": sidebarExamplesNotice(),
      "/examples/vue": sidebarExamplesVue(),
      "/examples/utils": sidebarExamplesUtils()
    },
  },
};

function sidebarExamplesUtils(){
  return [
    {
      text: 'co-utils工具库',
      items: [
        { text: 'co-utils工具库', link: '/examples/utils/co-utils工具库' },
      ]
    },
  ]
}
function sidebarExamplesVue(){
  return [
    {
      text: 'vue2',
      items: [
        { text: 'vue2 基础', link: '/examples/vue/vue3' },
      ]
    },
    {
      text: 'vue3',
      items: [
        { text: 'vue3基础', link: '/examples/vue/vue3' },
      ]
    },
  ]
}
function sidebarExamplesNotice(){
  return [
    {
      text: 'vue',
      items: [
        { text: '常见面试', link: '/examples/notice/vue面试题' },
      ]
    },
    {
      text: '算法',
      items: [
        { text: '编程题', link: '/examples/notice/JavaScript编程题' },
      ]
    },
    {
      text: '数据结构',
      items: [
        { text: '数据结构', link: '/examples/notice/数据结构' },
      ]
    },
  ]
}
function sidebarGuild(){
  return [
    {
      text: "基础",
      items: [
        {
          text: "安装",
          link: "/guild/installation",
        },
        {
          text: "快速开始",
          link: "/guild/quickstart",
        },
      ],
    },
  ]
}

function customerNav() {
  return [
    {
      text: '指南',
      link: '/'
    },
    {
      text: '前端',
      items: [
        { text: 'co-utils工具库', link: '/examples/utils/co-utils工具库' },
        { text: 'cz-coco组件库', link: 'https://c1320.github.io/cz-coco/' },
        
      ]
    },
    {
      text: '后端',
      items: [
        { text: 'Python', link: '/examples/python/python', activeMatch: '/examples/python/' },
      ]
    },
    {
      text: '面试题',
      items: [
        { text: 'vue3', link: '/examples/notice/vue面试题', activeMatch: '/examples/notice/' },
      ]
    },
    {
      text: 'Gitee',
      link: 'https://gitee.com/cyq13/cz-utils'
    },
  ]
}
