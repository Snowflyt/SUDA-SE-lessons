"""题目：
编写一个程序，实现类似urlparse功能，对一个合法的URL地址进行解析，解析后的
每一部分存放到列表中，并按照一定格式进行输出。
例如URL为 http://192.168.1.1:8080/index.html?a=1，解析输出的结果如下：
协议: http
主机域名或IP： 192.168.1.1
端口: 8080
路径: index.html
参数: a=1
"""


def assignment100(url_string: str) -> dict:
    """对URL地址进行解析"""

    protocol, rest = url_string.split("://", maxsplit=1)
    if ':' in rest:
        ip_addr, rest = rest.split(":", maxsplit=1)
        port, rest = rest.split("/", maxsplit=1)
    else:
        ip_addr, rest = rest.split("/", maxsplit=1)
        port = '80'
    path, args = rest.rsplit("?", maxsplit=1)

    return {
        'protocol': protocol,
        'ip': ip_addr,
        'port': port,
        'path': path,
        'args': args
    }


if __name__ == '__main__':
    url = 'http://192.168.1.1:8080/index.html?a=1'
    res = assignment100(url)
    print('协议', res['protocol'])
    print('主机域名或IP', res['ip'])
    print('端口', res['port'])
    print('路径', res['path'])
    print('参数', res['args'])
