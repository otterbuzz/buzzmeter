const retweet_weight = 1.5;
const follower_weight = 3;
const fav_weight = 1;


function get_score_followers(nb_followers) {
	return Math.log2(nb_followers);
}


function get_score_buzz(nb_rt, nb_fav) {
	return nb_rt * 3 * nb_fav;
}


function score_tweet(tweets) {
	for (let tweet of tweets.statuses) {
		tweet['score'] = retweet_weight * tweet.retweet_count
						 + fav_weight * tweet.favorite_count
						 + follower_weight * tweet.user.followers_count;
		tweet['score_followers'] = get_score_followers(tweet.user.followers_count);
		tweet['score_buzz'] = get_score_buzz(tweet.retweet_count, tweet.favorite_count);
	}
	return tweets
}


function clean_tweets(tweets) {
	let new_tweets = {};
	new_tweets['statuses'] = [];
	new_tweets['trends'] = tweets.trends;
	for (let tweet of tweets.statuses) {
		new_tweet = {};
		new_tweet['created_at'] = tweet.created_at;
		new_tweet['id'] = tweet.id;
		new_tweet['id_str'] = tweet.id_str;
		new_tweet['full_text'] = tweet.full_text;
		new_tweet['user'] = {};
		new_tweet['user']['screen_name'] = tweet.user.screen_name;
		new_tweet['favorite_count'] = tweet.favorite_count;
		new_tweet['retweet_count'] = tweet.retweet_count;
		new_tweet['score'] = tweet.score;
		new_tweet['score_followers'] = tweet.score_followers;
		new_tweet['score_buzz'] = tweet.score_buzz;
		new_tweets['statuses'].push(new_tweet);
	}
	console.log(new_tweets);
	return new_tweets
}


module.exports.score_tweet = score_tweet;  
module.exports.clean_tweets = clean_tweets;  
