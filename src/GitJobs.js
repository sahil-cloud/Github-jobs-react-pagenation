import { useEffect } from 'react'
import { useReducer } from 'react';
import axios from 'axios';

const ACTIONS = {
    MAKE_REQUEST: 'make-request',
    GET_DATA: 'get-data',
    ERROR: "error",
    HAS_NEXT_PAGE: 'has-next-page'
}

const BASE_URL = "https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json";

// using the reducer functions
const reducer = (state,action) =>{

    switch (action.type) {
        case ACTIONS.MAKE_REQUEST:
            return { loading: true , jobs: [] }
            
        case ACTIONS.GET_DATA:
            return { ...state, loading: false, jobs: action.payload.jobs };

        case ACTIONS.ERROR:
            return { ...state, loading: false ,error: action.payload.error};

        case ACTIONS.HAS_NEXT_PAGE:
            return { ...state, hasnextpage: action.payload.hasnextpage };
    
        default:
            return state;
    }

}

export default function GitJobs(params,page){

   const [state, dispatch] = useReducer(reducer, { jobs: [],loading:true});

   useEffect(() => {
    const cancelToken1 = axios.CancelToken.source();
    const cancelToken2 = axios.CancelToken.source();
    dispatch({ type: ACTIONS.MAKE_REQUEST });

    // requesting the server
    axios.get(BASE_URL,{
        cancelToken: cancelToken1.token,
        params: { markdown: true, page: page, ...params }
    }).then(res => {
        dispatch({ type: ACTIONS.GET_DATA, payload: { jobs: res.data }})
    }).catch(e => {
        if (axios.isCancel(e)) {
            return
        }
        dispatch({ type:ACTIONS.ERROR, payload: { error: e }})
    })

    // request to check next page
    axios
      .get(BASE_URL, {
        cancelToken: cancelToken2.token,
        params: { markdown: true, page: page, ...params },
      })
      .then((res) => {
        dispatch({ type: ACTIONS.HAS_NEXT_PAGE, payload: { hasnextpage: res.data.length !== 0  } });
      })
      .catch((e) => {
        if (axios.isCancel(e)) {
          return;
        }
        dispatch({ type: ACTIONS.ERROR, payload: { error: e } });
      });


    return () => {
        cancelToken1.cancel();
        cancelToken2.cancel();
    }

   }, [params,page] )

    return (
        state
    )
}
