package com.zhoubi.graindepot.base;

import java.util.*;
public class PagerModel<T> {

    private List<String> order = new LinkedList();
    private Map<String, Object> where = new HashMap();
    private int recordsTotal; // 总数
    private int recordsFiltered; // 总数
    private List<T> data; // 分页集合列表
    private int start;//从第几行开始显示
    private int length;//每页显示多少行

    public int getStart() {
        return start;
    }

    public void setStart(Integer start) {
        where.put("offset",start);
        this.start = start;
    }

    public int getLength() {
        return length;
    }

    public void setLength(int length) {
        where.put("pageSize",length);
        this.length = length;
    }

    public PagerModel addOrder(String... o) {
        Collections.addAll(order, o);
        where.put("orders",order);
        return this;
    }

    public PagerModel removeOrder(String... o) {
        for (String one : o) {
            order.remove(one);
        }
        return this;
    }

    public PagerModel putWhere(String key, Object value) {
        where.put(key, value);
        return this;
    }

    public PagerModel removeWhere(String key) {
        where.remove(key);
        return this;
    }

    public List<String> getOrder() {
        return order;
    }

    public Map<String, Object> getWhere() {
        return where;
    }

    public int getRecordsTotal() {
        return recordsTotal;
    }

    public void setRecordsTotal(int recordsTotal) {
        this.recordsTotal = recordsTotal;
    }

    public int getRecordsFiltered() {
        return recordsFiltered;
    }

    public void setRecordsFiltered(int recordsFiltered) {
        this.recordsFiltered = recordsFiltered;
    }

    public List<T> getData() {
        return data;
    }

    public void setData(List<T> data) {
        this.data = data;
    }
}
