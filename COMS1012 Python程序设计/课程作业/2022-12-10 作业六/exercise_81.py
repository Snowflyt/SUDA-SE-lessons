"""题目：
设计一个购物小程序。有一组商品，名称和单价存放在一个字典中。编写程序，按照商
品名称排序输出商品选择菜单，内容包括序号、商品名称和单价。通过键盘输入序号，
输入商品序号则对应商品加入购物车，然后继续输入序号，直到输入0代表结算。结算
时显示购物车的所有商品信息，包括商品名称、单价、购买数量和小计金额，以及所有
购物车内商品的总价。
"""


def assignment81(goods: dict[str, float]) -> None:
    """购物小程序"""

    # step1: 将商品信息转换成元组列表
    goods_list = list(goods.items())

    # step2: 对step1产生的商品信息元组列表根据商品名称进行升序排序
    goods_list.sort(key=lambda x: x[0])

    # step3: 商品选择
    # 提示：因为要考虑同一个商品购买多个，所以要考虑购买数量的存储，为此建议用字典表示购物车
    #      字典关键字为商品名称，值为购买商品的数量
    cart = {}
    while True:
        # step3.1: 将排序后的商品信息按顺序显示在屏幕上，内容：商品下标+1,商品名称，商品单价，一行一个商品
        print('序号\t商品名称\t商品单价')
        for index, item in enumerate(goods_list):
            print('{}\t{}\t{}'.format(index + 1, item[0], item[1]))

        # step3.2: 提示用户通过输入商品序号选择商品
        choice = int(input('请输入商品序号: '))

        # step3.3: 如果用户输入0，则退出循环
        if choice == 0:
            break
        else:
            # step4.4 将选择的商品加入购物车
            # 1. 判断购物车中是否已经有该商品
            # 2. 如果没有，将该商品加入购物车，购买数量为1
            # 3. 如果有，购买数量加1
            good_name = goods_list[choice - 1][0]
            cart[good_name] = cart.get(good_name, 0) + 1

    # step4: 选择结束后，显示所有购物车的信息
    # 包括商品名称、单价、购买数量和小计金额，以及购物车内所有商品的总价
    print('商品名称\t单价\t购买数量\t小计金额')
    total = 0
    for good_name, count in cart.items():
        price = goods[good_name]
        total += price * count
        print('{}\t{}\t{}\t{}'.format(good_name, price, count, price * count))
    print('总价: {}'.format(total))


if __name__ == '__main__':
    assignment81({'cola': 3, 'chips': 5, 'pen': 2, 'toy': 10})
