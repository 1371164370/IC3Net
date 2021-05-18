import os
from multiprocessing import Process,Queue, process
from sys import stdout
from types import prepare_class
from ic3net_envs.examples import random_agent
import subprocess


def parseData(data):
    param_list=[]
    for param in data["params"]:
        if(data["params"][param]=="false" or data["params"][param]==''):
            continue
        elif(data["params"][param]=='true'):
            param_list.append(param)

        else:
            param_list.append(param)
            param_list.append(data["params"][param])  
    param_line=" ".join(param_list)
    print(f"param_line:{param_line}")
    return param_list
    # return param_line

def parse_and_run(data):
    '''
    data -- dict
    '''
    # game={
    #     "Predator prey":"xvfb-run -a python ./main.py",
    #     "Traffic junction":"xvfb-run -a python ./main.py",
    # }
    game={
        "Predator prey":["xvfb-run", "-a","python", "./main.py"],
        "Traffic junction":["xvfb-run", "-a", "python" ,"./main.py"],
    }
    param_line_prefix=game[data["name"]]
    print(f"param_line_prefix:{param_line_prefix}")  
    param_line=parseData(data)
    param_line_prefix.extend(param_line)
    print(param_line_prefix)
    print("Running")
    # os.system(f"{param_line_prefix} {param_line}")
    # xvfb-run -a python main.py --env_name traffic_junction --nagents 5 --nprocesses 1 --num_epochs 2000  --display
    # p = subprocess.Popen(f"{param_line_prefix} {param_line}",shell=True)
    p=subprocess.Popen(param_line_prefix)
    return p
