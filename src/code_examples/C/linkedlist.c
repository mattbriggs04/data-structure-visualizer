#include <stdio.h>
#include <stdlib.h>

typedef struct _ListNode {
    int value;
    struct _ListNode* next; // singly linked list
    // struct _ListNode* prev; // doubly linked list
} ListNode;

typedef struct _List {
    ListNode* head;
    ListNode* tail;
    int size;
} List;

int main(void) {
    
    return EXIT_SUCCESS; // 0
}