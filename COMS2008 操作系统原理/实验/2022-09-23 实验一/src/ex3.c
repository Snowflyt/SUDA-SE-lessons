#include <stdio.h>
#include <unistd.h>
#include <sys/wait.h>

int main(void)
{
    int status = 0;

    for (int i = 0; i < 2; i++)
    {
        if (fork() == 0)
        {
            printf("Child: The parent pid is %d, the current pid is %d\n", getppid(), getpid());
        }
        else
        {
            printf("Parent: The process pid is %d\n", getpid());
            wait(&status);
        }
    }

    return 0;
}
