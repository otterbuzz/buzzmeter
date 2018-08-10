
const moment = require('moment')
moment.locale('fr')

class TrendHandling {

	constructor() {
		this.dict_trends = {};
	}

	set trends(trend_array) {
		const hour = moment().format('LT');
		for (let trend in trend_array[0].trends) {
			const tuple = [hour, (trend_array[0].trends[trend].tweet_volume===null ? 0:trend_array[0].trends[trend].tweet_volume)]
			if (trend_array[0].trends[trend].name in this.dict_trends) {
				this.dict_trends[trend_array[0].trends[trend].name].push(tuple);
			} else {
				this.dict_trends[trend_array[0].trends[trend].name] = [tuple];
			}
		}
	}

	get trends() {
		return this.dict_trends;
	}

}


module.exports = TrendHandling;
