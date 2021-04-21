from flask import Flask, render_template, request,url_for,jsonify
import json
from flask_socketio import emit,SocketIO
from proc_ic3net import run_ic3net
from multiprocessing import Process,Queue


app = Flask(__name__)
app.jinja_env.variable_start_string = '{{ '
app.jinja_env.variable_end_string = ' }}'
# socket=SocketIO(app)
params={}
@app.route('/')
def index():
    return render_template('index.html',videoName="Cooprative navigation")

@app.route('/submit',methods=['POST'])
def receive():
    data = json.loads(request.form.get('data'))
    name = data['name']
    params = data['params']
    print(name)
    print(params)
    """传回数据实例
        {
        name:['Cooprative navigation']
        params:{'--env-name': 'simple_spread', '--num-agents': '3'}
        }
    """
    p = Process(target=run_ic3net, args=(params,))
    p.start()
    print('test')
    return params

@app.route('/getparams',methods=['POST'])
def sendHandledJson():
    with open('./web/static/source/data/game_param.json') as f:
        data=json.load(f)
    gameName = request.form.get('gameName')
    for gameParam in data['games']:
        if(gameParam['name'] == gameName):
            return jsonify(gameParam)
    return -1
    
if __name__ == '__main__':
    app.run(debug=True)
    print("fff")



   
