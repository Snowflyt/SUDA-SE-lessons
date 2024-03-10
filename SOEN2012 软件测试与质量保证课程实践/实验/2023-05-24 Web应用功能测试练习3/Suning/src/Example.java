import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

import java.util.concurrent.TimeUnit;

public class Example {
    public static void test(WebDriver driver) {
        driver.get("https://www.suning.com/");
        driver.manage().window().maximize();
        wait(500);

        driver.findElement(By.id("citybName")).click();
        wait(500);
        driver.findElement(By.linkText("镇江")).click();
        wait(500);
        driver.findElement(By.linkText("分类")).click();
        wait(1000);

        driver.switchTo().window((String) driver.getWindowHandles().toArray()[1]);
        wait(500);
        driver.findElement(By.linkText("苏宁家电")).click();
        wait(1000);

        driver.switchTo().window((String) driver.getWindowHandles().toArray()[2]);
        wait(500);
        driver.findElement(By.linkText("挂式空调")).click();
        wait(1000);

        driver.switchTo().window((String) driver.getWindowHandles().toArray()[3]);
        wait(500);
        driver.findElement(By.xpath("//*[@id=\"美的Midea\"]/a/img")).click();
        wait(500);
        driver.findElement(By.xpath("//*[@id=\"3匹\"]/span")).click();
        wait(500);
        driver.findElement(By.linkText("0-7000")).click();
        wait(500);
        driver.findElement(By.xpath("//*[@id=\"0070219008-12112365959\"]/div/div/div[1]/div")).click();
        wait(1000);

        driver.switchTo().window((String) driver.getWindowHandles().toArray()[4]);
        driver.close();
        wait(1000);

        driver.switchTo().window((String) driver.getWindowHandles().toArray()[3]);
        wait(500);
        driver.findElement(By.id("searchKeywords")).click();
        wait(500);
        driver.findElement(By.id("searchKeywords")).clear();
        wait(500);
        driver.findElement(By.id("searchKeywords")).sendKeys("格力空调");
        wait(500);
        driver.findElement(By.id("searchSubmit")).click(); // No point
        wait(1000);

        driver.findElement(By.linkText("家用空调")).click();
        wait(500);
        driver.findElement(By.linkText("2匹")).click();
        wait(500);
        driver.findElement(By.linkText("新3级")).click();
        wait(500);
        driver.findElement(By.linkText("5000-6000")).click();
        wait(500);
        driver.findElement(By.linkText("挂壁式空调")).click();
        wait(500);
        driver.findElement(By.linkText("主卧")).click();
        wait(500);
        driver.findElement(By.xpath("//*[@id=\"0071377307-12226191739\"]/div/div/div[1]/div")).click();
        wait(1000);

        driver.switchTo().window((String) driver.getWindowHandles().toArray()[4]);
        wait(500);
        driver.findElement(By.id("addCart")).click();
        wait(500);
        driver.findElement(By.xpath("/html/body/div[39]/div/div[2]/div/div[1]/a")).click();
        wait(1000);
        driver.findElement(By.linkText("删除")).click();
        wait(500);
        driver.findElement(By.linkText("确定")).click();
        wait(500);
    }

    @SuppressWarnings({"java:S2142", "java:S112"})
    private static void wait(int millis) {
        try {
            Thread.sleep(millis);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
    }

    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);

        try {
            test(driver);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }
}
