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


module.exports.score_tweet = score_tweet;  
