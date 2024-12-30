#include <iostream>
#include <stdio.h>
#include <string>
#include <vector>
using namespace std;

struct Node{
    string name;
    Node* father;
    Node(string n){
        name = n;
        father = NULL;
    }
};

class FamilyTree{
private:
    vector<Node*> nodes;

public:
    FamilyTree(int n){
        string name;
        getline(cin, name);
        int lastCnt = 0;
        Node *p = new Node(name);
        nodes.push_back(p);
        for(int i = 1; i < n; i ++){
            getline(cin, name);
            int cnt = 0;
            while(name[cnt] == ' ') cnt ++;
            string finName;
            for(int j = cnt; j < name.size(); j ++) finName.push_back(name[j]);
            Node *tmp = new Node(finName);
            if(cnt > lastCnt){
                tmp->father = p;
            }else{
                int gen = lastCnt - cnt + 1;
                while(gen --) p = p->father;
                tmp->father = p;
            }
            lastCnt = cnt;
            p = tmp;
            nodes.push_back(tmp);
        }
    }

    ~FamilyTree(){
        for(int i = 0; i < nodes.size(); i ++){
            delete nodes[i];
        }
    }

    Node* search(string name){
        for(int i = 0; i < nodes.size(); i ++){
            if(nodes[i]->name == name) return nodes[i];
        }
        return NULL;
    }

    bool readAndJudge(){
        string nameA, nameB, relationship;
        string more;
        cin >> nameA >> more >> more >> relationship >> more >> nameB;
        nameB.pop_back();
        Node *A = search(nameA);
        Node *B = search(nameB);
        if(relationship == "child"){
            if(A->father == B) return true;
            else return false;
        }
        if(relationship == "parent"){
            if(B->father == A) return true;
            else return false;
        }
        if(relationship == "sibling"){
            if(A->father == B->father) return true;
            else return false;
        }
        if(relationship == "descendant"){
            while(A->father){
                A = A->father;
                if(A == B) return true;
            }
            return false;
        }
        if(relationship == "ancestor"){
            while(B->father){
                B = B->father;
                if(A == B) return true;
            }
            return false;
        }
        return false;
    }

    void out(){
        for(int i = 0; i < nodes.size(); i ++){
            cout << nodes[i]->name << "'s father is " 
            << (nodes[i]->father == NULL ? "None" : nodes[i]->father->name) << endl;
        }
    }
};

int main(){

    int n, m;
    while(cin >> n >> m){
        if(n == 0 && m == 0) break;
        getchar();
        FamilyTree ft(n);
        for(int i = 0; i < m; i ++){
            if(ft.readAndJudge()) cout << "True" << endl;
            else cout << "False" << endl;
        }
        cout << endl;
    }

    return 0;
}
