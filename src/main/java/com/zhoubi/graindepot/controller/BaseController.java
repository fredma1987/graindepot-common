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

    /**
     * 根据对象初始化map键值
     * @param object
     * @return
     * @throws Exception
     */
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

    /**
     * //将origin属性注入到destination中
     * @param origin
     * @param destination
     * @param <T>
     */
    /*public <T> void mergeObject(T origin, T destination) {
        if (origin == null || destination == null)
            return;
        if (!origin.getClass().equals(destination.getClass()))
            return;

        Field[] fields = origin.getClass().getDeclaredFields();
        for (int i = 0; i < fields.length; i++) {
            try {
                fields[i].setAccessible(true);
                Object value = fields[i].get(origin);
                if (null != value) {
                    fields[i].set(destination, value);
                }
                if(value!=null){
                    fields[i].set(destination, null);
                }
                fields[i].setAccessible(false);
            } catch (Exception e) {
            }
        }
    }*/
}
