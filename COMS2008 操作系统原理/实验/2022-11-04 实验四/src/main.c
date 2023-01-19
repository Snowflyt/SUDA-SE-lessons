#include <stdio.h>
#include <sys/mman.h>
#include <sys/wait.h>
#include <fcntl.h>
#include <unistd.h>
#include <string.h>
#include <stdlib.h>
#include "common.h"
#include "player_a.c"
#include "player_b.c"
#include "referee.c"

int main(int argc, char *argv[])
{
    if (argc != 2)
    {
        printf("Usage: %s <rounds>\n", argv[0]);
        return 1;
    }
    unsigned int rounds = atoi(argv[1]);

    // create shared memory
    int fd = shm_open("game", O_CREAT | O_RDWR, 0666);
    if (fd == -1)
    {
        perror("open shared memory failed");
        return 1;
    }

    // allocate memory
    if (ftruncate(fd, sizeof(game_t)) == -1)
    {
        perror("ftruncate failed");
        return 1;
    }

    game_t *game_ptr = mmap(NULL, sizeof(game_t), PROT_READ | PROT_WRITE, MAP_SHARED, fd, 0);
    if (game_ptr == MAP_FAILED)
    {
        perror("memory map failed");
        return 1;
    }

    // initialize game
    game_ptr->round = 1;
    game_ptr->rounds = rounds;
    game_ptr->player_a.score = 0;
    game_ptr->player_b.score = 0;
    for (unsigned int i = 0; i < rounds; i++)
    {
        game_ptr->player_a.punches[i] = -1;
        game_ptr->player_b.punches[i] = -1;
    }

    // start player_a and player_b
    pid_t pid_a = fork();
    if (pid_a == -1)
    {
        perror("fork failed");
        return 1;
    }
    else if (pid_a == 0)
    {
        return player_a();
    }
    pid_t pid_b = fork();
    if (pid_b == -1)
    {
        perror("fork failed");
        return 1;
    }
    else if (pid_b == 0)
    {
        return player_b();
    }

    // start referee and play game
    pid_t pid_referee = fork();
    if (pid_referee == -1)
    {
        perror("fork failed");
        return 1;
    }
    else if (pid_referee == 0)
    {
        return referee();
    }

    // wait for referee to finish
    int status;
    waitpid(pid_referee, &status, 0);

    // print results
    for (unsigned int i = 0; i < rounds; i++)
    {
        printf("Round %d\n", i + 1);
        printf("Player A: %s, Player B: %s\n",
               punch_to_string(game_ptr->player_a.punches[i]),
               punch_to_string(game_ptr->player_b.punches[i]));
        if (game_ptr->results[i] == 1)
        {
            printf("Player A wins\n");
        }
        else if (game_ptr->results[i] == -1)
        {
            printf("Player B wins\n");
        }
        else
        {
            printf("Draw\n");
        }
    }

    // print final score
    printf("\nFinal score\n");
    printf("Player A: %d, Player B: %d\n", game_ptr->player_a.score, game_ptr->player_b.score);
    if (game_ptr->player_a.score > game_ptr->player_b.score)
    {
        printf("Player A wins\n");
    }
    else if (game_ptr->player_a.score < game_ptr->player_b.score)
    {
        printf("Player B wins\n");
    }
    else
    {
        printf("Draw\n");
    }

    return 0;
}
