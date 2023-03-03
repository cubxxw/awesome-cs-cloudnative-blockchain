/*
 * @Description: 
 * @Author: xiongxinwei 3293172751nss@gmail.com
 * @Date: 2022-10-05 10:37:08
 * @LastEditTime: 2022-10-05 10:37:53
 * @FilePath: \.vuepress\enhanceApp.js
 * @Github_Address: https://github.com/3293172751/cs-awesome-Block_Chain
 * Copyright (c) 2022 by xiongxinwei 3293172751nss@gmail.com, All Rights Reserved. @blog: http://nsddd.top
 */
export default ({ router }) => {
    // 路由切换事件处理
    router.beforeEach((to, from, next) => {
      // console.log("切换路由", to.fullPath, from.fullPath);
      //触发百度的pv统计
      if (typeof _hmt != "undefined") {
        if (to.path) {
          _hmt.push(["_trackPageview", to.fullPath]);
          // console.log("上报百度统计", to.fullPath);
        }
      }
      next();
    });
  };
  