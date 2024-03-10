import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class Example {
    public static void test(WebDriver driver) {
        driver.get("https://www.youku.com/");
        driver.manage().window().maximize();
        wait(1500);

        driver.findElement(By.linkText("电视剧")).click();
        wait(1500);
        driver.findElement(By.xpath("//*[@id=\"app\"]/div[1]/div[2]/div[3]/div/div/div/div[3]/div[1]/a")).click(); // 全部地区
        wait(1500);
        driver.findElement(By.xpath("//*[@id=\"app\"]/div[1]/div[2]/div[1]/div/div/div[3]/div/dl[2]/dd/a[2]")).click(); // 中国香港
        wait(1500);

        driver.findElement(By.linkText("家庭")).click();
        wait(1500);
        driver.findElement(By.linkText("更早")).click();
        wait(1500);
        driver.findElement(By.linkText("全网独播")).click();
        wait(1500);
        driver.findElement(By.linkText("VIP")).click();
        wait(1500);
        driver.findElement(By.linkText("最好评")).click();
        wait(1500);
        driver.findElement(By.linkText("溏心风暴之家好月圆")).click();
        wait(3000);

        driver.switchTo().window((String) driver.getWindowHandles().toArray()[1]);
        wait(3000);
        driver.findElement(By.xpath("//*[@id=\"app\"]/div/div[2]/div[2]/div/div/div[2]/div/div[2]/div[1]/div[1]/p"))
                .click(); // 盲婚哑嫁
        wait(1500);
        driver.findElement(By.xpath("//*[@id=\"app\"]/div/div[2]/div[2]/div/div/div[2]/div/div[4]/p")).click();
        wait(1500);
        driver.findElement(By.linkText("电影")).click();

        wait(3000);
        driver.switchTo().window((String) driver.getWindowHandles().toArray()[2]);
        wait(3000);
        driver.findElement(By.xpath("//*[@id=\"app\"]/div[1]/div[2]/div[3]/div/div/div/div[5]/div[1]/a")).click(); // 所有专辑
        wait(1500);
        driver.findElement(By.xpath("//*[@id=\"app\"]/div[1]/div[2]/div[1]/div/div/div[3]/div/dl[2]/dd/a[1]")).click(); // 内地
        wait(1500);
        driver.findElement(By.linkText("喜剧")).click(); // 相关MV
        wait(1500);
        driver.findElement(By.linkText("独播")).click(); // 相关MV
        wait(1500);
        driver.findElement(By.linkText("2016")).click(); // 相关MV
        wait(1500);
        driver.findElement(By.linkText("免费")).click(); // 相关MV
        wait(1500);
        driver.findElement(By.linkText("热度最高")).click(); // 相关MV
        wait(1500);
        driver.findElement(
                By.xpath("//*[@id=\"app\"]/div[1]/div[2]/div[1]/div/div/div[4]/div/div[1]/div/div/div[1]/a/img"))
                .click(); // 相关MV
        wait(3000);
        driver.switchTo().window((String) driver.getWindowHandles().toArray()[3]);
        wait(3000);
        driver.findElement(By.id("search-input-box")).sendKeys("周星驰"); //
        wait(3000);
        driver.findElement(By.xpath("//*[@id=\"top-header\"]/div/div/div/div/div[1]/div[3]/div[3]")).click(); //
        wait(3000);
        driver.switchTo().window((String) driver.getWindowHandles().toArray()[4]);
        wait(1500);
        driver.findElement(By.xpath("//*[@id=\"app\"]/div/div/div[2]/div/div[1]/div[1]/div[1]/div[1]/div[2]/span[1]"))
                .click(); // 相关MV
        wait(1500);
        driver.findElement(By.xpath(
                "//*[@id=\"app\"]/div/div/div[2]/div/div[1]/div[1]/div[1]/div[2]/div/div/div/ul[2]/li[5]/a/span"))
                .click(); // 相关MV
        wait(1500);
        driver.findElement(By.linkText("蓝光")).click(); // 相关MV
        wait(1500);
        driver.findElement(By.linkText("1990.一本漫画闯天涯")).click(); // 相关MV
        wait(3000);
    }

    @SuppressWarnings({ "java:S2142", "java:S112" })
    private static void wait(int milliseconds) {
        try {
            Thread.sleep(milliseconds);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
    }

    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();

        try {
            test(driver);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }
}
