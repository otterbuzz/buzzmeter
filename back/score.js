
const retweet_weight = 1.5;
const follower_weight = 3;
const fav_weight = 1;

function score_tweet(tweets) {
	for (let tweet of tweets.statuses) {
		tweet['score'] = retweet_weight * tweet.retweet_count
						 + fav_weight * tweet.favorite_count
						 + follower_weight * tweet.user.followers_count;
		console.log(tweet.user.name + ' -> \n\t> rt : ' + tweet.retweet_count
			+ '\n\t> fav : ' + tweet.favorite_count
			+ '\n\t> follower : ' + tweet.user.followers_count
			+ '\n\t> score : ' + tweet['score']);
	}
	return tweets
}

module.exports.score_tweet = score_tweet;  
