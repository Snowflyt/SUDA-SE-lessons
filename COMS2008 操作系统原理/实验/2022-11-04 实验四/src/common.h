#pragma once
#define MAX_SIZE 100000

enum punch
{
    rock,
    paper,
    scissors
};

const char *punch_to_string(enum punch punch)
{
    switch (punch)
    {
    case rock:
        return "rock";
    case paper:
        return "paper";
    case scissors:
        return "scissors";
    default:
        return "unknown";
    }
}

typedef struct player_t
{
    enum punch punches[MAX_SIZE];
    unsigned int score;
} player_t;

typedef struct game_t
{
    unsigned int round;
    unsigned int rounds;
    unsigned int results[MAX_SIZE];
    player_t player_a;
    player_t player_b;
} game_t;

int compare_punches(enum punch punch_a, enum punch punch_b)
{
    if (punch_a == punch_b)
    {
        return 0;
    }
    else if (punch_a == rock && punch_b == scissors)
    {
        return 1;
    }
    else if (punch_a == paper && punch_b == rock)
    {
        return 1;
    }
    else if (punch_a == scissors && punch_b == paper)
    {
        return 1;
    }
    else
    {
        return -1;
    }
}
