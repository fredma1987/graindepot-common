package com.zhoubi.graindepot.config;

import feign.RequestInterceptor;
import feign.RequestTemplate;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.GenericToStringSerializer;
import org.springframework.web.context.request.RequestContextHolder;

/**
 * Created by zhanghao on 2018/4/25.
 */
@Configuration
public class FeignConfig {
    @Bean
    public RequestInterceptor requestInterceptor() {
        return new RequestInterceptor() {
            @Override
            public void apply(RequestTemplate requestTemplate) {
                {
                    String sessionId = RequestContextHolder.currentRequestAttributes().getSessionId();
                    requestTemplate.header("Cookie", "SESSION=" + sessionId);
                }
            }
        };
    }

}
