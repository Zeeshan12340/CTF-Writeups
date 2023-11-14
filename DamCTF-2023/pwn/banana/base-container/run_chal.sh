#!/bin/sh

# no stderr
exec 2>/dev/null

# dir
cd /chal

# timeout after 20 sec
timeout -k1 20 stdbuf -i0 -o0 -e0 ./golden_banana
#           |^ |^^^^^^^^^^^^^^^^^
#           |  + disable buffering
#           + 20s timeout
