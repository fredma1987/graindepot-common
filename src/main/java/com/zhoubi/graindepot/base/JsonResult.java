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


    public JsonResult() {
    }


    public JsonResult(Object data, String message, boolean success) {
        this.data = data;
        this.message = message;
        this.success = success;
    }

    public JsonResult(String message, boolean success) {
        this.message = message;
        this.success = success;
    }

    public JsonResult(Object data) {
        this.data = data;
    }

}
