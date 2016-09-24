var url = "https://www.reddit.com/r/{subreddit}.json";


$("#searchsubmit").on( "click", function(){
	
	var searchValue = $("#searchbox").val();
	var searchUrl = url.replace( "{subreddit}", searchValue );
	
	getSubreddits(searchUrl).then( function( subreddits ){
		var templateSource = $('#reddit-search-template').html();
		var template = Handlebars.compile(templateSource);
		console.log( subreddits );
		var html = template({
			subreddits: subreddits
		});
		$('#reddit-list').html(html);
	} );
} );

function getSubreddits(subreddit) {
  // makes an AJAX call to the Reddit API using the subreddit argument and
  // returns a promise that resolves with an array of subreddits formatted like below
  // notice how num_comments is mapped to commentCount
  
	var promise = $.ajax({
		url: subreddit,
		type: 'get'
	});
	
	var promise2 = promise.then( function( response ){
		var subredditData = response.data.children.map( function( subreddit ){
			return subreddit.data;
		} );
		
		return subredditData;
	});

  return promise2;
}

// promise = pending, resolved (success), rejected (error)
// HTTP status code 2xx = success
// HTTP status code 4xx or 5xx = error
//
// $.ajax({
//   url: 'http://itp-api.herokuapp.com/songs',
//   type: 'get',
//   success: function(response) {
//     var templateSource = $('#song-list-template').html();
//     var template = Handlebars.compile(templateSource);
//     var html = template(response);
//     $('#song-list').html(html);
//   }
// });
//
// $.ajax({
//   url: 'http://itp-api.herokuapp.com/songs',
//   type: 'get'
// }).then(function(response) {
//   console.log(1, response);
//   return response;
// }).then(function(response) {
//   console.log(2, response);
//   return response;
// }).then(function(response) {
//   console.log(3, response);
// });
