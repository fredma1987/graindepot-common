package com.zhoubi.graindepot.bean;

import java.io.Serializable;

/**
 * 用户的地址信息,用于和出入库相关等必须针对某个粮库进行操作时使用
 */
public class UserAddress implements Serializable {
    private Integer provinceid;
    private Integer cityid;
    private Integer countyid;
    private Integer companyid;
    private Integer graindepotid;
    private Integer groupid;


    public Integer getProvinceid() {
        return provinceid;
    }

    public void setProvinceid(Integer provinceid) {
        this.provinceid = provinceid;
    }

    public Integer getCityid() {
        return cityid;
    }

    public void setCityid(Integer cityid) {
        this.cityid = cityid;
    }

    public Integer getCountyid() {
        return countyid;
    }

    public void setCountyid(Integer countyid) {
        this.countyid = countyid;
    }

    public Integer getCompanyid() {
        return companyid;
    }

    public void setCompanyid(Integer companyid) {
        this.companyid = companyid;
    }

    public Integer getGraindepotid() {
        return graindepotid;
    }

    public void setGraindepotid(Integer graindepotid) {
        this.graindepotid = graindepotid;
    }

    public Integer getGroupid() {
        return groupid;
    }

    public void setGroupid(Integer groupid) {
        this.groupid = groupid;
    }
}
