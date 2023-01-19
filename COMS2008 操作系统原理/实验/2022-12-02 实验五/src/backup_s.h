#include <fcntl.h>
#include <stdio.h>
#include <unistd.h>
#define BUFSIZE 8

/**
 * Reads source.dat and writes it to target.dat (using system calls)
 * @return 0 if successful, -1 if unable to open source.dat or target.dat.
 */
int backup_s(void)
{
    int source = open("source.dat", O_RDONLY);
    if (source == -1)
    {
        printf("Unable to open source.dat\n");
        return -1;
    }
    int target = open("target.dat", O_WRONLY | O_CREAT, S_IRUSR | S_IWUSR);
    if (target == -1)
    {
        printf("Unable to open target.dat\n");
        close(source);
        return -1;
    }

    char buffer[BUFSIZE];
    ssize_t bytes_read;
    while ((bytes_read = read(source, buffer, BUFSIZE)) > 0)
    {
        write(target, buffer, bytes_read);
    }

    close(source);
    close(target);

    return 0;
}
