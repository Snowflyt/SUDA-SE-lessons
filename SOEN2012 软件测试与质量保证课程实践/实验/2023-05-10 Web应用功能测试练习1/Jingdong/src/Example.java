import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

import java.util.Arrays;
import java.util.List;

public class Example {
    public static void test(WebDriver driver) {
        driver.get("Https://www.jd.com/");

        /* Change location */
        WebElement areaElement = driver.findElement(By.id("areamini"));
        areaElement.click();
        WebElement taiwanButton = driver
                .findElement(By.xpath("//*[@id=\"ttbar-mycity\"]/div/div[2]/div/div/div[33]/a"));
        taiwanButton.click();

        /* Search */
        WebElement inputElement = driver.findElement(By.id("key"));
        inputElement.sendKeys("家具");
        WebElement searchButton = driver.findElement(By.xpath("//*[@id=\"search\"]/div/div[2]/button"));
        searchButton.click();

        /* Filter search result */
        List<String> classifications = Arrays.asList("源氏木语", "边桌/茶几", "111-120cm", "可储物", "实木");
        for (String classification : classifications) {
            WebElement filterElement = driver.findElement(By.linkText(classification));
            filterElement.click();
        }

        // To avoid security check.
        wait(2000);

        List<String> sortTypes = Arrays.asList("新品", "综合", "销量", "评论数");
        for (String sortType : sortTypes) {
            WebElement sortElement = driver.findElement(By.linkText(sortType));
            sortElement.click();
            wait(1000);
        }

        /* Enter detail page */
        WebElement resultElement = driver.findElement(By.xpath("//*[@id=\"J_goodsList\"]/ul/li[1]/div/div[1]/a/img"));
        resultElement.click();

        driver.switchTo().window(driver.getWindowHandles().toArray()[1].toString());

        /* View detail */
        WebElement filterElement = driver.findElement(By.linkText("原木色四抽茶几1.05米"));
        filterElement.click();

        WebElement detailTabElement1 = driver.findElement(By.xpath("//*[@id=\"detail\"]/div[1]/ul/li[2]"));
        detailTabElement1.click();
        WebElement detailTabElement2 = driver.findElement(By.xpath("//*[@id=\"detail\"]/div[1]/ul/li[4]"));
        detailTabElement2.click();
        WebElement detailTabElement3 = driver.findElement(By.xpath("//*[@id=\"detail\"]/div[1]/ul/li[5]"));
        detailTabElement3.click();

        /* Enter main page */
        driver.switchTo().window(driver.getWindowHandles().toArray()[0].toString());

        wait(1000);

        /* Open supermarket page */
        WebElement supermarketElement = driver.findElement(By.linkText("超市"));
        supermarketElement.click();

        wait(1000);

        /* Close detail page */
        driver.switchTo().window(driver.getWindowHandles().toArray()[1].toString());
        wait(1000);
        driver.close();

        wait(1000);

        /* Close supermarket page */
        driver.switchTo().window(driver.getWindowHandles().toArray()[1].toString());
        wait(1000);
        driver.close();

        wait(1000);
    }

    private static void wait(int milliseconds) {
        try {
            Thread.sleep(milliseconds);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    public static void main(String[] args) {
        // Run main function to test your script.
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
