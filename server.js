const express = require('express');
const mysql =require('mysql');
const cors =require('cors')
const morgan=require('morgan')
const selectAllUsers='SELECT * FROM users'
const selectAllPosts='SELECT * FROM posts'
const selectAllComments='SELECT * FROM comments'

const app=express();
app.use(cors())
const db=mysql.createConnection({
    host:'localhost',
    user:'milo',
    password:'123456',
    database:'acme'
})
db.connect(err=>{
    if(err){
        return err;
    }
})

app.use(morgan('dev'));
app.get('/delete/user', (req,res)=>{
    const sql=`DELETE FROM users WHERE id='${req.query.id}';`
    db.query(sql, (err, results)=>{
        if (err){
            return res.send(err);
        }
        else{
            return res.send(JSON.stringify(results))
        }
    })
})
app.get('/delete/post', (req,res)=>{
    const sql=`DELETE FROM posts WHERE id='${req.query.id}';`
    db.query(sql, (err, results)=>{
        if (err){
            return res.send(err);
        }
        else{
            return res.send(JSON.stringify(results))
        }
    })
})
app.get('/delete/comment', (req,res)=>{
    const sql=`DELETE FROM comment WHERE id='${req.query.id}';`
    db.query(sql, (err, results)=>{
        if (err){
            return res.send(err);
        }
        else{
            return res.send(JSON.stringify(results))
        }
    })
})
app.get('/express_backend', (req,res)=>{
    const sql = `SELECT
    comments.body,
    posts.title,
    users.first_name,
    users.last_name
    FROM comments
    INNER JOIN posts on posts.id = comments.post_id
    INNER JOIN users on users.id = comments.user_id
    ORDER BY posts.title;`;
    db.query(sql, (err, results)=>{
        if (err){
            return res.send(err);
        }
        else{
            return res.send(JSON.stringify(results))
        }
    })
})
app.get('/users/add', (req,res)=>{
    const INSERT_USERS_QUERY=`INSERT INTO users (first_name, last_name, email, password, location, dept, is_admin, register_date, age) VALUES('${req.query.first_name}', '${req.query.last_name}', '${req.query.email}', '${req.query.password}', '${req.query.location}', '${req.query.dept}', ${req.query.is_admin}, CURRENT_TIMESTAMP, '${req.query.age}')`
  db.query(INSERT_USERS_QUERY, (err,results)=>{
      if(err){
          return res.send(err)
      }
      else {
          return res.send('successfully added user')
      }
  })
})
app.get('/users', (req,res)=>{
db.query(selectAllUsers, (err,results)=>{
    if (err){
        return res.send(err);
    }
    else{
        return res.json({data:results})
    }
})
})
app.get('/comments/add', (req,res)=>{
    const INSERT_COMMENTS_QUERY=`INSERT INTO comments (post_id, user_id, body) VALUES(${req.query.post_id}, ${req.query.user_id}, '${req.query.body}')`
  db.query(INSERT_COMMENTS_QUERY, (err,results)=>{
      if(err){
          return res.send(err)
      }
      else {
          return res.send('successfully added Comment')
      }
  })
})
app.get('/comments', (req,res)=>{
    db.query(selectAllComments, (err,results)=>{
        if (err){
            return res.send(err);
        }
        else{
            return res.json({data:results})
        }
    })
    })
    app.get('/posts/add', (req,res)=>{
        const INSERT_POSTS_QUERY=`INSERT INTO posts (user_id, title, body) VALUES(${req.query.user_id}, '${req.query.title}', '${req.query.body}')`
      db.query(INSERT_POSTS_QUERY, (err,results)=>{
          if(err){
              return res.send(err)
          }
          else {
              return res.send('successfully added POST')
          }
      })
    })
     app.get('/posts', (req,res)=>{
        db.query(selectAllPosts, (err,results)=>{
            if (err){
                return res.send(err);
            }
            else{
                return res.json({data:results})
            }
        })
        })
app.listen(5000, () => {
    console.log('App listening on port 5000!');
});