import os

def parseJsonParams(json_params):
    param_list=[]
    for param in json_params:
        if(json_params[param]=="false" or json_params[param]==''):
            continue
        elif(json_params[param]=='true'):
            param_list.append(param)

        else:
            param_list.append(param)
            param_list.append(json_params[param])
    
    param_line=" ".join(param_list)
    print(param_line)
    return param_line

def run_ic3net(json_params):
    param_line=parseJsonParams(json_params)
    print("Running")
    os.system("python ./main.py %s"%param_line)
