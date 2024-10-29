// import React, { Component } from 'react' // for class based
import React from 'react'
// export class NewsItems extends Component {  -- for class based
    const NewsItems=(props)=>{
    // render() { -- for class based
        let { title, description, imageUrl, newsUrl, author, date, source } = props;
        return (
            <div className='my-3'>
                <div className="card my-3">
                <div style={{display:'flex',justifyContent:'flex-end',position:'absolute',right:0}}>
                    <span className="badge rounded-pill bg-danger" >{source}</span>
                </div>
                    <img src={imageUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}...</h5>
                        <p className="card-text">{description}...</p>
                        <p className="card-text"><small className="text-muted">By {!author? 'Unknown' : author} on {new Date(date).toGMTString()}</small></p>
                        <a href={newsUrl} target="blank" className="btn btn-dark">Read More..</a>
                    </div>
                </div>
            </div>
        )
    }


export default NewsItems



// after completing this add the condition that if the  title is less 45 character then dont show the ... else sshow that same for description.