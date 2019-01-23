package com.zhoubi.graindepot.base;


import com.zhoubi.graindepot.bean.Planfile;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by zhanghao
 */
public abstract class BaseService<T> {

    //获得实际的Mapper,子类实现
    protected abstract BaseMapper<T> getMapper();

    public List<T> selectList(Map<String, Object> e) {
        return getMapper().selectList(e);
    }

    public T selectById(Integer id) {
        return getMapper().selectById(id);
    }


    public T selectOne(Map<String, Object> e) {
        return getMapper().selectOne(e);
    }


    public List<T> selectPageList(Map<String, Object> map) {
        return getMapper().selectPageList(map);
    }


    public int selectPageCount(Map<String, Object> map) {
        return getMapper().selectPageCount(map);
    }


    public int update(T e) {
        return getMapper().update(e);
    }

    public int updateMap(Map<String, Object> e) {
        return getMapper().updateMap(e);
    }


    public int insert(T e) {
        return getMapper().insert(e);
    }

    public int insertList(List<? extends T> e) {
        return getMapper().insertList(e);
    }


    public int deleteMap(Map<String, Object> e) {
        return getMapper().deleteMap(e);
    }

    public int deleteById(Integer id) {
        Map e = new HashMap();
        e.put("Where_id", id);
        return getMapper().deleteMap(e);
    }


    public PagerModel<T> selectListByPage(PagerModel<T> model) {
        List<T> list = selectPageList(model.getWhere());
        Integer total = selectPageCount(model.getWhere());
        model.setData(list);
        model.setRecordsTotal(total);
        model.setRecordsFiltered(total);
        return model;

    }

    final public PagerModel<T> selectListByPage(PagerModel<T> model, String pageList, String pageCount) {
        Class c = getMapper().getClass();
        Method[] ms = c.getMethods();
        Method pageL = null;
        Method pageC = null;
        for (Method m : ms) {
            if (m.getName().equals(pageList)) {
                pageL = m;
            }
            if (m.getName().equals(pageCount)) {
                pageC = m;
            }
        }
        Integer oneC = null;
        try {
            oneC = (Integer) pageC.invoke(getMapper(), model.getWhere());
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        } catch (InvocationTargetException e) {
            e.printStackTrace();
        }
        List<T> list = new ArrayList();
        if (oneC != null) {
            try {
                list = (List<T>) pageL.invoke(getMapper(), model.getWhere());
            } catch (IllegalAccessException e) {
                e.printStackTrace();
            } catch (InvocationTargetException e) {
                e.printStackTrace();
            }
        }

        model.setData(list);
        model.setRecordsTotal(oneC);
        model.setRecordsFiltered(oneC);
        return model;
    }


}