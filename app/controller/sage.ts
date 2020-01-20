import { Controller } from 'egg';

/**
 * 配合sage前端
 */
export default class HomeController extends Controller {
  public async index() {
  }
  public async ask() {
      const {ctx} = this;
      const {msg} = ctx.query;
      ctx.assert(msg, 400, 'queryString msg is needed');
      var data = {};
      var content: any  = {
        type: 'plain',
        data: {
            body: 'unkown'
        }
      };
      switch (msg) {
          case 'recommend':
            content = {
                type: 'recommend',
                data: {
                    body: [{
                        studio: "你可以这样问",
                        items: ["600519", "热议", "选股", "开户", "预测"]
                    }, {
                        studio: "你可以这样问",
                        items: ["选股", "洗盘", "乐视网", "市盈率", "热议"]
                    }]
                }
            }
            break;
            case 'hi':
                content = [{
                    type: "plain",
                    data: {
                        body: "您好，我是哲，您的私人投资专家，有证券投资问题都可以问我",
                        predictLinks: []
                    }
                }, {
                    type: "plain",
                    data: {
                        body: "今天我学习了回答股票行情明细，快来试试吧 <p>你可以这样问>></p><p><a class=\"active_link\">市盈率</a> <a class=\"active_link\">流通市值</a> <a class=\"active_link\">前收盘价</a></p>",
                        predictLinks: []
                    }
                }]
                break;
            case '市盈率':
                content = [{
                    type: 'plain',
                    data: {
                        body: `市盈率（Price Earnings Ratio，简称P/E或PER），也称“本益比”、“股价收益比率”或“市价盈利比率（简称市盈率）”。市盈率是指股票价格除以每股收益(每股收益,EPS)的比率。或以公司市值除以年度股东应占溢利。`
                    }
                }];
                break;
            case '流通市值':
                content = [{
                    type: 'plain',
                    data: {
                        body: `流通市值指在某特定时间内当时可交易的流通股股数乘以当时股价得出的流通股票总价值。在中国，上市公司的股份结构中分国有股、法人股、个人股等。`
                    }
                }]
                break;
            case '前收盘价':
                content = [{
                    type: 'plain',
                    data: {
                        body: `收市价又叫 “收盘价”，证券交易所每个营业日闭市前的最后一笔交易所开出的证券价格称为该交易所营业日的收市价。对于具体的某一证券来说，其在某营业日闭市前的最后一笔交易的成交价格为这种证券在该日的收市价。如果某种证券在某一营业日没有成交价格，则交易所通常采用前一日的收盘价或最近一次的成交价格作为当日收市价; 如果以前数日都没有收盘的价格，但有连续两日涨至或跌至限度的揭示价格记录时，[注： 揭示价格指揭示时的成交价格，即买进卖出价格] 此涨停或跌停的揭示价格可作为该证券的收市价。第一次上市买卖的有价证券除另有规定外，按上市前公开销售的平均价格代替收市价，并且以该价格作为计算升降幅度的参考基准。同开市价一样，收市价也是一种比较不同地区，不同证券交易所，或不同营业日之间股市行情变化的基本数据，对证券商，证券交易所及投资者有着重要的意义。此外，在开市和收市时间问题上，为了使证券交易在全世界范围内24小时不间断进行，世界各重要交易所统一协调了营业时间，伦敦、纽约、东京三个市场开、收市时间首尾相接，证券交易可以随时进行。`
                    }
                }]
                break;
            default:
                content = [{
                    type: 'plain',
                    data: {
                        body: `'${msg}'？还在学习中。。。`
                    }
                }]
                break;
      }
      ctx.body = {
          code: 0,
          content
      };
  }
}
