
const trollImageUrl = './images/troll.jpg'
const muskImageUrl =  './images/musk.png'
const tcruiseImageUrl =  './images/tcruise.png'
const norrisImageUrl =  './images/chucknorris.jpeg'
const noobImageUrl =  './images/flower.png'
const overflowImageUrl =  './images/overflow.png'
const loveImageUrl =  './images/love.png'


let tweetsData = [   
    {
        handle: `@TrollBot66756542 💎`,
        profilePic: trollImageUrl,
        likes: 27,
        retweets: 10,
        tweetText: `Buy Bitcoin, ETH Make 💰💰💰 low low prices. 
            Guaranteed return on investment. HMU DMs open!!`,
        replies: [],
        isLiked: false,
        isRetweeted: false,
        uuid: '4b161eee-c0f5-4545-9c4b-8562944223ee',
    },    
    {
        handle: `@Elon ✅`,
        profilePic: muskImageUrl,
        likes: 6500,
        retweets: 234,
        tweetText: `I need volunteers for a one-way mission to Mars 🪐. No experience necessary🚀`,
        replies: [
                  {
                handle: `@TomCruise ✅`,
                profilePic: tcruiseImageUrl,
                tweetText: `Yes! Sign me up! 😎🛩`,
                uuid: '10411db7-6cce-4596-bda4-eb69a4754b69',
            },
                  {
                handle: `@ChuckNorris ✅`,
                profilePic: norrisImageUrl,
                tweetText: `I went last year😴`,
                uuid: '4e5c1611-8270-48ba-9c0a-854d7267f8d8',
            },
        ],
        isLiked: false,
        isRetweeted: false,
        uuid: '3c23454ee-c0f5-9g9g-9c4b-77835tgs2',
    },
        {
        handle: `@NoobCoder12`,
        profilePic: noobImageUrl,
        likes: 10,
        retweets: 3,
        tweetText: `Are you a coder if you only know HTML?`,
        replies: [
            {
                handle: `@StackOverflower ☣️`,
                profilePic: overflowImageUrl,
                tweetText: `No. Obviosuly not. Go get a job in McDonald's.`,
                uuid: '5046a77e-e923-4f72-94c3-5c0b4aa17da4',
            },
            {
                handle: `@YummyCoder64`,
                profilePic: loveImageUrl,
                tweetText: `You are wonderful just as you are! ❤️`,
                uuid: '6d472a13-2a6b-4542-86c6-04a107cf5411',
            },
        ],
        isLiked: false,
        isRetweeted: false,
        uuid: '8hy671sff-c0f5-4545-9c4b-1237gyys45',
    },     
]

export {tweetsData}