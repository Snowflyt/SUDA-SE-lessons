#include <stdio.h>
#include <unistd.h>
#include <sys/wait.h>

int main(void)
{
    int status;
    char *args[] = {"ls", NULL};

    if (fork() == 0)
    {
        printf("Child: Executing ls...\n");
        execvp(args[0], args);
    }
    else
    {
        wait(&status);
    }

    return 0;
}
