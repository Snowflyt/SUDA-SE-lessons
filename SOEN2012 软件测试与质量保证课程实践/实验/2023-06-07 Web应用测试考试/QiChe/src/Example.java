import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class Example {
    public static void test(WebDriver driver) {
        driver.get("https://www.autohome.com.cn/");
        driver.manage().window().maximize();
        wait(1000);

        driver.findElement(By.linkText("评测")).click();
        wait(1000);

        driver.switchTo().window((String) driver.getWindowHandles().toArray()[1]);
        wait(500);
        driver.findElement(By.linkText("中型车")).click();
        wait(500);
        driver.findElement(By.linkText("25-35万")).click();
        wait(500);
        driver.findElement(By.xpath("//*[@id=\"__next\"]/div[1]/div[2]/div[6]/div[1]/div[2]/div[2]/div/div[1]/div[1]/div[1]/a/img")).click();
        wait(1000);

        driver.switchTo().window((String) driver.getWindowHandles().toArray()[2]);
        wait(500);
        driver.findElement(By.linkText("动态评价")).click();
        wait(500);
        driver.findElement(By.linkText("安全性评价")).click();
        wait(500);
        driver.findElement(By.linkText("经济性评价")).click();
        wait(500);
        driver.findElement(By.linkText("智能化评价")).click();
        wait(500);
        driver.findElement(By.id("q")).click();
        wait(500);
        driver.findElement(By.id("q")).sendKeys("奥迪");
        wait(500);
        driver.findElement(By.xpath("/html/body/div[2]/div[1]/div/div[1]/div[2]/a")).click();
        wait(1000);

        driver.switchTo().window((String) driver.getWindowHandles().toArray()[3]);
        wait(500);
        driver.findElement(By.linkText("奥迪A6L")).click();
        wait(1000);

        driver.switchTo().window((String) driver.getWindowHandles().toArray()[4]);
        wait(500);
        driver.findElement(By.linkText("参数配置")).click();
        wait(1000);

        driver.switchTo().window((String) driver.getWindowHandles().toArray()[5]);
        wait(500);
        driver.findElement(By.id("Year01")).click();
        wait(500);
        driver.findElement(By.id("green01")).click();
        wait(500);
        driver.findElement(By.id("PL02")).click();
        wait(500);
        driver.findElement(By.id("PL11")).click();
        wait(500);
        driver.findElement(By.id("PL32")).click();
        wait(500);
        driver.findElement(By.id("PL21")).click();
        wait(500);
        driver.findElement(By.id("PL42")).click();
        wait(500);
        driver.findElement(By.xpath("//*[@id=\"navScrollLeft\"]/ul/li[3]/a")).click();
        wait(500);
        driver.findElement(By.xpath("//*[@id=\"navScrollLeft\"]/ul/li[4]/a")).click();
        wait(500);
        driver.findElement(By.xpath("//*[@id=\"navScrollLeft\"]/ul/li[5]/a")).click();
        wait(500);
        driver.findElement(By.xpath("//*[@id=\"navScrollLeft\"]/ul/li[6]/a")).click();
        wait(500);
        driver.findElement(By.xpath("//*[@id=\"navScrollLeft\"]/ul/li[9]/a")).click();
        wait(500);
        driver.findElement(By.xpath("//*[@id=\"navScrollLeft\"]/ul/li[12]/a")).click();
        wait(500);
    }

    @SuppressWarnings({"java:S2142", "java:S112"})
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
