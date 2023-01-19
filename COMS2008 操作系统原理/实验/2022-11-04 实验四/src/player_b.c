#include <stdio.h>
#include <sys/mman.h>
#include <fcntl.h>
#include <unistd.h>
#include <stdlib.h>
#include "common.h"

int player_b(void)
{
    // get game info from shared memory
    int fd = shm_open("game", O_RDWR, 0666);
    if (fd == -1)
    {
        perror("open shared memory failed");
        return 1;
    }

    game_t *game_ptr = mmap(0, sizeof(game_t), PROT_READ | PROT_WRITE, MAP_SHARED, fd, 0);
    if (game_ptr == MAP_FAILED)
    {
        perror("memory map failed");
        return 1;
    }

    // play game
    srand(getpid());

    while (game_ptr->round <= game_ptr->rounds)
    {
        if (game_ptr->player_b.punches[game_ptr->round - 1] == -1)
        {
            game_ptr->player_b.punches[game_ptr->round - 1] = rand() % 3;
        }
    }

    return 0;
}
