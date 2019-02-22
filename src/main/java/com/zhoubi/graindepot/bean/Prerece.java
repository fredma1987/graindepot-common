package com.zhoubi.graindepot.bean;import java.io.Serializable;import java.util.Date;import java.text.SimpleDateFormat;public class Prerece implements Serializable {	private Integer keyid;//主键	private Integer groupid;//集团	private String groupname;	private Integer companyid;//企业	private String companyname;	private Integer graindepotid;//粮库	private String graindepotname;	private Integer storageid;//仓房	private String storagename;	private Integer contractid;//合同	private String contractname;	private Integer traderid;//往来单位	private String tradername;	private String billcode;//单据号	private String origin;//收款原由	private Date billdate;//单据日期	private Short billstate;//单据状态（0：编辑，1：已审核，-1：已作废）	private Integer grainid;//粮食品种	private String grainname;	private Integer grainattrid;//粮食性质	private String grainattrname;	private Short producingyear;//收获年度	private Double quantity;//数量	private Double price;//单价	private Double manpowercose;//人力费（元/吨）	private Double amount;//收款金额=quantity*(price+manpowercose)	private Integer settleid;//结算方式	private String settlename;	private String checkno;//支票号	private Integer accid;//收款账户	private String accname;	private String remark;//备注	private Integer createuserid;//创建人	private Date createtime;//创建时间	private Integer spuserid;//审批人	private Date sptime;//审批时间	private Date updatetime;//更新时间	public Integer getKeyid(){		return keyid;	}	public void setKeyid(Integer keyid){		this.keyid=keyid;	}	public Integer getGroupid(){		return groupid;	}	public void setGroupid(Integer groupid){		this.groupid=groupid;	}	public Integer getCompanyid(){		return companyid;	}	public void setCompanyid(Integer companyid){		this.companyid=companyid;	}	public Integer getGraindepotid(){		return graindepotid;	}	public void setGraindepotid(Integer graindepotid){		this.graindepotid=graindepotid;	}	public Integer getStorageid(){		return storageid;	}	public void setStorageid(Integer storageid){		this.storageid=storageid;	}	public Integer getContractid(){		return contractid;	}	public void setContractid(Integer contractid){		this.contractid=contractid;	}	public Integer getTraderid(){		return traderid;	}	public void setTraderid(Integer traderid){		this.traderid=traderid;	}	public String getBillcode(){		return billcode;	}	public void setBillcode(String billcode){		this.billcode=billcode;	}	public String getOrigin(){		return origin;	}	public void setOrigin(String origin){		this.origin=origin;	}	private String billdatestr;	public void setBilldatestr(String billdatestr){		this.billdatestr=billdatestr;	}	public String getBilldatestr(){		SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");		return billdate == null ? billdatestr : simpleDateFormat.format(billdate);	}	public Date getBilldate(){		return billdate;	}	public void setBilldate(Date billdate){		this.billdate=billdate;	}	public Short getBillstate(){		return billstate;	}	public void setBillstate(Short billstate){		this.billstate=billstate;	}	public Integer getGrainid(){		return grainid;	}	public void setGrainid(Integer grainid){		this.grainid=grainid;	}	public Integer getGrainattrid(){		return grainattrid;	}	public void setGrainattrid(Integer grainattrid){		this.grainattrid=grainattrid;	}	public Short getProducingyear(){		return producingyear;	}	public void setProducingyear(Short producingyear){		this.producingyear=producingyear;	}	public Double getQuantity(){		return quantity;	}	public void setQuantity(Double quantity){		this.quantity=quantity;	}	public Double getPrice(){		return price;	}	public void setPrice(Double price){		this.price=price;	}	public Double getManpowercose(){		return manpowercose;	}	public void setManpowercose(Double manpowercose){		this.manpowercose=manpowercose;	}	public Double getAmount(){		return amount;	}	public void setAmount(Double amount){		this.amount=amount;	}	public Integer getSettleid(){		return settleid;	}	public void setSettleid(Integer settleid){		this.settleid=settleid;	}	public String getCheckno(){		return checkno;	}	public void setCheckno(String checkno){		this.checkno=checkno;	}	public Integer getAccid(){		return accid;	}	public void setAccid(Integer accid){		this.accid=accid;	}	public String getRemark(){		return remark;	}	public void setRemark(String remark){		this.remark=remark;	}	public Integer getCreateuserid(){		return createuserid;	}	public void setCreateuserid(Integer createuserid){		this.createuserid=createuserid;	}	private String createtimestr;	public void setCreatetimestr(String createtimestr){		this.createtimestr=createtimestr;	}	public String getCreatetimestr(){		SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");		return createtime == null ? createtimestr : simpleDateFormat.format(createtime);	}	public Date getCreatetime(){		return createtime;	}	public void setCreatetime(Date createtime){		this.createtime=createtime;	}	public Integer getSpuserid(){		return spuserid;	}	public void setSpuserid(Integer spuserid){		this.spuserid=spuserid;	}	private String sptimestr;	public void setSptimestr(String sptimestr){		this.sptimestr=sptimestr;	}	public String getSptimestr(){		SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");		return sptime == null ? sptimestr : simpleDateFormat.format(sptime);	}	public Date getSptime(){		return sptime;	}	public void setSptime(Date sptime){		this.sptime=sptime;	}	private String updatetimestr;	public void setUpdatetimestr(String updatetimestr){		this.updatetimestr=updatetimestr;	}	public String getUpdatetimestr(){		SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");		return updatetime == null ? updatetimestr : simpleDateFormat.format(updatetime);	}	public Date getUpdatetime(){		return updatetime;	}	public void setUpdatetime(Date updatetime){		this.updatetime=updatetime;	}	public String getGroupname() {		return groupname;	}	public void setGroupname(String groupname) {		this.groupname = groupname;	}	public String getCompanyname() {		return companyname;	}	public void setCompanyname(String companyname) {		this.companyname = companyname;	}	public String getGraindepotname() {		return graindepotname;	}	public void setGraindepotname(String graindepotname) {		this.graindepotname = graindepotname;	}	public String getStoragename() {		return storagename;	}	public void setStoragename(String storagename) {		this.storagename = storagename;	}	public String getContractname() {		return contractname;	}	public void setContractname(String contractname) {		this.contractname = contractname;	}	public String getTradername() {		return tradername;	}	public void setTradername(String tradername) {		this.tradername = tradername;	}	public String getGrainname() {		return grainname;	}	public void setGrainname(String grainname) {		this.grainname = grainname;	}	public String getGrainattrname() {		return grainattrname;	}	public void setGrainattrname(String grainattrname) {		this.grainattrname = grainattrname;	}	public String getSettlename() {		return settlename;	}	public void setSettlename(String settlename) {		this.settlename = settlename;	}	public String getAccname() {		return accname;	}	public void setAccname(String accname) {		this.accname = accname;	}}