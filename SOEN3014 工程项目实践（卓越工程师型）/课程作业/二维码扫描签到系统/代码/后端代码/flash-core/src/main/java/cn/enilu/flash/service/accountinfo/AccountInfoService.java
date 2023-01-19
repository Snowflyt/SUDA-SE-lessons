package cn.enilu.flash.service.accountinfo;

import cn.enilu.flash.bean.entity.accountinfo.AccountInfo;
import cn.enilu.flash.bean.exception.AccountInfoNotFoundException;
import cn.enilu.flash.dao.accountinfo.AccountInfoRepository;
import cn.enilu.flash.service.BaseService;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.text.ParseException;

@Service
public class AccountInfoService extends BaseService<AccountInfo, Long, AccountInfoRepository> {
    private final AccountInfoRepository accountInfoRepository;

    public AccountInfoService(AccountInfoRepository accountInfoRepository) {
        this.accountInfoRepository = accountInfoRepository;
    }

    public void addAccount(String accountNumber, String sex, String email, String name, String birthDay, String phoneNumber,String role) {
        AccountInfo accountInfo = new AccountInfo();
        accountInfo.setAccountNumber(accountNumber);
        accountInfo.setSex(sex);
        accountInfo.setEmail(email);
        accountInfo.setName(name);
        Date date = Date.valueOf(birthDay);
        accountInfo.setBirthDay(date);
        accountInfo.setPhoneNumber(phoneNumber);
        accountInfo.setRole(role);
        insert(accountInfo);
    }

    public Object getAccount(String accountNumber) {
        return accountInfoRepository.findByAccountNumber(accountNumber)
                .orElseThrow(AccountInfoNotFoundException::new);

    }

    public void setAccountRole(String accountNumber, String role) {
        AccountInfo accountInfo = accountInfoRepository.findByAccountNumber(accountNumber)
                .orElseThrow(AccountInfoNotFoundException::new);
        accountInfo.setRole(role);
        insert(accountInfo);
    }

//    public void bindAccount(String accountNumber,Long id){
//        Account account = accountRepository.findByAccountNumber(accountNumber)
//                .orElseThrow(AccountNotFoundException::new);
//        account.setSt_id(id);
//
//    }

    public void changeAccountEmail(String accountNumber, String email) {
        AccountInfo accountInfo = accountInfoRepository.findByAccountNumber(accountNumber)
                .orElseThrow(AccountInfoNotFoundException::new);
        delete(accountInfo.getId());
        accountInfo.setEmail(email);
        insert(accountInfo);
    }

    public void changeAccountBirthDay(String accountNumber, String birthDay) {
        AccountInfo accountInfo = accountInfoRepository.findByAccountNumber(accountNumber)
                .orElseThrow(AccountInfoNotFoundException::new);
        Date date = Date.valueOf(birthDay);
        delete(accountInfo.getId());
        accountInfo.setBirthDay(date);
        insert(accountInfo);
    }

    public void changeAccountPhoneNumber(String accountNumber, String phoneNumber) {
        AccountInfo accountInfo = accountInfoRepository.findByAccountNumber(accountNumber)
                .orElseThrow(AccountInfoNotFoundException::new);
        delete(accountInfo.getId());
        accountInfo.setPhoneNumber(phoneNumber);
        insert(accountInfo);
    }

    public void deleteAccountByAccountNumber(String accountNumber) {
        AccountInfo accountInfo = accountInfoRepository.findByAccountNumber(accountNumber)
                .orElseThrow(AccountInfoNotFoundException::new);
        delete(accountInfo.getId());
    }

}
