/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createTweetElement = function (tweetObj) {
  const timeStamp = timeago.format(tweetObj.created_at);
  let $tweet = $(` 
  <article>
  <header>
    <span class="user"><img class="user" src="${tweetObj.user.avatars
    }" alt="Face Logo Image">
    <p> ${tweetObj.user.name}</p></span>
    <p class="handle">${tweetObj.user.handle} </p>
  </header>
    <p class="profile-tweet">${escape(tweetObj.content.text)} </p>
  <footer>
    <span class ="time">${timeStamp} </span>
    <span class ="buttons"> 
      <i class="fa-solid fa-flag"></i> 
      <i class="fa-solid fa-retweet"></i>
      <i class="fa-solid fa-heart"></i>
      </article>`);
  return $tweet;
};

const renderTweets = function (tweets) {
  $("#tweets-container").empty();
  for (let tweet of tweets) {
    const newTweet = createTweetElement(tweet);
    $("#tweets-container").prepend(newTweet);
  }
};
//renderTweets(data);

const renderLastTweet = arrayOfTweetObj => {
  const lastTweet = arrayOfTweetObj[arrayOfTweetObj.length - 1];
  $('#tweets-container').prepend(createTweetElement(lastTweet));
};


const loadTweets = function () {
  $.ajax('/tweets', { method: 'GET', dataType: "json" })
    .then(function (data) {
      console.log(data);
      renderTweets(data);
    });
};

$(document).ready(function () {
  //event listener for submitting
  $('.button').click(function (event) {
    event.preventDefault();
    const tweetData = $(".new-tweet").find("textarea").val();
    const tweetLength = $(".new-tweet").find("textarea").val().length;
    if (tweetLength > 140) {
      $(".error1").text("Tweet character length exceeded").slideDown();

    } else if (tweetLength === 0) {
      $(".error2").text("Please create a valid tweet").slideDown();
    } else {
      $(".error1").slideUp();
      $(".error2").slideUp();
      console.log("tweetData", tweetData);
      $.ajax('/tweets', { method: 'POST', data: { text: tweetData } })
        .then(loadTweets)
        .catch(res => console.log(res.error));
      //clear text box
      $(".new-tweet").find("form").trigger("reset");
      //reset counter
      $(".counter").text(140);
    }
  });

  console.log("tweets are being loaded");
});

loadTweets();
