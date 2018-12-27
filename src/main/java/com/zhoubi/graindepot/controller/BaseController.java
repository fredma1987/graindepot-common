package com.zhoubi.graindepot.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.TypeReference;
import com.zhoubi.graindepot.bean.UserBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.Base64Utils;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;


/**
 * Created by Administrator on 2018-12-23.
 */
public class BaseController {
    @Autowired
    private HttpServletRequest request;

    public String getCurrentUserName() {
        String authorization = request.getHeader("Authorization");
        return new String(Base64Utils.decodeFromString(authorization));
    }

    public UserBean getCurrentUser() {
        String user = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest()
                .getHeader("X-AUTH-ID");
        if(user!=null) {
            String usernew = new String(Base64Utils.decodeFromString(user));
            UserBean userModel = new UserBean();
            userModel = JSON.parseObject(usernew, new TypeReference<UserBean>() {
            });
            return userModel;
        }else{
            return null;
        }
    }
}
