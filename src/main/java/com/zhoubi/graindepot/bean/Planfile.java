package com.zhoubi.graindepot.bean;
import java.io.Serializable;
import java.util.Date;
import java.text.SimpleDateFormat;
public class Planfile implements Serializable {
	private Integer planfileid;//计划主键
	private Integer groupid;//集团ID
	private Integer companyid;//企业ID
	private Integer graindepotid;//粮库ID
	private Integer plantypeid;//计划类型主键(1：轮换计划，2：轮出计划，3：轮入计划)
	private Integer planyear;//计划年度
	private String planno;//计划文号
	private String dispatchunit;//下达单位
	private Date dispatchdate;//下达日期
	private Date planbegindate;//计划开始日期
	private Date planenddate;//计划结束日期
	private String filenamelist;//附加文件清单，分号隔开
	private Short delflag;//逻辑删除标志（1：删除）
	private String remark;//备注
	private Integer createuserid;//创建人
	private Date createtime;//创建时间

	private String plantypeidstr;//计划类型
	private String companyname;//企业名称
	private String graindepotname;//库点名称
	private String createusername;//创建人姓名

	public String getPlantypeidstr() {
		if (plantypeid==1) {
			return "轮换计划";
		}
		if (plantypeid==2) {
			return "轮出计划";
		}
		if (plantypeid==3) {
			return "轮入计划";
		}
		return plantypeidstr;
	}

	public void setPlantypeidstr(String planttypeidstr) {
		this.plantypeidstr = planttypeidstr;
	}

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

	public Integer getPlanfileid(){
		return planfileid;
	}
	public void setPlanfileid(Integer planfileid){
		this.planfileid=planfileid;
	}
	public Integer getGroupid(){
		return groupid;
	}
	public void setGroupid(Integer groupid){
		this.groupid=groupid;
	}
	public Integer getCompanyid(){
		return companyid;
	}
	public void setCompanyid(Integer companyid){
		this.companyid=companyid;
	}
	public Integer getGraindepotid(){
		return graindepotid;
	}
	public void setGraindepotid(Integer graindepotid){
		this.graindepotid=graindepotid;
	}
	public Integer getPlantypeid(){
		return plantypeid;
	}
	public void setPlantypeid(Integer plantypeid){
		this.plantypeid=plantypeid;
	}
	public Integer getPlanyear(){
		return planyear;
	}
	public void setPlanyear(Integer planyear){
		this.planyear=planyear;
	}
	public String getPlanno(){
		return planno;
	}
	public void setPlanno(String planno){
		this.planno=planno;
	}
	public String getDispatchunit(){
		return dispatchunit;
	}
	public void setDispatchunit(String dispatchunit){
		this.dispatchunit=dispatchunit;
	}
	private String dispatchdatestr;
	public void setDispatchdatestr(String dispatchdatestr){
		this.dispatchdatestr=dispatchdatestr;
	}
	public String getDispatchdatestr(){
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		return dispatchdate == null ? dispatchdatestr : simpleDateFormat.format(dispatchdate);
	}
	public Date getDispatchdate(){
		return dispatchdate;
	}
	public void setDispatchdate(Date dispatchdate){
		this.dispatchdate=dispatchdate;
	}
	private String planbegindatestr;
	public void setPlanbegindatestr(String planbegindatestr){
		this.planbegindatestr=planbegindatestr;
	}
	public String getPlanbegindatestr(){
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		return planbegindate == null ? planbegindatestr : simpleDateFormat.format(planbegindate);
	}
	public Date getPlanbegindate(){
		return planbegindate;
	}
	public void setPlanbegindate(Date planbegindate){
		this.planbegindate=planbegindate;
	}
	private String planenddatestr;
	public void setPlanenddatestr(String planenddatestr){
		this.planenddatestr=planenddatestr;
	}
	public String getPlanenddatestr(){
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		return planenddate == null ? planenddatestr : simpleDateFormat.format(planenddate);
	}
	public Date getPlanenddate(){
		return planenddate;
	}
	public void setPlanenddate(Date planenddate){
		this.planenddate=planenddate;
	}
	public String getFilenamelist(){
		return filenamelist;
	}
	public void setFilenamelist(String filenamelist){
		this.filenamelist=filenamelist;
	}
	public Short getDelflag(){
		return delflag;
	}
	public void setDelflag(Short delflag){
		this.delflag=delflag;
	}
	public String getRemark(){
		return remark;
	}
	public void setRemark(String remark){
		this.remark=remark;
	}
	public Integer getCreateuserid(){
		return createuserid;
	}
	public void setCreateuserid(Integer createuserid){
		this.createuserid=createuserid;
	}
	private String createtimestr;
	public void setCreatetimestr(String createtimestr){
		this.createtimestr=createtimestr;
	}
	public String getCreatetimestr(){
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		return createtime == null ? createtimestr : simpleDateFormat.format(createtime);
	}
	public Date getCreatetime(){
		return createtime;
	}
	public void setCreatetime(Date createtime){
		this.createtime=createtime;
	}
}
