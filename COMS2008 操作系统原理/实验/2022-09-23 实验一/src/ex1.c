#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/types.h>
#include <sys/wait.h>

int main(void)
{
    pid_t childpid = fork();
    int retval;
    int status;

    if (childpid >= 0)
    {
        if (childpid == 0)
        {
            printf("Child: The current pid is %d\n", getpid());
            printf("Child: The parent pid is %d\n", getppid());
            printf("Child: Enter the return value of current process: ");
            scanf("%d", &retval);
            printf("Child: The return value of current process is %d\n", retval);
            printf("Child: Exiting process...\n");
            exit(retval);
        }
        else
        {
            printf("Parent: The current pid is %d\n", getpid());
            printf("Parent: the child pid is %d\n", childpid);
            printf("Parent: Waiting for the return of child process...\n");
            wait(&status);
            printf("Parent: The return value of child process is %d\n", WEXITSTATUS(status));
            printf("Parent: Exiting process...\n");
        }
    }
    else
    {
        printf("Failed to create child process!\n");
    }

    return 0;
}
