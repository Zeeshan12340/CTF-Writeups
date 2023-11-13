# Crafting

Looking at the binary, we see that it takes a file as input and then runs that file using `memfd`_create` and `fexecve`. This means that we can create a file in memory and then run it but the challenge is that the file has to be less than or equal to 32 bytes in size. At first, I started trying to create this file but then I realized that the binary does not check if the file is an elf file and we can simply give a shebang line and it will treat it as a file.

One liner simple solution:
```bash
echo -e '#!/bin/cat flag.txt' | nc amt.rs 31178
```
