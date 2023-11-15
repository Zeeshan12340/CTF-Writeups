import pwn
import time
import warnings

warnings.filterwarnings(action='ignore', category=BytesWarning)

elf = pwn.ELF("./encryptinator")
pwn.context.binary = elf
# pwn.context.log_level = "DEBUG"
pwn.context(terminal=['tmux', 'split-window', '-h'])

libc = elf.libc
p = elf.process()
# p = pwn.gdb.debug(
#     ['./encryptinator'],
#     """b *randomize+99
# break *encrypt+157""",
# )

# p = pwn.remote("tamuctf.com", 443, ssl=True, sni="encryptinator")

# buffer = 0x7FFD8D9A2170
# key = 0x7FFD8D9A14F0
# iv = 0x7FFD8D9A1578

iv = 0x7FFD71E4E8B8
buffer = 0x7FFD71E4F4B0
key = 0x7FFD71E4E830

#print(f"{iv-buffer=}")
#print(f"{key-buffer=}")

p.sendlineafter(">", "1")
p.sendlineafter("encrypt: ", "\x40\x00")

p.sendlineafter(">", "2")
p.sendlineafter("31): ", str(iv - buffer))
p.recvuntil("flag:\n")
iv_str = p.recvline().strip().decode()
#print(f"{iv_str=}")

p.sendlineafter(">", "2")
p.sendlineafter("31): ", str(key - buffer))
p.recvuntil("flag:\n")
key_str = p.recvline().strip().decode()
#print(f"{key_str=}")

p.sendlineafter(">", "2")
p.sendlineafter("31): ", "0")
p.recvuntil("flag:\n")
ct_str = p.recvline().strip().decode()
print(f"{ct_str=}")


iv = bytes.fromhex(iv_str[0:16])
key = bytes.fromhex(key_str)
ct = bytes.fromhex(ct_str)

print(pwn.xor(ct, key, iv)[:100])

p.interactive()
