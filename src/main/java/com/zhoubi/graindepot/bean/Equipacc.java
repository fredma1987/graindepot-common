package com.zhoubi.graindepot.bean;import java.io.Serializable;import java.util.Date;import java.text.SimpleDateFormat;public class Equipacc implements Serializable {	private Integer equipaccid;//机械设备事故主键	private Date occurtime;//发生时间	private String position;//部位	private String cause;//原因	private String responsibility;//责任者	private String dealresult;//结论意见	private Integer groupid;//集团	private Integer companyid;//企业	private Integer graindepotid;//粮库	private Date createtime;//创建时间	private Integer createuserid;//创建人	public Integer getEquipaccid(){		return equipaccid;	}	public void setEquipaccid(Integer equipaccid){		this.equipaccid=equipaccid;	}private String occurtimestr;	public void setOccurtimestr(String occurtimestr){		this.occurtimestr=occurtimestr;	}	public String getOccurtimestr(){		SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");		 return occurtime == null ? occurtimestr : simpleDateFormat.format(occurtime); 	}	public Date getOccurtime(){		return occurtime;	}	public void setOccurtime(Date occurtime){		this.occurtime=occurtime;	}	public String getPosition(){		return position;	}	public void setPosition(String position){		this.position=position;	}	public String getCause(){		return cause;	}	public void setCause(String cause){		this.cause=cause;	}	public String getResponsibility(){		return responsibility;	}	public void setResponsibility(String responsibility){		this.responsibility=responsibility;	}	public String getDealresult(){		return dealresult;	}	public void setDealresult(String dealresult){		this.dealresult=dealresult;	}	public Integer getGroupid(){		return groupid;	}	public void setGroupid(Integer groupid){		this.groupid=groupid;	}	public Integer getCompanyid(){		return companyid;	}	public void setCompanyid(Integer companyid){		this.companyid=companyid;	}	public Integer getGraindepotid(){		return graindepotid;	}	public void setGraindepotid(Integer graindepotid){		this.graindepotid=graindepotid;	}private String createtimestr;	public void setCreatetimestr(String createtimestr){		this.createtimestr=createtimestr;	}	public String getCreatetimestr(){		SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");		 return createtime == null ? createtimestr : simpleDateFormat.format(createtime); 	}	public Date getCreatetime(){		return createtime;	}	public void setCreatetime(Date createtime){		this.createtime=createtime;	}	public Integer getCreateuserid(){		return createuserid;	}	public void setCreateuserid(Integer createuserid){		this.createuserid=createuserid;	}}