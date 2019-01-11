package com.zhoubi.graindepot.base;


import java.io.Serializable;


public class JsonResult implements Serializable {
    private static final long serialVersionUID = -4699713095477151086L;

    /**
     * 数据
     */
    private Object data;
    /**
     * 信息
     */
    private String message;
    /**
     * 是否成功
     */
    private boolean success;

    public String getMessage() {
        return message;
    }

    public boolean isSuccess() {
        return success;
    }


    private int total;
    private int pageIndex = 1;
    private int pageSize = 10;

    public int getTotal() {
        return total;
    }

    public int getPageIndex() {
        return pageIndex;
    }

    public int getPageSize() {
        return pageSize;
    }

    public JsonResult() {
    }


    public JsonResult(Object data, int total, String message, boolean success) {
        this.data = data;
        this.total = total;
        this.message = message;
        this.success = success;
    }

    public JsonResult(Object data, int total) {
        this(data, total, "", true);
    }

    public JsonResult(Object data, String message, boolean success) {
        this(data, 0, message, success);
    }

    public JsonResult(String message, boolean success) {
        this(null, 0, message, success);
    }

    public JsonResult(Object data) {
        this(data, 0, "", true);
    }

}
