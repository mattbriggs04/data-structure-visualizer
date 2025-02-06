#include <stdio.h>
#include <assert.h>
#include <stdlib.h>
#include "stack.h"

#define INIT_STACK_SIZE 2

void init_stack(Stack* s) {
    /* initialize stack with an arbitray initial size
    ** allocate memory for stack
    ** set top to -1 (remember, top is an index) */
    s->buffer_size = INIT_STACK_SIZE;
    s->stack = malloc(sizeof( *(s->stack) ) * s->buffer_size);
    assert(s->stack != NULL); // ensure memory is allocated
    s->top = -1;
}

void push(Stack* s, int value) {
    // if the stack is full, need to allocate more space
    if(s->buffer_size == s->top) {
        // allocate double current space (better time complexity than simply incrementing by one)
        s->buffer_size *= 2;
        s->stack = realloc(s->stack, sizeof( *(s->stack) ) * s->buffer_size);
        assert(s->stack != NULL);
    }
    s->stack[++s->top] = value;
}

int pop(Stack* s) {
    assert(s->top > -1); // stack underflow check
    return s->stack[s->top--];
}

void delete_stack(Stack* s) {
    free(s->stack);
    s->stack = NULL;
    s->buffer_size = 0;
    s->top = -1;
}

int main(void) {
    // create and initialize a stack
    Stack stack;
    init_stack(&stack);

    // add elements to stack
    for(int i = 0; i < 10; i++) {
        push(&stack, i * 3);
    }

    // remove elements from the stack
    for(int i = 0; i < 5; i++) {
        int popped_value = pop(&stack);
        printf("%d popped off the stack!\n", popped_value);
    }
    // free stack
    delete_stack(&stack);

    
    return EXIT_SUCCESS;
}