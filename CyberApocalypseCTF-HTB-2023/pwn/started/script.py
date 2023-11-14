from pwn import *

io = process("./gs")

payload = b"A"*40

io.interactive()