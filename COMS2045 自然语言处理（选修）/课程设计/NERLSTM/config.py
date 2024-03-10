import warnings
from typing import Any, Literal

import torch


class DefaultConfig:
    use_gpu = True
    device: torch.device

    # 使用的模型，名字必须与 models/__init__.py 中的名字一致
    model: Literal['NERLSTM', 'NERLSTM_CRF'] = 'NERLSTM_CRF'
    save_model_path = './model/model_scripted_dropout_0.5.pt'  # 训练模型保存的路径
    log_output_path: str | None = None  # 训练日志保存的路径，为 None 代表不保存

    pickle_path = './renmin_data.pkl'  # 训练集存放路径
    load_model_path: str | None = None  # 加载预训练的模型的路径，为 None 代表不加载

    batch_size = 32  # batch size
    num_workers = 4  # how many workers for loading data
    print_freq = 20  # print info every N batch

    max_epoch = 10
    lr = 0.001  # initial learning rate
    lr_decay = 0.5  # when val_loss increase, lr = lr*lr_decay
    weight_decay = 1e-5  # 损失函数

    embedding_dim = 100
    hidden_dim = 200
    dropout = 0.2

    def _parse(self, **kwargs: Any):
        """
        根据字典kwargs更新config参数
        """

        for k, v in kwargs.items():
            if not hasattr(self, k):
                warnings.warn(f'Warning: options has no attribute {k}')
            setattr(self, k, v)

        options.device = (torch.device('cuda')
                          if options.use_gpu
                          else torch.device('cpu'))

        print('user config:')
        for k, v in self.__class__.__dict__.items():
            if not k.startswith('_'):
                print(k, getattr(self, k))


options = DefaultConfig()
