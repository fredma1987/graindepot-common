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
}
