import React from 'react';
import ReactDOM from 'react-dom';
import { Button , Row , Col , Card , message , Progress} from 'antd';
import './index.less'

export default class SecKillCardComponent extends React.Component{
    constructor(...args){
        super(...args);
        this.state={count:0}
        this.btnParam = {
            0:["primary",this.onClickHighTestRedis,{}],
            1:["danger",this.onClickTestRedisUsingAutoKey,{}],
            2:["primary",this.onClickTestRedisUsingAutoKeyAndBackThread,{shape:'round'}],
        }
    }
    render(){
        let item = this.props.item||{}; 
        let type = this.props.type||0;//默认使用最原始的操作redis数据库抢单
        let btnParam = this.btnParam[type]
        let btn = (<Button type={btnParam[0]} onClick={btnParam[1].bind(this,item)} {...btnParam[2]}>马上抢</Button>);
        return (
            <Card className="sec-kill-card">
              <Col span={8} className="sec-kill-card-img">图片</Col>
              <Col span={16} className="sec-kill-card-content">
                <div className="sec-kill-card-content-title">{item.title}</div>
                <div className="sec-kill-card-content-count">已抢{item.countNow && item.countSum ? (item.countSum - item.countNow):""}
                    <span><Progress className="sec-kill-card-progress" showInfo={false} percent={item.countNow && item.countSum ? 100 * (item.countSum - item.countNow)/item.countSum:0} status="active" /></span>
                </div>
                <div className="sec-kill-card-content-price">
                    <span className="sec-kill-card-content-price-wrap">
                        <span className="sec-kill-card-content-price-sec">${item.priceSecKill}</span>
                        <span className="sec-kill-card-content-price-org">${item.priceOrg}</span>
                    </span>
                    <span className="sec-kill-card-content-sec-btn">{btn}</span>
                </div>
              </Col>
            </Card>
        )
    }

    //初始化
    componentDidMount(){

    }

    //抢单-只修改redis中，不解决超卖问题
    onClickHighTestRedis(item){
        console.log("---抢单---",item);
        fetch("http://localhost:8080/ssm_pdd_seckill_war/goods/testRedis",
        {
            method:"post",
            mode:'cors',
            body: JSON.stringify({goodid:item.goodid}),
            // credentials: 'include',
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            },
        }
        ).then(res=>{
            return res?res.json():false
        }).then(json=>{
            this.setState({count:this.state.count+1});
            message.info(JSON.stringify(json.data));
            message.info(JSON.stringify(json.data?json.data.countNow:''));
            console.log(this.state.count,json.data)
        })
    }

    //抢单，修改redis，解决超卖、库存不准确问题
    onClickTestRedisUsingAutoKey(item){
        console.log("---抢单---",item);
        fetch("http://localhost:8080/ssm_pdd_seckill_war/goods/testRedisUsingAutoKey",
        {
            method:"post",
            mode:'cors',
            body: JSON.stringify({goodid:item.goodid}),
            // credentials: 'include',
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            },
        }
        ).then(res=>{
            return res?res.json():false
        }).then(json=>{
            this.setState({count:this.state.count+1});
            message.info(JSON.stringify(json.data));
            message.info(JSON.stringify(json.data?json.data.countNow:''));
            console.log(this.state.count,json.data)
        })
    }

    //抢单，修改redis，解决超卖、库存不准、重复排队、订单状态查询问题、mq队列、线程池
    onClickTestRedisUsingAutoKeyAndBackThread(item){
        console.log("---抢单---",item);
        fetch("http://localhost:8080/ssm_pdd_seckill_war/goods/testRedisUsingAutoKeyAndBackThread",
        {
            method:"post",
            mode:'cors',
            body: JSON.stringify({goodid:item.goodid}),
            // credentials: 'include',
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            },
        }
        ).then(res=>{
            return res?res.json():false
        }).then(json=>{
            this.setState({count:this.state.count+1});
            message.info(JSON.stringify(json.data));
            // message.info(JSON.stringify(json.data));
            console.log(this.state.count,json.data)
        })
    }
}