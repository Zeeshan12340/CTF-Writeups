#include <stdlib.h>
#include <stdio.h>
#include <unistd.h>

int main(int argc, char* argv[])
{
    long my_value = 0;
    long my_ptr = &my_value;

    printf("my_value equals: %lx", my_value);
    printf("\nPrinting format string...");
    printf("%083c%1$hhn", my_ptr+0);
    printf("%085c%1$hhn", my_ptr+1);
    printf("%244c%1$hhn", my_ptr+2);
    printf("%112c%1$hhn", my_ptr+3);
    printf("%031c%1$hhn", my_ptr+4);
    printf("%086c%1$hhn", my_ptr+5);
    printf("%000c%1$hhn", my_ptr+6);
    printf("%000c%1$hhn", my_ptr+7);

    printf("\n");
    printf("my_value equals: %lx", my_value);

    return 0;
}