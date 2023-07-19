import { Button, Grid } from '@mui/material'
import React, { useState } from 'react'

function PageWorks() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
      });

    const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormData({ 
      name: '',
      email: '',})
  };
  return (
    <div>
        <Grid lg={12} xs={12} item container justifyContent="center">
            <Grid lg={3} xs={12} item container justifyContent="center" alignItems="center">
                <label>Name</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange}/>
            </Grid>
            <Grid lg={3} xs={12} item container justifyContent="center" alignItems="center">
                <label>Phone</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} />
            </Grid>
            <Grid lg={3} xs={12} item container justifyContent="center" alignItems="center">
                <label>Place</label>
                <input type='text' />
            </Grid>
            <Grid lg={3} xs={12} item container justifyContent="center" alignItems="center">
                <Button onClick={handleSubmit}>Post</Button>
            </Grid>
            <Grid lg={12} it>
                <p>{formData.name} ,{formData.email}</p>
            </Grid>
        </Grid>
    </div>
  )
}

export default PageWorks
