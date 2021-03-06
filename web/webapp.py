import enum
from logging import debug
import subprocess
from sys import meta_path
from flask import Flask, render_template, request,url_for,jsonify
import json
from flask_socketio import emit,SocketIO
from multiprocessing import Process,Queue
import os
import signal

from proc_ic3net import *
from json_process import *


app = Flask(__name__)
app.jinja_env.variable_start_string = '{{ '
app.jinja_env.variable_end_string = ' }}'
socket=SocketIO(app)

process_list=[]
@app.route('/')
def index():
    with open('./web/static/source/data/game_param.json') as f:
        data=json.load(f)
        return render_template('index.html',**data)

@app.route('/submit',methods=['POST'])
def receive():
    data = json.loads(request.form.get('data'))
    """传回数据实例
        {
        name:['Predator_prey']
        params:{'--env-name': 'simple_spread', '--num-agents': '3'}
        }
    """
    print(data)

    process_list.append(parse_and_run(data))
    print('test')
    return data

@socket.on("render")
def render():
    # print(process_list[0].stdout.readline())
    # process_list[0].stdout.flush()
    with open('./web/static/source/data/render_cache.json') as f:
        data=json.load(f)
    return data

@app.route('/getparams',methods=['POST'])
def sendHandledJson():
    refresh_param(SIMPLE_SPREAD,"--load",AllFile("models").get_file_list())
    with open('./web/static/source/data/game_param.json') as f:
        data=json.load(f)
    gameName = request.form.get('gameName')
    for gameParam in data['games']:
        if(gameParam['name'] == gameName):
            return jsonify(gameParam)
    return -1


@app.route("/killall",methods=['POST']) 
def kill_all_process():
    print("start kill")
    os.system("ps aux|grep main.py|grep -v grep|cut -c 9-15|xargs kill -9")
    os.system("ps aux|grep Xvfb|grep -v grep|cut -c 9-15|xargs kill -9")
    # for i in range(len(process_list)):
    #     p=process_list.pop()
    #     print(p.pid)
    #     # os.killpg(p.pid,signal.SIGTERM)
    #     # p.send_signal(signal.SIGINT)
    #     p.kill()
    return {"pro_num":1}


if __name__ == '__main__':
    subprocess.Popen(["visdom"])
    socket.run(app,debug=True)



   
