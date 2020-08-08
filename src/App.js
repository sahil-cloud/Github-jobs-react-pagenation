import React, { useState } from 'react';
import './App.css';
import { Container } from 'react-bootstrap';
import GitJobs from './GitJobs';
import Job from './Job';   
import JobPagenation from './JobPagenation';
import SearchForm from './SearchForm';

function App() {

  const [params,setparams] = useState({});
  const [page,setpage] = useState(1);

  const { jobs, loading, error ,hasnextpage } = GitJobs(params,page);

  const handleChange = (e) => {
    const param = e.target.name;
    const value = e.target.value;
    setpage(1)

    setparams(prev => {
      return { ...prev , [param]: value}
    })

  }

  return (
    <>
      <Container>
        <h1 className="my-3">Github Jobs</h1>
        <hr/>
        <SearchForm params={params} onparamchange={handleChange} />
        <JobPagenation page={page} setpage={setpage} hasnextpage={hasnextpage} />
        {loading && <h1> Loading... </h1>}
        {error && <h1> error... </h1>}
        {jobs.map((job) => {
          return <Job key={job.id} job={job} />;
        })}
        <JobPagenation page={page} setpage={setpage} hasnextpage={hasnextpage} />
      </Container>
    </>
  );
}

export default App;
