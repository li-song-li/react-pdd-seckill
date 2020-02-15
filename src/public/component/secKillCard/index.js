import React from 'react';
import ReactDOM from 'react-dom';
import { Button , Row , Col , Card , message} from 'antd';
import './index.less'

export default class SecKillCardComponent extends React.Component{
    constructor(...args){
        super(...args);
        this.state={count:0}
    }
    render(){
        let item = this.props.item||{}; 
        return (
            <Card className="sec-kill-card">
              <Col span={8} className="sec-kill-card-img">图片</Col>
              <Col span={16} className="sec-kill-card-content">
                <div className="sec-kill-card-content-title">{item.title}</div>
                <div className="sec-kill-card-content-count">已抢{item.countNow && item.countSum ? (item.countSum - item.countNow):""}</div>
                <div className="sec-kill-card-content-price">
                    <span className="sec-kill-card-content-price-wrap">
                        <span className="sec-kill-card-content-price-sec">${item.priceSecKill}</span>
                        <span className="sec-kill-card-content-price-org">${item.priceOrg}</span>
                    </span>
                    <span className="sec-kill-card-content-sec-btn"><Button type="primary" onClick={this.onClickHighTestRedis.bind(this,item)}>马上抢</Button></span>
                    <span className="sec-kill-card-content-sec-btn"><Button type="danger" onClick={this.onClickTestRedisUsingAutoKey.bind(this,item)}>马上抢</Button></span>
                </div>
              </Col>
            </Card>
        )
    }

    //初始化
    componentDidMount(){

    }

    //抢单
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

    //抢单
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
}