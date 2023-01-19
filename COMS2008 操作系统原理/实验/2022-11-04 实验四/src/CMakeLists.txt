cmake_minimum_required(VERSION 3.22)

# set the project name
project(RockPaperScissorsGame)

# specify the C standard
set(CMAKE_C_STANDARD 99)
set(CMAKE_C_STANDARD_REQUIRED True)

# export compilation database
set(CMAKE_EXPORT_COMPILE_COMMANDS True)

# add the executable
add_executable(${PROJECT_NAME} main.c)
