package com.snowflyt.jobposting.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

/**
 * 通用返回类
 *
 * @param <T>
 * @author yupi
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BaseResponse<T> implements Serializable {

    private Integer code;

    private T data;

    private String message;

    private String description;

    public BaseResponse(Integer code, T data, String message) {
        this(code, data, message, "");
    }

    public BaseResponse(Integer code, T data) {
        this(code, data, "", "");
    }

}
