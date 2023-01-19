package cn.enilu.flash.service.signin;

import lombok.Data;

@Data
public class SignInMessage {
    private int errcode;
    private String msg;
    private String userid;
    private String name;
    private String avatar;
}