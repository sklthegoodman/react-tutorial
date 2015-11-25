/**
 * Created by wrynnsun on 2015/11/25.
 */
var data = [
    {author: 'Sunkeliang',text:'I am the *king* of world'},
    {author:'Who',text:'I accept that'}
];
var CommentBox = React.createClass({
    getInitialState:function(){
        return {data:[]}
    },
    loadCommentsFromServer:function(){
        $.ajax({
            url:this.props.url,
            dataType:'json',
            cache:false,
            success:function(data){
                this.setState({data: data});
            }.bind(this),
            error:function(xhr,status,err){
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    componentDidMount:function(){
        this.loadCommentsFromServer();
        setInterval(this.loadCommentsFromServer,this.props.pollInterval);
    },
    render: function() {
        return (
            <div className="commentBox">
                <h1>Comments</h1>
                <CommentList data={this.state.data}/>
                <CommentForm />
            </div>
        );
    }
});
var CommentList = React.createClass({
    render:function(){
        var commentNodes = this.props.data.map(function (comment) {
            return (
                <Comment author={comment.author}>
                    {comment.text}
                </Comment>
            );
        });
        return (
            <div class="commentList">
                {commentNodes}
            </div>
        )
    }
});
var CommentForm = React.createClass({
    render:function(){
        return (
            <form class="commentForm">
                <input type="text" placeholder="name"/>
                <input type="text" placeholder="say something" />
                <input type="submit"/>
            </form>
        );
    }
});
var Comment = React.createClass({
    rawMarkup:function(){
        var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
        return {__html: rawMarkup};
    },
    render:function(){
        return (
            <div className="comment">
                <h2 className="commentAuthor">
                    {this.props.author}
                </h2>
                <span dangerouslySetInnerHTML={this.rawMarkup()} />
            </div>
        )
    }
});

React.render(
    <CommentBox url="/api/comments" pollInterval={2000}/>,
    document.getElementById('content')
);