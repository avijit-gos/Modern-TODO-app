
# Project Title

Modern TODO & Note sharing app


## Documentation

A note sharing app is a digital tool designed to help users share and collaborate on notes with others. This type of app allows users to create, edit, and share notes in real-time.
One of the key features of a note sharing app is the ability to share notes with others. 
Overall, a note sharing app is a useful tool for anyone looking to collaborate and share information with others, whether they are working on a group project or sharing information with friends and colleagues. It provides a convenient and efficient way to stay organized and communicate with others, helping users to be more productive and effective in their work.


To run this project, you will need to add the following environment variables to your .env file

`DB_URL`

`JWT_SECRET_KEY`

cloudinary credential

`CLOUD_NAME`

`API_KEY`

`API_SECRET`


## Features

- Create task for daily productivity
- Ceate notes and share with other to be more productive and effective in their work.
- Real time one to one or group message system.
- Realtime notification system.


## API Reference

#### Register route

```http
  POST /api/register
```

#### Login route
```http
  POST /api/login
```
## User route
#### 1. rofile Picture update
 ```http
    PUT /api/user/update/profile/image
 ```
#### 2. Update profile name
 ```http
    PUT /api/user/update/profile/image
 ```

 #### 3. Update user email address
 ```http
    PUT /api/user/update/profile/email
 ```
 #### 4. Update user username
 ```http
    PUT /api/user/update/profile/username
 ```

 #### 5. Update profile privacy
 ```http
    PUT /api/user/update/profile/privacy
 ```

#### 6. Search user by their name or username
 ```http
    GET /api/user/update/find/user
 ```
 #### 7. Fetch user profile details
 ```http
    GET /api/user/fetch/user/:id
 ```
#### 8. Reset account password
```http
    PUT api/user/reset/password
```
#### 9. Follow a user
```http
    PUT api/user/follow/:id
```

#### 10. Fetch follower following list
```http
    GET api/user/fetch/follower/:id
```


## Task route

#### 1. Create a new task
```http
    POST /api/task/create
```
#### 2. Fetch user related task
```http
    GET /api/task/fetch
```
#### 3. Update task
```http
    PUT /api/task/update/:id
```
#### 3. Pinned task
```http
    PUT /api/task/pin/:id
```
#### 4. Unpinned task
```http
    PUT /api/task/unpin/:id
```
#### 5. Update task status
```http
    PUT /api/task/update/status/:id
```
#### 6. Update task priority
```http
    PUT /api/task/update/priority/:id
```
#### 7. Delete task
```http
    DEL /api/task/delete/:id
```

## Notes route
#### 1. Create a new note
```http
    POST /api/note/create
```
#### 2. Fetch feed notes
```http
    GET /api/note/feed
```
#### 3. Pin note
```http
    PUT /api/note/pin/:id
```
#### 4. Bookmark note
```http
    PUT /api/note/bookmark/:id
```
#### 4. Update note
```http
    PUT /api/note/update/:id
```
#### 5. Delete note
```http
    DEL /api/note/delete/:id
```
#### 6. Like note
```http
    PUT /api/note/like/:id
```
#### 7. Dislike note
```http
    PUT /api/note/dislike/:id
```
#### 8. Fetch followers feed 
```http
    PUT /api/note/follower/feed
```
#### 9. Fetch note's comment
```http
    PUT /api/note/comment/:id
```

## Notes route's comment route
#### 1. Create comment for note 
```http
    POST /api/note/comment/:id
```
#### 2. Edit comment 
```http
    PUT /api/note/comment/edit/:id
```
#### 3. Delete comment 
```http
    DEL /api/note/comment/:id/:postId
```
#### 4. Like comment 
```http
    PUT /api/note/comment/like/:id
```
#### 5. Dislike comment 
```http
    PUT /api/note/comment/dislike/:id
```

## Chat route
#### 1. Create one to one chat 
```http
    POST /api/chat/
```
#### 2. Fetch all user related chat
```http
    GET /api/chat/
```
#### 3. Create group chat 
```http
    POST /api/chat/group
```
#### 4. Update group profile image 
```http
    PUT /api/chat/group/image/:id
```
#### 5. Update group name
```http
    PUT /api/chat/group/name/:id
```
#### 6. Update group privacy
```http
    PUT /api/chat/group/privacy/:id
```
#### 7. Add new members in the group
```http
    PUT /api/chat/group/add/members/:id
```
#### 8. Add mods in the group
```http
    PUT /api/chat/group/add/mod/:id
```
#### 9. Delete group
```http
    Delete /api/chat/:id
```
#### 10. Bookmark group chat
```http
    PUT /api/chat/group/bookmark/:id
```
#### 11. Fetch a single chat
```http
    GET /api/chat/single/:id
```
#### 12. Block chat
```http
    GET /api/chat/block/:id
```
#### 13. Search chat
```http
    GET /api/chat/search_chat
```

## Message route
#### 1. Create message
```http
    POST /api/message/:id
```
#### 2. Fetch all messages related to a particular char
```http
    GET /api/message/:id
```
#### 3. Edit message
```http
    PUT /api/message/:id
```
#### 4. Delete message
```http
    DEL /api/message/:id
```

####  5. Like message
```http
    DEL /api/message/like/:id
```

#### 6. Save message
```http
    DEL /api/message/bookmark/:id
```

## Notification route
#### 1. Get notifications
```http
    GET /api/notification
```

## Tech Stack

**Client:** React, React-router-dom, chakraUI, socket.io-client

**Server:** Node, Express, socket.io, mongoose, jwt, bcrypt, cors

**Database:** MongoDB


## Run Locally

Clone the project

```bash
  git clone git@github.com:avijit-gos/Modern-TODO-app.git
```

Go to the backend folder

```bash
  cd backend
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

Go to the frontend folder

```bash
  cd frontend
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm start
```
## Screenshots

![App Screenshot](https://res.cloudinary.com/dodc8z1zk/image/upload/v1681051355/Untitled_vfdtjd.png)

