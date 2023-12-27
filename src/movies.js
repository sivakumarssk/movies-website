import React, { useEffect, useState } from 'react'
import './movies.css'
import { faEnvelope} from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faCodepen, faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const url="https://www.omdbapi.com/?apikey=45f0782a&s="

function Movies(){
    const [movieData,setMoviesData]=useState([])
    const [search,setSearch]=useState("")
    const [iserror,setIserror]=useState({status:false,msg:""})
    const [loading,setLoading]=useState(false)
    const [hoveredItemId, setHoveredItemId] = useState(null);


    const fetchApi=async (apiUrl)=>{
        setIserror({status:false,msg:""})
        try{
           const response=await fetch(apiUrl)
           const data =await response.json()
           setLoading(false)
           setMoviesData(data.Search)
        //    setIserror({status:false,msg:""})
        //    console.log(data.Response)
           if(!data || !data.Search){
             throw new Error(data.Error)
           }
        }
        catch(error){
            console.log(error)
            setIserror({status:true,msg:error.message==="" ?
             "something went wrong please try again...": `${error.message} please try again...`})
        }
    }

    useEffect(()=>{
        setLoading(true)
        fetchApi( search==="" ?  `${url}war`:`${url}${search}`)
        // const correcturl=`${url}${search || "war"}`
        // fetchApi(correcturl)
        // console.log(correcturl)

    },[search])

    // console.log("movieData:", movieData);
    // console.log("iserror.status:", iserror?.status);

    const handleHover = (id) => {
      setHoveredItemId(id);
    };
  
    const handleMouseLeave = () => {
      setHoveredItemId(null);
    };
    
    return(

        <div className='container'>
            <form>
                <input type='search' name='search' id='search' className='search'
                placeholder='Search for Movie Tittle ...' value={search}
                onChange={(e)=>setSearch(e.target.value)}/>
            </form>
            {/* <hr/> */}
            {
                loading && !iserror?.status &&  
                <img src='https://shortpixel.com/img/spinner2.gif' alt='loading...' className='loadimg'/>
            }

            {
             !loading && iserror?.status && <h3>{iserror.msg}</h3>
            }

            
<div className='movies'>
        {!loading &&
          !iserror?.status &&
          movieData.map((eachItem) => {
            const { imdbID, Poster, Title } = eachItem;
            return (
              <li
                key={imdbID}
                onMouseEnter={() => handleHover(imdbID)}
                onMouseLeave={handleMouseLeave}
                style={{ position: 'relative', listStyle: 'none', margin: '10px', width: '200px' }}
              >
                <img src={Poster} alt={`movie ${Title}`} className='movieimg'/>
                {hoveredItemId === imdbID && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: 'rgba(0, 0, 0, 0.5)',
                      color: '#fff',
                      fontSize: '20px',
                    }}
                  >
                    <h2>{Title}</h2>
                  </div>
                )}

              <h2 style={{ opacity: hoveredItemId === imdbID ? 0 : 1 }}>{Title}</h2>
              </li>
            );
          })}
      </div>


            <footer className="footer">
  <p>&copy; 2023 siva kumar</p>
  <p className='icons'>
    <a href="#">
      <FontAwesomeIcon icon={faEnvelope} />
    </a>
    <a href="#">
    <FontAwesomeIcon icon={faGithub} />
    </a>
    <a href="#">
      <FontAwesomeIcon icon={faLinkedin} />
    </a>
    <a href="#">
      <FontAwesomeIcon icon={faCodepen} />
    </a>3
  </p>
</footer>

        </div>
    )
    
}

export default Movies