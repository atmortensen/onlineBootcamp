var express = require('express'),
    app = express(),
    mongoose = require('mongoose'), 
    bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/blog');
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

var blogSchema = new mongoose.Schema({
	title: String,
	image: String,
	body: String,
	created: {type: Date, default: Date.now}
});
var Blog = mongoose.model('Blog', blogSchema);

app.get('/', function(req, res){
	res.redirect('/blogs');
});

app.get('/blogs', function(req, res){
	Blog.find({}, function(err, blogs){
		if(err){
			console.log(err);
		} else {
			res.render('index', {blogs: blogs});
		}
	});
});

app.get('/blogs/new', function(req, res){
	res.render('new');
});

app.post('/blogs', function(req, res){
	Blog.create(req.body.blog, function(err, newBlog){
		if(err){
			console.log(err);
		} else {
			res.redirect('/blogs');
		}
	});
});

app.listen(3000, function(){
	console.log('Server Running');
});