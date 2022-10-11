#!/bin/bash
get_pid=$(ps -ef|grep node|awk '{print $2}')
filter_pid=' ' read -ra pids<<<"$get_pid"
sudo kill -9 ${pids[0]}
ps -ef|grep node
