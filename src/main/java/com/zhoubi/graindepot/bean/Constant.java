package com.zhoubi.graindepot.bean;

/**
 * 枚举类
 * Created by zhanghao on 2019/1/22/0022.
 */
public class Constant {
    //粮油大类
    public enum Graincate{
        ls(1, "粮食"), yz(2, "油脂"), qt(99, "其他");
        public int value;
        public String text;

        Graincate(int value, String text) {
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

        public static String getText(int value) {
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
        public int value;
        public String text;

        Grainkind(int value, String text) {
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

        public static String getText(int value) {
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
        public int value;
        public String text;

        GrainGrade(int value, String text) {
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

        public static String getText(int value) {
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
        public int value;
        public String text;

        Approval(int value, String text) {
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

        public static String getText(int value) {
            for (Approval m : Approval.values()) {
                if (m.value==value)
                    return m.text;
            }
            return null;
        }
    }
}
