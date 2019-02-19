package com.zhoubi.graindepot.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.TypeReference;
import com.zhoubi.graindepot.bean.BaseUser;
import com.zhoubi.graindepot.bean.UserAddress;
import com.zhoubi.graindepot.bean.UserBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.Base64Utils;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.Map;


/**
 * Created by Administrator on 2018-12-23.
 */
public class BaseController {


    public BaseUser getCurrentUser() {
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
        HttpSession session = request.getSession();
        BaseUser currentUser = (BaseUser) session.getAttribute("currentUser");
        return currentUser;
    }

    public UserAddress getUserAddress() {
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
        HttpSession session = request.getSession();
        UserAddress userAddress = (UserAddress) session.getAttribute("userAddress");
        return userAddress;
    }
    public Map initMap(Object object) throws Exception{
        Map map = new HashMap();
        Field[] fields = object.getClass().getDeclaredFields();
        for(int i=0;i<fields.length;i++){
            String fieldname=fields[i].getName();
            Method m = object.getClass().getMethod("get" + getMethodName(fieldname));
            map.put(fieldname,m.invoke(object));
        }
        return map;
    }
    public static String getMethodName(String fildeName) throws Exception {
        byte[] items = fildeName.getBytes();
        items[0] = (byte) ((char) items[0] - 'a' + 'A');
        return new String(items);
    }
}
