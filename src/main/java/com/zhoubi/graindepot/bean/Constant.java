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
}
