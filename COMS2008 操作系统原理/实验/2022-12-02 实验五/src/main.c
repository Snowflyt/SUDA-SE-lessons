#include <stdio.h>
#include "backup_c.h"
#include "backup_s.h"

int main(int argc, char *argv[])
{
    if (argc != 2)
    {
        printf("Usage:\n");
        printf("%s c -- backup source.dat using C library functions\n", argv[0]);
        printf("%s s -- backup source.dat using system calls\n", argv[0]);
    }

    if (argv[1][0] == 'c')
    {
        backup_c();
    }
    else if (argv[1][0] == 's')
    {
        backup_s();
    }
    else
    {
        printf("Invalid option: %s\n", argv[1]);
    }

    return 0;
}
