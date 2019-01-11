package com.zhoubi.graindepot.base;

import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

/**
 * Dao层的基础接口
 * Created by zhanghao
 */
public interface BaseMapper<T> {

    int insert(T e);

    int insertList(List<? extends T> e);

    int deleteMap(Map<String, Object> e);

    int update(T e);

    int updateMap(Map<String, Object> e);

    List<T> selectPageList(Map<String, Object> map);

    int selectPageCount(Map<String, Object> map);

    List<T> selectList(Map<String, Object> e);

    T selectById(int e);

    T selectOne(Map<String, Object> e);

}