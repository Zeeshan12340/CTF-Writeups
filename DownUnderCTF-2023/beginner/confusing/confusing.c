#include <stdio.h>
#include <stdlib.h>
#include <string.h>

void init() {
    setvbuf(stdout, 0, 2, 0);
    setvbuf(stdin, 0, 2, 0);
}

int main() {
    init();

    short shrt;
    double duble;
    char chr_arr[4];
    int integer; 

    printf("Give me d: ");
    scanf("%lf", &shrt);

    printf("Give me s: ");
    scanf("%d", &chr_arr);

    printf("Give me f: ");
    scanf("%8s", &duble);

    if(integer == -1 && shrt == 13337 && duble == 1.6180339887 && strncmp(chr_arr, "FLAG", 4) == 0) {
        puts("Good job!");
        system("/bin/sh");
    } else {
        puts("Still confused?");
    }
}
