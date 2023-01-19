package cn.enilu.flash.service.signin;

import cn.enilu.flash.bean.entity.course.Course;
import cn.enilu.flash.bean.entity.signInRecord.SignInRecord;
import cn.enilu.flash.bean.entity.signin.SignIn;
import cn.enilu.flash.bean.entity.student.Student;
import cn.enilu.flash.bean.entity.studentMtmCourse.StudentMtmCourse;
import cn.enilu.flash.bean.entity.teacher.Teacher;
import cn.enilu.flash.bean.entity.term.Term;
import cn.enilu.flash.dao.course.CourseRepository;
import cn.enilu.flash.dao.lesson.LessonRepository;
import cn.enilu.flash.dao.signin.SignInRepository;
import cn.enilu.flash.dao.signin.signInRecord.SignInRecordRepository;
import cn.enilu.flash.dao.student.StudentRepository;
import cn.enilu.flash.dao.studentMtmCourse.StudentMtmCourseRepository;
import cn.enilu.flash.dao.teacher.TeacherRepository;
import cn.enilu.flash.dao.term.TermRepository;
import cn.enilu.flash.service.BaseService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.*;
import java.util.regex.Pattern;

@Slf4j
@Service
public class SignInService extends BaseService<SignIn, Long, SignInRepository> {

    private final SignInRecordRepository signInRecordRepository;
    private final StudentRepository studentRepository;
    private final CourseRepository courseRepository;
    private final TermRepository termRepository;
    private final StudentMtmCourseRepository studentMtmCourseRepository;
    private final LessonRepository lessonRepository;
    private final TeacherRepository teacherRepository;

    public SignInService(SignInRecordRepository signInRecordRepository, StudentRepository studentRepository, CourseRepository courseRepository, TermRepository termRepository, StudentMtmCourseRepository studentMtmCourseRepository, LessonRepository lessonRepository, TeacherRepository teacherRepository) {
        this.signInRecordRepository = signInRecordRepository;
        this.studentRepository = studentRepository;
        this.courseRepository = courseRepository;
        this.termRepository = termRepository;
        this.studentMtmCourseRepository = studentMtmCourseRepository;
        this.lessonRepository = lessonRepository;
        this.teacherRepository = teacherRepository;
    }


    /**
     * @param studentId   学生学号
     * @param courseId    课程号
     * @param day         星期几
     * @param week        第几周
     * @param lesson      第几节课
     * @param qrCreator   二维码创建者
     * @param qrCreatTime 二维码创建时间
     * @return 0: 签到成功 1: 签到重复 -1: 学生或课程不存在 -2: 学生未选该课程
     */
    public Map<String, Object> signIn(String studentId, String courseId, String day, String week, String lesson, String qrCreator, LocalDateTime qrCreatTime) {
        SignIn signIn = new SignIn();
        signIn.setUserid(studentId);
        signIn.setCourse(courseId);
        insert(signIn);
        SignInRecord signInRecord = new SignInRecord();
        Optional<Student> student = studentRepository.findByStudentId(studentId);
        Optional<Course> course = courseRepository.findByCourseId(courseId);
        Map<String, Object> res = new HashMap<>();
        if (student.isPresent() && course.isPresent()) {
            Student signInStudent = student.get();
            Course signInCourse = course.get();
            if (signInRecordRepository.checkExistRecord(signInStudent.getId(), signInCourse.getId(), day, week) != 0) {
                res.put("status", 1);
                res.put("msg", "重复签到");
            } else {
                if (studentMtmCourseRepository.checkExist(signInStudent.getId(), signInCourse.getId()) == 0) {
                    res.put("status", -2);
                    res.put("msg", "该学生未选该课程");
                } else {
                    signInRecord.setStudent(student.get());
                    signInRecord.setCourse(course.get());
                    signInRecord.setDay(day);
                    signInRecord.setWeek(week);
                    signInRecord.setLesson(lesson);
                    signInRecord.setQrCreator(qrCreator);
                    signInRecord.setQrCreateTime(qrCreatTime);
                    signInRecord.setStatus("正常扫码");
                    signInRecordRepository.save(signInRecord);
                    res.put("status", 0);
                    res.put("msg", "签到成功");
                }
            }

        } else {
            res.put("status", -1);
            res.put("msg", "学生或课程不存在");
        }
        return res;
    }

    /**
     * @param courseId 课程id
     * @param date     当前时间
     * @return 课程签到日期信息
     */
    public Map<String, Object> getTime(String courseId, LocalDate date) {
        Map<String, Object> time = new HashMap<>();
        String termId = courseId.split("[()]")[1];
        Map<String, Object> termTime = getTermTime(termId, date);
        List<Map<String, String>> courseTimes = getCourseTimes(courseId);
        if (!termTime.isEmpty() && !courseTimes.isEmpty()) {
            Map<String, String> courseInDay = courseInDay(courseTimes, termTime);
            if (!courseInDay.isEmpty()) {
                time.put("status", 0);
                time.put("day", courseInDay.get("day"));
                time.put("week", Integer.parseInt(courseInDay.get("week")));
                time.put("lesson", courseInDay.get("lesson"));
            } else {
                time.put("status", -1);
                time.put("msg", "不在今天");
            }
        } else {
            time.put("status", -1);
            time.put("msg", "课程不存在");
        }
        return time;
    }

    private Map<String, Object> getTermTime(String termId, LocalDate date) {
        Optional<Term> term = termRepository.findByTermId(termId);
        Map<String, Object> termTime = new HashMap<>();
        if (term.isPresent()) {
            LocalDate start = term.get().getTermStart();
            return getTermTime(date, start);
        }
        return termTime;
    }

    private Map<String, Object> getTermTime(LocalDate date, LocalDate termStart) {
        Map<String, Object> termTime = new HashMap<>();
        int week = (int) ((date.toEpochDay() - termStart.toEpochDay()) / 7) + 1;
        String[] dayOfWeek = {"", "一", "二", "三", "四", "五", "六", "日"};
        String day = dayOfWeek[date.getDayOfWeek().getValue()];
        termTime.put("week", week);
        termTime.put("day", day);
        return termTime;
    }

    private Map<String, String> courseInDay(List<Map<String, String>> courseTimes, Map<String, Object> termTime) {
        Map<String, String> courseTimeInDay = new HashMap<>();
        String lesson = "";
        boolean flag = false;
        for (Map<String, String> courseTime : courseTimes) {
            int startWeek = Integer.parseInt(courseTime.get("startWeek"));
            int endWeek = Integer.parseInt(courseTime.get("endWeek"));
            int week = (int) termTime.get("week");
            String oddEven = courseTime.get("oddEven");
            if ((startWeek <= week && endWeek >= week) && (Objects.equals(oddEven, "") || ((week % 2 == 0 && "双".equals(oddEven)) || (week % 2 != 0 && "单".equals(oddEven)))) && Objects.equals(courseTime.get("day"), termTime.get("day"))) {
                courseTimeInDay = courseTime;
                lesson = java.lang.String.join(courseTime.get("lesson"), lesson, ",");
                flag = true;
            }
        }
        if (flag) {
            courseTimeInDay.put("week", termTime.get("week").toString());
            lesson = lesson.substring(0, lesson.length() - 1);
            courseTimeInDay.put("lesson", lesson);
        }
        return courseTimeInDay;
    }

    private List<Map<String, String>> getCourseTimes(String courseId) {
        List<Map<String, String>> courseTimes = new ArrayList<>();
        Optional<Course> course = courseRepository.findByCourseId(courseId);
        if (course.isEmpty()) return courseTimes;
        else {
            String classTime = course.get().getTime();
            String regex = "周([一二三四五六日])第(.*?)节\\{第(\\d+)-(\\d+)周(\\|([单双])周)?}";
            Pattern pattern = Pattern.compile(regex);
            java.util.regex.Matcher matcher = pattern.matcher(classTime);
            while (matcher.find()) {
                Map<String, String> courseTime = new HashMap<>();
                String day = matcher.group(1);
                String lesson = matcher.group(2);
                String startWeek = matcher.group(3);
                String endWeek = matcher.group(4);
                String oddEven = matcher.group(6);
                if (oddEven == null) oddEven = "";
                courseTime.put("day", day);
                courseTime.put("lesson", lesson);
                courseTime.put("startWeek", startWeek);
                courseTime.put("endWeek", endWeek);
                courseTime.put("oddEven", oddEven);
                courseTimes.add(courseTime);
            }
        }
        return courseTimes;
    }


    /**
     * @param courseId 课程id
     * @return 课程签到日期信息
     */
    public Map<String, Object> getTimeByCourseId(String courseId) {
        return getTime(courseId, LocalDate.now());
    }

    /**
     * @param courseId 课程id
     * @param date     日期
     * @return 课程签到记录（所有学生）
     */
    public List<Map<String, Object>> getRecordByCourseAndDate(String courseId, LocalDate date) {
        Optional<Course> courseOpt = courseRepository.findByCourseId(courseId);
        if (courseOpt.isPresent()) {
            Course course = courseOpt.get();
            Map<String, Object> time = getTime(courseId, date);
            if ((int) time.get("status") == 0) {
                List<Map<String, Object>> rec = initEveryStudent(course);
                List<SignInRecord> signInRecords = signInRecordRepository.findRecordForCourse(course.getId(), String.valueOf(time.get("day")), String.valueOf(time.get("week")), String.valueOf(time.get("lesson")));
                return mergeSignedRecord(rec, signInRecords);
            }
        }
        return new ArrayList<>();
    }

    /**
     * @param courseId 课程id
     * @return 课程签到记录
     */
    public List<Map<String, Object>> getRecordByCourseAndDate(String courseId) {
        return getRecordByCourseAndDate(courseId, LocalDate.now());
    }

    /**
     * @param rec           课程所有学生列表
     * @param signInRecords 课程已有签到记录
     * @return 合并后的签到记录
     */
    private List<Map<String, Object>> mergeSignedRecord(List<Map<String, Object>> rec, List<SignInRecord> signInRecords) {
        for (Map<String, Object> oneRecord : rec) {
            for (SignInRecord signInRecord : signInRecords) {
                if (oneRecord.get("studentId").equals(signInRecord.getStudent().getStudentId())) {
                    oneRecord.put("signedIn", true);
                    oneRecord.put("lesson", signInRecord.getLesson());
                    oneRecord.put("qrCreator", signInRecord.getQrCreator());
                    oneRecord.put("qrCreatTime", signInRecord.getQrCreateTime());
                    oneRecord.put("signInTime", signInRecord.getCreateTime());
                    oneRecord.put("week", signInRecord.getWeek());
                    oneRecord.put("day", signInRecord.getDay());
                    oneRecord.put("recordId", signInRecord.getId());
                    oneRecord.put("status", signInRecord.getStatus());
                    break;
                }
            }
        }
        return rec;
    }

    /**
     * @param course 课程
     * @return 课程所有学生列表
     */
    private List<Map<String, Object>> initEveryStudent(Course course) {
        List<Map<String, Object>> res = new ArrayList<>();
        for (int i = 0; i < course.getStudentMtmCourses().size(); i++) {
            HashMap<String, Object> recordForStudent = new HashMap<>();
            Student student = course.getStudentMtmCourses().get(i).getStudent();
            recordForStudent.put("studentId", student.getStudentId());
            recordForStudent.put("name", student.getName());
            recordForStudent.put("class", student.getClasses());
            recordForStudent.put("college", student.getCollege());
            recordForStudent.put("major", student.getMajor());
            recordForStudent.put("grade", student.getGrade());
            recordForStudent.put("signedIn", false);
            res.add(recordForStudent);
        }
        return res;
    }


    /**
     * @param studentId 学生id
     * @return 学生签到记录
     */
    public List<Map<String, Object>> getRecordByStudent(String studentId) {
        List<Map<String, Object>> recordForStudentRes = new ArrayList<>();
        Optional<Student> studentOpt = studentRepository.findByStudentId(studentId);
        if (studentOpt.isPresent()) {
            Student student = studentOpt.get();
            recordForStudentRes = initRecordsForStudent(student, signInRecordRepository.findRecordForStudent(student.getId()));
        }
        return recordForStudentRes;
    }

    /**
     * @param student 学生
     * @param records 学生签到记录
     * @return 学生签到详细记录
     */
    private List<Map<String, Object>> initRecordsForStudent(Student student, List<SignInRecord> records) {
        List<Map<String, Object>> recs = new ArrayList<>();
        for (SignInRecord rec : records) {
            Map<String, Object> oneRecord = new HashMap<>();
            oneRecord.put("studentId", student.getStudentId());
            oneRecord.put("studentName", student.getName());
            oneRecord.put("courseId", rec.getCourse().getCourseId());
            oneRecord.put("courseName", rec.getCourse().getName());
            oneRecord.put("courseTime", rec.getCourse().getTime());
            oneRecord.put("courseLocation", rec.getCourse().getLocation());
            oneRecord.put("qrCreator", rec.getQrCreator());
            oneRecord.put("qrCreateTime", rec.getQrCreateTime());
            oneRecord.put("signInTime", rec.getCreateTime());
            oneRecord.put("lesson", rec.getLesson());
            oneRecord.put("week", rec.getWeek());
            oneRecord.put("day", rec.getDay());
            oneRecord.put("recordId", rec.getId());
            oneRecord.put("status", rec.getStatus());
            recs.add(oneRecord);
        }
        return recs;
    }

    /**
     * @param studentId 学生id
     * @param week      周次
     * @return 学生个人签到记录
     */
    public List<Map<String, Object>> getRecordByStudentAndWeek(String studentId, String week) {
        List<Map<String, Object>> recordForStudentRes = new ArrayList<>();
        Optional<Student> studentOpt = studentRepository.findByStudentId(studentId);
        if (studentOpt.isPresent()) {
            Student student = studentOpt.get();
            recordForStudentRes = initRecordsForStudent(student, signInRecordRepository.findRecordByStudentAndWeek(student.getId(), week));
        }
        return recordForStudentRes;
    }

    /**
     * @param studentId 学生id
     * @param date      日期
     * @return 学生个人签到记录
     */
    public List<Map<String, Object>> getRecordByStudentAndData(String studentId, LocalDate date) {
        List<Map<String, Object>> recordForStudentRes = new ArrayList<>();
        Optional<Student> studentOpt = studentRepository.findByStudentId(studentId);
        if (studentOpt.isPresent()) {
            Student student = studentOpt.get();
            recordForStudentRes = initRecordsForStudent(student, signInRecordRepository.findRecordByStudentAndDate(student.getId(), date));
        }
        return recordForStudentRes;
    }

    /**
     * @param studentId  补签学生id
     * @param courseId   补签课程id
     * @param signInDate 补签课程日期
     * @param operator   操作人
     * @return 补签结果
     */
    public Map<String, Object> manualSignIn(String studentId, String courseId, LocalDate signInDate, String operator) {
        Map<String, Object> time = getTime(courseId, signInDate);
        Map<String, Object> res = new HashMap<>();
        if ((int) time.get("status") != 0) {
            res.put("status", -1);
            res.put("msg", "课程和日期不对应");
            return res;
        } else {
            Optional<Student> studentOpt = studentRepository.findByStudentId(studentId);
            Optional<Course> courseOpt = courseRepository.findByCourseId(courseId);
            if (studentOpt.isPresent() && courseOpt.isPresent()) {
                Student student = studentOpt.get();
                Course course = courseOpt.get();
                SignInRecord signInRecord = new SignInRecord();
                if (signInRecordRepository.checkExistRecord(student.getId(), course.getId(), (String) time.get("day"), String.valueOf(time.get("week"))) != 0) {
                    res.put("status", 1);
                    res.put("msg", "重复签到");
                } else {
                    signInRecord.setStudent(student);
                    signInRecord.setCourse(course);
                    signInRecord.setQrCreator(operator);
                    signInRecord.setLesson((String) time.get("lesson"));
                    signInRecord.setWeek(String.valueOf(time.get("week")));
                    signInRecord.setDay((String) time.get("day"));
                    signInRecord.setStatus("手动操作");
                    signInRecordRepository.save(signInRecord);
                    res.put("status", 0);
                    res.put("msg", "补签成功");
                }
            } else {
                res.put("status", 1);
                res.put("msg", "学生或课程不存在");
            }
        }
        return res;
    }

    /**
     * @param recordId 要删除的签到记录id
     */
    public void deleteSignInRecord(Long recordId) {
        signInRecordRepository.deleteById(recordId);
    }

    public List<Map<String, Object>> getCourseInDate(LocalDate date, List<Course> courses) {
        List<Map<String, Object>> res = new ArrayList<>();
        for (Course course : courses) {
            if (getTime(course.getCourseId(), date).get("status").equals(0)) {
                Map<String, Object> oneCourse = new HashMap<>();
                oneCourse.put("id", course.getId());
                oneCourse.put("courseId", course.getCourseId());
                oneCourse.put("name", course.getName());
                oneCourse.put("time", course.getTime());
                oneCourse.put("location", course.getLocation());
                List<String> teachers = new ArrayList<>();
                for (Teacher teacher : course.getTeachers()) {
                    teachers.add(teacher.getName());
                }
                oneCourse.put("teachers", teachers);
                res.add(oneCourse);
            }
        }
        return res;
    }

    public List<Map<String, Object>> getCourseInDate(LocalDate date) {
        return getCourseInDate(date, courseRepository.findAll());
    }

    public List<Map<String, Object>> getCourseInDate() {
        return getCourseInDate(LocalDate.now(), courseRepository.findAll());
    }

    public List<Map<String, Object>> getCourseInDate(String studentId) {
        Optional<Student> studentOpt = studentRepository.findByStudentId(studentId);
        List<Course> courses = new ArrayList<>();
        if (studentOpt.isPresent()) {
            List<StudentMtmCourse> studentMtmCourseList = studentOpt.get().getStudentMtmCourses();
            for (StudentMtmCourse studentMtmCourse : studentMtmCourseList) {
                courses.add(studentMtmCourse.getCourse());
            }
            return getCoursesMaps(courses);
        } else return new ArrayList<>();
    }

    public List<Map<String, Object>> getCourseInDateByTeacher(String teacherId) {
        Optional<Teacher> teacherOpt = teacherRepository.findByTeacherId(teacherId);
        List<Course> courses;
        if (teacherOpt.isPresent()) {
            Teacher teacher = teacherOpt.get();
            Set<Course> courseSet = teacher.getCourses();
            courses = new ArrayList<>(courseSet);
            return getCoursesMaps(courses);
        }
        return new ArrayList<>();
    }

    private List<Map<String, Object>> getCoursesMaps(List<Course> courses) {
        List<Map<String, Object>> course = getCourseInDate(LocalDate.now(), courses);
        List<Map<String, Object>> res = new ArrayList<>();
        for (Map<String, Object> map : course) {
            map.put("onLesson", startSignIn((String) map.get("courseId")).get("status").equals(0));
            res.add(map);
        }
        return res;
    }


    public Map<String, Object> startSignIn(String courseId) {
        Map<String, Object> time = getTime(courseId, LocalDate.now());
        if ((int) time.get("status") == 0) {
            if (isInLesson((String) time.get("lesson"))) return time;
            else {
                log.info(time.toString());
                Map<String, Object> res = new HashMap<>();
                res.put("status", -1);
                res.put("msg", "未到签到开放时间");
                return res;
            }
        } else return time;
    }

    public boolean isInLesson(String lesson) {
        int start = Integer.parseInt(lesson.split(",")[0]);
        int end = Integer.parseInt(lesson.split(",")[lesson.split(",").length - 1]);
        LocalTime now = LocalTime.now();
        LocalTime startTime = lessonRepository.findByLesson(start).getStartTime().minusMinutes(30);
        LocalTime endTime = lessonRepository.findByLesson(end).getEndTime().plusMinutes(30);
        return now.isAfter(startTime) && now.isBefore(endTime);
    }

    public Map<String, Object> getSignInCount(String courseId, LocalDate date) {
        List<Map<String, Object>> records = getRecordByCourseAndDate(courseId, date);
        return getSignInRateFromRecords(records);
    }

    public Map<String, Object> getSignInCount(String courseId) {
        return getSignInCount(courseId, LocalDate.now());
    }


    public List<Map<String, Object>> getAllSignInRecordForStudentInCourse(String studentId, String courseId) {
        List<Map<String, Object>> res = new ArrayList<>();
        Optional<Student> studentOpt = studentRepository.findByStudentId(studentId);
        Optional<Course> courseOpt = courseRepository.findByCourseId(courseId);
        if (studentOpt.isPresent() && courseOpt.isPresent()) {
            Student student = studentOpt.get();
            Course course = courseOpt.get();
            if (studentMtmCourseRepository.checkExist(student.getId(), course.getId()) == 0) return res;
            // 生成所有的上课时间存入列表，每个元素为一个map，包含week和day和lesson
            Optional<Term> term = termRepository.findByTermId(courseId.split("[()]")[1]);
            if (term.isEmpty()) return res;
            List<Map<String, String>> courseTimes = getCourseTimes(courseId);
            LocalDate start = term.get().getTermStart();
            LocalDate now = LocalDate.now();
            // 遍历从开学到现在的每一天
            for (LocalDate date = start; date.isBefore(now) || date.isEqual(now); date = date.plusDays(1)) {
                // 遍历每一天的课程时间
                Map<String, Object> termTime = getTermTime(date, start);
                Map<String, String> courseTime = courseInDay(courseTimes, termTime);
                // 如果这一天是这一节课的上课时间
                if (!courseTime.isEmpty()) {
                    Map<String, Object> recordTemp = new HashMap<>();
                    recordTemp.put("courseTime", courseTime);
                    recordTemp.put("signedIn", signInRecordRepository.checkExistRecord(student.getId(), course.getId(), courseTime.get("day"), courseTime.get("week")) > 0);
                    res.add(recordTemp);
                }
            }
        }
        return res;
    }

    private List<Map<String, Object>> getAllSignInRateForAllStudentInCourse(String courseId) {
        Optional<Course> courseOpt = courseRepository.findByCourseId(courseId);
        if (courseOpt.isEmpty()) return new ArrayList<>();
        Course course = courseOpt.get();
        List<Map<String, Object>> res = new ArrayList<>();
        for (int i = 0; i < course.getStudentMtmCourses().size(); i++) {
            Student student = course.getStudentMtmCourses().get(i).getStudent();
            Map<String, Object> temp = new HashMap<>();
            temp.put("studentId", student.getStudentId());
            temp.put("studentName", student.getName());
            temp.put("details", getSignInRateFromRecords(getAllSignInRecordForStudentInCourse(student.getStudentId(), courseId)));
            res.add(temp);
            log.info(res.toString());
        }
        log.info("------------------------------------------------------" + res);
        return res;
    }

    public Map<String, Object> getSignInCountForStudentInCourse(String studentId, String courseId) {
        List<Map<String, Object>> records = getAllSignInRecordForStudentInCourse(studentId, courseId);
        return getSignInRateFromRecords(records);
    }

    public List<Map<String, Object>> getSignInRateForAllStudentInCourse(String courseId) {
        List<Map<String, Object>> res = new ArrayList<>();
        List<Map<String, Object>> recordAllDay = new ArrayList<>();
        Optional<Course> courseOpt = courseRepository.findByCourseId(courseId);
        if (courseOpt.isPresent()) {
            List<Map<String, String>> courseTimes = getCourseTimes(courseId);
            // 生成所有的上课时间存入列表，每个元素为一个map，包含week和day和lesson
            Optional<Term> term = termRepository.findByTermId(courseId.split("[()]")[1]);
            if (term.isEmpty()) return res;
            LocalDate start = term.get().getTermStart();
            LocalDate now = LocalDate.now();
            // 遍历从开学到现在的每一天
            for (LocalDate date = start; date.isBefore(now) || date.isEqual(now); date = date.plusDays(1)) {
                // 遍历每一天的课程时间
                Map<String, Object> termTime = getTermTime(date, start);
                Map<String, String> courseTime = courseInDay(courseTimes, termTime);
                // 如果这一天是这一节课的上课时间
                if (!courseTime.isEmpty()) {
                    recordAllDay.addAll(getRecordByCourseAndDate(courseId, date));
                }
            }
        }
        return gatherRecordsForATerm(recordAllDay);
    }

    private List<Map<String, Object>> gatherRecordsForATerm(List<Map<String, Object>> recordAllDay) {
        // 合并每天的签到情况，汇总成一个人一整个学期应到和实到以及签到率
        List<Map<String, Object>> recordAllStudent = new ArrayList<>();
        for (Map<String, Object> rec : recordAllDay) {
            String studentId = (String) rec.get("studentId");
            boolean signedIn = (boolean) rec.get("signedIn");
            boolean exist = false;
            for (Map<String, Object> recordTemp : recordAllStudent) {
                if (recordTemp.get("studentId").equals(studentId)) {
                    exist = true;
                    recordTemp.put("sum", (int) recordTemp.get("sum") + 1);
                    if (signedIn) recordTemp.put("signedIn", (int) recordTemp.get("signedIn") + 1);
                    else recordTemp.put("noSignedIn", (int) recordTemp.get("noSignedIn") + 1);
                    break;
                }
            }
            if (!exist) {
                Map<String, Object> recordTemp = new HashMap<>();
                recordTemp.put("studentId", studentId);
                recordTemp.put("studentName", rec.get("name"));
                recordTemp.put("major", rec.get("major"));
                recordTemp.put("grade", rec.get("grade"));
                recordTemp.put("sum", 1);
                recordTemp.put("signedIn", signedIn ? 1 : 0);
                recordTemp.put("noSignedIn", signedIn ? 0 : 1);
                recordAllStudent.add(recordTemp);
            }
        }
        //最后添加签到率
        for (Map<String, Object> rec : recordAllStudent) {
            int countSum = (int) rec.get("sum");
            int countSignedIn = (int) rec.get("signedIn");
            rec.put("rate", (double) countSignedIn / countSum);
        }
        return recordAllStudent;
    }

    private Map<String, Object> getSignInRateFromRecords(List<Map<String, Object>> records) {
        Map<String, Object> res = new HashMap<>();
        if (records == null || records.isEmpty()) return res;
        int countSum = records.size();
        int countSignedIn = 0;
        int countNotSignedIn = 0;

        for (Map<String, Object> rec : records) {
            if (Boolean.TRUE.equals(rec.get("signedIn"))) countSignedIn++;
            else countNotSignedIn++;
        }
        res.put("sum", countSum);
        res.put("signedIn", countSignedIn);
        res.put("noSignedIn", countNotSignedIn);
        res.put("rate", (double) countSignedIn / countSum);
        return res;
    }

    public Object getSignInRateForStudentInAllCourse(String studentId) {
        List<Map<String, Object>> res = new ArrayList<>();
        Optional<Student> studentOpt = studentRepository.findByStudentId(studentId);
        if (studentOpt.isEmpty()) return res;
        Student student = studentOpt.get();
        List<StudentMtmCourse> studentMtmCourses = student.getStudentMtmCourses();
        for (StudentMtmCourse studentMtmCourse : studentMtmCourses) {
            Course course = studentMtmCourse.getCourse();
            Map<String, Object> temp = new HashMap<>();
            temp.put("courseId", course.getCourseId());
            temp.put("courseName", course.getName());
            Map<String, Object> detail = getSignInCountForStudentInCourse(studentId, course.getCourseId());
            if (detail.isEmpty()) continue;
            temp.put("details", detail);
            res.add(temp);
        }
        return res;
    }

    public Object getSignInRateForAllCourseInTeacher(String teacherId) {
        List<Map<String, Object>> res = new ArrayList<>();
        Optional<Teacher> teacherOpt = teacherRepository.findByTeacherId(teacherId);
        if (teacherOpt.isEmpty()) return res;
        Teacher teacher = teacherOpt.get();
        Set<Course> courses = teacher.getCourses();
        for (Course course : courses) {
            Map<String, Object> temp = new HashMap<>();
            temp.put("courseId", course.getCourseId());
            temp.put("courseName", course.getName());
            Map<String, Object> detail = getSignInRateByRateForStudents(getSignInRateForAllStudentInCourse(course.getCourseId()));
            if (detail.isEmpty()) continue;
            temp.put("sum", detail.get("sum"));
            temp.put("signedIn", detail.get("signedIn"));
            temp.put("noSignedIn", detail.get("noSignedIn"));
            temp.put("rate", detail.get("rate"));
            res.add(temp);
        }
        return res;
    }

    public Map<String, Object> getSignInRateByRateForStudents(List<Map<String, Object>> recordsForStudents) {
        Map<String, Object> res = new HashMap<>();
        if (recordsForStudents == null || recordsForStudents.isEmpty()) return res;
        int countSum = 0;
        int countSignedIn = 0;
        int countNotSignedIn = 0;
        for (Map<String, Object> rec : recordsForStudents) {
            countSignedIn += (int) rec.get("signedIn");
            countNotSignedIn += (int) rec.get("noSignedIn");
            countSum += (int) rec.get("sum");
        }
        res.put("sum", countSum);
        res.put("signedIn", countSignedIn);
        res.put("noSignedIn", countNotSignedIn);
        res.put("rate", (double) countSignedIn / countSum);
        return res;
    }
}