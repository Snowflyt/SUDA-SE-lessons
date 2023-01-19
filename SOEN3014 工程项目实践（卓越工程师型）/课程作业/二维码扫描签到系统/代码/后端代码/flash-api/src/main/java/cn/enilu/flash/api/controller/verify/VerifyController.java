package cn.enilu.flash.api.controller.verify;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@Slf4j
@RestController
public class VerifyController {

    private static final String CORP_ID = "ww66600273ffae5dea";

    private static final String TOKEN = "xYOb2YlUVQrYXuU7hoI7";

    private static final String ENCODING_AES_KEY = "OiBLrmDM2n6oddCq8HuEKWddmkKtdEZ8qeXgh3ypeiq";

    @GetMapping("/wx/verify")
    public String verify(
            @RequestParam("msg_signature") String msgSig,
            @RequestParam("timestamp") String timestamp,
            @RequestParam("nonce") String nonce,
            @RequestParam("echostr") String echostr) throws AesException {
        log.info("\n{}\n{}\n{}\n{}", msgSig, timestamp, nonce, echostr);

        WXBizMsgCrypt wxcpt = new WXBizMsgCrypt(TOKEN, ENCODING_AES_KEY, CORP_ID);

        return wxcpt.verifyURL(msgSig, timestamp, nonce, echostr);
    }

    @GetMapping("/wx/test")
    public String test(
            @RequestParam("access_token") String accessToken,
            @RequestParam("code") String code) {
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.getForEntity(
                "https://qyapi.weixin.qq.com/cgi-bin/auth/getuserinfo?access_token={at}&code={code}",
                String.class, accessToken, code).getBody();
    }

}
