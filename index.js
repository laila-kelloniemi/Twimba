//GLOBAL

import { tweetsData } from './data.js'
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

let storageTweetsDataArray = []
checkLocalStorage() 


//EVENT LISTENERS

//event listener for buttons
document.addEventListener('click', e => {

    if(e.target.dataset.addReplyBtn){ // for adding a reply
        handleAddReplyBtn(e.target.dataset.addReplyBtn)
    }
    
    else if(e.target.id === 'tweet-btn'){ // for adding a tweet
        const tweetInput = document.getElementById('textarea-for-input')
        const newTweetText = tweetInput.value.trim()
        handleTweetBtnClick(newTweetText)
        tweetInput.value = ''
    }  
    
    else if(e.target.id === 'start-over-btn'){ // for resetting all changes in local storage, and rendering hard-coded tweetsData array
        storageTweetsDataArray = []
        resetLocalStorage()
    }
})

//event listener for icon buttons
document.querySelector('#tweets-feed-section').addEventListener('click', e => { 

    if(e.target.dataset.like){ // for the like-icon
       handleLikeClick(e.target.dataset.like) 
    }
    else if(e.target.dataset.retweet){ // for the retweet-icon
        handleRetweetClick(e.target.dataset.retweet)
    }

    else if(e.target.dataset.showReplies){ // for showing the replies section
        handleShowReplies(e.target.dataset.showReplies)
    }

    else if(e.target.dataset.deleteIcon){ // for deleting a tweet or reply (the hide and delete icons have the same functionality in this version)
        handleDeleteIcon(e.target.dataset.deleteIcon)
    }
}) 

//FUNCTIONS FOR ICON EVENTS


//increases and decreases "likes" of a tweet when the like btn is clicked, and calls renderTweets
function handleLikeClick(tweetId){ 
    const targetTweetObj = createTargetTweetObj(tweetId)

    if (targetTweetObj.isLiked){
        targetTweetObj.likes--
    }
    else{
        targetTweetObj.likes++ 
    }
    targetTweetObj.isLiked = !targetTweetObj.isLiked

    resetLocalStorage()
}

// increases and decreases "retweets" of a tweet when the retweet btn is clicked, and calls renderTweets
function handleRetweetClick(tweetId){
    const targetTweetObj = createTargetTweetObj(tweetId)
    
    if(targetTweetObj.isRetweeted){
        targetTweetObj.retweets--
    }
    else{
        targetTweetObj.retweets++
    }
    targetTweetObj.isRetweeted = !targetTweetObj.isRetweeted

    resetLocalStorage()
}

//toggles the class "hidden" on the "show-replies-section"
function handleShowReplies(tweetId){  
    document.querySelector(`#reply-section-${tweetId}`).classList.toggle('hidden')
}


//FUNCTIONS FOR TWEETING AND REPLYING

 //creates a new tweet, adds it to the storageTweetsDataArray, and calls resetLocalStorage()
 function handleTweetBtnClick(newTweetText){

    if(newTweetText.length > 0){
        storageTweetsDataArray.unshift({
            handle: `@Scrimba`,
            profilePic: `images/scrimbalogo.png`,
            likes: 0,
            retweets: 0,
            tweetText: newTweetText,
            replies: [],
            isLiked: false,
            isRetweeted: false,
            uuid: uuidv4()
        })
    resetLocalStorage()
    }

}

//creates a new reply when "add-reply-btn" is clicked, adds it into the replies array, and calls resetLocalStorage()
 function handleAddReplyBtn(tweetId){  
    const scrimbaImageUrl =  new URL(`/images/scrimbalogo.png`, import.meta.url).href
    const replyInput = document.getElementById(`add-reply-textarea-${tweetId}`)
    const replyText = replyInput.value.trim()

    const targetTweetObj = createTargetTweetObj(tweetId)
     
    if(replyText.length > 0){
        targetTweetObj.replies.unshift({
            handle: `@Scrimba`,
            profilePic: scrimbaImageUrl,
            tweetText: `${replyText}`,
            uuid: uuidv4()
        },) 
        

        resetLocalStorage() 
        replyInput.value = '' 
        document.getElementById(`reply-section-${tweetId}`).classList.remove('hidden')   
    }          
 }

//deletes the tweet or reply when the delete icon was clicked, and calls resetLocalStorage()
function handleDeleteIcon(deleteIconId){

    let targetTweetObjId = '' //this is for replies only
    
    storageTweetsDataArray.forEach( (tweet, index) => { 
        if (tweet.uuid === deleteIconId){ // removes the selected the tweet
            storageTweetsDataArray.splice(index, 1)
        }  
        else { // removes the selected reply
            tweet.replies.forEach( (reply, index) => { 
                if (reply.uuid === deleteIconId) {
                    tweet.replies.splice(index, 1)
                    targetTweetObjId = tweet.uuid

                } 
            }) 
        }
        
    })

    resetLocalStorage()

    if (targetTweetObjId){ // if the removed object was a reply, this calls handleShowReplies (so that replies-section stays visible)
        handleShowReplies(targetTweetObjId)
    }
}

//UTILITY FUNCTIONS

//resets the localStorage with new values, and calls checkLocalStorage()
function resetLocalStorage(){
    localStorage.clear()
    localStorage.setItem( 'storageTweetsDataArray', JSON.stringify(storageTweetsDataArray) )
    checkLocalStorage()
}

//creates the targetTweetObject for 3 different functions
function createTargetTweetObj(tweetId){
    const targetTweetObj = storageTweetsDataArray.filter( tweet => tweet.uuid === tweetId )[0]
    return targetTweetObj
}


//FUNCTIONS FOR RENDERING TWEET FEED CONTENT

// checks if localStorage has items stored, and determines what will be rendered
function checkLocalStorage(){
    const tweetsArrayFromLocalStorage = JSON.parse ( localStorage.getItem('storageTweetsDataArray') )

    if (tweetsArrayFromLocalStorage && tweetsArrayFromLocalStorage.length > 0){
        storageTweetsDataArray = tweetsArrayFromLocalStorage
        renderTweets()
    } else {
        storageTweetsDataArray = JSON.parse(JSON.stringify(tweetsData))
        renderTweets()
    }
}

//determines the html content for each tweet, and returns the variable holding that feed
function getFeedHtml(){ 

    let feedHtml = ``
    
    //defines the html for each tweet in the array
    storageTweetsDataArray.forEach( tweet => { 
        
        //changes the styling if the tweet is liked
        let likeIconClass = ''
        if (tweet.isLiked){ 
            likeIconClass = 'liked'
        }
        
        //changes the styling if the tweet is retweeted
        let retweetIconClass = ''
        if (tweet.isRetweeted){ 
            retweetIconClass = 'retweeted'
        }
        
        //determines whether the tweet should have a delete or hide icon
        let deleteOrHideIcon = ''
        if (tweet.handle === `@Scrimba`){
            deleteOrHideIcon = `<i class="fa-solid fa-xmark delete-icon" data-delete-icon="${tweet.uuid}"></i>`
        } else {
            deleteOrHideIcon = `<i class="fa-solid fa-minus delete-icon" data-delete-icon="${tweet.uuid}"></i>`
        }


        //if a tweet's replies array has items, this iterates over it, and determines the variable "repliesHtml"
        let repliesHtml = ''
        if(tweet.replies.length > 0){ 

            tweet.replies.forEach( reply => {

               //determines whether the reply should have a delete or hide icon
               let deleteOrHideIcon = ''
               if (reply.handle === `@Scrimba`){
                   deleteOrHideIcon = `<i class="fa-solid fa-xmark delete-icon" data-delete-icon="${reply.uuid}"></i>`
               } else {
                   deleteOrHideIcon = `<i class="fa-solid fa-minus delete-icon" data-delete-icon="${reply.uuid}"></i>`
               }

                repliesHtml+=`                   
                    <div class="tweets-main-layout grid">
                        <img :src="${reply.profilePic}" alt="Scrimba logo" class="profile-pic tweet-profile-pic">
                        <button class="icon-btn">
                            ${deleteOrHideIcon}
                        </button>
                        <p class="tweet-handle">${reply.handle}</p>
                        <p class="tweet-paragraph">${reply.tweetText}</p>
                    </div>
                `
            })            
        }        
        //<img :src="imageUrl"
        const scrimbaImageUrl =  new URL(`/images/scrimbalogo.png`, import.meta.url).href
        feedHtml += `
            <article>
                <div class="tweets-main-layout grid" id="tweets-beginning-${tweet.uuid}">

                    <img :src="${tweet.profilePic}" alt="a profile picture" class="profile-pic tweet-profile-pic">                              
                    <p class="tweet-handle">${tweet.handle}</p>              
                    <button class="icon-btn">
                        ${deleteOrHideIcon}
                    </button>
                    <p class="tweet-paragraph">${tweet.tweetText}</p>
                        
                    <div class="wrapper-for-tweets-icons">

                        <button class="icon-btn">
                            <a href="#tweets-beginning-${tweet.uuid}">
                                <i class="fa-regular fa-comment-dots" data-show-replies="${tweet.uuid}"></i>
                            </a>
                            ${tweet.replies.length}
                        </button>

                        <button class="icon-btn">
                            <i class="fa-solid fa-heart ${likeIconClass}" data-like="${tweet.uuid}"></i>
                            ${tweet.likes}
                        </button>

                        <button class="icon-btn">
                            <i class="fa-solid fa-retweet ${retweetIconClass}" data-retweet="${tweet.uuid}"></i>
                            ${tweet.retweets}
                        </button>

                    </div> 

                </div>

                <div class="tweets-replies-layout hidden" id="reply-section-${tweet.uuid}">      
                    
                    <div class="create-reply-section grid">
                        <img :src=${scrimbaImageUrl} class="profile-pic">
                        <textarea placeholder="Reply to ${tweet.handle}" id="add-reply-textarea-${tweet.uuid}" class="add-reply-textarea"></textarea>
                        <button class="add-reply-btn" id="add-reply-btn" data-add-reply-btn="${tweet.uuid}">Reply</button>
                    </div>
                   
                    <div id="replies-feed-content-${tweet.uuid}">
                        ${repliesHtml}
                    </div> 

                </div>

            </article>
            `
    })
   
    return feedHtml   
}

//gets the content for each tweet with getFeedHtml(), and sets them in the DOM with innerHTML
function renderTweets(){ 
    document.querySelector('#tweets-feed-section').innerHTML = getFeedHtml()   
}
