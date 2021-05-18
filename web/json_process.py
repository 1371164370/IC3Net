import os
import json
import sys

SIMPLE_SPREAD=0
TRAFFIC_JUNCTION=1
# 遍历得到文件夹下的所有文件
class AllFile:
    def __init__(self,path) -> None:
        self.path=path
    def get_file_list(self):
        file_list =[]
        self.__file_in_dir_iter(self.path,file_list)
        return file_list
    def __file_in_dir_iter(self,path,file_list):
        for name in os.listdir(path):
            p = os.path.join(path, name)
            if os.path.isfile(p):
                file_list.append(p) 
            else:
                self.__file_in_dir_iter(p,file_list)
def refresh_param(game,key,value):
    '''
    example -- refresh_param(SIMPLE_SPREAD,"--load",AllFile("models").get_file_list())
    key -- 参数名
    value --  列表
    '''
    with open('./web/static/source/data/game_param.json') as f:
        data=json.load(f)
    with open('./web/static/source/data/game_param.json','w') as f:
        data["games"][game]["params"][key]=value  
        json.dump(data,f,indent=4)   


