// import React, { Component } from 'react' // for class based
import React,{useEffect,useState}from 'react'
import NewsItems from './NewsItems'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


// export class News extends Component { --for class based
    // static defaultProps={  -- for class based
    //   country:'in',
    //   pagesize:8,
    //   category:'general'
    // }

    // static propTypes={
    //   country:PropTypes.string,
    //   pagesize:PropTypes.number,
    //   category:PropTypes.string,
    // }

  const News=(props)=>{
    const [articles, setarticles] = useState([])
    const [loading, setloading] = useState(true)
    const [page, setpage] = useState(1)
    const [totalResults, settotalResults] = useState(0)

   const captalizeFirstLetter=(string)=>{
      return string.charAt(0).toUpperCase()+string.slice(1);
    }
    // constructor(props){ -- for class based define the state
    //     super(props);
    //     this.state={
    //         articles:[],
    //         loading:false,
    //         page:1,
    //         totalResults:0,
    //     }
    //     document.title=`${this.captalizeFirstLetter(props.category)} - EchoNews`
    // }

    // async update(){
    const update=async()=>{
      props.setProgress(10);
      let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pagesize=${props.pagesize}`;
        console.log(url);
        // this.setState({loading:true}); for class based
        setloading(true)
        let data=await fetch(url);
        props.setProgress(30);
        let parseData= await data.json();
        props.setProgress(60);
        setarticles(parseData.articles)
        setloading(false)
        settotalResults(parseData.totalResults)
        // this.setState({  -- for class based component
        //     articles: parseData.articles,
        //     loading:false,
        //     totalResults: parseData.totalResults,
        // });
      props.setProgress(100);

    }

    useEffect(() => {
      document.title=`${captalizeFirstLetter(props.category)} - EchoNews`
      update();
    }, [])
    
    // async componentDidMount(){  -- for class based
    //     // let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=5df4b1f1c80c49f9b5335999ae9afb52&page=1&pagesize=${props.pagesize}`;
    //     // this.setState({loading:true});
    //     // let data=await fetch(url);
    //     // let parseData= await data.json();
    //     // console.log(parseData);
    //     // this.setState({articles: parseData.articles,
    //     //   totalResults: parseData.totalResults,
    //     // loading:false})
    //     this.update();
    // }

  //   const handleNextClick=async ()=>{ // const is written for function based or else only name is written for class based
  //     console.log('Next');
  //   //   if(!(this.state.page + 1 >Math.ceil(this.state.totalResults/props.pagesize))){

  //   //     // this.setState({loading:true})
  //   //     let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=5df4b1f1c80c49f9b5335999ae9afb52&page=${this.state.page + 1}&pagesize=${props.pagesize}`;
  //   //     console.log(url);
  //   //     this.setState({loading:true});
  //   //     let data=await fetch(url);
  //   //     let parseData= await data.json();
  //   //     this.setState((prevState) => ({
  //   //         page: prevState.page + 1,
  //   //         articles: parseData.articles,
  //   //         loading:false
  //   //     }));
  //   // }
  //   // this.setState({page:this.state.page + 1},()=>{ -- for class based
  //   //   this.update();
  //   // });
  //     setpage(page+1)
  //     update()
    
  // }

  // const handlePrevClick=async()=>{
  //     console.log('prev');

  //     // let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=5df4b1f1c80c49f9b5335999ae9afb52&page=${this.state.page - 1}&pagesize=${props.pagesize}`;
  //     // this.setState({loading:true});
  //     // let data=await fetch(url);
  //     // let parseData= await data.json();
  //     // this.setState((prevState) => ({
  //     //     page: prevState.page - 1,
  //     //     articles: parseData.articles,
  //     //     loading:false
  //     // }));
  //     // this.setState({page:this.state.page - 1},()=>{ -- for class based
  //     //   this.update(); 
  //     // });
  //     setpage(page-1)
  //     update()
  // }

  const fetchMoreData = async() => {
    // this.setState({page:this.state.page+1}); -- for class based
    let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pagesize=${props.pagesize}`;
    setpage(page+1);
    // console.log(url);
    let data=await fetch(url);
    let parseData= await data.json();
    setarticles(articles.concat(parseData.articles))
    settotalResults(parseData.totalResults)
    // this.setState({ -- for class based
    //     articles: this.state.articles.concat(parseData.articles),
    //     totalResults: parseData.totalResults
    // });
  };

  // render() { --for class based
    return (
      // <div className="container my-3 ">
      <>
        <h2 className='text-center' style={{margin:'30px',marginTop: '65px'}}>EchoNews - Top {captalizeFirstLetter(props.category)} Headlines </h2>
        {loading && <Spinner/>} {/*if true then only show the loader */}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length < totalResults}
          loader={<Spinner/>}
        >

        <div className="container">
          <div className="row">
          {articles.map((element,index)=>{
            return <div className="col-md-4" key={index}>
                  <NewsItems  title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,88):""} imageUrl={element.urlToImage?element.urlToImage:"https://cdn.ndtv.com/common/images/ogndtv.png"} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
              </div> 
          })}
          </div>
          </div>
        </InfiniteScroll>
      {/* <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
        <button disabled={this.state.page + 1 >Math.ceil(this.state.totalResults/props.pagesize)}type="button" className="btn btn-dark"  onClick={this.handleNextClick}>Next &rarr;</button>
      </div> */}
       {/* </div> */}
      </>
    )
  }
// }
News.defaultProps={  //-- for class based
    country:'in',
    pagesize:8,
    category:'general'
  }

  News.propTypes={
    country:PropTypes.string,
    pagesize:PropTypes.number,
    category:PropTypes.string,
  }
export default News

// componentDidMount() will run after the render method

// for props in class based component we need to acces that calling props but in function based component we can directly access it by writing just props

// for state purpose this.state.(state_name) is used or else only state name is used