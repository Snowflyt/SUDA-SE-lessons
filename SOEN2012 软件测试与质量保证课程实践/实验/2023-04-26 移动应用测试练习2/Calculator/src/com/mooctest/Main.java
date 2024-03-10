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
     * 等待指定时间（毫秒）
     *
     * @param milliseconds 毫秒数
     */
    @SuppressWarnings({"java:S2142", "java:S112"})
    private static void wait(int milliseconds) {
        try {
            Thread.sleep(milliseconds);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
    }

    /**
     * 跳过开屏提示
     */
    private static void skipPrompt(AppiumDriver driver) {
        if (driver.findElementsById("com.jincheng.supercaculator:id/cq").isEmpty()) return;
        driver.findElementById("com.jincheng.supercaculator:id/cq").click();
    }

    /**
     * 测试亲戚称呼计算器
     */
    private static void testRelativeName(AppiumDriver driver) {
        driver.findElementByXPath("//android.widget.TextView[@text='亲戚称呼']").click();

        List<String> ids = Arrays.asList(
                "c6", "cv", "bk", "bj",
                "c4", "ca", "ce", "c8",
                "cf", "c_", "cl", "bo",
                "c5", "c3");
        for (String id : ids) {
            driver.findElementById("com.jincheng.supercaculator:id/" + id).click();
        }

        driver.findElementByXPath("//android.widget.ImageButton").click();
    }

    /**
     * 测试个税计算器
     */
    private static void testPersonalIncomeTax(AppiumDriver driver) {
        driver.findElementByXPath("//android.widget.TextView[@text='个税计算']").click();

        driver.findElementById("com.jincheng.supercaculator:id/et").click();
        driver.findElementById("com.jincheng.supercaculator:id/et").sendKeys("100000");

        driver.findElementById("com.jincheng.supercaculator:id/mm").click();

        driver.findElementById("com.jincheng.supercaculator:id/fe").click();
        driver.findElementById("com.jincheng.supercaculator:id/fe").sendKeys("2000");

        driver.findElementById("com.jincheng.supercaculator:id/eq").click();
        driver.findElementById("com.jincheng.supercaculator:id/eq").sendKeys("5000");

        driver.findElementById("com.jincheng.supercaculator:id/t3").click();
        driver.findElementByXPath("//android.widget.TextView[@text='上海']").click();

        driver.findElementById("com.jincheng.supercaculator:id/tp").click();
        driver.findElementByXPath("//android.widget.TextView[@text='内地5000']").click();

        driver.findElementById("com.jincheng.supercaculator:id/rw").click();
        driver.findElementByXPath("//android.widget.TextView[@text='子女教育']").click();
        driver.findElementById("com.jincheng.supercaculator:id/ez").click();
        driver.findElementById("com.jincheng.supercaculator:id/ez").clear();
        driver.findElementById("com.jincheng.supercaculator:id/ez").sendKeys("5000");
        driver.findElementByXPath("//android.widget.ImageButton").click();

        driver.findElementById("com.jincheng.supercaculator:id/o2").click();
        List<String> ids = Arrays.asList(
                "f4", "fo", "f5", "fp",
                "f3", "fn", "f1", "fl",
                "f2", "fm", "f0", "fk");
        for (String id : ids) {
            driver.findElementById("com.jincheng.supercaculator:id/" + id).click();
            driver.findElementById("com.jincheng.supercaculator:id/" + id).clear();
            driver.findElementById("com.jincheng.supercaculator:id/" + id).sendKeys("1");
        }

        driver.findElementById("com.jincheng.supercaculator:id/bg").click();

        driver.findElementByXPath("//android.widget.ImageButton").click();

        driver.findElementByXPath("//android.widget.TextView[@text='年终奖']").click();

        driver.findElementById("com.jincheng.supercaculator:id/fr").click();
        driver.findElementById("com.jincheng.supercaculator:id/fr").sendKeys("50000");

        driver.findElementById("com.jincheng.supercaculator:id/et").click();
        driver.findElementById("com.jincheng.supercaculator:id/et").sendKeys("10000");

        driver.findElementById("com.jincheng.supercaculator:id/bg").click();

        driver.findElementByXPath("//android.widget.ImageButton").click();

        driver.findElementByXPath("//android.widget.TextView[@text='劳务报酬']").click();

        driver.findElementById("com.jincheng.supercaculator:id/fr").click();
        driver.findElementById("com.jincheng.supercaculator:id/fr").sendKeys("100000");

        driver.findElementById("com.jincheng.supercaculator:id/bg").click();

        driver.findElementByXPath("//android.widget.ImageButton").click();

        driver.findElementByXPath("//android.widget.ImageButton").click();
    }

    /**
     * 测试进制转换
     */
    private static void testBaseConversion(AppiumDriver driver) {
        driver.findElementByXPath("//android.widget.TextView[@text='进制转换']").click();

        driver.findElementById("com.jincheng.supercaculator:id/hw").click();
        driver.findElementById("com.jincheng.supercaculator:id/hw").sendKeys("01");

        driver.findElementById("com.jincheng.supercaculator:id/hu").click();
        driver.findElementById("com.jincheng.supercaculator:id/hu").sendKeys("89");

        driver.findElementById("com.jincheng.supercaculator:id/hx").click();
        driver.findElementById("com.jincheng.supercaculator:id/hx").sendKeys("234567");

        driver.findElementById("com.jincheng.supercaculator:id/hv").click();
        driver.findElementById("com.jincheng.supercaculator:id/hv").sendKeys("ABCDEF");

        driver.findElementById("com.jincheng.supercaculator:id/rk").click();
        driver.findElementById("com.jincheng.supercaculator:id/rl").click();
        driver.findElementById("com.jincheng.supercaculator:id/ri").click();
        driver.findElementById("com.jincheng.supercaculator:id/rj").click();
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
        driver.manage().timeouts().implicitlyWait(8, TimeUnit.SECONDS);

        /*
         * 余下的测试逻辑请按照题目要求进行编写
         */
        skipPrompt(driver);

        // 测试“亲戚称呼”
        testRelativeName(driver);
        // 测试“个税计算”
        testPersonalIncomeTax(driver);
        // 测试“进制转换”
        testBaseConversion(driver);
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
        File app = new File(appDir, "Calculator.apk");

        // 设置自动化相关参数
        DesiredCapabilities capabilities = new DesiredCapabilities();
        capabilities.setCapability("browserName", "");
        capabilities.setCapability("platformName", "Android");
        capabilities.setCapability("deviceName", "Android Emulator");
        capabilities.setCapability("noSign", "true");

        // 设置 apk 路径
        capabilities.setCapability("app", app.getAbsolutePath());

        // 设置 app 的主包名和主类名
        capabilities.setCapability("appPackage", "com.jincheng.supercaculator");
        capabilities.setCapability("appActivity", "com.jincheng.supercaculator.activity.SplashActivity");

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
