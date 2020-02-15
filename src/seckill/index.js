import React from 'react';
import ReactDOM from 'react-dom';
import SecKillCardComponent from '../public/component/secKillCard/index'
import './index.less'

export default class SecKillComponent extends React.Component{
    constructor(...args){
        super(...args);
        this.state={}
    }
    render(){
        let item = this.state.goodsList?this.state.goodsList[0]:{};
        let SecKillArr = [];
        for(let i in this.state.goodsList){
            let item = this.state.goodsList[i];
            SecKillArr.push(<SecKillCardComponent item={item}/>);
        }
        return (
            <div className="sec-kill">
                <div className="sec-kill-title">今日秒杀</div>
                {SecKillArr}
            </div>
        )
    }

    //初始化
    componentDidMount(){
        this.testGetGoods();
    }

    //获取所有可以秒杀的商品列表
    testGetGoods(){
        fetch("http://localhost:8080/ssm_pdd_seckill_war/goods/testGetGoods",{method:'get',mode: 'cors'}).catch(function(e) {
            console.log(e)
        }).then(res=>{
            // console.log("----------res-------",res)
            return res?res.json():false
        }).then(json=>{
            console.log("---goodslist:",json)
            this.setState({goodsList:json.data})
        });
    }

}