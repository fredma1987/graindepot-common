package com.zhoubi.graindepot.bean;

import java.util.Date;

/**
 * Created by Administrator on 2019/3/12/012.
 */
public class UreportFileEntity {
    private Integer ureportid;
    private String ureportname;
    private byte[] content;
    private Date createtime;
    private Date updatetime;

    public Integer getUreportid() {
        return ureportid;
    }

    public void setUreportid(Integer ureportid) {
        this.ureportid = ureportid;
    }

    public String getUreportname() {
        return ureportname;
    }

    public void setUreportname(String ureportname) {
        this.ureportname = ureportname;
    }

    public byte[] getContent() {
        return content;
    }

    public void setContent(byte[] content) {
        this.content = content;
    }

    public Date getCreatetime() {
        return createtime;
    }

    public void setCreatetime(Date createtime) {
        this.createtime = createtime;
    }

    public Date getUpdatetime() {
        return updatetime;
    }

    public void setUpdatetime(Date updatetime) {
        this.updatetime = updatetime;
    }
}
