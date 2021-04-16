import osjs from 'osjs';
import { name as applicationName } from './metadata.json';
import './css/index.css';
import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import zhCN from 'antd/es/locale/zh_CN';
import { ConfigProvider, Table } from 'antd';
import moment from 'moment';
import * as apiURL from './ajax/apiURL'
import _ from 'lodash';
// import Loadertop from './Components/leadertop';
import Timetop from './Components/timetop';
// import * as Api from './ajax/api';

var Queryhuman = ''
var QueryWorkTime = ''
var QueryHP = ''
var QueryNewGtime = ''

export default class index extends Component {
  //number转化为汉字
  // doDiffTime = (startTime, endTime) => {
  //   let endTime1 = moment(endTime).subtract(1, 'days')
  //   let diffTime = moment(endTime1).diff(startTime, 'days')

  //   let toChinesNum = (num) => {
  //     let changeNum = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
  //     let unit = ["", "十", "百", "千", "万"];
  //     num = parseInt(num);
  //     let getWan = (temp) => {
  //       let strArr = temp.toString().split("").reverse();
  //       let newNum = "";
  //       for (var i = 0; i < strArr.length; i++) {
  //         newNum = (i == 0 && strArr[i] == 0 ? "" : (i > 0 && strArr[i] == 0 && strArr[i - 1] == 0 ? "" : changeNum[strArr[i]] + (strArr[i] == 0 ? unit[0] : unit[i]))) + newNum;
  //       }
  //       return newNum;
  //     }
  //     let overWan = Math.floor(num / 10000);
  //     let noWan = num % 10000;
  //     if (noWan.toString().length < 4) { noWan = "0" + noWan; }
  //     return overWan ? getWan(overWan) + "万" + getWan(noWan) : getWan(num);
  //   }

  //   let ChinesNum = toChinesNum(diffTime)
  //   // console.log(this.props.Leader);
  //   return ChinesNum
  // }

  state = {
    time: {
      startTime: moment().subtract(1, 'months').format('YYYY/MM/DD'),
      endTime: moment().subtract(1, 'days').format('YYYY/MM/DD'),
      refreshTime: moment().format('YYYY/MM/DD  HH:mm '),
      diffTime: '三十',
    },
    didList: '',
    leader: '',
    //----------------------------------------------------------------表头
    CNCcolumns: [
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '出勤工时:',
        dataIndex: 'attendance',
        key: 'attendance',
      },
      {
        title: '产出工时:',
        dataIndex: 'output',
        key: 'output',
      },
      {
        title: '综合效率',
        key: 'efficiency',
        dataIndex: 'efficiency',
      },
      {
        title: '合格率',
        key: 'qualified',
        dataIndex: 'qualified'
      },
      {
        title: '交货准时率',
        dataIndex: 'ontime',
        key: 'ontime',
      },
      {
        title: '分值',
        dataIndex: 'score',
        key: 'score',
      },
    ],
    EDMcolumns: [
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '出勤工时',
        dataIndex: 'attendance',
        key: 'attendance',
      },
      {
        title: '产出工时',
        dataIndex: 'output',
        key: 'output',
      },
      {
        title: '综合效率',
        key: 'efficiency',
        dataIndex: 'efficiency',
      },
      {
        title: '合格率',
        key: 'qualified',
        dataIndex: 'qualified'
      },
      {
        title: '交货准时率',
        dataIndex: 'ontime',
        key: 'ontime',
      },
      {
        title: '分值',
        dataIndex: 'score',
        key: 'score',
      },
    ],
    MCcolumns: [
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '出勤工时',
        dataIndex: 'attendance',
        key: 'attendance',
      },
      {
        title: '产出工时',
        dataIndex: 'output',
        key: 'output',
      },
      {
        title: '综合效率',
        key: 'efficiency',
        dataIndex: 'efficiency',
      },
      {
        title: '合格率',
        key: 'qualified',
        dataIndex: 'qualified'
      },
      {
        title: '交货准时率',
        dataIndex: 'ontime',
        key: 'ontime',
      },
      {
        title: '分值',
        dataIndex: 'score',
        key: 'score',
      },
    ],
    XCcolumns: [
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '出勤工时',
        dataIndex: 'attendance',
        key: 'attendance',
      },
      {
        title: '产出工时',
        dataIndex: 'output',
        key: 'output',
      },
      {
        title: '综合效率',
        key: 'efficiency',
        dataIndex: 'efficiency',
      },
      {
        title: '合格率',
        key: 'qualified',
        dataIndex: 'qualified'
      },
      {
        title: '交货准时率',
        dataIndex: 'ontime',
        key: 'ontime',
      },
      {
        title: '分值',
        dataIndex: 'score',
        key: 'score',
      },
    ],
    XQGcolumns: [
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '出勤工时',
        dataIndex: 'attendance',
        key: 'attendance',
      },
      {
        title: '产出工时',
        dataIndex: 'output',
        key: 'output',
      },
      {
        title: '综合效率',
        key: 'efficiency',
        dataIndex: 'efficiency',
      },
      {
        title: '合格率',
        key: 'qualified',
        dataIndex: 'qualified'
      },
      {
        title: '交货准时率',
        dataIndex: 'ontime',
        key: 'ontime',
      },
      {
        title: '分值',
        dataIndex: 'score',
        key: 'score',
      },
    ],
    PGcolumns: [
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '出勤工时',
        dataIndex: 'attendance',
        key: 'attendance',
      },
      {
        title: '产出工时',
        dataIndex: 'output',
        key: 'output',
      },
      {
        title: '综合效率',
        key: 'efficiency',
        dataIndex: 'efficiency',
      },
      {
        title: '合格率',
        key: 'qualified',
        dataIndex: 'qualified'
      },
      {
        title: '交货准时率',
        dataIndex: 'ontime',
        key: 'ontime',
      },
      {
        title: '分值',
        dataIndex: 'score',
        key: 'score',
      },
    ],
    //----------------------------------------------------------------表身
    CNCdata: [
      {
        name: '',
        attendance: '',
        output: '',
        efficiency: '',
        qualified: '',
        ontime: '',
        score: ''
      }
    ],
    EDMdata: [
      {
        name: '',
        attendance: '',
        output: '',
        efficiency: '',
        qualified: '',
        ontime: '',
        score: ''
      }
    ],
    MCdata: [
      {
        name: '',
        attendance: '',
        output: '',
        efficiency: '',
        qualified: '',
        ontime: '',
        score: ''
      }
    ],
    XCdata: [
      {
        name: '',
        attendance: '',
        output: '',
        efficiency: '',
        qualified: '',
        ontime: '',
        score: ''
      }
    ],
    XQGdata: [
      {
        name: '',
        attendance: '',
        output: '',
        efficiency: '',
        qualified: '',
        ontime: '',
        score: ''
      }
    ],
    PGdata: [
      {
        name: '',
        attendance: '',
        output: '',
        efficiency: '',
        qualified: '',
        ontime: '',
        score: ''
      }
    ]
  }
  //请求和逻辑调用
  componentWillMount() {
    this.getAjaxData()
  }
  componentDidMount() {
    this.timer = setInterval(() => {
      this.getAjaxData()
    }, 1000 * 60 * 60 * 6);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
    console.log('1111');
  }
  //请求
  getAjaxData = () => {
    this.setState({
      time: {
        startTime: moment().subtract(1, 'months').format('YYYY/MM/DD'),
        endTime: moment().subtract(1, 'days').format('YYYY/MM/DD'),
        refreshTime: moment().format('YYYY/MM/DD  HH:mm '),
        diffTime: '三十'
      }
    })
    //---------------------------------------------------------------------请求产出工时
    var xhr = new XMLHttpRequest();
    xhr.open("GET", apiURL.Queryhuman, false);
    xhr.send();
    Queryhuman = JSON.parse(xhr.responseText);
    // console.log('请求产出工时',Queryhuman);
    //---------------------------------------------------------------------请求出勤工时
    var xhr = new XMLHttpRequest();
    xhr.open("GET", apiURL.QueryWorkTime, false);
    xhr.send();
    QueryWorkTime = JSON.parse(xhr.responseText);
    // console.log('请求出勤工时',QueryWorkTime);
    //----------------------------------------------------------------------请求合格率
    var xhr = new XMLHttpRequest();
    xhr.open("GET", apiURL.QueryHP, false);
    xhr.send();
    QueryHP = JSON.parse(xhr.responseText)
    // console.log('请求合格率',QueryHP);
    //----------------------------------------------------------------------交货准时率
    var xhr = new XMLHttpRequest();
    xhr.open("GET", apiURL.QueryNewGtime, false);
    xhr.send();
    QueryNewGtime = JSON.parse(xhr.responseText)
    // console.log('交货准时率', QueryNewGtime);

    let clone_monthOutput2 = this.getNeedlist(Queryhuman, QueryWorkTime, QueryHP, QueryNewGtime, this.state.time.startTime, this.state.time.endTime)
    this.doDisplay(clone_monthOutput2)
  }
  //渲染
  doDisplay = (lastList) => {
    let CNCdata = [];
    let EDMdata = [];
    let MCdata = [];
    let XCdata = [];
    let XQGdata = [];
    let PGdata = [];

    _.forEach(lastList, items => {
      if (items.工序 == 'CNC' && items.name !== '杨海') {
        CNCdata.push(items)
      } else if (items.工序 == 'EDM' && items.name !== '王其贤') {
        EDMdata.push(items)
      } else if (items.工序 == '磨床' && items.name !== '徐邦学') {
        MCdata.push(items)
      } else if (items.工序 == '铣床' && items.name !== '陈春明') {
        XCdata.push(items)
      } else if (items.工序 == '线切割' && items.name !== '宗成建') {
        XQGdata.push(items)
      } else if (items.工序 == '抛光' && items.name !== '潘春英') {
        PGdata.push(items)
      }
    })

    function inTotal(total) {
      let data = {
        allAttendance: '',
        allOutput: '',
        allEfficiency: '',
        allQualified: '',
        allOntime: ''
      }
      data.allAttendance = _.sumBy(total, items => {
        return _.parseInt(items.attendance)
      });
      data.allOutput = _.sumBy(total, items => {
        return _.parseInt(items.output)
      });
      data.allEfficiency = ((data.allOutput / data.allAttendance) * 100).toFixed(2) + '%'
      data.allQualified = ((_.sumBy(total, items => {
        return _.parseInt(items.qualified)
      })) / total.length).toFixed(2) + '%'
      data.allOntime = ((_.sumBy(total, items => {
        return _.parseInt(items.ontime)
      })) / total.length).toFixed(2) + '%'

      return data
    }
    //-----------------------------------------------------------------------CNC组
    let CNC = inTotal(CNCdata)
    //------------------------------------------------------------------------EDM组
    let EDM = inTotal(EDMdata)
    //------------------------------------------------------------------------磨床组
    let MC = inTotal(MCdata)
    //------------------------------------------------------------------------铣床组
    let XC = inTotal(XCdata)
    //------------------------------------------------------------------------线切割组
    let XQG = inTotal(XQGdata)
    //------------------------------------------------------------------------抛光组
    let PG = inTotal(PGdata)
    //------------------------------------------------------------------------组长
    let leader = _.groupBy(_.filter(lastList, items => {
      return items.name == '杨海' || items.name == '王其贤' || items.name == '徐邦学' ||
        items.name == '陈春明' || items.name == '宗成建' || items.name == '潘春英'
    }), 'name')
    console.log(leader);

    this.setState({
      didList: lastList,
      CNCdata: CNCdata,
      EDMdata: EDMdata,
      MCdata: MCdata,
      XCdata: XCdata,
      XQGdata: XQGdata,
      PGdata: PGdata,
      CNCcolumns: [
        {
          title: '姓名',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: '出勤工时:' + CNC.allAttendance,
          dataIndex: 'attendance',
          key: 'attendance',
        },
        {
          title: '产出工时:' + CNC.allOutput,
          dataIndex: 'output',
          key: 'output',
        },
        {
          title: '综合效率:' + CNC.allEfficiency,
          key: 'efficiency',
          dataIndex: 'efficiency',
        },
        {
          title: '合格率:' + CNC.allQualified,
          key: 'qualified',
          dataIndex: 'qualified'
        },
        {
          title: '交货准时率:' + CNC.allOntime,
          dataIndex: 'ontime',
          key: 'ontime',
        },
        {
          title: '分值',
          dataIndex: 'score',
          key: 'score',
        },
      ],
      EDMcolumns: [
        {
          title: '姓名',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: '出勤工时:' + EDM.allAttendance,
          dataIndex: 'attendance',
          key: 'attendance',
        },
        {
          title: '产出工时:' + EDM.allOutput,
          dataIndex: 'output',
          key: 'output',
        },
        {
          title: '综合效率:' + EDM.allEfficiency,
          key: 'efficiency',
          dataIndex: 'efficiency',
        },
        {
          title: '合格率' + EDM.allQualified,
          key: 'qualified',
          dataIndex: 'qualified'
        },
        {
          title: '交货准时率:' + EDM.allOntime,
          dataIndex: 'ontime',
          key: 'ontime',
        },
        {
          title: '分值',
          dataIndex: 'score',
          key: 'score',
        },
      ],
      MCcolumns: [
        {
          title: '姓名',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: '出勤工时:' + MC.allAttendance,
          dataIndex: 'attendance',
          key: 'attendance',
        },
        {
          title: '产出工时:' + MC.allOutput,
          dataIndex: 'output',
          key: 'output',
        },
        {
          title: '综合效率:' + MC.allEfficiency,
          key: 'efficiency',
          dataIndex: 'efficiency',
        },
        {
          title: '合格率' + MC.allQualified,
          key: 'qualified',
          dataIndex: 'qualified'
        },
        {
          title: '交货准时率:' + MC.allOntime,
          dataIndex: 'ontime',
          key: 'ontime',
        },
        {
          title: '分值',
          dataIndex: 'score',
          key: 'score',
        },
      ],
      XCcolumns: [
        {
          title: '姓名',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: '出勤工时:' + XC.allAttendance + '',
          dataIndex: 'attendance',
          key: 'attendance',
        },
        {
          title: '产出工时:' + XC.allOutput,
          dataIndex: 'output',
          key: 'output',
        },
        {
          title: '综合效率:' + XC.allEfficiency,
          key: 'efficiency',
          dataIndex: 'efficiency',
        },
        {
          title: '合格率' + XC.allQualified,
          key: 'qualified',
          dataIndex: 'qualified'
        },
        {
          title: '交货准时率' + XC.allOntime,
          dataIndex: 'ontime',
          key: 'ontime',
        },
        {
          title: '分值',
          dataIndex: 'score',
          key: 'score',
        },
      ],
      XQGcolumns: [
        {
          title: '姓名',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: '出勤工时:' + XQG.allAttendance,
          dataIndex: 'attendance',
          key: 'attendance',
        },
        {
          title: '产出工时:' + XQG.allOutput,
          dataIndex: 'output',
          key: 'output',
        },
        {
          title: '综合效率:' + XQG.allEfficiency,
          key: 'efficiency',
          dataIndex: 'efficiency',
        },
        {
          title: '合格率' + XQG.allQualified,
          key: 'qualified',
          dataIndex: 'qualified'
        },
        {
          title: '交货准时率' + XQG.allOntime,
          dataIndex: 'ontime',
          key: 'ontime',
        },
        {
          title: '分值',
          dataIndex: 'score',
          key: 'score',
        },
      ],
      PGcolumns: [
        {
          title: '姓名',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: '出勤工时:' + PG.allAttendance,
          dataIndex: 'attendance',
          key: 'attendance',
        },
        {
          title: '产出工时:' + PG.allOutput,
          dataIndex: 'output',
          key: 'output',
        },
        {
          title: '综合效率:' + PG.allEfficiency,
          key: 'efficiency',
          dataIndex: 'efficiency',
        },
        {
          title: '合格率:' + PG.allQualified,
          key: 'qualified',
          dataIndex: 'qualified'
        },
        {
          title: '交货准时率' + PG.allOntime,
          dataIndex: 'ontime',
          key: 'ontime',
        },
        {
          title: '分值',
          dataIndex: 'score',
          key: 'score',
        },
      ],
      leader: leader,
    })

  }
  //加工数据
  getNeedlist = (Queryhuman, QueryWorkTime, QueryHP, QueryNewGtime, startTime, endTime) => {
    //----------------------------------------------------------------------------------------------产出工时
    let cloneQueryhuman = _.cloneDeep(Queryhuman)
    // console.log('克隆请求产出工时', cloneQueryhuman);
    let monthOutput = _.map(_.groupBy(_.filter(cloneQueryhuman, items => {
      return items.日期 >= startTime && items.日期 <= endTime
    }), '操作人'), (value, key) => {
      return {
        name: key,
        output: _.sumBy(value, '产出工时').toFixed(2),
        process: _.find(value, (o) => {
          return o.工序
        })
      }
    })
    monthOutput.forEach(items => {
      if (items.process.工序 == '1') {
        items.process.工序 = '线切割'
      }
    })
    monthOutput.forEach(items => {
      items.工序 = items.process.工序
    })
    console.log('...产出:', monthOutput);
    //-----------------------------------------------------------------------------------------------出勤工时
    let cloneQueryWorkTime = _.cloneDeep(QueryWorkTime)
    // console.log('克隆请求出勤工时', cloneQueryWorkTime);
    _.map(cloneQueryWorkTime, items => {
      items.日期 = moment(items.日期).format('YYYY/MM/DD')
    })
    let worktime = {}
    _.map(_.groupBy(_.filter(cloneQueryWorkTime, items => {
      return items.日期 >= startTime && items.日期 <= endTime && items.部门 == "模具部"
    }), '姓名'), (value, key) => {
      worktime[key] = (_.sumBy(value, (items) => {
        return Number(items.工时)
      })).toFixed(2)
    })
    // console.log(worktime);
    let monthWorktime = _.map(worktime, (value, key) => {
      return { name: key, attendance: _.toString(value) }
    })
    console.log('...出勤:', monthWorktime);
    //-------------------------------------------------------------------------monthWorktime合并到monthOutput
    let clone_monthOutput = _.cloneDeep(monthWorktime)
    let temp3 = _.groupBy(monthOutput, 'name')
    // console.log(temp3);
    _.map(clone_monthOutput, value => {
      // console.log(value.name);
      // console.log(temp3[value.name]);
      if (temp3[value.name]) {
        value = Object.assign(value, temp3[value.name][0])//suoyin,key
      } else {
        value = Object.assign(value, { output: '0' })//suoyin,key
      }
    })
    console.log('产出...出勤合并:', clone_monthOutput);
    // //---------------------------------------------------------------------------综合效率
    _.map(clone_monthOutput, items => {
      if (items.attendance != '0') {
        items.efficiency = (items.output * 100 / items.attendance).toFixed(2) + '%'
      } else {
        items.efficiency = '0'
      }

    })
    console.log(clone_monthOutput);
    // //-------------------------------------------------------------------------------合格率
    let monthQualified = _.map(_.groupBy(_.filter(QueryHP, items => {
      return items.日期 >= startTime && items.日期 <= endTime
    }), '操作人'), (value, key) => {
      return {
        name: key,
        abnormal: _.sumBy(value, '异常数量').toFixed(2),
        amount: _.sumBy(value, '检测数量').toFixed(2),
      }
    })
    _.map(monthQualified, items => {
      items.qualified = ((1 - items.abnormal / items.amount) * 100).toFixed(2) + '%'
    })
    // //---------------------------------------------------monthQualified合并到clone_monthOutput
    let clone_monthOutput1 = _.cloneDeep(clone_monthOutput)
    let temp4 = _.groupBy(monthQualified, 'name')
    // console.log(temp3);
    _.map(clone_monthOutput1, value => {
      // console.log(value.name);
      // console.log(temp3[value.name]);
      if (temp4[value.name]) {
        value = Object.assign(value, temp4[value.name][0])//suoyin,key
      } else {
        value = Object.assign(value, { qualified: '100.00%' })//suoyin,key
      }
    })
    console.log('...合格率：', clone_monthOutput1);
    // //------------------------------------------------------------------------交货准时率+最后要的数组
    _.map(QueryNewGtime, items => {
      items.实际完成时间 = moment(items.实际完成时间).format('YYYY/MM/DD'),
        items.计划完成时间 = moment(items.计划完成时间).format('YYYY/MM/DD')
      if (items.计划完成时间 > items.实际完成时间) {
        items.number = 1
      } else {
        items.number = 0
      }
    })
    // console.log('交货准时率', QueryNewGtime);

    var a = _.filter(QueryNewGtime, items => {
      return items.实际完成时间 >= startTime && items.实际完成时间 <= endTime && items.工序名称 != "品管"
    })
    // console.log('交货准时率', a);

    var b = _.groupBy(a, '操作人')
    // console.log('cheshi',b);

    var c = _.map(b, (value, key) => {
      return {
        name: key,
        son: _.sumBy(value, 'number'),
        father: value.length,

      }
    })
    _.map(c, items => {
      items.ontime = (items.son * 100 / items.father).toFixed(2) + '%'
    })
    // console.log(c);

    let monthOntime1 = _.map(c, items => {
      return {
        name: items.name,
        ontime: items.ontime
      }
    })
    // console.log('...准时率', monthOntime1);
    //-------------------------------------------------------------------QueryNewGtime合并到clone_monthOutput1

    let clone_monthOutput2 = _.cloneDeep(clone_monthOutput1)
    let temp5 = _.groupBy(monthOntime1, 'name')
    // console.log(temp3);
    _.map(clone_monthOutput2, value => {
      // console.log(value.name);
      // console.log(temp3[value.name]);
      if (temp5[value.name]) {
        value = Object.assign(value, temp5[value.name][0])//suoyin,key
      } else {
        value = Object.assign(value, { ontime: '0' })//suoyin,key
      }
    })
    console.log('...交货率：', clone_monthOutput2);


    //-------------------------------------------------------------------------分值
    _.map(clone_monthOutput2, items => {
      if (items.efficiency != '0' && items.qualified != '0' && items.ontime != '0') {
        items.score = (((_.parseInt(items.efficiency) / 100) * (_.parseInt(items.qualified) / 100) * (_.parseInt(items.ontime) / 100)) * 100).toFixed(2) + '%'
      } else {
        items.score = '0'
      }
    })
    console.log('...分值：', clone_monthOutput2);
    return clone_monthOutput2

    //---------------------------------------------------------------------------leader


  }
  //获取子组件的时间
  gettime = (time) => {
    this.setState({ time })
  }

  //确定重新跑逻辑
  changData = () => {
    this.setState({
      didList: this.getNeedlist(Queryhuman, QueryWorkTime, QueryHP, QueryNewGtime, this.state.time.startTime, this.state.time.endTime)
    })
    this.doDisplay(this.state.didList)
    // let clone_monthOutput2 = this.getNeedlist(Queryhuman, QueryWorkTime, QueryHP, QueryNewGtime, this.state.time.startTime, this.state.time.endTime)
    // console.log('选择的时间', this.state.time);
    // this.doDisplay(clone_monthOutput2)
  }
  //DOM
  render() {
    const { 杨海, 王其贤, 徐邦学, 陈春明, 宗成建, 潘春英 } = this.state.leader
    // console.log('1',this.state.time);
    return (

      <ConfigProvider locale={zhCN}>
        <div className='body'>

          <Timetop
            getSelecttime={this.gettime}
            changData={this.changData}
            didList={this.state.didList}
          />


          <div className='header-time'>
            <p>上次刷新时间：{this.state.time.refreshTime} </p>
          </div>

          <div className='content'>
            <div className='left-content'>
              {/* <Loadertop Leader={杨海} /> */}
              <div className='table1'>
                <div className='leader'>
                  <div className='leader1'>
                    <p>组长:{杨海[0].name}</p>
                    <p>{杨海[0].工序}{this.state.time.diffTime}天龙虎榜</p>
                    <p>交货准时率:{杨海[0].ontime}</p>
                    <p>分值:{杨海[0].score}</p>
                  </div>
                </div>
                <Table
                  columns={this.state.CNCcolumns}
                  dataSource={[...this.state.CNCdata]}
                  pagination={false}
                />
              </div>
              {/* <Loadertop Leader={陈春明} /> */}
              <div className='table2'>
                <div className='leader'>
                  <div className='leader1'>
                    <p>组长:{陈春明[0].name}</p>
                    <p>{陈春明[0].工序}{this.state.time.diffTime}天龙虎榜</p>
                    <p>交货准时率:{陈春明[0].ontime}</p>
                    <p>分值:{陈春明[0].score}</p>
                  </div>
                </div>
                <Table
                  columns={this.state.XCcolumns}
                  dataSource={this.state.XCdata}
                  pagination={false}
                />
              </div>
              {/* <Loadertop Leader={徐邦学} /> */}
              <div className='table3'>
                <div className='leader'>
                  <div className='leader1'>
                    <p>组长:{徐邦学[0].name}</p>
                    <p>{徐邦学[0].工序}{this.state.time.diffTime}天龙虎榜</p>
                    <p>交货准时率:{徐邦学[0].ontime}</p>
                    <p>分值:{徐邦学[0].score}</p>
                  </div>
                </div>
                <Table
                  columns={this.state.MCcolumns}
                  dataSource={this.state.MCdata}
                  pagination={false} />
              </div>
            </div>
            <div className='right-content'>
              {/* <Loadertop Leader={王其贤} /> */}
              <div className='table1'>
                <div className='leader'>
                  <div className='leader1'>
                    <p>组长:{王其贤[0].name}</p>
                    <p>{王其贤[0].工序}{this.state.time.diffTime}天龙虎榜</p>
                    <p>交货准时率:{王其贤[0].ontime}</p>
                    <p>分值:{王其贤[0].score}</p>
                  </div>
                </div>
                <Table
                  columns={this.state.EDMcolumns}
                  dataSource={this.state.EDMdata}
                  pagination={false}
                />
              </div>
              {/* <Loadertop Leader={宗成建} /> */}
              <div className='table2'>
                <div className='leader'>
                  <div className='leader1'>
                    <p>组长:{宗成建[0].name}</p>
                    <p>{宗成建[0].工序}{this.state.time.diffTime}天龙虎榜</p>
                    <p>交货准时率:{宗成建[0].ontime}</p>
                    <p>分值:{宗成建[0].score}</p>
                  </div>
                </div>

                <Table
                  columns={this.state.XQGcolumns}
                  dataSource={this.state.XQGdata}
                  pagination={false}
                />
              </div>
              {/* <Loadertop Leader={潘春英} /> */}
              <div className='table3'>
                <div className='leader'>
                  <div className='leader1'>
                    <p>组长:{潘春英[0].name}</p>
                    <p>{潘春英[0].工序}{this.state.time.diffTime}天龙虎榜</p>
                    <p>交货准时率:{潘春英[0].ontime}</p>
                    <p>分值:{潘春英[0].score}</p>
                  </div>
                </div>
                <Table
                  columns={this.state.PGcolumns}
                  dataSource={this.state.PGdata}
                  pagination={false}
                />
              </div>
            </div>
          </div>
        </div>
      </ConfigProvider>
    )
  }

}

// Our launcher
const register = (core, args, options, metadata) => {
  // Create a new Application instance
  const proc = core.make('osjs/application', { args, options, metadata });
  // Create  a new Window instance
  proc.createWindow({
    id: 'longhubang2Window',
    title: metadata.title.en_EN,
    dimension: { width: 400, height: 400 },
    position: { left: 700, top: 200 }
  })
    .on('destroy', () => proc.destroy())
    .render($content => ReactDOM.render(React.createElement(index), $content));
  return proc;
};
osjs.register(applicationName, register);
