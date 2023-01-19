package cn.enilu.flash.dao.accountinfo;

import cn.enilu.flash.bean.entity.accountinfo.AccountInfo;
import cn.enilu.flash.dao.BaseRepository;

import java.util.Optional;

public interface AccountInfoRepository extends BaseRepository<AccountInfo, Long> {
    Optional<AccountInfo> findByAccountNumber(String accountNumber);
}

