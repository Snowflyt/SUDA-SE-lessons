#include <stdio.h>
#include <sys/mman.h>
#include <fcntl.h>
#include <unistd.h>
#include <stdlib.h>
#include "common.h"

int referee(void)
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
    while (game_ptr->round <= game_ptr->rounds)
    {
        // wait until player a and b have punched
        while (game_ptr->player_a.punches[game_ptr->round - 1] == -1 ||
               game_ptr->player_b.punches[game_ptr->round - 1] == -1)
            ;
        // compare punches
        enum punch punch_a = game_ptr->player_a.punches[game_ptr->round - 1];
        enum punch punch_b = game_ptr->player_b.punches[game_ptr->round - 1];
        int result = compare_punches(punch_a, punch_b);
        // update score
        if (result == 1)
        {
            game_ptr->player_a.score++;
        }
        else if (result == -1)
        {
            game_ptr->player_b.score++;
        }
        // save result
        game_ptr->results[game_ptr->round - 1] = result;
        // next round
        game_ptr->round++;
    }

    return 0;
}
