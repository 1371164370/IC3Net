# IC3Net_MAPE
 适配mape环境的ic3net算法,已适配simple_spread和simple_tag环境



用例：

```
python main.py --env_name simple_spread --display
```

```
python main.py --env_name simple_tag --display
```
参数见于arguments.py

录制：

```
python main.py --env_name simple_spread --record_video --video_name '自己定义一个视频名字'
```


服务器运行：
```
xvfb-run -a python main.py --env_name simple_spread --display
```
web服务器启动:
```
python web/webapp.py
```
visdom启动:
```
visdom
```
TODO : 前端进行 每个进程精准控制，前端构造模拟进程、进程队列、请求执行visdom
TODO: Tranffic junction ic3net和commNet算法实现，把环境里的传输的渲染数据由文件读写改为进程通信


