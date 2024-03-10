package com.mooctest;

import io.appium.java_client.AppiumDriver;
import org.openqa.selenium.remote.DesiredCapabilities;

import java.io.File;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.Arrays;
import java.util.List;
import java.util.concurrent.TimeUnit;

public class Main {
    public static void main(String[] args) {
        Main main = new Main();
        main.start();
    }

    /**
     * 所有和 AppiumDriver 相关的操作都必须写在该函数中
     *
     * @param driver The AppiumDriver instance.
     */
    public void test(AppiumDriver driver) {
        try {
            // 等待 6s，待应用完全启动
            Thread.sleep(6000);
        } catch (InterruptedException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

        // 设置尝试定位控件的最长时间为 8s,也就是最多尝试 8s
        driver.manage().timeouts().implicitlyWait(15, TimeUnit.SECONDS);

        /*
         * 余下的测试逻辑请按照题目要求进行编写
         */
        /* 点击开屏提示 */
        driver.findElementByXPath("//android.widget.Button[@text='已了解']").click();
        driver.findElementByXPath("//android.widget.Button[@text='确定']").click();

        /* 测试翻译 */
        // 输入待翻译词 test
        driver.findElementById("android:id/input").click();
        driver.findElementById("android:id/input").sendKeys("test");
        // 点击翻译按钮
        driver.findElementById("name.gudong.translate:id/bt_translate").click();

        /* 测试翻译选项 */
        List<String> ways = Arrays.asList("金山", "谷歌", "百度", "有道");
        for (String way : ways) {
            driver.findElementById("name.gudong.translate:id/sp_translate_way").click();
            driver.findElementByXPath("//android.widget.CheckedTextView[@text='" + way + "']").click();
        }

        /* 测试按钮 */
        // 加入单词本
        driver.findElementById("name.gudong.translate:id/iv_favorite").click();
        // 发音
        driver.findElementById("name.gudong.translate:id/iv_sound").click();
        // 复制
        driver.findElementById("name.gudong.translate:id/iv_paste").click();
        // 清除
        driver.findElementById("name.gudong.translate:id/tv_clear").click();

        /* 测试单词本 */
        // 进入单词本
        driver.findElementById("name.gudong.translate:id/menu_book").click();
        // 点击发音
        driver.findElementById("name.gudong.translate:id/iv_sound").click();
        // 点击菜单
        driver.findElementById("name.gudong.translate:id/iv_over_flow").click();
        // 点击翻译
        driver.findElementByXPath("//android.widget.TextView[@text='翻译']").click();
        // 回到单词本
        driver.findElementById("name.gudong.translate:id/menu_book").click();
        // 点击菜单
        driver.findElementById("name.gudong.translate:id/iv_over_flow").click();
        // 点击删除
        driver.findElementByXPath("//android.widget.TextView[@text='删除']").click();
        // 点击取消
        driver.findElementById("android:id/button2").click();
        // 点击菜单
        driver.findElementById("name.gudong.translate:id/iv_over_flow").click();
        // 点击删除
        driver.findElementByXPath("//android.widget.TextView[@text='删除']").click();
        // 点击确定
        driver.findElementById("android:id/button1").click();
        // 回到主页面
        driver.findElementByXPath("//android.widget.ImageButton[@content-desc='转到上一层级']").click();

        /* 测试历史记录 */
        // 点击“更多选项”按钮
        driver.findElementById("android:id/input").click();
        driver.findElementByXPath("//android.widget.ImageView[@content-desc='更多选项']").click();
        // 点击历史记录
        driver.findElementByXPath("//android.widget.TextView[@text='历史记录']").click();
        // 点击发音
        driver.findElementById("name.gudong.translate:id/iv_sound").click();
        // 回到主页面
        driver.findElementByXPath("//android.widget.ImageButton[@content-desc='转到上一层级']").click();

        /* 测试设置 */
        // 点击“更多选项”按钮
        driver.findElementById("android:id/input").click();
        driver.findElementByXPath("//android.widget.ImageView[@content-desc='更多选项']").click();
        // 点击设置
        driver.findElementByXPath("//android.widget.TextView[@text='设置']").click();
        // 点击“知道了”
        driver.findElementById("android:id/button1").click();
//        // 点击两次“开启划词翻译”
//        driver.findElementByXPath("//android.widget.TextView[@text='开启划词翻译']").click();
//        driver.findElementByXPath("//android.widget.TextView[@text='开启划词翻译']").click();
//        // 点击两次“开启自动发音”
//        driver.findElementByXPath("//android.widget.TextView[@text='开启自动发音']").click();
//        driver.findElementByXPath("//android.widget.TextView[@text='开启自动发音']").click();
//        // 点击两次“打开 App 自动翻译粘贴板单词”
//        driver.findElementByXPath("//android.widget.TextView[@text='打开 App 自动翻译粘贴板单词']").click();
//        driver.findElementByXPath("//android.widget.TextView[@text='打开 App 自动翻译粘贴板单词']").click();
//        // 点击“开启定时背单词”
//        driver.findElementByXPath("//android.widget.TextView[@text='开启定时背单词']").click();
//        // 选择不同的背单词提示间隔时间
//        for (String text : Arrays.asList("半分钟", "1分钟", "3分钟", "5分钟", "10分钟", "半小时")) {
//            driver.findElementByXPath("//android.widget.TextView[@text='背单词提示间隔时间']").click();
//            driver.findElementByXPath("//android.widget.CheckedTextView[@text='" + text + "']").click();
//        }
//        // 选择不同的提示显示时间
//        for (String text : Arrays.asList("2秒", "3秒", "4秒", "6秒", "10秒")) {
//            driver.findElementByXPath("//android.widget.TextView[@text='提示显示时间']").click();
//            driver.findElementByXPath("//android.widget.CheckedTextView[@text='" + text + "']").click();
//        }
//        // 再次点击“开启定时背单词”
//        driver.findElementByXPath("//android.widget.TextView[@text='开启定时背单词']").click();
//        // 点击两次“开启单词联想输入”
//        driver.findElementByXPath("//android.widget.TextView[@text='开启单词联想输入']").click();
//        driver.findElementByXPath("//android.widget.TextView[@text='开启单词联想输入']").click();
        // 回到主页面
        driver.findElementByXPath("//android.widget.ImageButton[@content-desc='转到上一层级']").click();

        /* 测试“更多选项”中的其他按钮 */
        // 点击“更多选项”按钮
        driver.findElementById("android:id/input").click();
        driver.findElementByXPath("//android.widget.ImageView[@content-desc='更多选项']").click();
        // 点击支持作者
        driver.findElementByXPath("//android.widget.TextView[@text='支持作者']").click();
        // 点击关闭
        driver.findElementByXPath("//android.widget.Button[@text='关闭']").click();
        // 点击“更多选项”按钮
        driver.findElementById("android:id/input").click();
        driver.findElementByXPath("//android.widget.ImageView[@content-desc='更多选项']").click();
        // 点击去评分
        driver.findElementByXPath("//android.widget.TextView[@text='去评分']").click();
        // 点击“更多选项”按钮
        driver.findElementById("android:id/input").click();
        driver.findElementByXPath("//android.widget.ImageView[@content-desc='更多选项']").click();
        // 点击关于
        driver.findElementByXPath("//android.widget.TextView[@text='关于(1.8.0)']").click();
        // 回到主页面
        driver.findElementByXPath("//android.widget.ImageButton[@content-desc='转到上一层级']").click();
    }

    /**
     * AppiumDriver 的初始化逻辑必须写在该函数中
     *
     * @return The AppiumDriver instance.
     */
    public AppiumDriver initAppiumTest() {
        AppiumDriver driver = null;
        File classpathRoot = new File(System.getProperty("user.dir"));
        File appDir = new File(classpathRoot, "apk");
        File app = new File(appDir, "GuDong.apk");

        // 设置自动化相关参数
        DesiredCapabilities capabilities = new DesiredCapabilities();
        capabilities.setCapability("browserName", "");
        capabilities.setCapability("platformName", "Android");
        capabilities.setCapability("deviceName", "Android Emulator");
        capabilities.setCapability("appPackage", "name.gudong.translate");
        capabilities.setCapability("appActivity", "name.gudong.translate.ui.activitys.MainActivity");
        capabilities.setCapability("noSign", "true");

        // 设置 apk 路径
        capabilities.setCapability("app", app.getAbsolutePath());

        // 设置使用 unicode 键盘，支持输入中文和特殊字符
        capabilities.setCapability("unicodeKeyboard", "true");
        // 设置用例执行完成后重置键盘
        capabilities.setCapability("resetKeyboard", "true");

        // 初始化
        try {
            driver = new AppiumDriver(new URL("http://127.0.0.1:4723/wd/hub"), capabilities);
        } catch (MalformedURLException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return driver;
    }

    public void start() {
        test(initAppiumTest());
    }
}
