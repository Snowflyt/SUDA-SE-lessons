package com.mooctest;

import io.appium.java_client.AppiumDriver;
import org.openqa.selenium.WebElement;
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
    private static void wait(int milliseconds) {
        try {
            Thread.sleep(milliseconds);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    /**
     * 测试左侧抽屉
     */
    private static void testLeftDrawer(AppiumDriver driver) {
        // 打开左侧抽屉
        driver.findElementByXPath("//android.widget.ImageButton[@content-desc='Open navigation drawer']").click();
        // 点击“Create”按钮回到主页面
        driver.findElementById("io.github.gsantner.memetastic:id/design_menu_item_text").click();
    }

    /**
     * 跳过开屏提示
     */
    private static void skipPrompt(AppiumDriver driver) {
        if (driver.findElementsById("android:id/button1").isEmpty()) return;
        driver.findElementById("android:id/button1").click();
    }

    /**
     * 测试顶栏
     */
    private static void testTopBar(AppiumDriver driver) {
        /* 测试 拍照添加图片 按钮 */
        driver.findElementById("io.github.gsantner.memetastic:id/action_picture_from_camera").click();

        /* 测试 搜索 */
        // 点击 搜索 按钮
        driver.findElementById("io.github.gsantner.memetastic:id/search_button").click();
        // 选择 搜索框
        WebElement searchBox = driver.findElementById("io.github.gsantner.memetastic:id/search_src_text");
        // 点击 搜索框
        searchBox.click();
        // 输入搜索内容“obama”
        searchBox.sendKeys("obama");
        // 此时搜索结果应当不为空
        if (driver.findElementsById("io.github.gsantner.memetastic:id/item__square_image__image").isEmpty())
            throw new RuntimeException("搜索结果为空");
        // 然后输入“obamas”
        searchBox.sendKeys("obamas");
        // 此时搜索结果应当为空
        if (!driver.findElementsById("io.github.gsantner.memetastic:id/item__square_image__image").isEmpty())
            throw new RuntimeException("搜索结果不为空");
        // 点击“X”退出搜索（点击两次，因为第一次点击是清空搜索框）
        driver.findElementById("io.github.gsantner.memetastic:id/search_close_btn").click();
        driver.findElementById("io.github.gsantner.memetastic:id/search_close_btn").click();

        /* 测试 选择图片 按钮 */
        driver.findElementById("io.github.gsantner.memetastic:id/action_picture_from_gallery").click();
    }

    /**
     * 测试顶部菜单
     */
    private static void testTopMenu(AppiumDriver driver) {
        List<String> texts = Arrays.asList("Animals", "Cartoon", "Rage", "Other", "Humans");
        for (String text : texts) {
            driver.findElementByXPath("//android.widget.TextView[@text='" + text + "']").click();
        }
        // 等待 2s
        wait(2000);
        // 随便点一下以恢复焦点
        driver.tap(1, 500, 500, 100);
    }

    /**
     * 测试编辑图片
     */
    private static void testEditImage(AppiumDriver driver) {
        // 进入编辑图片界面
        driver.findElementById("io.github.gsantner.memetastic:id/item__square_image__image").click();

        // 测试 分享 按钮
        driver.findElementById("io.github.gsantner.memetastic:id/action_share").click();
        // 点击“Create Meme”
        driver.findElementById("android:id/text1").click();
        // 测试 保存 按钮
        driver.findElementById("io.github.gsantner.memetastic:id/action_save").click();
        // 点击“Share Meme”按钮
        driver.findElementById("android:id/button3").click();
        // 点击“Create Meme”
        driver.findElementById("android:id/text1").click();
        // 再次点击 保存 按钮
        driver.findElementById("io.github.gsantner.memetastic:id/action_save").click();
        // 点击“Keep Editing”
        driver.findElementById("android:id/button2").click();
        // 再次点击 保存 按钮
        driver.findElementById("io.github.gsantner.memetastic:id/action_save").click();
        // 点击“Yes”
        driver.findElementById("android:id/button1").click();

        // 点击调色盘开始编辑
        driver.findElementById("io.github.gsantner.memetastic:id/fab").click();
        // 点击旋转四次
        for (int i = 0; i < 4; i++)
            driver.findElementById("io.github.gsantner.memetastic:id/memecreate__moar_controls__rotate_plus_90deg").click();
        // 拖动“Padding”
        WebElement padding = driver.findElementById("io.github.gsantner.memetastic:id/memecreate__moar_controls__seek_padding_size");
        padding.click();
        driver.swipe(
                padding.getLocation().getX(),
                padding.getLocation().getY(),
                padding.getLocation().getX() + 100,
                padding.getLocation().getY(),
                500
        );
        driver.swipe(
                padding.getLocation().getX() + 100,
                padding.getLocation().getY(),
                padding.getLocation().getX(),
                padding.getLocation().getY(),
                500
        );
        // 点击 Color Picker
        driver.findElementById("io.github.gsantner.memetastic:id/memecreate__moar_controls__color_picker_for_padding").click();
        // 选择一个颜色
        driver.findElementById("io.github.gsantner.memetastic:id/cpv_color_panel_view").click();
        // 点击“Palette”
        driver.findElementById("android:id/button3").click();
        // 选中颜色hex文本框
        driver.findElementById("io.github.gsantner.memetastic:id/cpv_hex").click();
        driver.findElementById("io.github.gsantner.memetastic:id/cpv_hex").sendKeys("000000");
        // 点击“确定”
        driver.findElementById("android:id/button1").click();

        // 再次点击调色盘退出编辑
        driver.findElementById("io.github.gsantner.memetastic:id/fab").click();
        wait(1000);

        // 点一下屏幕中央
        driver.tap(1, 500, 500, 100);
        wait(1000);

        // 点击返回按钮两次
        driver.findElementByXPath("//android.widget.ImageButton[@content-desc='转到上一层级']").click();
        wait(1000);
        driver.findElementByXPath("//android.widget.ImageButton[@content-desc='转到上一层级']").click();
    }

    /**
     * 测试收藏图片
     */
    private static void testStarImage(AppiumDriver driver) {
        // 点击两次“☆”
        driver.findElementById("io.github.gsantner.memetastic:id/item__square_image__image_bottom_end").click();
        wait(1000);
        driver.findElementById("io.github.gsantner.memetastic:id/item__square_image__image_bottom_end").click();

        // 点一下屏幕中央
        driver.tap(1, 500, 500, 100);
        wait(1000);
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
        // 跳过开屏提示
        skipPrompt(driver);

        // 测试左侧抽屉
        testLeftDrawer(driver);
        // 测试顶部菜单
        testTopMenu(driver);

        // 测试编辑图片
        testEditImage(driver);
        // 测试收藏图片
        testStarImage(driver);

        // 测试顶栏
        testTopBar(driver);
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
        File app = new File(appDir, "MemeTastic.apk");

        // 设置自动化相关参数
        DesiredCapabilities capabilities = new DesiredCapabilities();
        capabilities.setCapability("browserName", "");
        capabilities.setCapability("platformName", "Android");
        capabilities.setCapability("deviceName", "Android Emulator");

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
