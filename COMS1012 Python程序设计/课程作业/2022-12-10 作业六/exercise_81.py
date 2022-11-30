"""题目：
设计一个购物小程序。有一组商品，名称和单价存放在一个字典中。编写程序，按照商
品名称排序输出商品选择菜单，内容包括序号、商品名称和单价。通过键盘输入序号，
输入商品序号则对应商品加入购物车，然后继续输入序号，直到输入0代表结算。结算
时显示购物车的所有商品信息，包括商品名称、单价、购买数量和小计金额，以及所有
购物车内商品的总价。
"""


def assignment81(goods: dict[int, tuple[str, float]]) -> None:
    """购物小程序"""

    # step1: 打印商品信息
    print('序号\t商品名称\t单价')
    for key, good in goods.items():
        print(f'{key}\t{good[0]}\t\t{good[1]}')

    # step2: 键盘输入序号
    key = int(input('请输入商品序号: '))

    # step3: 通过序号查找商品，并加入购物车，直到输入0代表结束
    cart: dict[int, int] = {}
    while key != 0:
        # 通过序号查找商品
        if key not in goods:
            print('商品不存在，请重新输入')
            continue
        # 加入购物车
        cart[key] = cart.get(key, 0) + 1
        # 继续输入序号
        key = int(input('请输入商品序号: '))

    # step4: 结束后，显示所有购物车的信息 包括商品名称、单价、购买数量和小计金额，以及所有购物车内商品的总价
    print('商品名称\t单价\t购买数量\t小计金额')
    total: float = 0
    for good_id, amount in cart.items():
        name, price = goods[good_id]
        total += price * amount
        print(f'{name}\t\t{price}\t\t{amount}\t\t{price * amount}')
    print(f'总价: {total}')


if __name__ == '__main__':
    good_list = ['cola', 'chips', 'pen', 'toy']
    price_list: list[float] = [3, 5, 2, 10]
    id_list = [1, 2, 3, 4]
    dct = dict(zip(id_list, zip(good_list, price_list)))
    assignment81(dct)
