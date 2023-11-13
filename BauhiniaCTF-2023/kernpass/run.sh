#!/bin/bash

pushd fs
find . -print0 | cpio --null -ov --format=newc > ../rootfs.cpio
popd


qemu-system-x86_64 \
    -m 128M \
    -nographic \
    -kernel $PWD/bzImage \
    -append "console=ttyS0 quiet oops=panic panic=1 pti=on kaslr" \
    -no-reboot \
    -cpu kvm64,+smap,+smep \
    -s \
    -monitor /dev/null \
    -initrd $PWD/rootfs.cpio \
