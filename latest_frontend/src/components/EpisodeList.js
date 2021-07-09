import React from 'react'
export default function Episodeplay({post}){

// console.log(`${post.rss}`)

  React.useEffect(()=>{
    // if(post!=null){
            
      
  // }
  },[])

    const [state,setState]=React.useState({
    isdone:false,
    events:[]
  })

    const fetchEvents=()=>{
        
        const requestBody = {
          query: `
              query {
                getEpisode(rss:"http://localhost:4000/RSS/dfghj567.rss") {
                  url
                  title
                  discription
                }
              }
            `
        };
        if(state.isdone===true){
          return
        }
        fetch('http://localhost:8080/graphql', {
          method: 'POST',
          body: JSON.stringify(requestBody),
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then(res => {
            
            if (res.status !== 200 && res.status !== 201) {
              throw new Error('Failed!');
            }
            
            return res.json()
          })
          .then(resData => {
            // console.log(resData.data.channels)
            // setState({isdone:true})
            // const event = resData.data.channels;
            // setState({ events: event });
            console.log(resData)
            
          })
          .catch(err => {
            console.log(err);
            
          });
      }
fetchEvents()
      

  return <p>play</p>
}