import { Button, Grid } from '@mui/material';
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';


function Propgrops(props) {

  const location = useLocation();
  const navigate = useNavigate();
  console.log("cvb",location)
  const [valuede,setValue]=useState("first")
  const [fname,setFname]=useState("last")
    props.sasuke(valuede);
    const clear=()=>{
      setValue("")
      setFname("")
    }
    // useEffect(()=>{
    //  Mainwork(alert(55))
     
    // },[])
    // const Mainwork=()=>{
    //   if (valuede==="vishnu"){
    //     setValue("jaga")
    //   }
    // }
  return (
    <div>
      <Grid lg={12} md={12} xs={12} sm={12} container justifyContent="center">
        <Grid lg={6} md={6} xs={12} sm={12} container justifyContent="center">
          <input type="text" value={valuede} onChange={(e)=>setValue(e.target.value)}/>
        </Grid>
        <Grid lg={6} md={6} xs={12} sm={12} container justifyContent="center">
          <input type="text" value={fname} onChange={(e)=>setFname(e.target.value)}/>
        </Grid>
        
      </Grid>
      {/* <p>{fname}</p> */}
      <Button onClick={clear}>clear</Button>
      <Button onClick={()=>{navigate("/tables")}} >Next</Button>
    </div>
   
  )
}

export default Propgrops
