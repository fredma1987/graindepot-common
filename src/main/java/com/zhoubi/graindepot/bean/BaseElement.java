package com.zhoubi.graindepot.bean;import java.io.Serializable;import java.util.Date;import java.text.SimpleDateFormat;public class BaseElement implements Serializable {	private Integer elementid;//主键	private String code;//编码	private String name;//名称	private String type;//类型（button、uri等）	private String uri;//请求地址	private Integer menuid;//菜单主键	private Integer parenid;//父级ID	private String method;//请求方法（GET、POST）	private String description;//描述	public Integer getElementid(){		return elementid;	}	public void setElementid(Integer elementid){		this.elementid=elementid;	}	public String getCode(){		return code;	}	public void setCode(String code){		this.code=code;	}	public String getName(){		return name;	}	public void setName(String name){		this.name=name;	}	public String getType(){		return type;	}	public void setType(String type){		this.type=type;	}	public String getUri(){		return uri;	}	public void setUri(String uri){		this.uri=uri;	}	public Integer getMenuid(){		return menuid;	}	public void setMenuid(Integer menuid){		this.menuid=menuid;	}	public Integer getParenid(){		return parenid;	}	public void setParenid(Integer parenid){		this.parenid=parenid;	}	public String getMethod(){		return method;	}	public void setMethod(String method){		this.method=method;	}	public String getDescription(){		return description;	}	public void setDescription(String description){		this.description=description;	}}