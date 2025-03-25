#include <stdio.h>
#include <stdlib.h>
// a struct for a singular node of a linked list
typedef struct _ListNode {
    int data; // data stored is an integer value
    struct _ListNode* next; // singly linked list

    // struct _ListNode* prev; // doubly linked list
} ListNode;

// a list struct to store the head and the tail of a list, as well as the size
typedef struct _List { 
    ListNode* head;
    ListNode* tail;
    int size;
} List;

// typically, we either will append to the end of a linked list (tail), or to the beginning (head)
void append_tail(List* list, int value) {
    // create new node
    ListNode* new_node = malloc(sizeof(*new_node));
    if (new_node == NULL) {
        printf("Error: unable to malloc space for new node.\n");
        return;
    }
    *new_node = (ListNode) { .next = NULL, .data = value };

    // add new node to end of list
    if (list->head == NULL) {
        list->head = new_node;
    }
    else {
        list->tail->next = new_node;
    }
    list->tail = new_node;
    list->size++;
}

void append_head(List* list, int value) {
    ListNode* new_node = malloc(sizeof(*new_node));
    if (new_node == NULL) {
        printf("Error: unable to malloc space for new node.\n");
        return;
    }
    // make the new node the new head
    new_node->next = list->head;
    new_node->data = value;
    list->head = new_node;

    // if tail is NULL (list empty) then update to be the new element
    if (list->tail == NULL) {
        list->tail = new_node;
    }
    list->size++;
}

// this function could parse an array of values -- similar to how the visualizer works
List arr_to_list(int* arr, int size) {
    List list = { .head = NULL, .tail = NULL, .size = 0 };
    for (int i = 0; i < size; i++) {
        append_tail(&list, arr[i]); // append each element to the list
    }
    return list;
}

void free_list(List list) {
    ListNode* curr_node = list.head;
    while(curr_node != NULL) {
        ListNode* next_node = curr_node->next;
        free(curr_node);
        curr_node = next_node;
        list.size--;
    }

    // sanity check -> after freeing all nodes, list size should be zero
    if (list.size != 0) {
        printf("Error: list size does not match number of nodes found\n");
    }
}
int main(void) {
    
    return EXIT_SUCCESS;
}