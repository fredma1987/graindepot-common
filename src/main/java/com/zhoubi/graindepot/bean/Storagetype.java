package com.zhoubi.graindepot.bean;import java.io.Serializable;import java.util.Date;import java.text.SimpleDateFormat;public class Storagetype implements Serializable {	private Integer storageTypeID;//仓房类型ID	private String storageTypeName;//仓房类型名称	private Integer orderno;//排序号	public Integer getStorageTypeID(){		return storageTypeID;	}	public void setStorageTypeID(Integer storageTypeID){		this.storageTypeID=storageTypeID;	}	public String getStorageTypeName(){		return storageTypeName;	}	public void setStorageTypeName(String storageTypeName){		this.storageTypeName=storageTypeName;	}	public Integer getOrderno(){		return orderno;	}	public void setOrderno(Integer orderno){		this.orderno=orderno;	}}