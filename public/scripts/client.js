/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary)



const renderTweets = function (tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  $('#tweets-container').empty();
  tweets.forEach((tweet) => {
    const test = createTweetElement(tweet);
    $('#tweets-container').prepend(createTweetElement(tweet));

  });

};




const createTweetElement = function (tweetData) {

  //Preventing XSS with Escaping
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  let $tweet = `
  <article class="tweet-container">
      <header>
        <div>
          <img height="50px" width="50px" src="${tweetData.user.avatars}">
          <p>${tweetData.user.name}</p>
        </div>
        <p class="handle">${tweetData.user.handle}</p>
      </header>
      <main>
        ${escape(tweetData.content.text)}
      </main>
      <footer>
        <p class="created_at">${timeago.format(tweetData.created_at)}</p>
        <div>
          <i class="fas fa-flag"></i>
          <i class="fas fa-retweet"></i>
          <i class="fas fa-heart"></i>
        </div>
      </footer>
  
      </article>
  `;

  return $tweet;
};


$(document).ready(function () {


  const loadTweets = function () {
    $.ajax('/tweets', { method: 'GET' })
      .then((response) => {
        renderTweets(response);
      });

  };

  loadTweets();

  $('form').on('submit', function (event) {
    event.preventDefault();
    const characters = $('#tweet-text').val();
    const serialText = $(this).serialize();

    if (!characters) {
      $('#tweet-form').prepend(`
      <p class="error"><i class="fa-solid fa-circle-exclamation">
      </i>  You cannot post an empty tweet  
      <i class="fa-solid fa-circle-exclamation"></i></p>`);
      $('.error').slideDown(500)
      
          setTimeout(() => {
            $('.error').slideUp(500, () => {
              $('.error').remove();
            });
          }, 3000);
          
      return false;
    }
    if (characters.length > 140) {
      $('#tweet-form').prepend(`
      <p class="error"><i class="fa-solid fa-circle-exclamation">
      </i>  Tweet exceeds 140 characters  
      <i class="fa-solid fa-circle-exclamation"></i></p>`);
      $('.error').slideDown(500)
      
          setTimeout(() => {
            $('.error').slideUp(500, () => {
              $('.error').remove();
            });
          }, 2000);
      return false;
    }
    else {
      $.ajax("/tweets", { method: 'POST', data: serialText })
        .then(function (serialText) {
          loadTweets();
          $('#tweet-text').val('');
          $('.counter').val(140);
      });
    };
  });
});




