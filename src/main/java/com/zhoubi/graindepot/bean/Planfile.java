package com.zhoubi.graindepot.bean;
import java.io.Serializable;
import java.util.Date;
import java.text.SimpleDateFormat;
public class Planfile implements Serializable {
	private int planfileid;//计划主键
	private int groupid;//集团ID
	private int companyid;//企业ID
	private int graindepotid;//粮库ID
	private int planTypeID;//计划类型主键(1：轮换计划，2：轮出计划，3：轮入计划)
	private String planYear;//计划年度
	private String planNo;//计划文号
	private String dispatchunit;//下达单位
	private Date dispatchdate;//下达日期
	private Date planBeginDate;//计划开始日期
	private Date planEndDate;//计划结束日期
	private String fileNameList;//附加文件清单，分号隔开
	private short delFlag;//逻辑删除标志（1：删除）
	private String remark;//备注
	private int createuserid;//创建人
	private Date createtime;//创建时间
	private String planTypeIDStr;//计划类型
	private String dispatchdateStr;
	private String planBeginDateStr;
	private String planEndDateStr;
	private String companyname;//企业名称
	private String graindepotname;//库点名称
	private String createusername;//创建人姓名

	public String getCompanyname() {
		return companyname;
	}

	public void setCompanyname(String companyname) {
		this.companyname = companyname;
	}

	public String getGraindepotname() {
		return graindepotname;
	}

	public void setGraindepotname(String graindepotname) {
		this.graindepotname = graindepotname;
	}

	public String getCreateusername() {
		return createusername;
	}

	public void setCreateusername(String createusername) {
		this.createusername = createusername;
	}

	public void setPlanBeginDateStr(String planBeginDateStr) {
		this.planBeginDateStr = planBeginDateStr;
	}

	public void setPlanEndDateStr(String planEndDateStr) {
		this.planEndDateStr = planEndDateStr;
	}

	public void setDispatchdateStr(String dispatchdateStr) {
		this.dispatchdateStr = dispatchdateStr;
	}

	public String getPlanTypeIDStr() {
		if (planTypeID==1) {
			return "轮换计划";
		}
		if (planTypeID==2) {
			return "轮出计划";
		}
		if (planTypeID==3) {
			return "轮入计划";
		}
		return planTypeIDStr;
	}

	public void setPlanTypeIDStr(String plantTypeIDStr) {
		this.planTypeIDStr = plantTypeIDStr;
	}

	public int getPlanfileid(){
		return planfileid;
	}
	public void setPlanfileid(int planfileid){
		this.planfileid=planfileid;
	}
	public int getGroupid(){
		return groupid;
	}
	public void setGroupid(int groupid){
		this.groupid=groupid;
	}
	public int getCompanyid(){
		return companyid;
	}
	public void setCompanyid(int companyid){
		this.companyid=companyid;
	}
	public int getGraindepotid(){
		return graindepotid;
	}
	public void setGraindepotid(int graindepotid){
		this.graindepotid=graindepotid;
	}
	public int getPlanTypeID(){
		return planTypeID;
	}
	public void setPlanTypeID(int planTypeID){
		this.planTypeID=planTypeID;
	}
	public String getPlanYear(){
		return planYear;
	}
	public void setPlanYear(String planYear){
		this.planYear=planYear;
	}
	public String getPlanNo(){
		return planNo;
	}
	public void setPlanNo(String planNo){
		this.planNo=planNo;
	}
	public String getDispatchunit(){
		return dispatchunit;
	}
	public void setDispatchunit(String dispatchunit){
		this.dispatchunit=dispatchunit;
	}
	public String getDispatchdateStr(){
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
		return dispatchdate == null ? dispatchdateStr : simpleDateFormat.format(dispatchdate);
	}
	public Date getDispatchdate(){
		return dispatchdate;
	}
	public void setDispatchdate(Date dispatchdate){
		this.dispatchdate=dispatchdate;
	}
	public String getPlanBeginDateStr(){
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
		return planBeginDate == null ? planBeginDateStr : simpleDateFormat.format(planBeginDate);
	}
	public Date getPlanBeginDate(){
		return planBeginDate;
	}
	public void setPlanBeginDate(Date planBeginDate){
		this.planBeginDate=planBeginDate;
	}
	public String getPlanEndDateStr(){
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
		return planEndDate == null ? planEndDateStr : simpleDateFormat.format(planEndDate);
	}
	public Date getPlanEndDate(){
		return planEndDate;
	}
	public void setPlanEndDate(Date planEndDate){
		this.planEndDate=planEndDate;
	}
	public String getFileNameList(){
		return fileNameList;
	}
	public void setFileNameList(String fileNameList){
		this.fileNameList=fileNameList;
	}
	public short getDelFlag(){
		return delFlag;
	}
	public void setDelFlag(short delFlag){
		this.delFlag=delFlag;
	}
	public String getRemark(){
		return remark;
	}
	public void setRemark(String remark){
		this.remark=remark;
	}
	public int getCreateuserid(){
		return createuserid;
	}
	public void setCreateuserid(int createuserid){
		this.createuserid=createuserid;
	}
	public String getCreatetimeStr(){
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		return createtime == null ? "" : simpleDateFormat.format(createtime);
	}
	public Date getCreatetime(){
		return createtime;
	}
	public void setCreatetime(Date createtime){
		this.createtime=createtime;
	}
}
