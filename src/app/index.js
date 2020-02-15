import React from 'react';
import ReactDOM from 'react-dom';
import SecKillComponent from '../seckill/index'
import './index.less'

export default class App extends React.Component{
    constructor(...args){
        super(...args);
        this.state={}
    }
    render(){
        return (
            <div className="App">
                <SecKillComponent />
            </div>
        )
    }

    //初始化
    componentDidMount(){

    }

}