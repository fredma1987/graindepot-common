package com.zhoubi.graindepot.bean;

/**
 * 枚举类
 * Created by zhanghao on 2019/1/22/0022.
 */
public class Constant {
    //粮油大类
    public enum Graincate{
        ls(1, "粮食"), yz(2, "油脂"), qt(99, "其他");
        public Integer value;
        public String text;

        Graincate(Integer value, String text) {
            this.value = value;
            this.text = text;
        }

        public static Integer getValue(String text) {
            for (Graincate m : Graincate.values()) {
                if (m.text.equals(text))
                    return m.value;
            }
            return null;
        }

        public static String getText(Integer value) {
            for (Graincate m : Graincate.values()) {
                if (m.value==value)
                    return m.text;
            }
            return null;
        }
    }
    //粮食种类
    public enum Grainkind{
        ls(1, "原粮"), yz(2, "成品粮"), qt(99, "其他");
        public Integer value;
        public String text;

        Grainkind(Integer value, String text) {
            this.value = value;
            this.text = text;
        }

        public static Integer getValue(String text) {
            for (Grainkind m : Grainkind.values()) {
                if (m.text.equals(text))
                    return m.value;
            }
            return null;
        }

        public static String getText(Integer value) {
            for (Grainkind m : Grainkind.values()) {
                if (m.value==value)
                    return m.text;
            }
            return null;
        }
    }

    //粮食等级
    public enum GrainGrade{
        yd(1, "一等"), ed(2, "二等"),sz(3, "三等")
        , sd(4, "四等"), wd(5, "五等"), dw(6, "等外"),wdd(99, "未定等");
        public Integer value;
        public String text;

        GrainGrade(Integer value, String text) {
            this.value = value;
            this.text = text;
        }

        public static Integer getValue(String text) {
            for (GrainGrade m : GrainGrade.values()) {
                if (m.text.equals(text))
                    return m.value;
            }
            return null;
        }

        public static String getText(Integer value) {
            for (GrainGrade m : GrainGrade.values()) {
                if (m.value==value)
                    return m.text;
            }
            return null;
        }
    }

    //审核
    public enum Approval{
        dsp(0, "待审批"), sptg(1, "审批通过"),spbtg(-1, "审批不通过");
        public Integer value;
        public String text;

        Approval(Integer value, String text) {
            this.value = value;
            this.text = text;
        }

        public static Integer getValue(String text) {
            for (Approval m : Approval.values()) {
                if (m.text.equals(text))
                    return m.value;
            }
            return null;
        }

        public static String getText(Integer value) {
            for (Approval m : Approval.values()) {
                if (m.value==value)
                    return m.text;
            }
            return null;
        }
    }

    //审核
    public enum Release{
        dsp(0, "待发布"), sptg(1, "发布"),spbtg(-1, "不发布");
        public Integer value;
        public String text;

        Release(Integer value, String text) {
            this.value = value;
            this.text = text;
        }

        public static Integer getValue(String text) {
            for (Release m : Release.values()) {
                if (m.text.equals(text))
                    return m.value;
            }
            return null;
        }

        public static String getText(Integer value) {
            for (Release m : Release.values()) {
                if (m.value==value)
                    return m.text;
            }
            return null;
        }
    }

    //单据状态
    public enum Billstage{
        dj(1, "登记"), qy(2, "扦样"),jy(3, "检验"),cmz(4, "称毛重")
        ,zc(5, "值仓"),cpz(6, "称皮重"),js(7, "结算"),qt(99, "其他");
        public Integer value;
        public String text;

        Billstage(Integer value, String text) {
            this.value = value;
            this.text = text;
        }

        public static Integer getValue(String text) {
            for (Billstage m : Billstage.values()) {
                if (m.text.equals(text))
                    return m.value;
            }
            return null;
        }

        public static String getText(Integer value) {
            for (Billstage m : Billstage.values()) {
                if (m.value==value)
                    return m.text;
            }
            return null;
        }
    }

    //单据状态
    public enum Sex{
        dj(1, "男"), qy(2, "女"),jy(3, "未指定");
        public Integer value;
        public String text;

        Sex(Integer value, String text) {
            this.value = value;
            this.text = text;
        }

        public static Integer getValue(String text) {
            for (Sex m : Sex.values()) {
                if (m.text.equals(text))
                    return m.value;
            }
            return null;
        }

        public static String getText(Integer value) {
            for (Sex m : Sex.values()) {
                if (m.value==value)
                    return m.text;
            }
            return null;
        }
    }
    //套打单据类型 b_lodop lodoptype
    public enum Lodoptype{
        a1("1001", "入库登记单"), a2("1002", "入库扦样码单"),a3("1003", "入库检验单")
        ,a4("1004", "入库检斤单"),a5("1005", "入库结算单"),a6("2001", "出库登记单")
        ,a7("2002", "出库检斤单"),a8("2003", "出库结算单");
        public String value;
        public String text;

        Lodoptype(String value, String text) {
            this.value = value;
            this.text = text;
        }

        public static String getValue(String text) {
            for (Lodoptype m : Lodoptype.values()) {
                if (m.text.equals(text))
                    return m.value;
            }
            return null;
        }

        public static String getText(String value) {
            for (Lodoptype m : Lodoptype.values()) {
                if (m.value.equals(value))
                    return m.text;
            }
            return null;
        }
    }

    //运输类型
    public enum Trucktype{
        cl(1, "车辆"), cb(2, "船舶"),hc(3, "火车"),qt(99, "其他");
        public Integer value;
        public String text;

        Trucktype(Integer value, String text) {
            this.value = value;
            this.text = text;
        }

        public static Integer getValue(String text) {
            for (Trucktype m : Trucktype.values()) {
                if (m.text.equals(text))
                    return m.value;
            }
            return null;
        }

        public static String getText(Integer value) {
            for (Trucktype m : Trucktype.values()) {
                if (m.value==value)
                    return m.text;
            }
            return null;
        }
    }
}
