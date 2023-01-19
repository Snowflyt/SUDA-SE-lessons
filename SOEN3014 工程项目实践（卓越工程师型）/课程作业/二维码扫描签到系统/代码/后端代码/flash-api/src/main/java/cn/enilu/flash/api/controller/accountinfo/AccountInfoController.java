package cn.enilu.flash.api.controller.accountinfo;

import cn.enilu.flash.api.controller.BaseController;
import cn.enilu.flash.bean.core.BussinessLog;
import cn.enilu.flash.bean.dto.AccountInfoDto;
import cn.enilu.flash.bean.vo.front.Rets;
import cn.enilu.flash.service.accountinfo.AccountInfoService;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;

@RestController
public class AccountInfoController extends BaseController {
    private final AccountInfoService accountInfoService;

    public AccountInfoController(AccountInfoService accountInfoService) {
        this.accountInfoService = accountInfoService;
    }

    @GetMapping("/accounts")
    public Object getAccounts() {
        return Rets.success(accountInfoService.queryAll());
    }

    @GetMapping("/account/{account-number}")
    public Object getAccount(@PathVariable("account-number") String accountNumber) {
        return Rets.success(accountInfoService.getAccount(accountNumber));
    }

    @PostMapping("/account")
    public Object addAccount(@RequestBody AccountInfoDto accountInfoDto) throws ParseException {
        accountInfoService.addAccount(accountInfoDto.getAccountNumber(), accountInfoDto.getSex(),
                accountInfoDto.getEmail(), accountInfoDto.getName(), accountInfoDto.getBirthDay(),
                accountInfoDto.getPhoneNumber(),accountInfoDto.getRole());
        return Rets.success();
    }


    @PutMapping("/account/{account-number}/{account-email")
    public Object changeAccountEmail(String accountNumber, String email) {
        accountInfoService.changeAccountEmail(accountNumber, email);
        return Rets.success();
    }

    @PutMapping("/account/{account-number}/{account-birthday}")
    public Object changeAccountBirthday(String accountNumber, String birthday) {
        accountInfoService.changeAccountBirthDay(accountNumber, birthday);
        return Rets.success();
    }

    @PostMapping("account/{account-number}/{account-role}")
    public Object setAccountRole(@PathVariable("account-number") String accountNumber,
                                 @PathVariable("account-role") String role) {
        accountInfoService.setAccountRole(accountNumber, role);
        return Rets.success();
    }


    @PutMapping("account/{account-number}/{account-phoneNumber")
    @BussinessLog
    public Object changeAccountPhoneNumber(String accountNumber, String phoneNumber) {
        accountInfoService.changeAccountPhoneNumber(accountNumber, phoneNumber);
        return Rets.success();
    }

    @DeleteMapping("/account/delete/{account-number}")
    public Object deleteAccount(@PathVariable("account-number") String accountNumber) {
        accountInfoService.deleteAccountByAccountNumber(accountNumber);
        return Rets.success();
    }
}
