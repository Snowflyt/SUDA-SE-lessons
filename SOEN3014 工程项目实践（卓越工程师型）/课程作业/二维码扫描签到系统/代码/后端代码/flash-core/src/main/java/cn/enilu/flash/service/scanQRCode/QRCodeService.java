package cn.enilu.flash.service.scanQRCode;

import cn.enilu.flash.bean.entity.wechatuserinfo.WeChatUserInfo;
import cn.enilu.flash.dao.signin.QrCodeRepository;
import cn.enilu.flash.service.BaseService;
import org.apache.commons.lang3.tuple.Triple;
import org.json.JSONObject;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class QRCodeService extends BaseService<WeChatUserInfo, Long, QrCodeRepository> {

    private static final String CORP = "ww66600273ffae5dea";
    private static final String CORP_SECRET = "xyucdS-ZE7hR_x8so_fCEy25EpIsO4hLxNS8n_cSX-4";
    private static final RestTemplate restTemplate = new RestTemplate();
    private static final String ERROR_CODE_KEY = "errcode";
    private static final String USER_TICKET_KEY = "user_ticket";
    private static final int EXPIRES_IN = 7200000;
    private static final Long SIGNED_IN_EXPIRES_IN_MILLIS = 5000L;
    private static String accessToken;
    private static long lastUpdateTokenTime;
    private final List<Triple<Long, String, JSONObject>> scannedUsers = new ArrayList<>();

    public QRCodeService() {
        checkAccessToken();
    }

    private static void checkAccessToken() {
        if (System.currentTimeMillis() - lastUpdateTokenTime > EXPIRES_IN) {
            JSONObject jsonObject = new JSONObject(restTemplate.getForEntity("https://qyapi.weixin.qq.com/cgi-bin/gettoken?corpid={cop}&corpsecret={corpsect}", String.class, CORP, CORP_SECRET).getBody());
            if (jsonObject.getInt(ERROR_CODE_KEY) == 0) {
                accessToken = jsonObject.getString("access_token");
                lastUpdateTokenTime = System.currentTimeMillis();
            }
        }
    }

    private void removeExpiredScannedUsers() {
        scannedUsers.removeIf(triple -> triple.getLeft() < System.currentTimeMillis() - SIGNED_IN_EXPIRES_IN_MILLIS);
    }

    public boolean isSignedIn(String state) {
        removeExpiredScannedUsers();
        return scannedUsers.stream().anyMatch(triple -> triple.getMiddle().equals(state));
    }

    public JSONObject getSignedInUser(String state) {
        removeExpiredScannedUsers();
        var userInfo = scannedUsers.stream().filter(triple -> triple.getMiddle().equals(state)).findAny().map(Triple::getRight).orElse(null);
        scannedUsers.removeIf(triple -> triple.getMiddle().equals(state));
        return userInfo;
    }

    public int scanQRCode(String code, String state) {
        checkAccessToken();
        int res = 0;
        JSONObject userTicketJSON = getUserTicketByCode(code);
        if (!userTicketJSON.has(USER_TICKET_KEY)) return 2;
        String userTicket = userTicketJSON.getString(USER_TICKET_KEY);
        JSONObject userInfo = getUserInfoByUserTicket(userTicket);
        userInfo.put("name", getUserNameByUserId(userInfo.getString("userid")));
        if (userInfo.getInt(ERROR_CODE_KEY) != 0) {
            res = 3;
            return res;
        }
        removeExpiredScannedUsers();
        scannedUsers.add(Triple.of(System.currentTimeMillis(), state, userInfo));
        return res;
    }

    private JSONObject getUserTicketByCode(String code) {
        return new JSONObject(restTemplate.getForEntity("https://qyapi.weixin.qq.com/cgi-bin/auth/getuserinfo?access_token={at}&code={code}", String.class, accessToken, code).getBody());
    }


    private JSONObject getUserInfoByUserTicket(String userTicket) {
        Map<String, Object> postData = Map.of(USER_TICKET_KEY, userTicket);
        return new JSONObject(restTemplate.postForEntity("https://qyapi.weixin.qq.com/cgi-bin/auth/getuserdetail?access_token={at}", postData, String.class, accessToken).getBody());
    }

    private String getUserNameByUserId(String userid) {
        return new JSONObject(restTemplate.getForEntity("https://qyapi.weixin.qq.com/cgi-bin/user/get?access_token={at}&userid={uid}", String.class, accessToken, userid).getBody()).getString("name");
    }
}
