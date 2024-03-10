package net.mooctest;

public class Trie {

    private int SIZE = 26;
    private TrieNode root;// 字典树的根

    class TrieNode // 字典树节点
    {
        private int num;// 有多少单词通过这个节点,即由根至该节点组成的字符串模式出现的次数
        private TrieNode[] son;// 所有的儿子节点
        private boolean isEnd;// 是不是最后一个节点
        private char val;// 节点的值

        TrieNode() {
            num = 1;
            son = new TrieNode[SIZE];
            isEnd = false;
        }
    }

    Trie() // 初始化字典树
    {
        root = new TrieNode();
    }

    // 建立字典树
    public void insert(String str) // 在字典树中插入一个单词
    {
        if (str == null || str.length() == 0) {
            return;
        }
        TrieNode node = root;
        char[] letters = str.toCharArray();// 将目标单词转换为字符数组
        for (int i = 0, len = str.length(); i < len; i++) {
            int pos = letters[i] - 'a';
            if (node.son[pos] == null) // 如果当前节点的儿子节点中没有该字符，则构建一个TrieNode并复值该字符
            {
                node.son[pos] = new TrieNode();
                node.son[pos].val = letters[i];
            } else // 如果已经存在，则将由根至该儿子节点组成的字符串模式出现的次数+1
            {
                node.son[pos].num++;
            }
            node = node.son[pos];
        }
        node.isEnd = true;
    }

    // 计算单词前缀的数量
    public int countPrefix(String prefix) {
        if (prefix == null || prefix.length() == 0) {
            return -1;
        }
        TrieNode node = root;
        char[] letters = prefix.toCharArray();
        for (int i = 0, len = prefix.length(); i < len; i++) {
            int pos = letters[i] - 'a';
            if (node.son[pos] == null) {
                return 0;
            } else {
                node = node.son[pos];
            }
        }
        return node.num;
    }

    // 打印指定前缀的单词
    public String hasPrefix(String prefix) {
        if (prefix == null || prefix.length() == 0) {
            return null;
        }
        TrieNode node = root;
        char[] letters = prefix.toCharArray();
        for (int i = 0, len = prefix.length(); i < len; i++) {
            int pos = letters[i] - 'a';
            if (node.son[pos] == null) {
                return null;
            } else {
                node = node.son[pos];
            }
        }
        preTraverse(node, prefix);
        return null;
    }

    // 遍历经过此节点的单词.
    public void preTraverse(TrieNode node, String prefix) {
        if (!node.isEnd) {
            for (TrieNode child : node.son) {
                if (child != null) {
                    preTraverse(child, prefix + child.val);
                }
            }
            return;
        }
        System.out.println(prefix);
    }

    // 在字典树中查找一个完全匹配的单词.
    public boolean has(String str) {
        if (str == null || str.length() == 0) {
            return false;
        }
        TrieNode node = root;
        char[] letters = str.toCharArray();
        for (int i = 0, len = str.length(); i < len; i++) {
            int pos = letters[i] - 'a';
            if (node.son[pos] != null) {
                node = node.son[pos];
            } else {
                return false;
            }
        }
        // 走到这一步，表明可能完全匹配，可能部分匹配，如果最后一个字符节点为末端节点，则是完全匹配，否则是部分匹配
        return node.isEnd;
    }

    // 前序遍历字典树.
    public void preTraverse(TrieNode node) {
        if (node != null) {
            System.out.print(node.val + "-");
            for (TrieNode child : node.son) {
                preTraverse(child);
            }
        }
    }

    public TrieNode getRoot() {
        return this.root;
    }

}
