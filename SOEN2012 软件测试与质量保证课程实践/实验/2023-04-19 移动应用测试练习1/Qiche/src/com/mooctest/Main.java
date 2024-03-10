package com.mooctest;

import io.appium.java_client.AppiumDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.remote.DesiredCapabilities;

import java.io.File;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
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
            // 等待 30s，待应用完全启动
            Thread.sleep(30000);
        } catch (InterruptedException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

        // 设置尝试定位控件的最长时间为 15s,也就是最多尝试 15s
        driver.manage().timeouts().implicitlyWait(15, TimeUnit.SECONDS);

        /*
         * 余下的测试逻辑请按照题目要求进行编写
         */

        /* 测试顶部菜单栏 */
        List<String> texts = Arrays.asList(
                "推荐", "原创", "车家号", "视频",
                "直播", "图片", "话题", "游记",
                "行情", "口碑", "车友圈"
        );
        List<WebElement> elements = new ArrayList<>(); // 用于存储已经点击过的 element
        for (int i = 0; i < texts.size(); i++) {
            WebElement element = driver.findElementByXPath("//android.widget.TextView[@text='" + texts.get(i) + "']");
            elements.add(element);
            element.click();
            if (i >= 3) {
                // 将当前 element 拖动到前第 3 个 element 的位置
                driver.swipe(
                        element.getLocation().getX(),
                        element.getLocation().getY(),
                        elements.get(i - 3).getLocation().getX(),
                        elements.get(i - 3).getLocation().getY(),
                        1000
                );
            }
        }

        /* 测试底部菜单栏 */
        List<String> ids = Arrays.asList("club", "car", "find", "owner", "article");
        for (String id : ids) {
            driver.findElementById("com.cubic.autohome:id/" + id + "_main_RadioButton").click();
            if ("car".equals(id)) {
                // 点击一下新手引导
                driver.findElementById("com.autohome.main.car:id/iv_main_car_guide_wordtip").click();
            }
        }

        /* 测试搜索框 */
        // 点击搜索按钮
        driver.findElementById("com.autohome.main.article:id/iv_search").click();
        // 选中搜索框
        WebElement searchBox = driver.findElementById("com.autohome.plugin.search:id/fragment_search_keyword_autocompleteview");
        searchBox.click();
        // 输入搜索内容
        searchBox.sendKeys("特斯拉");
        // 点击搜索项
        driver.findElementByXPath("//android.widget.TextView[@text='特斯拉']").click();
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
        File app = new File(appDir, "qichezhijia.apk");

        // 设置自动化相关参数
        DesiredCapabilities capabilities = new DesiredCapabilities();
        capabilities.setCapability("browserName", "");
        capabilities.setCapability("platformName", "Android");
        capabilities.setCapability("deviceName", "Android Emulator");
        capabilities.setCapability("appPackage", "com.cubic.autohome");
        capabilities.setCapability("appActivity", "com.cubic.autohome.LogoActivity");
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
