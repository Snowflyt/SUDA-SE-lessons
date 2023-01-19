package cn.enilu.flash.api.controller.signin;

import cn.enilu.flash.api.controller.BaseController;
import cn.enilu.flash.bean.dto.SignInDto;
import cn.enilu.flash.bean.entity.system.User;
import cn.enilu.flash.bean.vo.front.Rets;
import cn.enilu.flash.cache.TokenCache;
import cn.enilu.flash.service.scanQRCode.QRCodeService;
import cn.enilu.flash.service.signin.SignInService;
import cn.enilu.flash.service.system.UserService;
import cn.enilu.flash.utils.HttpUtil;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Map;
import java.util.Objects;

@Slf4j
@RestController
public class SignInController extends BaseController {
    private final SignInService signInService;
    private final QRCodeService qrCodeService;
    private final UserService userService;
    @Autowired
    private TokenCache tokenCache;

    public SignInController(SignInService signInService, QRCodeService qrCodeService, UserService userService) {
        this.signInService = signInService;
        this.qrCodeService = qrCodeService;
        this.userService = userService;
    }

    /**
     * @param signInDto 学生学号
     * @return 0: 未签到 1: 签到成功 2: 重复签到
     */
    @PostMapping("/signIn")
    public Object signIn(@RequestBody SignInDto signInDto) {
        String userId = signInDto.getStudentId();
        String course = signInDto.getCourseId();
        String day = signInDto.getDay();
        String week = signInDto.getWeek();
        String lesson = signInDto.getLesson();
        String qrCreator = signInDto.getQrCreator();
        LocalDateTime qrCreatTime = signInDto.getQrCreatTime();
        Map<String, Object> res = signInService.signIn(userId, course, day, week, lesson, qrCreator, qrCreatTime);
        return Rets.success(res);
    }

    @PostMapping("/manualSignIn")
    public Object manualSignIn(@RequestParam("studentId") String studentId, @RequestParam("courseId") String courseId, @RequestParam("date") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate signInDate, @RequestParam("operator") String operator) {
        return Rets.success(signInService.manualSignIn(studentId, courseId, signInDate, operator));
    }

    @GetMapping("/signinStatus")
    public Object getSignInStatus(@RequestParam String state) {
        return Rets.success(qrCodeService.isSignedIn(state));
    }

    @GetMapping("/signedInUser")
    public Object getScannedUser(@RequestParam String state) {
        var userInfo = qrCodeService.getSignedInUser(state);
        if (userInfo == null) {
            return Rets.success();
        }
        return Rets.success(userInfo.toMap());
    }

    @GetMapping("/scanQRCode")
    public Object scanQRCode(@RequestParam String code, @RequestParam String state) {
        MSG m = new MSG();
        int e = qrCodeService.scanQRCode(code, state);
        m.setErrcode(e);
        if (e == 0) m.setResult("授权成功！");
        else if (e == 2) m.setResult("获取user_ticket失败，请重新授权！");
        else m.setResult("授权失败，请重试！");
        return Rets.success(m);
    }

    /**
     * @param courseId 课程号
     * @return 当前详细时间信息
     */
    @GetMapping("/getTimeByCourseId")
    public Object getTimeByCourseId(@RequestParam String courseId) {
        return Rets.success(signInService.startSignIn(courseId));
    }

    @DeleteMapping("/deleteSignInRecord")
    public Object deleteSignInRcord(@RequestParam Long recordId) {
        signInService.deleteSignInRecord(recordId);
        return Rets.success();
    }

    /**
     * @param courseId 课程号
     * @param date     日期
     * @return 当前课程在指定日期的签到情况
     */
    @GetMapping("/signInRecordForCourse/{course}/{date}")
    public Object getSignInRecordForCourse(@PathVariable("course") String courseId, @PathVariable("date") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate date) {
        return Rets.success(signInService.getRecordByCourseAndDate(courseId, date));
    }

    @GetMapping("/signInRecordForStudent/{student}")
    public Object getAllSignInRecordForStudent(@PathVariable("student") String studentId, @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate date, @RequestParam(required = false) String week) {
        HttpServletRequest request = HttpUtil.getRequest();
        Long idUser;
        try {
            idUser = getIdUser(request);
            if (idUser != null) {
                User user = userService.get(idUser);
                if (user != null && (user.getAccount().equals(studentId) || !tokenCache.getUser(getToken()).getRoleNames().contains("学生"))) {
                    if (date == null && (Objects.equals(week, "") || week == null))
                        return Rets.success(signInService.getRecordByStudent(studentId));
                    else if (date != null)
                        return Rets.success(signInService.getRecordByStudentAndData(studentId, date));
                    else return Rets.success(signInService.getRecordByStudentAndWeek(studentId, week));
                } else return Rets.failure("无权限");
            } else return Rets.expire();
        } catch (Exception e) {
            return Rets.expire();
        }
    }

    @GetMapping("/coursesToday")
    public Object getCourse(@RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate date, @RequestParam(required = false) String studentId) {
        if (date == null && studentId != null) {
            if (studentId.length() == 6) {
                return Rets.success(signInService.getCourseInDateByTeacher(studentId));
            }
            return Rets.success(signInService.getCourseInDate(studentId));
        }
        if (date != null && studentId == null) {
            return Rets.success(signInService.getCourseInDate(date));
        }
        return Rets.failure("参数错误");
    }

    @GetMapping("/signInCount")
    public Object getSignInCount(@RequestParam String courseId, @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate date) {
        if (date == null) {
            return Rets.success(signInService.getSignInCount(courseId));
        }
        return Rets.success(signInService.getSignInCount(courseId, date));
    }

    @GetMapping("/signInRate/studentInCourse")
    public Object getSignInRateForOneStudentInCourse(@RequestParam String studentId, @RequestParam String courseId) {
        return Rets.success(signInService.getSignInCountForStudentInCourse(studentId, courseId));
    }

    @GetMapping("/signInRate/AllStudentInCourse")
    public Object getSignInRateForAllStudentInCourse(@RequestParam String courseId) {
        return Rets.success(signInService.getSignInRateForAllStudentInCourse(courseId));
    }

    @GetMapping("/signInRate/AllRateForTeacher")
    public Object getSignInRateForAllCourseInTeacher(@RequestParam String teacherId) {
        return Rets.success(signInService.getSignInRateForAllCourseInTeacher(teacherId));
    }

    @GetMapping("/signInRate/studentInAllCourse")
    public Object getSignInRateForStudentInAllCourse(@RequestParam String studentId) {
        return Rets.success(signInService.getSignInRateForStudentInAllCourse(studentId));
    }

    @Data
    private static class MSG {
        private int errcode;
        private String result;
    }
}
