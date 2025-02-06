#ifndef __STACK_H__
#define __STACK_H__

typedef struct _Stack {
    int* stack; // array used to store the stack
    int top; // index of the top of the stack
    int buffer_size; // current amount of memory allocated to stack
} Stack;

void init_stack(Stack* s);
void push(Stack* s, int value);
int pop(Stack* s);
#endif /* __STACK_H__ */