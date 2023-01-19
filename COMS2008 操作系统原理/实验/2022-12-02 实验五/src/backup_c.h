#include <stdio.h>
#define BUFSIZE 8

/**
 * Reads source.dat and writes it to target.dat (using C library functions)
 * @return 0 if successful, -1 if unable to open source.dat or target.dat.
 */
int backup_c(void)
{
    FILE *source = fopen("source.dat", "r");
    if (source == NULL)
    {
        printf("Error: Unable to open source.dat\n");
        return -1;
    }
    FILE *target = fopen("target.dat", "w");
    if (target == NULL)
    {
        printf("Error: Unable to open target.dat\n");
        fclose(source);
        return -1;
    }

    char buffer[BUFSIZE];
    size_t bytes_read;
    while ((bytes_read = fread(buffer, sizeof(char), BUFSIZE, source)) > 0)
    {
        fwrite(buffer, sizeof(char), bytes_read, target);
    }

    fclose(source);
    fclose(target);

    return 0;
}
