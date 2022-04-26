import React, {useState, useEffect} from "react";


function App() {
  // state
  const [news, setNews] = useState([]);
  const [searchKey, setSearchKey] = useState("react");
  const [url, setUrl] = useState(`http://hn.algolia.com/api/v1/search?query=${searchKey}`);
  const [loader, setLoader] = useState(false);

  const getNews = () => {
    setLoader(true);
    fetch (`http://hn.algolia.com/api/v1/search?query=${searchKey}`)
    .then(result => result.json())
    // .then(data => console.log(data))
    .then(data => (setNews(data.hits), setLoader(false)))
    .catch(error => console.error(error))
  }

  const setId = (e) => {
    // console.log(e);
    setSearchKey(e.target.value);
  }

  const getN = (e) => {
    e.preventDefault();
    setUrl(`http://hn.algolia.com/api/v1/search?query=${searchKey}`)
  }

  useEffect ( () => {
    getNews();
  }, [url])

  const showLoader = () => (loader ? <h2>Loading...</h2> : "")

  const showForm = () => (
    <form onSubmit={getN}>
        <div className="d-flex mb-3 row align-items-center">
          {/* <div className="col-8"> */}
          <input type="text" className="form-control w-75 mr-4" value={searchKey} id="newsId" onChange={setId}/>
          {/* </div>
          <div className="col-2"> */}
          <button className="btn btn-primary">Search</button>
          {/* </div> */}
        </div>
      </form>
  )

  const showNews = () => (
    news.map((n, i) => (
       <div className=""><a key={i} href={n.url} target="_blank" className="font-weight-bold text-light">{n.title}</a></div>
    ))
  )

  return (
    <div className="container p-4 border mt-5 border-primary bg-secondary rounded">
      <div className="text-center">
        <h2 className="font-weight-bold">Search the article from Hacker News</h2>
        {showLoader()}
        {showForm()}
      </div>
      {showNews()}
    </div>
  );
}

export default App;
