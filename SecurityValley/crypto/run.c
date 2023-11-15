#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <sys/types.h>

u_int32_t encodeChar(unsigned char *s) {

    u_int32_t result = 0;

    unsigned int ln = (int) s & 0x0F;
    unsigned int hn = (int) s >> 4 & 0x0F;

    u_int8_t x = 0;
    u_int8_t y = 0;

    if(hn <= 9) {
        x = 11;
    } else {
        x = 26;
    }

    if(ln <= 9) {
        y = 14;
    } else {
        y = 26;
    }

    if(hn > 9) {
        hn -= 9;
    }

    if(ln > 9) {
        ln -= 9;
    }


    result |= 0x0E;
    result = result << 6;

    result |= y;
    result = result << 4;

    result |= ln;
    result = result << 6;

    result |= x;
    result = result << 4;

    result |= hn;

    return result;
}

unsigned char decodeChar(u_int32_t encodedValue) {
    unsigned char result = 0;

    // Extract the bits from the encoded value
    unsigned int ln = encodedValue & 0x0F;
    encodedValue = encodedValue >> 4;
    unsigned int hn = encodedValue & 0x0F;
    
    // Reverse the adjustments made in the encoder function
    if (hn > 0) {
        hn += 9;
    }

    if (ln > 0) {
        ln += 9;
    }

    // Combine hn and ln to form the decoded result
    result = (hn << 4) | ln;

    return result;
}




int main(int argc, char **argv) {
    if (argc != 2) {
        printf("Please provide a cipher text to decode as a command-line argument.\n");
        return 1;
    }

    char *cipherText = argv[1];
    int cipherLength = strlen(cipherText);

    if (cipherLength % 2 != 0) {
        printf("Invalid cipher text length. It should be an even number of characters.\n");
        return 1;
    }

    for (int i = 0; i < cipherLength; i += 2) {
        unsigned int encodedValue;
        sscanf(cipherText + i, "%2x", &encodedValue);
        unsigned char decodedChar = decodeChar(encodedValue);
        printf("%c", decodedChar);
    }

    printf("\n");
}
