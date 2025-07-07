package com.flightbooking.app.util;

import org.springframework.beans.BeanUtils;

public class DynamicMapper<T> {
	
	void map(T source,T target)
	{
		 BeanUtils.copyProperties(source,target);
	}

}
